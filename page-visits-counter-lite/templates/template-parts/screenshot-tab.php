<?php
/**
 * SETTINGS - SCREENSHOT TAB
 *
 * This file is responsible for displaying the screenshot tab content, including the image/s.
 *
 * The screenshot tab showcases relevant images related to the plugin's features and functionality.
 *
 * @package Strongetic - count page visits
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}




/**
 * Getting variable on template part:
 * Get key variable from parent template
 */
$base_controler_data = get_query_var( 'StrCPVisits_base_controler_data' );
?>


<!-- Display the screenshot image related to the plugin -->
<img src="<?php echo esc_url( $base_controler_data['plugin_url'] ); ?>assets/img/strongetic-page-visits-counter-lite-v1-0-0.jpg" alt="strongetic-page-visits-counter-light plugin screenshot">
