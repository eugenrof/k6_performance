# k6 Performance Testing

A practical performance testing project built with [Grafana k6](https://k6.io/), demonstrating different workload models used to evaluate application behaviour under varying levels of traffic.

The project covers six performance testing scenarios:

- Smoke testing
- Load testing
- Stress testing
- Spike testing
- Soak testing
- Breakpoint testing

Each scenario is implemented as an independent k6 test script and generates an HTML performance report.

## Overview

The purpose of this project is to demonstrate how different workload profiles can be modelled and executed using k6.

Rather than treating performance testing as a single type of test, the project separates the scenarios according to the question they are intended to answer.

| Test Type | Objective | Workload Characteristics |
|---|---|---|
| Smoke | Validate basic system behaviour | Minimal load |
| Load | Evaluate behaviour under expected traffic | Gradual, sustained load |
| Stress | Identify degradation under increasing load | Increasing load beyond normal levels |
| Spike | Evaluate behaviour during sudden traffic changes | Abrupt load increase |
| Soak | Identify long-running stability issues | Sustained load over an extended period |
| Breakpoint | Identify system capacity limits | Progressive load increase |

## Test Strategy

### Smoke Testing

A lightweight test used to establish a basic performance baseline and verify that the target application responds correctly before executing more demanding scenarios.

The current implementation uses 5 virtual users for 10 seconds.

### Load Testing

Evaluates application behaviour under an expected level of concurrent traffic.

The current load profile ramps from 20 to 50 virtual users before gradually returning to zero:

```text
15s  →  20 VUs
30s  →  50 VUs
15s  →   0 VUs
```

### Stress Testing

Progressively increases the workload beyond normal operating conditions to identify performance degradation, capacity constraints and potential system bottlenecks.

### Spike Testing

Introduces sudden changes in traffic to evaluate how the system handles abrupt increases in demand and how it behaves during recovery.

### Soak Testing

Maintains sustained traffic for an extended period to help identify issues that may only become visible over time, such as resource exhaustion, memory leaks or gradual performance degradation.

### Breakpoint Testing

Progressively increases the workload to identify the point at which the application no longer meets the expected performance or reliability criteria.

## Project Structure

```text
k6_performance/
│
├── reports/
│   └── smoke_report_example.html
│
└── tests/
    ├── config.js
    ├── smoke_script.js
    ├── load_script.js
    ├── stress_script.js
    ├── spike_script.js
    ├── soak_script.js
    └── breakpoint_script.js
```

Each workload profile is isolated into its own test script, making the scenarios easy to execute, maintain and extend.

## Technology Stack

| Technology | Purpose |
|---|---|
| Grafana k6 | Performance test execution |
| JavaScript | Test scripting |
| k6 Reporter | HTML test reporting |

## Installation

### macOS

If you use [Homebrew](https://brew.sh/), install k6 with:

```bash
brew install k6
```

Verify the installation:

```bash
k6 version
```

### Linux

For Debian or Ubuntu:

```bash
curl -fsSL https://dl.k6.io/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/k6-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list

sudo apt-get update

sudo apt-get install k6
```

Verify the installation:

```bash
k6 version
```

For Fedora or CentOS:

```bash
sudo dnf install https://dl.k6.io/rpm/repo.rpm
sudo dnf install k6
```

Verify the installation:

```bash
k6 version
```

### Windows

Using Windows Package Manager:

```powershell
winget install k6 --source winget
```

Or using Chocolatey:

```powershell
choco install k6
```

Verify the installation:

```powershell
k6 version
```

### Docker

If you prefer to run k6 through Docker:

```bash
docker pull grafana/k6
```

Run a test using the official k6 Docker image:

```bash
docker run --rm -i grafana/k6 run - < tests/smoke_script.js
```

For additional installation options, see the [official k6 installation documentation](https://grafana.com/docs/k6/latest/set-up/install-k6/).

## Configuration

The target application URL is configured in:

```text
tests/config.js
```

The configuration file provides a central location for the target URL so that all performance scenarios can reuse the same configuration.

Example:

```javascript
export const baseUrl = 'https://your-target-application.com';
```

Update the value of `baseUrl` before running the tests.

Do not commit credentials, API keys or other sensitive information to the repository.

## Running the Tests

All commands below should be executed from the repository root.

### Smoke Test

```bash
k6 run tests/smoke_script.js
```

### Load Test

```bash
k6 run tests/load_script.js
```

### Stress Test

```bash
k6 run tests/stress_script.js
```

### Spike Test

```bash
k6 run tests/spike_script.js
```

### Soak Test

```bash
k6 run tests/soak_script.js
```

### Breakpoint Test

```bash
k6 run tests/breakpoint_script.js
```

Each test can be executed independently depending on the performance objective being investigated.

## Running with Docker

The same scenarios can be executed without installing k6 locally.

From the repository root:

```bash
docker run --rm -i grafana/k6 run - < tests/smoke_script.js
```

For another scenario:

```bash
docker run --rm -i grafana/k6 run - < tests/load_script.js
```

Replace the script name with the desired performance scenario.

## Reporting

The project uses `k6-reporter` to generate HTML reports from k6 test results.

An example report is included in:

```text
reports/smoke_report_example.html
```

The test scripts use k6's `handleSummary()` mechanism to generate the HTML report after execution.

Generated reports provide a consolidated view of the performance metrics collected during a test execution.

## Performance Metrics

The primary metrics to consider when analysing performance test results include:

| Metric | Description |
|---|---|
| Response time | Time required to receive a response |
| p90 | Response time below which 90% of requests complete |
| p95 | Response time below which 95% of requests complete |
| p99 | Response time below which 99% of requests complete |
| Throughput | Number of requests processed over time |
| Error rate | Percentage of unsuccessful requests |
| Virtual users | Number of concurrent simulated users |

Performance results should be interpreted against the application's expected workload, service-level objectives and acceptance criteria rather than against isolated numbers.

## Performance Test Lifecycle

The general workflow followed by the project is:

```text
Define workload
      |
      v
Configure target
      |
      v
Run baseline / smoke test
      |
      v
Execute selected workload
      |
      v
Collect performance metrics
      |
      v
Generate HTML report
      |
      v
Analyse system behaviour
      |
      v
Identify degradation / bottlenecks
```

## Test Scenario Selection

The appropriate test type depends on the performance question being investigated.

| Scenario | When to Use |
|---|---|
| Smoke | Before executing larger performance tests |
| Load | To validate expected production-like traffic |
| Stress | To understand behaviour beyond expected capacity |
| Spike | To evaluate sudden traffic changes |
| Soak | To identify long-running stability issues |
| Breakpoint | To determine system capacity limits |

A typical performance testing sequence can begin with a smoke test, followed by load testing and progressively more demanding scenarios based on the objectives and results.

## What This Project Demonstrates

This project demonstrates practical experience with:

- Performance test design
- Workload modelling
- Concurrent user simulation
- Smoke testing
- Load testing
- Stress testing
- Spike testing
- Soak testing
- Breakpoint testing
- k6 scripting
- HTTP performance testing
- Performance metrics analysis
- HTML performance reporting
- Separation of performance scenarios
- Centralised test configuration

## Potential Improvements

Possible extensions for a more production-oriented performance testing setup include:

- Performance thresholds and automated pass/fail criteria
- Environment-specific configuration
- CI/CD integration
- Additional API and business-flow scenarios
- Authentication and test-data management
- Trend analysis between test executions
- Grafana dashboards and time-series monitoring
- Automated performance regression detection

## Author

**Eugen Rof**

Senior QA Engineer with 14+ years of experience in Software Testing, Test Automation and Quality Engineering.

[Portfolio](https://eugenrof.dev/) · [GitHub](https://github.com/eugenrof)

---

This repository is part of my broader QA and Quality Engineering portfolio.
