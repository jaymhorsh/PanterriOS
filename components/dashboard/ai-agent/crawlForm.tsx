// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   AlertCircle,
//   CheckCircle2,
//   Globe2,
//   Loader2,
//   Play,
//   RefreshCcw,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import {
//   useAIAgentCrawl,
//   useAIAgentCrawlSite,
//   useRetrieveAIAgentEnabledSites,
// } from "@/hook/ai-agents";

// const BRAND = "#121212";


// export function CrawlForm() {
//   const [open, setOpen] = useState(false);

//   const [tab, setTab] = useState<"all" | "specific">("all");

//   const [selectedSite, setSelectedSite] = useState("");

//   const {
//     data: sitesData,
//     isLoading: isLoadingSites,
//     isError: isSitesError,
//     error: sitesError,
//     refetch,
//   } = useRetrieveAIAgentEnabledSites(open);

//   const {
//     crawlAll,
//     crawlAllData,
//     isCrawlingAll,
//     isCrawlAllError,
//     crawlAllError,
    
//   } = useAIAgentCrawl();

//   const {
//     crawlSite,
//     data: crawlSiteData,
//     isPending: isCrawlingSite,
//     isError: isCrawlSiteError,
//     error: crawlSiteError,
//   } = useAIAgentCrawlSite();

//   const sites = useMemo(() => sitesData?.data?.sites ?? [], [sitesData]);

//   useEffect(() => {
//     if (!open) {
//       setTab("all");
//       setSelectedSite("");
//     }
//   }, [open]);

//   const handleCrawlAll = async () => {
//     await crawlAll();
//   };

//   const handleCrawlSite = async () => {
//     if (!selectedSite) return;
//     await crawlSite(selectedSite);
//   };

//   return (
//     <>
//       <Button
//         onClick={() => setOpen(true)}
//         className="h-10 rounded-sm bg-[#122222] px-4 text-sm font-medium text-white"
//       >
//         <Play className="h-4 w-4" />
//         Run Crawl
//       </Button>

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="border-0 bg-transparent p-0  shadow-none sm:max-w-lg">
//           <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-2xl">
//             <div className="border-b border-neutral-200 px-6 py-5">
//               <h2 className="text-lg font-semibold text-[#121212]">
//                 AI Crawl Manager
//               </h2>

//               <p className="mt-1 text-sm text-neutral-500">
//                 Manage and trigger crawler jobs.
//               </p>
//             </div>

//             <div className="p-6">
//               <Tabs
//                 value={tab}
//                 onValueChange={(value) => setTab(value as "all" | "specific")}
//               >
//                 <TabsList className="grid group-data-[orientation=horizontal]/tabs:h-12 rounded-sm w-full grid-cols-2  bg-neutral-100 p-1">
//                   <TabsTrigger
//                     value="all"
//                     className="h-10 rounded-md text-sm font-medium data-[state=active]:bg-[#121212] data-[state=active]:text-white"
//                   >
//                     All Sites
//                   </TabsTrigger>

//                   <TabsTrigger
//                     value="specific"
//                     className="h-10 rounded-md text-sm font-medium data-[state=active]:bg-[#121212] data-[state=active]:text-white"
//                   >
//                     Specific Site
//                   </TabsTrigger>
//                 </TabsList>
//               </Tabs>

//               <div className="mt-6">
//                 {/* {tab === "all" ? ()} */}
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Globe2,
  Loader2,
  Play,
  RefreshCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import {
  useAIAgentCrawl,
  useAIAgentCrawlSite,
  useRetrieveAIAgentEnabledSites,
} from "@/hook/ai-agents";

const BRAND = "#121212";


