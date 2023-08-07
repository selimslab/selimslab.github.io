---
---

# ACTIVE

% monitor

unicode icm 

tprompt, nikola jelisavac

bugbash bugs
  
saw setup 

pc setup 

on-call readiness

1:1 team sessions 

connect feedback 

## Q&A 

on-call payroll? turgaya

basic tax deduction 

## Official

Rodne 

Embassy sign 

DL

## Tax 

1. get receipts of donations 
2. life insurance deduction
3. basic tax deduction 
4. etc 
   
### KPMG tax meeting notes 

PoA

Example Payroll calc 

Possible to  deduct life insurance and donations 

report until 2024 apr 1 or july 1 

stock market value + ESPP gain 


# IDEAS 

scrape wiki and list most visited wiki pages 


# TECHNICAL

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

## VALUES

- empower every person
- clarity
- energy
- deliver
- growth mindset
- customer empathy
- inclusion

---

## ROADMAP

Technical Excellence​

L61: able to document and communicated best practices and team standards; readily adopts and applies new engineering methods. (TSGs, Public docs)​

​Design & Architecture​

L61:  Understand product area and technology stack. Design and present a medium feature considering multiple options and tradeoffs​

Planning & Execution​

L61: Anticipates risks and roadblocks and communicates them ahead of time. Develops methods to track and report metrics. Shifts priorities as required to mitigate risks. ​

E2E Quality​

L61: ensure tests are written at lowest level possible,
writes testable code and robust tests,
implementation tradeoffs clearly identified and discussed ahead of time,
proactively identifies / addresses trends; able to cover triage​

DevOps​

L61: Considers rollout plan (including risk-mitigation) during feature design & development. Ensures proper customer and operation telemetry is in place prior to roll out. Priorities quick issue mitigation to minimize customer impact. Efficient DRI for the feature team area, who can be the primary owner for most Sev2 LSIs during DRI rotation. ​

Collaboration​

L61: Readily engages with others on the team to complete work ​

Customer focus​

L61: customer advocate, participates on feedback tickets and forums; provides feedback based on the customer needs; incorporates customer feedback into new product/feature decision making; generates new ideas to meet customer needs. Develops multiple options to meet customer needs ​

Leadership (clarity / energy / success)​

L61: Exudes confidence in the product area, feature being worked upon, seeking clarity where needed.
Clearly (& precisely) communicates challenges,
plans & status of work to stake holders. Conduct Agile design reviews sharing knowledge & inviting feedback from others. Contributes to the hiring process, acts are technical mentor, contributes to identifying and solving team efficiency and moral issues; understand team strategy and able to explain mapping between person contributions and team’s strategy. Proactively understands and support team priorities.

---

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

## Errors

## IcMs

## Bugs

# SOCIAL

## Vacation plan

april 1w 5

july 2w 8

sep 1w 5

nov 1w 4

dec 1w 3


# OFFICIAL

## Taxes

kpmg

tax id/TIN/rodne cislo

## Insurance

VZP ok

## Stocks

ESPP ok

## Immigration

New partner EY
