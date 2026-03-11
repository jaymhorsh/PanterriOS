export interface CreateInvestmentReq {
  propertyName: string;
  propertyType: string;
  state: string;
  city: string;
  fullAddress: string;
  propertyDescription: string;
  targetAmount: number;
  minimumInvestmentAmount: number;
  returnDistributionSchedule: string;
  duration: number;
  expectedReturnPercentage: number;
  riskRating: string;
  investmentPublicationStatus: string;
  propertyValue?: number;
  expectedRoi?: number;
  propertySizeSqm?: number;
  propertyUnit?: string;
  keyHighlights?: string[];
  projectMilestones: ProjectMilestone[];
  documentVisibility?: boolean[];
  coverImage: File;
  propertyImages: File[];
  propertyDocuments: File[];
}

export interface ProjectMilestone {
  title: string;
  status: "completed" | "in_progress" | "upcoming";
  date: string;
  description: string;
}

export interface CreateInvestmentRes {
  message: string;
  data: Record<string, unknown>;
}

export interface RetrieveInvestmentsQuery {
  page?: number;
  limit?: number;
  state?: string;
  investmentStatus?: string;
  search?: string;
  propertyType?: string;
}

export interface InvestmentListItem {
  id: number;
  propertyName: string;
  propertyType: string;
  investmentStatus: string;
  amountRaised: number;
  targetAmount: number;
  funding: number;
  returns: number;
  totalNumberOfInvestors: number;
}

export interface DraftInvestmentItem {
  id: number;
  name: string;
  propertyType: string;
  location: {
    state: string;
    city: string;
  };
  targetedAmount: number;
  lastEdited: string;
  completionPercentage: number;
}

export interface InvestmentStats {
  totalInvestments: number;
  totalRaised: number;
  averageReturn: number;
  totalInvestors: number;
  statusBreakdown: {
    active: number;
    pending: number;
    upcoming: number;
  };
}

export interface InvestmentListRes {
  message: string;
  data: {
    data: InvestmentListItem[];
    stats: InvestmentStats;
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      limit: number;
    };
  };
}

export interface DraftInvestmentListRes {
  message: string;
  data: {
    data: DraftInvestmentItem[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      limit: number;
    };
  };
}

export interface InvestmentDetails {
  id: number;
  createdAt: string;
  updatedAt: string;
  header: InvestmentDetailsHeader;
  overview: InvestmentDetailsOverview;
  financialDetails: InvestmentFinancialDetails;
  propertyDetails: InvestmentPropertyDetails;
  documents: InvestmentDocument[];
  investors: InvestmentInvestors;
}

export interface InvestmentDetailsHeader {
  propertyName: string;
  location: string;
  investmentStatus: string;
  investmentPublicationStatus: string;
}

export interface InvestmentDetailsOverview {
  createdBy: string;
  durationMonths: number;
  expectedRoi: number;
  riskLevel: string;
  activeInvestors: number;
  fundingProgress: {
    targetAmount: number;
    amountRaised: number;
    remainingAmount: number;
    progressPercentage: number;
  };
}

export interface InvestmentFinancialDetails {
  durationMonths: number;
  expectedReturnsPercentage: number;
  riskRating: string;
  minimumInvestmentAmount: number;
  targetAmount: number;
  amountRaised: number;
  propertyValue: number;
  returnDistributionSchedule: string;
}

export interface InvestmentPropertyDetails {
  propertyName: string;
  propertyType: string;
  state: string;
  city: string;
  fullAddress: string;
  description: string;
  status: string;
  propertySizeSqm: number;
  propertyUnit: string;
  totalUnits: number;
  keyHighlights: string[];
  milestones: {
    date: string;
    title: string;
    status: string;
    description: string;
  }[];
  images: {
    id: number;
    url: string;
    fileName: string;
    fileSizeBytes: number;
    mimeType: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface InvestmentDocument {
  id: number;
  fileUrl: string;
  documentName: string;
  fileSizeBytes: number;
  mimeType: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InvestmentInvestorItem {
  id?: number;
  investorId?: number;
  investorName?: string;
  amountInvested?: number;
  investmentDate?: string;
  stakePercentage?: number;
  paymentStatus?: string;
}

export interface InvestmentInvestorsSummary {
  totalInvestors: number;
  totalAmountRaised: number;
}

export interface InvestmentInvestors {
  data: InvestmentInvestorItem[];
  summary: InvestmentInvestorsSummary;
}

export interface RetrieveInvestmentDetailsRes {
  message: string;
  data: {
    data: InvestmentDetails;
  };
}

export interface DocumentUpdate {
  action: "add" | "remove" | "replace";
  index?: number;
  url?: string;
  fileName?: string;
}

export interface ImageUpdate {
  action: "add" | "remove" | "replace";
  index?: number;
  url?: string;
}

export interface UpdateInvestmentReq {
  propertyName?: string;
  propertyType?: string;
  state?: string;
  city?: string;
  fullAddress?: string;
  propertyDescription?: string;
  targetAmount?: number;
  minimumInvestmentAmount?: number;
  returnDistributionSchedule?: string;
  duration?: number;
  expectedReturnPercentage?: number;
  riskRating?: string;
  investmentPublicationStatus?: string;
  propertyValue?: number;
  expectedRoi?: number;
  propertySizeSqm?: number;
  propertyUnit?: string;
  keyHighlights?: string[];
  projectMilestones?: ProjectMilestone[];
  documentVisibility?: boolean[];
  coverImageIndex?: number;
  documentUpdates?: DocumentUpdate[];
  imageUpdates?: ImageUpdate[];
  coverImage?: File;
  propertyImages?: File[];
  propertyDocuments?: File[];
}

export interface UpdateInvestmentRes {
  message: string;
  data: {
    id: number;
    investmentPublicationStatus: string;
  };
}

export interface ToggleInvestmentDocumentVisibilityRes {
  message: string;
  data: {
    id: number;
    isPublic: boolean;
    fileUrl: string;
  };
}

export interface UpdateInvestmentPublicationStatusRes {
  message: string;
}
