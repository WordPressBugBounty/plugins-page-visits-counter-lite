<?php
/**
 * INCLUDE ALL AJAX FILES
 *
 * @package Strongetic - count page visits
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}




// COUNTER.
if ( file_exists( dirname( __FILE__ ) . '/Counter/class-total-visits.php' ) ) {
	require_once dirname( __FILE__ ) . '/Counter/class-total-visits.php';
}




// SETTINGS PAGE.
if ( file_exists( dirname( __FILE__ ) . '/SettingsPage/class-save-settings.php' ) ) {
	require_once dirname( __FILE__ ) . '/SettingsPage/class-save-settings.php';
}




// DASHBOARD.
if ( file_exists( dirname( __FILE__ ) . '/DashboardWidget/class-update-total-visits-nr.php' ) ) {
	require_once dirname( __FILE__ ) . '/DashboardWidget/class-update-total-visits-nr.php';
}

if ( file_exists( dirname( __FILE__ ) . '/DashboardWidget/class-update-page-data.php' ) ) {
	require_once dirname( __FILE__ ) . '/DashboardWidget/class-update-page-data.php';
}

if ( file_exists( dirname( __FILE__ ) . '/DashboardWidget/class-delete-pages.php' ) ) {
	require_once dirname( __FILE__ ) . '/DashboardWidget/class-delete-pages.php';
}

if ( file_exists( dirname( __FILE__ ) . '/DashboardWidget/class-delete-page.php' ) ) {
	require_once dirname( __FILE__ ) . '/DashboardWidget/class-delete-page.php';
}

if ( file_exists( dirname( __FILE__ ) . '/DashboardWidget/reset/class-reset-all.php' ) ) {
	require_once dirname( __FILE__ ) . '/DashboardWidget/reset/class-reset-all.php';
}

if ( file_exists( dirname( __FILE__ ) . '/DashboardWidget/reset/class-reset-page-type.php' ) ) {
	require_once dirname( __FILE__ ) . '/DashboardWidget/reset/class-reset-page-type.php';
}

if ( file_exists( dirname( __FILE__ ) . '/DashboardWidget/class-toggle-hidden-reports.php' ) ) {
	require_once dirname( __FILE__ ) . '/DashboardWidget/class-toggle-hidden-reports.php';
}
