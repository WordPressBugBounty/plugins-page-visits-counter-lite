<?php
/**
 * Enqueue class
 *
 * This class handles enqueueing scripts, styles, and localizing scripts.
 *
 * @package Strongetic - count page visits
 * @subpackage Inc\Base
 * @since 1.0.0
 */

namespace StrCPVisits_Inc\Base;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use \StrCPVisits_Inc\Base\Base_Controller;

class Enqueue extends Base_Controller {


	public function register() {
		// Hook into WordPress script and style enqueueing actions.
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue' ] );
	}




	/**
	 * ENQUEUE
	 *
	 * DESC: Add styles and scripts for the wp frontend.
	 * INFO: If you wish to localize this plugin, or just pass the PHP variable to JS file then use wp_localize_script.
	 *       Also, with localize script you can create NONCE.
	 *
	 * @since 1.0.0
	 */
	public function enqueue() {

		// ADD JQUERY.
		wp_enqueue_script( 'jquery' );


		// ADD CUSTOM FRONTEND JAVASCRIPT.
		$plugin_js_path = $this->plugin_path . 'assets/frontend/page-visits-counter-lite-ajax.js';
		if ( file_exists( $plugin_js_path ) ) {
			$script1_ver = filemtime( $plugin_js_path );
			wp_enqueue_script( 'StrCPVisits_js_frontend', $this->plugin_url . 'assets/frontend/page-visits-counter-lite-ajax.js', [ 'jquery' ], $script1_ver, true );
		}


		// LOCALIZE THE FRONTEND SCRIPT -> add php variable to JS file.
		wp_localize_script(
			'StrCPVisits_js_frontend',
			'STR_CPVISITS',
			[
				'security'                     => wp_create_nonce( 'StrCPVisits_frontend' ),
				'ajax_url'                     => admin_url( 'admin-ajax.php' ),
				'text_page_name'               => esc_html__( 'PAGE NAME', 'page-visits-counter-lite' ), // Pass custom words to JS file.
				'text_cannot_access_page_name' => esc_html__( 'Cannot access page name - try to flush server cache...', 'page-visits-counter-lite' ),
				'text_message'                 => esc_html__( 'MESSAGE', 'page-visits-counter-lite' ),
				'text_total_page_visits'       => esc_html__( 'TOTAL PAGE VISITS', 'page-visits-counter-lite' ),
				'text_total_website_visits'    => esc_html__( 'TOTAL WEBSITE VISITS', 'page-visits-counter-lite' ),
			]
		);

	} // ! enqueue.




	/**
	 * ADMIN ENQUEUE
	 *
	 * DESC: Add styles and scripts for the wp admin area.
	 * INFO: If you wish to localize this plugin, or just pass the PHP variable to JS file then use wp_localize_script.
	 *       Also, with localize script you can create NONCE.
	 *
	 * @since 1.0.0
	 */
	public function admin_enqueue( $page ) {


		// ADD JQUERY.
		wp_enqueue_script( 'jquery' );



		/**
		 * Enqueue styles and scripts only on specific admin pages.
		 * - Dashboard page.
		 * - Settings sub-page called "Page Visits Counter Light".
		 */
		if ( strpos( $page, 'settings_page_strongetic-page-visits-counter-lite' ) !== false || strpos( $page, 'index.php' ) !== false ) {


			// ADD CUSTOM ADMIN STYLESHEET.
			$plugin_style_path = $this->plugin_path . 'assets/admin/page-visits-counter-lite.css';
			if ( file_exists( $plugin_style_path ) ) {
				$style1_ver = filemtime( $plugin_style_path );
				wp_enqueue_style( 'style', $this->plugin_url . 'assets/admin/page-visits-counter-lite.css', '', $style1_ver );
			}

		} // ! if page



		// REGISTER ADMIN JAVASCRIPT.
		$plugin_js_path = $this->plugin_path . 'assets/admin/page-visits-counter-lite.js';
		if ( file_exists( $plugin_js_path ) ) {
			$script1_ver = filemtime( $plugin_js_path );
			wp_register_script( 'StrCPVisits_js', $this->plugin_url . 'assets/admin/page-visits-counter-lite.js', [ 'jquery' ], $script1_ver, false );
		}

		// REGISTER ADMIN AJAX js.
		$plugin_ajax_path = $this->plugin_path . 'assets/admin/page-visits-counter-lite-ajax.js';
		if ( file_exists( $plugin_ajax_path ) ) {
			$script2_ver = filemtime( $plugin_ajax_path );
			wp_register_script( 'StrCPVisits_ajax', $this->plugin_url . 'assets/admin/page-visits-counter-lite-ajax.js', [ 'jquery' ], $script2_ver, false );
		}

		// ENQUEUE JS ON PLUGINS PAGE.
		if ( strpos( $page, 'plugins.php' ) !== false ) {
			wp_enqueue_script( 'StrCPVisits_js' );
		}


		// LOCALIZE SCRIPT IN THE ADMIN JAVASCRIPT FILE.
		wp_localize_script(
			'StrCPVisits_js',
			'STR_CPVISITS_JS',
			[
				'text_plugin_delete_warning' => esc_html__( 'On plugin delete, all plugin data are going to be deleted. If you wish to keep the data, enable that option in the plugin settings.', 'page-visits-counter-lite' ), // Pass custom words to JS file.
			]
		);


		// LOCALIZE SCRIPT IN THE ADMIN AJAX js FILE.
		wp_localize_script(
			'StrCPVisits_ajax',
			'STR_CPVISITS',
			[
				'security'                       => wp_create_nonce( 'StrCPVisits_settings' ),
				'text_delete_page'               => esc_html__( 'Delete a page-report from VISITS BY PAGE-NAME list?', 'page-visits-counter-lite' ), // Pass custom words to JS file.
				'text_move_to_visible_list'      => esc_html__( 'Move selected reports to visible list?', 'page-visits-counter-lite' ),
				'text_move_to_hidden_list'       => esc_html__( 'Move selected reports to hidden list?', 'page-visits-counter-lite' ),
				'text_reset_selected'            => esc_html__( 'Reset selected reports to zero?', 'page-visits-counter-lite' ),
				'text_delete_selected'           => esc_html__( 'Delete selected page-reports from VISITS BY PAGE-NAME list?', 'page-visits-counter-lite' ),
				'text_switching_to_visible_list' => esc_html__( 'By switching to the Visible list type, all current selections are going to be lost. Do you wish to proceed?', 'page-visits-counter-lite' ),
				'text_switching_to_hidden_list'  => esc_html__( 'By switching to the Hidden list type, all current selections are going to be lost. Do you wish to proceed?', 'page-visits-counter-lite' ),
			]
		);


	} // ! admin_enqueue.

} // ! Class.
