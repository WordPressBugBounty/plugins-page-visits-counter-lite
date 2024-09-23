<?php
/**
 * Database manage options - class
 *
 * Save settings and respond to AJAX requests.
 * This class handles various database operations for managing options.
 *
 * @package Strongetic - count page visits
 * @subpackage StrCPVisits_Inc\DB
 * @since 1.0.0
 */

namespace StrCPVisits_Inc\DB;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


class Options {


	/**
	 * UPDATE OPTION VALUE
	 *
	 * DESC: Update an option's value and respond with TRUE on success,
	 *       or FALSE on failure.
	 *
	 * @param  $option_name  string  Name of the option.
	 * @param  $value  string  New value to set for the option.
	 * @return  boolean
	 * @since 1.0.0
	 */

	public function update_option_value( $option_name, $value ) {
		$response = update_option( $option_name, $value );
		return $response; // TRUE || FALSE.
	}




	/**
	 * GET VISITS-BY-PAGE DATA
	 *
	 * DESC: Retrieve serialized data from the "visits_by_page" option and unserialize it.
	 *
	 * @return  array  ['page-name1' => visits_nr1, 'page-name2'=>visits_nr2, ... ] or an empty array.
	 * @since 1.0.0
	 */
	public function get_visits_by_page_data() {
		$data_ser = get_option( STRCPV_OPT_NAME['visits_by_page'] );
		if ( $data_ser === false ) {
			return [];
		} else {
			return maybe_unserialize( $data_ser );
		}
	}




	/**
	 * SET VISITS-BY-PAGE DATA
	 *
	 * DESC: Accept a data_array argument and serialize it before updating the "visits_by_page" option.
	 *
	 * @param  $data_arr  array  ['page-name1' => visits_nr1, 'page-name2'=>visits_nr2, ... ].
	 * @return boolean TRUE if successful, FALSE if not.
	 * @since 1.0.0
	 */
	public function set_visits_by_page_data( $data_arr ) {
		// Serialize data.
		$data_ser = maybe_serialize( $data_arr );
		// Update option.
		$response = $this->update_option_value( STRCPV_OPT_NAME['visits_by_page'], $data_ser );
		return $response; // TRUE || FALSE.
	}




	/**
	 * GET VISITS NUMBER BY PAGE NAME
	 *
	 * DESC: Retrieve the number of visits for a specific page from the "visits_by_page" option.
	 *
	 * @param  $page_name  string  Name of the page.
	 * @return int|null  Number of visits or NULL if the page name doesn't exist.
	 * @since 1.1.0
	 * Last update: 1.1.0  ( ADDED - if array key exist and if not - return null ).
	 */
	public function get_visits_nr_by_page_name( $page_name ) {
		// Retrieve serialized data from option visits_by_page and unserialize them.
		$page_visits_arr = $this->get_visits_by_page_data();
		if ( array_key_exists( $page_name, $page_visits_arr ) ) {
			return $page_visits_arr[ $page_name ];
		}
		// Page name doesn't exist as key in array.
		return null;
	}





	/**
	 * DELETE PAGE FROM OPTION VALUE
	 *
	 * DESC: Retrieve data from the "visits_by_page" option and remove a key with the specified page name.
	 *       Update the option value with the updated associative array.
	 *
	 * @param  $page_name  string  Name of the page to delete.
	 * @return boolean  TRUE if successful, FALSE if not.
	 * @since 1.0.0
	 */
	public function delete_page_from_option_value( $page_name ) {

		// get "visits_by_page" option data.
		$data_arr = $this->get_visits_by_page_data();

		// Check if the page with that name exists in the associative array.
		if ( ! array_key_exists( $page_name, $data_arr ) ) {
			return false;
		}

		// Delete the page name from the associative array.
		unset( $data_arr[ $page_name ] );

		// Remove pages from the hidden reports list.
		$this->remove_from_hidden_reports( [ $page_name ] );

		// Set the data.
		return $this->set_visits_by_page_data( $data_arr ); // TRUE || FALSE.
	}




