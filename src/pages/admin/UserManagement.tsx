import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Edit, Ban, CheckCircle, UserCheck, UserX, Clock } from 'lucide-react';
import { profileApi } from '@/db/api';
import { useToast } from '@/hooks/use-toast';
import type { Profile, UserRole } from '@/types/types';

interface EditingUser {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  school_name: string;
  role: UserRole;
}

export default function UserManagement() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'suspended'>('pending');
  const { toast } = useToast();

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const data = await profileApi.getAllProfiles();
      setProfiles(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (profile: Profile) => {
    setEditingUser({
      id: profile.id,
      full_name: profile.full_name || '',
      email: profile.email || '',
      phone: profile.phone || '',
      school_name: profile.school_name || '',
      role: profile.role,
    });
    setIsEditDialogOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setIsEditDialogOpen(false);
  };

  const handleSave = async () => {
    if (!editingUser) return;

    // Validate mandatory fields
    if (!editingUser.school_name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'School name is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      await profileApi.updateProfile(editingUser.id, {
        full_name: editingUser.full_name || null,
        email: editingUser.email || null,
        phone: editingUser.phone || null,
        school_name: editingUser.school_name || null,
        role: editingUser.role,
      });

      setProfiles(profiles.map(p =>
        p.id === editingUser.id
          ? { 
              ...p, 
              full_name: editingUser.full_name || null, 
              email: editingUser.email || null,
              phone: editingUser.phone || null,
              school_name: editingUser.school_name || null, 
              role: editingUser.role 
            }
          : p
      ));

      toast({
        title: 'Success',
        description: 'User updated successfully',
      });

      setEditingUser(null);
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update user',
        variant: 'destructive',
      });
    }
  };

  const handleToggleSuspend = async (userId: string, currentStatus: boolean) => {
    try {
      await profileApi.toggleSuspend(userId, !currentStatus);

      setProfiles(profiles.map(p =>
        p.id === userId ? { ...p, suspended: !currentStatus } : p
      ));

      toast({
        title: 'Success',
        description: currentStatus ? 'User unsuspended successfully' : 'User suspended successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update user status',
        variant: 'destructive',
      });
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      await profileApi.approveUser(userId);

      setProfiles(profiles.map(p =>
        p.id === userId ? { ...p, approved: true } : p
      ));

      toast({
        title: 'Success',
        description: 'User approved successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve user',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async (userId: string) => {
    if (!confirm('Are you sure you want to reject this user? This will permanently delete their account.')) {
      return;
    }

    try {
      await profileApi.rejectUser(userId);

      setProfiles(profiles.filter(p => p.id !== userId));

      toast({
        title: 'Success',
        description: 'User rejected and removed successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reject user',
        variant: 'destructive',
      });
    }
  };

  const getRoleLabel = (role: string) => {
    const roleMap: Record<string, string> = {
      admin: 'Admin',
      principal: 'Principal',
      teacher: 'Teacher',
      student: 'Student',
    };
    return roleMap[role] || role;
  };

  const getRoleBadgeVariant = (role: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    const variantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      admin: 'destructive',
      principal: 'default',
      teacher: 'secondary',
      student: 'outline',
    };
    return variantMap[role] || 'outline';
  };

  const pendingProfiles = profiles.filter(p => !p.approved);
  const activeProfiles = profiles.filter(p => p.approved && !p.suspended);
  const suspendedProfiles = profiles.filter(p => p.suspended);

  const renderPendingUserRow = (profile: Profile) => {
    return (
      <TableRow key={profile.id}>
        <TableCell className="font-medium">{profile.username}</TableCell>
        <TableCell>{profile.full_name || '-'}</TableCell>
        <TableCell>
          <Badge variant={getRoleBadgeVariant(profile.role)}>
            {getRoleLabel(profile.role)}
          </Badge>
        </TableCell>
        <TableCell>{profile.school_name || '-'}</TableCell>
        <TableCell>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={() => handleApprove(profile.id)} className="h-8">
              <UserCheck className="w-4 h-4 mr-1" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleReject(profile.id)}
              className="h-8"
            >
              <UserX className="w-4 h-4 mr-1" />
              Reject
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  const renderUserRow = (profile: Profile) => {
    return (
      <TableRow key={profile.id} className={profile.suspended ? 'opacity-60' : ''}>
        <TableCell className="font-medium">{profile.username}</TableCell>
        <TableCell>{profile.full_name || '-'}</TableCell>
        <TableCell>
          <Badge variant={getRoleBadgeVariant(profile.role)}>
            {getRoleLabel(profile.role)}
          </Badge>
        </TableCell>
        <TableCell>{profile.school_name || '-'}</TableCell>
        <TableCell>
          <Badge variant={profile.suspended ? 'destructive' : 'secondary'}>
            {profile.suspended ? 'Suspended' : 'Active'}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => handleEdit(profile)} className="h-8">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant={profile.suspended ? 'default' : 'destructive'}
              onClick={() => handleToggleSuspend(profile.id, profile.suspended)}
              className="h-8"
            >
              {profile.suspended ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Unsuspend
                </>
              ) : (
                <>
                  <Ban className="w-4 h-4 mr-1" />
                  Suspend
                </>
              )}
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage users, assign roles, and control account access
          </p>
        </div>
        <div className="flex gap-4">
          <Badge variant="outline" className="text-lg px-4 py-2 bg-yellow-50 text-yellow-700 border-yellow-300">
            Pending: {pendingProfiles.length}
          </Badge>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Active: {activeProfiles.length}
          </Badge>
          <Badge variant="destructive" className="text-lg px-4 py-2">
            Suspended: {suspendedProfiles.length}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'pending' | 'active' | 'suspended')}>
        <TabsList>
          <TabsTrigger value="pending">
            <Clock className="w-4 h-4 mr-2" />
            Pending Users ({pendingProfiles.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            <Users className="w-4 h-4 mr-2" />
            Active Users ({activeProfiles.length})
          </TabsTrigger>
          <TabsTrigger value="suspended">
            <Ban className="w-4 h-4 mr-2" />
            Suspended Users ({suspendedProfiles.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Users</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingProfiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Clock className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No pending users</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    New user registrations will appear here for approval
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>School Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProfiles.map(renderPendingUserRow)}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              {activeProfiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No active users found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>School Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeProfiles.map(renderUserRow)}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suspended" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Suspended Users</CardTitle>
            </CardHeader>
            <CardContent>
              {suspendedProfiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Ban className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No suspended users</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>School Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suspendedProfiles.map(renderUserRow)}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information. Fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-username">Username</Label>
                <Input
                  id="edit-username"
                  value={profiles.find(p => p.id === editingUser.id)?.username || ''}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-full-name">Full Name</Label>
                <Input
                  id="edit-full-name"
                  value={editingUser.full_name}
                  onChange={(e) => setEditingUser({ ...editingUser, full_name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email Address</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Contact Number</Label>
                <Input
                  id="edit-phone"
                  type="tel"
                  value={editingUser.phone}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  placeholder="Enter contact number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-school">School Name *</Label>
                <Input
                  id="edit-school"
                  value={editingUser.school_name}
                  onChange={(e) => setEditingUser({ ...editingUser, school_name: e.target.value })}
                  placeholder="Enter school name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={editingUser.role}
                  onValueChange={(value) => setEditingUser({ ...editingUser, role: value as UserRole })}
                >
                  <SelectTrigger id="edit-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="principal">Principal</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
