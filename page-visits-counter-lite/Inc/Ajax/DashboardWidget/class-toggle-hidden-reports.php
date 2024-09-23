<?php
/**
 * AJAX toggle hidden reports - Callback - class
 *
 * This class handles the AJAX callback to toggle the visibility of selected page-reports in the "strcpv_hidden_page_reports" option.
 * It allows administrators to set page-reports as hidden or visible.
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

class Toggle_Hidden_Reports extends Options {



	/**
	 * Register AJAX Action
	 *
	 * Registers the WordPress AJAX action for toggling the visibility of page-reports.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		// Logged in users.
		add_action( 'wp_ajax_StrCPVisits_db_toggle_hidden_reports', [ $this, 'StrCPVisits_db_toggle_hidden_reports' ] );
	}




	/**
	 * AJAX Toggle Hidden Reports Callback
	 *
	 * This method is triggered as an AJAX callback to toggle the visibility of selected page-reports in the "strcpv_hidden_page_reports" option.
	 * It performs necessary security checks and updates, allowing administrators to set page-reports as hidden or visible.
	 *
	 * @since 1.0.0
	 */
	public function StrCPVisits_db_toggle_hidden_reports() {


		// Verify if data is submitted from the corresponding form using wp_nonce.
		if ( ! check_ajax_referer( 'StrCPVisits_settings', 'security' ) ) {
			return; // Abort.
		}


		// Prevent form data submission for non-admin users.
		if ( ! current_user_can( 'manage_options' ) ) {
			return; // Abort.
		}


		// ABORT IF DATA NOT SET.
		if ( ! isset( $_POST['data'] ) ) {
			wp_send_json_error( esc_html__( 'Error - data not set!', 'page-visits-counter-lite' ) ); // Abort.
		}

		// ABORT IF NOT AN ARRAY.
		if ( ! is_array( $_POST['data'] ) ) {
			wp_send_json_error( esc_html__( 'Error - not array!', 'page-visits-counter-lite' ) ); // Abort.
		}

		// CREATE NEW ARRAY and SANITIZE EACH VALUE.
		$page_names_arr = [];
		foreach ( $_POST['data'] as $page_name ) {
			/**
			 * PAGE NAME
			 *
			 * INFO: No need for hard core security because it is only going to be compared
			 *       with asoc. array keys retrieved from the DB option.
			 * VALIDATION: page_name can be anything.
			 *       There is no point to restricting the maximum number of characters as it is
			 *       only going to be compared with asoc. array keys retrieved from the DB option.
			 *
			 * @since 1.0.0
			 */
			$page_name = sanitize_text_field( $page_name );
			array_push( $page_names_arr, $page_name );
		}




		// CHECK LIST TYPE - HIDDEN OR VISIBLE.
		if ( ! isset( $_POST['list'] ) ) {
			wp_send_json_error( esc_html__( 'Error - data not set!', 'page-visits-counter-lite' ) ); // Abort.
		}


		// TOGGLE VISIBILITY OF PAGE-REPORTS.
		if ( $_POST['list'] === 'hidden' ) {

			// SET AS HIDDEN.
			$response = $this->set_as_hidden_reports( $page_names_arr );

		} elseif ( $_POST['list'] === 'visible' ) {

			// REMOVE FROM HIDDEN.
			$response = $this->remove_from_hidden_reports( $page_names_arr );

		} else {
			// ABORT.
			wp_send_json_error( esc_html__( 'Error - not expected value!', 'page-visits-counter-lite' ) );
		}




		// SEND AJAX RESPONSE.
		if ( $response === true ) {
			wp_send_json_success( esc_html__( 'Success!', 'page-visits-counter-lite' ) );
		} else {
			wp_send_json_error( esc_html__( 'There was an error!', 'page-visits-counter-lite' ) ); // Abort.
		}


		die();

	}

}
