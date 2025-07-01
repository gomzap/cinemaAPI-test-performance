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

const scenarioName = "SmokeTest";
const thresholdName = "tempoMenorQue300";

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

export function setup() {
  let responseData = [];
  console.log("Criando Movie...");
  data.forEach((movie) => {
    const resP = baseRest.post(`${ENDPOINTS.MOVIE}`, movie);
    baseChecks.checkStatusCode(resP, 201);
    responseData.push(resP.status);
  });

  let getAllMovies = baseRest.get(ENDPOINTS.MOVIE);
  let ids = getAllMovies.json().map((item) => item._id);

  return { responseData: ids };
}

export default (responseData) => {
  group("Post ", () => {
    let id = responseData.responseData;
    let filmeAleatorio = randomItem(id);
    let body = {
      movieId: filmeAleatorio,
      userId: dataTickets[__VU].userId,
      seatNumber: dataTickets[__VU].seatNumber,
      price: dataTickets[__VU].price,
      showtime: dataTickets[__VU].showtime,
    };

    const res = baseRest.post(`${ENDPOINTS.TICKETS}`, body);
    baseChecks.checkStatusCode(res, 201);
    console.log(
      `Ticket criado no Movie ID ${filmeAleatorio} Status: ${res.status}`
    );
  });

  sleep(1);
};

export function teardown(responseData) {
  let ids = responseData.responseData;

  console.log("Teardown Deletando...");
  ids.forEach((id) => {
    const res = baseRest.del(`${ENDPOINTS.MOVIE}`, id);

    baseChecks.checkStatusCode(res, 200);
  });
}
