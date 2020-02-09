jQuery(function($){
    $('#tstm_loadmore').click(function(){
        $(this).text('Загружаю...'); // изменяем текст кнопки, вы также можете добавить прелоадер
        var data = {
            'action': 'loadmore_tstm',
            'query': true_posts,
            'page' : current_page
        };
        $.ajax({
            url:ba_ajax, // обработчик
            data:data, // данные
            type:'POST', // тип запроса
            success:function(data){
                if( data ) {
                    $('.ba-testimonials-loadmore-section').before(data); // вставляем новые посты
                    $('#tstm_loadmore').text('Читать ещё отзывы'); // вставляем новые посты
                    current_page++; // увеличиваем номер страницы на единицу
                    if (current_page == max_pages) $("#tstm_loadmore").css('display', 'none'); // скрываем кнопку
                    if (current_page == max_pages) $(".loadmore-button-end").css('display', 'inline'); // отображаем текст
                } else {
                    $("#tstm_loadmore").css('display', 'none'); // скрываем кнопку
                    $(".loadmore-button-end").css('display', 'inline'); // отображаем текст
                }
            }
        });
    });
});