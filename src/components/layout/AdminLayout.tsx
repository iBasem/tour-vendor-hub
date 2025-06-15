
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../admin/AdminSidebar";
import { AdminHeader } from "../admin/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
