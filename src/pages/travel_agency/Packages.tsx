
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter, Package, Loader2, Eye, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { usePackages } from "@/hooks/usePackages";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Packages() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { packages, loading, error, deletePackage, updatePackage } = usePackages();

  const handleDeletePackage = async (packageId: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      try {
        await deletePackage(packageId);
        toast.success("Package deleted successfully");
      } catch (error) {
        toast.error("Failed to delete package");
      }
    }
  };

  const togglePublishStatus = async (pkg: any) => {
    try {
      const newStatus = pkg.status === 'published' ? 'draft' : 'published';
      await updatePackage(pkg.id, { status: newStatus });
      toast.success(`Package ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`);
    } catch (error) {
      toast.error("Failed to update package status");
    }
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading packages: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Travel Packages</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your travel packages and experiences</p>
        </div>
        <Button 
          onClick={() => navigate("/travel_agency/packages/create")}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-sm text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Package
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search packages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 sm:h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
        <Button variant="outline" className="w-full sm:w-auto border-gray-200 hover:bg-gray-50 text-sm sm:text-base px-4 sm:px-6">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Packages Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredPackages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-gray-200 hover:-translate-y-1 bg-white"
            >
              <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 line-clamp-2 flex-1">
                    {pkg.title}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => togglePublishStatus(pkg)}>
                        {pkg.status === 'published' ? 'Unpublish' : 'Publish'}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeletePackage(pkg.id, pkg.title)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                <p className="text-sm text-gray-600">{pkg.destination}</p>
                <p className="text-sm text-gray-600">{pkg.duration_days} days, {pkg.duration_nights} nights</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                    ${pkg.base_price}
                  </p>
                  <Badge 
                    variant={pkg.status === 'published' ? 'default' : 'secondary'}
                    className={pkg.status === 'published' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                  >
                    {pkg.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-sm text-gray-600">
                    {pkg.itineraries?.length || 0} day{(pkg.itineraries?.length || 0) !== 1 ? 's' : ''} planned
                  </span>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No packages found' : 'No packages yet'}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'Create your first travel package to get started'
            }
          </p>
          {!searchTerm && (
            <Button onClick={() => navigate("/travel_agency/packages/create")} className="text-sm sm:text-base px-4 sm:px-6">
              <Plus className="w-4 h-4 mr-2" />
              Create Package
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
