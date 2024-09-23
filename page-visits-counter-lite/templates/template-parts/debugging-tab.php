<?php
/**
 * SETTINGS - DEBUGGING TAB
 *
 * This file is responsible for displaying the debugging tab content, including images.
 *
 * The debugging tab provides guidance and information on troubleshooting issues with the plugin.
 * Users can follow step-by-step instructions to debug and resolve common problems related to
 * JavaScript and PHP caching that might affect the functioning of the page and website visits counters.
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

<article class="StrCPVisits-settings-page-text-box">
	<h2><?php esc_html_e( 'DEBUGGING', 'page-visits-counter-lite' ); ?></h2>
	<p><?php esc_html_e( 'If you have followed all installation instructions and there are still issues with getting the plugin to work, you can try to debug it.', 'page-visits-counter-lite' ); ?></p>
	<p><?php esc_html_e( 'Follow the steps!', 'page-visits-counter-lite' ); ?></p>
	<br>

	<h3><?php esc_html_e( 'OPEN DEBUGGER TOOLS', 'page-visits-counter-lite' ); ?></h3>
	<ul>
		<li><?php esc_html_e( 'Use Google Chrome or Mozilla Firefox as a web browser.', 'page-visits-counter-lite' ); ?></li>
		<li><?php esc_html_e( 'Visit the home page of your website ( Either logged in or logged out. )', 'page-visits-counter-lite' ); ?></li>
		<li><?php esc_html_e( 'Press the F12 keyboard button to open the browser Dev Tools. ( Or google for the tutorials on how to open Dev Tools in Chrome or Mozilla. )', 'page-visits-counter-lite' ); ?></li>
		<li><?php esc_html_e( 'In the Dev Tools tab at the top, you will see menu options like in the image below this text. Click on the option called Console. ', 'page-visits-counter-lite' ); ?></li>
	</ul>
	<img src="<?php echo esc_url( $base_controler_data['plugin_url'] ); ?>assets/img/strongetic-page-visits-counter-lite-debug1-v-1-0-0.jpg" alt="strongetic-page-visits-counter-light plugin debugging1">
	<br>

	<h3><?php esc_html_e( 'DEBUG ISSUES', 'page-visits-counter-lite' ); ?></h3>
	<h4><?php esc_html_e( 'NO TEXT', 'page-visits-counter-lite' ); ?></h4>
	<p><?php esc_html_e( 'If you do not see the text as on the image in your console tab, even if you scroll it up or down, it means that your Javascript files are still cashed.', 'page-visits-counter-lite' ); ?></p>
	<h5><?php esc_html_e( 'FIX', 'page-visits-counter-lite' ); ?></h5>
	<ul>
		<li><?php esc_html_e( 'You should flush the cache and delete minified JS and CSS files from your WP cache and automatic optimization plugins.', 'page-visits-counter-lite' ); ?></li>
		<li><?php esc_html_e( 'Check if there is cache turned on with your hosting or server and flush it.', 'page-visits-counter-lite' ); ?></li>
		<li><?php esc_html_e( 'If you are using the Cloud technology, flush cache memory and delete minified JS and CSS files.', 'page-visits-counter-lite' ); ?></li>
	</ul>
	<br>

	<h4><?php esc_html_e( 'PHP STATUS: FALSE', 'page-visits-counter-lite' ); ?></h4>
	<ul>
		<li><?php esc_html_e( 'If you see the text, then both sentences JS status and PHP status should have the status OK. (As on the image below.)', 'page-visits-counter-lite' ); ?></li>
		<li><?php esc_html_e( 'If JS status is OK and PHP status is FALSE, it means that your PHP code is still cashed. It is probably cached on your hosting/server.', 'page-visits-counter-lite' ); ?></li>
	</ul>
	<h5><?php esc_html_e( 'FIX', 'page-visits-counter-lite' ); ?></h5>
	<p><?php esc_html_e( "You should log in to your hosting account and flush the cache memory. If you don't know how to do it on your own, you can google for instructions on how to do it or contact the hosting support and ask them to do it for you.", 'page-visits-counter-lite' ); ?></p>

	<img src="<?php echo esc_url( $base_controler_data['plugin_url'] ); ?>assets/img/strongetic-page-visits-counter-lite-debug1-v-1-0-0.jpg" alt="strongetic-page-visits-counter-light plugin debugging1">
	<small>( <?php esc_html_e( 'On the image above you can find out how many visits a page had - without counting page reload/refresh.', 'page-visits-counter-lite' ); ?> )</small>
	<br><br>
</article>

<article class="StrCPVisits-settings-page-text-box">
	<h3><?php esc_html_e( 'INFO MESSAGES', 'page-visits-counter-lite' ); ?></h3>
	<p><?php esc_html_e( 'After you get JS and PHP status messages to show OK, you are done.', 'page-visits-counter-lite' ); ?>
		<br><?php esc_html_e( 'The plugin should work properly.', 'page-visits-counter-lite' ); ?>
	</p>
	<p><?php esc_html_e( 'As you can see, there are other messages in the console tab that can come in handy while browsing the website frontend pages.', 'page-visits-counter-lite' ); ?></p>
	<p><?php esc_html_e( 'If you wish to quickly find out how many visits a current page has collected, you can just open the Dev Tool and select the console tab. There you should see the text like on one of the images below this text.', 'page-visits-counter-lite' ); ?></p>
	<br>
	<p><?php esc_html_e( 'You can find out the official page name that later you can search for in the admin dashboard to update.', 'page-visits-counter-lite' ); ?></p>
	<p><?php esc_html_e( 'If you are visiting the page or a page type that is not going to be counted, you will be notified about that.', 'page-visits-counter-lite' ); ?></p>
	<img src="<?php echo esc_url( $base_controler_data['plugin_url'] ); ?>assets/img/strongetic-page-visits-counter-lite-debug2-v-1-0-0.jpg" alt="strongetic-page-visits-counter-light plugin debugging2">
</article>

<article class="StrCPVisits-settings-page-text-box">
	<p><?php esc_html_e( 'If you refresh the page, you will get the page visits ( unchanged ) number and the message.', 'page-visits-counter-lite' ); ?></p>
	<p><?php esc_html_e( 'The message is going to tell you that the page is refreshed, and it is not going to count as a visit.', 'page-visits-counter-lite' ); ?></p>
	<img src="<?php echo esc_url( $base_controler_data['plugin_url'] ); ?>assets/img/strongetic-page-visits-counter-lite-debug3-v-1-0-0.jpg" alt="strongetic-page-visits-counter-light plugin debugging3">
</article>

<article class="StrCPVisits-settings-page-text-box">
	<p><?php esc_html_e( 'If you are logged in with a user role that is not going to count a page visit, you will be notified about that as well.', 'page-visits-counter-lite' ); ?></p>
	<img src="<?php echo esc_url( $base_controler_data['plugin_url'] ); ?>assets/img/strongetic-page-visits-counter-lite-debug4-v-1-0-0.jpg" alt="strongetic-page-visits-counter-light plugin debugging4">
</article>
