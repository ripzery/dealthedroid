$(document).ready(function(){

    $('.navbar li').click(function(e){
        e.preventDefault();
        $(this).tab('show');
        var index = $(this).index();
        switch (index){
            case 0:
                $.get("../main/home.html", function (data) {
                    $(".container-home").html(data);
                });
                break;
            case 1:
                $.get("../main/sell.html", function (data) {
                    $(".container-home").html(data);
                });
                break;
            case 2:
                $.get("../main/financial.html", function (data) {
                    $(".container-home").html(data);
                });
                break;
        }
        //alert($(this).index());
    });

});