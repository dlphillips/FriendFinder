$(document).ready(function() {
    var currentURL = window.location.origin;

    $('#survey').click(function() {
        window.location = "/survey";
    });

    $("#submitBtn").click(function() {
        var validate = true;
        var matchPhoto = "http://r.ddmcdn.com/s_f/o_1/APL/uploads/2014/06/124161338509412825300901197_ELWOOD.jpg";

        var imgLink = $("#imgLink").val();
        var name = $("#name").val();
        var q1 = $("input[name='q1']:checked").val();
        var q2 = $("input[name='q2']:checked").val();
        var q3 = $("input[name='q3']:checked").val();
        var q4 = $("input[name='q4']:checked").val();
        var q5 = $("input[name='q5']:checked").val();
        var q6 = $("input[name='q6']:checked").val();
        var q7 = $("input[name='q7']:checked").val();
        var q8 = $("input[name='q8']:checked").val();
        var q9 = $("input[name='q9']:checked").val();
        var q10 = $("input[name='q10']:checked").val();

        var formData = [name, imgLink, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];

        for (var i = 0; i < formData.length; i++) {
            if (typeof(formData[i]) === 'undefined') {
                validate = false;
            } else if (formData[i] === '') {
                validate = false;
            }
        }
        var userData = {
            name: $("#name").val(),
            photo: $("#imgLink").val(),
            scores: [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, ]
        };

        if (!validate) {
            $('#yourMatch').text("Well, you didn't answer all the questions. So, meet your new friend Elwood! Try again...");
            $("#imgPath").attr('src', matchPhoto);
            $("#myModal").modal();
        } else {
            $.post(currentURL + "/api/friends", userData, function(data) {
                var matchName = data.name;
                var matchPhoto = data.photo;
                $('#yourMatch').text('Your closest match is ' + matchName);
                $("#imgPath").attr('src', matchPhoto);
                $("#myModal").modal();
            });
        }
    });
});
