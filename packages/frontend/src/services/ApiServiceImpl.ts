import { ApiService } from "./ApiService";

export class ApiServiceImpl implements ApiService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async fetchUsers(): Promise<object[]> {
    const response = await fetch(`${this.apiUrl}/users`);
    return response.json();
  }

  async uploadFile(data: BodyInit): Promise<unknown> {
    const response = await fetch(`${this.apiUrl}/form`, {
      method: "POST",
      body: data,
    });
    return response.json();
  }
}
