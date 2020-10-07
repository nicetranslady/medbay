function drawNav (file) {
    // Display file information
    // Initialise variables
    var userData = {};

    // create object to handle JSON file
    userData = file.data;
    
    // Make Nav visibile
    document.getElementById("nav").hidden = false;

    // Check to see if the subject is not null, then draw the subject content
    // File Details
    writeFileDetails (file);
    // Problems
    if (userData.Problems != null) {
        // If there are Medications, dsplay them
        writeProblems (userData.Problems);
    }
    // Medications
    if (userData.Medications != null) {
        // If there are Medications, dsplay them
        writeMedications (userData.Medications);
    }
    // Test Results
    if (userData.TestResults != null) {
        // If there are Test Results, dsplay them
        writeTestResults (userData);
    }

    // Update nav to enable tabs and show the first available data
}

function writeFileDetails (file) {
    // Write information from file
    // Initialise variables
    var filename = "",
        filesize = 0,
        fileCode = "",
        NHSNumber = "",
        NHSNumberDisplay = "",
        provider = "",
        source = "",
        userData = {},
        userDOB = "",
        username = "";

    // create object to handle JSON file
    userData = file.data;

    // Get variables
    filename = file.name;
    filesize = file.size;
    source = userData.Source.System.Name;
    provider = userData.Source.System.Provider;
    username = userData.Source.User.Name;
    userDOB = userData.Source.User.DateOfBirth;
    for (i in userData.Source.User.Identifiers) {
        if (userData.Source.User.Identifiers[i].Type == "NhsNumber") {
            // Format and display NHS Number
            NHSNumber = userData.Source.User.Identifiers[i].Value;
            NHSNumberDisplay = NHSNumber.slice (0,3) + " ";
            NHSNumberDisplay += NHSNumber.slice (3,6) + " ";
            NHSNumberDisplay += NHSNumber.slice (6);
        }
    }

    // Write code
    fileCode = '<p>&nbsp;</p>';
    fileCode += '<p>File Name: ' + filename + '</p>';
    fileCode += '<p>File Size: ' + filesize + '</p>';
    fileCode += '<p>Source: ' + source + '</p>';
    fileCode += '<p>Provider: ' + provider + '</p>';
    fileCode += '<p>User Name: ' + username + '</p>';
    fileCode += '<p>Date of Birth: ' + userDOB + '</p>';
    fileCode += '<p>NHS Number: ' + NHSNumberDisplay + '</p>';

    //Write File Details
    document.getElementById("nav-file").innerHTML = fileCode;
}

function writeProblems (problems) {
    // Write Problems subject data into the nav details div
    // Initialise Variables
    var
        i = 0,
        problemsCode = "",
        problemTypeCode = "";

    // Enable Problems tab in nav and details
    document.getElementById("nav-problems-tab").innerHTML = 'Problems <span class="badge badge-primary">0</span>';
    document.getElementById("nav-problems").hidden = false;

    // Review Problems
    // Parse Problems
    // Start with Current
    problemsCode = parseProblems(problems.Current);
    // Create Current type
    i = Number(problems.Current.length) - 1
    problemTypeCode += '<div><button class="btn btn-light" type="button" data-toggle="collapse" data-target="#current" aria-expanded="false" aria-controls="current" id="acuteButton">Current <span class="badge badge-primary">' + (Number(i) + 1) + '</span></button></div>';
    problemTypeCode += '<div class="collapse" id="current"><div class="card card-body">';
    problemTypeCode += problemsCode;
    problemTypeCode += '</div></div>'; 

    // Then Past
    problemsCode = parseProblems(problems.Past);
    // Create Past type
    i = Number(problems.Past.length) - 1
    problemTypeCode += '<div><button class="btn btn-light" type="button" data-toggle="collapse" data-target="#past" aria-expanded="false" aria-controls="past" id="repeatButton">Past <span class="badge badge-primary">' + (Number(i) + 1) + '</span></button></div>';
    problemTypeCode += '<div class="collapse" id="past"><div class="card card-body">';
    problemTypeCode += problemsCode;
    problemTypeCode += '</div></div>'; 

    //Write Problems
    document.getElementById("nav-problems").innerHTML = problemTypeCode;
    // Update Total number of Problems
    i = Number(problems.Current.length) + Number(problems.Past.length);
    document.getElementById("nav-problems-tab").innerHTML = 'Problems <span class="badge badge-primary">' + (Number(i)) + '</span>';
}