	/**
	 * DELETE PAGES FROM OPTION VALUE
	 *
	 * DESC: Delete multiple pages by their names provided in the argument from the option "strcpv_visits_by_page".
	 *
	 * @param  $page_names_arr  Array of page names to delete  ['page-name1', 'page-name2'...].
	 * @return  boolean  TRUE if successful, FALSE if not.
	 * @since 1.0.0
	 */
	public function delete_pages_from_option_value( $page_names_arr ) {

		// Get "visits_by_page" option data.
		$data_arr = $this->get_visits_by_page_data();

		// delete pages.
		foreach ( $page_names_arr as $page_name ) {

			// Check if the page with that name exists in the associative array.
			if ( array_key_exists( $page_name, $data_arr ) ) {

				// Delete the page name from the associative array.
				unset( $data_arr[ $page_name ] );
			}
		}

		// Remove pages from the hidden reports list.
		$this->remove_from_hidden_reports( $page_names_arr ); // TRUE ||FALSE.

		// Set the data.
		return $this->set_visits_by_page_data( $data_arr ); // TRUE || FALSE.

	}




	/**
	 * UPDATE PAGE VISITS NUMBER
	 *
	 * DESC: Retrieve data from the "visits_by_page" option and find an array key with the page name.
	 *       Update the visits number and update the option value with the updated associative array.
	 *
	 * @param  $page_name  string  Name of the page to update.
	 * @param  $new_number  int  New visits number.
	 * @return boolean  TRUE if successful, FALSE if not.
	 * @since 1.0.0
	 */
	public function update_page_visits_nr( $page_name, $new_number ) {

		// Get "visits_by_page" option data.
		$data_arr = $this->get_visits_by_page_data();

		// Check if the page with that name exists in the associative array.
		if ( ! array_key_exists( $page_name, $data_arr ) ) {
			return false;
		}

		// Update the visits number.
		$data_arr[ $page_name ] = $new_number;

		// Set the data.
		return $this->set_visits_by_page_data( $data_arr ); // TRUE || FALSE.
	}




	/**
	 * RESET ALL PAGE VISITS
	 *
	 * DESC: Reset the visits number to zero for all pages.
	 *
	 * @return  boolean  TRUE if successful, FALSE if not.
	 * @since 1.0.0
	 */
	public function reset_all_page_visits() {

		// Get "visits_by_page" option data.
		$data_arr = $this->get_visits_by_page_data();

		// Reset each page value to zero.
		foreach ( $data_arr as $page_name => $visits_nr ) {
			$data_arr[ $page_name ] = 0;
		}

		// Set the data.
		return $this->set_visits_by_page_data( $data_arr ); // TRUE || FALSE.
	}




	/**
	 * RESET PAGE TYPE VISIT
	 *
	 * DESC Reset visits number to zero for pages by the names provided in the argument.
	 *
	 * @param  $page_names_arr  array  Array of page names to reset ['page-name1', 'page-name2'].
	 * @return  boolean  TRUE if successful, FALSE if not.
	 * @since 1.0.0
	 */
	public function reset_page_type_visits( $page_names_arr ) {

		// Get "visits_by_page" option data.
		$data_arr = $this->get_visits_by_page_data();

		// Reset visits to zero for each page in the array.
		foreach ( $page_names_arr as $page_name ) {
			// Set its value to zero.
			$data_arr[ $page_name ] = 0;
		}

		// Set the data.
		return $this->set_visits_by_page_data( $data_arr ); // TRUE || FALSE.
	}




