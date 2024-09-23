<?php
/**
 * DASHBOARD WIDGET
 *
 * DESCRIPTION: Display page visits report list in the WordPress admin dashboard.
 *
 * @package Strongetic - count page visits
 */
namespace StrCPVisits_Inc\Counter\backend;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use \StrCPVisits_Inc\Base\Base_Controller;



class Dashboard_Widget extends Base_Controller {


	public function register() {
		add_action( 'wp_dashboard_setup', [ $this, 'add_dashboard_widgets' ] );
	}



	// Register new dashboard widget.
	public function add_dashboard_widgets() {
		wp_add_dashboard_widget(
			'strongetic_page_visits_counter_light', // Widget slug.
			'ALL PAGE VISITS', // Widget title.
			[ $this, 'display_widget_content' ] // Function name to display the widget.
		);
	}




	/**
	 * DASHBOARD ALL PAGE VISITS
	 *
	 * INFO: This function is invoked by dashboard widget register callback.
	 * DESC: Output the contents of new dashboard widget.
	 *
	 * @since 1.0.0
	 */
	public function display_widget_content() {

		// Get pages data.
		$pages_data = $this->get_pages_data();
		// Set default classes for info box and quick info button.
		$default_classes = $this->get_default_info_box_class( $pages_data );




		/**
		 * WP-HOOK - StrCPVisits_db_widget_wrapper_start
		 *
		 * DESC: Fires at the beginning of the dashboard widget content.
		 *
		 * @since 1.0.0
		 */
		do_action( 'StrCPVisits_db_widget_wrapper_start' );
		?>


		<!-- HTML CONTENT -->
		<div class="StrCPVisits StrCPVisits_db_widget_wrapper">

			<!-- TOTAL VISITS BOXES -->
			<div class="StrCPVisits_db_total_visits_wrapper">
				<?php $this->display_total_visits(); ?>
				<br>
				<?php $this->display_total_page_visits( $pages_data ); ?>
			</div>

			<?php
				/**
				 * WP-HOOK - StrCPVisits_db_widget_after_total_visits_boxes
				 *
				 * DESC: Fires at the end of the dashboard widget total visits boxes.
				 *
				 * @since 1.0.0
				 */
				do_action( 'StrCPVisits_db_widget_after_total_visits_boxes' );
			?>
			<br><br>


			<!-- VISITS BY PAGE NAME -->
			<div class="StrCPVisits_db_list_title_wrapper">

				<!-- TITLE -->
				<div class="StrCPVisits_db_list_title">
					<div class="StrCPVisits_db_list_title_inner_wrapper">
						<h3>VISITS BY PAGE-NAME</h3>
						<!-- ICON - RESET EACH AND EVERY PAGE -->
						<div id="StrCPVisits_js_db_list_reset_menu_btn_wrapper" class="StrCPVisits_db_list_reset_menu_btn_wrapper <?php echo $default_classes['reset_menu_icon_wrapper']; ?>">
							<span id="StrCPVisits_js_db_list_reset_menu_btn" class="StrCPVisits_db_list_reset_menu_btn StrCPVisits_icon_btn dashicons dashicons-image-rotate <?php echo $default_classes['reset_menu_icon']; ?>"></span>
						</div>
					</div>
					<i>( Not counting page refresh/reload. )</i>
				</div>


				<!-- FILTER BUTTON and NOTIFICATION -->
				<div class="StrCPVisits_db_list_filter_btn_and_notific_wrapper">
					<!-- FILTER MENU CLOSED - NOTIFICATION - VISITS NR  -->
					<div id="StrCPVisits_js_db_filter_menu_notific_visits_wrapper" class="StrCPVisits_db_filter_menu_notific_visits_wrapper">
						<p class="StrCPVisits_db_filter_menu_notific_visits">Filtered Visits<br><span id="StrCPVisits_js_db_filter_menu_notific_nr" class="StrCPVisits_db_filter_menu_notific_nr"><?php echo $pages_data['total_visits']; ?></span></p>
					</div>
					<!-- FILTER BUTTON - ICON -->
					<div id="StrCPVisits_js_db_list_filter_btn_wrapper" class="StrCPVisits_db_list_filter_btn_wrapper hidden">
						<span id="StrCPVisits_js_db_list_filter_btn" class="StrCPVisits_db_list_filter_btn StrCPVisits_icon_btn dashicons dashicons-admin-settings <?php echo $default_classes['filter_menu_icon']; ?>"></span>
					</div>
				</div>

				<div>
					<!-- VIDEO TUTORIAL BUTTON -->
					<a href="https://www.youtube.com/watch?v=wxWiFin8NwE" target="_blank" class="StrCPVisits_db_video_tutorial_btn_link">
						<span id="StrCPVisits_js_db_video_tutorial_btn" class="StrCPVisits_db_video_tutorial_btn dashicons StrCPVisits_icon_btn dashicons-video-alt3"></span>
					</a>
					<!-- INFO BUTTON -->
					<span id="StrCPVisits_js_db_quick_info_btn" class="StrCPVisits_db_quick_info_btn dashicons StrCPVisits_icon_btn dashicons-info <?php echo $default_classes['quick_info_btn']; ?>"></span>
				</div>

			</div>

			<!-- MENU TAB -->
			<div id="StrCPVisits-js-db-menu">

				<!-- RESET MENU -->
				<div id="StrCPVisits_js_db_reset_menu" class="StrCPVisits_db_reset_menu hidden">
					<div class="StrCPVisits_db_reset_menu_header">

						<!-- RESET ALL BUTTON -->
						<div id='StrCPVisits_js_db_reset_all_btn' class="StrCPVisits_db_reset_all_button button">
							<!-- Loading spinner -->
							<div id="StrCPVisits-js-db-reset-all-spinner" class="StrCPVisits-loading-spinner-wrapper-toggle">
								<div class="StrCPVisits-loading-spinner">
									<!--Element for spinner made with HTML + CSS-->
									<div class="StrCPVisits-spinner-loader"></div>
								</div>
							</div>
							<!-- Button text -->
							<span class="StrCPVisits_js_db_reset_buttons_text">Reset All</span>
						</div>

						<!-- HEADER SENTENCE -->
						<span class="StrCPVisits_db_reset_all_sentence">( Set each and every page report to zero. )</span>
					</div>

					<!-- RESPONSE BOX -->
					<div id="StrCPVisits_js_db_reset_response_box" class="StrCPVisits_db_reset_response_box">
					</div>

					<p>Reset by page-type ( including hidden reports ):</p>

					<!-- RESET OPTIONS WRAPPER -->
					<ul id="StrCPVisits_js_db_reset_menu_options_wrapper" class="StrCPVisits_db_reset_menu_options_wrapper">

						<?php
						// OPTION EXAMPLE - ( Built with JS ):
						// <li class="StrCPVisits-reset-All-Others">
						//
						//	 <!-- Reset button -->
						//	 <div class='StrCPVisits_db_reset_button button' data-strcpvisits-dbreset-page-type-name='All-Others'>
						//
						//		 <!-- Loading spinner -->
						//		 <div class="StrCPVisits-loading-spinner-wrapper-toggle">
						//			 <div class="StrCPVisits-loading-spinner">
						//				 <!--Element for spinner made with HTML + CSS-->
						//				 <div class="StrCPVisits-spinner-loader"></div>
						//			 </div>
						//		 </div>
						//
						//		 <!-- Button text -->
						//		 <span class="StrCPVisits_js_db_reset_buttons_text">Reset</span>
						//	 </div>
						//
						//	 <!-- Page type name -->
						//	 <span class="StrCPVisits_js_db_reset_button_page_type_name">All-Others</span>
						//
						// </li>
						?>
					</ul>
				</div>


				<!-- FILTER MENU -->
				<div id="StrCPVisits_js_db_filter_menu" class="StrCPVisits_db_filter_menu hidden">
					<div class="StrCPVisits_db_filter_menu_header">
						<p class="StrCPVisits_db_filter_menu_header_sentence">Visible in report list:</p>
						<div>
							<p class="StrCPVisits_db_filter_menu_header_visits">Visits: <span id="StrCPVisits_js_db_filter_menu_header_nr" class="StrCPVisits_db_filter_menu_header_nr"><?php echo $pages_data['total_visits']; ?></span></p>
						</div>
					</div>
					<ul id="StrCPVisits_js_db_filter_menu_options_wrapper" class="StrCPVisits_db_filter_menu_options_wrapper">
						<?php
						// OPTION EXAMPLE - ( Built with JS ):
						// <li class="StrCPVisits-option1">
						//	 <input type='checkbox'  id='StrCPVisits-option1' value='option1'>
						//	 <label for='StrCPVisits-option1'>page-name-long-very-very 1</label>
						// </li>
						?>
					</ul>
				</div>


				<!-- OPTIONS MENU  - ( Visible )-->
				<div id="StrCPVisits_js_db_options_menu" class="StrCPVisits_db_options_menu">

					<!-- BOX LEFT -->
					<div>
						<!-- Sort button -->
						<div id="StrCPVisits_js_db_options_menu_sort_btn" class="StrCPVisits_db_options_menu_sort_btn button StrCPVisits_js_db_sort_btn_state_a-z <?php echo $default_classes['options_menu_btns']; ?>">
							<span id="StrCPVisits_js_db_options_menu_sort_btn_a-z">A-Z</span>
							<span id="StrCPVisits_js_db_options_menu_sort_btn_z-a" class="hidden">Z-A</span>
						</div>

						<!-- Select button -->
						<div id="StrCPVisits_js_db_options_menu_select_btn" class="StrCPVisits_db_options_menu_select_btn button <?php echo $default_classes['options_menu_btns']; ?>">
							<span id="StrCPVisits_js_db_options_menu_select_btn_icon" class="hidden">arrow icon</span>
							<span id="StrCPVisits_js_db_options_menu_select_btn_text">Select</span>
						</div>
					</div>


					<!-- BOX RIGHT -->
					<div class="StrCPVisits_js_db_options_menu_right_box">

						<!-- Search button-->
						<div id="StrCPVisits_js_db_options_menu_search_btn" class="StrCPVisits_db_options_menu_search_btn button <?php echo $default_classes['options_menu_btns']; ?>">
							<span class="dashicons dashicons-search"></span>
						</div>

						<!-- Visible/Hidden button -->
						<div id="StrCPVisits_js_db_options_menu_hidden_toggle_btn" class="StrCPVisits_db_options_menu_hidden_toggle_btn button <?php echo $default_classes['options_menu_btns']; ?>">
							<span id="StrCPVisits_js_db_options_menu_visible_icon" class="dashicons dashicons-visibility"></span>
							<span id="StrCPVisits_js_db_options_menu_hidden_icon" class="dashicons dashicons-hidden hidden"></span>
						</div>

					</div>

				</div>


				<!-- SEARCH MENU -->
				<div id="StrCPVisits_js_db_search_menu" class="StrCPVisits_db_search_menu hidden">
					<input type="text" id="StrCPVisits_js_db_search_input_field" placeholder="Search...">
					<span>( Search both lists... )</span>
				</div>


				<!-- SELECT MENU -->
				<div id="StrCPVisits_js_db_select_menu" class="StrCPVisits_db_select_menu hidden">
					<div class="StrCPVisits_db_select_menu_header">

						<!-- ICON MENU -->
						<div id="StrCPVisits_js_db_select_icon_menu" class="StrCPVisits_db_select_icon_menu hidden">
							<div class="StrCPVisits_db_select_icon_menu_inner_wrapper">

								<!-- SET AS VISIBLE -->
								<a href="#" id="StrCPVisits_js_db_select_set_visible_btn" class="StrCPVisits_db_select_set_visible_btn StrCPVisits_icon_btn_disabled">
									<span class="dashicons dashicons-visibility"></span>
								</a>

								<!-- SET AS HIDDEN -->
								<a href="#" id="StrCPVisits_js_db_select_set_hidden_btn" class="StrCPVisits_db_select_set_hidden_btn StrCPVisits_icon_btn_disabled">
									<span class="dashicons dashicons-hidden"></span>
								</a>

								<!-- RESET -->
								<a href="#" id="StrCPVisits_js_db_select_reset_btn" class="StrCPVisits_db_select_reset_btn StrCPVisits_icon_btn_disabled">
									<span class="dashicons dashicons-image-rotate"></span>
								</a>

								<!-- DELETE -->
								<a href="#" id="StrCPVisits_js_db_select_delete_btn" class="StrCPVisits_db_select_delete_btn StrCPVisits_icon_btn_disabled">
									<span class="dashicons dashicons-trash"></span>
								</a>

							</div>
						</div>

						<!-- ICON MENU - Loading spinner -->
						<div id="StrCPVisits-js-db-select-icon-menu-spinner" class="StrCPVisits-js-db-select-icon-menu-spinner StrCPVisits-loading-spinner-wrapper-toggle">
							<div class="StrCPVisits-loading-spinner">
								<!--Element for spinner made with HTML + CSS-->
								<div class="StrCPVisits-spinner-loader"></div>
							</div>
						</div>

						<!-- ICON MENU - RESPONSE BOX -->
						<div id="StrCPVisits_js_db_select_response_box" class="StrCPVisits_db_select_response_box">
						</div>

					</div>

					<div class="StrCPVisits_db_select_menu_body">

						<!-- Select/Deselect All -->
						<a href="#" id="StrCPVisits_js_db_select_menu_select_all_toggle" class="StrCPVisits_db_select_menu_select_all_toggle">
							<span id="StrCPVisits_js_db_select_menu_text_select_all">Select All</span>
							<span id="StrCPVisits_js_db_select_menu_text_deselect_all" class="hidden">Deselect All</span>
						</a>

						<!-- Select by type || page name -->
						<a href="#" id="StrCPVisits_js_db_select_menu_select_by_type_toggle" class="StrCPVisits_db_select_menu_select_by_type_toggle">
							<span id="StrCPVisits_js_db_select_menu_select_by_type_text">Select by page type</span>
							<span id="StrCPVisits_js_db_select_menu_select_by_type_close_text" class="hidden">Close</span>
						</a>

					</div>
				</div>


				<!-- SELECT BY PAGE TYPE MENU -->
				<div id="StrCPVisits_js_db_page_type_menu" class="StrCPVisits_db_page_type_menu hidden">
					<p>Select pages by page-type:</p>
					<ul></ul>
				</div>


				<!-- INFO BOX -->
				<div id="StrCPVisits_js_db_info_box" class="StrCPVisits_db_info_box  <?php echo $default_classes['info_box']; ?>">
					<?php echo $this->get_explanation(); ?>
				</div>


			</div>
			<!-- MENU TAB END -->



			<!-- LIST -->
			<div id="StrCPVisits_js_db_list_wrapper" class="StrCPVisits_db_list_wrapper StrCPVisits_accordion_menu StrCPVisits_accordion_menu-with-arrows" data-stracc-close-other-options="true">
				<?php echo $pages_data['html_visits']; ?>
			</div>

		</div> <!-- widget wrapper END -->

		<!-- ! HTML CONTENT -->


		<?php



		/**
		 * WP-HOOK - StrCPVisits_db_widget_wrapper_end_before_js
		 *
		 * DESC: Fires at the end of the dashboard widget content but before js.
		 *
		 * @since 1.0.0
		 */
		do_action( 'StrCPVisits_db_widget_wrapper_end_before_js' );



		/**
		 * ADD JS and AJAX
		 *
		 * DESC: They must be added here, otherwise it is to early and it will not work.
		 */
		wp_enqueue_script( 'StrCPVisits_js' );
		wp_enqueue_script( 'StrCPVisits_ajax' );



		/**
		 * WP-HOOK - StrCPVisits_db_widget_wrapper_end_after_js
		 *
		 * DESC: Fires at the end of the dashboard widget content but after js.
		 *
		 * @since 1.0.0
		 */
		do_action( 'StrCPVisits_db_widget_wrapper_end_after_js' );

	}




