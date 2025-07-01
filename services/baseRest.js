import http from "k6/http";
import { BaseService } from "./baseService.js";

export class BaseRest extends BaseService {
  constructor(baseUrl) {
    super(baseUrl);
  }

  buildOptions() {
    return {
      headers: Object.assign({ "Content-Type": "application/json" }),
    };
  }

  post(endpoint, body, headers = {}) {
    let url = `${this.baseUrl}/${endpoint}`;
    let options = this.buildOptions(headers);
    return http.post(url, JSON.stringify(body), options);
  }

  get(endpoint) {
    let url = `${this.baseUrl}/${endpoint}`;
    return http.get(url);
  }

  del(endpoint, id, headers) {
    let url = `${this.baseUrl}/${endpoint}` + `/${id}`;
    let options = this.buildOptions(headers);
    return http.del(url, null, options);
  }

  put(endpoint, id, body, headers) {
    let url = `${this.baseUrl}/${endpoint}` + `/${id}`;
    let options = this.buildOptions(headers);
    return http.put(url, body, options);
  }
}
