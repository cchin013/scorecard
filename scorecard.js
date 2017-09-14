$(document).ready(function () {
    init();
    $(".change").change(mainLogic);
});

// if the input is less than 0 or greater than 10, set it to 0 and re-calculate the total
function inputValidateNum() {
    var input = $(':input[type="number"]');
    input.each(function () {
        var val = parseInt($(this).val());
        // isNaN is used to guarantee no empty fields
        if (val < 0 || val > 10 || isNaN(val)) {
            $(this).val(0);
        }
    });
}

// initializing the empty name fields to PLACEHOLDER_NAME
function inputValidateName() {
    var names = $(':input[type="text"]');
    names.each(function () {
        var val = $(this).text();
        if (val == "") {
            $(this).val("PLACEHOLDER_NAME");
        }
    });
}

//add the boxes of the values corresponding to 'role' and update the sum in the corresponding Total box
function updateBox(role) {
    var boxSum, i;
    boxSum = 0;
    for (i = 1; i < 8; ++i) {
        if (parseInt($(role + i).val(), 10) !== NaN) {
            boxSum += parseInt($(role + i).val(), 10);
        }
    }
    return boxSum;
}

// Setting the initial values in the boxes
function init() {
    inputValidateName();
    inputValidateNum();
}

function generateFinalString(playerArray, roleArray) {
    var finalString = "";
    var i, totalPointsBoxID, totalBonusPointsBoxID;
    totalPointsBoxID = 8; // role + totalPointsBoxID = total points value box, i.e. mid8.val() = total points scored by mid
    totalBonusPointsBoxID = 7; // role + totalBonusPointsBoxID = total bonus points value box, i.e. mid7.val() = total bonus points scored by mid
    for (i = 0; i < playerArray.length; ++i) {
        finalString += ("<p>" + $(playerArray[i]).val() + " (" + $(roleArray[i]).text() + ") " +
            " scored a total of <span class=\"points\">" + $(roleArray[i] + totalPointsBoxID).val() + "</span> points with a bonus of <span class=\"points\">" + $(roleArray[i] + totalBonusPointsBoxID).val() + " </span>points." + "</p>")
    }
    finalString += ("<p>__________________EXTRA COMMENTS__________________</p>" + $("#extraComments").val());
    return finalString;
}

//main logic
function mainLogic() {
    // maybe these variables should be global
    var i, PLAYER_NUM;
    // perhaps an object approach would have been more optimized
    var playerArr = ["#player1", "#player2", "#player3", "#player4", "#player5"];
    var roleArr = ["#top", "#jg", "#mid", "#mark", "#supp"];
    PLAYER_NUM = 5; // amount of players on one team
    inputValidateNum();
    for (i = 0; i < playerArr.length; ++i) {
        $(roleArr[i] + "8").val(updateBox(roleArr[i]));
    }
    var finalString = generateFinalString(playerArr, roleArr);
    $("#results").html(finalString);
}
