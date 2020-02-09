<?php
/*
Template Name: Front
*/
get_header(); ?>
<?php $tab_index = 0;
$circle_index = 0;
$compos_index = 0;
$compos_index_mobile = 0;
$testimonial_titles_count = 0; ?>

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
                    <?php if (have_rows('symptom_tabs')): ?>
                        <?php while (have_rows('symptom_tabs')) : the_row(); ?>

                            <?php $size_tab = get_sub_field('size') ?>

                            <?php if ($size_tab == 'full_width') : ?>
                                <?php ++$tab_index; ?>
                                <div class="ba-symptom-tab tab-inner" data-id="<?php echo $tab_index ?>">
                                    <p class="ba-symptom-tab-num">
                                        <?php if ($tab_index < 10) : ?>
                                            <?php echo '0' . $tab_index . '.'; ?>
                                        <?php else: ?>
                                            <?php echo $tab_index . '.'; ?>
                                        <?php endif; ?>
                                    </p>
                                    <!-- /.ba-symptom-tab-num -->
                                    <h4 class="ba-symptom-tab-title"><?php the_sub_field('title') ?></h4>
                                    <!-- /.ba-symptom-tab-title -->
                                    <div class="ba-symptom-tab-arrow">
                                        <img src="wp-content/themes/swedishbitter/dist/assets/images/arrow.png"
                                             alt="Arrow">
                                    </div>
                                    <!-- /.ba-symptom-tab-arrow -->
                                </div>
                                <!-- /.ba-symptom-tab tab-inner -->
                            <?php endif; ?>

                        <?php endwhile; ?>
                    <?php endif; ?>

                    <?php if (have_rows('symptom_tabs')): ?>
                        <div class="row ba-symptom-tabs-half">
                            <?php while (have_rows('symptom_tabs')) : the_row(); ?>

                                <?php $size_tab = get_sub_field('size') ?>

                                <?php if ($size_tab == 'half_width') : ?>
                                    <?php ++$tab_index; ?>
                                    <div class="column small-12 medium-6 ba-symptom-tab-half tab-inner"
                                         data-id="<?php echo $tab_index ?>">
                                        <p class="ba-symptom-tab-half-num">
                                            <?php if ($tab_index < 10) : ?>
                                                <?php echo '0' . $tab_index . '.'; ?>
                                            <?php else: ?>
                                                <?php echo $tab_index . '.'; ?>
                                            <?php endif; ?>
                                        </p>
                                        <!-- /.ba-symptom-tab-half-num -->
                                        <h4 class="ba-symptom-tab-half-title"><?php the_sub_field('title') ?></h4>
                                        <!-- /.ba-symptom-tab-half-title -->
                                        <div class="ba-symptom-tab-half-arrow">
                                            <img src="wp-content/themes/swedishbitter/dist/assets/images/arrow.png"
                                                 alt="Arrow">
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

                            <?php if (have_rows('symptom_tabs')): ?>
                                <?php while (have_rows('symptom_tabs')) : the_row(); ?>
                                    <?php $count = count(get_field('symptom_tabs')); ?>

                                    <?php $size_tab = get_sub_field('size') ?>

                                    <?php if ($size_tab == 'full_width') : ?>
                                        <?php ++$circle_index; ?>
                                        <div class="ba-tab-circle" id="tab-circle-<?php echo $circle_index; ?>"
                                             style="top:<?php the_sub_field('coordinate_y'); ?>px; left: <?php the_sub_field('coordinate_x'); ?>px;">
                                            <?php if ($count < 10) : ?>
                                                <?php echo '0' . $circle_index; ?>
                                            <?php else: ?>
                                                <?php echo $circle_index; ?>
                                            <?php endif; ?>
                                        </div>
                                        <!-- /.ba-tab-circle -->

                                    <?php endif; ?>

                                <?php endwhile; ?>
                            <?php endif; ?>

                            <?php if (have_rows('symptom_tabs')): ?>
                                <?php while (have_rows('symptom_tabs')) : the_row(); ?>
                                    <?php $count = count(get_field('symptom_tabs')); ?>

                                    <?php $size_tab = get_sub_field('size') ?>

                                    <?php if ($size_tab == 'half_width') : ?>
                                        <?php ++$circle_index; ?>
                                        <div class="ba-tab-circle" id="tab-circle-<?php echo $circle_index; ?>"
                                             style="top:<?php the_sub_field('coordinate_y'); ?>px; left: <?php the_sub_field('coordinate_x'); ?>px;">
                                            <?php if ($count < 10) : ?>
                                                <?php echo '0' . $circle_index; ?>
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
                                <p class="ba-symptoms-testimonials-text">Более 2 000 покупателей доказали эффективность
                                    «Шведской горечи» в каждом из этих случаев</p>
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
                            <h4 class="ba-history-form__title">Оставьте свою почту и получайте рецепты молодости и
                                здоровья каждую неделю</h4>
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
        <img class="ba-author-bg-one" src="wp-content/themes/swedishbitter/dist/assets/images/author-background.png"
             alt="Author Flower">
        <img class="ba-author-bg-two" src="wp-content/themes/swedishbitter/dist/assets/images/author-background.png"
             alt="Author Flower">
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
            <?php if (have_rows('sets_items')): ?>
                <div class="row">
                    <?php $set_count = 0 ?>
                    <?php while (have_rows('sets_items')): the_row(); ?>
                        <?php ++$set_count; ?>
                        <div class="column small-12 medium-4">
                            <div class="ba-set-item-wrapper">
                                <div class="ba-set-item-content">
                                    <div class="ba-set-item__image">
                                        <?php if ($set_count < 10) : ?>
                                            <div class="ba-set-item__num"><?php echo '0' . $set_count; ?></div>
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

    <section class="ba-compos-wrapper">
        <div class="row ba-compos-one">
            <?php $compos_count = count(get_field('composition_items')); ?>
            <?php if (have_rows('composition_items')): ?>
                <?php while (have_rows('composition_items')): the_row(); ?>
                    <?php ++$compos_index; ?>
                    <?php if ($compos_index == 1 || $compos_index == 2) : ?>
                        <div class="column large-3 ba-compos-item ba-compos-one-item">
                            <div class="ba-compos-item-wrapper">
                                <div class="ba-compos-item-front">
                                    <div class="ba-compos-item-number"><?php echo '0' . $compos_index; ?></div>
                                    <!-- /.ba-compos-item-number -->
                                    <div class="ba-compos-item-image">
                                        <img src="<?php the_sub_field('image'); ?>" alt="Component">
                                    </div>
                                    <!-- /.ba-compos-item-image -->
                                    <div class="ba-compos-item-title"><?php the_sub_field('title'); ?></div>
                                    <!-- /.ba-compos-item-title -->
                                    <?php $show_secret_ingridient = get_sub_field('secret_ingridient'); ?>
                                    <?php if ($show_secret_ingridient) : ?>
                                        <div class="ba-compos-item-maintitle">
                                            Часть рецепты до сих пор находиться в секрете
                                        </div>
                                        <!-- /.ba-compos-item-maintitle -->
                                    <?php endif; ?>
                                </div>
                                <!-- /.ba-compos-item-front -->
                                <div class="ba-compos-item-back">
                                    <div class="ba-compos-item-number-back"><?php echo '0' . $compos_index; ?></div>
                                    <!-- /.ba-compos-item-number-back -->
                                    <div class="ba-compos-item-backimg">
                                        <img src="<?php the_sub_field('image'); ?>" alt="Component">
                                    </div>
                                    <!-- /.ba-compos-item-backimg -->
                                    <div class="ba-compos-item-backtitle">
                                        <?php the_sub_field('back_title'); ?>
                                    </div>
                                    <!-- /.ba-compos-item-backtitle -->
                                    <div class="ba-compos-item-title-back"><?php the_sub_field('title'); ?></div>
                                    <!-- /.ba-compos-item-title-back -->
                                </div>
                                <!-- /.ba-compos-item-back -->
                            </div>
                            <!-- /.ba-compos-item-wrapper -->
                        </div>
                        <!-- /.column large-3 ba-compos-item ba-compos-one-item -->
                    <?php endif; ?>
                    <?php if ($compos_index == 2) : ?>
                        <?php break; ?>
                    <?php endif; ?>
                <?php endwhile; ?>
            <?php endif; ?>

            <div class="column small-12 large-5 large-offset-1 ba-compos-title-wrapper">
                <h2 class="ba-compos-title"><?php the_field('composition_title'); ?></h2>
                <!-- /.ba-compos-title -->
                <div class="ba-compos-title-list ba-compos-list">
                    <?php the_field('composition_text'); ?>
                </div>
                <!-- /.ba-compos-title-list ba-compos-list -->
            </div>
            <!-- /.column small-12 large-5 large-offset-1 ba-compos-title-wrapper -->
        </div>
        <!-- /.row ba-compos-one -->

        <div class="row ba-compos-two">
            <?php if (have_rows('composition_items')): ?>
                <?php while (have_rows('composition_items')): the_row(); ?>
                    <?php ++$compos_index; ?>
                    <div class="column small-12 medium-6 large-3 ba-compos-item ba-compos-two-item">
                        <div class="ba-compos-item-wrapper">
                            <div class="ba-compos-item-front">
                                <div class="ba-compos-item-number">
                                    <?php if ($compos_index < 10) : ?>
                                        <?php echo '0' . $compos_index; ?>
                                    <?php else: ?>
                                        <?php echo $compos_index; ?>
                                    <?php endif; ?>
                                </div>
                                <!-- /.ba-compos-item-number -->
                                <div class="ba-compos-item-image">
                                    <img src="<?php the_sub_field('image'); ?>" alt="Component">
                                </div>
                                <!-- /.ba-compos-item-image -->
                                <div class="ba-compos-item-title"><?php the_sub_field('title'); ?></div>
                                <!-- /.ba-compos-item-title -->
                                <?php $show_secret_ingridient = get_sub_field('secret_ingridient'); ?>
                                <?php if ($show_secret_ingridient) : ?>
                                    <div class="ba-compos-item-maintitle">
                                        Часть рецепты до сих пор находиться в секрете
                                    </div>
                                    <!-- /.ba-compos-item-maintitle -->
                                <?php endif; ?>
                            </div>
                            <!-- /.ba-compos-item-front -->
                            <div class="ba-compos-item-back">
                                <div class="ba-compos-item-number-back">
                                    <?php if ($compos_index < 10) : ?>
                                        <?php echo '0' . $compos_index; ?>
                                    <?php else: ?>
                                        <?php echo $compos_index; ?>
                                    <?php endif; ?>
                                </div>
                                <!-- /.ba-compos-item-number-back -->
                                <div class="ba-compos-item-backimg">
                                    <img src="<?php the_sub_field('image'); ?>" alt="Component">
                                </div>
                                <div class="ba-compos-item-title-back"><?php the_sub_field('title'); ?></div>
                                <!-- /.ba-compos-item-title-back -->
                                <div class="ba-compos-item-backtitle">
                                    <?php the_sub_field('back_title'); ?>
                                </div>
                                <!-- /.ba-compos-item-backtitle -->
                            </div>
                            <!-- /.ba-compos-item-back -->
                        </div>
                        <!-- /.ba-compos-item-wrapper -->
                    </div>
                    <!-- /.column small-12 medium-6 large-3 ba-compos-item ba-compos-two-item -->
                    <?php if ($compos_index == $compos_count - 1) : ?>
                        <?php break; ?>
                    <?php endif; ?>
                <?php endwhile; ?>
            <?php endif; ?>
        </div>
        <!-- /.row ba-compos-two -->

        <div class="row ba-compos-three">
            <div class="column small-12 large-9 ba-compos-order-wrapper">
                <div class="ba-compos-order">
                    <div class="ba-compos-order-text ba-compos-list">
                        <ul>
                            <li><?php the_field('componation_order_text'); ?></li>
                        </ul>
                    </div>
                    <!-- /.ba-compos-order-text ba-compos-list -->
                    <a class="ba-compos-order-button ba-button">
                        <span class="ba-button-text">заказать сбор трав</span>
                    </a>
                    <!-- /.ba-compos-order-button -->
                </div>
                <!-- /.ba-compos-order -->
            </div>
            <!-- /.column small-12 large-9 ba-compos-order-wrapper -->

            <?php if (have_rows('composition_items')): ?>
                <?php while (have_rows('composition_items')): the_row(); ?>
                    <?php ++$compos_index; ?>
                    <?php if ($compos_index == $compos_count) : ?>
                        <div class="column large-3 ba-compos-item ba-compos-item-three">
                            <div class="ba-compos-item-wrapper">
                                <div class="ba-compos-item-front">
                                    <div class="ba-compos-item-number">
                                        <?php if ($compos_index < 10) : ?>
                                            <?php echo '0' . $compos_index; ?>
                                        <?php else: ?>
                                            <?php echo $compos_index; ?>
                                        <?php endif; ?>
                                    </div>
                                    <!-- /.ba-compos-item-number -->
                                    <div class="ba-compos-item-image">
                                        <img src="<?php the_sub_field('image'); ?>" alt="Component">
                                    </div>
                                    <!-- /.ba-compos-item-image -->
                                    <div class="ba-compos-item-title"><?php the_sub_field('title'); ?></div>
                                    <!-- /.ba-compos-item-title -->
                                    <?php $show_secret_ingridient = get_sub_field('secret_ingridient'); ?>
                                    <?php if ($show_secret_ingridient) : ?>
                                        <div class="ba-compos-item-maintitle">
                                            Часть рецепты до сих пор находиться в секрете
                                        </div>
                                        <!-- /.ba-compos-item-maintitle -->
                                    <?php endif; ?>
                                </div>
                                <!-- /.ba-compos-item-front -->
                                <div class="ba-compos-item-back">
                                    <div class="ba-compos-item-number-back">
                                        <?php if ($compos_index < 10) : ?>
                                            <?php echo '0' . $compos_index; ?>
                                        <?php else: ?>
                                            <?php echo $compos_index; ?>
                                        <?php endif; ?>
                                    </div>
                                    <!-- /.ba-compos-item-number-back -->
                                    <div class="ba-compos-item-backimg">
                                        <img src="<?php the_sub_field('image'); ?>" alt="Component">
                                    </div>
                                    <div class="ba-compos-item-title-back"><?php the_sub_field('title'); ?></div>
                                    <!-- /.ba-compos-item-title-back -->
                                    <div class="ba-compos-item-backtitle">
                                        <?php the_sub_field('back_title'); ?>
                                    </div>
                                    <!-- /.ba-compos-item-backtitle -->
                                </div>
                                <!-- /.ba-compos-item-back -->
                            </div>
                            <!-- /.ba-compos-item-wrapper -->
                        </div>
                        <!-- /.column large-3 ba-compos-item ba-compos-item-three -->
                    <?php endif; ?>
                <?php endwhile; ?>
            <?php endif; ?>
        </div>
        <!-- /.row ba-compos-three -->

        <div class="row ba-compon-items-mobile">
            <?php if (have_rows('composition_items')): ?>
                <?php while (have_rows('composition_items')): the_row(); ?>
                    <?php ++$compos_index_mobile; ?>

                    <div class="column small-12 medium-6 large-3 ba-compos-item ba-compos-two-item">
                        <div class="ba-compos-item-wrapper">
                            <div class="ba-compos-item-front">
                                <div class="ba-compos-item-number">
                                    <?php if ($compos_index < 10) : ?>
                                        <?php echo '0' . $compos_index; ?>
                                    <?php else: ?>
                                        <?php echo $compos_index; ?>
                                    <?php endif; ?>
                                </div>
                                <!-- /.ba-compos-item-number -->
                                <div class="ba-compos-item-image">
                                    <img src="<?php the_sub_field('image'); ?>" alt="Component">
                                </div>
                                <!-- /.ba-compos-item-image -->
                                <div class="ba-compos-item-title"><?php the_sub_field('title'); ?></div>
                                <!-- /.ba-compos-item-title -->
                                <?php $show_secret_ingridient = get_sub_field('secret_ingridient'); ?>
                                <?php if ($show_secret_ingridient) : ?>
                                    <div class="ba-compos-item-maintitle">
                                        Часть рецепты до сих пор находиться в секрете
                                    </div>
                                    <!-- /.ba-compos-item-maintitle -->
                                <?php endif; ?>
                            </div>
                            <!-- /.ba-compos-item-front -->
                            <div class="ba-compos-item-back">
                                <div class="ba-compos-item-backimg">
                                    <img src="<?php the_sub_field('image'); ?>" alt="Component">
                                </div>
                                <div class="ba-compos-item-backtitle">
                                    <?php the_sub_field('back_title'); ?>
                                </div>
                                <!-- /.ba-compos-item-backtitle -->
                            </div>
                            <!-- /.ba-compos-item-back -->
                        </div>
                        <!-- /.ba-compos-item-wrapper -->
                    </div>
                    <!-- /.column small-12 medium-6 large-3 ba-compos-item ba-compos-two-item -->
                <?php endwhile; ?>
            <?php endif; ?>

            <div class="column small-12 medium-6 large-3 ba-compos-item ba-compos-tablet-order__vis">
                <div class="ba-compos-item-wrapper ba-compos-tablet-order">
                    <p class="ba-compos-tabler-order__text">
                        <?php the_field('componation_order_text'); ?>
                    </p>
                    <!-- /.ba-compos-tabler-order__text -->
                    <a class="ba-compos-order-tablet-button ba-button">
                        <span class="ba-button-text">заказать сбор трав</span>
                    </a>
                    <!-- /.ba-compos-order-button -->
                </div>
                <!-- /.ba-compos-item-wrapper ba-compos-tablet-order -->
            </div>
            <!-- /.column small-12 medium-6 large-3 ba-compos-item ba-compos-tablet-order__vis -->
        </div>
        <!-- /.row ba-compon-items-mobile -->

    </section>
    <!-- /.ba-compos-wrapper -->

    <section class="ba-testimonials">
        <div class="row">
            <div class="column small-12 large-5">
                <h2 class="ba-testimonials-title">Отзывы о «Шведской горечи»</h2>
                <!-- /.ba-testimonials-title -->
            </div>
            <!-- /.column small-12 large-5 -->
        </div>
        <!-- /.row -->
        <?php
        $terms = get_terms('testimonial_cnsm');
        $terms = array_reverse($terms);
        if ($terms && !is_wp_error($terms)) : ?>
            <div class="row ba-testimonials-item__titles" data-tabs id="testimonial-tabs">
                <?php $terms_arr = []; ?>
                <?php $i = 0 ?>
                <?php foreach ($terms as $term) : ?>
                    <?php ++$testimonial_titles_count; ?>
                    <div class="column small-6 large-4 tabs-title">
                        <a href="#panel1" class="ba-testimonial-cat-button"
                           aria-selected="true" data-testimonials-cat= <?php echo $term->slug; ?>>
                            <?php echo $term->name; ?>
                            <?php $terms_arr[$i] = $term->term_id; ?>
                            <?php $i++ ?>
                        </a>
                    </div>
                    <!-- /.column small-6 large-4 tabs-title -->
                <?php endforeach; ?>
            </div>
            <!-- /.row ba-testimonials-item__titles -->
        <?php endif; ?>

        <div class="ba-testimonials-content__wrapper wrapper">

            <?php
            $testimonialsArgs = array(
                'post_type' => 'ba_testimonial',
                'posts_per_page' => 4,
            );

            $testimonialsArgs['tax_query'] = array(
                array(
                    'taxonomy' => 'testimonial_cnsm',
                    'field' => 'term_id',
                    'terms' => $terms_arr[0]
                )
            );

            $testimonials = new WP_Query($testimonialsArgs); ?>
            <?php if ($testimonials->have_posts()): ?>
                <div class="row tabs-panel is-active" id="panel1">
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
                    <?php if ( $testimonials->max_num_pages > 1 ) : ?>
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

        </div>
        <!-- /.ba-testimonials-content__wrapper wrapper -->


    </section>
    <!-- /.ba-testimonials -->
</main>

<?php get_footer(); ?>
