<?php
/**
 * Settings API class
 *
 * This class manages the creation of admin menu pages and sub-pages using the WordPress Settings API.
 *
 * @package Strongetic - count page visits
 * @subpackage Inc\API
 * @since 1.0.0
 */

namespace StrCPVisits_Inc\API;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use StrCPVisits_Inc\Counter\frontend\Counter_Base;

class Settings_Api extends Counter_Base {



	/**
	 * REGISTER
	 *
	 * Registers the submenu page under the Settings menu.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		// Register submenu page under Settings.
		add_action( 'admin_menu', [ $this, 'strongetic_register_settings_option' ] );
	}




	/**
	 * REGISTER ADMIN PAGES AND SUB-PAGES
	 *
	 * DESC: This method register a sub-page under the admin Settings menu.
	 *
	 * @since 1.0.0
	 */
	public function strongetic_register_settings_option() {
		add_submenu_page( 'options-general.php', 'strongetic-page-visits-counter-lite', 'Page Visits Counter Lite', 'manage_options', 'strongetic-page-visits-counter-lite', [ $this, 'generate_subpage_visits_counter_light' ] );
	}




	/**
	 * INVOKE PAGE TEMPLATE FUNCTIONS
	 *
	 * DESC: This is required for passing all BASE CONTROLLER data
	 * INFO: Param. $this->get_all_data is retrieving all data from the base controller class.
	 *       Param type is asoc. array.
	 *
	 * @since 1.0.0
	 */

	public function generate_subpage_visits_counter_light() {
		strongetic_subpage_visits_counter_light( $this->get_all_data() );
	}

}
