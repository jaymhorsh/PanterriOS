import {
  CommonRes,
  CreateInvestmentReq,
  CreateInvestmentRes,
  DraftInvestmentListRes,
  InvestmentListRes,
  RetrieveInvestmentDetailsRes,
  RetrieveInvestmentsQuery,
  ToggleInvestmentDocumentVisibilityRes,
  UpdateInvestmentReq,
  UpdateInvestmentPublicationStatusRes,
  UpdateInvestmentRes,
} from '@/interface';
import API from '@/services/axios';

export const createInvestment = async (
  payload: CreateInvestmentReq,
): Promise<CreateInvestmentRes> => {
  const formData = new FormData();

  // Append basic fields
  formData.append('propertyName', payload.propertyName);
  formData.append('propertyType', payload.propertyType);
  formData.append('state', payload.state);
  formData.append('city', payload.city);
  formData.append('fullAddress', payload.fullAddress);
  formData.append('propertyDescription', payload.propertyDescription);
  formData.append('targetAmount', payload.targetAmount.toString());
  formData.append(
    'minimumInvestmentAmount',
    payload.minimumInvestmentAmount.toString(),
  );
  formData.append(
    'returnDistributionSchedule',
    payload.returnDistributionSchedule,
  );
  formData.append('duration', payload.duration.toString());
  formData.append(
    'expectedReturnPercentage',
    payload.expectedReturnPercentage.toString(),
  );
  formData.append('riskRating', payload.riskRating);
  formData.append(
    'investmentPublicationStatus',
    payload.investmentPublicationStatus,
  );

  // Append optional fields
  if (payload.propertyValue !== undefined) {
    formData.append('propertyValue', payload.propertyValue.toString());
  }
  if (payload.expectedRoi !== undefined) {
    formData.append('expectedRoi', payload.expectedRoi.toString());
  }
  if (payload.propertySizeSqm !== undefined) {
    formData.append('propertySizeSqm', payload.propertySizeSqm.toString());
  }
  if (payload.propertyUnit) {
    formData.append('propertyUnit', payload.propertyUnit);
  }

  // Append key highlights as JSON string array
  if (payload.keyHighlights && payload.keyHighlights.length > 0) {
    formData.append('keyHighlights', JSON.stringify(payload.keyHighlights));
  }

  // Append project milestones as JSON string array
  formData.append('projectMilestones', JSON.stringify(payload.projectMilestones));

  // Append document visibility if provided
  if (payload.documentVisibility && payload.documentVisibility.length > 0) {
    formData.append(
      'documentVisibility',
      JSON.stringify(payload.documentVisibility),
    );
  }

  // Append cover image as a single file
  formData.append('coverImage', payload.coverImage);

  // Append property images
  payload.propertyImages.forEach((file) => {
    formData.append('propertyImages', file);
  });

  // Append property documents
  payload.propertyDocuments.forEach((file) => {
    formData.append('propertyDocuments', file);
  });

  const { data } = await API.post(
    '/investments/admin/create',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

export const retrieveInvestments = async (
  query: RetrieveInvestmentsQuery,
): Promise<InvestmentListRes> => {
  const { data } = await API.get('/investments/admin/published', {
    params: query,
  });

  return data;
};

export const retrieveDraftInvestments = async (
  query: RetrieveInvestmentsQuery,
): Promise<DraftInvestmentListRes> => {
  const { data } = await API.get('/investments/admin/drafts', {
    params: query,
  });

  return data;
};

export const retrieveInvestmentDetails = async (
  id: number,
): Promise<RetrieveInvestmentDetailsRes> => {
  const { data } = await API.get(`/investments/admin/${id}`);
  return data;
};

export const updateInvestmentDetails = async (
  id: number,
  payload: UpdateInvestmentReq,
): Promise<UpdateInvestmentRes> => {
  const formData = new FormData();

  const appendIfDefined = (key: string, value: unknown) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, String(value));
  };

  appendIfDefined('propertyName', payload.propertyName);
  appendIfDefined('propertyType', payload.propertyType);
  appendIfDefined('state', payload.state);
  appendIfDefined('city', payload.city);
  appendIfDefined('fullAddress', payload.fullAddress);
  appendIfDefined('propertyDescription', payload.propertyDescription);
  appendIfDefined('targetAmount', payload.targetAmount);
  appendIfDefined('minimumInvestmentAmount', payload.minimumInvestmentAmount);
  appendIfDefined(
    'returnDistributionSchedule',
    payload.returnDistributionSchedule,
  );
  appendIfDefined('duration', payload.duration);
  appendIfDefined(
    'expectedReturnPercentage',
    payload.expectedReturnPercentage,
  );
  appendIfDefined('riskRating', payload.riskRating);
  appendIfDefined(
    'investmentPublicationStatus',
    payload.investmentPublicationStatus,
  );
  appendIfDefined('propertyValue', payload.propertyValue);
  appendIfDefined('expectedRoi', payload.expectedRoi);
  appendIfDefined('propertySizeSqm', payload.propertySizeSqm);
  appendIfDefined('propertyUnit', payload.propertyUnit);
  appendIfDefined('keyHighlights', payload.keyHighlights);
  appendIfDefined('projectMilestones', payload.projectMilestones);
  appendIfDefined('documentVisibility', payload.documentVisibility);
  appendIfDefined('coverImageIndex', payload.coverImageIndex);
  appendIfDefined('documentUpdates', payload.documentUpdates);
  appendIfDefined('imageUpdates', payload.imageUpdates);

  if (payload.coverImage) {
    formData.append('coverImage', payload.coverImage);
  }

  payload.propertyImages?.forEach((file) => {
    formData.append('propertyImages', file);
  });

  payload.propertyDocuments?.forEach((file) => {
    formData.append('propertyDocuments', file);
  });

  const { data } = await API.put(`/investments/admin/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const deleteInvestment = async (id: number): Promise<CommonRes> => {
  const { data } = await API.delete(`/investments/admin/${id}`);
  return data;
};

export const toggleInvestmentDocumentVisibility = async (
  documentId: number,
): Promise<ToggleInvestmentDocumentVisibilityRes> => {
  const { data } = await API.patch(
    `/investments/admin/documents/${documentId}/toggle-visibility`,
  );

  return data;
};

export const updateInvestmentPublicationStatus = async (
  id: number,
): Promise<UpdateInvestmentPublicationStatusRes> => {
  const { data } = await API.patch(`/investments/admin/${id}/publication-status`);

  return data;
};
