export interface ApiService {
  fetchUsers(): Promise<object[]>;
  uploadFile(data: unknown): Promise<unknown>;
}
