$(function (){    
    var pics = [["./assets/img/black_hole_on_earth-wallpaper-1920x1080.jpg", "Black Hole", "./assets/img/thumb/black_hole_on_earth-wallpaper-thumb.jpg"],
    ["./assets/img/cuba_and_bahamas_islands_seen_from_space-wallpaper-1920x1080.jpg", "Cuba", "./assets/img/thumb/cuba_and_bahamas_islands_seen_from_space-wallpaper-thumb.jpg"],
    ["./assets/img/dark_earth-wallpaper-1920x1080.jpg", "Dark Earth","./assets/img/thumb/dark_earth-wallpaper-thumb.jpg"],
    ["./assets/img/high_tech_earth-wallpaper-1920x1080.jpg", "Techno Earth", "./assets/img/thumb/high_tech_earth-wallpaper-thumb.jpg"]
    ];
    var h = 450;
    var arrSelector = 0;
    var rszimg = document.createElement('img');
    //добавление картинок галереи
    function addGalery() {
        var gal = document.getElementsByClassName('mygalery')[0];        
        var thumbsParent = document.createElement('div');
        var bigpic1 = document.createElement('div');
        gal.appendChild(bigpic1);
        gal.appendChild(thumbsParent);        
        thumbsParent.setAttribute('class', 'galery-thumb-wrapper');
        thumbsParent.setAttribute('id', 'galery-thumb-wrapper');
        bigpic1.setAttribute('class', 'galery-bigpic');
        bigpic1.setAttribute('id', 'galery-bigpic');
        var link;
        var image;
        var titleimg;        
        pics.forEach(elem => {
            link = document.createElement('a');
            image = document.createElement('img');
            thumbsParent.appendChild(link);
            link.appendChild(image);        
            link.setAttribute('href', elem[0]);
            link.setAttribute('class', 'galery-thumb');
            link.setAttribute('id', pics.indexOf(elem));
            link.draggable = false;
            image.setAttribute('alt', elem[1]);
            image.setAttribute('src', elem[2]);
            image.setAttribute('class', 'thumb');
        });
        titleimg = document.createElement('img');
        bigpic1.appendChild(titleimg);
        titleimg.setAttribute('src', pics[arrSelector][0]);
        titleimg.setAttribute('alt', pics[arrSelector][1]);
        titleimg.setAttribute('class', 'bigpic');
        titleimg.setAttribute('id', 'bigpic');
    }

    addGalery();
    $('.select').val(1);
    
    // смена картинок по клику на миниатюры
    $('.mygalery').on('click', '.galery-thumb', function (e) {
        e.preventDefault();
        $('.bigpic').attr('src', $(this).attr('href'));
        arrSelector = $(this).attr('id');
        rszimg.setAttribute('src', pics[arrSelector][0]);
    });

    $('.mygalery').on('click', '.thumb', function () {
        var desc = $(this).attr('alt');
        $('.bigpic').attr('alt', desc);
        $('#caption').text(desc);
    });

    $('.mygalery').on('click', '#galery-bigpic', function () {
        //добавление оверлея галереи
        var go = document.createElement('div');
        var overlaypic = document.createElement('div');
        var cl = document.createElement('span');
        // var im = document.createElement('img');
        var s = document.getElementById('bigpic').getAttribute('src');
        var a = document.getElementById('bigpic').getAttribute('alt');
        var btns = document.createElement('div');
        var prev = document.createElement('span');
        var next = document.createElement('span');
        var cap = document.createElement('div');
        var imgwrap = document.createElement('div');
        
        document.getElementsByClassName('mygalery')[0].appendChild(go);
        go.setAttribute('class', 'flex-container galery-overlay');
        go.setAttribute('id', 'galery-overlay');

        document.getElementById('galery-overlay').appendChild(overlaypic);
        overlaypic.setAttribute('class', 'flex-containter overlaypic');

        document.getElementsByClassName('overlaypic')[0].appendChild(cl);
        cl.setAttribute('class', 'close');

        document.getElementsByClassName('overlaypic')[0].appendChild(imgwrap);
        imgwrap.setAttribute('id', 'imgwrap');
        imgwrap.setAttribute('class', 'flex-container imgwrap');
        imgwrap.setAttribute('style', 'background-image: '+ 'url('+s+')');

        document.getElementsByClassName('imgwrap')[0].appendChild(btns);
        btns.setAttribute('class', 'flex-container flex-row btn-wrapper');

        document.getElementsByClassName('btn-wrapper')[0].appendChild(prev);
        prev.setAttribute('id', 'prev');
        prev.setAttribute('class', 'flex-container prev');

        document.getElementsByClassName('btn-wrapper')[0].appendChild(next);
        next.setAttribute('id', 'next');
        next.setAttribute('class', 'flex-container next');

        document.getElementsByClassName('overlaypic')[0].appendChild(cap);
        cap.setAttribute('id', 'caption');

        setHeight();

        cl.innerHTML = "&times;";
        prev.innerHTML = "&#8249;";
        next.innerHTML = "&#8250;";
        cap.innerHTML = a;        
      });

    //изменение высоты изображения overlay при изменении размеров окна
    $(window).resize(function () {
        setHeight();
    });

    function setHeight () {
        let relation;
        if($('#imgwrap').html()) {
            rszimg.setAttribute('src', pics[arrSelector][0]);
            relation = rszimg.height/rszimg.width;
            console.log(rszimg.width+" + "+ rszimg.height);
            h = document.querySelector('#imgwrap').clientWidth * relation;
            $('#imgwrap').css('height', h);
        }
    }

    //close modal
    window.onclick = function(event) {
        var tar = event.target;
        if (tar.className == 'flex-container galery-overlay' | tar.className == 'flex-containter overlaypic' | tar.className == "overlaypic" | tar.className == 'close') {
            $('.galery-overlay').remove();
            $('#bigpic').attr('src', pics[arrSelector][0]).attr('alt', pics[arrSelector][1]);
        }
        //buttons next & prev galery-overlay animation
        if (tar.className == 'next' | tar.className == 'prev') {
            $(tar).animate ({
                'background-color': '#222'
            }, 200, function () {
                $(this).animate({
                    'background-color': 'transparent'
                }, 200)
            });
        }
        //buttons next & prev galery-overlay picture switchers
        if (tar.className == 'flex-container next'){
            let l = pics.length-1;
            if (arrSelector == (l)){
                arrSelector = 0;
            } else {
                arrSelector++;
            }
            rszimg.setAttribute('src', pics[arrSelector][0]);
            $('#imgwrap').fadeTo(200, 0, function () {
                document.getElementById('imgwrap').setAttribute('style', 'background-image: url('+pics[arrSelector][0]+')');
                document.getElementById('caption').innerHTML = pics[arrSelector][1];
                $(this).fadeTo(200, 1);
                setHeight();
            });            
        }

        if (tar.className == 'flex-container prev'){
            let l = pics.length-1;
            if (arrSelector == (0)){
                arrSelector = l;
            } else {
                arrSelector--;
            }
            rszimg.setAttribute('src', pics[arrSelector][0]);
            $('#imgwrap').fadeTo(200, 0, function () {
                document.getElementById('imgwrap').setAttribute('style', 'background-image: url('+pics[arrSelector][0]+')');
                document.getElementById('caption').innerHTML = pics[arrSelector][1];
                $(this).fadeTo(200, 1);
                setHeight();
            });
        }
    }
    
    //galery switcher
    $('.select').change(function () {
        if (this.value == 1) {
            addGalery();
            removeSlider();
            removeBaguette();
            removeCSSSlider();
            removeCompare();
        }
        if (this.value == 2) {
            removeGalery();
            addSlider();
            removeBaguette();
            removeCSSSlider();
            removeCompare();
        }
        if (this.value == 3) {
            removeGalery();
            removeSlider();
            addBaguette();
            removeCSSSlider();
            removeCompare();
        }
        if (this.value == 4) {
            addCSSSlider();
            removeBaguette();
            removeGalery();
            removeSlider();
            removeCompare();
        }
        if(this.value == 5) {
            removeBaguette();
            removeCSSSlider();
            removeGalery();
            removeSlider();
            addCompare();
        }
    });

    function removeGalery () {$('.galery-thumb-wrapper, .galery-bigpic').remove();}
    function removeSlider () {$('.swiper').remove();}
    function removeBaguette () {$('.galery').remove(); $('#baguetteBox-overlay').remove();}
    function removeCSSSlider () {$('.itc-slider').remove();}
    function removeCompare () {$('.compare').remove();}

    //Slider
    function addSlider () {
        var slwrap = document.createElement('div');
        var sl = document.getElementsByClassName('mygalery')[0];
        var cont = document.createElement('div');
        var pag = document.createElement('div');
        var prevbtn = document.createElement('div');
        var nextbtn = document.createElement('div');

        
        sl.appendChild(slwrap);
        slwrap.appendChild(cont);
        
        slwrap.setAttribute('class', 'swiper');
        cont.setAttribute('class', 'swiper-wrapper');

        pics.forEach(element => {
            var slide = document.createElement('div');
            var img = document.createElement('img');
            cont.appendChild(slide);
            slide.appendChild(img);
            slide.setAttribute('class', 'swiper-slide');
            img.setAttribute('src', element[0]);
            img.setAttribute('alt', element[1]);
        });
        slwrap.appendChild(pag);
        slwrap.appendChild(prevbtn);
        slwrap.appendChild(nextbtn);
        pag.setAttribute('class', 'swiper-pagination');
        prevbtn.setAttribute('class', 'swiper-button-prev');
        nextbtn.setAttribute('class', 'swiper-button-next');

        new Swiper(".swiper", {
            loop: true,

            pagination: {
              el: ".swiper-pagination",
              type: "fraction",
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          })
    }

    function addBaguette () {
        var gal = document.getElementsByClassName('mygalery')[0];
        var baguette = document.createElement('div');
        gal.appendChild(baguette);
        baguette.setAttribute('class', 'galery');
        pics.forEach (element => {
            var a = document.createElement('a');
            var pic = document.createElement('img');
            baguette.appendChild(a);
            a.appendChild(pic);
            a.setAttribute('href', element[0]);
            a.setAttribute('data-caption', element[1]);
            pic.setAttribute('src', element[2]);
            pic.setAttribute('alt', element[1]);
            pic.setAttribute('class', 'bag-pic');
        });
        baguetteBox.run('.galery');
    }

    function refresh () {
        switch ($('.select').val()) {
            case '1': removeGalery(); addGalery(); break;
            case '2': removeSlider(); addSlider(); break;
            case '3': removeBaguette(); addBaguette(); break;
            case '4': removeCSSSlider(); addCSSSlider(); break;
            case '5': removeCompare(); addCompare(pics); break;
            default: removeGalery(); addGalery(); $('.mygalery').text("OOPS!!!"); break;
        }
    }

     
    //добавление изображений
    
    $('#btn-file-select').change(function() {
        if ($(this) && $(this)[0].files.length > 0) {
            var f = $(this)[0].files;
            for(let i = 0; i<pics.length; i++) {
                pics = pics.pop;
            }
            pics = new Array();
            for (let index = 0; index < f.length; index++) {
                let element = f[index];
                let adr = URL.createObjectURL(element);                
                var nm = element.name.substring(0, element.name.lastIndexOf('.'));
                let rawdata = [adr, nm, adr];
                pics[pics.length]  = rawdata;
            }
            refresh();
        }
        else {$(this).prev().text('Выберите изоборажения');}
    });

    //Слайдер на CSS
    function addCSSSlider () {
        let Csl = document.createElement('div');
        let par = document.getElementsByClassName('mygalery')[0];
        par.appendChild(Csl);
        Csl.setAttribute('class', 'itc-slider');
        Csl.setAttribute('data-slider', 'itc-slider');
        Csl.setAttribute('data-loop', 'true');
        Csl.setAttribute('data-autoplay', 'false');
        let slwr = document.createElement('div');
        Csl.appendChild(slwr);
        slwr.setAttribute('class', 'itc-slider__wrapper');
        let slitms = document.createElement('div');
        slwr.appendChild(slitms);
        slitms.setAttribute('class', 'itc-slider__items');
        pics.forEach (element =>  {
            let slitm = document.createElement('div');
            slitms.appendChild(slitm);
            slitm.setAttribute('class', 'itc-slider__item');
            let pic = document.createElement('img');
            slitm.appendChild(pic);
            pic.setAttribute('src', element[0]);
            pic.setAttribute('alt', element[1]);
        });
        let btn_pr = document.createElement('button');
        Csl.appendChild(btn_pr);
        btn_pr.setAttribute('class', 'itc-slider__btn itc-slider__btn_prev');
        let btn_nxt = document.createElement('button');
        Csl.appendChild(btn_nxt);
        btn_nxt.setAttribute('class', 'itc-slider__btn itc-slider__btn_next');
        ItcSlider.getOrCreateInstance('.itc-slider');
    }

    //Сравнение
    function addCompare () {
        let gal = document.getElementsByClassName('mygalery')[0];
        let compare = document.createElement('div');
        let c_mp_wrapper = document.createElement('div');
        let comp = document.createElement('div');
        let compbg = document.createElement('div');
        let control_wrapper = document.createElement('div');
        let compare_thmb_wr = document.createElement('div');
        let compic = document.createElement('img');
        let compic2 = document.createElement('img');
        gal.appendChild(compare);
        compare.appendChild(c_mp_wrapper);
        compare.appendChild(compare_thmb_wr);
        c_mp_wrapper.appendChild(compbg);
        c_mp_wrapper.appendChild(comp);
        c_mp_wrapper.appendChild(control_wrapper);
        comp.appendChild(compic);
        compare.setAttribute('class', 'compare');
        c_mp_wrapper.setAttribute('class', 'c_mp_wrapper');
        comp.setAttribute('class', 'comp');
        compbg.setAttribute('class', 'compbg');
        compbg.appendChild(compic2);
        // compbg.setAttribute('style', 'background-image: url('+pics[1][0]+')');
        control_wrapper.setAttribute('class', 'control_wrapper');
        compare_thmb_wr.setAttribute('class', 'compare_thmb_wrapper');
        compic.setAttribute('class', 'comppic');        
        compic.setAttribute('src', pics[0][0]);
        compic.setAttribute('alt', pics[0][1]);
        compic2.setAttribute('class', 'comppic2');        
        compic2.setAttribute('src', pics[1][0]);
        compic2.setAttribute('alt', pics[1][1]);
        pics.forEach(el => {
            let link = document.createElement('a');
            let thmb = document.createElement('img');
            compare_thmb_wr.appendChild(link);
            link.appendChild(thmb);
            thmb.setAttribute('src', el[2]);
            thmb.setAttribute('alt', el[1]);
            link.setAttribute('href', el[0]);
            link.draggable = false;
            link.setAttribute('class', 'compare-thmb');
            thmb.setAttribute('class', 'thmb')
        });
        startCompare();
    }
});

