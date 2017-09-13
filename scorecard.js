$(document).ready(function () {
    //TODO: encapsulate all of the below into one function
    $("#calculate").click(function () {
        var top, jg, mid, mark, supp, p1;
        top = "#top";
        jg = "#jg";
        mid = "#mid";
        mark = "#mark";
        supp = "#supp";
        inputValidate();
        p1 = $("#player1").val();
        p2 = $("#player2").val();
        p3 = $("#player3").val();
        p4 = $("#player4").val();
        p5 = $("#player5").val();
        $("#top8").val(updateBox(top));
        $("#jg8").val(updateBox(jg));
        $("#mid8").val(updateBox(mid));
        $("#mark8").val(updateBox(mark));
        $("#supp8").val(updateBox(supp));
        //there is DEFINITELY a more elegant way to do this, but it works for now. will refactor later
        if ($("#player2").val() != 0 && $("#player3").val() != 0 && $("#player4").val() != 0 && $("#player5").val() != 0) {
            var finalString = ("<p>" + p1 + " (" + $("#top").text() + ") " +
                    " scored a total of " + $("#top8").val() + " points with a bonus of " + $("#top7").val() + " points." + "</p>") +
                ("<p>" + p2 + " (" + $("#jg").text() + ") " +
                    " scored a total of " + $("#jg8").val() + " points with a bonus of " + $("#jg7").val() + " points." + "</p>") +
                ("<p>" + p3 + " (" + $("#mid").text() + ") " +
                    " scored a total of " + $("#mid8").val() + " points with a bonus of " + $("#mid7").val() + " points." + "</p>") +
                ("<p>" + p4 + " (" + $("#mark").text() + ") " +
                    " scored a total of " + $("#mark8").val() + " points with a bonus of " + $("#mark7").val() + " points." + "</p>") +
                ("<p>" + p5 + " (" + $("#supp").text() + ") " +
                    " scored a total of " + $("#supp8").val() + " points with a bonus of " + $("#supp7").val() + " points." + "</p>") + ("<p>__________________EXTRA COMMENTS__________________</p>" + $("#extraComments").val());
            $("#results").html(finalString);
        }
    });
});

//add the boxes of the values corresponding to 'role' and update the sum in the corresponding Total box
function updateBox(role) {
    var temp, i;
    temp = 0;
    for (i = 1; i < 8; ++i) {
        if (parseInt($(role + i).val(), 10) !== NaN) {
            temp += parseInt($(role + i).val(), 10);
        }
    }
    return temp;
}

// if the input is less than 0 or greater than 10, set it to 0 and re-calculate the total
function inputValidate() {
    var input = $(':input[type="number"]');
    var names = $(':input[type="text"]');
    input.each(function () {
        var val = parseInt($(this).val());
        if (val < 0 || val > 10 || isNaN(val)) {
            $(this).val(0);
        }
    });
    names.each(function () {
        var val = $(this).text();
        if (val == "") {
            $(this).val("PLACEHOLDER_NAME");
        }
    });
}
