'use client';
import { CircleCheck, FileText, TriangleAlert } from 'lucide-react';
import Image from 'next/image';

interface PreviewData {
  propertyName: string;
  propertyType: string;
  state: string;
  description: string;
  features: string[];
  targetAmount: number;
  minimumInvestment: number;
  expectedROI?: number;
  duration: string;
  riskRating: string;
  coverImage?: File;
  propertyImages?: File[];
  legalDocuments?: File[];
  projectMilestones: {
    title: string;
    date: string;
    status: string;
    description: string;
  }[];
}

interface FormPreviewProps {
  previewData: PreviewData;
}

export default function FormPreview({ previewData }: FormPreviewProps) {
  return (
    <div className="space-y-4 sm:space-y-6 w-full">
      <div className="m-2 sm:m-4 p-3 sm:p-5 rounded-lg border w-full">
        <h1 className="text-lg sm:text-xl font-semibold">Investment Preview</h1>

        {/* Basic Info */}
        <div className="p-3 sm:p-5 rounded-lg space-y-2 sm:space-y-3 w-full">
          <h2 className="text-base sm:text-lg font-semibold border-b-2 py-2 sm:py-4">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <p className="flex flex-col space-y-1.5">
              <small className="text-xs sm:text-sm">Name</small>{' '}
              <span className="font-semibold capitalize text-xs sm:text-sm">
                {' '}
                {previewData.propertyName}
              </span>
            </p>
            <p className="flex flex-col space-y-1.5">
              <small className="text-xs sm:text-sm">Type</small>{' '}
              <span className="font-semibold capitalize text-xs sm:text-sm">
                {previewData.propertyType}{' '}
              </span>
            </p>{' '}
          </div>
          <p className="flex flex-col ">
            <small className="text-xs sm:text-sm">Location</small>{' '}
            <span className="font-semibold capitalize text-xs sm:text-sm">
              {' '}
              {previewData.state}
            </span>
          </p>
          <p className="flex flex-col space-y-1.5">
            <small className="text-xs sm:text-sm">Description</small>{' '}
            <span className="text-xs sm:text-sm">{previewData.description} </span>
          </p>{' '}
          <div>
            <h2 className="text-sm sm:text-base font-semibold">Key Higlight</h2>
            <div className="flex flex-col">
              {previewData.features.map((feature: string) => (
                <div
                  key={feature}
                  className="px-2 py-2 flex items-center gap-2 text-xs sm:text-sm"
                >
                  <CircleCheck className="w-4 h-4 text-green-500" />
                  <span> {feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Info */}
      <div className="m-2 sm:m-4 p-3 sm:p-5 rounded-lg space-y-2 sm:space-y-3 border w-full">
        <h2 className="text-base sm:text-lg font-semibold py-2 sm:py-4 px-2 border-b-2">
          Financial Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-left sm:text-center">
          <p className="flex flex-col space-y-1.5">
            <small className="text-xs sm:text-sm">Target Amount</small>{' '}
            <span className="font-semibold capitalize text-xs sm:text-sm">
              {' '}
              {previewData.targetAmount}
            </span>
          </p>
          <p className="flex flex-col space-y-1.5">
            <small className="text-xs sm:text-sm">Min. Investment</small>{' '}
            <span className="font-semibold capitalize text-xs sm:text-sm">
              {previewData.minimumInvestment}{' '}
            </span>
          </p>{' '}
          <p className="flex flex-col space-y-1.5">
            <small className="text-xs sm:text-sm">Expected ROI</small>{' '}
            <span className="font-semibold capitalize text-green-500 text-xs sm:text-sm">
              {previewData.expectedROI}%
            </span>
          </p>
          <p className="flex flex-col space-y-1.5">
            <small className="text-xs sm:text-sm">Duration</small>{' '}
            <span className="font-semibold text-xs sm:text-sm">{previewData.duration} </span>
          </p>{' '}
          <p className="flex flex-col space-y-1.5">
            <small className="text-xs sm:text-sm">Risk Rating</small>{' '}
            <span className="font-semibold text-xs sm:text-sm">{previewData.riskRating} </span>
          </p>{' '}
        </div>
      </div>

      {/* Images */}
      <div className="m-2 sm:m-4">
        <h2 className="text-sm sm:text-base font-semibold mb-2">Cover Image</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 w-full">
          {previewData.coverImage ? (
            <Image
              src={URL.createObjectURL(previewData.coverImage)}
              alt="img"
              width={100}
              height={100}
              className="h-40 sm:h-44 w-full object-cover rounded"
            />
          ) : null}
        </div>
      </div>
      {/* Property Images */}
      <div className="m-2 sm:m-4">
        <h2 className="text-sm sm:text-base font-semibold mb-2">Property Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 w-full">
          {previewData.propertyImages?.map((file: File, index: number) => (
            <Image
              key={index}
              alt="img"
              width={100}
              height={100}
              src={URL.createObjectURL(file)}
              className="h-32 sm:h-40 w-full object-cover rounded"
            />
          ))}
        </div>
      </div>

      {/* Legal Docs */}
      <div className="m-2 sm:m-4">
        <h2 className="text-sm sm:text-base font-semibold mb-2">Legal Documents</h2>
        <ul className="space-y-1">
          {previewData.legalDocuments?.map((file: File, index: number) => (
            <li key={index} className="text-xs sm:text-sm flex gap-1">
              <FileText className="w-4 h-4 text-red-500" /> {file.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Projrct milestone preview style */}
      {previewData.projectMilestones.length > 0 && (
        <div className="space-y-3 w-full rounded-2xl p-3 sm:p-5 m-2 sm:m-4">
          <h3 className="text-base sm:text-lg font-semibold border-b p-2">
            Milestones Preview ({previewData.projectMilestones.length})
          </h3>
          {previewData.projectMilestones.map((milestone, index) => {
            const statusClass =
              milestone.status === 'completed'
                ? 'bg-green-50  text-green-700'
                : milestone.status === 'in_progress'
                  ? 'bg-blue-50  text-blue-700'
                  : 'bg-gray-50  text-gray-700';
            const ovalBg =
              milestone.status === 'completed'
                ? 'bg-green-700'
                : milestone.status === 'in_progress'
                  ? 'bg-blue-700'
                  : 'bg-gray-700';

            return (
              <div key={`${milestone.title}-${index}`} className="flex gap-2 sm:gap-4">
                <div className="items-center flex flex-col">
                  <div className={`w-5 h-5 rounded-2xl ${ovalBg}`}></div>
                  <div className="w-0.5 min-h-14 h-auto bg-gray-300"></div>
                </div>

                <div className={`border rounded-md p-3 sm:p-4 w-full ${statusClass}`}>
                  <div className="flex justify-between items-center gap-3">
                    <h4 className="font-semibold text-black text-sm sm:text-base">
                      {milestone.title}
                    </h4>
                    <span className="text-xs sm:text-sm uppercase">
                      {milestone.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm mt-2 text-gray-600">
                    {milestone.description}
                  </p>
                  <p className="mt-1 capitalize text-xs sm:text-sm text-gray-600">
                    {milestone.status.replace('_', ' ')}-{milestone.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-500 flex gap-2 rounded-lg p-3 sm:p-5 m-2 sm:m-4 w-full">
        <TriangleAlert className="w-5 h-5 text-yellow-500" />
        <div className="space-y-2 text-xs sm:text-sm">
          <h2 className="font-bold text-sm sm:text-base">Before Publishing</h2>
          <p className="text-xs sm:text-sm">
            Once published, this investment will be immediately visible to
            authorized investors in the Marketplace Terminal. Risk rating
          </p>
        </div>
      </div>
    </div>
  );
}
