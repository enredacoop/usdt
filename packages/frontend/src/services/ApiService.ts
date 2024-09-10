import { UUID } from "crypto";

export type SendVerificationData = {
  email: string;
};
export type VerifyCodeData = {
  uuid: string;
  email: string;
  token: string;
};

export type DocumentIndicator = {
  affinity_value: number;
  id_target: string;
};

export type Results = {
  analysisId: UUID;
  analysisResults: DocumentIndicator[];
  documentMetadata: any;
};

export interface ApiService {
  fetchUsers(): Promise<object[]>;
  sendVerification(data: SendVerificationData): Promise<{ uuid: string }>;
  verifyCode(data: VerifyCodeData): Promise<void>;
  postDocument(data: FormData, signal: AbortSignal): Promise<void>;
  fetchResults(id: UUID): Promise<Results>;
}