	/**
	 * COUNT TOTAL VISITS
	 *
	 * DESC: Get the "total_visits" option value (number), increase it by one, and update it.
	 *       If the "total_visits" option doesn't exist, create it with a value of ONE visit.
	 *
	 * @return  array  Response with update status (TRUE/FALSE) and the new number of visits.
	 * @since 1.0.0
	 */
	public function count_total_visits() {

		$option_name = STRCPV_OPT_NAME['total_visits'];

		// Get the current total visits count.
		$all_page_visits  = get_option( $option_name );
		$type_of_response = gettype( $all_page_visits );

		// If the option doesn't exist, create it with a value of 1.
		if ( $all_page_visits == false && $type_of_response == 'BOOLEAN' ) {
			$new_visit = 1;
			$response  = add_option( $option_name, $new_visit );
		} else {
			// Increment the total visits count.
			$new_visit = (int) $all_page_visits + 1;
			// echo "TOTAL_VISITS: " . $new_visit;
			$response = update_option( $option_name, $new_visit );
		}
		// Respond.
		return [
			'update' => $response,  // TRUE || FALSE.
			'nr'     => $new_visit, // Number of visits.
		];
	}




	/**
	 * IS PAGE REFRESHED - transient option
	 *
	 * DESC: On page load, save the user's IP address and loaded page name into a transient with an expiration time of 1 hour.
	 *       On page refresh, check if there is a user's IP address hash with the current page name.
	 *       If it exists, return TRUE, which means the page is refreshed.
	 * INFO: First-time visitors will not have their IP address hash and current page name in the transient.
	 *
	 * @param  $ip_address  string  User's IP address hashed.
	 * @param  $current_page_name  string  Name of the current page.
	 * @return boolean  TRUE if the page is refreshed, FALSE otherwise.
	 * @since 1.0.0
	 */
	public function is_page_refreshed( $ip_address, $current_page_name ) {
		// Check if there is a transient.
		$page_refreshed_data_arr = get_transient( 'strcpv_page_refreshed_data' );
		if ( $page_refreshed_data_arr === false ) {

			// There is no transient - set the transient with hashed IP address and page name.
			$page_refreshed_data_arr = [ $ip_address => $current_page_name ];

		} else {

			// There is a transient - check if the hashed IP address is already saved in the transient.
			if ( ! array_key_exists( $ip_address, $page_refreshed_data_arr ) ) {
				// Hashed IP address - doesn't exist in the transient.
				$page_refreshed_data_arr = [ $ip_address => $current_page_name ];

			} else {

				// Hashed IP address - already exists in the transient.
				$last_page_name = $page_refreshed_data_arr[ $ip_address ];

				// Check if the page is refreshed.
				if ( $last_page_name === $current_page_name ) {
					// Page is refreshed.
					return true; // Abort.

				} else {

					// Another page is loaded - update the transient page name.
					$page_refreshed_data_arr[ $ip_address ] = $current_page_name;
				}
			}
		}
		// Set the transient.
		set_transient( 'strcpv_page_refreshed_data', $page_refreshed_data_arr, HOUR_IN_SECONDS );
	}




	/**
	 * COUNT VISITS PER PAGE
	 *
	 * DESC: Check the user type and ABORT if not a VISITOR, SUBSCRIBER, CUSTOMER, AUTHOR, CONTRIBUTOR, AND PENDING_USER.
	 *       Create the "visits_by_page" option if it doesn't exist.
	 *       Update the visit number by page name.
	 *
	 * @param  string  $ip  User's hashed IP address.
	 * @param  string  $page_name  Name of the current page.
	 * @return  array  Response with update status (TRUE/FALSE) and the new number of visits.
	 * @since 1.0.0
	 */
	public function count_visits_per_page( $ip, $page_name ) {

		$option_name             = STRCPV_OPT_NAME['visits_by_page'];
		$visits_by_page_data_arr = [];

		// Get counting (option) data.
		$visits_by_page_data_ser = get_option( $option_name );
		$type_of_response        = gettype( $visits_by_page_data_ser );

		// If the option doesn't exist.
		if ( $visits_by_page_data_ser == false && $type_of_response == 'BOOLEAN' ) {
			// The option doesn't exist.
			$visits_by_page_data_arr[ $page_name ] = 1;
			// Create the option with the given name and set the value to page-name = 1.
			$response = add_option( $option_name, $visits_by_page_data_arr );
			// Respond.
			return [
				'update' => $response, // TRUE || FALSE.
				'nr'     => 1,         // Number of visits for this page.
			];

		} else {
			/**
			 * OPTION EXIST - and holds at least an empty serialized array.
			 * ( We have some data. )
			 */
			$visits_by_page_data_arr = maybe_unserialize( $visits_by_page_data_ser );
			if ( isset( $visits_by_page_data_arr[ $page_name ] ) ) {
				// Value has a record of page data.
				$new_nr_of_visits                      = (int) $visits_by_page_data_arr[ $page_name ] + 1; // Increase visit by one.
				$visits_by_page_data_arr[ $page_name ] = $new_nr_of_visits;

			} else {
				// Value doesn't have records - probably deleted.
				$new_nr_of_visits                      = 1;
				$visits_by_page_data_arr[ $page_name ] = $new_nr_of_visits;
			}
		}
		// Update "visits_by_page" option.
		$visits_by_page_data_ser = maybe_serialize( $visits_by_page_data_arr );
		$response                = update_option( $option_name, $visits_by_page_data_ser );
		// Respond.
		return [
			'update' => $response,         // TRUE || FALSE.
			'nr'     => $new_nr_of_visits, // Number of visits for this page.
		];
	}




