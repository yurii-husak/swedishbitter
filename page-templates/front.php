<?php
/*
Template Name: Front
*/
get_header(); ?>
<?php $tab_index = 0; $circle_index = 0; ?>

<main class="ba-main-content">
    <section class="ba-symptoms-wrapper">
        <div class="row">
            <div class="column small-12 large-5">
                <h2 class="ba-symptoms-title">
                    <?php the_field('title_symptoms'); ?>
                </h2>
                <!-- /.ba-symptoms-title -->
            </div>
            <!-- /.column small-12 large-5 -->
        </div>
        <!-- /.row -->

        <div class="ba-symptoms-content wrapper">
            <div class="row">
                <div class="column small-12 large-7 ba-symptoms-tabs">
                    <?php if( have_rows('symptom_tabs') ): ?>
                        <?php while ( have_rows('symptom_tabs') ) : the_row(); ?>

                            <?php $size_tab = get_sub_field('size') ?>

                            <?php if($size_tab == 'full_width') : ?>
                                <?php ++$tab_index; ?>
                                <div class="ba-symptom-tab tab-inner" data-id="<?php echo $tab_index ?>">
                                    <p class="ba-symptom-tab-num">
                                        <?php if($tab_index < 10) : ?>
                                            <?php echo '0'.$tab_index.'.'; ?>
                                        <?php else: ?>
                                            <?php echo $tab_index.'.'; ?>
                                        <?php endif; ?>
                                    </p>
                                    <!-- /.ba-symptom-tab-num -->
                                    <h4 class="ba-symptom-tab-title"><?php the_sub_field('title') ?></h4>
                                    <!-- /.ba-symptom-tab-title -->
                                    <div class="ba-symptom-tab-arrow">
                                        <img src="wp-content/themes/swedishbitter/dist/assets/images/arrow.png" alt="Arrow">
                                    </div>
                                    <!-- /.ba-symptom-tab-arrow -->
                                </div>
                                <!-- /.ba-symptom-tab tab-inner -->
                            <?php endif; ?>

                        <?php endwhile; ?>
                    <?php endif; ?>

                    <?php if( have_rows('symptom_tabs') ): ?>
                        <div class="row ba-symptom-tabs-half">
                            <?php while ( have_rows('symptom_tabs') ) : the_row(); ?>

                                <?php $size_tab = get_sub_field('size') ?>

                                <?php if($size_tab == 'half_width') : ?>
                                    <?php ++$tab_index; ?>
                                    <div class="column small-12 medium-6 ba-symptom-tab-half tab-inner" data-id="<?php echo $tab_index ?>">
                                        <p class="ba-symptom-tab-half-num">
                                            <?php if($tab_index < 10) : ?>
                                                <?php echo '0'.$tab_index.'.'; ?>
                                            <?php else: ?>
                                                <?php echo $tab_index.'.'; ?>
                                            <?php endif; ?>
                                        </p>
                                        <!-- /.ba-symptom-tab-half-num -->
                                        <h4 class="ba-symptom-tab-half-title"><?php the_sub_field('title') ?></h4>
                                        <!-- /.ba-symptom-tab-half-title -->
                                        <div class="ba-symptom-tab-half-arrow">
                                            <img src="wp-content/themes/swedishbitter/dist/assets/images/arrow.png" alt="Arrow">
                                        </div>
                                        <!-- /.ba-symptom-tab-half-arrow -->
                                    </div>
                                    <!-- /.column small-12 medium-6 ba-symptom-tab-half tab-inner -->
                                <?php endif; ?>

                            <?php endwhile; ?>
                        </div>
                        <!-- /.row ba-symptom-tabs-half -->
                    <?php endif; ?>
                </div>
                <!-- /.column ba-symptoms-tabs -->

                <div class="column small-12 large-5 ba-symptoms-right-content">
                    <div class="ba-symptoms-right-image">
                        <img src="<?php the_field('main_image_symptoms'); ?>" alt="Symptoms">

                        <div class="ba-symptoms-tabs-circle">

                            <?php if( have_rows('symptom_tabs') ): ?>
                                <?php while ( have_rows('symptom_tabs') ) : the_row(); ?>
                                    <?php $count = count(get_field('symptom_tabs')); ?>

                                    <?php $size_tab = get_sub_field('size') ?>

                                    <?php if($size_tab == 'full_width') : ?>
                                        <?php ++$circle_index; ?>
                                        <div class="ba-tab-circle" id="tab-circle-<?php echo $circle_index; ?>" style="top:<?php the_sub_field('coordinate_y'); ?>px; left: <?php the_sub_field('coordinate_x'); ?>px;">
                                            <?php if($count < 10) : ?>
                                                <?php echo '0'.$circle_index; ?>
                                            <?php else: ?>
                                                <?php echo $circle_index; ?>
                                            <?php endif; ?>
                                        </div>
                                        <!-- /.ba-tab-circle -->

                                    <?php endif; ?>

                                <?php endwhile; ?>
                            <?php endif; ?>

                            <?php if( have_rows('symptom_tabs') ): ?>
                                <?php while ( have_rows('symptom_tabs') ) : the_row(); ?>
                                    <?php $count = count(get_field('symptom_tabs')); ?>

                                    <?php $size_tab = get_sub_field('size') ?>

                                    <?php if($size_tab == 'half_width') : ?>
                                        <?php ++$circle_index; ?>
                                        <div class="ba-tab-circle" id="tab-circle-<?php echo $circle_index; ?>" style="top:<?php the_sub_field('coordinate_y'); ?>px; left: <?php the_sub_field('coordinate_x'); ?>px;">
                                            <?php if($count < 10) : ?>
                                                <?php echo '0'.$circle_index; ?>
                                            <?php else: ?>
                                                <?php echo $circle_index; ?>
                                            <?php endif; ?>
                                        </div>
                                        <!-- /.ba-tab-circle -->

                                    <?php endif; ?>

                                <?php endwhile; ?>
                            <?php endif; ?>

                        </div>
                        <!-- /.ba-symptoms-tabs-circle -->

                        <div class="ba-symptoms-testimonials">
                            <div class="ba-symptoms-testimonials-content">
                                <p class="ba-symptoms-testimonials-text">Более 2 000 покупателей доказали эффективность «Шведской горечи» в каждом из этих случаев</p>
                                <a class="ba-symptoms-testimonials-link" href="#">Читать отзывы</a>
                            </div>
                            <!-- /.ba-symptoms-testimonials-content -->
                        </div>
                        <!-- /.ba-symptoms-testimonials -->
                    </div>
                    <!-- /.ba-symptoms-right-image -->

                    <a class="ba-symptoms-button ba-button" href="#">
                        <span class="ba-button-text">Избавиться от проблем</span>
                        <!-- /.ba-button-text -->
                    </a>
                    <!-- /.ba-symptoms-button -->
                </div>
                <!-- /.column ba-symptoms-right-content -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.ba-symptoms-content wrapper -->

    </section>
    <!-- /.ba-symptoms-wrapper -->

    <section class="ba-popularity-wrapper wrapper">

        <div class="row ba-popularity-content">
            <div class="column small-12 large-6 ba-popularuty-left">
                <img src="<?php the_field('popularity_image'); ?>" alt="Popularity">
                <div class="ba-popularity-left__content">
                    <p class="ba-popularity-left__text"><?php the_field('get_text'); ?></p>
                    <!-- /.ba-popularity-left__text -->
                    <a class="ba-popularity-left__button ba-button">
                        <span class="ba-button-text">Получить средство-панацею к себе в аптечку</span>
                    </a>
                    <!-- /.ba-popularity-left__button -->
                </div>
                <!-- /.ba-popularity-left__content -->
            </div>
            <!-- /.column small-12 large-6 ba-popularuty-left -->
            <div class="colum small-12 large-6 ba-popularity-right">
                <div class="ba-popularity-right__content">
                    <h2 class="ba-popularity-right__title"><?php the_field('popularity_title'); ?></h2>
                    <!-- /.ba-popularity-right__title -->
                    <p class="ba-popularity-right__subtitle"><?php the_field('popularity_subtitle'); ?></p>
                    <!-- /.ba-popularity-right__subtitle -->
                    <div class="ba-popularity-right__desc">
                        <?php the_field('popularity_content'); ?>
                    </div>
                    <!-- /.ba-popularity-right__desc -->
                </div>
                <!-- /.ba-popularity-right__content -->
            </div>
            <!-- /.colum small-12 large-6 ba-popularity-right -->
        </div>
    </section>
    <!-- /.ba-popularity-wrapper -->

    <section class="ba-history-wrapper wrapper">
        <div class="row ba-history-content">
            <div class="column small-12 large-7 ba-history-left">
                <h2 class="ba-history-title"><?php the_field('history_title'); ?></h2>
                <!-- /.ba-history-title -->
                <div class="ba-history-text"><?php the_field('history_content'); ?></div>
                <!-- /.ba-history-text -->
                <div class="row ba-history-form-image">
                    <div class="column small-12 medium-6 large-12 ba-history-form-wrapper">
                        <div class="ba-history-form">
                            <h4 class="ba-history-form__title">Оставьте свою почту и получайте рецепты молодости и здоровья каждую неделю</h4>
                            <!-- /.ba-history-form-title -->
                            <form>
                                <input type="email" placeholder="E-mail" name="email">
                                <button class="ba-history-form__button ba-button">
                                <span class="ba-button-text">
                                    Оставить почту
                                </span>
                                    <!-- /.ba-button-text -->
                                </button>
                            </form>
                        </div>
                        <!-- /.ba-history-form -->
                    </div>
                    <!-- /.column small-12 medium-6 large-12 ba-history-form -->
                    <div class="column small-12 medium-6 large-12 ba-history-image-mobile">
                        <img src="<?php the_field('history_image'); ?>" alt="Famoso Doctor">
                    </div>
                    <!-- /.column small-12 medium-6 large-12 ba-history-image-mobile -->
                </div>
                <!-- /.row ba-history-form-image -->

            </div>
            <!-- /.column small-12 large-7 ba-history-left -->
            <div class="column small-12 large-5 ba-history-right">
                <img class="ba-history-image" src="<?php the_field('history_image'); ?>" alt="Famoso Doctor">
            </div>
            <!-- /.column small-12 large-5 ba-history-right -->
        </div>
        <!-- /.row ba-history-content -->
    </section>
    <!-- /.ba-history-wrapper wrapper -->

    <section class="ba-author-wrapper">
        <img class="ba-author-bg-one" src="wp-content/themes/swedishbitter/dist/assets/images/author-background.png" alt="Author Flower">
        <img class="ba-author-bg-two" src="wp-content/themes/swedishbitter/dist/assets/images/author-background.png" alt="Author Flower">
        <div class="wrapper">
            <div class="row">
                <div class="column small-12 medium-12 large-8 large-offset-2 ba-author-content">
                    <div class="ba-author-text"><?php the_field('author_text'); ?></div>
                    <!-- /.ba-author-text -->
                    <p class="ba-author-name">
                        <?php the_field('author_name'); ?>
                        <span class="ba-author-name__year"><?php the_field('author_name_-_years'); ?></span>
                    </p>
                    <!-- /.ba-author-name -->
                </div>
                <!-- /.column small-12 medium-12 large-8 large-offset-2 ba-author-content -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /.wrapper -->
    </section>
    <!-- /.ba-author-wrapper -->

    <section class="ba-set-wrapper wrapper">
        <div class="row">
            <div class="column ba-set-title-wrapper">
                <h2 class="ba-set-title"><?php the_field('sets_title'); ?></h2>
                <!-- /.ba-set-title -->
            </div>
            <!-- /.column ba-set-title-wrapper -->
        </div>
        <!-- /.row -->
        <div class="ba-set-items-wrapper">
            <?php if( have_rows('sets_items') ): ?>
                <div class="row">
                    <?php $set_count = 0 ?>
                    <?php while( have_rows('sets_items') ): the_row();?>
                        <?php ++$set_count; ?>
                        <div class="column small-12 medium-4">
                            <div class="ba-set-item-wrapper">
                                <div class="ba-set-item-content">
                                    <div class="ba-set-item__image">
                                        <?php if($set_count < 10) : ?>
                                            <div class="ba-set-item__num"><?php echo '0'.$set_count; ?></div>
                                        <?php else: ?>
                                            <div class="ba-set-item__num"><?php echo $set_count; ?></div>
                                        <?php endif; ?>
                                        <!-- /.ba-set-item__num -->
                                        <img src="<?php the_sub_field('image'); ?>" alt="Item">
                                    </div>
                                    <!-- /.ba-set-item__image -->
                                    <h5 class="ba-set-item__title"><?php the_sub_field('text'); ?></h5>
                                    <!-- /.ba-set-item__title -->
                                </div>
                                <!-- /.ba-set-item-content -->
                            </div>
                            <!-- /.ba-set-item-wrapper -->
                        </div>
                        <!-- /.column small-12 medium-4 -->
                    <?php endwhile; ?>
                </div>
                <!-- /.row -->
            <?php endif; ?>






        </div>
        <!-- /.ba-set-items-wrapper -->
    </section>
    <!-- /.ba-set-wrapper wrapper -->
</main>

<?php get_footer(); ?>
