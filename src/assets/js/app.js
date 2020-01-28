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
