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


$('.hamburger').click(function(){
    $('.hamburger').toggleClass('on')
    $('header nav').toggleClass('on')
})


$('.smallimg li').mouseenter(function(){
    let h3Text = $(this).find('.textinfo').html();
    let smallimg = $(this).find('img').attr('src');
    $('.bigimg .textinfo').html(h3Text);
    $('.bigimg .btn_play').hide();
    $('.bigimg .bigimg1').attr('src',smallimg);
    $('.bigimg .bigimg2 img').attr('src',smallimg);

    return false;
    /* a 태그의 속성을 거짓으로 돌려준다 */
})


$('.btn_top').click(function(){
    $('html').animate({scrollTop:0}, 800)
})
/* TOP 버튼 (1초 동안 올라감) */

$('.floating_menu a').removeClass();
$('.floating_menu a').click(function(){
    $('.floating_menu a').removeClass();
    $(this).addClass('on');
})

/* $('.floating_menu a').eq(0).click(function(){
    let s1Top = $('#section1').offset().top;
    $('html').animate({scrollTop: s1Top});
})
$('.floating_menu a').eq(1).click(function(){
    let s2Top = $('#section2').offset().top;
    $('html').animate({scrollTop: s2Top});
}) */
$('.floating_menu a').click(function(){
    let aIndex = $(this).index()+1; /* index: 값을 구하는 함수. 여기서는 0, 1, 2 */
    let sTop = $('#section'+aIndex).offset().top;
    $('html').animate({scrollTop: sTop});
})