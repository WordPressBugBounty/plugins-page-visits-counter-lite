<?php
/**
 * AJAX reset page type - Callback - class
 *
 * This class handles the AJAX callback to reset page visit numbers by specific page type names.
 * It ensures the action is secure and only administrators can perform the reset.
 *
 * @package Strongetic - count page visits
 * @subpackage Inc\Ajax\DashboradWidget\reset
 * @since 1.0.0
 */

namespace StrCPVisits_Inc\Ajax\Dashboard_Widget\reset;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use StrCPVisits_Inc\DB\Options;

class Reset_Page_Type extends Options {



	/**
	 * Register AJAX Action
	 *
	 * Registers the WordPress AJAX action for resetting page visit numbers by page type names.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		// Logged in users.
		add_action( 'wp_ajax_StrCPVisits_db_reset_page_type', [ $this, 'StrCPVisits_db_reset_page_type' ] );
	}




	/**
	 * AJAX Reset Page Type Callback
	 *
	 * This method is triggered as an AJAX callback to reset page visit numbers by page type names.
	 * It performs necessary security checks and updates, ensuring the reset is secure and allowed for administrators.
	 *
	 * @since 1.0.0
	 */
	public function StrCPVisits_db_reset_page_type() {


		// Check if data are submitted from corresponding form by using wp_nonce.
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
			 *       There is no point to restricting the maximum numberr of characters as it is
			 *       only going to be compared with asoc. array keys retrieved from the DB option.
			 *
			 * @since 1.0.0
			 */
			$page_name = sanitize_text_field( $page_name );
			array_push( $page_names_arr, $page_name );
		}




		// UPDATE OPTION VALUE and SEND AJAX RESPONSE.
		$response = $this->reset_page_type_visits( $page_names_arr );

		if ( $response === true ) {
			wp_send_json_success( esc_html__( 'Changes saved!', 'page-visits-counter-lite' ) );
		} else {
			wp_send_json_error( esc_html__( 'No changes to save...', 'page-visits-counter-lite' ) );
		}


		die();

	}

}
