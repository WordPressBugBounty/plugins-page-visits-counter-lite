<?php
/**
 * SETTINGS - DOCUMENTATION TAB
 *
 * DESC: Displays documentation tab html content.
 *
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>




<div class="StrCPVisits-light-tab-documentation">
	<!-- EXPLANATION -->
	<p><strong><?php esc_html_e( 'This plugin is going to display the number of visits for each page in the:', 'page-visits-counter-lite' ); ?></strong></p>
	<ul>
		<li><?php esc_html_e( 'Admin dashboard', 'page-visits-counter-lite' ); ?></li>
		<li><?php esc_html_e( 'Browser developer-tools/console tab - ( HIDDEN COUNTERS )', 'page-visits-counter-lite' ); ?></li>
		<li><?php esc_html_e( 'Website/page frontend - ( OPTIONAL )', 'page-visits-counter-lite' ); ?></li>
	</ul>
	<br>
	<!-- ACCORDION MENU -->
	<div class="StrCPVisits_accordion_menu" data-stracc-close-other-options="true">


		<section class="StrCPVisits_accordion_btn StrCPVisits_accordion_first"><h2><?php esc_html_e( 'WHY LITE?', 'page-visits-counter-lite' ); ?></h2></section>
		<div class="StrCPVisits_accordion_panel">
			<ul>
				<li><?php esc_html_e( 'It is a small size software and it does not require much memory.', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'It is not going to crowd your database with tons of metric data and "eat" the database memory.', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( "It is not going to collect users' personal data - GDPR compliant.", 'page-visits-counter-lite' ); ?></li>
			</ul>
			<br>
		</div>


		<section class="StrCPVisits_accordion_btn"><h2><?php esc_html_e( 'NOT COUNTING', 'page-visits-counter-lite' ); ?></h2></section>
		<div class="StrCPVisits_accordion_panel">
			<ul>
				<li><?php esc_html_e( 'Logged in user with a role:', 'page-visits-counter-lite' ); ?></li>
				<ul>
					<li><?php esc_html_e( 'admin', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'editor', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'shop manager', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'custom role', 'page-visits-counter-lite' ); ?></li>
				</ul>
				<li><?php esc_html_e( 'Page refresh/reload   ( But "Total Visits" load&reload sum will count it. )', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Submitting comments  ( But "Total Visits" load&reload sum will count it. )', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Visiting direct media link in the uploads folder', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Media - attachment page', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Search results page', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Update cart ( But "Total Visits" load&reload sum will count it. )', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Checkout/order received  ( But "Total Visits" load&reload sum will count it. )', 'page-visits-counter-lite' ); ?></li>
			</ul>
			<br>
		</div>


		<section class="StrCPVisits_accordion_btn"><h2><?php esc_html_e( 'COUNTING', 'page-visits-counter-lite' ); ?></h2></section>
		<div class="StrCPVisits_accordion_panel">
			<ul>
				<li><?php esc_html_e( 'A visitor  ( Not logged in )', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Logged in user with a role:', 'page-visits-counter-lite' ); ?></li>
				<ul>
					<li><?php esc_html_e( 'Subscriber', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'Author', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'Contributor', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'Pending_user', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'Customer', 'page-visits-counter-lite' ); ?></li>
				</ul>
				<li><?php esc_html_e( 'Pages and posts:', 'page-visits-counter-lite' ); ?></li>
				<ul>
					<li><?php esc_html_e( 'Pages and subpages', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'Default and Static Homepage', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'Blog Posts page', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'Single post', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'Default category and tag - archive pages', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( '404', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'CPT', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'Taxonomy archive pages', 'page-visits-counter-lite' ); ?></li>
					<li><?php esc_html_e( 'WooCommerce', 'page-visits-counter-lite' ); ?></li>
					<ul>
						<li><?php esc_html_e( 'SHOP - archive page', 'page-visits-counter-lite' ); ?></li>
						<li><?php esc_html_e( 'Single product', 'page-visits-counter-lite' ); ?></li>
						<li><?php esc_html_e( 'Default category and tag - archive pages', 'page-visits-counter-lite' ); ?></li>
						<li><?php esc_html_e( 'Attribute archive pages', 'page-visits-counter-lite' ); ?></li>
						<li><?php esc_html_e( 'Cart   ( Check Update cart is not counting... )', 'page-visits-counter-lite' ); ?></li>
						<li><?php esc_html_e( 'Checkout  ( Check "Checkout/order received" is not counting...)', 'page-visits-counter-lite' ); ?></li>
					</ul>
				</ul>
			</ul>
			<br>
		</div>


		<section class="StrCPVisits_accordion_btn"><h2><?php esc_html_e( 'ON CHANGE NAME of Page, Post, Product...', 'page-visits-counter-lite' ); ?></h2></section>
		<div class="StrCPVisits_accordion_panel">
			<p>
				<?php esc_html_e( 'If you change the name of an existing page, post, product, archive, etc. then the old page will remain intact in the page visits report.', 'page-visits-counter-lite' ); ?>
				<br>
				<?php esc_html_e( 'After a new visit, the new page name will appear in the page visits report and the counter will start counting visits for the new page from the start.', 'page-visits-counter-lite' ); ?>
			</p>
			<br>
		</div>


		<section class="StrCPVisits_accordion_btn"><h2><?php esc_html_e( 'ON DELETE of Page, Post, Product...', 'page-visits-counter-lite' ); ?></h2></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'If you delete an existing page, post, product, archive, etc. then the page will remain intact in the page visits report including its number of visits.', 'page-visits-counter-lite' ); ?></p>
			<br>
		</div>


		<section class="StrCPVisits_accordion_btn"><h2><?php esc_html_e( 'VISITS-COUNTER ON THE WEBSITE FRONTEND', 'page-visits-counter-lite' ); ?></h2></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'There are two counter types:', 'page-visits-counter-lite' ); ?></p>
			<ul>
				<li><?php esc_html_e( 'Website counter', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Page counter ( Not counting page refresh. )', 'page-visits-counter-lite' ); ?></li>
			</ul>
			<p><?php esc_html_e( 'You can add one or both counter types on your website or page frontend.', 'page-visits-counter-lite' ); ?></p>
			<p><?php esc_html_e( 'Instructions on how to add counter/s to your website are in the plugin settings page under the tab named counter.', 'page-visits-counter-lite' ); ?></p>
			<br>
		</div>


		<section class="StrCPVisits_accordion_btn"><h2><?php esc_html_e( 'FEATURES', 'page-visits-counter-lite' ); ?></h2></section>
		<div class="StrCPVisits_accordion_panel">
			<ul>
				<li><?php esc_html_e( 'Lite software', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'WooCommerce compatible', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'GDPR Compliant', 'page-visits-counter-lite' ); ?></li>
			</ul>
			<br>
		</div>


		<section class="StrCPVisits_accordion_btn"><h2><?php esc_html_e( 'REQUIREMENTS', 'page-visits-counter-lite' ); ?></h2></section>
		<div class="StrCPVisits_accordion_panel">
			<ul>
				<li>WordPress 5.0 +</li>
				<li>PHP 5.6.40 +</li>
				<li>WooCommerce 4.9.2 +</li>
			</ul>
		</div>


		<section class="StrCPVisits_accordion_btn"><h2><?php esc_html_e( 'FOR DEVELOPER', 'page-visits-counter-lite' ); ?></h2></section>
		<div class="StrCPVisits_accordion_panel">
			<p><?php esc_html_e( 'Admin dashboard widget has four wp-hooks:', 'page-visits-counter-lite' ); ?></p>
			<ul>
				<li>add_action( 'StrCPVisits_db_widget_wrapper_start' );</li>
				<li>add_action( 'StrCPVisits_db_widget_after_total_visits_boxes' );</li>
				<li>add_action( 'StrCPVisits_db_widget_wrapper_end_before_js' );</li>
				<li>add_action( 'StrCPVisits_db_widget_wrapper_end_after_js' );</li>
			</ul>
		</div>



	</div><!-- ACCORDION END -->

</div><!--LIGHT TAB END-->
