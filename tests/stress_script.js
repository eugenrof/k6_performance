import http from "k6/http";
import { sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { baseUrl } from './config.js';

export const options = {
  // Key configurations for Stress in this section
  stages: [
    { duration: "10m", target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
    { duration: "30m", target: 200 }, // stay at higher 200 users for 30 minutes
    { duration: "5m", target: 0 }, // ramp-down to 0 users
  ],
};

export default () => {;;
  const response = http.get(baseUrl)
  sleep(Math.floor(Math.random() * 7));
};

export function handleSummary(data) {
  return {
    "../reports/stress_report.html": htmlReport(data),
  };
}
