import { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import type { Profile } from '@/types/types';
import { profileApi } from '@/db/api';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile();
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await profileApi.getCurrentProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (username: string, password: string) => {
    const email = `${username}@miaoda.com`;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signUp = async (
    username: string, 
    password: string, 
    fullName?: string, 
    email?: string,
    phone?: string,
    schoolName?: string
  ) => {
    const authEmail = `${username}@miaoda.com`;
    const { data, error } = await supabase.auth.signUp({
      email: authEmail,
      password,
    });
    if (error) throw error;
    
    if (data.user) {
      const updates: any = {};
      if (fullName) updates.full_name = fullName;
      if (email) updates.email = email;
      if (phone) updates.phone = phone;
      if (schoolName) updates.school_name = schoolName;
      
      if (Object.keys(updates).length > 0) {
        await profileApi.updateProfile(data.user.id, updates);
      }
    }
    
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin: profile?.role === 'admin',
    isPrincipal: profile?.role === 'principal',
    isTeacher: profile?.role === 'teacher',
    isStudent: profile?.role === 'student',
  };
}
