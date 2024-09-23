<?php
/**
 * AJAX save settings - Callback - class
 *
 * This class handles AJAX requests to save settings and responds with success/failure messages.
 *
 * @package Strongetic - count page visits
 * @subpackage Inc\Ajax\SettingsPage
 * @since 1.0.0
 */

namespace StrCPVisits_Inc\Ajax\SettingsPage;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use StrCPVisits_Inc\DB\Options;

class Save_Settings extends Options {



	/**
	 * Register AJAX Action
	 *
	 * Registers the AJAX action to save settings.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		// Logged in users.
		add_action( 'wp_ajax_StrCPVisits_save_settings', [ $this, 'StrCPVisits_save_settings' ] );
	}




	/**
	 * Save settings
	 *
	 * Callback function to save settings and send AJAX response.
	 *
	 * @return  array  response  or  abort
	 * @since 1.0.0
	 */
	public function StrCPVisits_save_settings() {


		// Check if data are submitted from corresponding form by using wp_nonce.
		if ( ! check_ajax_referer( 'StrCPVisits_settings', 'security' ) ) {
			return; // Abort.
		}


		// Prevent form data submission for non-admin users.
		if ( ! current_user_can( 'manage_options' ) ) {
			return; // Abort.
		}


		/**
		 * WP AJAX uses data as an object and because of that serializes data twice.
		 * For that reason, we need to parse data once more, so we can access them.
		 */
		if ( isset( $_POST['settings_data'] ) ) {
			parse_str( $_POST['settings_data'], $settings_data );
		}




		// CHECKBOX - Do not delete plugin data on plugin delete/uninstall.
		if ( isset( $settings_data['StrCPVisits-chk-plugin-data'] ) && $settings_data['StrCPVisits-chk-plugin-data'] === 'on' ) {
			// Option turned ON - Do not delete plugin data.
			$value = 'NO';

		} else {
			// Option turned OFF - Delete plugin data.
			$value = 'YES';
		}



		// Prepare an array to hold response data.
		$response_data = [];




		/**
		 * Update DELETE-OPTION value and send AJAX response.
		 *
		 * INFO: Plugin settings include an option to delete all plugin data from the database upon uninstallation.
		 */
		$response = $this->update_option_value( STRCPV_OPT_NAME['delete_plugin_data'], $value );

		if ( $response === true ) {
			$response_data['delete_plugin_data'] = [
																								'success' => true,
																								'msg' => esc_html__( 'Changes saved successfully!', 'page-visits-counter-lite' ),
																							];
		} else {
			$response_data['delete_plugin_data'] = [
																								'success' => false,
																								'msg' => esc_html__( 'No changes to save...', 'page-visits-counter-lite' ),
																							];
		}




		wp_send_json_success( $response_data );


		die();

	}

}
