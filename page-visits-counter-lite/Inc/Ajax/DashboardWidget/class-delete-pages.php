<?php
/**
 * AJAX delete pages - Callback - class
 *
 * This class handles the AJAX callback to delete multiple pages from the "strcpv_visits_by_page" option along with their data.
 * It ensures the action is secure and only administrators can perform the deletion.
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

class Delete_Pages extends Options {



	/**
	 * Register AJAX Action
	 *
	 * Registers the WordPress AJAX action for deleting multiple pages along with their data.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		// Logged in users.
		add_action( 'wp_ajax_StrCPVisits_delete_pages', [ $this, 'StrCPVisits_delete_pages' ] );
	}




	/**
	 * AJAX Delete Pages Callback
	 *
	 * This method is triggered as an AJAX callback to delete multiple pages from the "strcpv_visits_by_page" option along with their data.
	 * It performs necessary security checks and updates, ensuring the deletion is secure and allowed for administrators.
	 *
	 * @since 1.0.0
	 */
	public function StrCPVisits_delete_pages() {


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

		// ABORT IF NOT AN ARRAY
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





		// DELETE PAGE-S FROM OPTION VALUE and SEND AJAX RESPONSE.
		$response = $this->delete_pages_from_option_value( $page_names_arr );

		if ( $response === true ) {
			wp_send_json_success( esc_html__( 'Pages deleted!', 'page-visits-counter-lite' ) );
		} else {
			wp_send_json_error( esc_html__( 'There was an error!', 'page-visits-counter-lite' ) ); // Abort.
		}


		die();

	}

}
