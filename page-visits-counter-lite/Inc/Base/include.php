<?php
/**
 * INCLUDE ALL BASE FILES
 *
 * @package Strongetic - count page visits
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}




if ( file_exists( dirname( __FILE__ ) . '/class-activate.php' ) ) {
	require_once dirname( __FILE__ ) . '/class-activate.php';
}

if ( file_exists( dirname( __FILE__ ) . '/class-deactivate.php' ) ) {
	require_once dirname( __FILE__ ) . '/class-deactivate.php';
}

if ( file_exists( dirname( __FILE__ ) . '/class-base-controller.php' ) ) {
	require_once dirname( __FILE__ ) . '/class-base-controller.php';
}

if ( file_exists( dirname( __FILE__ ) . '/class-enqueue.php' ) ) {
	require_once dirname( __FILE__ ) . '/class-enqueue.php';
}

if ( file_exists( dirname( __FILE__ ) . '/class-settings-links.php' ) ) {
	require_once dirname( __FILE__ ) . '/class-settings-links.php';
}
