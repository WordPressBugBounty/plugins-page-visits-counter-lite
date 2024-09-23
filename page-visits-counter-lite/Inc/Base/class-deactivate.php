<?php
/**
 * Deactivate class
 *
 * This class is part of the Strongetic - Count Page Visits plugin package.
 * It handles the deactivation of the plugin and related functionality.
 *
 * @package Strongetic - Count Page Visits
 * @subpackage Inc\Base
 * @since 1.0.0
 */

namespace StrCPVisits_Inc\Base;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Deactivate {



	/**
	 * Deactivate the Plugin
	 *
	 * This method is executed when the plugin is deactivated from the WordPress admin.
	 * It performs necessary tasks to clean up and finalize the deactivation process.
	 *
	 * @since 1.0.0
	 */
	public static function deactivate() {
		flush_rewrite_rules();
	}

}
