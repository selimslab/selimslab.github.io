param (
    [Parameter(Mandatory = $true)][string]$RootDirectory,
    [Parameter(Mandatory = $false)][string]$DropLocation
)
Write-Host "param RootDirectory: $RootDirectory "
Write-Host "param DropLocation $DropLocation "

$TemplateFolderPath = (Join-Path $RootDirectory ("\src\Solutions\Forms\Data"))
$EntitiesSchemaFilePath = (Join-Path $TemplateFolderPath ("\FormTemplateToEntityFieldsMapping.xml"))
$LanguagesSchemaFilePath = (Join-Path $TemplateFolderPath ("\TargetEntityToLanguageMapping.xml"))
$StylesPath = (Join-Path $TemplateFolderPath ("\styles.css"))
$StaticHTMLFolder = (Join-Path $DropLocation "\temp\StaticHTMLFolder")
$TempFolder = (Join-Path $DropLocation "\temp\Templates")

if (-Not (Test-Path($RootDirectory)))
{
    Write-Host """##vso[task.logissue type=error]The folder $RootDirectory does not exist."
    Exit
}

if (-Not (Test-Path($TemplateFolderPath)))
{
    Write-Host """##vso[task.logissue type=error]The folder $TemplateFolderPath does not exist."
    Exit
}

if (-Not (Test-Path($EntitiesSchemaFilePath)))
{
    Write-Host """##vso[task.logissue type=error]The folder $EntitiesSchemaFilePath does not exist."
    Exit
}

if (-Not (Test-Path($LanguagesSchemaFilePath)))
{
    Write-Host """##vso[task.logissue type=error]The folder $LanguagesSchemaFilePath does not exist."
    Exit
}

function prepareStaticHTMLFolder
{
    # Enable using a single style file for all templates, or any other dynamic content like localization etc. 

    param (
        $InputFolder,
        $OutputFolder
    )

    # create a folder to place static templates (files with inline styles, links replaced with static content)
    if (Test-Path $OutputFolder)
    {
        Write-Debug "OutputFolder already exists. Cleaning"
        remove-item $OutputFolder -force -recurse
    }
    mkdir $OutputFolder | Out-Null
    
    # copy html files in InputFolder to OutputFolder and its subfolders
    Write-Host "Copying templates from $InputFolder to $OutputFolder"
    Copy-Item $InputFolder -Destination $OutputFolder -Recurse -Force -Filter *.html

    # read styles 
    $styles = Get-Content $StylesPath

    # replace style links with static styles
    foreach ($filePath in Get-ChildItem $OutputFolder -Filter *.html -Recurse)
    {
        Write-Host "Replacing style links with static styles in $filePath"
        $fileContent = Get-Content $filePath
        $fileContent = $fileContent -replace '<link rel="stylesheet" href="styles.css" />', '<style type="text/css">$1</style>'
        Set-Content $filePath $fileContent
    }
}

