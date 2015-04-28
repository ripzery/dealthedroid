$(document).ready(function(){

    $('.navbar li').click(function(e){
        e.preventDefault();
        $(this).tab('show');
        var index = $(this).index();
        switch (index){
            case 0:
                $.get("home.html", function (data) {
                    $(".container-home").html(data);
                });
                break;
            case 1:
                $.get("sell.html", function (data) {
                    $(".container-home").html(data);
                });
                break;
            case 2:
                $.get("financial.html", function (data) {
                    $(".container-home").html(data);
                });
                break;
        }
        //alert($(this).index());
    });

});