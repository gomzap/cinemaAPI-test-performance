import { group, sleep } from "k6";
import { SharedArray } from "k6/data";
import {
  BaseChecks,
  BaseRest,
  ENDPOINTS,
  testConfig,
  url,
} from "../../../support/base/baseTest.js";

const baseUrl = url.environment.hml.url;
const baseRest = new BaseRest(baseUrl);
const baseChecks = new BaseChecks();

const scenarioName = "SoakTest";
const thresholdName = "tempoMenorQue100";

export const options = {
  ...testConfig,
  scenarios: {
    [scenarioName]: testConfig.scenarios[scenarioName],
  },
  thresholds: testConfig.thresholds[thresholdName],
};

const data = new SharedArray("Movies", function () {
  const jsonData = JSON.parse(open("../../../data/dynamic/movies.json"));
  return jsonData;
});

const dataTickets = new SharedArray("Tickets", function () {
  const jsonData = JSON.parse(open("../../../data/dynamic/tickets.json"));
  return jsonData;
});

export default () => {
  group("Get ", () => {
    const res = baseRest.get(ENDPOINTS.TICKETS);
    baseChecks.checkStatusCode(res, 200);
    console.log(`Get Tickets Status: ${res.status}`);
  });

  sleep(1);
};
