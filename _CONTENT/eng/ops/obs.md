---
---
1. logs + correlation ids
2. events: logs, metrics, traces
3. semantic monitoring, think in terms of user
4. test in prod, test txs, chaos


OpenTelemetry
Prometheus (metrics)
Loki (logs)
Jaeger (traces)
Grafana (viz)

loki compresses logs, indexes tags only.
grep only. no full text search

## sre
Observe
Simulate
Measure in terms of user
Postmortems
Progressive rollouts

For high stake cases:
slow and steady
human oversight
checks and balances