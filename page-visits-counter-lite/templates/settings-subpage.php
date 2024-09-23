<?php
/**
 * DISPLAY SETTINGS PAGE
 *
 * This file is responsible for displaying the HTML content in the admin sub-page called "Page Visits Counter Light"
 * under admin menu setting option.
 *
 * @param  $base_controller_data  asoc.array
 * @package Strongetic - count page visits
 * @since 1.1.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}




function strongetic_subpage_visits_counter_light( $base_controler_data ) {

	/**
	 * Setting variable.
	 * Make key available to the template parts.
	 */
	set_query_var( 'StrCPVisits_base_controler_data', $base_controler_data );
	?>

	<!-- HTML CONTENT -->
	<div class="StrCPVisits_main-wrapper">
		<h1><?php esc_html_e( 'Page Visits Counter Lite - Settings', 'page-visits-counter-lite' ); ?></h1>
		<br>

		<!-- LIGHT TABS -->
		<div class="StrCPVisits-light-tabs" data-active-class="StrCPVisits-form-tab-active">

			<ul>
				<li class="StrCPVisits-form-tab-active"><?php esc_html_e( 'Settings', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Counter', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Documentation', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Screenshot', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Installation', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'Debugging', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'FAQ', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'About', 'page-visits-counter-lite' ); ?></li>
			</ul>

			<!-- SETTINGS TAB -->
			<div class="StrCPVisits-form-tab">
				<br>
				<?php
				// Include settings tab content.
				if ( file_exists( dirname( __FILE__ ) . '/template-parts/settings-tab.php' ) ) {
					require_once dirname( __FILE__ ) . '/template-parts/settings-tab.php';
				}
				?>
			</div>

			<!-- COUNTER TAB -->
			<div class="StrCPVisits-form-tab">
				<br>
				<?php
				// Include counter tab content.
				if ( file_exists( dirname( __FILE__ ) . '/template-parts/counter-tab.php' ) ) {
					require_once dirname( __FILE__ ) . '/template-parts/counter-tab.php';
				}
				?>
			</div>

			<!-- DOCUMENTATION  TAB -->
			<div class="StrCPVisits-form-tab">
				<br>
				<?php
				// Include documentation tab content.
				if ( file_exists( dirname( __FILE__ ) . '/template-parts/documentation-tab.php' ) ) {
					require_once dirname( __FILE__ ) . '/template-parts/documentation-tab.php';
				}
				?>
			</div>

			<!-- SCREENSHOT TAB -->
			<div class="StrCPVisits-form-tab">
				<br>
				<?php
				// Include screenshot tab content.
				if ( file_exists( dirname( __FILE__ ) . '/template-parts/screenshot-tab.php' ) ) {
					require_once dirname( __FILE__ ) . '/template-parts/screenshot-tab.php';
				}
				?>
			</div>

			<!-- INSTALLATION TAB -->
			<div class="StrCPVisits-form-tab">
				<br>
				<?php
				// Include installation tab content.
				if ( file_exists( dirname( __FILE__ ) . '/template-parts/installation-tab.php' ) ) {
					require_once dirname( __FILE__ ) . '/template-parts/installation-tab.php';
				}
				?>
			</div>

			<!-- DEBUGGING TAB -->
			<div class="StrCPVisits-form-tab">
				<br>
				<?php
				// Include debugging tab content.
				if ( file_exists( dirname( __FILE__ ) . '/template-parts/debugging-tab.php' ) ) {
					require_once dirname( __FILE__ ) . '/template-parts/debugging-tab.php';
				}
				?>
			</div>

			<!-- FAQ TAB -->
			<div class="StrCPVisits-form-tab">
				<br>
				<?php
				// Include faq tab content.
				if ( file_exists( dirname( __FILE__ ) . '/template-parts/faq-tab.php' ) ) {
					require_once dirname( __FILE__ ) . '/template-parts/faq-tab.php';
				}
				?>
			</div>

			<!-- ABOUT TAB -->
			<div class="StrCPVisits-form-tab">
				<br>
				<?php
				// Include about tab content.
				if ( file_exists( dirname( __FILE__ ) . '/template-parts/about-tab.php' ) ) {
					require_once dirname( __FILE__ ) . '/template-parts/about-tab.php';
				}
				?>
			</div>

		</div>

	</div> <!-- main wrapper end -->

	<!-- HTML CONTENT END -->
	<?php
	// ADD JS and AJAX scripts.
	wp_enqueue_script( 'StrCPVisits_js' );
	wp_enqueue_script( 'StrCPVisits_ajax' );
	// DO NOT WRITE ANYTHING BELOW THIS LINE.
}