	/**
	 * GET PAGES DATA
	 *
	 * DESC: Get visits by page option data.
	 *       If there are no data display default values and quick info tab.
	 *       Else, count total page visits and build HTML page visits row list.
	 *
	 * @return array with:
	 *                   - Total_page_visits property.
	 *                   - HTML property that holds entire list of page visits.
	 * @since 1.0.0
	 */
	public function get_pages_data() {
		// Check if option has data.
		$visits_by_page_data_ser = get_option( STRCPV_OPT_NAME['visits_by_page'] );
		if ( $visits_by_page_data_ser == false ) {
			// There is no data -> return default values.
			$data_arr = [
				'html_visits'  => '',
				'total_visits' => 0,
				'displ_expl'   => true,
			];
			return $data_arr; // Abort further exec.
		}
		// Option has data.
		return $this->get_data_values( $visits_by_page_data_ser );
	}




	/**
	 * GET DATA VALUES
	 *
	 * DESC: Build list report by page name,
	 *       Count total page visits,
	 *       Do not display quick explanation.
	 *
	 * @param  $visits_by_page_data_ser  string  ( Serialized data )
	 * @return  array
	 * @since 1.0.0
	 */
	public function get_data_values( $visits_by_page_data_ser ) {
		$visits_by_page_data_arr = maybe_unserialize( $visits_by_page_data_ser );
		$html_visits             = '';
		$total_page_visits       = 0;
		$nr_of_rows              = 0;
		foreach ( $visits_by_page_data_arr as $key => $value ) {

			// Count total page visits.
			$total_page_visits = $total_page_visits + (int) $value;

			// Build HTML visits by page name - list.
			if ( $key === 'Archives: Products' ) {
				// Archive: products should have additional descr. (SHOP) at the end.
				$shop_page = ' ( SHOP )';
			} else {
				$shop_page = '';
			}

			// Get page type - (the word before ":" or "All-Others").
			$page_type = $this->get_page_type( $key );

			// Count rows.
			$nr_of_rows = $nr_of_rows + 1;
			// Set accordion class for the first menu option.
			if ( $nr_of_rows === 1 ) {
				$accordion_class_first = 'StrCPVisits_accordion_first';
			} else {
				$accordion_class_first = '';
			}

			// Set option to Visible or Hidden List.
			$hidden_report_class = $this->get_hidden_report_class( $key ); // "StrCPVisits-hidden-indicator" || "".

			// Prepare input array data as a string - page-type-name, page-name.
			$input_value_str = json_encode( [ $page_type, $key ] ); // array as a string.

			// ROW START.
			$html_visits .= "<section class='StrCPVisits_db_list_row StrCPVisits_accordion_btn " . $accordion_class_first . " " . $hidden_report_class . "' data-StrCPV-page-type='" . $page_type . "' data-StrCPV-page-name='" . $key . "'>";
			$html_visits .=	 "<div class='StrCPVisits_db_list_chkbox_toggle_wrapper hidden'>";
			$html_visits .=		 "<div class='StrCPVisits_db_list_chkbox_wrapper'>";
			$html_visits .=			 "<input type='checkbox' class='StrCPVisits_db_list_chkbox' value='" . $input_value_str . "' data-StrCPV-inp-page-type='" . $page_type . "' data-StrCPV-inp-page-name='" . $key . "'>";
			$html_visits .=		 "</div>";
			$html_visits .=	 "</div>";
			$html_visits .=	 "<span class='StrCPVisits_db_list_page_name'>" . $key . $shop_page . "</span>";
			$html_visits .=	 "<span class='StrCPVisits_db_list_visits_nr StrCPVisits-visible-indicator'>" . $value . "</span>";
			$html_visits .= "</section>";

							// ROW SubTAB.
			$html_visits .= "<div class='StrCPVisits_db_list_row_tab StrCPVisits_accordion_panel' data-StrCPV-page-type='" . $page_type . "'>";
			$html_visits .=	 "<div class='StrCPVisits_db_list_row_msg_box'>";
			$html_visits .=	 "</div>";
			$html_visits .=	 "<div class='StrCPVisits_db_list_row_inner_wrapper'>";
			$html_visits .=		 "<form class='StrCPVisits-dblist-page-visits-form'>";
			$html_visits .=			 "<input type='number' class='StrCPVisits-dblist-page-visits-nr' name='StrCPVisits-dblist-page-visits-nr' value=" . $value . " min='0'>";
			$html_visits .=			 "<input type='hidden' name='StrCPVisits-dblist-page-name' value='" . $key . "'>";
			$html_visits .=			 "<input type='submit' class='button-primary' value='Update'>";
			$html_visits .=			 "<!-- Loading spinner -->";
			$html_visits .=			 "<div class='StrCPVisits-loading-spinner-wrapper-toggle'>";
			$html_visits .=				 "<div class='StrCPVisits-loading-spinner'>";
			$html_visits .=					 "<!--Element for spinner made with HTML + CSS-->";
			$html_visits .=					 "<div class='StrCPVisits-spinner-loader'></div>";
			$html_visits .=				 "</div>";
			$html_visits .=			 "</div>";
			$html_visits .=		 "</form>";

			$html_visits .=		 "<a href='#' class='StrCPVisits-dblist-reload-page-btn' data-StrCPVisits-dblist-page-name='" . $key . "'><span class='dashicons dashicons-update'></span></a>";

			$html_visits .=		 "<a href='#' class='StrCPVisits-dblist-delete-page-btn' data-StrCPVisits-dblist-page-name='" . $key . "'><span class='dashicons dashicons-trash'></span></a>";
			$html_visits .=	 "</div>";
			$html_visits .= "</div>";
			// ROW END.
		}

		$data_arr = [
			'html_visits'  => $html_visits,
			'total_visits' => $total_page_visits,
			'displ_expl'   => false,
		];
		return $data_arr;
	}




