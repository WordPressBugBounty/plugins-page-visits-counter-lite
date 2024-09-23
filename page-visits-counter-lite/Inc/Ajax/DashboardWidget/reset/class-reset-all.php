<?php
/**
 * AJAX reset all visits nr - Callback - class
 *
 * This class handles the AJAX callback to reset all page visit numbers stored in the "strcpv_visits_by_page" option.
 * It ensures the action is secure, and only administrators can perform the reset.
 *
 * @package Strongetic - count page visits
 * @subpackage Inc\Ajax\Dashboard_Widget\reset
 * @since 1.0.0
 */

namespace StrCPVisits_Inc\Ajax\Dashboard_Widget\reset;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use StrCPVisits_Inc\DB\Options;

class Reset_All extends Options {



	/**
	 * Register AJAX Action
	 *
	 * Registers the WordPress AJAX action for resetting all page visit numbers.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		// Logged in users.
		add_action( 'wp_ajax_StrCPVisits_db_reset_all', [ $this, 'StrCPVisits_db_reset_all' ] );
	}




	/**
	 * AJAX Reset All Callback
	 *
	 * This method is triggered as an AJAX callback to reset all page visit numbers.
	 * It performs necessary checks and updates, ensuring the reset is secure and allowed for administrators.
	 *
	 * @return  ABORT or send JSON SUCCESS or ERROR message
	 * @since 1.0.0
	 */
	public function StrCPVisits_db_reset_all() {


		// Verify if data is submitted from the corresponding form using wp_nonce.
		if ( ! check_ajax_referer( 'StrCPVisits_settings', 'security' ) ) {
			return; // Abort.
		}

		// Prevent form data submission for non-admin users.
		if ( ! current_user_can( 'manage_options' ) ) {
			return; // Abort.
		}


		// ==== ABORT OR CONTINUE SECTION ====


		// Abort if data is not set.
		if ( isset( $_POST['data'] ) ) {

			// Abort if value not "RESET ALL".
			if ( $_POST['data'] !== 'RESET-ALL' ) {
				wp_send_json_error( esc_html__( 'Reset all error!', 'page-visits-counter-lite' ) ); // Abort.
			}

		} else {
			wp_send_json_error( esc_html__( 'Error - data not set!', 'page-visits-counter-lite' ) ); // Abort.
		}



		// ====  CONTINUE WITHOUT ANY DATA ====



		// Update the option value and send AJAX response.
		$response = $this->reset_all_page_visits();

		if ( $response === true ) {
			wp_send_json_success( esc_html__( 'Changes saved!', 'page-visits-counter-lite' ) );
		} else {
			wp_send_json_error( esc_html__( 'No changes to save...", "page-visits-counter-lite' ) );
		}


		die();

	}

}
