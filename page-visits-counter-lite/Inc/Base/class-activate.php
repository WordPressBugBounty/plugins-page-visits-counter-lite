<?php
/**
 * Activate Class
 *
 * This class is part of the StrCPVisits_Inc\Base namespace and is responsible for
 * handling plugin activation-related tasks. It contains methods to flush rewrite
 * rules for proper URL handling and to add an option for managing the deletion
 * of plugin data. The class ensures that necessary activation tasks are performed
 * to set up the plugin correctly when it is activated.
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

class Activate {



	/**
	 * Activate the plugin.
	 *
	 * This method is responsible for handling the activation of the plugin. It flushes
	 * rewrite rules to ensure proper URL handling and calls the 'add_option_delete_plugin_data()'
	 * method to add an option for managing the deletion of plugin data. This activation
	 * process prepares the plugin for use and sets up necessary configurations.
	 *
	 * @since 1.0.0
	 */
	public static function activate() {
		flush_rewrite_rules();
		self::add_option_delete_plugin_data();
	}



	/**
	 * ADD OPTION - DELETE PLUGIN DATA
	 *
	 * DESCRIPTION:
	 * Checks for the existence of an option with the specified name. If the option does not
	 * exist, this method creates it and sets its default value to "YES." This option governs
	 * whether to retain or delete plugin data upon plugin deletion or uninstallation.
	 *
	 * INFORMATION:
	 * This option's value can be managed and modified within the plugin's settings page.
	 *
	 * OPTION VALUES:
	 * - "NO": Retain plugin data even after uninstallation.
	 * - "YES": Delete plugin data upon uninstallation.
	 *
	 * @since 1.0.0
	 */
	public static function add_option_delete_plugin_data() {
		$option = get_option( STRCPV_OPT_NAME['delete_plugin_data'] );
		if ( $option === false ) {
			// Create option with the given name and set its value to "YES".
			add_option( STRCPV_OPT_NAME['delete_plugin_data'], 'YES' );
		}
	}
}