	// ======== HIDDEN & VISIBLE REPORTS =========




	/**
	 * GET HIDDEN-PAGE-REPORTS DATA
	 *
	 * DESC: Retrieve serialized data from the "hidden_page_reports" option and unserialize it.
	 *
	 * @return array  List of hidden page names ['page-name1', 'page-name2', ... ] or an empty array.
	 * @since 1.0.0
	 */
	public function get_hidden_page_reports_data() {
		$data_ser = get_option( STRCPV_OPT_NAME['hidden_page_reports'] );
		if ( $data_ser !== false ) {
			return maybe_unserialize( $data_ser );
		} else {
			return [];
		}
	}




	/**
	 * SET HIDDEN-PAGE-REPORTS DATA
	 *
	 * DESC: Accept a data_array argument and serialize it before updating the "hidden_page_reports" option.
	 *
	 * @param $data_arr  List of hidden page names ['page-name1', 'page-name2', ... ].
	 * @return boolean  TRUE if successful, FALSE if not.
	 * @since 1.0.0
	 */
	public function set_hidden_page_reports_data( $data_arr ) {
		// Serialize data.
		$data_ser = maybe_serialize( $data_arr );
		// Update the option
		$response = $this->update_option_value( STRCPV_OPT_NAME['hidden_page_reports'], $data_ser );
		return $response; // TRUE || FALSE.
	}





	/**
	 * SET AS HIDDEN REPORTS
	 *
	 * DESC: Set selected pages as hidden reports by adding them to the "hidden_page_reports" option.
	 *
	 * @param $page_names_arr  array  Array of page names to set as hidden reports ['page-name1', 'page-name2', ...].
	 * @return boolean
	 * @since 1.0.0
	 */
	public function set_as_hidden_reports( $page_names_arr ) {
		// Get hidden-page-reports data.
		$hidden_page_reports_arr = $this->get_hidden_page_reports_data();
		// Merge arrays.
		$merged_data_arr = array_merge( $hidden_page_reports_arr, $page_names_arr );
		// Update the option (it will create the option if it doesn't exist).
		return $this->set_hidden_page_reports_data( $merged_data_arr ); // TRUE || FALSE.
	}




	/**
	 * REMOVE FROM HIDDEN REPORTS
	 *
	 * DESC: Remove selected pages from the "hidden_page_reports" option.
	 *
	 * @param  $page_names_arr  array  Array of page names to remove from hidden reports ['page-name1', 'page-name2'...].
	 * @return  boolean  TRUE if successful, FALSE if not.
	 * @since 1.0.0
	 */
	public function remove_from_hidden_reports( $page_names_arr ) {
		// Get hidden-page-reports data.
		$hidden_page_reports_arr = $this->get_hidden_page_reports_data();
		// Remove selected page names from the retrieved data.
		$data_arr = array_diff( $hidden_page_reports_arr, $page_names_arr );
		// Update the option (it will create the option if it doesn't exist).
		return $this->set_hidden_page_reports_data( $data_arr ); // TRUE || FALSE.
	}

}
