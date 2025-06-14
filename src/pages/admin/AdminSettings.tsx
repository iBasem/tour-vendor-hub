
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600">Configure platform settings and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="commission">Default Commission Rate (%)</Label>
              <Input
                id="commission"
                type="number"
                defaultValue="12"
                className="w-32"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Platform Currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Platform Features</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-approve">Auto-approve new agencies</Label>
                  <p className="text-sm text-gray-500">Automatically approve new agency registrations</p>
                </div>
                <Switch id="auto-approve" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Send email notifications for platform events</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Enable maintenance mode for the platform</p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Super Admin</div>
                  <div className="text-sm text-gray-500">admin@travelle.com</div>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Content Manager</div>
                  <div className="text-sm text-gray-500">content@travelle.com</div>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>

            <Button className="w-full">Add New Admin User</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Booking Confirmation</h3>
              <p className="text-sm text-gray-500 mb-3">Sent to travelers when booking is confirmed</p>
              <Button variant="outline" size="sm">Edit Template</Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Agency Approval</h3>
              <p className="text-sm text-gray-500 mb-3">Sent to agencies when approved</p>
              <Button variant="outline" size="sm">Edit Template</Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Payout Notification</h3>
              <p className="text-sm text-gray-500 mb-3">Sent to agencies for payout notifications</p>
              <Button variant="outline" size="sm">Edit Template</Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Welcome Email</h3>
              <p className="text-sm text-gray-500 mb-3">Sent to new user registrations</p>
              <Button variant="outline" size="sm">Edit Template</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save All Settings</Button>
      </div>
    </div>
  );
}