	/**
	 * GET HIDDEN REPORT CLASS
	 *
	 * DESC: Check if page name is in hidden reports and if it is return
	 *       class name 'StrCPVisits-hidden-indicator'.
	 *
	 * @param  $page_name  string
	 * @return string  '' or 'StrCPVisits-hidden-indicator'
	 * @since 1.0.0
	 */
	public static function get_hidden_report_class( $page_name ) {
		// GET HIDDEN PAGE REPORTS.
		$hidden_page_reports_ser = get_option( STRCPV_OPT_NAME['hidden_page_reports'] );
		// CHECK IF REPORTS HAS DATA.
		if ( $hidden_page_reports_ser === false ) {
			return ''; // Page name is not in hidden list.
		}
		// Convert serialized to array
		$hidden_page_reports_arr = maybe_unserialize( $hidden_page_reports_ser );

		// Check if page name is in hidden_page_reports array.
		if ( in_array( $page_name, $hidden_page_reports_arr ) ) {
			// PAGE NAME IS IN HIDDEN ARRAY.
			return 'StrCPVisits-hidden-indicator';
		} else {
			// NO PAGE NAME IN HIDDEN ARRAY.
			return ''; // No class.
		}
	}




	/**
	 * GET PAGE TYPE
	 *
	 * DESC: Check if page name belongs to a page type by ":" in page name.
	 *       If there is no ":" in page name - set page type to "All-Others".
	 * EXAMPLE: page type can look like this "Product: Some page name".
	 *
	 * @param  $page_name  string
	 * @return  string
	 * @since 1.0.0
	 */
	public static function get_page_type( $page_name ) {
		// Default page type.
		$page_type = 'All-Others';
		// Check if page name string has ":".
		if ( strpos( $page_name, ':' ) !== false ) {
			// It has ":" -> extract the word before because it is the page type.
			$arr       = explode( ':', $page_name, 2 );
			$page_type = $arr[0]; // Get the first array.
		}
		return $page_type;
	}




