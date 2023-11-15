import http from "k6/http";
import { sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { baseUrl } from './config.js';

export const options = {
  // Key configurations for spike in this section
  stages: [
    { duration: "3m", target: 1000 }, // fast ramp-up to a high point
    { duration: "1m", target: 0 }, // quick ramp-down to 0 users
  ],
};

export default () => {;;
  const response = http.get(baseUrl)
  sleep(Math.floor(Math.random() * 7));
};

export function handleSummary(data) {
  return {
    "../reports/spike_report.html": htmlReport(data),
  };
}
