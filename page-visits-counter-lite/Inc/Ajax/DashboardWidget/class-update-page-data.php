<?php
/**
 * AJAX update page data - Callback - class
 *
 * This class handles the AJAX callback to update page data in the "strcpv_visits_by_page" option.
 * It allows administrators to update the number of visits for a specific page.
 *
 * @package Strongetic - count page visits
 * @subpackage Inc\Ajax\Dashboard_Widget
 * @since 1.0.0
 */

namespace StrCPVisits_Inc\Ajax\Dashboard_Widget;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use StrCPVisits_Inc\DB\Options;

class Update_Page_Data extends Options {



	/**
	 * Register AJAX Action
	 *
	 * Registers the WordPress AJAX action for updating page data.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		// Logged in users.
		add_action( 'wp_ajax_StrCPVisits_update_page_data', [ $this, 'StrCPVisits_update_page_data' ] );
	}




	/**
	 * AJAX Update Page Data Callback
	 *
	 * This method is triggered as an AJAX callback to update page data in the "strcpv_visits_by_page" option.
	 * It performs necessary security checks and updates, allowing administrators to modify the number of visits for a specific page.
	 *
	 * @since 1.0.0
	 */
	public function StrCPVisits_update_page_data() {


		// Verify if data is submitted from the corresponding form using wp_nonce.
		if ( ! check_ajax_referer( 'StrCPVisits_settings', 'security' ) ) {
			return; // Abort.
		}


		// Prevent form data submission for non-admin users.
		if ( ! current_user_can( 'manage_options' ) ) {
			return; // Abort.
		}

		/**
		 * WP AJAX uses data as object and because of that it serializes data twice.
		 * For that reason we need to parse data once more, so we can access them.
		 */
		if ( isset( $_POST['settings_data'] ) ) {
			parse_str( $_POST['settings_data'], $settings_data );
		}


		// NEW NUMBER OF VISITS.
		if ( isset( $settings_data['StrCPVisits-dblist-page-visits-nr'] ) ) {

			// Check if it's numeric.
			if ( is_numeric( $settings_data['StrCPVisits-dblist-page-visits-nr'] ) ) {
				$new_number = sanitize_text_field( $settings_data['StrCPVisits-dblist-page-visits-nr'] );

				// Throw an error if the number is greater than 9 billion.
				if ( $new_number > 9000000000 ) {
					wp_send_json_error( esc_html__( 'Error - number too big!', 'page-visits-counter-lite' ) ); // Abort.
				}

			} else {
				wp_send_json_error( esc_html__( 'Error - not a number!', 'page-visits-counter-lite' ) ); // Abort.
			}

		} else {
			wp_send_json_error( esc_html__( 'Error - no data set!', 'page-visits-counter-lite' ) ); // Abort.
		}


		/**
		 * PAGE NAME - it should be set; otherwise, return an error message.
		 *
		 * INFO: No need for hardcore security as it is going to be compared with another data.
		 *
		 * @since 1.0.0.
		 */
		if ( isset( $settings_data['StrCPVisits-dblist-page-name'] ) ) {
			$page_name = $settings_data['StrCPVisits-dblist-page-name'];
		} else {
			wp_send_json_error( esc_html__( 'Page name missing!', 'page-visits-counter-lite' ) );
		}



		// UPDATE OPTION VALUE and SEND AJAX RESPONSE.
		$response = $this->update_page_visits_nr( $page_name, $new_number );

		if ( $response === true ) {
			wp_send_json_success( esc_html__( 'Changes saved!', 'page-visits-counter-lite' ) );
		} else {
			wp_send_json_error( esc_html__( 'No changes to save...', 'page-visits-counter-lite' ) ); // Abort.
		}


		die();

	}

}
