<?php
/**
 * SETTINGS - SETTINGS TAB
 *
 * This file is responsible for displaying the content of the settings tab, allowing users to configure plugin options.
 *
 * The settings tab provides checkboxes that allow users to control specific behaviors of the plugin, such as preserving data on plugin uninstall and enabling page refresh/reload counting.
 *
 * @package Strongetic - count page visits
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>




<div class="StrCPVisits-light-tab-settings">


	<form id="StrCPVisits-js-settings-form">

		<ul>

			<li class="StrCPVisits-chk-plugin-data">
				<!-- CHECKBOX - DELETE PLUGIN DATA? -->
				<?php
				$delete_plugin_data = get_option( STRCPV_OPT_NAME['delete_plugin_data'] );
				if ( $delete_plugin_data === 'NO') {

					echo "<input type='checkbox' id='StrCPVisits-chk-plugin-data' name='StrCPVisits-chk-plugin-data' checked>";
				} else {
					echo "<input type='checkbox' id='StrCPVisits-chk-plugin-data' name='StrCPVisits-chk-plugin-data'>";
				}
				?>
				<label for="StrCPVisits-chk-plugin-data"><?php esc_html_e( 'Do not delete plugin data on plugin delete/uninstall', 'page-visits-counter-lite' ); ?></label>
				<div id="StrCPVisits-js-sett-form-plugin-data-response-box" class="StrCPVisits-settings-form-response-box-individual">
				</div>
			</li>


			<li class="StrCPVisits-count-page-refresh">
				<!-- CHECKBOX - DELETE PLUGIN DATA? -->
				<?php
				$count_page_refresh = get_option( STRCPV_OPT_NAME['count_refresh'] );
				if ( $count_page_refresh === 'NO' || $count_page_refresh === false ) {

					echo "<input type='checkbox' id='StrCPVisits-count-page-refresh' name='StrCPVisits-count-page-refresh'>";
				} else {
					echo "<input type='checkbox' id='StrCPVisits-count-page-refresh' name='StrCPVisits-count-page-refresh' checked>";
				}
				?>
				<label for="StrCPVisits-count-page-refresh"><?php esc_html_e( 'Count Page refresh/reload', 'page-visits-counter-lite' ); ?></label>
				<div id="StrCPVisits-js-sett-form-count-page-response-box" class="StrCPVisits-settings-form-response-box-individual">
				</div>
			</li>





		</ul>
		<br><br><br><br>
		<!-- SAVE BUTTON WRAPPER -->
		<div class="StrCPVisits-settings-form-submit-btn-wrapper">
			<!-- SAVE BUTTON -->
			<input type="submit" class="button-primary" value="<?php esc_html_e( 'SAVE', 'page-visits-counter-lite' ); ?>">
			<!-- LOADING SPINNER -->
			<div id="StrCPVisits-js-settings-form-submit-btn-spinner" class="StrCPVisits-loading-spinner-wrapper-toggle">
				<div class="StrCPVisits-loading-spinner">
					<!-- Element for spinner made with HTML + CSS -->
					<div class="StrCPVisits-spinner-loader"></div>
				</div>
			</div>
		</div>

		<!-- RESPONSE BOX -->
		<div id="StrCPVisits-js-settings-form-response"></div>

	</form>


</div>
