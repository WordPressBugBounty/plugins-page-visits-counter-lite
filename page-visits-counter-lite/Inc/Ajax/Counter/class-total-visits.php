<?php
/**
 * AJAX count total visits - Callback
 *
 * This class handles the AJAX callback to increase the number of total independent visits by one.
 *
 * @package Strongetic - count page visits
 * @subpackage Inc\Ajax\Counter
 * @since 1.0.0
 */

namespace StrCPVisits_Inc\Ajax\Counter;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use StrCPVisits_Inc\DB\Options;

class Total_Visits extends Options {



	/**
	 * Register AJAX Actions
	 *
	 * Registers the WordPress AJAX actions for updating total visits.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		add_action( 'wp_ajax_nopriv_StrCPVisits_update_total_visits', [ $this, 'StrCPVisits_update_total_visits' ] ); // Not logged in users.
		add_action( 'wp_ajax_StrCPVisits_update_total_visits', [ $this, 'StrCPVisits_update_total_visits' ] ); // Logged in users.
	}




	/**
	 * AJAX Update Total Visits Callback
	 *
	 * This method is triggered as an AJAX callback to increase the number of total independent visits by one.
	 * It performs necessary security checks and updates, counting the total visits and page visits.
	 *
	 * @since 1.0.0
	 */
	public function StrCPVisits_update_total_visits() {


		// DISABLED - so it will work properly if website is cashed.
		// // Verify if data is submitted from corresponding ajax request. ( By using wp_nonce. )
		// if ( !check_ajax_referer( 'StrCPVisits_frontend', 'security' ) ) {
		// 	return; // Abort.
		// }




		// Prepare an array for the final response.
		$final_response = [];




		/**
		 * $page_name - sanitize
		 *
		 * INFO: No need for hard core security because it is only going to be compared
		 *       with asoc-array keys retrieved from the DB option.
		 *
		 * VALIDATION: page_name can be anything.
		 *       There is no point restricting the maximum number of characters as it is
		 *       only going to be compared with asoc-array keys retrieved from the DB option.
		 *
		 * @since 1.0.0
		 */
		if ( isset( $_POST['page_data']['title'] ) ) {
			$page_name = sanitize_text_field( $_POST['page_data']['title'] );
		} else {
			$final_response['msg'] = esc_html__( 'Error - title prop. missing!', 'page-visits-counter-lite' );
			wp_send_json_success( $final_response ); // Abort.
		}




		/**
		 * ABORT BY USER TYPE
		 *
		 * PROBLEM: User can have custom admin roles in use which visits should be excluded from our count.
		 * SOLUTION: Check by logged out state and for logged in roles that we are going to count.
		 * DESC: Count only if is a visitor or logged in role: subscriber, customer, author, contributor, and pending_user.
		 *       Do not count if is logged in with role: admin, editor, suspended, shop-manager or any other custom role.
		 *
		 * @since 1.0.0
		 */
		if ( is_user_logged_in() ) {

			$user_role = wp_get_current_user()->roles[0];
			if (
					$user_role !== 'subscriber' &&  // Allow subscriber.
					$user_role !== 'customer' &&    // Allow customer.
					$user_role !== 'author' &&      // Allow author.
					$user_role !== 'contributor' && // Allow contributor.
					$user_role !== 'pending_user'   // Allow pending_user.
			) {

				// SET RESPONSES:

				// Logged in with not counting user role.
				$final_response['msg'] = esc_html__( 'Logged in with a not counting user role!', 'page-visits-counter-lite' );
				// Not counting this page response.
				if ( isset( $_POST['page_data']['abort'] ) ) {
					if ( $_POST['page_data']['abort'] === 'true' ) {
						// Set response
						$final_response['msg_not_counting_the_page'] = esc_html__( 'Not counting this page!', 'page-visits-counter-lite' );
					}
				}
				// Get total visits response.
				$final_response['total_visits']['update'] = false;
				$final_response['total_visits']['nr']     = esc_html( get_option( STRCPV_OPT_NAME['total_visits'] ) );
				// Get total page visits response.
				$final_response['page_visits']       = false;
				$final_response['page_visits']['nr'] = esc_html( $this->get_visits_nr_by_page_name( $page_name ) );

				wp_send_json_success( $final_response ); // Abort.
			}
		}




		// Update total visits number (+1).
		$final_response['total_visits'] = $this->count_total_visits();




		/**
		 * GET REAL USER IP ADDRESS
		 *
		 * INFO: The purpose of getting the user ip address is only for checking if page is refreshed.
		 *       User IP address is going to be HASHED and cashed in memory for up to one hour.
		 *
		 * @since 1.0.0
		 */
		if ( ! empty( $_SERVER['HTTP_CLIENT_IP'] ) ) {
			// IP from share internet.
			$ip = $_SERVER['HTTP_CLIENT_IP'];
		} elseif ( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
			// IP pass from proxy.
			$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} else {
			$ip = $_SERVER['REMOTE_ADDR'];
		}


		/**
		 * HASH IP ADDRESS
		 *
		 * @since 1.1.0
		 */
		$ip = hash( 'sha256', $ip );




		/**
		 * PAGE DATA - it should be set - else abort
		 *
		 * @param asoc. array $_POST['page_data']
		 * @since 1.0.0
		 */
		if ( ! isset( $_POST['page_data'] ) ) {
			$final_response['msg'] = esc_html__( 'Error - Page data missing!', 'page-visits-counter-lite' );
			wp_send_json_success( $final_response ); // Abort.
		}




		// ONLY CHECK - "ABORT" KEY VALUE - ( If value = true -> abort ).
		if ( isset( $_POST['page_data']['abort'] ) ) {
			if ( $_POST['page_data']['abort'] === 'true' ) {
				// Delete transient so if previous website page visited or back button is clicked it will not count as refresh.
				delete_transient( 'strcpv_page_refreshed_data' );
				// Set response.
				$final_response['msg'] = esc_html__( 'Not counting this page!', 'page-visits-counter-lite' );
				// Respond.
				wp_send_json_success( $final_response ); // Abort.
			}
		} else {
			$final_response['msg'] = esc_html__( 'Error - abort prop. missing!", "page-visits-counter-lite' );
			wp_send_json_success( $final_response ); // Abort.
		}




		/**
		 * CHECK IF PAGE IS REFRESHED.
		 *
		 * DESC: If page is refreshed abort and send response with page total visits nr and message.
		 *
		 * @since 1.0.0
		 */
		// CHECK IF PAGE IS REFRESHED in parent class DB/Options.
		$page_refreshed = $this->is_page_refreshed( $ip, $page_name );
		// ABORT if page is refreshed.
		if ( $page_refreshed === true ) {
			// GET PAGE VISITS NR.
			$page_visits_nr = $this->get_visits_nr_by_page_name( $page_name );
			// Set final response.
			$final_response['page_visits_on_refresh'] = esc_html( $page_visits_nr );
			$final_response['msg']                    = esc_html__( 'Not counting - page refreshed!', 'page-visits-counter-lite' );
			// Respond.
			wp_send_json_success( $final_response ); // Abort.
		}




		// Increase page visit by one.
		$final_response['page_visits'] = $this->count_visits_per_page( $ip, $page_name );




		// Send final response for Total Visits and Page Visits.
		wp_send_json_success( $final_response );


		die();

	}
}
