<?php
/**
 * INCLUDE ALL COUNTER FILES
 *
 * @package Strongetic - count page visits
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}




// BACKEND.
if ( file_exists( dirname( __FILE__ ) . '/backend/class-dashboard-widget.php' ) ) {
	require_once dirname( __FILE__ ) . '/backend/class-dashboard-widget.php';
}

// FRONTEND.
if ( file_exists( dirname( __FILE__ ) . '/frontend/class-counter-base.php' ) ) {
	require_once dirname( __FILE__ ) . '/frontend/class-counter-base.php';
}

if ( file_exists( dirname( __FILE__ ) . '/frontend/class-total-visits.php' ) ) {
	require_once dirname( __FILE__ ) . '/frontend/class-total-visits.php';
}

// TESTING.
if ( file_exists( dirname( __FILE__ ) . '/frontend/Crawlers.php' ) ) {
	require_once dirname( __FILE__ ) . '/frontend/Crawlers.php';
}
