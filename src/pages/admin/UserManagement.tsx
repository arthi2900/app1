import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { profileApi } from '@/db/api';
import type { Profile, UserRole } from '@/types/types';
import { useToast } from '@/hooks/use-toast';
import { Users } from 'lucide-react';

export default function UserManagement() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const data = await profileApi.getAllProfiles();
      setProfiles(data);
    } catch (error) {
      console.error('Error loading profiles:', error);
      toast({
        title: 'பிழை',
        description: 'பயனர்களை ஏற்ற முடியவில்லை',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await profileApi.updateProfile(userId, { role: newRole });
      toast({
        title: 'வெற்றி',
        description: 'பாத்திரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
      });
      loadProfiles();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: 'பிழை',
        description: 'பாத்திரத்தை புதுப்பிக்க முடியவில்லை',
        variant: 'destructive',
      });
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'principal':
        return 'secondary';
      case 'teacher':
        return 'outline';
      case 'student':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'நிர்வாகி';
      case 'principal':
        return 'தலைமை ஆசிரியர்';
      case 'teacher':
        return 'ஆசிரியர்';
      case 'student':
        return 'மாணவர்';
      default:
        return role;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">ஏற்றுகிறது...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">பயனர் நிர்வாகம்</h1>
          <p className="text-muted-foreground mt-2">
            பயனர்களை நிர்வகிக்கவும் மற்றும் பாத்திரங்களை ஒதுக்கவும்
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            மொத்தம்: {profiles.length}
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>அனைத்து பயனர்கள்</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>பயனர்பெயர்</TableHead>
                  <TableHead>முழு பெயர்</TableHead>
                  <TableHead>பாத்திரம்</TableHead>
                  <TableHead>உருவாக்கப்பட்டது</TableHead>
                  <TableHead>செயல்கள்</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">{profile.username}</TableCell>
                    <TableCell>{profile.full_name || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(profile.role)}>
                        {getRoleLabel(profile.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(profile.created_at).toLocaleDateString('ta-IN')}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={profile.role}
                        onValueChange={(value) => handleRoleChange(profile.id, value as UserRole)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">மாணவர்</SelectItem>
                          <SelectItem value="teacher">ஆசிரியர்</SelectItem>
                          <SelectItem value="principal">தலைமை ஆசிரியர்</SelectItem>
                          <SelectItem value="admin">நிர்வாகி</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
