import axios from "axios";
import { ApiService } from "./ApiService";

export class ApiServiceImpl implements ApiService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async fetchUsers(): Promise<object[]> {
    const response = await axios.get(`${this.apiUrl}/users`);
    return response.data;
  }

  async postData(data: unknown): Promise<unknown> {
    const response = await axios.post(`${this.apiUrl}/post`, data);
    return response.data;
  }
}
