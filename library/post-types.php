<?php
/**
 * Created by PhpStorm.
 * User: AlexCSS
 * Date: 04.04.2018
 * Time: 23:26
 */


/**
 * Registers a new post type
 * @uses $wp_post_types Inserts new post type object into the list
 *
 * @param string  Post type key, must not exceed 20 characters
 * @param array|string  See optional args description above.
 * @return object|WP_Error the registered post type object, or an error object
 */
function ba_testimonials_cpt() {

	$labels = array(
		'name'                => __( 'Testimonials', 'text-domain' ),
		'singular_name'       => __( 'Testimonial', 'text-domain' ),
		'add_new'             => _x( 'Add New Testimonial', 'text-domain', 'text-domain' ),
		'add_new_item'        => __( 'Add New Testimonial', 'text-domain' ),
		'edit_item'           => __( 'Edit Testimonial', 'text-domain' ),
		'new_item'            => __( 'New Testimonial', 'text-domain' ),
		'view_item'           => __( 'View Testimonial', 'text-domain' ),
		'search_items'        => __( 'Search Testimonials', 'text-domain' ),
		'not_found'           => __( 'No Testimonials found', 'text-domain' ),
		'not_found_in_trash'  => __( 'No Testimonials found in Trash', 'text-domain' ),
		'parent_item_colon'   => __( 'Parent Testimonial:', 'text-domain' ),
		'menu_name'           => __( 'Testimonials', 'text-domain' ),
	);

	$args = array(
		'labels'              => $labels,
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_admin_bar'   => true,
		'show_in_rest'        => true,
		'menu_position'       => null,
		'menu_icon'           => 'dashicons-money',
		'show_in_nav_menus'   => false,
		'publicly_queryable'  => true,
		'exclude_from_search' => false,
		'has_archive'         => false,
		'can_export'          => true,
		'capability_type'     => 'post',
		'rewrite'             => array('slug' => 'testimonials'),
		'supports'            => array(
			'title', 'editor', 'author', 'revisions'
		)
	);

	register_post_type( 'ba_testimonial', $args );

    register_taxonomy(
        'testimonial_cnsm',
        'ba_testimonial',
        array(
            'label' => __( 'Consumers' ),
            'labels'                => [
                'name'              => 'Consumers',
                'singular_name'     => 'Consumer',
                'search_items'      => 'Search Consumers',
                'all_items'         => 'All Consumers',
                'view_item '        => 'View Consumer',
                'parent_item'       => 'Parent Consumer',
                'parent_item_colon' => 'Parent Consumer:',
                'edit_item'         => 'Edit Consumer',
                'update_item'       => 'Update Consumer',
                'add_new_item'      => 'Add New Consumer',
                'new_item_name'     => 'New Consumer Name',
                'menu_name'         => 'Consumers',
            ],
            'rewrite' => array('slug' => 'consumer'),
            'hierarchical' => true,
            'show_admin_column' => true,
        )
    );

}

add_action( 'init', 'ba_testimonials_cpt' );
