---
---
OpenTelemetry → Prometheus (metrics) + Loki (logs) + Jaeger (traces) → Grafana (visualization)

loki compresses logs, indexes tags only. grep only. no full text search 

Percentiles can't be aggregated 


---

1. logs + correlation ids 
2. events: logs, metrics, traces
3. semantic monitoring, think in terms of user
4. test in prod, test txs, chaos 