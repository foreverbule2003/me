import React from "react";
import {
  Sparkles,
  MapPin,
  Star,
  Hotel,
  Train,
  ExternalLink,
} from "lucide-react";
import { SectionCard } from "../../../components/trips";

const LinksGallery = ({ links = [], title = "實用連結", forceOpen = null }) => {
  const iconMap = { Train, Hotel, Star, MapPin };

  return (
    <SectionCard
      icon={Sparkles}
      title={title}
      collapsible={true}
      defaultOpen={false}
      forceOpen={forceOpen}
    >
      <div className="grid md:grid-cols-3 gap-4">
        {links.map((category, idx) => {
          const CategoryIcon = iconMap[category.icon] || MapPin;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                <CategoryIcon size={16} className="text-[#E8968A]" />
                <span className="font-bold text-gray-700 text-sm">
                  {category.label}
                </span>
              </div>
              <div className="p-2">
                {category.items.map((item, iIdx) => (
                  <a
                    key={iIdx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-gray-700 font-medium group-hover:text-indigo-600 transition-colors text-sm truncate">
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                        {item.day}
                      </span>
                    </div>
                    <ExternalLink
                      size={14}
                      className="text-gray-300 group-hover:text-[#E8968A] shrink-0 ml-2"
                    />
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
};

export default LinksGallery;
