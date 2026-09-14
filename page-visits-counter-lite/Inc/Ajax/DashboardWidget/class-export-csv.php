<?php
/**
 * AJAX CSV export callback.
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

class Export_CSV extends Options {

	public function register() {
		add_action( 'wp_ajax_StrCPVisits_export_csv', [ $this, 'StrCPVisits_export_csv' ] );
	}

	/** Download the current visits-by-page report as CSV. */
	public function StrCPVisits_export_csv() {
		check_ajax_referer( 'StrCPVisits_settings', 'security' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You are not allowed to export this report.', 'page-visits-counter-lite' ), 403 );
		}

		$visits_by_page = $this->get_visits_by_page_data();
		if ( ! is_array( $visits_by_page ) ) {
			$visits_by_page = [];
		}

		nocache_headers();
		header( 'Content-Type: text/csv; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename=page-visits-' . gmdate( 'Y-m-d' ) . '.csv' );

		$output = fopen( 'php://output', 'w' );
		fwrite( $output, "\xEF\xBB\xBF" );
		fputcsv( $output, [ 'Page name', 'Visits' ] );

		foreach ( $visits_by_page as $page_name => $visits ) {
			$page_name = (string) $page_name;
			if ( preg_match( '/^[=+\-@]/', $page_name ) ) {
				$page_name = "'" . $page_name;
			}
			fputcsv( $output, [ $page_name, (int) $visits ] );
		}

		fclose( $output );
		exit;
	}
}
