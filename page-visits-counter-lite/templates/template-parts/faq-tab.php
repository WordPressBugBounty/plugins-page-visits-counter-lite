<?php
/**
 * SETTINGS - FAQ TAB
 *
 * This file is responsible for displaying the FAQ tab content.
 *
 * The FAQ tab provides answers to frequently asked questions about the plugin's features and usage.
 *
 * @package Strongetic - count page visits
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>




<div class="StrCPVisits-light-tab-faq">
	<h2><?php esc_html_e( 'Frequently asked questions', 'page-visits-counter-lite' ); ?></h2>

	<div class="StrCPVisits_accordion_menu" data-stracc-close-other-options="true">


		<!-- FAQ Section 1 -->
		<section class="StrCPVisits_accordion_btn StrCPVisits_accordion_first"><h3><?php esc_html_e( 'Where I can find the page visits report as seen on the screenshot?', 'page-visits-counter-lite' ); ?></h3></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'Select the "Dashboard" option from the WordPress admin menu and there you should find a widget called "ALL PAGE VISITS."', 'page-visits-counter-lite' ); ?></p>
			<p><?php esc_html_e( 'If it is not expanded, just click on the title and you should be able to see it.', 'page-visits-counter-lite' ); ?></p>
			<br>
		</div>


		<!-- FAQ Section 2 -->
		<section class="StrCPVisits_accordion_btn"><h3><?php esc_html_e( 'Where I can find the plugin settings page?', 'page-visits-counter-lite' ); ?></h3></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'You will find it under the settings option in the WordPress admin menu.', 'page-visits-counter-lite' ); ?></p>
			<p><?php esc_html_e( 'It is called "Page Visits Counter Lite".', 'page-visits-counter-lite' ); ?></p>
			<br>
		</div>


		<!-- FAQ Section 3 -->
		<section class="StrCPVisits_accordion_btn"><h3><?php esc_html_e( 'Is it going to count the sum of all page visits?', 'page-visits-counter-lite' ); ?></h3></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'Yes, there are two TOTAL VISITS boxes.', 'page-visits-counter-lite' ); ?></p>
			<p><?php esc_html_e( 'The first one is going to sum all page visits without counting a page refresh/reload.', 'page-visits-counter-lite' ); ?></p>
			<p><?php esc_html_e( 'The second one will count the sum of all visits, including a page refresh/reload.', 'page-visits-counter-lite' ); ?></p>
			<br>
		</div>


		<!-- FAQ Section 4 -->
		<section class="StrCPVisits_accordion_btn"><h3><?php esc_html_e( 'Can I delete a page from the page visits report list?', 'page-visits-counter-lite' ); ?></h3></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'Yes, you can.', 'page-visits-counter-lite' ); ?></p>
			<br>
		</div>


		<!-- FAQ Section 5 -->
		<section class="StrCPVisits_accordion_btn"><h3><?php esc_html_e( 'Can I update the number of visits?', 'page-visits-counter-lite' ); ?></h3></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'Yes, you can update the number of TOTAL VISITS box and you can update the number of visits for each page.', 'page-visits-counter-lite' ); ?></p>
			<p><?php esc_html_e( 'The TOTAL PAGE VISITS box will recalculate the number of page visits automatically.', 'page-visits-counter-lite' ); ?></p>
			<br>
		</div>


		<!-- FAQ Section 6 -->
		<section class="StrCPVisits_accordion_btn"><h3><?php esc_html_e( 'Can I enable page refresh/reload counting for each page report?', 'page-visits-counter-lite' ); ?></h3></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'No, there is no such option.', 'page-visits-counter-lite' ); ?></p>
			<br>
		</div>


		<!-- FAQ Section 7 -->
		<section class="StrCPVisits_accordion_btn"><h3><?php esc_html_e( 'Can I set it up so it will preserve page visit records after the plugin is uninstalled?', 'page-visits-counter-lite' ); ?></h3></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'Yes, you will find that option (checkbox) in the plugin settings area under the settings tab.', 'page-visits-counter-lite' ); ?></p>
			<p><?php esc_html_e( 'Just check the option called "Do not delete plugin data on plugin delete/uninstall" and click on the Save button.', 'page-visits-counter-lite' ); ?></p>
			<br>
		</div>


		<!-- FAQ Section 8 -->
		<section class="StrCPVisits_accordion_btn"><h3><?php esc_html_e( 'Can I display a number of page visits on the website/page frontend?', 'page-visits-counter-lite' ); ?></h3></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'Yes, you can add and display one or both counters on the frontend of your website:', 'page-visits-counter-lite' ); ?></p>
			<ul>
				<li><?php esc_html_e( 'Page-Visits-Counter - does not count page refresh', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Website-Visits-Counter', 'page-visits-counter-lite' ); ?></li>
			</ul>
			<p><?php esc_html_e( 'You can find explanation in the plugin settings page under counter tab.', 'page-visits-counter-lite' ); ?></p>
			<br>
		</div>


		<!-- FAQ Section 9 -->
		<section class="StrCPVisits_accordion_btn"><h3><?php esc_html_e( 'Why frontend visits-counter displays N/A?', 'page-visits-counter-lite' ); ?></h3></section>
		<div class="StrCPVisits_accordion_panel">
			<ul>
				<li><?php esc_html_e( 'N/A stands for "Not Available"', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'N/A is a default counter status - counter does not start from zero - zero is set on reset', 'page-visits-counter-lite' ); ?></li>
			</ul>
			<p><?php esc_html_e( 'A not-counting page is going to display N/A.', 'page-visits-counter-lite' ); ?></p>
			<p><?php esc_html_e( 'Also, any other page is going to display N/A until it is visited by either: ', 'page-visits-counter-lite' ); ?></p>
			<ul>
				<li><?php esc_html_e( 'signed-out user', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'signed-in user with a counting user role', 'page-visits-counter-lite' ); ?></li>
			</ul>
			<p>( <?php esc_html_e( 'For more info about "Counting" and "Not Counting" read in the plugin documentation.', 'page-visits-counter-lite' ); ?> )</p>
			<br>
		</div>


		<!-- FAQ Section 10 -->
		<section class="StrCPVisits_accordion_btn"><h3><?php esc_html_e( 'Does it set cookies into the user browser?', 'page-visits-counter-lite' ); ?></h3></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'No, this plugin does not set browser cookie/s.', 'page-visits-counter-lite' ); ?></p>
			<br>
		</div>


		<!-- FAQ Section 11 -->
		<section class="StrCPVisits_accordion_btn"><h3><?php esc_html_e( 'I have visited my page but my visit is not recorded?', 'page-visits-counter-lite' ); ?></h3></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'You have to logout before visiting the page or login with one of the user roles that page will count.', 'page-visits-counter-lite' ); ?></p>
			<p>(<?php esc_html_e( 'Please read the plugin documentation under titles "NOT COUNTING" and "COUNTING".', 'page-visits-counter-lite' ); ?>)</p>
			<br>
		</div>


		<!-- FAQ Section 12 -->
		<section class="StrCPVisits_accordion_btn"><h3><?php esc_html_e( 'I have visited my page but only the TOTAL VISITS box has recorded the visit?', 'page-visits-counter-lite' ); ?></h3></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'You have probably refreshed the page and the TOTAL VISITS box is counting everything including a page refresh/reload.', 'page-visits-counter-lite' ); ?></p>
			<p><?php esc_html_e( 'Page visits are not counting page refresh/reload.', 'page-visits-counter-lite' ); ?></p>
			<p>(<?php esc_html_e( 'Please read the plugin documentation under titles "NOT COUNTING" and "COUNTING".', 'page-visits-counter-lite' ); ?>)<p>
			<br>
		</div>


	</div><!-- ACCORDION END -->

</div><!--LIGHT TAB END-->
