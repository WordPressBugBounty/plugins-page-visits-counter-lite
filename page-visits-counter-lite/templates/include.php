<?php
/**
 * INCLUDE ALL TEMPLATES FILES
 *
 * @package Strongetic - count page visits
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}




// BACKEND.
if ( file_exists( dirname( __FILE__ ) . '/settings-subpage.php' ) ) {
	require_once dirname( __FILE__ ) . '/settings-subpage.php';
}
