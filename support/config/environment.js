export const url = {
  environment: {
    hml: {
      url: "http://localhost:3000",
    },
  },
};

export const options = {
  scenarios: {
    SmokeTest: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [{ duration: "15s", target: 3 }],
    },
    LoadTest: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "1m", target: 100 },
        { duration: "5m", target: 100 },
        { duration: "4m", target: 0 },
      ],
    },
    StressTest: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "5m", target: 200 }, //
        { duration: "20m", target: 200 }, //
        { duration: "5m", target: 0 }, //
      ],
    },
    SpikeTest: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "2m", target: 2000 }, // fast ramp-up to a high point // No platea
        { duration: "1m", target: 0 }, // quick ramp-down to 0 users
      ],
    },

    SoakTest: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "5m", target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
        { duration: "35m", target: 100 }, // stay at 100 users for 8 hours!!!
        { duration: "5m", target: 0 }, // ramp-down to 0 users],
      ],
    },
  },

  thresholds: {
    tempoMenorQue100: {
      http_req_failed: ["rate < 0.01"],
      http_req_duration: ["p(95)<100"],
    },
    tempoMenorQue200: {
      http_req_failed: ["rate < 0.01"],
      http_req_duration: ["p(95)<200"],
    },
    tempoMenorQue300: {
      http_req_failed: ["rate < 0.01"],
      http_req_duration: ["p(95)<300"],
    },
  },
  teardownTimeout: "10s",
};
