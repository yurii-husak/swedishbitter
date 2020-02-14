<?php


/**
 * Author: Ole Fredrik Lie
 * URL: http://olefredrik.com
 *
 * FoundationPress functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */

/** Various clean up functions */
require_once('library/cleanup.php');

/** Required for Foundation to work properly */
require_once('library/foundation.php');

/** Format comments */
require_once('library/class-foundationpress-comments.php');

/** Register all navigation menus */
require_once('library/navigation.php');

/** Add menu walkers for top-bar and off-canvas */
require_once('library/class-foundationpress-top-bar-walker.php');
require_once('library/class-foundationpress-mobile-walker.php');

/** Return entry meta information for posts */
require_once('library/entry-meta.php');

/** Enqueue scripts */
require_once('library/enqueue-scripts.php');

/** Add theme support */
require_once('library/theme-support.php');

/** Change WP's sticky post class */
require_once('library/sticky-posts.php');

/** Configure responsive image sizes */
require_once('library/responsive-images.php');

/** Customization Admin */
require_once('library/custom-admin.php');

/** Post Types */
require_once('library/post-types.php');

/** If your site requires protocol relative url's for theme assets, uncomment the line below */
// require_once( 'library/class-foundationpress-protocol-relative-theme-assets.php' );

define( 'WPCF7_AUTOP', false );
add_filter('wpcf7_autop_or_not', '__return_false');

add_action('wp_ajax_simple_testimonial_view', 'simple_testimonial_view');
add_action('wp_ajax_nopriv_simple_testimonial_view', 'simple_testimonial_view');

function simple_testimonial_view()
{
    $testimonial_cat = $_POST['testimonialCat'];
    ?>

    <?php
    $testimonialsArgs = array(
        'post_type' => 'ba_testimonial',
        'posts_per_page' => 4,
    );

    $testimonialsArgs['tax_query'] = array(
        array(
            'taxonomy' => 'testimonial_cnsm',
            'field' => 'slug',
            'terms' => $testimonial_cat
        )
    );

    $testimonials = new WP_Query($testimonialsArgs); ?>
    <?php if ($testimonials->have_posts()): ?>
        <div class="row tabs-panel is-active">
            <?php while ($testimonials->have_posts()): $testimonials->the_post() ?>
                <div class="column small-12 large-6 ba-testimonial-item">
                    <div class="ba-testimonial-item__text"><?php the_content(); ?></div>
                    <!-- /.ba-testimonial-item__text -->
                    <h5 class="ba-testimonial-item__author"><?php the_title(); ?></h5>
                    <!-- /.ba-testimonial-item_author -->
                </div>
                <!-- /.column small-12 large-6 ba-testimonial-item -->
            <?php endwhile; ?>
            <span style="display: none;" class="ba-testimonials-loadmore-section"></span>
            <!-- /.ba-testimonials-loadmore-section -->
        </div>
        <!-- /.row tabs-panel is-active -->
    <?php endif; ?>
    <?php wp_reset_postdata(); ?>

    <div class="row ba-testimonials-buttons">
        <div class="column small-12 large-6 ba-testimonial-loadmore">
            <?php if ($testimonials->max_num_pages > 1) : ?>
                <script>
                    var ajaxurl = '<?php echo site_url() ?>/wp-admin/admin-ajax.php';
                    var true_posts = '<?php echo serialize($testimonials->query_vars); ?>';
                    var current_page = <?php echo (get_query_var('paged')) ? get_query_var('paged') : 1; ?>;
                    var max_pages = '<?php echo $testimonials->max_num_pages; ?>';
                </script>
                <button id="tstm_loadmore">Читать ещё отзывы</button>
                <div class="loadmore-button-end">Все отзывы загружены</div>
            <?php endif; ?>
        </div>
        <!-- /.column small-12 large-6 ba-testimonial-loadmore -->
        <div class="column small-12 large-6 ba-testimonial-join-button">
            <a href="#" class="ba-button ba-button-join">
                <span class="ba-button-text">
                    Присоединиться к тем, кто решил свои проблемы
                </span>
            </a>
        </div>
        <!-- /.column small-12 large-6 ba-testimonial-join-button -->
    </div>
    <!-- /.row ba-testimonials-buttons -->

    <script>
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
                            if (current_page == max_pages) $(".loadmore-button-end").css('display', 'inline'); // скрываем кнопку
                        } else {
                            $("#tstm_loadmore").css('display', 'none'); // скрываем кнопку
                            $(".loadmore-button-end").css('display', 'inline'); // скрываем кнопку
                        }
                    }
                });
            });
        });
    </script>

    <?php
    wp_die();
}


add_action('wp_ajax_loadmore_tstm', 'testimonials_loadmore');
add_action('wp_ajax_nopriv_loadmore_tstm', 'testimonials_loadmore');

function testimonials_loadmore(){

    $args = unserialize(stripslashes($_POST['query']));
    $args['paged'] = $_POST['page'] + 1; // следующая страница
    $args['post_status'] = 'publish';
    $args['post_type'] = 'ba_testimonial';

    $testimonials = new WP_Query($args); ?>
    <?php if ($testimonials->have_posts()): ?>
        <?php while ($testimonials->have_posts()): $testimonials->the_post() ?>
            <div class="column small-12 large-6 ba-testimonial-item">
                <div class="ba-testimonial-item__text"><?php the_content(); ?></div>
                <!-- /.ba-testimonial-item__text -->
                <h5 class="ba-testimonial-item__author"><?php the_title(); ?></h5>
                <!-- /.ba-testimonial-item_author -->
            </div>
            <!-- /.column small-12 large-6 ba-testimonial-item -->
        <?php endwhile; ?>
    <?php endif; ?>
    <?php wp_reset_postdata();
    die();
}