	/**
	 * GET DEFAULT INFO BOX CLASS
	 *
	 * DESC: If there is no page visits yet, display info box.
	 *       Else, hide it.
	 *
	 * @param  $pages_data  array
	 * @return  array
	 * @since 1.0.0
	 */
	public function get_default_info_box_class( $pages_data ) {
		if ( $pages_data['displ_expl'] === true ) {
			// There is no data yet - display explanation by default.
			$info_box_class                = '';
			$quick_info_btn_class          = 'StrCPVisits_icon_btn_disabled';
			$filter_menu_icon_class        = 'StrCPVisits_icon_btn_disabled';
			$reset_menu_icon_class         = 'StrCPVisits_icon_btn_disabled';
			$reset_menu_icon_wrapper_class = 'StrCPVisits_icon_btn_wrapper_disabled';
			$options_menu_btns_class       = 'disabled';
		} else {
			$info_box_class                = 'hidden';
			$quick_info_btn_class          = '';
			$filter_menu_icon_class        = '';
			$reset_menu_icon_class         = '';
			$reset_menu_icon_wrapper_class = '';
			$options_menu_btns_class       = '';
		}
		$default_classes = [
			'info_box'                => $info_box_class,
			'quick_info_btn'          => $quick_info_btn_class,
			'filter_menu_icon'        => $filter_menu_icon_class,
			'reset_menu_icon'         => $reset_menu_icon_class,
			'reset_menu_icon_wrapper' => $reset_menu_icon_wrapper_class,
			'options_menu_btns'       => $options_menu_btns_class,
		];
		return $default_classes;
	}




