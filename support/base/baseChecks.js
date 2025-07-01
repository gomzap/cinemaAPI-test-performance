import { check } from "k6";

export class BaseChecks {
  checkStatusCode(response, expectedStatus) {
    check(response, {
      "Status code 200": (r) => r.status === expectedStatus,
    });
  }

  checkIdResponse(response) {
    check(response, {
      "ID foi gerado": (r) => r.body.includes("id"),
    });
  }
}
