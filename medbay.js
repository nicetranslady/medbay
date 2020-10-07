function drawNav (file) {
    // Display file information
    // Initialise variables
    var userData = {};

    // create object to handle JSON file
    userData = file.data;
    
    // Make getFileBox disappear
    document.getElementById("getFileBox").hidden = true;
    
    // Make Nav visibile
    document.getElementById("nav").hidden = false;

    // Check to see if the subject is not null, then draw the subject content
    // File Details
    writeFileDetails (file);
    // Problems
    if (userData.Problems != null) {
        // If there are Medications, display them
        writeProblems (userData.Problems);
    }
    // Medications
    if (userData.Medications != null) {
        // If there are Medications, display them
        writeMedications (userData.Medications);
    }
    // Test Results
    if (userData.TestResults != null) {
        // If there are Test Results, display them
        writeTestResults (userData.TestResults);
    }
    // Consultations
    if (userData.Consultations != null) {
        // If there are Test Results, display them
        writeConsultations (userData.Consultations);
    }
    // Immunisations
    if (userData.Immunisations != null) {
        // If there are Test Results, display them
        writeImmunisations (userData.Immunisations);
    }
    // Allergies
    if (userData.Allergies != null) {
        // If there are Test Results, display them
        // writeAllergies (userData.Allergies);
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
        problemTypeCode = "<p>&nbsp;</p>";

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
        medicationTypeCode = "<p>&nbsp;</p>";

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

function writeTestResults (testResults) {
    // Write Test Results subject data into the nav details div
    // Initialise Variables
    var buttonID = "",
        caption = "",
        captionID = "",
        created = "",
        i = 0,
        testResultsCode = "<p>&nbsp;</p>",
        testResultLine = {"total": 0, "warning":0, "danger":0, "code": ""},
        title = "";

    // Enable Test Results tab in nav and details and emty the nav content
    document.getElementById("nav-testResults-tab").innerHTML = 'Test Results <span class="badge badge-primary">0</span>';
    document.getElementById("nav-testResults").hidden = false;

    // Review Test Results
    for (i in testResults) {
        // Parse Test Result Lines
        testResultLine = parseTestResultLines(testResults[i]);

        // Create Test Result Caption and Button variables
        created = testResults[i].Created;
        title = testResults[i].Title;
        caption = title + " (" + created + ") ";
        captionID = "testResult" + i;
        buttonID = captionID + "button";

        // Create button, caption and status code
        caption += '<span class="badge badge-primary">' + testResultLine.total + '</span>&nbsp;';
        if (testResultLine.warning > 0) {
            caption += '<span class="badge badge-warning">' + testResultLine.warning + '</span>&nbsp;';
        }
        if (testResultLine.danger > 0) {
            caption += '<span class="badge badge-danger">' + testResultLine.danger + '</span>';
        }

        // Create Test Result code
        testResultsCode += '<div><button class="btn btn-light" type="button" data-toggle="collapse" data-target="#' + captionID + '" aria-expanded="false" aria-controls="' + captionID + '" id="' + buttonID + '">' + caption + '</button></div>';
        testResultsCode += '<div class="collapse" id="' + captionID + '"><div class="card card-body">';
        testResultsCode += testResultLine.code;
        testResultsCode += '</div></div>';

        // Update Total number of Tests
        document.getElementById("nav-testResults-tab").innerHTML = 'Test Results <span class="badge badge-primary">' + (Number(i) + 1) + '</span>';
    }
    //Write Test Result code
    document.getElementById("nav-testResults").innerHTML += testResultsCode;
}

function writeConsultations (consultations) {
    // Write Consultations subject data into the nav details div
    // Initialise Variables
    var consultant = "",
        consultationDate = "",
        consultationDetailCode = "",
        consultationsCode = "",
        i = 0;

    // Enable Consultations tab in nav and details and emty the nav content
    document.getElementById("nav-consultations-tab").innerHTML = 'Consultations <span class="badge badge-primary">0</span>';
    document.getElementById("nav-consultations").hidden = false;
    document.getElementById("nav-consultations").innerHTML = "<p>&nbsp;</p>";

    // Review Consultations
    for (i in consultations) {
        // Create Consultation Caption
        consultationDate = consultations[i].Date;
        consultant = consultations[i].Individual;
        caption = consultant + " (" + consultationDate + ") ";
        captionID = "Consultation" + i;
        buttonID = captionID + "button";

        // Parse Consultation
        consultationDetailCode = parseConsultation(consultations[i]);

        // Create Consultation code
        consultationsCode = '<div><button class="btn btn-light" type="button" data-toggle="collapse" data-target="#' + captionID + '" aria-expanded="false" aria-controls="' + captionID + '" id="' + buttonID + '">' + caption + '</button></div>';
        consultationsCode += '<div class="collapse" id="' + captionID + '"><div class="card card-body">';
        consultationsCode += consultationDetailCode;
        consultationsCode += '</div></div>'; 

        //Write Consultation
        document.getElementById("nav-consultations").innerHTML += consultationsCode;

        // Update Total number of Consultations
        document.getElementById("nav-consultations-tab").innerHTML = 'Consultations <span class="badge badge-primary">' + (Number(i) + 1) + '</span>';
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
    var description = "",
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

function parseTestResultLines (testResult) {
    // Parse test result information and return HTML
    // Initialise variables
    var cardColour = "",
        i = 0,
        normalRange = [],
        normalRangeText = "",
        normalRangeLower = 0,
        normalRangeUpper = 0,
        result = 0,
        resultArray = [],
        testResultLine = {"total": 0, "warning":0, "danger":0, "code": ""},
        unit = "";
    
    // Create Test Result Lines code
    for (i in testResult.TestResultLines) {
        // Learn Result and SI Unit
        resultArray = testResult.TestResultLines[i].Result.split(" ");
        resultArray[0] = resultArray[0].trim();
        resultArray[1] = resultArray[1].trim();
        result = Number(resultArray[0]);
        unit = resultArray[1];

        // Learn Normal Range for Result Line
        // Make sure that the SI unit is not present in the range
        normalRangeText = testResult.TestResultLines[i].NormalRange;
        normalRangeText = normalRangeText.replace(unit, "");
        normalRangeText = normalRangeText.trim();
        normalRange = normalRangeText.split(" - ");
        // Check Anomalous range
        if (normalRange.length == 1) {
            // Check to see if we have > or < symbols
            if ((normalRange[0].indexOf("<") > -1) || (normalRange[0].indexOf(">") > -1)) {
                // console.log(normalRange);
                if (normalRange[0].indexOf("<") > -1) {
                    // Remove < symbol and any extra spaces
                    normalRange[0] = normalRange[0].replace("<", "");
                    normalRange[0] = normalRange[0].trim();
                    // Create new range
                    normalRange[1] = normalRange[0];
                    normalRange[0] = "0";
                } else {
                    // Remove > symbol and any extra spaces
                    normalRange[0] = normalRange[0].replace(">", "");
                    normalRange[0] = normalRange[0].trim();
                    // Create new range
                    normalRange[1] = "INFINITY";
                }
                // console.log(normalRange);
            }
        }
        if (normalRange[0] != "N/A") {
            // Rewrite normal ranges to include infinity to cope with < and >
            normalRangeLower = Number(normalRange[0]);
            if (normalRange[1] == "INFINITY") {
                normalRangeUpper = Number(Infinity);
            } else {
                normalRangeUpper = Number(normalRange[1]);
            }
        }
        
        // Learn Status of result and get the card colour ready
        // Default is Success
        cardColour = "text-white bg-success";
        if (normalRange[0] != "N/A") {
            // Check to see if it is a Warning
            if (result == normalRangeLower || result == normalRangeUpper) {
                cardColour = "text-black bg-warning";
                testResultLine.warning ++;
            }
            // Or a Danger
            if (result < normalRangeLower || result > normalRangeUpper) {
                cardColour = "text-white bg-danger";
                testResultLine.danger ++;
            }
        } else {
            // If there is no normal range, paint it grey
            cardColour = "text-black bg-light";
        }

        // Write the Test Result Lines code
        testResultLine.code += '<div class="card card-body ' + cardColour + '">';
        testResultLine.code += testResult.TestResultLines[i].Description;
        testResultLine.code += "<strong>" + result + " " + unit + "</strong> ";
        if (normalRange[0] != "N/A") {
            // Deal with any issues with Infinity for display
            if (normalRangeUpper == Infinity) {
                testResultLine.code += "Normal Range: >" + normalRangeLower;
            } else {
                testResultLine.code += "Normal Range: " + normalRangeLower + " - " + normalRangeUpper;
            }
        } else {
            testResultLine.code += "Normal Range: " + normalRange[0];
        }
        testResultLine.code += '</div>';
        testResultLine.total ++;
    }
    // Return Test Result HTML
    return testResultLine;
}

function parseConsultation (consultation) {
    // Parse Consultation information and return HTML
    // Initialise variables
    var consultationCode = "",
        details = consultation.Details,
        detailsCount = 0,
        location = consultation.Location;
    
    // Check for null or empty Variables
    if (location == null) {
        location = "No Data";
    }
    detailsCount = details.length;
    if (detailsCount == 0) {
        details = "No Data";
    }

    // Write Consultation code
    consultationCode = "Location: " + location + "<br>";
    consultationCode += "Details: " + details;

    // Return Consultation HTML
    return consultationCode;
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
    let fileInput;

    // Create a file input box
    fileInput = createFileInput(fileSelected);
    fileInput.parent('getFile');
    fileInput.center();
}