	/**
	 * DISPLAY TOTAL PAGE VISITS
	 *
	 * DESC: Display total page visits - exclude page reloads.
	 *
	 * @param  $pages_data  array
	 * @since 1.0.0
	 */
	public function display_total_page_visits( $pages_data ) {
		?>
			<!-- HTML CONTENT -->
			<div class='StrCPVisits_db_total_page_visits_box'>
				<p>TOTAL PAGE VISITS<br>No Reloads</p>
				<p id='StrCPVisits_js_db_total_page_visits' class='StrCPVisits_db_total_page_visits'><?php echo $pages_data['total_visits']; ?></p>
				<!-- Loading spinner -->
				<div id="StrCPVisits-js-db-total-page-visits-spinner" class="StrCPVisits-loading-spinner-wrapper-toggle">
					<div class="StrCPVisits-loading-spinner">
						<!--Element for spinner made with HTML + CSS-->
						<div class="StrCPVisits-spinner-loader"></div>
					</div>
				</div>
			</div>


		<?php
	}




	/**
	 * DISPLAY TOTAL VISITS
	 *
	 * DESC: Display all visits - include page reloads.
	 *
	 * @since 1.0.0
	 */
	public function display_total_visits() {
		$option_name = STRCPV_OPT_NAME['total_visits'];
		$total_visits = ( get_option( $option_name ) === false ) ? 0 : get_option( $option_name ); // Set default value to 0 if there are no data.
		?>
			<div class='StrCPVisits_db_total_visits_box'>
				<p>TOTAL INDEPENDENT<br>Loads & Reloads</p>
				<p id="StrCPVisits_js_db_total_visits_box_nr" class='StrCPVisits_db_total_page_visits'><?php echo $total_visits; ?></p>
				<!-- Edit icon -->
				<span id="StrCPVisits_js_db_edit_total_visits_icon" class="StrCPVisits_icon_btn dashicons dashicons-edit"></span>
				<?php $this->add_hidden_edit_total_visits_box( $total_visits ); ?>
			</div>
		<?php
	}




