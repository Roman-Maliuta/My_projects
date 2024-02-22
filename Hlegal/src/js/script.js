$( document ).ready(function() {
    $(function() {
        $('.header__nav-btn').click(function(){
            $('.header__nav').toggleClass('active');
            $('body').toggleClass('lock');
        })
        $('.header__nav-close').click(function(){
            $('.header__nav').toggleClass('active');
            $('body').toggleClass('lock');
        })
        $('.gallery__holder').slick({
            arrows: false,
            dots: true
        });
        $('.achievements__holder').slick({
            arrows: false,
            dots: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        $(function() {
            $('.violet-block__tab-link').click(function(e){
                e.preventDefault();
                const tab_id = $(this).attr('href');
            
                $('.violet-block__tab-link').removeClass('violet-block__tab-link_active');
                $('.violet-block__tab-content').removeClass('violet-block__tab-content_active');
            
                $(this).addClass('violet-block__tab-link_active');
                $(tab_id).addClass('violet-block__tab-content_active');
            })
        });
    });
});

