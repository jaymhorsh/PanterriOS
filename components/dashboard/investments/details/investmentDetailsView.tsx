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
    setTab("overview");
  }, [id]);

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
      <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>

        <DrawerContent
          className=" py-4 lg:data-[vaul-drawer-direction=left]:sm:max-w-xl
            lg:data-[vaul-drawer-direction=right]:sm:max-w-xl  overflow-hidden overflow-y-auto
            "
        >
          <DrawerHeader>
            {/* DrawerTitle must always be present for screen-reader accessibility */}
            <DrawerTitle className="flex justify-between">
              {isLoading || error ? (
                <span className="sr-only">Investment Details</span>
              ) : (
                <div className="w-full">
                  <div className="flex gap-14 items-center">
                    <div className="text-xl font-bold">
                      {investmentDetails?.header.propertyName ?? "-"}
                    </div>
                    <StatusBadge
                      status={
                        investmentDetails?.header
                          ?.investmentPublicationStatus ?? "pending"
                      }
                      showDot
                    />
                  </div>
                  <p className="text-gray-500 pt-1 flex items-center">
                    <MapPin className="w-4 h-4" />
                    <span>{investmentDetails?.header.location ?? "-"}</span>
                  </p>
                </div>
              )}
              <DrawerClose asChild>
                <button type="button" aria-label="Close investment details">
                  <X />
                </button>
              </DrawerClose>
            </DrawerTitle>

            <DrawerDescription />

            {isLoading ? (
              <InvestmentDetailsSkeleton />
            ) : error ? (
              <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                Unable to load investment details right now.
              </div>
            ) : (
              <>
                <div className="flex my-2 justify-between">
                  <Button
                    variant="outline"
                    className="w-fit cursor-pointer"
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

                <Tabs value={tab} className="space-y-2 w-full">
                  <TabsList className="flex flex-wrap w-full">
                    {tabs.map((currentTab) => (
                      <TabsTrigger
                        value={currentTab.value}
                        key={currentTab.value}
                        onClick={() => setTab(currentTab.value)}
                      >
                        {currentTab.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {tabs.map((currentTab) => (
                    <TabsContent
                      value={currentTab.value}
                      key={currentTab.value}
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
