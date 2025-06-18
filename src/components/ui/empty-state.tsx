
import { Package, Calendar, Users, Star, Image, MessageSquare, Tag, ChartBar, MapPin } from "lucide-react";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

const iconMap = {
  package: Package,
  calendar: Calendar,
  users: Users,
  star: Star,
  image: Image,
  "message-square": MessageSquare,
  tag: Tag,
  "chart-bar": ChartBar,
  "map-pin": MapPin,
};

export function EmptyState({ icon, title, description, className = "" }: EmptyStateProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Package;

  return (
    <div className={`text-center py-8 sm:py-12 ${className}`}>
      <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-400" />
      </div>
      <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
        {title}
      </h3>
      <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-md mx-auto">
        {description}
      </p>
    </div>
  );
}
