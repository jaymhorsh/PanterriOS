export interface RetrieveAuditLogsQuery {
  page?: number | string;
  limit?: number | string;
  module?: string;
  action?: string;
  entityType?: string;
  critical?: boolean | "true" | "false";
  actorUserId?: number;
  startDate?: string;
  endDate?: string;
}

export interface AuditLogActor {
  userId: number;
  name: string;
  email: string;
  roles: string[];
}

export interface AuditLogChanges {
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
  changedFields?: string[];
}

export interface AuditLogRecord {
  id: number;
  reference: string;
  module: string;
  action: string;
  entityType: string;
  entityId: string;
  entityName: string;
  description: string;
  critical: boolean;
  status: string;
  actor: AuditLogActor;
  occurredAt: string;
  requestId?: string | null;
  deviceInfo?: string | Record<string, unknown> | null;
  changes?: AuditLogChanges | null;
}

export interface AuditLogsPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export interface AuditLogsStats {
  totalActivity: number;
  criticalEvents: number;
  adminLogins: number;
  modulesCount: number;
}

export interface RetrieveAuditLogsRes {
  statusCode: number;
  data: {
    message: string;
    data: AuditLogRecord[];
    pagination: AuditLogsPagination;
    stats: AuditLogsStats;
  };
}

export interface RetrieveAuditLogRecordRes {
  statusCode: number;
  data: {
    message: string;
    data: AuditLogRecord;
  };
}
