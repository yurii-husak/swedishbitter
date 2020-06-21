<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "container" div.
 *
 * @package FoundationPress
 * @since FoundationPress 1.0.0
 */

?>
<!doctype html>
<html class="no-js" <?php language_attributes(); ?> >
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>

    <div class="loader_wrapper">
        <div class="loader">Loading...</div>
    </div>
    <!-- /.loader_wrapper -->


	<?php get_template_part( 'template-parts/mobile-off-canvas' ); ?>


	<?php get_template_part( 'template-parts/header' ); ?>