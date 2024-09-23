<?php
/**
 * Total visits - class
 *
 * This class is responsible for counting visits on all pages.
 *
 * @package Strongetic - count page visits
 * @subpackage Inc\Counter\frontend
 * @since 1.0.0
 */

namespace StrCPVisits_Inc\Counter\frontend;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use StrCPVisits_Inc\Counter\frontend\Counter_Base;

class Total_Visits extends Counter_Base {



	/**
	 * Register Actions
	 *
	 * Registers WordPress actions for setting page data.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		add_action( 'wp_head', [ $this, 'set_page_data' ] );
	}




	/**
	 * Count all visits
	 *
	 * DESC: Check user type and ABORT if not VISITOR, SUBSCRIBER, CUSTOMER, AUTHOR, CONTRIBUTOR, AND PENDING_USER.
	 *       Create total visits option if doesn't exist.
	 *       Update all page loads number - including page refresh.
	 *
	 * @since 1.0.0
	 */
	public function set_page_data() {

		// ABORT IF ATTACHMENT PAGE.
		if ( is_attachment() ) {
			$abort = 'true';
		} else {
			$abort = 'false';
		}


		// GET PAGE NAME.
		$page_name = $this->get_page_name();
		// ABORT if there is no page name.
		if ( $page_name === false ) {
			$abort = 'true';
		}




		// Display JS abort variable in page header.
		?>
		<script type="text/javascript">
			var StrCPVisits_page_data = {
				'abort' : '<?php echo $abort; ?>',
				'title' : '<?php echo $page_name; ?>',
			};
		</script>
		<?php

	}




	/**
	 * Get page name
	 *
	 * DESC: Detect current page name and detect if it is an archive page or woocommerce archive page.
	 *       Is default homepage with posts or static homepage?
	 *       Is it a BLOG Posts page, 404 or CPT?
	 *
	 * INFO: Set corresponding page name and return it.
	 *
	 * @return  false or page name
	 * @since 1.0.0
	 */
	public function get_page_name() {
		global $post;

		// If there is no post - ABORT.
		if ( $post === NULL ) {
			if ( is_404() ) {
				// Sometimes, there is no post and there is 404 page displayed.
				return '404';  // Return page name 404.
			} else {
				return false; // Abort to prevent error trying to post a title.
			}
		}

		// Get page name.
		$page_name = $post->post_title;

		// If page name is missing - ABORT.
		if ( empty( $page_name ) || $page_name === '' ) {
				return false;
		}


		if ( is_archive() ) {
			$page_name = get_the_archive_title();

			// If WooCommerce plugin is active.
			if ( class_exists( 'WooCommerce' ) ) {

				// WooCommerce category.
				if ( is_product_category() || is_product_tag() ) {
					$page_name = 'Product: ' . $page_name;
				}
			}


		} elseif ( is_front_page() && is_home() ) {
				// Default homepage.
				$page_name = 'Default Homepage - latest posts';
		} elseif ( is_front_page() ) {
				// Static homepage.
				$page_name = 'Static Homepage';
		} elseif ( is_home() ) {
				// Blog page.
				$page_name = 'Blog Posts page';
		} elseif ( is_404() ) {
				// Sometime, there is post and there is 404 page displayed.
				$page_name = '404';
		}


		// CPT.
		$post_type = trim( get_post_type() );
		if ( ! empty( $post_type ) && $post_type != 'post' && $post_type != 'page' && $post_type != 'product' ) {
			$page_name = $post_type . ': ' . $page_name;
		}

		$page_name = sanitize_text_field( $page_name );
		return $page_name;
	}
}