	/**
	 * ADD HIDDEN EDIT TOTAL VISITS BOX
	 *
	 * DESC: Display edit total visits number form.
	 * INFO: It will slide in  - on total visits edit button click.
	 *
	 * @param  $total_visits  string
	 * @since 1.0.0
	 */
	public function add_hidden_edit_total_visits_box( $total_visits ) {
		?>
			<div id="StrCPVisits_js_db_edit_total_visits_box" class="StrCPVisits_db_edit_total_visits_box">
				<!-- Close X icon -->
				<span id="StrCPVisits_js_db_close_edit_total_visits_box" class="StrCPVisits_icon_btn dashicons dashicons-no-alt"></span>
				<!-- Form -->
				<form id="StrCPVisits-js-db-edit-total-visits-nr-form">
					<input type='number' id='StrCPVisits-js-db-edit-total-visits-nr' class='StrCPVisits-db-edit-total-visits-nr' name='StrCPVisits-db-edit-total-visits-nr' value='<?php echo $total_visits; ?>' min='0'>
					<input type="submit" class="button" value="Update">
					<!-- Response box -->
					<div id="StrCPVisits-js-db-edit-total-visits-respone-box" class="StrCPVisits-db-edit-total-visits-respone-box">
					</div>
				</form>
				<!-- Loading spinner -->
				<div id="StrCPVisits-js-db-edit-total-visits-spinner" class="StrCPVisits-loading-spinner-wrapper-toggle">
					<div class="StrCPVisits-loading-spinner">
						<!--Element for spinner made with HTML + CSS-->
						<div class="StrCPVisits-spinner-loader"></div>
					</div>
				</div>
			</div>
		<?php
	}




