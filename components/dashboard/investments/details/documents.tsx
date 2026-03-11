import { type InvestmentDocument } from "@/interface";
import { FileText, Globe, Lock } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface DocumentsProps {
  documents: InvestmentDocument[];
  onToggleVisibility?: (documentId: number) => void;
  isToggling?: boolean;
  togglingDocumentId?: number | null;
}

const formatFileSize = (bytes: number) => {
  if (!bytes) return "0 B";

  const sizes = ["B", "KB", "MB", "GB"];
  const sizeIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1);
  const size = bytes / 1024 ** sizeIndex;

  return `${size.toFixed(sizeIndex === 0 ? 0 : 1)} ${sizes[sizeIndex]}`;
};

export function Documents({
  documents,
  onToggleVisibility,
  isToggling,
  togglingDocumentId,
}: DocumentsProps) {
  return (
    <div className="space-y-4 my-4">
      <div className="font-bold">Legal Documents</div>

      {documents.length === 0 ? (
        <div className="text-sm text-gray-500 border rounded-md p-4">No documents available.</div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => {
            const isPublic = doc.isPublic ?? true;

            return (
            <div className="bg-gray-100 p-4 flex justify-between items-center" key={doc.id}>
              <div className="flex items-center gap-2 min-w-0">
                <div className="bg-white p-2 text-red-500 rounded-md">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate">{doc.documentName}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(doc.fileSizeBytes)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isPublic ? (
                  <Globe className="text-green-600 w-4 h-4" />
                ) : (
                  <Lock className="text-gray-500 w-4 h-4" />
                )}
                <p className="text-gray-500 text-sm">{isPublic ? "Public" : "Private"}</p>
                <Switch
                  checked={isPublic}
                  onCheckedChange={() => onToggleVisibility?.(doc.id)}
                  disabled={Boolean(isToggling && togglingDocumentId === doc.id)}
                  className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-300"
                />
              </div>
            </div>
          )})}
        </div>
      )}
    </div>
  );
}
