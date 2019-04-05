
$(document).ready(function () {
    for (i=0;i<10;i++) {
        getUser();
    }
    $("#getUser").click(getUser);

});

function getUser() {
    getData("https://randomuser.me/api")
}

function getData(url) {
    const ajaxParameters = {}
    ajaxParameters.url = url
    ajaxParameters.success = handleResult
    ajaxParameters.type = 'GET'
    ajaxParameters.error = handleError
    $.ajax(ajaxParameters)
}
function handleResult(result, status, xhr) {
    console.log("result: ", result);
    console.log("status: ", status);
    console.log("xhr: ", xhr);
    keysNames = ['picture','name', 'email','gender','dob'];
    generateSimpleDivs('results', 'User', result, keysNames);

}

function handleError(xhr, status, error) {
    $('#results').append('<h1> No users to show !<h1>');
}

function changeToKeysNames(columnNames) {
    return columnNames.map(name => {
        key = name.replace(/\s/g, '');
        return key.charAt(0).toLowerCase() + key.slice(1);
    });
}


function generateSimpleDivs(elementIdWhereToGenerateTheDiv, className, data, keysNames) {
    var userData=data.results[0];
    var userId=userData.login.uuid;
    var divId=userId.replace(/\s*\W*/g, '') + className;
    $('#' + elementIdWhereToGenerateTheDiv).append('<div id=\'' + divId +'\' class=\'' + className + '\'></div>');
    let valueToPutIn='';
    keysNames.forEach(key => {
        switch(key) {
            case 'name':
                valueToPutIn += '<p>'+ key + ': ';
                var userFullName='';
                for (item in userData[key]) {
                    userFullName += userData[key][item] + ' ' ;
                }
                valueToPutIn +=userFullName + '</p>';
                break;
            case 'dob':
                valueToPutIn += '<p> age: ' + userData[key].age + '</p>';
                break;
            case 'picture':
                valueToPutIn += '<img src=\"' +userData[key].thumbnail + '\">';
                break;
            default:
                valueToPutIn += '<p>'+ key + ': ' + userData[key] +'</p>';   
        }
    });
    valueToPutIn += '<button id=deleteButton' + divId + '> Delete </button>';
    
    valueToPutIn += '<button> Edit </button>';
    var toGenerate = '<div class=\'user-info\'>' + valueToPutIn + '</div>';
    $('#' + divId).append(toGenerate);
    $("#deleteButton" + divId).click(function() {
        
        $("#"+divId).remove();
      });
}

