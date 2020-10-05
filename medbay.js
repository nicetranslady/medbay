function displayFile (file) {
    // Display fie information
    // Initialise variables
    var userData = {};

    // create object to handle JSON file
    userData = file.data;

    // Draw the Jumbotron
    drawJumbotron (file);

    // Draw the nav
    drawNav (userData);
}

function drawJumbotron (file) {
    // Write information from file into the Jumbotron
    // Initialise variables
    var
        filename = "",
        filesize = 0,
        jumboCode = "",
        NHSNumber = "",
        NHSNumberDisplay = "",
        provider = "",
        source = "",
        userData = {},
        userDOB = "",
        username = "";

    // create object to handle JSON file
    userData = file.data;

    // Make the Jumbotron visible
    document.getElementById("jumbo").hidden = false;

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
    jumboCode = '<h1>Patient Access JSON File Output</h1>';
    jumboCode += '<p>File Name: ' + filename + '</p>';
    jumboCode += '<p>File Size: ' + filesize + '</p>';
    jumboCode += '<p>Source: ' + source + '</p>';
    jumboCode += '<p>Provider: ' + provider + '</p>';
    jumboCode += '<p>User Name: ' + username + '</p>';
    jumboCode += '<p>Date of Birth: ' + userDOB + '</p>';
    jumboCode += '<p>NHS Number: ' + NHSNumberDisplay + '</p>';

    // Insert HTML jumboCode into the Jumbotron
    document.getElementById("jumbo").innerHTML = jumboCode;
}

function drawNav (userData) {
    // Make Nav visibile
    document.getElementById("nav").hidden = false;

    // Check to see if the subject is not null, then draw the subject content
    // Test Results
    if (userData.TestResults != null) {
        // If there are Test Results, dsplay them
        writeTestResults (userData);
    }
}

function writeTestResults (userData) {
    // Write Test Results subject data into the nave details div
    // Initialise Variables
    var
        i = 0,
        testResultCode = "";

    // Enable Test Results tab in nav and details
    document.getElementById("nav-testResults-tab").innerHTML = 'Test Results <span class="badge badge-primary">0</span>';
    document.getElementById("nav-testResults").hidden = false;

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
        displayFile (file);
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