function writeMedications (medications) {
    // Write Medications subject data into the nav details div
    // Initialise Variables
    var
        i = 0,
        medicationsCode = "",
        medicationTypeCode = "";

    // Enable Medications tab in nav and details
    document.getElementById("nav-medications-tab").innerHTML = 'Medications <span class="badge badge-primary">0</span>';
    document.getElementById("nav-medications").hidden = false;

    // Review Medications
    // Parse Medication
    // Start with Acute
    medicationsCode = parseMedication(medications.Acute);
    // Create Acute type
    i = Number(medications.Acute.length) - 1
    medicationTypeCode += '<div><button class="btn btn-light" type="button" data-toggle="collapse" data-target="#acute" aria-expanded="false" aria-controls="acute" id="acuteButton">Acute <span class="badge badge-primary">' + (Number(i) + 1) + '</span></button></div>';
    medicationTypeCode += '<div class="collapse" id="acute"><div class="card card-body">';
    medicationTypeCode += medicationsCode;
    medicationTypeCode += '</div></div>'; 

    // Then Repeat
    medicationsCode = parseMedication(medications.Repeat);
    // Create Repeat type
    i = Number(medications.Repeat.length) - 1
    medicationTypeCode += '<div><button class="btn btn-light" type="button" data-toggle="collapse" data-target="#repeat" aria-expanded="false" aria-controls="repeat" id="repeatButton">Repeat <span class="badge badge-primary">' + (Number(i) + 1) + '</span></button></div>';
    medicationTypeCode += '<div class="collapse" id="repeat"><div class="card card-body">';
    medicationTypeCode += medicationsCode;
    medicationTypeCode += '</div></div>'; 

    //Write Medications
    document.getElementById("nav-medications").innerHTML = medicationTypeCode;
    // Update Total number of Medications
    i = Number(medications.Acute.length) + Number(medications.Repeat.length);
    document.getElementById("nav-medications-tab").innerHTML = 'Medications <span class="badge badge-primary">' + (Number(i)) + '</span>';
}

function writeTestResults (userData) {
    // Write Test Results subject data into the nav details div
    // Initialise Variables
    var
        i = 0,
        testResultCode = "";

    // Enable Test Results tab in nav and details and emty the nav content
    document.getElementById("nav-testResults-tab").innerHTML = 'Test Results <span class="badge badge-primary">0</span>';
    document.getElementById("nav-testResults").hidden = false;
    document.getElementById("nav-testResults").innerHTML = "";

    // Review Test Results
    for (i in userData.TestResults) {
        // Parse Test Result
        testResultCode = parseTestResult(userData.TestResults[i]);
        //Write Test Result
        document.getElementById("nav-testResults").innerHTML += testResultCode;
        // Update Total number of Tests
        document.getElementById("nav-testResults-tab").innerHTML = 'Test Results <span class="badge badge-primary">' + (Number(i) + 1) + '</span>';
    }
}

