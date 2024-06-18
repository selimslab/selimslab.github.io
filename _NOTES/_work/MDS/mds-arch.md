---
title: MDS Arch
---
Manufacturing Data Services

[README.md - Repos (azure.com)](https://dev.azure.com/dynamicscrm/Solutions/_git/Manufacturing.Docs?path=/Docs/MDS/README.md&_a=preview)

[Architecture - Overview (azure.com)](https://dev.azure.com/dynamicscrm/Solutions/_wiki/wikis/MCI4Manufacturing/51340/Architecture)

![[mds-arch.png]]
### 1. Register an entity 

store metadata in cosmos and redis through Entity Management Service (EMS) hosted on AKS

store schema in data stores 

<details>

    <summary>Sample Register Entity Request</summary>

  

    { 

        "name": "name_of_entity", 

        "semanticRelevantFlag": true/false, //Whether entity needs to be a node on graph

        "tags": { 

            "ingestionRate": "",

            "ingestionFormat": "",

            "storageType": "",

            //etc.Tags that we have for an entity now 

        },

        "columns": [

            {

                "name": "",

                "id": "",

                "desc": "",

                "type": "",

                "semanticRelevantFlag": true/false , //Whether Column needs to be a property on graph node

                "example": "",

                "allowed values": "enumDict/regEx/range",  

                "PK": true/false, //Is this a PK of the entity? 

                "FK": "@targetTable" //Which table is it an FK for? 

            },

            {

  

            }

        ],

        "dtdlSchemaurl": “url_location_of_dtdl” 

    }

  

</details>

time series to ADX 

_semanticsRelevantFlag_ for graph store, Azure Digital Twin

default store is cosmos but change with tags 

dtdlSchemaurl is where the DTDL for the entity is stored. It is required for custom entities. 

Cosmos is the primary metadata store
Metadata is used to access the data from the default store or Graph store
This is necessary for Data Ingestion Service

<details>
<summary>Sample Entity doc saved in Metadata Store</summary>
```
{
    "name": "Equipment Segment Specification",
    "semanticRelevantFlag": true,
    "columns": [
        {
            "name": "ID",
            "displayName": "ID",
            "description": "A unique identification of a specific Equipment segment specification.",
            "type": "Alphanumeric",
            "mandatory": true,
            "semanticRelevantFlag": true
        },
        {
            "name": "description",
            "displayName": "Description",
            "description": "Contains additional information and descriptions of the Equipment segment specification definition.",
            "type": "String",
            "mandatory": false,
            "semanticRelevantFlag": true
        },
        ...
    ],
    "tags": {
        "ingestionFormat": "Batch",
        "ingestionRate": "Hourly",
        "storage": "Cold"
    },
    "dtdlSchema": {
        "@context": "dtmi:dtdl:context;2",
        "@id": "dtmi:digitaltwins:isa95:EquipmentSegmentSpecification;1",
        "@type": "Interface",
        "displayName": "Equipment segment specification",
        "description": "Equipment resources that are required for a process segment shall be presented as equipment segment specifications",
        "comment": "According to ANSI/ISA-95.00.02-2018 Enterprise-Control System Integration − Part 2: Objects and Attributes for - Approved 24 May 2018",
        "extends": [
            "dtmi:digitaltwins:isa95:BaseModel;1"
        ],
        "contents": [
            {
                "@type": "Relationship",
                "name": "isMadeUpOf",
                "displayName": "Is made up of",
                "description": "The related object(s) makes up part of this equipment segment specification as the whole",
                "target": "dtmi:digitaltwins:isa95:EquipmentSegmentSpecification;1"
            },
            ...
            {
                "@type": "Component",
                "name": "description",
                "displayName": "Description",
                "description": "Contains additional information and descriptions",
                "schema": "dtmi:digitaltwins:isa95:LangStringSet;1"
            },
            {
                "@type": "Property",
                "name": "hierarchyScope",
                "displayName": "Hierarchy scope",
                "description": "Identifies where the exchanged information fits within the role based equipment hierarchy. ",
                "schema": "string"
            }
        ]
    },
    "storageInfo" : {
        "defaultStore": "Cosmos | ADX | Blob",
        "adtModelId": "dtmi:digitaltwins:isa95:EquipmentSegmentSpecification;1",
        "adxTableName": "Equipment Segment Specification"
    }
}
```
</details>

### 2. Ingest 

Move event hub and blob storage with functions  to data stores

batch or stream using Azure functions

orchestrators and activity functions 

primary keys, rowid for batch, unique columns for stream 

possible stores are cosmos, ADT, ADX 

### Cosmos

only records in cosmos, no relationships 

### ADT 

ADT is decided by _semanticRelevantFlag_ either on entity or column level 

For twin relationships, source and target are created in parallel. So if one is not created yet, there is exponential retry. 

ADT keeps Data History in ADX 

### ADX 

TBD 

### 3. Consume 

Query entity schema from data stores, and metadata from cosmos and redis 

