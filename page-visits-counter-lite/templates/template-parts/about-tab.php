<?php
/**
 * SETTINGS - ABOUT TAB
 *
 * This file is responsible for displaying the content of the "About" tab on the settings page.
 *
 * The tab provides information about the plugin's purpose and the author's message.
 *
 * @package Strongetic - count page visits
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>




<div class="StrCPVisits-light-tab-about">

	<article class="StrCPVisits-settings-page-text-box">
		<!-- Heading: About Plugin -->
		<h2><?php esc_html_e( 'ABOUT PLUGIN', 'page-visits-counter-lite' ); ?></h2>
		<p><?php esc_html_e( 'The purpose of this plugin is to supplement the report of actual visits to the pages of the website that cannot be recorded through advanced analytical tools. Advanced analytical tools require the consent of a visitor before the visit is recorded.', 'page-visits-counter-lite' ); ?></p>
		<br>
		<br>
		<!-- Heading: Word of the Author -->
		<h2><?php esc_html_e( 'WORD OF THE AUTHOR', 'page-visits-counter-lite' ); ?></h2>
		<p><?php esc_html_e( "My name is Denis Botic and I've created this plugin because I couldn't find such a solution among existing plugins. The main goal was to keep it extremely lite, count each page visit and report about it. Later I've figured that I am not interested in counting page reloads.", 'page-visits-counter-lite' ); ?></p>
		<a href="https://strongetic.com/about/team-members/denis-web-developer" target="_blank"><?php esc_html_e( 'Visit the author page', 'page-visits-counter-lite' ); ?></a>
	</article>

</div>
