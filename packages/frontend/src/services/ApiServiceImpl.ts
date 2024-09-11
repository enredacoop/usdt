import { UUID } from "crypto";
import {
  ApiService,
  Results,
  SendVerificationData,
  VerifyCodeData,
} from "./ApiService";

export class ApiServiceImpl implements ApiService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async fetchUsers(): Promise<object[]> {
    const response = await fetch(`${this.apiUrl}/users`);
    return response.json();
  }

  async sendVerification(
    data: SendVerificationData
  ): Promise<{ uuid: string }> {
    const response = await fetch(`${this.apiUrl}/send`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { uuid } = await response.json();
    return { uuid };
  }
  async verifyCode(data: VerifyCodeData): Promise<void> {
    console.log(data);

    await fetch(`${this.apiUrl}/verify`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async postDocument(data: FormData, signal: AbortSignal): Promise<void> {
    console.log(data);

    await fetch(`${this.apiUrl}/doc`, {
      method: "POST",
      body: data,
      signal: signal,
    });
  }

  async fetchResults(id: UUID): Promise<Results> {
    const response = await fetch(`${this.apiUrl}/records/${id}`);
    const data = await response.json();
    return {
      documentName: data.name,
      analysisId: data.analysis_id,
      analysisResults: data.analysis_results,
      documentMetadata: data.document_metadata,
    };
  }
}