	/**
	 * GET EXPLANATION
	 *
	 * DESC: When plugin is installed for the first time and there is no visits yet,
	 *       the explanation is displayed.
	 *
	 * @return  string  HTML code
	 * @since 1.0.0
	 */
	public function get_explanation() {
		// Green text.
		$html_expl =  "<div class='StrCPVisits_db_counting_text_box'>";
		$html_expl .=   "<p>A page is <strong>going to appear</strong> here and <br>visit is going to be counted after one of the listed<br>user roles visits the page:</p>";
		$html_expl .=   "<ul>";
		$html_expl .=	   "<li>Visitor - ( not logged in )</li>";
		$html_expl .=	   "<li>Subscriber - ( logged in )</li>";
		$html_expl .=	   "<li>Author - ( logged in )</li>";
		$html_expl .=	   "<li>Contributor - ( logged in )</li>";
		$html_expl .=	   "<li>Pending - ( logged in )</li>";
		$html_expl .=	   "<li>Customer - ( logged in )</li>";
		$html_expl .=	   "</ul>";
		$html_expl .= "</div>";

		// Red text.
		$html_expl .= "<div class='StrCPVisits_db_not_counting_text_box'>";
		$html_expl .=   "<p>A page is <strong>not going to</strong> appear here and visit is not<br>going to be counted if it is visited by user role:</p>";
		$html_expl .=   "<ul>";
		$html_expl .=	   "<li>Admin - ( logged in )</li>";
		$html_expl .=	   "<li>Editor - ( logged in )</li>";
		$html_expl .=	   "<li>Suspended - ( logged in )</li>";
		$html_expl .=	   "<li>Shop manager - ( logged in )</li>";
		$html_expl .=	   "<li>Custom user role - ( logged in )</li>";
		$html_expl .=   "</ul>";
		$html_expl .= "</div>";

		// Red Sentence.
		$html_expl .= "<p class='StrCPVisits_db_not_counting_sentence'>A page visit is not going to be counted if page is refreshed.</p>";

		// Red Sentence.
		$html_expl .= "<p class='StrCPVisits_db_not_counting_sentence'>( Please flush the cache memory on all places as described in plugin installation instructions. )</p>";

		// Settings button.
		$html_expl .= "<div class='StrCPVisits_db_settings_btn_wrapper'>";
		$html_expl .=   "<a href='options-general.php?page=strongetic-page-visits-counter-lite' class='button'>";
		$html_expl .=	   "<span>Settings</span>";
		$html_expl .=   "</a>";
		$html_expl .= "</div>";

		return $html_expl;
	}
}
