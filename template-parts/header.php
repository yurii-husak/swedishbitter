<header class="ba-header">
	<div class="ba-header-bar">
		<div class="ba-header-logo">
            <a class="any-logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" title="<?php bloginfo( 'name' ); ?>">
                <?php if(has_custom_logo()) : ?>
                    <?php
                    $custom_logo_id = get_theme_mod( 'custom_logo' );
                    $image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
                    ?>
                    <img src="<?php echo $image[0] ?>" alt="<?php bloginfo( 'name' ); ?>" />
                <?php else : ?>
                    <?php bloginfo( 'name' ); ?>
                <?php endif ?>
            </a>
            <p class="ba-header-desc">
                <?php the_field('header_topbar_suptitle'); ?>
            </p>
            <!-- /.ba-header-desc -->
        </div>
		<!-- /.ba-header-logo -->
        <div class="ba-header-phone">
            <?php
                $phone = get_field('header_topbar_phone');
                $phoneLink = preg_replace('/\D+/', '', $phone);
            ?>
            <a class="ba-header-phone-link" href="tel:<?php echo $phoneLink ?>">
                <img src="wp-content/themes/swedishbitter/src/assets/images/phone.jpg" alt="Phone icon">
                <?php echo $phone; ?>
                <span class="ba-header-phone-subtext">
                    Звонок бесплатный
                </span>
                <!-- /.ba-header-phone-subtext -->
            </a>
        </div>
        <!-- /.ba-header-phone -->
	</div>

    <div class="ba-header-content">
        <img class="ba-header-content-bg" src="<?php if( get_field('header_background') ) { the_field( 'header_background' );} ?>" alt="Background">
        <div class="row ba-header-content__text">
            <div class="ba-header-content__img column small-12 medium-6">
                <img src="<?php if( get_field('header_image') ) { the_field( 'header_image' );} ?>" alt="Tea">
            </div>
            <!-- /.ba-header-content__img column small-6 -->
            <div class="ba-header-content__left-col column small-12 medium-6">
                <p class="ba-header-content__suptext">
                    <?php the_field('header_suptitle'); ?>
                </p>
                <!-- /.ba-header-content__suptext -->
                <h1 class="ba-header-content__title">
                    <?php the_field('header_title'); ?>
                </h1>
                <!-- /.ba-header-content__title -->
                <p class="ba-header-content__desc">
                    <?php the_field('header_description'); ?>
                </p>
                <!-- /.ba-header-content__desc -->
                <div class="ba-header-content__form">
                    <div class="ba-header-form__content">
                        <p class="ba-header-form__title">Узнайте подробнее о бальзаме</p>
                        <!-- /.ba-header-form__title -->
                        <form>
                            <div class="ba-header-form_inputs">
                                <input type="text" name="name" placeholder="Имя">
                                <input type="phone" name="phone" placeholder="Телефон">
                            </div>
                            <!-- /.ba-header-form_inputs -->
                            <button class="ba-header-form__button ba-button">
                                <span class="ba-button-text">
                                    Узнать
                                </span>
                                <!-- /.ba-button-text -->
                            </button>
                        </form>
                    </div>
                    <!-- /.ba-header-form__content -->
                </div>
                <!-- /.ba-header-content__form -->
            </div>
            <!-- /.ba-header-content__left-col column small-6 -->
            <a class="ba-header-mobile-button ba-button" href="#">Узнать больше</a>
            <!-- /.ba-header-mobile-button ba-button -->
        </div>
        <!-- /.row ba-header-content__text -->
    </div>
    <!-- /.ba-header-content -->

    <div class="ba-header-info">
        <?php if( have_rows('header_info') ): ?>
        <div class="row ba-header-info-container">
            <?php while ( have_rows('header_info') ) : the_row(); ?>

                <div class="column small-12 medium-6 large-3 ba-header-info__item">
                    <p class="ba-header-info-item__title">
                        <?php the_sub_field('title_start'); ?>
                        <span class="ba-header-info__title-end">
                            <?php the_sub_field('title_end'); ?>
                        </span>
                        <!-- /.ba-header-info__title-end -->
                    </p>
                    <!-- /.ba-header-info-item__title -->
                    <p class="ba-header-info-item__desc">
                        <?php the_sub_field('desc'); ?>
                    </p>
                    <!-- /.ba-header-info-item__desc -->
                </div>
                <!-- /.column small-12 medium-6 large-3 ba-header-info__item -->

            <?php endwhile; ?>
        </div>
        <!-- /.row ba-header-info-container -->
        <?php endif; ?>

    </div>
    <!-- /.ba-header-info -->

</header>