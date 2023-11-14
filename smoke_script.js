import http from "k6/http";
import { sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { baseUrl } from './config.js';

export const options = {
  vus: 5, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: "10s", // This can be shorter or just a few iterations
};

export default () => {;;
  const response = http.get(baseUrl)
  sleep(Math.floor(Math.random() * 7));
};

export function handleSummary(data) {
  return {
    "reports/smoke_report.html": htmlReport(data),
  };
}


