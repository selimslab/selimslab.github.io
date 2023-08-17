---
---

.\l2TestSetup.ps1 -orgurl https://aurorabapenv2fbdc.crm10.dynamics.com/ -orgid 61cfe3ed-5e0b-ee11-a66e-00224820cbfd

-nobuild -nodeploy

--nodeploy=true

## How to L2 test?

[Test levels](https://dev.azure.com/dynamicscrm/CXPlatform/_wiki/wikis/CXP%20team%20wiki/5215/Test-Levels)

We test the APIs of deployed services and integrations in L2. For example CDS integration of a new endpoint.

For that we will need a machine to test.
An Aurora Machine is a sandbox VM provisioned to behave like a real D365 environment,
with an accompanying admin user account.
These machines can be checked out for development use through [the portal ](https://portal.microsoftaurora365.com/Resource/UserResources)

Import necessary solutions

Create a release for [CXP CDS Package Import into Private Org](https://dev.azure.com/dynamicscrm/CXPlatform/_release?definitionId=227) and provide details of your aurora

If you need to setup Event Management, also follow [this guide](https://dev.azure.com/dynamicscrm/CXPlatform/_wiki/wikis/CXP%20team%20wiki/55667/Setup-EventManagementRealtimeLink-in-Aurora-or-Sx2-org)

---

Now you have an aurora with necessary solutions imported

Make sure you are on MS VPN

.\l2TestSetup.ps1 -orgurl [your org url] -orgid [your org id]

After you deploy the local minikube with the above script, start the tests from either VS or from vscode with l2 commmand

## Evtmgt CDS integration test L2

Create entities, local ok, ci fails
call eventClient, both fails

temporary? no
docker? no
HttpClientBaseUrls? no
old aurora? no, new aurora the same
eventClient? no, formclient the same
config? maybe
91be x
lp-config x
l2 cds doc x
consent x
sxs has auth exception

https://dev.azure.com/dynamicscrm/CXPlatform/_wiki/wikis/CXP%20team%20wiki/40876/Connecting-to-Aurora-or-TIP-dataverse-org-from-locally-running-service

CI has what?

- CI cant find uniquename - might be solved
- Local cant call eventclient, do we have to call? how else can we test CDS integration of the public api?

other notes:

- sk-startdev and sk-deploy are flaky, they work today and fail tomorrow
- doesn't work without cloudtest flag, then it deploys using cloudtest settings
- "LocalDiscovery": false in cloud tests

how can I see logs of CI pipeline container?
what does forms client do in CI?
