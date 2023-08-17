---
---

# TECHNICAL
## tprompt

nikola jelisavac 

our docs already included but it can't even work as good as a simple text index. The real value here is created by each one of us, even writing a few lines has more impact than gpt 

can we use the search better? https://learn.microsoft.com/en-us/azure/devops/project/search/functional-code-search?view=azure-devops

## On call 

Redirect -> Consent DRI 

## Import Forms

Import-Solution 'https://aurorabapenv2fbdc.crm10.dynamics.com/' -Username 'aurorauser07@capintegration01.onmicrosoft.com' -Password '7wS7W!@Wr' -PathToSolution 'C:\CXP-Main\bin\Solutions\Forms.Solution\Debug\net471\CrmSolutions\FormsSolution\FormsSolution_managed.zip'

## Import Event

[Setup EventManagementRealtimeLink in Aurora or Sx2 org](https://dev.azure.com/dynamicscrm/CXPlatform/_wiki/wikis/CXP%20team%20wiki/55667/Setup-EventManagementRealtimeLink-in-Aurora-or-Sx2-org)

Import-Solution 'https://aurorabapenv70e30.crm10.dynamics.com/' -Username 'aurorauser07@capintegration01.onmicrosoft.com' -Password '7wS7W!@Wr' -PathToSolution 'C:\Users\selimozturk\Downloads\CalendarSolutionManaged.zip'

Import-Solution 'https://aurorabapenv70e30.crm10.dynamics.com/' -Username 'aurorauser07@capintegration01.onmicrosoft.com' -Password '7wS7W!@Wr' -PathToSolution 'C:\Users\selimozturk\Downloads\ManagedIdentityForMicrosoftDynamicsTip_managed.cab'

Import-Solution 'https://aurorabapenv70e30.crm10.dynamics.com/' -Username 'aurorauser07@capintegration01.onmicrosoft.com' -Password '7wS7W!@Wr' -PathToSolution 'C:\Users\selimozturk\Downloads\DynamicsEventManagementSolution_managed.cab'

Import-Solution 'https://aurorabapenv70e30.crm10.dynamics.com/' -Username 'aurorauser07@capintegration01.onmicrosoft.com' -Password '7wS7W!@Wr' -PathToSolution 'C:\Users\selimozturk\Downloads\EventManagementRealtimeLinkSolution_managed.cab'

## L2 testing

.\l2TestSetup.ps1 -orgurl https://aurorabapenv2fbdc.crm10.dynamics.com/ -orgid 61cfe3ed-5e0b-ee11-a66e-00224820cbfd

-nobuild -nodeploy

--nodeploy=true

what is the difference? when to use nodeploy?

### View logs of local minikube

## A11Y

NVDA

## Localization

.\SolutionPackager.exe /action:Extract /zipfile:C:\CXP-Main\bin\Solutions\Forms.Solution\Debug\net471\CrmSolutions\FormsSolution\FormsSolution_managed.zip /folder:C:\loc /loc

pac solution unpack --zipfile C:\CXP-Main\bin\Solutions\Forms.Solution\Debug\net471\CrmSolutions\FormsSolution\FormsSolution.zip --folder C:\loc --localize


# Logs

https://mktcxptestsg908rcorg2903.crm10.dynamics.com/api/data/v9.2/plugintracelogs?$top=10&$orderby=createdon%20asc

## Kusto

### tables

- union ActorLog*, ServiceLog*
- AllClusters_ServiceLogs
- union *Events
- CommunicationEvents
- TraceEvents

## applicationTypeName

| where applicationTypeName in ("FormsApplicationType", "TrackedContentApplicationType", "UserTrackingApplicationType")

### time windows

let startTime = datetime(2023-04-27 00:00:00);
| where TIMESTAMP between (startTime..endTime)

| where LogTime > ago(2d)

| where env_time >= ago(1h)

### operators

- distinct
- count
- sort by

### examples

AllClusters_ServiceLogs
| where Service startswith "landingpageforms"
| where Message contains "Linked Submission Id"

## API

/api/data/v9.0/

## Formeditor

export a zip from powerapps and replace in repo

## Formloader

comes from cdn

test with Fiddler

## Fiddler

set cedebug to true

nocache

disable cache

msdynmkt_CxpFormEditorModule.WebResource

C:\CXP-Main\src\Solutions\Forms\WebResources\WebResource\.ts\webresource.js

-

msdynmkt_CxpFormEditorModule.json

C:\CXP-Main\src\Solutions\Forms\Solution\unmanaged\WebResources\msdynmkt_CxpFormEditorModule.json

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

### How to debug locally?

It's possible to attach a debugger to a K8 pod

[K8 debugging guide](https://dev.azure.com/dynamicscrm/CXPlatform/_wiki/wikis/CXP%20team%20wiki/6685/k8s-debugging?anchor=vs-code)

The l2TestSetup script has sk-deploy or sk-startdev, it will start a local minikube cluster and you can see the pods from the K8 extension

The steps here will enable you to attach a debugger to running pods

ctrl + shift + P -> Run tasks -> Publish

Install Kubernetes extension by Microsoft

ctrl + shift + P -> change kubernetes namespace -> cxp

Then you can start a debug session with F5 or Run menu

Add a breakpoint

Send a request to the local cluster at public-localhost.. or start an L2 test

Check "run and debug" menu of vscode