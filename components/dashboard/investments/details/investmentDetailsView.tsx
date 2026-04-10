"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";
import Overview from "./overview";
import { FinancialDetails } from "./financialDetails";
import PropertyInfo from "./propertyInfo";
import { Documents } from "./documents";
import PropertyInvestors from "./propertyInvestors";
import { useRetrieveInvestmentDetails } from "@/hook/investment-management/useRetrieveInvestmentDetails";
import {
  useToggleInvestmentDocumentVisibility,
  useUpdateInvestmentPublicationStatus,
} from "@/hook/investment-management";
import { InvestmentDetailsSkeleton, StatusBadge } from "@/components/shared";

interface DetailsPageViewProp {
  children?: React.ReactNode;
  id?: number;
}
export function InvestmentDetailsView({ children, id }: DetailsPageViewProp) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useRetrieveInvestmentDetails(id, isOpen);
  const { mutate: toggleDocumentVisibility, isPending: isTogglingDocument } =
    useToggleInvestmentDocumentVisibility();
  const {
    mutate: updatePublicationStatus,
    isPending: isUpdatingPublicationStatus,
  } = useUpdateInvestmentPublicationStatus();
  const [tab, setTab] = useState("overview");
  const [togglingDocumentId, setTogglingDocumentId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const handleInvestmentDeleted = (event: Event) => {
      const deletedInvestmentId = (event as CustomEvent<{ id: number }>).detail
        ?.id;

      if (deletedInvestmentId === id) {
        setIsOpen(false);
      }
    };

    window.addEventListener("investment-deleted", handleInvestmentDeleted);

    return () => {
      window.removeEventListener("investment-deleted", handleInvestmentDeleted);
    };
  }, [id]);

  const investmentDetails = data;
  const publicationStatus =
    investmentDetails?.header?.investmentPublicationStatus?.toLowerCase() ??
    "pending";
  const isPublished = publicationStatus === "published";

  const handlePublicationStatus = () => {
    if (!id) return;
    updatePublicationStatus(id);
  };

  const handleToggleDocumentVisibility = (documentId: number) => {
    setTogglingDocumentId(documentId);
    toggleDocumentVisibility(documentId, {
      onSettled: () => setTogglingDocumentId(null),
    });
  };

  const tabs = [
    {
      title: "Overview",
      value: "overview",
      content: investmentDetails?.overview && (
        <Overview overview={investmentDetails.overview} />
      ),
    },
    {
      title: "Financial Details",
      value: "financial-details",
      content: investmentDetails?.financialDetails && (
        <FinancialDetails
          financialDetails={investmentDetails.financialDetails}
        />
      ),
    },
    {
      title: "Property Details",
      value: "property-info",
      content: investmentDetails?.propertyDetails && (
        <PropertyInfo propertyDetails={investmentDetails.propertyDetails} />
      ),
    },
    {
      title: "Documents",
      value: "documents",
      content: (
        <Documents
          documents={investmentDetails?.documents ?? []}
          onToggleVisibility={handleToggleDocumentVisibility}
          isToggling={isTogglingDocument}
          togglingDocumentId={togglingDocumentId}
        />
      ),
    },
    {
      title: "Investors",
      value: "investors",
      content: (
        <PropertyInvestors
          investors={
            investmentDetails?.investors ?? {
              data: [],
              summary: { totalInvestors: 0, totalAmountRaised: 0 },
            }
          }
        />
      ),
    },
  ];

  return (
    <div>
      <Drawer
        direction="right"
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (open) {
            setTab("overview");
          }
        }}
      >
        <DrawerTrigger asChild>{children}</DrawerTrigger>

        <DrawerContent
          className=" py-4 lg:data-[vaul-drawer-direction=left]:sm:max-w-xl
            lg:data-[vaul-drawer-direction=right]:sm:max-w-xl  overflow-hidden overflow-y-auto
            "
        >
          <DrawerHeader className="p-3 sm:p-4">
            {/* DrawerTitle must always be present for screen-reader accessibility */}
            <DrawerTitle className="flex justify-between">
              {isLoading || error ? (
                <span className="sr-only">Investment Details</span>
              ) : (
                <div className="w-full">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center">
                    <div className="text-base sm:text-xl font-bold break-words">
                      {investmentDetails?.header.propertyName ?? "-"}
                    </div>
                    <StatusBadge
                      status={
                        investmentDetails?.header
                          ?.investmentPublicationStatus ?? ""
                      }
                      showDot
                    />
                  </div>
                  <p className="text-gray-500 pt-1 flex items-center text-xs sm:text-sm gap-1">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="capitalize break-words">{investmentDetails?.header.location ?? "-"}</span>
                  </p>
                </div>
              )}
              <DrawerClose asChild>
                <button type="button" aria-label="Close investment details" className="h-10 w-10 inline-flex items-center justify-center">
                  <X className="w-5 h-5" />
                </button>
              </DrawerClose>
            </DrawerTitle>

            <DrawerDescription />

            {isLoading ? (
              <InvestmentDetailsSkeleton />
            ) : error ? (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 sm:p-4 text-xs sm:text-sm text-red-700">
                Unable to load investment details right now.
              </div>
            ) : (
              <>
                <div className="flex my-2 justify-between items-center gap-2">
                  <Button
                    // variant="secondary"
                    className="w-fit h-10 bg-primary-blue cursor-pointer text-xs sm:text-sm"
                    onClick={handlePublicationStatus}
                    disabled={isUpdatingPublicationStatus || !id}
                  >
                    {isUpdatingPublicationStatus
                      ? "Updating..."
                      : isPublished
                        ? "Unpublish"
                        : "Publish"}
                  </Button>
                  <div className="w-24" aria-hidden="true" />
                </div>

                <Tabs
                  value={tab}
                  onValueChange={setTab}
                  className="space-y-3 w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:items-center !h-auto gap-2 lg:gap-3 p-1">
                    {tabs.map((currentTab) => (
                      <TabsTrigger
                        value={currentTab.value}
                        key={currentTab.value}
                        className="h-9 sm:h-10 w-full lg:w-auto px-2.5 sm:px-3 lg:px-4 text-[11px] sm:text-xs lg:text-sm whitespace-nowrap"
                      >
                        {currentTab.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {tabs.map((currentTab) => (
                    <TabsContent
                      value={currentTab.value}
                      key={currentTab.value}
                      className="mt-1"
                    >
                      {currentTab.content}
                    </TabsContent>
                  ))}
                </Tabs>
              </>
            )}
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
