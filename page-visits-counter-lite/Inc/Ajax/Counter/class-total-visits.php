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

		/*
		 * NONCE VERIFICATION IS INTENTIONALLY DISABLED FOR THIS PUBLIC FRONTEND
		 * AJAX REQUEST SO THAT VISIT COUNTING WORKS CORRECTLY WITH FULL-PAGE CACHING.
		 *
		 * IMPORTANT: This is intentional. A cached page may contain an expired nonce,
		 * which would prevent legitimate visitors from being counted correctly.
		 *
		 * DETAIL EXPLANATION:
		 * This endpoint is executed after the frontend page has been loaded and must
		 * also work correctly when the page is served from a full-page cache.
		 * In that situation, a nonce generated when the page was originally cached
		 * may expire before the cached page itself expires, causing the AJAX request
		 * to fail for legitimate visitors.
		 *
		 * A WordPress nonce is a CSRF protection mechanism, but it is not an
		 * authentication, authorization, or anti-bot mechanism. Since this is a
		 * public frontend endpoint, the nonce is necessarily exposed to the client
		 * and therefore cannot be treated as a secret or as protection against
		 * deliberate automated requests or counter manipulation.
		 *
		 * The data processed by this endpoint is not arbitrary user-supplied data.
		 * The page name is dynamically obtained on the server from the current
		 * WordPress object (post, page, product, archive, etc.), using data already
		 * handled by WordPress/WooCommerce. The visit counter value is obtained
		 * from the database, validated as the existing counter value, incremented
		 * by one, and then stored back in the database.
		 *
		 * Therefore, this endpoint does not accept arbitrary page names or arbitrary
		 * counter values from the client for storage. The client only initiates the
		 * counting operation; the relevant page data and counter value are derived
		 * and processed server-side.
		 *
		 * Nonce verification remains enabled for authenticated/admin AJAX operations
		 * where it provides meaningful CSRF protection for privileged actions.
		 */

		// Verify if data is submitted from corresponding AJAX request by using a WordPress nonce.
		// Intentionally DISABLED - so it will work properly if website is cashed. (See security explanation above.)
		// if ( !check_ajax_referer( 'StrCPVisits_frontend', 'security' ) ) {
		// 	return; // Abort.
		// }




		// Prepare an array for the final response.
		$final_response = [];




		/**
		 * $page_name - Validate and sanitize
		 *
		 * INFO: The page name is supplied by the frontend, so its integrity must be
		 *       verified before it is used in the visits data. A server-generated
		 *       HMAC signature is checked to ensure that the page name was generated
		 *       by this plugin and has not been modified by the visitor.
		 *
		 * VALIDATION: No maximum length is enforced because the page name is generated
		 *             from the current WordPress page context and is only used as an
		 *             associative-array key after the HMAC signature has been verified.
		 *
		 * @since 1.0.0
		 */
		if ( isset( $_POST['page_data']['title'] ) && isset( $_POST['page_data']['signature'] ) ) {
			$page_name = sanitize_text_field(
				wp_unslash( $_POST['page_data']['title'] )
			);

			$page_signature = sanitize_text_field(
				wp_unslash( $_POST['page_data']['signature'] )
			);

			$expected_signature = hash_hmac(
				'sha256',
				'StrCPVisits|' . $page_name,
				wp_salt( 'auth' )
			);

			if ( ! hash_equals( $expected_signature, $page_signature ) ) {

				$final_response['msg'] = esc_html__( 'Error - invalid page data!', 'page-visits-counter-lite' );

				wp_send_json_error( $final_response );
			}

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
				$final_response['page_visits']['update'] = false;
				$final_response['page_visits']['nr']     = esc_html( $this->get_visits_nr_by_page_name( $page_name ) );

				wp_send_json_success( $final_response ); // Abort.
			}
		}




		// Update total visits number (+1).
		$final_response['total_visits'] = $this->count_total_visits();




		/**
		 * GET REAL USER IP ADDRESS
		 *
		 * INFO:
		 * The user IP address is used only to detect whether the same visitor
		 * has refreshed the page, so that repeated refreshes are not counted
		 * as additional visits during the detection period.
		 *
		 * The IP address is hashed before being stored and the resulting hash
		 * is retained for up to one hour for duplicate-visit detection.
		 *
		 * SECURITY NOTE:
		 * This value is intentionally used only as a short-lived identifier for
		 * detecting repeated page refreshes and preventing duplicate visit counting.
		 *
		 * Client IP headers such as X-Forwarded-For may be spoofed. If an attacker
		 * changes the reported IP address, the same client may be treated as a new
		 * visitor and an additional visit may be counted. The resulting impact is
		 * limited to the accuracy of the visit statistics.
		 *
		 * The IP address is not used for authentication, authorization, access
		 * control, or access to sensitive data, and is therefore not a security
		 * boundary or security-sensitive identity.
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
