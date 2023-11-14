import http from "k6/http";
import { sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { baseUrl } from './config.js';

export const options = {
  // Key configurations for Soak test in this section
  stages: [
    { duration: "5m", target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: "3h", target: 100 }, // stay at 100 users for 3 hours
    { duration: "5m", target: 0 }, // ramp-down to 0 users
  ],
};

export default () => {;;
  const response = http.get(baseUrl)
  sleep(Math.floor(Math.random() * 7));
};

export function handleSummary(data) {
  return {
    "reports/soak_report.html": htmlReport(data),
  };
}
