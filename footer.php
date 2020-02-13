<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the "off-canvas-wrap" div and all content after.
 *
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */
?>

			<footer class="ba-footer-wrapper">
                <div class="row ba-footer-content">
                    <div class="column small-12 medium-4 large-2 ba-footer-logo">
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
                    </div>
                    <!-- /.column small-12 medium-4 large-2 ba-footer-logo -->
                    <div class="column small-12 medium-4 large-8 ba-footer-nav">
                        <ul>
                            <li><a href="#">Политика конфиденциальности</a></li>
                            <li><a href="#">Отказ от ответственности</a></li>
                            <li><a href="#">Согласие с рассылкой</a></li>
                        </ul>
                    </div>
                    <!-- /.column small-12 medium-4 large-8 ba-footer-nav -->
                    <div class="column small-12 medium-4 large-2 ba-footer-phone">
                        <?php
                        $phone = get_field('header_topbar_phone');
                        $phoneLink = preg_replace('/\D+/', '', $phone);
                        ?>
                        <a class="ba-footer-phone-link" href="tel:<?php echo $phoneLink ?>">
                            <img src="wp-content/themes/swedishbitter/src/assets/images/phone.jpg" alt="Phone icon">
                            <?php echo $phone; ?>
                            <span class="ba-footer-phone-subtext">
                                Звонок бесплатный
                            </span>
                            <!-- /.ba-footer-phone-subtext -->
                        </a>
                    </div>
                    <!-- /.column small-12 medium-4 large-2 ba-footer-phone -->
                </div>
                <!-- /.row ba-footer-content -->
            </footer>
			<!-- /.ba-footer-wrapper -->

		</div><!-- Close off-canvas wrapper inner -->
	</div><!-- Close off-canvas wrapper -->
</div><!-- Close off-canvas content wrapper -->

<?php wp_footer(); ?>
</body>
</html>