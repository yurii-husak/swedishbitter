import $ from 'jquery';

import whatInput from 'what-input';

window.$ = $;

// import Foundation from 'foundation-sites';

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';

$(document).foundation();

$('.tab-inner').filter(':first').addClass('active-tab');
$('.ba-tab-circle').filter(':first').addClass('active-tab-circle');

$('.ba-symptoms-tabs .tab-inner').on('click', function (event) {
    let tab_id = $(this).attr('data-id');
    $('.ba-symptoms-content').find('.ba-tab-circle').removeClass('active-tab-circle').hide();
    $('.ba-symptoms-content').find('.tab-inner').removeClass('active-tab');
    $(this).addClass('active-tab');
    $('#tab-circle-' + tab_id).addClass('active-tab-circle').fadeIn();
    return false;
})

// Tabs

$('.tabs-title').filter(':first').addClass('is-active');
$('.tabs-title .ba-testimonial-cat-button').filter(':first').attr('aria-selected', true);

$('.ba-testimonial-cat-button').click(function(){
    $.getScript( "/wp-content/themes/swedishbitter/loadmore.js", function( data, textStatus, jqxhr ) {

    });
});

let testimonial_cat;

$(function(){
    $('.ba-testimonial-cat-button').click(function(){
        testimonial_cat = $(this).data('testimonials-cat');

        let data = {
            action: 'simple_testimonial_view',
            testimonialCat: testimonial_cat
        };
        $.post(ba_ajax, data, function(response){
            $('.ba-testimonials-content__wrapper').html(response);
        });
    });
});

$(".ba-symptoms-testimonials").on("click","a", function (event) {
    event.preventDefault(); //опустошим стандартную обработку
    var id  = $(this).attr('href'), //заберем айдишник блока с параметром URL
        top = $(id).offset().top; //определим высоту от начала страницы до якоря
    $('body,html').animate({scrollTop: top}, 1000); //сделаем прокрутку за 1 с
});

$('[data-fancybox]').fancybox({
    touch: false
});