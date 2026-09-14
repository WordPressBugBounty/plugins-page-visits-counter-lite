<?php
/**
 * AJAX XML export callback.
 *
 * @package Strongetic - count page visits
 * @subpackage Inc\Ajax\Dashboard_Widget
 * @since 2.0.0
 */

namespace StrCPVisits_Inc\Ajax\Dashboard_Widget;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use StrCPVisits_Inc\DB\Options;

class Export_XML extends Options {

	public function register() {
		add_action( 'wp_ajax_StrCPVisits_export_xml', [ $this, 'StrCPVisits_export_xml' ] );
	}

	/** Download the current visits-by-page report as XML. */
	public function StrCPVisits_export_xml() {
		check_ajax_referer( 'StrCPVisits_settings', 'security' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You are not allowed to export this report.', 'page-visits-counter-lite' ), 403 );
		}

		$visits_by_page = $this->get_visits_by_page_data();
		if ( ! is_array( $visits_by_page ) ) {
			$visits_by_page = [];
		}

		nocache_headers();
		header( 'Content-Type: application/xml; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename=page-visits-' . gmdate( 'Y-m-d' ) . '.xml' );

		echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
		echo "<page-visits>\n";
		foreach ( $visits_by_page as $page_name => $visits ) {
			echo "\t<page>\n";
			echo "\t\t<name>" . htmlspecialchars( (string) $page_name, ENT_XML1 | ENT_QUOTES, 'UTF-8' ) . "</name>\n";
			echo "\t\t<visits>" . (int) $visits . "</visits>\n";
			echo "\t</page>\n";
		}
		echo "</page-visits>\n";
		exit;
	}
}
