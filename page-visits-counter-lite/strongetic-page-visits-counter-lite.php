<?php
/**
 * @link              strongetic.com
 * @since             1.2.1
 * @package           Strongetic - count page visits
 *
 * @wordpress-plugin
 * Plugin Name:       Page Visits Counter - Lite
 * Plugin URI:        https://strongetic.com/free-wp-plugins/page-visits-counter-lite/
 * Description:       Display number of visits for each page in admin dashboard and browser developer-tool/console. Doesn't count page refresh as a new visit...
 * Version:           1.2.1
 * Author:            Denis Botic
 * Author URI:        strongetic.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       page-visits-counter-lite
 * Domain Path:       /lang
 * WC requires at least: 4.9.2
 * WC tested up to: 5.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}




// Disable auto-updates for translations
add_filter( 'auto_update_translation', '__return_false' );




/**
 * LOADS TRANSLATIONS - not necessary for WP.org
 *
 * DESC: Loads translations from plugin 'lang' directory
 *
 * @since 1.2.0
 */
function strcpv_plugin_load_text_domain() {
	load_plugin_textdomain( 'page-visits-counter-lite', false, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );
}
add_action( 'plugins_loaded', 'strcpv_plugin_load_text_domain' );




/**
 * GLOBAL CONSTANTS
 *
 * INFO:  Only uninstall.php doesn't have access to these constants.
 * PHP 5.6+
 *
 * @since 1.0.0
 */
const STRCPV_OPT_NAME = [
	// Dashboard widget.
	'total_visits'        => 'strcpv_total_visits',
	'visits_by_page'      => 'strcpv_visits_by_page',
	'hidden_page_reports' => 'strcpv_hidden_page_reports',

	// Settings page.
	'count_refresh'       => 'strcpv_count_refresh',
	'delete_plugin_data'  => 'strcpv_delete_plugin_data',
];




/**
 * Include files.
 */
if ( file_exists( dirname( __FILE__ ) . '/Inc/include.php' ) ) {
	require_once dirname( __FILE__ ) . '/Inc/include.php';
}

if ( file_exists( dirname( __FILE__ ) . '/templates/include.php' ) ) {
	require_once dirname( __FILE__ ) . '/templates/include.php';
}




/**
 * The code that runs during plugin activation.
 */
function activate_StrCPVisits() {
	StrCPVisits_Inc\Base\Activate::activate();  // No need to use the "use" expression.
}
register_activation_hook( __FILE__, 'activate_StrCPVisits' );

/**
 * The code that runs during plugin deactivation.
 */
function deactivate_StrCPVisits() {
	StrCPVisits_Inc\Base\Deactivate::deactivate();  // No need to use the "use" expression.
}
register_deactivation_hook( __FILE__, 'deactivate_StrCPVisits' );




/**
 * Invoke Counter.
 */
if ( class_exists( 'StrCPVisits_Inc\\Init' ) ) {
	StrCPVisits_Inc\Init::register_services(); // Call static method in Init class.
}
