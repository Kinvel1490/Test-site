$('.drop-down-menu').hover(function () {
        $('.dd-menu-cont').slideDown(200);
    }, function () {
        $('.dd-menu-cont').slideUp(200);
});

$('.menu_name').click(function () { 
    var bool = $('#menu_list_4').attr('style') == 'display: block;';
    switch ($(this).attr('id')) {
        case 'menu_name_1': $('#menu_list_1').toggle(200); $('#menu_list_2, #menu_list_3,#menu_list_4').slideUp(200); $('#menu_name_4').css('border-radius', '0 0 10px 0');break;
        case 'menu_name_2': $('#menu_list_2').toggle(200); $('#menu_list_1, #menu_list_3,#menu_list_4').slideUp(200); $('#menu_name_4').css('border-radius', '0 0 10px 0');break;
        case 'menu_name_3': $('#menu_list_3').toggle(200); $('#menu_list_2, #menu_list_1,#menu_list_4').slideUp(200); $('#menu_name_4').css('border-radius', '0 0 10px 0');break;
        case 'menu_name_4': $('#menu_list_4').toggle(200);
                            $('#menu_list_2, #menu_list_3,#menu_list_1').slideUp(200);
                            if(bool) {$('#menu_name_4').css('border-radius', '0 0 10px 0');} else {$('#menu_name_4').css('border-radius', '0');}
                            break;
    }
});

$(window).click(function(e){
    console.log(e.target.className);
});
var logo = document.querySelector('.logo-wrapper-mobile');
logo.addEventListener('touchstart', function(e){
    e.preventDefault();
    $('.lefside-menu').toggle(200);
});

$('.logo-wrapper-mobile').click((e)=>{

    $('.text lefside-menu').css('display', "block");
});