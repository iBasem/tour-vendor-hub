
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AppSidebar } from "./AppSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Mobile menu and search */}
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile hamburger menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <AppSidebar />
            </SheetContent>
          </Sheet>

          {/* Search bar - responsive */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search anything"
              className="pl-10 bg-gray-50 border-0 h-9 sm:h-10"
            />
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center text-[10px] sm:text-xs">
              1
            </span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-1 sm:p-2">
                <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-xs sm:text-sm">RH</AvatarFallback>
                </Avatar>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium">Ruben Herwitz</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
                <ChevronDown className="w-4 h-4 hidden sm:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
