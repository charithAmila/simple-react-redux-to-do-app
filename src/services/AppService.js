// @flow
import type { ApiServiceInterface } from "shared/services/ApiServiceInterface";

class AppService {
  api: ApiServiceInterface;

  endpoint: string = "/app";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getAll() {
    return this.api.get(this.endpoint);
  }
}

export default AppService;