export function CrawlForm() {
  const [open, setOpen] = useState(false);

  const [tab, setTab] = useState<"all" | "specific">("all");

  const [selectedSite, setSelectedSite] = useState("");

  const {
    data: sitesData,
    isLoading: isLoadingSites,
    isError: isSitesError,
    error: sitesError,
    refetch,
  } = useRetrieveAIAgentEnabledSites(open);

  const {
    crawlAll,
    crawlAllData,
    isCrawlingAll,
    isCrawlAllError,
    crawlAllError,
    
  } = useAIAgentCrawl();

  const {
    crawlSite,
    data: crawlSiteData,
    isPending: isCrawlingSite,
    isError: isCrawlSiteError,
    error: crawlSiteError,
  } = useAIAgentCrawlSite();

  const sites = useMemo(() => sitesData?.data?.sites ?? [], [sitesData]);

  useEffect(() => {
    if (!open) {
      setTab("all");
      setSelectedSite("");
    }
  }, [open]);

  const handleCrawlAll = async () => {
    await crawlAll();
  };

  const handleCrawlSite = async () => {
    if (!selectedSite) return;
    await crawlSite(selectedSite);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="h-10 rounded-sm bg-[#122222] px-4 text-sm font-medium text-white"
      >
        <Play className="h-4 w-4" />
        Run Crawl
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-0 bg-transparent p-0  shadow-none sm:max-w-lg">
          <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-2xl">
            <div className="border-b border-neutral-200 px-6 py-5">
              <h2 className="text-lg font-semibold text-[#121212]">
                AI Crawl Manager
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Manage and trigger crawler jobs.
              </p>
            </div>

            <div className="p-6">
              <Tabs
                value={tab}
                onValueChange={(value) => setTab(value as "all" | "specific")}
              >
                <TabsList className="grid group-data-[orientation=horizontal]/tabs:h-12 rounded-sm w-full grid-cols-2  bg-neutral-100 p-1">
                  <TabsTrigger
                    value="all"
                    className="h-10 rounded-md text-sm font-medium data-[state=active]:bg-[#121212] data-[state=active]:text-white"
                  >
                    All Sites
                  </TabsTrigger>

                  <TabsTrigger
                    value="specific"
                    className="h-10 rounded-md text-sm font-medium data-[state=active]:bg-[#121212] data-[state=active]:text-white"
                  >
                    Specific Site
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="mt-6">
                {tab === "all" ? (
                  <div className="space-y-4">
                    {isCrawlingAll && (
                      <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                        <div className="text-sm text-blue-700">Crawling all sites...</div>
                      </div>
                    )}

                    {isCrawlAllError && (
                      <div className="space-y-3 rounded-lg bg-red-50 p-4">
                        <div className="flex gap-3">
                          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                          <div>
                            <p className="text-sm font-medium text-red-900">
                              Crawl failed
                            </p>
                            <p className="mt-1 text-sm text-red-700">
                              {crawlAllError?.message || "Something went wrong"}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={handleCrawlAll}
                          size="sm"
                          variant="outline"
                          className="w-full border-red-200 text-red-600 hover:bg-red-100"
                        >
                          <RefreshCcw className="h-4 w-4" />
                          Try again
                        </Button>
                      </div>
                    )}

                    {crawlAllData && !isCrawlingAll && !isCrawlAllError && (
                      <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <div className="text-sm text-green-700">
                          Crawl completed successfully
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleCrawlAll}
                      disabled={isCrawlingAll}
                      className="w-full bg-[#121212] text-white hover:bg-black"
                    >
                      {isCrawlingAll ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Crawling...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Start Crawl
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {isLoadingSites && (
                      <div className="flex items-center justify-center gap-2 py-6">
                        <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
                        <span className="text-sm text-neutral-500">
                          Loading sites...
                        </span>
                      </div>
                    )}

                    {isSitesError && (
                      <div className="space-y-3 rounded-lg bg-red-50 p-4">
                        <div className="flex gap-3">
                          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                          <div>
                            <p className="text-sm font-medium text-red-900">
                              Failed to load sites
                            </p>
                            <p className="mt-1 text-sm text-red-700">
                              {sitesError?.message ||
                                "Could not fetch available sites"}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => refetch()}
                          size="sm"
                          variant="outline"
                          className="w-full border-red-200 text-red-600 hover:bg-red-100"
                        >
                          <RefreshCcw className="h-4 w-4" />
                          Retry
                        </Button>
                      </div>
                    )}

                    {!isLoadingSites && !isSitesError && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-neutral-700">
                            Select a site
                          </label>
                          <Select value={selectedSite} onValueChange={setSelectedSite}>
                            <SelectTrigger className="border-neutral-200">
                              <SelectValue placeholder="Choose a site..." />
                            </SelectTrigger>
                            <SelectContent>
                              {sites.map((site: any) => (
                                <SelectItem
                                  key={site}
                                  value={site}
                                >
                                  <div className="flex capitalize items-center gap-2">
                                    <Globe2 className="h-4 w-4" />
                                    {site}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {isCrawlingSite && (
                          <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
                            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                            <div className="text-sm text-blue-700">
                              Crawling selected site...
                            </div>
                          </div>
                        )}

                        {isCrawlSiteError && (
                          <div className="space-y-3 rounded-lg bg-red-50 p-4">
                            <div className="flex gap-3">
                              <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                              <div>
                                <p className="text-sm font-medium text-red-900">
                                  Crawl failed
                                </p>
                                <p className="mt-1 text-sm text-red-700">
                                  {crawlSiteError?.message ||
                                    "Something went wrong"}
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={handleCrawlSite}
                              size="sm"
                              variant="outline"
                              className="w-full border-red-200 text-red-600 hover:bg-red-100"
                            >
                              <RefreshCcw className="h-4 w-4" />
                              Try again
                            </Button>
                          </div>
                        )}

                        {crawlSiteData &&
                          !isCrawlingSite &&
                          !isCrawlSiteError && (
                            <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4">
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                              <div className="text-sm text-green-700">
                                Crawl completed successfully
                              </div>
                            </div>
                          )}

                        <Button
                          onClick={handleCrawlSite}
                          disabled={isCrawlingSite || !selectedSite}
                          className="w-full bg-[#121212] text-white hover:bg-black"
                        >
                          {isCrawlingSite ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Crawling...
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4" />
                              Start Crawl
                            </>
                          )}
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
