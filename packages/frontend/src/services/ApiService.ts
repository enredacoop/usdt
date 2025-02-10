import { UUID } from "crypto";

export type SendVerificationData = {
  email: string;
};
export type VerifyCodeData = {
  uuid: string;
  email: string;
  token: string;
};
export type AffinityValues = {
  name: string;
  value: number;
};
export type RelativeValue = {
  name: string;
  value: number;
};
export type AbsoluteValue = {
  name: string;
  value: number;
  reference: number;
};

export type Results = {
  documentName: string;
  analysisId: UUID;
  affinityValues: AffinityValues[];
  relativeValues: RelativeValue[];
  absoluteValues: AbsoluteValue[];
  documentMetadata: unknown;
};

export interface ApiService {
  fetchUsers(): Promise<object[]>;
  sendVerification(data: SendVerificationData): Promise<{ uuid: string }>;
  verifyCode(data: VerifyCodeData): Promise<void>;
  postDocument(data: FormData, signal: AbortSignal): Promise<void>;
  fetchResults(id: UUID): Promise<Results>;
  canUserSend(email: string): Promise<boolean>;
  downloadData(id: UUID): Promise<void>;
}
