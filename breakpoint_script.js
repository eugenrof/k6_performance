import http from "k6/http";
import { sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { baseUrl } from './config.js';

export const options = {
  // Key configurations for breakpoint in this section
  executor: "ramping-arrival-rate", //Assure load increase if the system slows
  stages: [
    { duration: "2h", target: 10000 }, // just slowly ramp-up to a HUGE load
  ],
};

export default () => {;;
  const response = http.get(baseUrl)
  sleep(Math.floor(Math.random() * 7));
};

export function handleSummary(data) {
  return {
    "reports/breakpoint_report.html": htmlReport(data),
  };
}
