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

  async canUserSend(email: string): Promise<boolean> {
    const response = await fetch(`${this.apiUrl}/check-authorization/${email}`);
    return response.status === 200 ? true : false;
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

    function mapAffinityValues(list) {
      return list.map((item) => ({
        name: item.id_target,
        value: item.affinity_value,
      }));
    }

    function mapRelativeValues(list) {
      return list.map((item) => ({
        name: item.id_target,
        value: item.relative_affinity_value,
      }));
    }
    function mapAbsoluteValues(list) {
      return list.map((item) => ({
        name: item.id_target,
        value: item.absolute_affinity_value,
        reference: item.reference_affinity_value,
      }));
    }
    return {
      documentName: data.name,
      analysisId: data.analysis_id,
      affinityValues: mapAffinityValues(data.analysis_results),
      relativeValues: mapRelativeValues(data.analysis_results),
      absoluteValues: mapAbsoluteValues(data.analysis_results),
      documentMetadata: data.document_metadata,
    };
  }
}
