import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, Settings, Database } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SuperAdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}</p>
      </div>

      <Tabs defaultValue="admins" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="admins" className="flex items-center gap-2 py-3">
            <Shield className="h-4 w-4" />
            <span>Admin Management</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2 py-3">
            <Users className="h-4 w-4" />
            <span>All Users</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 py-3">
            <Settings className="h-4 w-4" />
            <span>Platform Settings</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2 py-3">
            <Database className="h-4 w-4" />
            <span>Database</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="admins">
          <Card>
            <CardHeader>
              <CardTitle>Admin Account Management</CardTitle>
              <CardDescription>Create, edit, or delete admin accounts and manage permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">5</CardTitle>
                      <CardDescription>Active Admins</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">1</CardTitle>
                      <CardDescription>Super Admin</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>View all users with filters by name, email, date joined, and role</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">1,234</CardTitle>
                      <CardDescription>Total Users</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">5</CardTitle>
                      <CardDescription>Admins</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">1,229</CardTitle>
                      <CardDescription>Regular Users</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>Manage platform-wide configurations and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Platform settings interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
              <CardDescription>Monitor and manage database operations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Database management interface coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
