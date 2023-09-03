---
tags: sys 
---


## Goals  

1. Ingest data from relational dbs and or csv files 
2. Run a graph of SQL transforms to prepare it for modeling 
3. Persist clean results 
4. Make long-running operations async 
5. Make it easy to follow the progress, logs, and errors 

## Definitions 

Let's call a pipeline run a flow. 

A flow may include many tasks 


## Assumptions 

Types are all persisted in a db, say, sqlite for a simple beginning 

Multiple flows can run at the same time 

Types have an integer ID auto-created by db and a CreatedUTC

Each type is immutable once created, except the FlowOutput  

## The Domain

a DataStore has a ConnectionInfo 

DBConnectionInfo has a host, port, user, password, db name 

FileConnectionInfo has a path  

RelationalDB, ColumnarDB, and File are DataStores 

a FlowInput has a list of source data store IDs, a target data store id, and other necessary input. 

FlowState could be READY, RUNNING, CANCELLED, FAILED, COMPLETED 

Progress has a percent and update time. 

Logs and Errors has a list of strings and an update time. 

Progress, Logs, and Errors are not db types 

FlowOutput has a FlowState, Progress, Logs, and Errors 

a Flow has a FlowInputID, a FlowOutputID


## Public API

the HTTP REST API using standard HTTP verbs like GET and POST 

Semantic versioning as api/v1.0

1. create and read a flow input  
2. create, read, or cancel a flow  

GET /flow-inputs/{id}
POST /flow-inputs

GET /flows/{id}
POST /flows
POST /flows/cancel/{id}

## Implementation

1. API user (a person or another service)
2. API routes
3. Route handlers
4. Services to interact with data layer, execute business logic, log, authenticate, .. 

For example POST /flow-inputs will use a service to create the input in db and return the created entity complete with its ID, and created time 

POST /flows will use multiple services to get the flow input with provided ID from the db, create an output entity, and start a FlowRunner service in a separate thread to run the flow and update the output 

Now let's define the services with more detail 

## Services 

Data Layer - functions for DB CRUD 
Business Layer - functions to execute business logic 

Services create a tree of building blocks




