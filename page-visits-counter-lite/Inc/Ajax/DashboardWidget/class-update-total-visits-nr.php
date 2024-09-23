<?php
/**
 * AJAX update total visits nr - Callback - class
 *
 * This class handles the AJAX callback to update the total visits data in the "strcpv_total_visits" option.
 * It allows administrators to modify the total number of visits across all pages.
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

class Update_Total_Visits_Nr extends Options {



	/**
	 * Register AJAX Action
	 *
	 * Registers the WordPress AJAX action for updating the total visits number.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		// Logged in users.
		add_action( 'wp_ajax_StrCPVisits_update_total_visits_nr', [ $this, 'StrCPVisits_update_total_visits_nr' ] );
	}




	/**
	 * AJAX Update Total Visits Number Callback
	 *
	 * This method is triggered as an AJAX callback to update the total visits data in the "strcpv_total_visits" option.
	 * It performs necessary security checks and updates, allowing administrators to modify the total number of visits.
	 *
	 * @since 1.0.0
	 */
	public function StrCPVisits_update_total_visits_nr() {


		// Verify if data is submitted from the corresponding form using wp_nonce.
		if ( ! check_ajax_referer( 'StrCPVisits_settings', 'security' ) ) {
			return; // Abort.
		}


		// Prevent form data submission for non-admin users.
		if ( ! current_user_can( 'manage_options' ) ) {
			return; // Abort.
		}


		// NEW NUMBER OF VISTIS.
		if ( isset( $_POST['data'] ) ) {

			// Check if it's numeric.
			if ( is_numeric( $_POST['data'] ) ) {
				$new_number = sanitize_text_field( $_POST['data'] );

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




		// UPDATE OPTION VALUE and SEND AJAX RESPONSE.
		$response = $this->update_option_value( STRCPV_OPT_NAME['total_visits'], $new_number );

		if ( $response === true ) {
			wp_send_json_success( esc_html__( 'Changes saved!', 'page-visits-counter-lite' ) );
		} else {
			wp_send_json_error( esc_html__( 'No changes to save...', 'page-visits-counter-lite' ) ); // Abort.
		}


		die();

	}

}
