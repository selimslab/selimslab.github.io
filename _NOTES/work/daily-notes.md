---
---

## ACTIVE

### TODAY 



### BACKLOG 
 
learn rodne cislo/ TIN 

add TIN to ESPP stock program

Open broker account 

get fidelity letter from karoliny 

replace drivers licence 

embassy appointment 

ask about marriage visa 


# TECHNICAL 

## Import Forms 

Import-Solution 'https://aurorabapenv70e30.crm10.dynamics.com/' -Username 'aurorauser07@capintegration01.onmicrosoft.com' -Password '7wS7W!@Wr' -PathToSolution 'C:\CXP-Main\bin\Solutions\Forms.Solution\Debug\net471\CrmSolutions\FormsSolution\FormsSolution_managed.zip'

## Import Event  

[Setup EventManagementRealtimeLink in Aurora or Sx2 org](https://dev.azure.com/dynamicscrm/CXPlatform/_wiki/wikis/CXP%20team%20wiki/55667/Setup-EventManagementRealtimeLink-in-Aurora-or-Sx2-org)

Import-Solution 'https://aurorabapenv70e30.crm10.dynamics.com/' -Username 'aurorauser07@capintegration01.onmicrosoft.com' -Password '7wS7W!@Wr' -PathToSolution 'C:\Users\selimozturk\Downloads\CalendarSolutionManaged.zip'

Import-Solution 'https://aurorabapenv70e30.crm10.dynamics.com/' -Username 'aurorauser07@capintegration01.onmicrosoft.com' -Password '7wS7W!@Wr' -PathToSolution 'C:\Users\selimozturk\Downloads\ManagedIdentityForMicrosoftDynamicsTip_managed.cab'

Import-Solution 'https://aurorabapenv70e30.crm10.dynamics.com/' -Username 'aurorauser07@capintegration01.onmicrosoft.com' -Password '7wS7W!@Wr' -PathToSolution 'C:\Users\selimozturk\Downloads\DynamicsEventManagementSolution_managed.cab'

Import-Solution 'https://aurorabapenv70e30.crm10.dynamics.com/' -Username 'aurorauser07@capintegration01.onmicrosoft.com' -Password '7wS7W!@Wr' -PathToSolution 'C:\Users\selimozturk\Downloads\EventManagementRealtimeLinkSolution_managed.cab'


## L2 testing 

.\l2TestSetup.ps1 -orgurl https://mkttestfebmaster2702sg908.crm10.dynamics.com/ -orgid 2355ce29-64b6-ed11-a10e-0022482890c9

--nodeploy=true

### View logs of local minikube 

## A11Y

NVDA 

## Localization

.\SolutionPackager.exe /action:Extract /zipfile:C:\CXP-Main\bin\Solutions\Forms.Solution\Debug\net471\CrmSolutions\FormsSolution\FormsSolution_managed.zip /folder:C:\loc /loc

pac solution unpack --zipfile C:\CXP-Main\bin\Solutions\Forms.Solution\Debug\net471\CrmSolutions\FormsSolution\FormsSolution.zip --folder C:\loc --localize

## Kusto 

### tables 
* union ActorLog*, ServiceLog*
* AllClusters_ServiceLogs
* union *Events
* CommunicationEvents
* TraceEvents

## applicationTypeName
| where applicationTypeName in ("FormsApplicationType", "TrackedContentApplicationType", "UserTrackingApplicationType") 

### time windows 
let startTime = datetime(2023-04-27 00:00:00);
| where TIMESTAMP between (startTime..endTime)

| where LogTime > ago(2d)

| where env_time >= ago(1h)

## operators 
* distinct 
* count
* sort by 

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

* empower every person  
* clarity 
* energy
* deliver
* growth mindset
* customer empathy
* inclusion 

---

## ROADMAP 

Technical Excellence​

L61: able to document and communicated best practices and team standards; readily adopts and applies new engineering methods. (TSGs, Public docs)​

​Design & Architecture​

L61:  Understand product area and technology stack.  Design and present a medium feature considering multiple options and tradeoffs​


Planning & Execution​

L61:  Anticipates risks and roadblocks and communicates them ahead of time. Develops methods to track and report metrics. Shifts priorities as required to mitigate risks. ​


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


## Errors 

## IcMs

## Bugs 

# SOCIAL 


 
# CZECH BASICS


dekuju moc 

prominte

omlouvam se 

prosim 

---

ahoj 

ja sem Selim 

jsem doma 

jdu ven 

---

dobre rano 

dobry den 

dobry vecer 

Nashledanou / cau  

## digits 

* nula 
* jedna 
* dva 
* tri
* ctyri
* pet
* sest
* sedm
* osm
* devet
* deset

## time 

minut 

hodin 

den 

tydne 

mesic

rok

## words

maybe - mozna 



# OFFICIAL 

## Taxes 

kpmg 

tax id/TIN/rodne cislo  

## Insurance 

VZP ok 

## Stocks 

ESPP ok 