function createTestResultID (testResultID) {
    // Create a Test Result ID for use in the structure of Test Result Lines
    testResultID = testResultID.replace(/ /g,"");
    testResultID = testResultID.replace(/-/g,"");
    testResultID = testResultID.replace(/\//g,"");
    return testResultID;
}

function parseProblems (problems) {
    // Parse Medication information and return HTML
    // Initialise variables
    var
        description = "",
        i = 0,
        startDate = "",
        problemCode = "";

    // Create medications code
    for (i in problems) {
        // Get data
        description = problems[i].Description;
        startDate = problems[i].StartDate;

        // Write the Medication code
        problemCode += '<div class="card card-body text-black bg-light">';
        problemCode += "<strong>" + description + "</strong> ";
        problemCode += "Start Date: " + startDate;
        problemCode += '</div>';
    }

    // Return Medication HTML
    return problemCode;
}

function parseMedication (medications) {
    // Parse Medication information and return HTML
    // Initialise variables
    var
        description = "",
        i = 0,
        lastIssued = "",
        medicationCode = "";

    // Create medications code
    for (i in medications) {
        // Get data
        description = medications[i].Description;
        lastIssued = new Date(medications[i].LastIssuedDate);

        // Write the Medication code
        medicationCode += '<div class="card card-body text-black bg-light">';
        medicationCode += "<strong>" + description + "</strong> ";
        medicationCode += "Last Issued: " + lastIssued.toDateString();
        medicationCode += '</div>';
    }

    // Return Medication HTML
    return medicationCode;
}

function parseTestResult (testResult) {
    // Parse test result information and return HTML
    // Initialise variables
    var
        buttonID = "",
        caption = "",
        captionID = "",
        cardColour = "",
        created = "",
        i = 0,
        normalRange = [],
        normalRangeLower = "",
        normalRangeUpper = "",
        result = 0,
        resultArray = [],
        status = {"Total":0, "Warning":0, "Danger":0},
        testResultCode = "",
        testResultLinesCode = "",
        unit = "";
    
    // Create Test Result Lines code
    for (i in testResult.TestResultLines) {
        // Learn Normal Range for Result Line
        normalRange = testResult.TestResultLines[i].NormalRange.split(" - ");
        if (normalRange[0] != "N/A") {
            normalRangeLower = Number(normalRange[0]);
            normalRangeUpper = Number(normalRange[1]);
        }
        // Learn Result and SI Unit
        resultArray = testResult.TestResultLines[i].Result.split(" ");
        result = Number(resultArray[0]);
        unit = resultArray[1];

        // Learn Status of result and get the card colour ready
        // Default is Success
        cardColour = "text-white bg-success";
        if (normalRange[0] != "N/A") {
            // Check to see if it is a Warning
            if (result == normalRangeLower || result == normalRangeUpper) {
                cardColour = "text-black bg-warning";
                status.Warning ++;
            }
            // Or a Danger
            if (result < normalRangeLower || result > normalRangeUpper) {
                cardColour = "text-white bg-danger";
                status.Danger ++;
            }
        } else {
            // If there is no normal ranges, paint it grey
            cardColour = "text-black bg-light";
        }
        status.Total ++;

        // Write the Test Result Lines code
        testResultLinesCode += '<div class="card card-body ' + cardColour + '">';
        testResultLinesCode += testResult.TestResultLines[i].Description;
        testResultLinesCode += "<strong>" + result + " " + unit + "</strong> ";
        if (normalRange[0] != "N/A") {
            testResultLinesCode += "Normal Range: " + normalRangeLower + " - " + normalRangeUpper;
        } else {
            testResultLinesCode += "Normal Range: " + normalRange[0];
        }
        testResultLinesCode += '</div>';
    }
    
    // Create Test Result Caption
    created = testResult.Created;
    title = testResult.Title;
    caption = title + " (" + created + ") ";
    caption += '<span class="badge badge-primary">' + status.Total + '</span>&nbsp;';
    if (status.Warning > 0) {
        caption += '<span class="badge badge-warning">' + status.Warning + '</span>&nbsp;';
    }
    if (status.Danger > 0) {
        caption += '<span class="badge badge-danger">' + status.Danger + '</span>';
    }
    captionID = createTestResultID(title + created);
    buttonID = captionID + "button";

    // Create Test Result code
    testResultCode = '<div><button class="btn btn-light" type="button" data-toggle="collapse" data-target="#' + captionID + '" aria-expanded="false" aria-controls="' + captionID + '" id="' + buttonID + '">' + caption + '</button></div>';
    testResultCode += '<div class="collapse" id="' + captionID + '"><div class="card card-body">';
    testResultCode += testResultLinesCode;
    testResultCode += '</div></div>'; 

    // Return Test Result HTML
    return testResultCode;
}

function fileSelected(file) {
    // check to ensure that file is of desired type
    if (file.type == "application" && file.subtype=="json") {
        // If file is JSON then draw the page
        drawNav (file);
    } else {
        // If the file isn't JSON, the let the user know
        createP("File is not a valid JSON file")
    }
}

function setup() {
    noCanvas();
    // Create a file input box
    createFileInput(fileSelected);
}