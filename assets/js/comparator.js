//Compare standalone
var compare, comp, combg, comppic, control_wrapper, thumb_wrapper, link, image, picarr, workarr, rszimg, x;


var startCompare = function() {
    workarr = new Array();
    rszimg = document.createElement('img');
    x=0;
    initImages();
    setHeight();
}


function initImages () {
    picarr = Array.from(document.getElementsByClassName('thmb'));
    let linkarr = Array.from(document.getElementsByClassName('compare-thmb'))
    let rawdata = new Array(3);
    if(picarr.length>0) {
        picarr.forEach (element => {
            let adr = element.getAttribute('src');
            var nm = element.getAttribute('alt');
            rawdata = ['', nm, adr];
            if(linkarr.length>0){
                rawdata[0] = linkarr[picarr.indexOf(element)].getAttribute('href');
            }
            workarr[workarr.length]  = rawdata;
        });
        return true;
    }
    return false;
}

$(window).on('mousedown', (e) => {md (e)});


var md = function (e) {
    if(e.target.className == 'control_wrapper') {
            var startX = e.clientX;
            $(e.target).mousemove(function (e) { 
                var offsetX = startX - e.clientX;
                reposition(offsetX, e.target);
                startX = e.clientX;
            });
        }
}

$(window).mouseup(function () {
    $('.control_wrapper').off('mousedown');
    $('.control_wrapper').off('mousemove');
});

function reposition (ofs) {
    let w = $('.comp').width() - ofs;
    if (w>$('.compare').width()) {w = $('.compare').width()}
    $('.comp').width(w);
}

function setHeight () {
    $('.comppic').css("width", $('.compare').innerWidth()+"px");
}

$(window).resize(function () {
    setHeight();
});

//смена картинок
$('.mygalery').click(function (e){
    e.preventDefault();
    if(e.target.className == "compare-thmb") {
        let thmbs = document.getElementsByClassName(e.target.className);
        for(let i = 0; i<thmbs.length; i = i+2){
            if(thmbs.item(i)==e.target){
                document.getElementsByClassName('comppic')[0].setAttribute('src', thmbs.item(i).getAttribute('href'));
                document.getElementsByClassName('comppic2')[0].setAttribute('src', thmbs.item(i+1).getAttribute('href'));
                x = i;
            }
    }
    setHeight();
    }
    
});