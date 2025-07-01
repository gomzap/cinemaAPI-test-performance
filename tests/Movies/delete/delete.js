import { group, sleep } from "k6";
import { SharedArray } from "k6/data";
import {
  BaseChecks,
  BaseRest,
  ENDPOINTS,
  url,
  testConfig,
} from "../../../support/base/baseTest.js";
import { randomItem } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";

const baseUrl = url.environment.hml.url;
const baseRest = new BaseRest(baseUrl);
const baseChecks = new BaseChecks();

const scenarioName = "requestPorSegundo50";
const thresholdName = "tempoMenorQue300ms";

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
  data.forEach((movie) => {
    const resP = baseRest.post(`${ENDPOINTS.MOVIE}`, movie);
    baseChecks.checkStatusCode(resP, 201);
    console.log("Criando Movie... Status: " + resP.status);
  });
}

export default () => {
  let uniqueNumber;
  group("Listando ", () => {
    const res = baseRest.get(ENDPOINTS.MOVIE);
    uniqueNumber = randomItem(res.json());
    baseChecks.checkStatusCode(res, 200);
  });

  group("Del Movies", () => {
    if (uniqueNumber === undefined) {
      console.log(`Id não encontrado!`);
    } else {
      const id = uniqueNumber._id;
      const resD = baseRest.del(`${ENDPOINTS.MOVIE}`, id);
      console.log(`Delete Movie ID: ${id} | Status Code: ` + resD.status);
      baseChecks.checkStatusCode(resD, 200);
    }
  });
  sleep(1);
};

export function teardown() {
  group("Del Movies", () => {
    let getAllMovies = baseRest.get(ENDPOINTS.MOVIE);
    let ids = getAllMovies.json().map((item) => item._id);

    ids.forEach((id) => {
      console.log("Teardown Delete: ", id);
      const resP = baseRest.del(`${ENDPOINTS.MOVIE}`, id);
      baseChecks.checkStatusCode(resP, 200);
    });
  });
}
