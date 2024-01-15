export type SendVerificationData = {
  email: string;
};
export type VerifyCodeData = {
  email: string;
  token: string;
};

export interface ApiService {
  fetchUsers(): Promise<object[]>;
  sendVerification(data: SendVerificationData): Promise<void>;
  verifyCode(data: VerifyCodeData): Promise<void>;
  postDocument(data: FormData, signal: AbortSignal): Promise<void>;
}
