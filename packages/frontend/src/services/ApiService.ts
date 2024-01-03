export interface ApiService {
  fetchUsers(): Promise<object[]>;
  postData(data: unknown): Promise<unknown>;
}
