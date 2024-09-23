<?php
/**
 * SETTINGS - INSTALLATION TAB
 *
 * This file is responsible for displaying the installation tab content.
 *
 * The installation tab provides instructions and guidance on how to properly set up the plugin after installation,
 * including necessary cache flushing and configuration for the plugin to function correctly.
 *
 * @package Strongetic - count page visits
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>




<div class="StrCPVisits-light-tab-installation">

	<article class="StrCPVisits-settings-page-text-box">
		<h2><?php esc_html_e( 'INSTALLATION', 'page-visits-counter-lite' ); ?> - <span class="StrCPVisits-warning"><?php esc_html_e( 'ATTENTION', 'page-visits-counter-lite' ); ?> !<span></h2>
		<p><?php esc_html_e( 'After the plugin is installed and activated, you need to flush the cache memory for all pages and delete minified javascript (JS) and styling (CSS) files.', 'page-visits-counter-lite' ); ?></p>
		<br>
		<p>( <?php esc_html_e( 'Minified JS and CSS files will be recreated automatically by their own plugin/software.', 'page-visits-counter-lite' ); ?>)</p>
		<br>
		<h3><?php esc_html_e( 'WHY?', 'page-visits-counter-lite' ); ?></h3>
		<p><?php esc_html_e( 'If you are using cashing method to improve your website loading speed then you have to clean the cache memory so the plugin code gets included in your website code.', 'page-visits-counter-lite' ); ?>
			<br><?php esc_html_e( 'Otherwise, it will not work.', 'page-visits-counter-lite' ); ?>
		</p>
		<br>
		<h3><?php esc_html_e( 'WHERE TO FIND?', 'page-visits-counter-lite' ); ?></h3>
		<p><?php esc_html_e( 'A WP website cashing options can be found in:', 'page-visits-counter-lite' ); ?></p>
		<ol>
			<li><?php esc_html_e( 'WP cashing and automatic optimization plugins', 'page-visits-counter-lite' ); ?></li>
			<li><?php esc_html_e( 'Server/Hosting ( Not every hosting has this option... )', 'page-visits-counter-lite' ); ?></li>
			<li><?php esc_html_e( 'Cloud', 'page-visits-counter-lite' ); ?></li>
		</ol>
		<p>( <?php esc_html_e( 'A minify JS and CSS option can be found in WP automatic optimization plugins.', 'page-visits-counter-lite' ); ?> )</p>
		<br>
		<p><?php esc_html_e( 'You should flush the cache memory from all three places in the presented order.', 'page-visits-counter-lite' ); ?><p>
		<p><?php esc_html_e( 'Usually, there are buttons for that:', 'page-visits-counter-lite' ); ?></p>
		<ul>
			<li><?php esc_html_e( 'A button can be named: Clear / Purge / Flush or a brume icon instead.', 'page-visits-counter-lite' ); ?></li>
			<li><?php esc_html_e( 'A button named "Delete min JS and CSS" or something like that.', 'page-visits-counter-lite' ); ?></li>
		</ul>
		<br>
		<h3><?php esc_html_e( 'WHAT AFTER?', 'page-visits-counter-lite' ); ?></h3>
		<p><?php esc_html_e( 'After that, log out from your website and visit the page that counts.', 'page-visits-counter-lite' ); ?></p>
		<p><?php esc_html_e( 'That visit should be recorded and you should see it in the plugin dashboard widget. To see it, you should log in again to your WP website backend and visit the menu option called Dashboard. Search for the widget like seen in the screenshot tab.', 'page-visits-counter-lite' ); ?></p>
	</article>

</div>