function minify
{
    param (
        $InputFolder,
        $OutputFolder
    )

    $minifierPath = (Join-Path $DropLocation "Microsoft.Dynamics.Minifier.exe")
    if (-Not (Test-Path($minifierPath)))
    {
        throw "Could not find the Minifier at $minifierPath. Please build \src\Tools\Minifier folder."
    }
    if (Test-Path $OutputFolder)
    {
        Write-Debug "Temp folder already exists. Cleaning"
        remove-item $OutputFolder -force -recurse
    }

    mkdir $OutputFolder | Out-Null

    Write-Host "Minifying templates in $InputFolder to $OutputFolder"
    $process = start-process $minifierPath -ArgumentList "$InputFolder $OutputFolder" -NoNewWindow -PassThru -Wait -WorkingDirectory $InputFolder
    if ($process.ExitCode -ne 0)
    {
        Write-Host """##vso[task.logissue type=error]An error occured while minifying solution data."
        Exit
    }
}

function prepareConfig
{
    $dataTemplate = (Join-Path $TemplateFolderPath ("\data.xml"))
    Write-Host "Using $dataTemplate as base"
    $dataTemplateDestination = (Join-Path $TempFolder ("\msdynmkt_marketingformtemplate\config.xml"))
    if (-Not (Test-Path($dataTemplate)))
    {
        throw "Could not find the data.xml at $dataTemplate."
    }
    Copy-Item $dataTemplate -Destination $dataTemplateDestination
}
 
function prepareThumbnails
{
    foreach ($subPath in Get-ChildItem $TemplateFolderPath -Directory)
    {
        foreach ($jpgFile in Get-ChildItem "$TemplateFolderPath\$subPath\*\*.jpg")
        {
            $sourceFolder = $jpgFile.Directory.FullName
            Write-Host "Encoding thumbnail from $sourceFolder"
            $fileNameBaseName = $jpgFile.BaseName
            $fileName = "$fileNameBaseName.thumbnail"
            $destinationFolder = $sourceFolder.replace($TemplateFolderPath, $TempFolder)
            $encodedImage = [convert]::ToBase64String((Get-Content $jpgFile -Encoding Byte))
            New-Item -Path $destinationFolder -Name $fileName -Value $encodedImage
        }
    }
}

function main
{
    Write-Host "========================= Preparing data.xml for Forms ============================"
    try
    {   
        prepareStaticTemplatesFolder $TemplateFolderPath $StaticHTMLFolder
        minify $StaticHTMLFolder $TempFolder
        prepareConfig
        prepareThumbnails

        $SolutionDataPreparerFilePath = (Join-Path $DropLocation "Microsoft.Dynamics.SolutionDataPreparer.dll")

        if (-Not (Test-Path($SolutionDataPreparerFilePath)))
        {
            throw "Could not find the SolutionDataPreparer at $SolutionDataPreparerFilePath. Please build \src\Tools\SolutionDataPreparer folder."
        }

        [System.Reflection.Assembly]::LoadFrom($SolutionDataPreparerFilePath) | out-null

        $FileReader = New-Object Microsoft.Dynamics.SolutionDataPreparer.Services.FileReader
        $FileWriter = New-Object Microsoft.Dynamics.SolutionDataPreparer.Services.FileWriter
        $Serializer = New-Object Microsoft.Dynamics.SolutionDataPreparer.Serializer.CrmDataXmlSerializer

        Write-Host "Using data from $TemplateFolderPath"

        $TemplateSchemaService = New-Object Microsoft.Dynamics.SolutionDataPreparer.Services.TemplateSchemaService(
            $EntitiesSchemaFilePath,
            $LanguagesSchemaFilePath,
            $FileReader,
            $Serializer)
        $TemplateFilesRetriever = New-Object Microsoft.Dynamics.SolutionDataPreparer.Services.TemplateFilesRetriever($TempFolder)
        $TemplateFileService = New-Object Microsoft.Dynamics.SolutionDataPreparer.Services.TemplateFileService($TemplateFilesRetriever, $FileReader)
        $TemplateConfigService = New-Object Microsoft.Dynamics.SolutionDataPreparer.Services.TemplateConfigService($TempFolder, $Serializer, $FileReader)
        $SolutionDataService = New-Object Microsoft.Dynamics.SolutionDataPreparer.Services.SolutionDataService(($TemplateFolderPath + "\data.xml"), $Serializer, $FileWriter, $FileReader)
        $SolutionDataMerger = New-Object Microsoft.Dynamics.SolutionDataPreparer.Services.SolutionDataMerger
        $DataRecordMatcher = New-Object Microsoft.Dynamics.SolutionDataPreparer.Services.IdRecordMatcher

        $TemplateDataTransformer = New-Object Microsoft.Dynamics.SolutionDataPreparer.TemplateDataTransformer($TemplateSchemaService, $TemplateFileService, $SolutionDataService, $TemplateConfigService, $SolutionDataMerger, $DataRecordMatcher)
        $TemplateDataTransformer.TransformTemplateDataToCrmDataXml()

        Write-Host "Solution data is stored in $($TemplateFolderPath)\data.xml"
    }
    catch
    {
        Write-Host """##vso[task.logissue type=error]Exception: $($_.Exception)"
    }
}
