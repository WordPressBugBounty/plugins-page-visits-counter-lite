<?php
/**
 * AJAX delete page - Callback - class
 *
 * This class handles the AJAX callback to delete a page from the "strcpv_visits_by_page" option along with its data.
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

class Delete_Page extends Options {



	/**
	 * Register AJAX Action
	 *
	 * Registers the WordPress AJAX action for deleting a page along with its data.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		// Logged in users.
		add_action( 'wp_ajax_StrCPVisits_delete_page', [ $this, 'StrCPVisits_delete_page' ] );
	}




	/**
	 * AJAX Delete Page Callback
	 *
	 * This method is triggered as an AJAX callback to delete a page from the "strcpv_visits_by_page" option along with its data.
	 * It performs necessary security checks and updates, ensuring the deletion is secure and allowed for administrators.
	 *
	 * @since 1.0.0
	 */
	public function StrCPVisits_delete_page() {


		// Verify if data is submitted from the corresponding form using wp_nonce.
		if ( ! check_ajax_referer( 'StrCPVisits_settings', 'security' ) ) {
			return; // Abort.
		}



		// Prevent form data submission for non-admin users.
		if ( ! current_user_can( 'manage_options' ) ) {
			return; // Abort.
		}



		/**
		 * PAGE NAME - it should be set - else return an error message
		 *
		 * INFO: No need for hard core security because it is only going to be compared
		 *       with asoc. array keys retrieved from the DB option.
		 * VALIDATION: page_name can be anything.
		 *       There is no point to restricting the maximum number of characters as it is
		 *       only going to be compared with asoc. array keys retrieved from the DB option.
		 *
		 * @since 1.0.0
		 */
		if ( isset( $_POST['page_name'] ) ) {
			$page_name = sanitize_text_field( $_POST['page_name'] );
		} else {
			wp_send_json_error( esc_html__( 'Error - Page name missing!', 'page-visits-counter-lite' ) ); // Abort.
		}




		// DELETE PAGE FROM OPTION VALUE and SEND AJAX RESPONSE
		$response = $this->delete_page_from_option_value( $page_name );

		if ( $response === true ) {
			wp_send_json_success( esc_html__( 'Page deleted!', 'page-visits-counter-lite' ) );
		} else {
			wp_send_json_error( esc_html__( 'There was an error!', 'page-visits-counter-lite' ) ); // Abort.
		}


		die();

	}

}
