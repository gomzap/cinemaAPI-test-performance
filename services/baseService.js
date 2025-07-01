export class BaseService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.response;
  }

  getResponse() {
    return this.response;
  }
}
