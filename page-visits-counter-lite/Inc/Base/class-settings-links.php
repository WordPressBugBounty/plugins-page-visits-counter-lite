<?php
/**
 * Settings links - class
 *
 * This class is responsible for displaying a settings link aside the plugin's deactivate option. ( Activate/Deactivate plugin. )
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

class Settings_Links extends Base_Controller {



	/**
	 * Registers the settings link in the plugin's action links.
	 *
	 * @since 1.0.0
	 */
	public function register() {
		add_filter( "plugin_action_links_$this->plugin", [ $this, 'settings_link' ] ); // No name conflict - use Base_Controller class instance.
	}




	/**
	 * Adds the settings link to the plugin's action links.
	 *
	 * @param array $links The existing plugin action links.
	 * @return array Modified plugin action links with added settings link.
	 *
	 * @since 1.0.0
	 */
	public function settings_link( $links ) {
		$settings_link = '<a href="options-general.php?page=strongetic-page-visits-counter-lite">Settings</a>';
		array_push( $links, $settings_link );
		return $links;
	}

}
