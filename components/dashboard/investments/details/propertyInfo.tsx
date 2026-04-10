import { StatusBadge } from "@/components/shared";
import { type InvestmentPropertyDetails } from "@/interface";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

interface PropertyInfoProps {
  propertyDetails: InvestmentPropertyDetails;
}

export default function PropertyInfo({ propertyDetails }: PropertyInfoProps) {
  return (
    <div className="space-y-3 sm:space-y-4 my-4 text-xs sm:text-sm">
      <div className="grid capitalize grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
        <div className="rounded-md border p-2 sm:p-3">
          <div className="font-semibold text-xs sm:text-sm">Property Name</div>
          <p className="break-words text-xs sm:text-sm">{propertyDetails.propertyName}</p>
        </div>
        <div className="rounded-md border p-2 sm:p-3">
          <div className="font-semibold text-xs sm:text-sm">Property Type</div>
          <p className="capitalize text-xs sm:text-sm">{propertyDetails.propertyType}</p>
        </div>
        <div className="rounded-md border p-2 sm:p-3">
          <div className="font-semibold text-xs sm:text-sm">Status</div>
          <StatusBadge status={propertyDetails.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
        <div className="rounded-md border p-2 sm:p-3">
          <div className="font-semibold text-xs sm:text-sm">State</div>
          <p className="capitalize text-xs sm:text-sm">{propertyDetails.state}</p>
        </div>
        <div className="rounded-md border p-2 sm:p-3">
          <div className="font-semibold text-xs sm:text-sm">City</div>
          <p className="text-xs sm:text-sm break-words">{propertyDetails.city}</p>
        </div>
        <div className="rounded-md border p-2 sm:p-3">
          <div className="font-semibold text-xs sm:text-sm">Street Address</div>
          <p className="text-xs sm:text-sm break-words">{propertyDetails.fullAddress}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
        <div className="rounded-md border p-2 sm:p-3">
          <div className="font-semibold text-xs sm:text-sm">Property Size (Sqm)</div>
          <p className="text-xs sm:text-sm">{propertyDetails.propertySizeSqm}</p>
        </div>
        <div className="rounded-md border p-2 sm:p-3">
          <div className="font-semibold text-xs sm:text-sm">Property Unit</div>
          <p className="text-xs sm:text-sm">{propertyDetails.propertyUnit}</p>
        </div>
        <div className="rounded-md border p-2 sm:p-3">
          <div className="font-semibold text-xs sm:text-sm">Total Units</div>
          <p className="text-xs sm:text-sm">{propertyDetails.totalUnits}</p>
        </div>
      </div>

      <div className="space-y-2 rounded-md border p-2 sm:p-3">
        <div className="text-gray-500 text-xs sm:text-sm">Description</div>
        <p className="text-xs sm:text-sm break-words">{propertyDetails.description}</p>
      </div>

      <div className="space-y-2 sm:space-y-3 rounded-md border p-2 sm:p-3">
        <div className="font-semibold text-xs sm:text-sm">Key Highlights</div>
        {propertyDetails.keyHighlights.length > 0 ? (
          propertyDetails.keyHighlights.map((highlight, index) => (
            <div
              className="flex gap-2 items-center"
              key={`${highlight}-${index}`}
            >
              <CircleCheck className="text-green-500 w-4 h-4 shrink-0" />
              <span className="text-xs sm:text-sm break-words">{highlight}</span>
            </div>
          ))
        ) : (
          <p className="text-xs sm:text-sm text-gray-500">No highlights available.</p>
        )}
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div className="font-semibold text-xs sm:text-sm">Property Images</div>
        {propertyDetails.images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 border rounded-md p-2 sm:p-4">
            {propertyDetails.images.map((image, index) => (
              <div
                key={image.id}
                className="w-full rounded-md relative overflow-hidden border"
              >
                <Image
                  src={image.url}
                  alt={image.fileName || `Property image ${index + 1}`}
                  className="w-full h-36 sm:h-44 object-cover"
                  width={200}
                  height={150}
                />
                {index === 0 && (
                  <div className="bg-blue-700 text-white absolute px-2 py-1 text-xs sm:text-sm top-2 left-2 rounded-md">
                    Cover
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-gray-500">No property images available.</p>
        )}
      </div>
    </div>
  );
}
