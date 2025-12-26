import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter, Package, Loader2, Edit, Trash2, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { usePackages } from "@/hooks/usePackages";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleCreatePackage = () => {
    navigate("/travel_agency/packages/create");
  };

  const handleDeletePackage = async (packageId: string, title: string) => {
    if (confirm(`${t('common.delete')} "${title}"?`)) {
      try {
        await deletePackage(packageId);
        toast.success(t('common.delete') + ' ' + t('agencyDashboard.published'));
      } catch (error) {
        toast.error(t('agencyDashboard.errorLoadingPackages'));
      }
    }
  };

  const togglePublishStatus = async (pkg: any) => {
    try {
      const newStatus = pkg.status === 'published' ? 'draft' : 'published';
      await updatePackage(pkg.id, { status: newStatus });
      toast.success(newStatus === 'published' ? t('agencyDashboard.published') : t('agencyDashboard.draft'));
    } catch (error) {
      toast.error(t('agencyDashboard.errorLoadingPackages'));
    }
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 text-sm sm:text-base">{t('agencyDashboard.errorLoadingPackages')}: {error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4 text-sm sm:text-base">
          {t('common.retry')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <div className={`flex flex-col gap-3 sm:flex-row sm:items-center justify-between sm:gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{t('agencyDashboard.travelPackages')}</h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1">{t('agencyDashboard.managePackages')}</p>
        </div>
        <Button 
          onClick={handleCreatePackage}
          className={`w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-sm text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Plus className={`w-3 h-3 sm:w-4 sm:h-4 ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
          {t('agencyDashboard.createPackage')}
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className={`flex flex-col gap-3 sm:flex-row sm:gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400 ${isRTL ? 'right-2 sm:right-3' : 'left-2 sm:left-3'}`} />
          <Input
            placeholder={t('agencyDashboard.searchPackages')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`h-8 sm:h-10 lg:h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-xs sm:text-sm lg:text-base ${isRTL ? 'pr-8 sm:pr-10 text-right' : 'pl-8 sm:pl-10'}`}
          />
        </div>
        <Button variant="outline" className={`w-full sm:w-auto border-gray-200 hover:bg-gray-50 text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Filter className={`w-3 h-3 sm:w-4 sm:h-4 ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
          {t('agencyDashboard.filter')}
        </Button>
      </div>

      {/* Packages Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 border-gray-200 hover:-translate-y-1 bg-white">
              <CardHeader className={`pb-2 sm:pb-3 px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 lg:pt-6 ${isRTL ? 'text-right' : ''}`}>
                <div className={`flex items-start justify-between gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CardTitle className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-gray-900 line-clamp-2 flex-1 leading-tight">
                    {pkg.title}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                        <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={isRTL ? "start" : "end"} className="w-40 sm:w-48">
                      <DropdownMenuItem onClick={() => togglePublishStatus(pkg)} className="text-xs sm:text-sm">
                        {pkg.status === 'published' ? t('agencyDashboard.unpublish') : t('agencyDashboard.publish')}
                      </DropdownMenuItem>
                      <DropdownMenuItem className={`text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Edit className={`w-3 h-3 sm:w-4 sm:h-4 ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
                        {t('common.edit')}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeletePackage(pkg.id, pkg.title)}
                        className={`text-red-600 text-xs sm:text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <Trash2 className={`w-3 h-3 sm:w-4 sm:h-4 ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
                        {t('common.delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className={`space-y-2 sm:space-y-3 lg:space-y-4 px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4 lg:pb-6 ${isRTL ? 'text-right' : ''}`}>
                <p className="text-xs sm:text-sm text-gray-600">{pkg.destination}</p>
                <p className="text-xs sm:text-sm text-gray-600">{pkg.duration_days} {t('common.days')}, {pkg.duration_nights} {t('agencyDashboard.nights')}</p>
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-blue-600">
                    ${pkg.base_price}
                  </p>
                  <Badge 
                    variant={pkg.status === 'published' ? 'default' : 'secondary'}
                    className={`text-xs ${pkg.status === 'published' ? 'bg-green-100 text-green-800 border-green-200' : ''}`}
                  >
                    {pkg.status === 'published' ? t('agencyDashboard.published') : t('agencyDashboard.draft')}
                  </Badge>
                </div>
                <div className={`flex items-center justify-between pt-1 sm:pt-2 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {pkg.itineraries?.length || 0} {(pkg.itineraries?.length || 0) !== 1 ? t('agencyDashboard.daysPlannedPlural') : t('agencyDashboard.daysPlanned')}
                  </span>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs sm:text-sm h-6 sm:h-8 px-2 sm:px-3">
                    {t('common.viewDetails')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-gray-400" />
          </div>
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
            {searchTerm ? t('agencyDashboard.noPackagesFound') : t('agencyDashboard.noPackagesYet')}
          </h3>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4 lg:mb-6 max-w-md mx-auto">
            {searchTerm 
              ? t('agencyDashboard.tryAdjustingSearch')
              : t('agencyDashboard.createFirstPackageDesc')
            }
          </p>
          {!searchTerm && (
            <Button onClick={handleCreatePackage} className={`text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Plus className={`w-3 h-3 sm:w-4 sm:h-4 ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
              {t('agencyDashboard.createPackage')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}