<?php
/**
 * Base Controller Class
 *
 * This class serves as the base controller for the Strongetic - Count Page Visits plugin.
 * It is designed to prevent naming conflicts with other plugins.
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

class Base_Controller {


	/**
	 * Plugin Path
	 *
	 * The filesystem path to the root directory of the plugin.
	 *
	 * @var string
	 */
	public $plugin_path;


	/**
	 * Plugin URL
	 *
	 * The URL to the root directory of the plugin.
	 *
	 * @var string
	 */
	public $plugin_url;


	/**
	 * Plugin File
	 *
	 * The path to the main plugin file.
	 *
	 * @var string
	 */
	public $plugin;




	/**
	 * Constructor
	 *
	 * Initializes the base controller properties.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		// Plugin.
		$this->plugin_path = plugin_dir_path( dirname( __FILE__, 2 ) ); // 2 is a number of child folders away from the parent. (Child folders: 1.Inc, 2.Base )
		$this->plugin_url  = plugin_dir_url( dirname( __FILE__, 2 ) );
		$this->plugin      = plugin_basename( dirname( __FILE__, 3 ) ) . '/strongetic-page-visits-counter-lite.php';
	}




	/**
	 * Get All Data
	 *
	 * Retrieves an array containing plugin-related data.
	 *
	 * @return array An array of plugin data.
	 * @since 1.0.0
	 */
	public function get_all_data() {
		$data = [
			'plugin_path' => $this->plugin_path,
			'plugin_url'  => $this->plugin_url,
			'plugin'      => $this->plugin,
		];
		return $data;
	}
}
