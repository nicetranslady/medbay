function writeJSONFile (file) {
    // create object to handle JSON file
    userJSON = file.data;
    // createP(userJSON.Source.User.Name);
    
    // Create a Jumbotron with file and user details
    // Write the HTML
    jumboCode = '<div class="jumbotron">';
    jumboCode += '<p>File Name: ' + file.name + '</p>';
    jumboCode += '<p>File Size: ' + file.size + '</p>';
    jumboCode += '<p>Source: ' + userJSON.Source.System.Name + '</p>';
    jumboCode += '<p>Provider: ' + userJSON.Source.System.Provider + '</p>';
    jumboCode += '<p>User Name: ' + userJSON.Source.User.Name + '</p>';
    jumboCode += '<p>Date of Birth: ' + userJSON.Source.User.DateOfBirth + '</p>';
    for (i in userJSON.Source.User.Identifiers) {
        if (userJSON.Source.User.Identifiers[i].Type == "NhsNumber") {
            jumboCode += '<p>NHS Number: ' + userJSON.Source.User.Identifiers[i].Value + '</p>';
        }
    }
    jumboCode += '</div>';
    // Insert the HTML
    document.getElementById("jumboHeader").innerHTML = jumboCode;
    // Make the Jumbotron visible
    document.getElementById("jumboHeader").hidden = false;
    
    // Create tabs available for each subject
    tabsCode = '<nav><div class="nav nav-tabs" id="nav-tab" role="tablist">';
    // Problems
    if (userJSON.Problems != null) {
        tabsCode += '<a class="nav-link active" id="nav-problems-tab" data-toggle="tab" href="#nav-problems" role="tab" aria-controls="nav-problems" aria-selected="true">Problems</a>';
    } else {
        tabsCode += '<a class="nav-link disabled" id="nav-problems-tab" data-toggle="tab" href="#nav-problems" role="tab" aria-controls="nav-problems" aria-selected="false" aria-disabled="true">Problems <span class="badge badge-light">0</span></a>';
    }
    // Medications
    if (userJSON.Medications != null) {
        tabsCode += '<a class="nav-link active" id="nav-medications-tab" data-toggle="tab" href="#nav-medications" role="tab" aria-controls="nav-medications" aria-selected="true">Medications</a>';
    } else {
        tabsCode += '<a class="nav-link disabled" id="nav-medications-tab" data-toggle="tab" href="#nav-medications" role="tab" aria-controls="nav-medications" aria-selected="false" aria-disabled="true">Medications <span class="badge badge-light">0</span></a>';
    }
    // Test Results
    if (userJSON.TestResults != null) {
        tabsCode += '<a class="nav-link active" id="nav-testResults-tab" data-toggle="tab" href="#nav-testResults" role="tab" aria-controls="nav-testResults" aria-selected="true">Test Results</a>';
    } else {
        tabsCode += '<a class="nav-link disabled" id="nav-testResults-tab" data-toggle="tab" href="#nav-testResults" role="tab" aria-controls="nav-testResults" aria-selected="false" aria-disabled="true">Test Results <span class="badge badge-light">0</span></a>';
    }
    // Consultations
    if (userJSON.Consultations != null) {
        tabsCode += '<a class="nav-link active" id="nav-consultations-tab" data-toggle="tab" href="#nav-consultations" role="tab" aria-controls="nav-consultations" aria-selected="true">Consultations</a>';
    } else {
        tabsCode += '<a class="nav-link disabled" id="nav-consultations-tab" data-toggle="tab" href="#nav-consultations" role="tab" aria-controls="nav-consultations" aria-selected="false" aria-disabled="true">Consultations <span class="badge badge-light">0</span></a>';
    }
    // Immunisations
    if (userJSON.Immunisations != null) {
        tabsCode += '<a class="nav-link active" id="nav-immunisations-tab" data-toggle="tab" href="#nav-immunisations" role="tab" aria-controls="nav-immunisations" aria-selected="true">Immunisations</a>';
    } else {
        tabsCode += '<a class="nav-link disabled" id="nav-immunisations-tab" data-toggle="tab" href="#nav-immunisations" role="tab" aria-controls="nav-immunisations" aria-selected="false" aria-disabled="true">Immunisations <span class="badge badge-light">0</span></a>';
    }
    // Allergies
    if (userJSON.Allergies != null) {
        tabsCode += '<a class="nav-link active" id="nav-allergies-tab" data-toggle="tab" href="#nav-allergies" role="tab" aria-controls="nav-allergies" aria-selected="true">Allergies</a>';
    } else {
        tabsCode += '<a class="nav-link disabled" id="nav-allergies-tab" data-toggle="tab" href="#nav-allergies" role="tab" aria-controls="nav-allergies" aria-selected="false" aria-disabled="true">Allergies <span class="badge badge-light">0</span></a>';
    }
    tabsCode += '</div></nav>';
    // Create content for each tab subject
    tabsCode += '<div class="tab-content" id="nav-tabContent">';
    // Problems
    if (userJSON.Problems != null) {
        tabsCode += '<div class="tab-pane fade show active" id="nav-problems" role="tabpanel" aria-labelledby="nav-problems-tab">...</div>';
    }
    // Medications
    if (userJSON.Medications != null) {
        tabsCode += '<div class="tab-pane fade show active" id="nav-medications" role="tabpanel" aria-labelledby="nav-medications-tab">...</div>';
    }
    // Test Results
    if (userJSON.TestResults != null) {
        tabsCode += '<div class="tab-pane fade show active" id="nav-testResults" role="tabpanel" aria-labelledby="nav-testResults-tab">';
        for (i in userJSON.TestResults) {
            // Create test heading with title and date created
            tabCaption = userJSON.TestResults[i].Title + " (" + userJSON.TestResults[i].Created + ")";
            // Create a collapse ID from above with no spaces or special characters
            tabCaptionID = userJSON.TestResults[i].Title + userJSON.TestResults[i].Created;
            tabCaptionID = tabCaptionID.replace(/ /g,"");
            tabCaptionID = tabCaptionID.replace(/-/g,"");
            tabCaptionID = tabCaptionID.replace(/\//g,"");
            tabsCode += '<div><button class="btn btn-light" type="button" data-toggle="collapse" data-target="#' + tabCaptionID + '" aria-expanded="false" aria-controls="' + tabCaptionID + '">' + tabCaption + '</button></div>';
            tabsCode += '<div class="collapse" id="' + tabCaptionID + '"><div class="card card-body">';
            for (j in userJSON.TestResults[i].TestResultLines) {
                // Learn Ranges
                normalRangeArray = userJSON.TestResults[i].TestResultLines[j].NormalRange.split(" - ");
                if (normalRangeArray[0] != "N/A") {
                    normalRangeLower = Number(normalRangeArray[0]);
                    normalRangeUpper = Number(normalRangeArray[1]);
                }
                // Learn Result and Units
                resultArray = userJSON.TestResults[i].TestResultLines[j].Result.split(" ");
                result = Number(resultArray[0]);
                // Assume no warning required?
                cardColour = "text-white bg-success";
                if (normalRangeArray[0] != "N/A") {
                    // Unless the result is outside of the range
                    if (result < normalRangeLower || result > normalRangeUpper) {
                        cardColour = "text-white bg-danger";
                    }
                    if (result == normalRangeLower || result == normalRangeUpper) {
                        cardColour = "text-black bg-warning";
                    }
                } else {
                    // Unless there are no normal ranges
                    cardColour = "text-black bg-light";
                }
                // Ouput the card
                tabsCode += '<div class="card card-body ' + cardColour + '">';
                tabsCode += userJSON.TestResults[i].TestResultLines[j].Description;
                tabsCode += "<strong>" + result + " " + resultArray[1] + "</strong> ";
                if (normalRangeArray[0] != "N/A") {
                    tabsCode += "Normal Range: " + normalRangeLower + " - " + normalRangeUpper;
                } else {
                    tabsCode += "Normal Range: " + normalRangeArray[0];
                } 
                tabsCode += '</div>';
            }
            tabsCode += '</div></div>';
        }
    }
    // Consultations
    if (userJSON.Problems != null) {
        tabsCode += '<div class="tab-pane fade show active" id="nav-consultations" role="tabpanel" aria-labelledby="nav-consultations-tab">...</div>';
    }
    // Immunisations
    if (userJSON.Problems != null) {
        tabsCode += '<div class="tab-pane fade show active" id="nav-immunisations" role="tabpanel" aria-labelledby="nav-immunisations-tab">...</div>';
    }
    // Allergies
    if (userJSON.Problems != null) {
        tabsCode += '<div class="tab-pane fade show active" id="nav-allergies" role="tabpanel" aria-labelledby="nav-allergies-tab">...</div>';
    }
    tabsCode += '</div>';
    // Insert the HTML
    document.getElementById("nav").innerHTML = tabsCode;
    // Make the Tabs visible
    document.getElementById("nav").hidden = false;
    document.getElementById("nav-testResults-tab").innerHTML = 'Test Results <span class="badge badge-primary">' + i + '</span>';
}

function fileSelected(file) {
    // check to ensure that file is of desired type
    if (file.type == "application" && file.subtype=="json") {
        // If file is JSON then write the details
        writeJSONFile (file);
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