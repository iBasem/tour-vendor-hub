
import { Outlet } from "react-router-dom";
import { TravelerSidebar } from "./TravelerSidebar";
import { TravelerHeader } from "./TravelerHeader";

const TravelerLayout = () => {
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <TravelerSidebar />
      <div className="flex-1 flex flex-col">
        <TravelerHeader />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TravelerLayout;
