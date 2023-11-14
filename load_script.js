import http from "k6/http";
import { sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { baseUrl } from './config.js';

export let options = {
  stages: [
    { duration: "15s", target: 20 },
    { duration: "30s", target: 50 },
    { duration: "15s", target: 0 },
  ],
};

export default () => {;;
  const response = http.get(baseUrl)
  sleep(Math.floor(Math.random() * 7));
};

export function handleSummary(data) {
  return {
    "reports/load_report.html": htmlReport(data),
  };
}
