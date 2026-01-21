$('header').load('/include/header.html', function(){
    gnbAction();
    
    $('.hamburger').click(function(){
        $('.hamburger').toggleClass('on')
        $('header nav').toggleClass('on')
    })
})
/* 이미 html이 모두 로드가 끝났기 때문에 js 실행이 안됨. 그래서 js를 실행하라는 코드를 따로 넣음 */


function gnbAction(){
    let winW = $(window).width()
    /* window = 한 화면, document = 전체 화면(스크롤 영역 포함) */

    $('.gnb li').off() /* 기존 이벤트 제거 */

    if(winW > 768){
        $('header .gnb li').mouseover(function(){
            $(this).children('.lnb').stop().slideDown(200);
        }).mouseout(function(){
            $('header .lnb').stop().slideUp(200);
        })
        /* 
        .mouseenter() 본인한테 마우스를 올렸을 때
        .mouseleave() 본인한테서 마우스를 떼었을 때

        .mouseover() 본인이나 자식한테 마우스를 올렸을 때
        .mouseout() 본인이나 자식한테서 마우스를 떼었을 때
        */
    } else {
        $('header .gnb li').click(function(){
            $('.lnb').slideUp();
            $(this).children('.lnb').stop().slideToggle(200);
        })
    }
}

gnbAction() /* 새로고침할 때 실행 */

$(window).resize(function(){
    gnbAction()
})
/* window 사이즈를 구해서 변수에 담은 다음, 변수의 크기가 768 이상일 때 실행되도록 만듦 (미디어쿼리와 같은 원리) */


$('.smallimg > li').mouseenter(function(){
    rollingNumber = $(this).index()

    autoRefactoring()

    $('.smallimg > li').removeClass('on')
    clearInterval(autoRolling)

    return false;
    /* a 태그의 속성을 거짓으로 돌려준다 */
})
$('.smallimg > li').mouseleave(function(){
    autoRolling = setInterval(imgRolling, 2000)
})


// setTimeout(function(){}, 3000)
// 예약을 거는 함수

// Section1 자동 롤링
let rollingNumber = 0
let smallimgLength = $('.smallimg > li').length
// 얘는 0이 아니라 1부터 셈...
$('.smallimg > li').eq(rollingNumber).addClass('on')

let autoRolling = setInterval(imgRolling, 2000)

function imgRolling(){
    rollingNumber++
    if(rollingNumber > smallimgLength - 1){
        rollingNumber = 0
    }

    $('.smallimg > li').eq(rollingNumber).addClass('on').siblings().removeClass('on')
    // siblings: 형제 태그
    autoRefactoring()
}

function autoRefactoring(){
    let h3Text = $('.smallimg > li').eq(rollingNumber).find('.textinfo').html();
    let smallimg = $('.smallimg > li').eq(rollingNumber).find('img').attr('src');
    $('.bigimg .textinfo').html(h3Text);
    $('.bigimg .btn_play').hide();
    $('.bigimg .bigimg1').attr('src',smallimg);
    $('.bigimg .bigimg2 img').attr('src',smallimg);
}


$(window).scroll(function(){
    let scrT = $(window).scrollTop();
    let sec1Top = $('#section1').offset().top;
    let sec2Top = $('#section2').offset().top;
    let sec3Top = $('#section3').offset().top;
    let winH = $(window).height();
    let opa = (scrT-sec2Top+(winH*0.8))*0.005;
    opa = Math.min(opa,0.7)

    if(scrT > sec2Top - winH*0.8){
        $('#section2 .overlay').css({ background: 'rgba(0,0,0,'+opa+')'})
    
    }
    
    if(scrT >= sec1Top){
        $('.floating_menu a').eq(0).addClass('on').siblings().removeClass('on')
        $('.floating_menu').fadeIn().css({display: 'flex'})
    } else {
        $('.floating_menu a').removeClass('on')
        $('.floating_menu').fadeOut()
    }
    if(scrT >= sec2Top){
        $('.floating_menu a').eq(1).addClass('on').siblings().removeClass('on')
    }
    if(scrT >= sec3Top){
        $('.floating_menu a').eq(2).addClass('on').siblings().removeClass('on')
    }
});


$('.btn_top').click(function(){
    $('html, body').animate({scrollTop:0}, 800)
    // 보통 html과 body를 같이 씀
});
/* TOP 버튼 (1초 동안 올라감) */

$('.floating_menu a').click(function(){
    let aIndex = $(this).index()+1; /* index: 값을 구하는 함수. 여기서는 0, 1, 2 */
    let sTop = $('#section'+aIndex).offset().top;

    $('.floating_menu a').removeClass();
    $('html').animate({scrollTop: sTop});
});

/* 슬라이더 */
// let heroW = $('#hero').css('width'); 도 width를 측정하는 것은 가능하지만 숫자 계산할 때에는 parseInt(숫자만 남김) 함수를 쓰지 않는 이상 단위가 붙어서 오류가 남!
let heroW = $('#hero').width();
console.log(heroW)
let heroLength = $('#hero li').length;
let time = 4500;
let autoClick

$('#hero ul').width(heroW * heroLength);
$('#hero ul li').width(heroW);

$('.btns_box .next').click(function(){
    clearTimeout(autoClick);

    $('#hero ul').stop().animate({left:-heroW}, function(){
        $('#hero li').eq(0).appendTo(this); /* appendTo: 막내 자식으로 보냄 */
        $(this).css({left:0});
    })

    /* 클릭하면 자동으로 넘어가게 하기 위함 */
    autoClick = setTimeout(function(){
        $('.next').click()
    }, time)
})
$('.btns_box .prev').click(function(){
    clearTimeout(autoClick);

    $('#hero li').eq(2).prependTo('#hero ul'); /* prependTo: 첫째 자식으로 보냄 */
    $('#hero ul').css({left:-heroW});
    $('#hero ul').stop().animate({left: 0});

    autoClick = setTimeout(function(){
        $('.next').click()
    }, time)
})

/* 다음 버튼을 한 번 누르도록 예약을 걸음 */
autoClick = setTimeout(function(){
    $('.next').click()
}, time)