'use client';
import { CircleCheck, FileText, TriangleAlert } from 'lucide-react';
import Image from 'next/image';

interface FormPreviewProps {
  previewData: Record<string, unknown>;
}

export default function FormPreview({ previewData }: FormPreviewProps) {
  return (
    <div className="space-y-6">
      <div className=" px-4 py-3 rounded-lg border">
        <h1 className="text-2xl font-semibold">Investment Preview</h1>

        {/* Basic Info */}
        <div className=" px-4 py-6 rounded-lg space-y-2">
          <h2 className="font-semibold border-b-2 py-4">Basic Information</h2>
          <div className="flex justify-between">
            <p className="flex flex-col space-y-1.5">
              <small>Name</small>{' '}
              <span className="font-semibold capitalize">
                {' '}
                {previewData.propertyName}
              </span>
            </p>
            <p className="flex flex-col space-y-1.5">
              <small>Type</small>{' '}
              <span className="font-semibold capitalize">
                {previewData.propertyType}{' '}
              </span>
            </p>{' '}
          </div>
          <p className="flex flex-col ">
            <small>Location</small>{' '}
            <span className="font-semibold capitalize">
              {' '}
              {previewData.state}
            </span>
          </p>
          <p className="flex flex-col space-y-1.5">
            <small>Description</small>{' '}
            <span className="">{previewData.description} </span>
          </p>{' '}
          <div>
            <h2 className="font-semibold">Key Higlight</h2>
            <div className="flex flex-col">
              {previewData.features.map((feature: string) => (
                <div
                  key={feature}
                  className="px-2 py-2 flex items-center gap-2"
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
      <div className=" p-4 rounded-lg space-y-2 border ">
        <h2 className="font-semibold py-4 px-2 border-b-2">
          Financial Details
        </h2>
        <div className="flex flex-row justify-between text-center">
          <p className="flex flex-col space-y-1.5">
            <small>Target Amount</small>{' '}
            <span className="font-semibold capitalize">
              {' '}
              {previewData.targetAmount}
            </span>
          </p>
          <p className="flex flex-col space-y-1.5">
            <small>Min. Investment</small>{' '}
            <span className="font-semibold capitalize">
              {previewData.minimumInvestment}{' '}
            </span>
          </p>{' '}
          <p className="flex flex-col space-y-1.5">
            <small>Expected ROI</small>{' '}
            <span className="font-semibold capitalize text-green-500">
              {previewData.expectedROI}%
            </span>
          </p>
          <p className="flex flex-col space-y-1.5">
            <small>Duration</small>{' '}
            <span className="font-semibold ">{previewData.duration} </span>
          </p>{' '}
          <p className="flex flex-col space-y-1.5">
            <small>Risk Rating</small>{' '}
            <span className="font-semibold ">{previewData.riskRating} </span>
          </p>{' '}
        </div>
      </div>

      {/* Images */}
      <div>
        <h2 className="font-semibold mb-2">Cover Image</h2>
        <div className="flex gap-4 flex-wrap">
          {previewData.coverimage?.map((file: File, index: number) => (
            <Image
              key={index}
              src={URL.createObjectURL(file)}
              alt="img"
              width={100}
              height={100}
              className="h-40 w-40 object-cover rounded"
            />
          ))}
        </div>
      </div>

      {/* Property Images */}
      <div>
        <h2 className="font-semibold mb-2">Property Images</h2>
        <div className="flex gap-4 flex-wrap">
          {previewData.propertyImages?.map((file: File, index: number) => (
            <Image
              key={index}
              alt="img"
              width={100}
              height={100}
              src={URL.createObjectURL(file)}
              className="h-32 w-32 object-cover rounded"
            />
          ))}
        </div>
      </div>

      {/* Legal Docs */}
      <div>
        <h2 className="font-semibold mb-2">Legal Documents</h2>
        <ul className="space-y-1">
          {previewData.legalDocuments?.map((file: File, index: number) => (
            <li key={index} className="text-sm flex gap-1">
              <FileText className="w-4 h-4 text-red-500" /> {file.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-yellow-50 border border-yellow-500 flex gap-2 rounded-lg p-4">
        <TriangleAlert className="w-5 h-5 text-yellow-500" />
        <div className=" space-y-2 ">
          <h2 className="font-bold">Before Publishing</h2>
          <p>
            Once published, this investment will be immediately visible to
            authorized investors in the Marketplace Terminal. Risk rating
          </p>
        </div>
      </div>
    </div>
  );
}
