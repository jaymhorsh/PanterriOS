import {
	type RetrieveAuditLogRecordRes,
	type RetrieveAuditLogsQuery,
	type RetrieveAuditLogsRes,
} from "@/interface";
import { API } from "@/services/axios";

export const retrieveAuditLogs = async (
	params: RetrieveAuditLogsQuery,
): Promise<RetrieveAuditLogsRes> => {
	const { data } = await API.get("/admin/audit-logs", {
		params,
	});

	return data;
};

export const retrieveAuditLogRecord = async (
	referenceOrId: string,
): Promise<RetrieveAuditLogRecordRes> => {
	const { data } = await API.get(`/admin/audit-logs/${referenceOrId}`);

	return data;
};
