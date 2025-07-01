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
const thresholdName = "tempoMenorQue200";

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

export function setup() {
  let responseData = [];
  data.forEach((movie) => {
    console.log("Criando filme", movie);
    const resP = baseRest.post(`${ENDPOINTS.MOVIE}`, movie);
    baseChecks.checkStatusCode(resP, 201);
    responseData.push(resP.status);
  });

  return { responseData };
}

export default () => {
  sleep(1);
};

export function teardown(responseData) {
  console.log(responseData.responseData);
}
