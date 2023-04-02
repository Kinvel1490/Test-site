$(function () {
    $('.eye').click(function () {
        if($('#passw').attr('type') === 'password'){
            $(this).attr('src', "./assets/img/free-icon-font-eye-crossed-3917126.png");
            $('#passw').attr('type', 'text');
        } else {
            $('#passw').attr('type', 'password');
            $(this).attr('src', "./assets/img/free-icon-font-eye-3917112.png");
        }
    });

    var reg = document.getElementsByClassName('reg')[0];
    reg.addEventListener('click', () =>{
        if(document.getElementsByClassName('pass_wrapper').length <2) {
            let reppasw_wr = document.createElement('div');
        let eye = document.createElement('img');
        let reppasw = document.createElement('input');
        document.getElementById("login_form").insertBefore(reppasw_wr, document.getElementById("sub"));
        reppasw_wr.appendChild(reppasw, document.getElementById("sub"));
        reppasw_wr.appendChild(eye, document.getElementById("sub"));
        document.getElementById("sub").setAttribute('value', 'Зарегистрироваться')
        document.getElementById('login').setAttribute('placeholder', 'Электронная почта');

        reppasw_wr.setAttribute('class', 'pass_wrapper');

        reppasw.setAttribute('type', 'password');
        reppasw.setAttribute('id', 'passw_repeat');
        reppasw.setAttribute('name', 'passw_repeat');
        reppasw.setAttribute('placeholder', 'Повторно введите пароль');

        eye.setAttribute('src', './assets/img/free-icon-font-eye-3917112.png')
        eye.setAttribute('class', 'eye');

        eye.addEventListener('click', (e) => {
            if(document.getElementById('passw_repeat').getAttribute('type') === 'password') {
                document.getElementById('passw_repeat').setAttribute('type', 'text');
                e.target.setAttribute('src', './assets/img/free-icon-font-eye-crossed-3917126.png');
            } else {
                document.getElementById('passw_repeat').setAttribute('type', 'password');
                e.target.setAttribute('src', './assets/img/free-icon-font-eye-3917112.png');
            }
        });
        }        
    });
});