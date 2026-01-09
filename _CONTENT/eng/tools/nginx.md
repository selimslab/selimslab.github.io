---
---
serve static files fast with zero-copy sendfile on

worker_processes = cpu cores 
keepalive_timeout

max upload size client_max_body_size 

gzip on 

load balancing
    least_conn

health checks
failover
sticky sessions
buffer
    proxy_buffering

tls termination 
manage certs 
    ssl_certificate

upgrade http1.1 to 2, 3

event-driven concurrency

rate-limit 
    limit_req
ip allowlist 
    allow/deny

caching 
    proxy_cache

log 
    access_log

```
  worker_processes auto;

  events {
      worker_connections 1024;
  }

  http {
      # Static files
      root /var/www/html;
      index index.html;

      # Reverse proxy
      location /api {
          proxy_pass http://localhost:3000;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
      }
  }

  Most-Used Directives

  Server Block
  - listen 80 or listen 443 ssl http2
  - server_name example.com
  - root /path/to/files

  Reverse Proxy
  - proxy_pass http://backend
  - proxy_set_header Host $host
  - proxy_set_header X-Forwarded-For $remote_addr

  SSL
  - ssl_certificate /path/to/cert.pem
  - ssl_certificate_key /path/to/key.pem

  Performance
  - gzip on
  - client_max_body_size 10m

  Load Balancing
  upstream backends {
      server 10.0.0.1;
      server 10.0.0.2;
  }
  location / {
      proxy_pass http://backends;
  }

  Rate Limiting
  limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
  location /api {
      limit_req zone=api burst=20;
  }

```