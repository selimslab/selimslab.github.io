---
tags:
---

## API 

1. **/dmm/copilot/queries**

**POST** 

```
{
  	"Ask": "<user_query>",
  	"SkillId": "<SkillId>" (OPTIONAL)
}
```
**Supported skills** 

- KQLQueryGenerator
- ExecuteKQLQuery
- QueryPayloadGenerator
- EntityExtraction

if no skillid, KQL generate&execute are default 

**Response** 
application/json is default 

text/markdown possible 


2. 