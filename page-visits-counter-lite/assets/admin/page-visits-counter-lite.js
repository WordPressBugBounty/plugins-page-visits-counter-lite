'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * PUB-SUB observer pattern
 *
 * DESC: This is required for communication with AJAX.
 * INFO: AJAX should be concatenated into separate file from js file.
 *       That way we can exempt ajax file from cashing as ajax communication is protected with NONCE.
 *
 * @since 1.0.0
 */
var StrCPVevents = {

	events: {},

	// Subscribe or ON.
	subscribe: function subscribe(eventName, fn) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(fn);
	},

	// Unsubscribe or OFF.
	unsubscribe: function unsubscribe(eventName, fn) {
		if (this.events[eventName]) {
			for (var i = 0; i < this.events[eventName].length; i++) {
				if (this.events[eventName][i] === fn) {
					this.events[eventName].splice(i, 1);
					break;
				}
			}
		}
	},

	// Publish or emit.
	publish: function publish(eventName, data) {
		if (this.events[eventName]) {
			this.events[eventName].forEach(function (fn) {
				fn(data);
			});
		}
	}

};

/**
 * GLOBAL FUNCTIONS AND VARIABLES
 *
 * DESC: It can be used by JS or AJAX file.
 * TYPE: module revealing pattern
 *
 * @since 1.0.0
 */
var StrCPV = function () {

	/**
  * STRIP HTML TAGS
  *
  * DESC: Before displaying data on frontend make sure to remove script tags < and >.
  *
  * @param string  str - The input string to be processed.
  * @since 1.0.0
  */
	function stripHTMLtags(str) {
		var map = {
			'<': '',
			'>': ''
		};
		return str.replace(/[<>]/g, function (m) {
			return map[m];
		});
	}

	/**
  * COUNT OCCURRENCES in array
  *
  * DESC: If you wish to know how many occurrences of certain value is in array then you should use this method.
  *
  * @param 1 array
  * @param 2 value that you wish to count...
  * @since 1.0.0
  */
	var countOccurrences = function countOccurrences(arr, val) {
		return arr.reduce(function (a, v) {
			return v === val ? a + 1 : a;
		}, 0);
	};

	/**
  * FUNCTIONS GLOB MODULE - END
  *
  * DESC: return property and/or method name to make it publicly available.
  *
  * @since 1.0.0
  */

	return {
		stripHTMLtags: stripHTMLtags,
		countOccurrences: countOccurrences

	};
}(); // functions-glob - module end.

/**
 * JS - IIFE
 *
 * DESC: Wrap app into IIFE for security reasons and to prevent naming conflicts.
 *
 * @since 1.0.0
 */
(function ($) {

	/**
  * POPUP MESSAGE - ON PLUGIN DEACTIVATE
  *
  * @since 1.0.0
  */
	$(document).on('click', '#deactivate-page-visits-counter-lite', function (e) {
		alert(STR_CPVISITS_JS.text_plugin_delete_warning);
	});

	/**
  * BUILD FILTER MENU
  *
  * DESC: On page load create filter menu options.
  * INFO: Invoked in 0500-menu-operations/0020-build-menus-page-type-options.js
  *
  * @type module revealing
  * @param - accepts page-type-names as array parameter
  * @since 1.0.0
  */
	var BuildFilterMenu = function () {

		// Config.
		var All_other_as_last_option = true; // true || false

		// Properties.
		var filter_menu = $('#StrCPVisits_js_db_filter_menu_options_wrapper');
		var page_types_data_arr = []; // page-type-names stripped HTML tags


		// INITIALIZE CONSTRUCTION OF FILTER MENU OPTIONS.
		function init(data_arr) {
			page_types_data_arr = data_arr;
			buildOptions();
		}

		// BUILD FILTER OPTIONS.
		function buildOptions() {
			var all_other_li_el = "";
			var options_li_el = "";

			// For each page type in array build option.
			for (var i = 0; i < page_types_data_arr.length; i++) {
				var page_type_name = page_types_data_arr[i][0];
				var page_type_occurrances_nr = page_types_data_arr[i][1];

				// Build the "All-Others" li element - separately.
				if (page_type_name === "All-Others" && all_other_li_el === "") {
					// Run it only once.
					all_other_li_el = buildOption(page_type_name, page_type_occurrances_nr);
				} else {
					options_li_el += buildOption(page_type_name, page_type_occurrances_nr);
				}
			}
			addFilterOptionsToMenu(all_other_li_el, options_li_el);
		}

		// BUILD ONE FILTER OPTION.
		function buildOption(page_type_name, nr) {
			var html_el = "<li class='StrCPVisits-" + page_type_name + "'>";
			html_el += "<input type='checkbox'  id='StrCPVisits-" + page_type_name + "' value='" + page_type_name + "' checked>";

			if (page_type_name === "All-Others") {
				html_el += "<label for='StrCPVisits-" + page_type_name + "'>(<span class='StrCPVisits_js_db_filter_option_page_type_name_nr'>" + nr + "</span>) " + page_type_name + "</label>";
			} else {
				html_el += "<label for='StrCPVisits-" + page_type_name + "'>(<span class='StrCPVisits_js_db_filter_option_page_type_name_nr'>" + nr + "</span>) " + page_type_name + ": ...</label>";
			}
			html_el += "</li>";
			return html_el;
		}

		/**
   * ADD FILTER OPTIONS TO MENU
   *
   * INFO: This module has config option at the properties level where you can set to display "All other" as first or as last option.
   *
   * @since 1.0.0
   */
		function addFilterOptionsToMenu(all_other_li_el, options_li_el) {

			// If there is a page report that belongs to "All-Others" type, display it as a first reset option.
			if (all_other_li_el != "" && All_other_as_last_option === false) {
				filter_menu.append(all_other_li_el);
			}

			// Add all other reset options.
			filter_menu.append(options_li_el);

			// If there is a page report that belongs to "All-Others" type, display it as a last reset option.
			if (all_other_li_el != "" && All_other_as_last_option === true) {
				filter_menu.append(all_other_li_el);
			}
		}

		return {
			init: init
		};
	}();

	/**
  * TOGGLE FILTER MENU
  *
  * DESC: Click on filter button to toggle filter menu tab.
  * INFO: Close other two menu tabs before expanding filter menu tab.
  *
  * @type MODULE REVEALING - close - this menu tab
  * @since 1.0.0
  */

	var ToggleFilterMenu = function () {

		// Properties.
		var btn = $('#StrCPVisits_js_db_list_filter_btn');
		// Get filter menu el.
		var filter_menu = $('#StrCPVisits_js_db_filter_menu');
		// Displays a shadow to active filter menu icon btn.
		var icon_btn_wrapper = $('#StrCPVisits_js_db_list_filter_btn_wrapper');

		// Click listener.
		btn.click(function () {

			// If button is disabled - ABORT.
			if ($(this).hasClass('StrCPVisits_icon_btn_disabled')) {
				return; // Abort.
			}

			CloseOtherMenus.except(ToggleFilterMenu);

			// Get fresh - filter menu el - and - Toggle info tab.
			if ($('#StrCPVisits_js_db_filter_menu').hasClass('hidden')) {
				displayFilterMenu();
			} else {
				hideFilterMenu();
			}
		});

		function displayFilterMenu() {
			filter_menu.slideDown();
			filter_menu.removeClass('hidden');
			icon_btn_wrapper.addClass('StrCPVisits_icon_active');
			OptionsFilteredNotific.hideNotificVisitsNr();
		}

		function hideFilterMenu() {
			filter_menu.slideUp();
			filter_menu.addClass('hidden');
			icon_btn_wrapper.removeClass('StrCPVisits_icon_active');
			OptionsFilteredNotific.checkAndDisplayNr();
		}

		return {
			close: hideFilterMenu
		};
	}();

	/**
  * FILTER REPORTS
  *
  * DESC: On filter option uncheck (in menu filter):
  *	   - Hide all reports of page type
  *	   - Recalculate total page visits
  *
  * @since 1.0.0
  */
	var FilterReports = function () {

		// Properties.
		var options = $('#StrCPVisits_js_db_filter_menu_options_wrapper');
		var report_list_wrapper = $('#StrCPVisits_js_db_list_wrapper');
		var report_section_elements = void 0; // accordion btn-row.
		var report_div_elements = void 0; // accordion panel.


		// Checkbox click listener.
		options.on('change', 'li > input', function () {

			// Get page-type-name value from clicked input/checkbox el.
			var page_type_name = $(this).val();

			// Select all elements with page-type-name.
			report_section_elements = report_list_wrapper.find("section[data-strcpv-page-type='" + page_type_name + "']");
			report_div_elements = report_list_wrapper.find("div[data-strcpv-page-type='" + page_type_name + "']");

			checkInputState($(this));
		});

		// Check input state. ( Checked or not. )
		function checkInputState(clicked_input_el) {

			if (clicked_input_el.is(':checked')) {
				// Checked.
				displayReports(clicked_input_el);
			} else {
				// Unchecked.
				hideReports(clicked_input_el);
			}

			RecalculateTotalPageNr.calculateFilteredVisits();
		}

		function hideReports(clicked_input_el) {
			// Remove visible indicator class from number holder on filtered out reports.
			report_section_elements.find('.StrCPVisits_db_list_visits_nr').removeClass('StrCPVisits-visible-indicator');

			report_div_elements.hide();
			report_section_elements.hide();
			report_section_elements.removeClass('StrCPVisits_accordion_active');
			// Mark row with indicator class - hidden - which is telling that this row should be hidden even if displayed in search results.
			report_section_elements.addClass('StrCPVisits-hidden-indicator'); // Add line-through styling for page name.
		}

		function displayReports(clicked_input_el) {
			// Add visible indicator class to number holder on filtered in reports.
			report_section_elements.find('.StrCPVisits_db_list_visits_nr').addClass('StrCPVisits-visible-indicator');
			report_section_elements.css('display', 'flex');
			// Remove indicator class - hidden - from row.
			report_section_elements.removeClass('StrCPVisits-hidden-indicator');
		}
	}();

	/**
  * OPTIONS FILTERED NOTIFICATION
  *
  * DESC: Display visits number out of the filter menu if there is at least one option filtered out.
  * INFO: Visits number is displayed above filter menu button.
  *	   Invoked from toggle-menu.js
  *
  * @type Module revealing pattern
  * @since 1.0.0
  */
	var OptionsFilteredNotific = function () {

		function checkAndDisplayNr() {
			var checkboxes = $("#StrCPVisits_js_db_filter_menu_options_wrapper input[type='checkbox']");
			var checkboxes_checked = $("#StrCPVisits_js_db_filter_menu_options_wrapper input[type='checkbox']:checked");

			if (checkboxes.length != checkboxes_checked.length) {
				// There is at least one filtered option after filter menu closed.
				displayNotificVisitsNr();
			}
		}

		function displayNotificVisitsNr() {
			$('#StrCPVisits_js_db_filter_menu_notific_visits_wrapper').fadeIn();
		}

		/**
   * HIDE NOTIFICATION VISITS NR.
   *
   * INFO: Invoked from toggle-menu.js only
   *
   * @since 1.0.0
   */
		function hideNotificVisitsNr() {
			$('#StrCPVisits_js_db_filter_menu_notific_visits_wrapper').hide();
		}

		return {
			checkAndDisplayNr: checkAndDisplayNr,
			hideNotificVisitsNr: hideNotificVisitsNr
		};
	}();

	/**
  * FILTER OPTION -> DELETE
  *
  * DESC: On page report delete - check if that is the last of that page type.
  *	   If that was the last of that page type -> remove that filter option from the filter menu.
  * INFO: Initialized by observer from ajax delete-page.js then
  *	   Check operations done in menu-operations/0020-last-page-type-option-deleted, which has invoked this.
  *
  * @since 1.0.0
  */
	var FilterOption = function () {

		function remove(page_type_name) {
			// Get and remove filter Option.
			var filter_option = $('#StrCPVisits_js_db_filter_menu_options_wrapper').find("li.StrCPVisits-" + page_type_name);
			filter_option.fadeOut();
			// $filter_option.remove();
		}

		return {
			delete: remove
		};
	}();

	/**
  * BUILD RESET MENU
  *
  * DESC: On page load create reset menu options.
  * INFO: Invoked in 0500-menu-operations/0020-build-menus-page-type-options.js
  *
  * @type module revealing
  * @param - accepts page-type-names as array parameter
  * @since 1.0.0
  */
	var BuildResetMenu = function () {

		// Config.
		var All_other_as_last_option = true; // true || false

		// Properties.
		var reset_menu = $('#StrCPVisits_js_db_reset_menu_options_wrapper');
		var page_types_data_arr = []; // page-type-names stripped HTML tags


		// INITIALIZE CONSTRUCTION OF RESET MENU OPTIONS.
		function init(data_arr) {
			page_types_data_arr = data_arr;
			buildOptions();
		}

		// BUILD RESET OPTIONS.
		function buildOptions() {
			var all_other_li_el = "";
			var options_li_el = "";

			// For each page type in array build option.
			for (var i = 0; i < page_types_data_arr.length; i++) {
				var page_type_name = page_types_data_arr[i][0];
				var page_type_occurrances_nr = page_types_data_arr[i][1];

				// Build the "All-Others" li element - separately.
				if (page_type_name === "All-Others" && all_other_li_el === "") {
					// Run it only once.
					all_other_li_el = buildOption(page_type_name, page_type_occurrances_nr);
				} else {
					options_li_el += buildOption(page_type_name, page_type_occurrances_nr);
				}
			}
			addResetOptionsToMenu(all_other_li_el, options_li_el);
		}

		// BUILD ONE RESET OPTION.
		function buildOption(page_type_name, nr) {
			var html_el = "<li class='StrCPVisits-reset-" + page_type_name + "'>";
			html_el += "<div class='StrCPVisits_db_reset_button button' data-strcpvisits-dbreset-page-type-name='" + page_type_name + "'>";
			html_el += buildSpinner();
			html_el += "<span class='StrCPVisits_js_db_reset_buttons_text'>Reset</span>";
			html_el += "</div>";

			// Page type name.
			if (page_type_name === "All-Others") {
				html_el += "<span class='StrCPVisits_js_db_reset_button_page_type_name'>(<span class='StrCPVisits_js_db_reset_button_page_type_name_nr'>" + nr + "</span>) " + page_type_name + "</span>";
			} else {
				html_el += "<span class='StrCPVisits_js_db_reset_button_page_type_name'>(<span class='StrCPVisits_js_db_reset_button_page_type_name_nr'>" + nr + "</span>) " + page_type_name + ": ...</span>";
			}
			html_el += "</li>";
			return html_el;
		}

		function buildSpinner() {
			var html_el = "<!-- Loading spinner -->";
			html_el += "<div class='StrCPVisits-loading-spinner-wrapper-toggle'>";
			html_el += "<div class='StrCPVisits-loading-spinner'>";
			html_el += "<div class='StrCPVisits-spinner-loader'></div>";
			html_el += "</div>";
			html_el += "</div>";
			return html_el;
		}

		/**
   * ADD RESET OPTIONS TO MENU
   *
   * INFO: This module has config option at the properties level where you can set to display "All other" as first or as last option.
   *
   * @since 1.0.0
   */
		function addResetOptionsToMenu(all_other_li_el, options_li_el) {
			// If there is a page report that belongs to "All-Others" type, display it as a first reset option.
			if (all_other_li_el != "" && All_other_as_last_option === false) {
				reset_menu.append(all_other_li_el);
			}

			// Add all other reset options.
			reset_menu.append(options_li_el);

			// If there is a page report that belongs to "All-Others" type, display it as a last reset option.
			if (all_other_li_el != "" && All_other_as_last_option === true) {
				reset_menu.append(all_other_li_el);
			}
		}

		return {
			init: init
		};
	}();

	/**
  * TOGGLE RESET MENU
  *
  * DESC: Click on reset button to toggle reset menu tab.
  * INFO: Close other two menu tabs before expanding reset menu tab.
  *
  * @type MODULE REVEALING - close - this menu tab
  * @since 1.0.0
  */
	var ToggleResetMenu = function () {

		// Properties.
		var btn = $('#StrCPVisits_js_db_list_reset_menu_btn');
		var btn_wrapper = $('#StrCPVisits_js_db_list_reset_menu_btn_wrapper');
		var reset_menu = $('#StrCPVisits_js_db_reset_menu');

		// Click listener.
		btn.click(function () {

			// If button is disabled - ABORT.
			if ($(this).hasClass('StrCPVisits_icon_btn_disabled')) {
				return; // Abort
			}

			CloseOtherMenus.except(ToggleResetMenu);

			// Get fresh - filter menu el - and - Toggle info tab.
			if ($('#StrCPVisits_js_db_reset_menu').hasClass('hidden')) {
				displayResetMenu();
			} else {
				hideResetMenu();
			}
		});

		function displayResetMenu() {
			reset_menu.slideDown();
			reset_menu.removeClass('hidden');
			btn_wrapper.addClass('StrCPVisits_db_list_reset_menu_btn_wrapper_active');
			btn.addClass('StrCPVisits_db_list_reset_menu_btn_active');
		}

		function hideResetMenu() {
			reset_menu.slideUp();
			reset_menu.addClass('hidden');
			btn_wrapper.removeClass('StrCPVisits_db_list_reset_menu_btn_wrapper_active');
			btn.removeClass('StrCPVisits_db_list_reset_menu_btn_active');
		}

		return {
			close: hideResetMenu
		};
	}();

	/**
  * RESET OPTION -> DELETE
  *
  * DESC: On page report delete - check if that is the last of that page type.
  *	   If that was the last of that page type -> remove that reset option from the filter menu.
  * INFO: Initialized by observer from ajax delete-page.js then
  *	   Check operations done in menu-operations/0020-last-page-type-option-deleted, which has invoked this.
  *
  * @since 1.0.0
  */
	var ResetOption = function () {

		function remove(page_type_name) {
			// Get and remove filter Option.
			var reset_option = $('#StrCPVisits_js_db_reset_menu_options_wrapper').find("li.StrCPVisits-reset-" + page_type_name);
			reset_option.fadeOut();
			// reset_option.remove();
		}

		return {
			delete: remove
		};
	}();

	/**
  * EDIT TOTAL VISITS
  *
  * DESC: On edit icon click open edit box.
  *	   On X icon click close edit box.
  *
  * @since 1.0.0
  */
	var EditTotalVisits = function () {

		// Properties.
		var edit_box = $('#StrCPVisits_js_db_edit_total_visits_box');
		var x_icon = $('#StrCPVisits_js_db_close_edit_total_visits_box');
		var edit_icon = $('#StrCPVisits_js_db_edit_total_visits_icon');

		// Click listeners.
		edit_icon.click(function () {
			// Display edit box
			edit_box.slideDown('fast');
		});

		x_icon.click(function () {
			// Hide edit box
			edit_box.slideUp('fast');
		});
	}();

	/**
  * TOGGLE QUICK INFO
  *
  * DESC: Click on info button to toggle quick info menu tab.
  * INFO: Close other two menu tabs before expanding quick info menu tab.
  *
  * @type MODULE REVEALING - close - this menu tab
  * @since 1.0.0
  */
	var QuickInfo = function () {

		// Properties.
		var button = $('#StrCPVisits_js_db_quick_info_btn');
		var info_box = $('#StrCPVisits_js_db_info_box');

		// CLICK EVENT LISTENER.
		button.click(function () {

			// Abort if button is disabled - ( if there is no visits yet... ).
			if ($(this).hasClass('StrCPVisits_icon_btn_disabled')) {
				return;
			}

			CloseOtherMenus.except(QuickInfo);
			// Close SELECT menu.
			SelectToggle.close();

			// Get fresh - info box el - and - toggle it.
			if ($('#StrCPVisits_js_db_info_box').hasClass('hidden')) {
				displayInfoBox();
			} else {
				hideInfoBox();
			}
		});

		function displayInfoBox() {
			info_box.slideDown();
			info_box.removeClass('hidden');
			button.addClass('btn_active');
		}

		/**
   * HIDE INFO BOX
   *
   * DESC: It will close quick-info-box menu
   * INFO: Invoked by:
   *				   -  quick info button click
   *				   -  filter menu button click
   *				   -  Restart button click
   *
   * @since 1.0.0
   */
		function hideInfoBox() {
			info_box.slideUp();
			info_box.addClass('hidden');
			button.removeClass('btn_active');
		}

		return {
			close: hideInfoBox
		};
	}();

	/**
  * DASHBOARD WIDGET - RESET RESPONSE BOXES
  *
  * DESC: On list menu click -> reset response boxes in:
  *		   -  page list sub-tabs
  *		   -  quick reset menu
  *		   -  select icon menu
  *
  * @since 1.0.0
  */
	var ResetResponseBoxes = function () {

		// -------- PROPERTIES: --------

		// Pages list.
		var list_wrapper = $('#StrCPVisits_js_db_list_wrapper');
		var list_row_rsp_box = $('.StrCPVisits_db_list_row_msg_box');

		// Reset menu.
		var reset_menu = $('#StrCPVisits_js_db_reset_menu');
		var reset_menu_rsp_box = $('#StrCPVisits_js_db_reset_response_box');

		// Select icon menu.
		var options_menu = $('#StrCPVisits-js-db-menu');
		var options_menu_rsp_box = $("#StrCPVisits_js_db_select_response_box");

		// -------- CLICK LISTENERS --------


		// PAGES LIST - RESPONSE BOXES.
		list_wrapper.click(function () {
			list_row_rsp_box.slideUp();
		});

		// RESET MENU - RESPONSE BOX.
		reset_menu.click(function () {
			reset_menu_rsp_box.slideUp();
		});

		// SELECT ICON MENU - RESPONSE BOX.
		options_menu.click(function () {
			options_menu_rsp_box.slideUp();
		});
	}();

	/**
  * RECALCULATE TOTAL PAGE VISITS
  *
  * DESC: After single page visits number is updated, reset or deleted recalculate total page visits nr
  *	   and update the total page visits nr in total page visits box.
  * INFO: Invoked by observer from
  *		   - ajax/update-page-visits.js
  *		   - ajax/delete-page.js
  *
  * @type Revealing module
  * @since 1.0.0
  */
	var RecalculateTotalPageNr = function () {

		// Observer listener.
		StrCPVevents.subscribe("StrCPVrecalculateTotalPageNr", function () {
			calculateTotalPageNr();
		});

		/**
   * CALCULATE TOTAL PAGE NR
   *
   * DESC: This will be executed after the:
   *		   - successful page visits number update
   *		   - page report deleted from the report list
   *
   * @since 1.0.0
   */
		function calculateTotalPageNr() {
			// Variables.
			var total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
			var total_visits_holder = $('#StrCPVisits_js_db_total_page_visits');
			// Get all number holder elements - visible and hidden.
			var nr_holder_elements = $('.StrCPVisits_db_list_visits_nr');
			// Calculate total visits.
			var total_visits_nr = calculate(nr_holder_elements);
			// Hide spinner - total page visits number.
			total_page_visits_spinner.hide();
			// Replace total page visits number
			total_visits_holder.text(total_visits_nr); // stripped HTML tags in calculate().
			// Update filtered page number as well.
			calculateFilteredPageNr();
		}

		/**
   * CALCULATE FILTERED PAGE NR.
   *
   * DESC: Summarize all none filtered ( not hidden ) page visit numbers.
   * INFO: It will be updated when:
   *		   - option filtered out
   *		   - option filtered in
   *		   - page visits number updated
   *		   - page deleted from report
   *
   * @since 1.0.0
   */
		function calculateFilteredPageNr() {
			// Get Notification and Filtered visits nr holder early so change can be instant.
			var filtered_notification_visits_holder = $('#StrCPVisits_js_db_filter_menu_notific_nr');
			var filtered_visits_holder = $('#StrCPVisits_js_db_filter_menu_header_nr');

			// Select all visible sections - number holder elements.
			var report_list_wrapper = $('#StrCPVisits_js_db_list_wrapper');
			var visible_nr_holder_elements = report_list_wrapper.find('.StrCPVisits_db_list_row span.StrCPVisits-visible-indicator');
			// Calculate total visits and return the number.
			var total_visits_nr = calculate(visible_nr_holder_elements);

			// Update notification and filtered visits number.
			filtered_visits_holder.text(total_visits_nr); // Stripped HTML tags in calculate().
			filtered_notification_visits_holder.text(total_visits_nr); // Stripped HTML tags in calculate().
		}

		/**
   * CALCULATE
   *
   * DESC: Summarize all row numbers and return the total number.
   *
   * @since 1.0.0
   */
		function calculate(nr_holder_elements) {
			var total_visits = 0;

			// Calculate new total page visits number.
			for (var i = 0; i < nr_holder_elements.length; i++) {
				var page_visits_nr = Number(StrCPV.stripHTMLtags(nr_holder_elements.eq(i).text()));
				total_visits = total_visits + page_visits_nr;
			}
			return total_visits;
		}

		// Reveal the calculate method so it can be reused in recalc-filtered-visits.js
		return {
			calculateFilteredVisits: calculateFilteredPageNr
		};
	}();

	/**
  * SORT OPTION  (A-Z || Z-A)
  *
  * DESC: On "A-Z" button click sort page reports alphabetically and on another click reverse sorting from Z-A.
  *
  * @since 1.0.0
  */
	var SortByPageNames = function () {

		var sort_btn = $('#StrCPVisits_js_db_options_menu_sort_btn');
		var btn_txt_a_z = $('#StrCPVisits_js_db_options_menu_sort_btn_a-z');
		var btn_txt_z_a = $('#StrCPVisits_js_db_options_menu_sort_btn_z-a');
		var reports_wrapper = void 0;
		var report_buttons = void 0;
		var page_names_arr = [];

		sort_btn.click(function () {

			// If button disabled -> Abort.
			if (sort_btn.hasClass('disabled')) {
				return; // Abort
			}

			getAllPageNames();
			sortArray($(this));
			updateReportsWrapper();
		});

		// Get all page names and push them to array.
		function getAllPageNames() {
			// Get report wrapper and set it as property value.
			reports_wrapper = $('#StrCPVisits_js_db_list_wrapper');
			// Get report button elements and set it as property value.
			report_buttons = reports_wrapper.find('.StrCPVisits_db_list_row');

			// Loop through all buttons and get page names.
			for (var i = 0; i < report_buttons.length; i++) {
				var btn = report_buttons.eq(i);
				var page_name = btn.attr('data-strcpv-page-name');
				page_names_arr.push(page_name);
			}
		}

		/**
   * SORT ARRAY
   *
   * DESC: By the button state determine how to sort the page reports.
   *	   Either A-Z or Z-A.
   *
   * @param sort_btn - clicked btn el - fresh to pick up changes
   * @since 1.0.0
   */
		function sortArray(sort_btn) {

			// Sort alphabetically  - case insensitive.
			page_names_arr.sort(function (a, b) {
				var nameA = a.toLowerCase(),
				    nameB = b.toLowerCase();
				if (nameA < nameB) //sort string ascending
					return -1;
				if (nameA > nameB) return 1;
				return 0; // Default - return value - no sorting
			});

			if (sort_btn.hasClass("StrCPVisits_js_db_sort_btn_state_a-z")) {
				// STATE A-Z.
				btn_txt_a_z.hide();
				btn_txt_z_a.show();
				sort_btn.removeClass("StrCPVisits_js_db_sort_btn_state_a-z");
			} else {
				// STATE Z-A.
				page_names_arr.reverse();
				btn_txt_a_z.show();
				btn_txt_z_a.hide();
				sort_btn.addClass("StrCPVisits_js_db_sort_btn_state_a-z");
			}
		}

		/**
   * UPDATE REPORTS WRAPPER
   *
   * DESC: Get sorted page names from array and accordingly rebuild elements in reports wrapper.
   *
   * @since 1.0.0
   */
		function updateReportsWrapper() {
			var reports_wrapper_clone = reports_wrapper.clone();
			reports_wrapper.html("");

			// Loop through page names array.
			for (var i = 0; i < page_names_arr.length; i++) {
				// Get page name from sorted array.
				var page_name = page_names_arr[i];

				// Get elements by name.
				var report_btn = reports_wrapper_clone.find(".StrCPVisits_db_list_row[data-strcpv-page-name='" + page_name + "']");
				var report_btn_row_tab = report_btn.next('.StrCPVisits_db_list_row_tab');

				// Add elements to reports wrapper.
				reports_wrapper.append(report_btn);
				reports_wrapper.append(report_btn_row_tab);
			}
			// Reset clone variable.
			reports_wrapper_clone = "";
		}
	}();

	/**
  * SELECT OPTION
  *
  * DESC: On select button click display checkboxes instead of arrows in dashboard report list
  *	   and slide down the options menu.
  *	   On close menu, close select-by-type menu also.
  * INFO: On select menu active - hide row trash option.
  *
  * @since 1.0.0
  */
	var SelectToggle = function () {

		// Properties.
		var select_btn = $('#StrCPVisits_js_db_options_menu_select_btn');
		var select_menu = $('#StrCPVisits_js_db_select_menu');
		var icons_menu = $('#StrCPVisits_js_db_select_icon_menu');
		var list_rows = void 0;
		var list_checkboxes = void 0;
		var list_trash_buttons = void 0;

		// Select button click event.
		select_btn.click(function () {

			// If button disabled -> Abort
			if (select_btn.hasClass('disabled')) {
				return; // Abort.
			}

			setPropertyValues();

			if (select_menu.is(':visible')) {
				hideMenu();
			} else {
				/**
     * Count how many reports there are under each page type and display number in format
     * current_nr_in_list/total_nr_of_reports - ( visible and hidden lists ).
     */
				CountVisibleReports.init();
				displayMenu();
			}

			// Close quick info menu.
			QuickInfo.close();
		});

		function setPropertyValues() {
			list_rows = $('#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row');
			list_checkboxes = $('.StrCPVisits_db_list_chkbox_toggle_wrapper');
			list_trash_buttons = $('.StrCPVisits-dblist-delete-page-btn');
		}

		function displayMenu() {
			select_btn.addClass('button_active_background_color');
			select_menu.slideDown();
			list_checkboxes.show();
			icons_menu.fadeIn();
			// Hide arrows.
			list_rows.addClass('StrCPVisits_db_list_row_select_active');
			// Hide trash options in list rows sub-tabs.
			list_trash_buttons.hide();
			// If everything is deleted from the list - disable select-all option, else enable it.
			StrCPVevents.publish("StrCPVisEverythingDeletedInList");
		}

		function hideMenu() {
			select_btn.removeClass('button_active_background_color');
			select_menu.slideUp();
			list_checkboxes.hide();
			icons_menu.fadeOut();
			// Display arrows.
			list_rows.removeClass('StrCPVisits_db_list_row_select_active');
			// Display trash options in list rows sub-tabs.
			list_trash_buttons.show();
			// Close Select-By-Page-Type menu.
			SelectByTypeToggle.close();
		}

		/**
   * CLOSE MENU
   *
   * DESC: This function is used for closing the menu externally.
   * @since 1.0.0
   */
		function closeMenu() {
			setPropertyValues();
			hideMenu();
		}

		return {
			close: closeMenu
		};
	}();

	/**
  * ENABLE ICONS
  *
  * DESC: On select report from the report list - enable select icons-menu.
  *	   On unselect all reports - disable select icon menu.
  *	   Also listen for change in select-by-type and run the check.
  *	   Reveal the module so it can be triggered from the select/deselect all module.
  *
  * @type: Module revealing
  * @since 1.0.0
  */
	var EnableIcons = function () {

		// Properties.
		var icon_menu_buttons = $('#StrCPVisits_js_db_select_icon_menu a');
		var icon_menu_btns_hidden_list = $("#StrCPVisits_js_db_select_icon_menu a:not('#StrCPVisits_js_db_select_set_hidden_btn')");
		var icon_menu_butns_visible_list = $("#StrCPVisits_js_db_select_icon_menu a:not('#StrCPVisits_js_db_select_set_visible_btn')");
		var list_type_obj = void 0;

		// LISTENERS:

		// Listen to ajax selection delete success and disable the icons-menu after all selected page reports are deleted.
		StrCPVevents.subscribe("StrCPVdisableIconMenu", disableIconsMenu);

		// Listen to checkbox change in report list.
		$('#StrCPVisits_js_db_list_wrapper').on('change', '.StrCPVisits_db_list_chkbox', checkNrOfSelectedReportOptions);
		$('#StrCPVisits_js_db_page_type_menu').on('change', '.StrCPVisits-select-by-type-option', checkNrOfSelectedByPageTypeOptions);

		/**
   * CHECK NR OF SELECTED REPORT OPTIONS
   *
   * DESC: Count all checked checkboxes in report list.
   *	   If there is at least one checked checkbox, enable select icons menu, else disable it.
   *
   * @since 1.0.0
   */
		function checkNrOfSelectedReportOptions() {

			setPropertyValues();

			var checkboxes_checked_nr_visible = $(".StrCPVisits_db_list_chkbox:checked:visible").length;
			// console.log( checkboxes_checked_nr_visible );

			if (checkboxes_checked_nr_visible > 0) {
				enableIconsMenu();
			} else {
				disableIconsMenu();
			}
		}

		function setPropertyValues() {
			list_type_obj = ToggleHiddenReports.getListType();
		}

		/**
   * CHECK NR OF SELECTED BY PAGE TYPE OPTIONS
   *
   * DESC: Count all checked checkboxes in select-by-page-type menu list.
   *	   If there is at least one checked checkbox, enable select icons menu, else disable it.
   *
   * @since 1.0.0
   */
		function checkNrOfSelectedByPageTypeOptions() {
			var checkboxes_checked_nr = $(".StrCPVisits-select-by-type-option:checked").length;
			// console.log( checkboxes_checked_nr );

			if (checkboxes_checked_nr > 0) {
				enableIconsMenu();
			} else {
				disableIconsMenu();
			}
		}

		/**
   * ENABLE ICONS MENU
   *
   * DESC: Check the current list type - hidden or visible.
   *	   Accordingly to the list type enable icons in the icons menu_
   *		   - Hidden list - has set to hidden button DISABLED
   *		   - Visible list - has set to visible button DISABLED
   *
   * @since 1.0.0
   */
		function enableIconsMenu() {
			setPropertyValues();

			// Check list type. ( Hidden or visible )
			if (list_type_obj.open_list_type === "list-hidden") {
				/**
     * LIST HIDDEN
     *
     * DESC: Enable all icon menu buttons except set-hidden button.
     */
				icon_menu_btns_hidden_list.removeClass('StrCPVisits_icon_btn_disabled');
			} else {
				/**
     * LIST VISIBLE
     *
     * DESC: Enable all icon menu button except set-visible button.
     */
				icon_menu_butns_visible_list.removeClass('StrCPVisits_icon_btn_disabled');
			}
			// All icon menu buttons active.
			icon_menu_buttons.addClass('StrCPVisits_db_select_icon_menu_active');
		}

		function disableIconsMenu() {
			// Disable all icon menu buttons.
			icon_menu_buttons.addClass('StrCPVisits_icon_btn_disabled');
			// All icon menu inactive.
			icon_menu_buttons.removeClass('StrCPVisits_db_select_icon_menu_active');
		}

		return {
			true: enableIconsMenu,
			false: disableIconsMenu,
			reset: disableIconsMenu
		};
	}();

	/**
  * SELECT ALL/NONE
  *
  * DESC: On select all option click - select/check all visible rows.
  *	   On deselect all option click - unselect/uncheck all visible rows.
  *
  * @type Module revealing
  * @since 1.0.0
  */
	var SelectAllToggle = function () {

		// Properties.
		var select_all_option = $('#StrCPVisits_js_db_select_menu_select_all_toggle');
		var select_all_text = void 0;
		var deselect_all_text = void 0;
		var list_rows = void 0;
		var list_checkboxes = void 0;
		var select_by_type_options_enabled = void 0;

		// Click event listener.
		select_all_option.click(function (e) {
			e.preventDefault();

			// Check if option is disabled -> Abort.
			if (select_all_option.hasClass('disabled')) {
				return; // Abort
			}

			setPropertyValues();
			if (select_all_text.is(':visible')) {
				selectAll();
			} else {
				deselectAll();
			}
		});

		function setPropertyValues() {
			select_all_text = $('#StrCPVisits_js_db_select_menu_text_select_all');
			deselect_all_text = $('#StrCPVisits_js_db_select_menu_text_deselect_all');
			list_rows = $('#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row:visible');
			list_checkboxes = list_rows.find('.StrCPVisits_db_list_chkbox');
			select_by_type_options_enabled = $('.StrCPVisits-select-by-type-option:enabled');
		}

		function selectAll() {
			select_all_text.hide();
			deselect_all_text.show();
			list_checkboxes.prop('checked', true); // Check All.
			select_by_type_options_enabled.prop('checked', true); // Check All - select by type options.
			EnableIcons.true();
		}

		function deselectAll() {
			select_all_text.show();
			deselect_all_text.hide();
			list_checkboxes.prop('checked', false); // Uncheck All.
			select_by_type_options_enabled.prop('checked', false); // Uncheck All - select by type options.
			EnableIcons.false();
		}

		/**
   * DISPLAY SELECT ALL
   *
   * DESC: Change link text to Select-All from outside this module.
   *
   * @since 1.0.0
   */
		function displaySelectAll() {
			select_all_text = $('#StrCPVisits_js_db_select_menu_text_select_all');
			deselect_all_text = $('#StrCPVisits_js_db_select_menu_text_deselect_all');
			select_all_text.show();
			deselect_all_text.hide();
		}

		/**
   * DISPLAY DESELECT ALL
   *
   * DESC: Change link text to Deselect-All from outside this module.
   *
   * @since 1.0.0
   */
		function displayDeselectAll() {
			select_all_text = $('#StrCPVisits_js_db_select_menu_text_select_all');
			deselect_all_text = $('#StrCPVisits_js_db_select_menu_text_deselect_all');
			select_all_text.hide();
			deselect_all_text.show();
		}

		/**
   * DISABLE
   *
   * DESC: Change link text to Select-All from outside this module and disable its click event.
   *
   * @since 1.0.0
   */
		function disable() {
			displaySelectAll();
			select_all_option.addClass('disabled');
		}

		/**
   * ENABLE
   *
   * DESC: Enable select-all / deselect-all option.
   *
   * @since 1.0.0
   */
		function enable() {
			select_all_option.removeClass('disabled');
		}

		return {
			changeToSelectAll: displaySelectAll,
			changeToDeselectAll: displayDeselectAll,
			reset: displaySelectAll,
			disable: disable,
			enable: enable
		};
	}();

	/**
  * SELECT BY PAGE TYPE TOGGLE
  *
  * DESC: On select button click display checkboxes instead of arrows in dashboard report list.
  *
  * @since 1.0.0
  */
	var SelectByTypeToggle = function () {

		// Properties.
		var select_btn = $('#StrCPVisits_js_db_select_menu_select_by_type_toggle');
		var select_btn_txt = $('#StrCPVisits_js_db_select_menu_select_by_type_text');
		var select_btn_close_txt = $('#StrCPVisits_js_db_select_menu_select_by_type_close_text');
		var select_menu = $('#StrCPVisits_js_db_page_type_menu');

		// Click event listener.
		select_btn.click(function (e) {
			e.preventDefault();
			if (select_menu.is(':visible')) {
				hideMenu();
			} else {
				displayMenu();
			}
		});

		function displayMenu() {
			select_menu.slideDown();
			// Replace text.
			select_btn_txt.hide();
			select_btn_close_txt.show();
		}

		function hideMenu() {
			select_menu.slideUp();
			// Replace text.
			select_btn_txt.show();
			select_btn_close_txt.hide();
		}

		return {
			close: hideMenu
		};
	}();

	/**
  * BUILD SELECT-BY-PAGE-TYPE MENU
  *
  * DESC: On page load create menu options.
  * INFO: Invoked in 0500-menu-operations/0020-build-menus-page-type-options.js
  *
  * @type module revealing
  * @param - accepts page-type-names as array parameter
  * @since 1.0.0
  */
	var BuildSelectByTypeMenu = function () {

		// Config.
		var All_other_as_last_option = true; // TRUE || FALSE.

		// Properties.
		var menu = $('#StrCPVisits_js_db_page_type_menu > ul');
		var page_types_data_arr = []; // page-type-names stripped HTML tags.


		// INITIALIZE CONSTRUCTION OF FILTER MENU OPTIONS.
		function init(data_arr) {
			page_types_data_arr = data_arr;
			buildOptions();
		}

		// BUILD OPTIONS.
		function buildOptions() {
			var all_other_li_el = "";
			var options_li_el = "";

			// For each page type in array build option.
			for (var i = 0; i < page_types_data_arr.length; i++) {
				var page_type_name = page_types_data_arr[i][0];
				var page_type_occurrances_nr = page_types_data_arr[i][1];

				// Build the "All-Others" li element - separately.
				if (page_type_name === "All-Others" && all_other_li_el === "") {
					// Run it only once.
					all_other_li_el = buildOption(page_type_name, page_type_occurrances_nr);
				} else {
					options_li_el += buildOption(page_type_name, page_type_occurrances_nr);
				}
			}
			addFilterOptionsToMenu(all_other_li_el, options_li_el);
		}

		// BUILD ONE FILTER OPTION.
		function buildOption(page_type_name, nr) {
			var html_el = "<li class='StrCPVisits-select-" + page_type_name + "'>";
			html_el += "<input type='checkbox'  id='StrCPVisits-select-" + page_type_name + "' class='StrCPVisits-select-by-type-option' value='" + page_type_name + "'>";

			var number = "<span class='StrCPVisits_js_select_by_type_option_nr'>" + nr + "</span>/<span class='StrCPVisits_js_select_by_type_option_total_nr'>" + nr + "</span>";

			if (page_type_name === "All-Others") {
				html_el += "<label for='StrCPVisits-select-" + page_type_name + "'>(" + number + ") " + page_type_name + "</label>";
			} else {
				html_el += "<label for='StrCPVisits-select-" + page_type_name + "'>(" + number + ") " + page_type_name + ": ...</label>";
			}
			html_el += "</li>";
			return html_el;
		}

		/**
   * ADD FILTER OPTIONS TO MENU
   *
   * INFO: This module has config option at the properties level where you can set to display "All other" as first or as last option.
   *
   * @since 1.0.0
   */
		function addFilterOptionsToMenu(all_other_li_el, options_li_el) {

			// If there is a page report that belongs to "All-Others" type, display it as a first reset option.
			if (all_other_li_el != "" && All_other_as_last_option === false) {
				menu.append(all_other_li_el);
			}

			// Add all other reset options.
			menu.append(options_li_el);

			// If there is a page report that belongs to "All-Others" type, display it as a last reset option.
			if (all_other_li_el != "" && All_other_as_last_option === true) {
				menu.append(all_other_li_el);
			}

			/**
    * INFO:
    * Initialization of Count number of reports under each page type
    * is set in select-toggle.js ( SELECT - TOGGLE BUTTON ).
    */
		}

		return {
			init: init
		};
	}();

	/**
  * SELECT BY TYPE OPTION -> DELETE
  *
  * DESC: On page report delete - check if that is the last of that page type.
  *	   If that was the last of that page type -> remove that select-by-page-type option from the select-by-page-type menu.
  * INFO: Initialized by observer from ajax delete-page.js then
  *	   Check operations done in menu-operations/0020-last-page-type-option-deleted, which has invoked this.
  *
  * @since 1.0.0
  */
	var SelectByTypeOption = function () {

		function remove(page_type_name) {
			// Get and remove Select-By-Type Option.
			var option = $('#StrCPVisits_js_db_page_type_menu > ul').find("li.StrCPVisits-select-" + page_type_name);
			option.fadeOut(400, function () {
				option.remove();
			});
		}

		return {
			delete: remove
		};
	}();

	/**
  * SELECTING BY TYPE
  *
  * DESC: When page type option checked, check all pages with under that type and vice versa.
  * INFO: It has a reset option.
  *
  * @type: Module revealing
  * @since 1.0.0
  */
	var SelectingByType = function () {

		// Properties,
		var page_type_name = void 0;
		var page_checkboxes_visible = void 0;

		// Listen to checkbox change.
		$('#StrCPVisits_js_db_page_type_menu').on('change', '.StrCPVisits-select-by-type-option', function () {
			setPropertyValues($(this));
			isChkboxChecked($(this));
			checkSelectAll();
		});

		function setPropertyValues(checked_input_chkbox) {
			page_type_name = checked_input_chkbox.val();
			var page_rows_visible = $('#StrCPVisits_js_db_list_wrapper').find(".StrCPVisits_db_list_row[data-strcpv-page-type='" + page_type_name + "']:visible");
			page_checkboxes_visible = page_rows_visible.find('.StrCPVisits_db_list_chkbox');
		}

		function isChkboxChecked(current_chkbox) {
			if (current_chkbox.is(':checked')) {
				// Select all pages under this type.
				page_checkboxes_visible.prop('checked', true);
			} else {
				// Deselect all pages under this type.
				page_checkboxes_visible.prop('checked', false);
			}
		}

		function checkSelectAll() {
			// Select and count all checkboxes in select-by-type menu.
			var checkbox_nr_visible = $('.StrCPVisits-select-by-type-option:visible').length;
			// Select and count all checkboxes in select-by-type menu that are selected.
			var checkbox_selected_nr_visible = $('.StrCPVisits-select-by-type-option:checked:visible').length;
			// console.log(checkbox_nr_visible);
			// console.log(checkbox_selected_nr_visible);

			if (checkbox_nr_visible === checkbox_selected_nr_visible) {
				// ALL SELECTED.
				SelectAllToggle.changeToDeselectAll();
			} else if (checkbox_selected_nr_visible == 0) {
				// ALL UNSELECTED.
				SelectAllToggle.changeToSelectAll();
			}
		}

		/**
   * DESELECT ALL
   *
   * DESC: Invoke this method from the outside of this module.
   *
   * @since 1.0.0
   */
		function deselectAll() {
			// Select all checkboxes in select-by-type menu.
			var checkboxes = $('.StrCPVisits-select-by-type-option');
			// Deselect.
			checkboxes.prop('checked', false);
		}

		return {
			reset: deselectAll
		};
	}();

	/**
  * SELECTING BY TYPE UPDATE
  *
  * DESC: When selecting reports - check if all reports from page-type are selected
  *	   and if they are, automatically select that option in select-by-page-type menu.
  *	   For the opposite action use unselect the page type in the end.
  *
  *	   Also - change the Select-All / Deselect All link.
  *
  * @since 1.0.0
  */
	var SelectingByTypeUpdate = function () {

		// Properties.
		var page_type_name = void 0;

		// Listen to checkbox change in report list.
		$('#StrCPVisits_js_db_list_wrapper').on('change', '.StrCPVisits_db_list_chkbox', function () {
			page_type_name = StrCPV.stripHTMLtags($(this).attr('data-StrCPV-inp-page-type'));
			compareNrOfSelectedOptionsByPageType();
			compareNrOfSelectedOptionsForSelectAllLink();
		});

		function compareNrOfSelectedOptionsByPageType() {
			// Select and count all report input checkboxes under clicked type (checked or unchecked).
			var occurances_nr_visible = $(".StrCPVisits_db_list_chkbox[data-StrCPV-inp-page-type='" + page_type_name + "']:visible").length;
			var occurances_checked_nr_visible = $(".StrCPVisits_db_list_chkbox[data-StrCPV-inp-page-type='" + page_type_name + "']:checked:visible").length;
			// console.log(occurances_nr_visible);
			// console.log(occurances_checked_nr_visible);

			if (occurances_nr_visible === occurances_checked_nr_visible) {
				// ALL SELECTED - select the option IF IT IS NOT SELECTED in the select-by-the-page-type.
				selectPageType();
			} else if (occurances_checked_nr_visible === 0) {
				// ALL UNSELECTED - unselect the option IF IT IS NOT UNSELECTED in the select-by-the-page-type.
				unselectPageType();
			}
		}

		function selectPageType() {
			// If option type not selected.
			var option_page_type = $("#StrCPVisits-select-" + page_type_name);
			if (!option_page_type.is(':checked')) {
				// Select it.
				option_page_type.prop('checked', true);
			}
		}

		function unselectPageType() {
			// If option type is selected.
			var option_page_type = $("#StrCPVisits-select-" + page_type_name);
			if (option_page_type.is(':checked')) {
				// Unselect it.
				option_page_type.prop('checked', false);
			}
		}

		function compareNrOfSelectedOptionsForSelectAllLink() {
			// Select and count all report input checkboxes.
			var checkboxes_nr_visible = $(".StrCPVisits_db_list_chkbox:visible").length;
			// Select and count all report input checkboxes that are checked.
			var checkboxes_checked_nr_visible = $(".StrCPVisits_db_list_chkbox:checked:visible").length;
			// console.log(checkboxes_nr_visible);
			// console.log(checkboxes_checked_nr_visible);

			if (checkboxes_nr_visible === checkboxes_checked_nr_visible) {
				// ALL SELECTED.
				SelectAllToggle.changeToDeselectAll();
			} else if (checkboxes_checked_nr_visible === 0) {
				// ALL UNSELECTED.
				SelectAllToggle.changeToSelectAll();
			}
		}
	}();

	/**
  * COUNT VISIBLE REPORTS
  *
  * @type: Module revealing
  * @since 1.0.0
  */
	var CountVisibleReports = function () {

		var select_by_type_options = void 0;
		var select_option_displayed_nr = void 0;
		var select_option_displayed_total_nr = void 0;
		var list_type_obj = void 0; // {current_list_type: "list-hidden", open_list_type: "list-visible"}
		var select_option = void 0;
		var page_type_name = void 0;

		// Listen to ajax delete event/s - single page report and multiple selections delete.
		// Listen to ajax set-as-visible.js and set-as-hidden.js
		StrCPVevents.subscribe("StrCPVcountAndUpdatePageByTypeReportsNr", init);

		function init() {
			setPropertyValues();

			// For each page-type-name.
			for (var i = 0; i < select_by_type_options.length; i++) {
				select_option = select_by_type_options.eq(i);
				page_type_name = select_option.val();
				select_option_displayed_nr = select_option.closest(".StrCPVisits-select-" + page_type_name).find('.StrCPVisits_js_select_by_type_option_nr');
				select_option_displayed_total_nr = select_option.closest(".StrCPVisits-select-" + page_type_name).find('.StrCPVisits_js_select_by_type_option_total_nr');

				detectListType();
				countTotalReportsInPageType();
			}
		}

		function setPropertyValues() {
			select_by_type_options = $('.StrCPVisits-select-by-type-option');
			// Get list type obj - {current_list_type: "list-hidden", open_list_type: "list-visible"}.
			list_type_obj = ToggleHiddenReports.getListType();
		}

		function detectListType() {
			if (list_type_obj.open_list_type === "list-hidden") {
				// LIST HIDDEN.
				HiddenListCountHiddenReportsInPageType();
			} else if (list_type_obj.open_list_type === "list-visible") {
				// LIST VISIBLE.
				VisibleListCountReportsInPageType();
			} else {
				// Page is loaded - default list type is LIST-VISIBLE.
				// console.log('default list type');
				VisibleListCountReportsInPageType();
			}
		}

		function VisibleListCountReportsInPageType() {
			var visible_reports_nr = $(".StrCPVisits_db_list_row:not('.StrCPVisits-hidden-indicator')[data-strcpv-page-type='" + page_type_name + "']").length;
			// console.log(visible_reports_nr);
			displayListCountedNr(visible_reports_nr);
		}

		function HiddenListCountHiddenReportsInPageType() {

			var hidden_reports_nr = $(".StrCPVisits_db_list_row.StrCPVisits-hidden-indicator[data-strcpv-page-type='" + page_type_name + "']").length;
			// console.log(hidden_reports_nr);
			displayListCountedNr(hidden_reports_nr);
		}

		function displayListCountedNr(nr) {
			// Add counted number ( in list ) to the select-by-type element.
			select_option_displayed_nr.text(nr);

			/**
    * Hide select-by-type option if number of reports in current list is zero,
    * else display the option.
    */
			if (nr == 0) {
				select_option.prop('checked', false); // Uncheck.
				select_option.attr('disabled', true); // Disable.
			} else {
				select_option.attr('disabled', false); // Enable.
			}
		}

		function countTotalReportsInPageType() {
			var total_reports_nr = $(".StrCPVisits_db_list_row[data-strcpv-page-type='" + page_type_name + "']").length;
			displayTotalCountedNr(total_reports_nr);
		}

		function displayTotalCountedNr(total_nr) {
			// Add total number to the select-by-type element.
			select_option_displayed_total_nr.text(total_nr);
		}

		return {
			init: init
		};
	}();

	/**
  * SELECT REPORT
  *
  * DESC: The Purpose of this module is to reset all visible checkboxes in report list.
  *
  * @type Module revealing
  * @since 1.0.0
  */
	var SelectReport = function () {

		// Properties.
		var reports_chkboxes = $('.StrCPVisits_db_list_chkbox');

		function uncheckAllCheckboxes() {
			reports_chkboxes.prop('checked', false); // Disable.
		}

		return {
			reset: uncheckAllCheckboxes
		};
	}();

	/**
  * TOGGLE HIDDEN REPORTS
  *
  * DESC: On options eyes icons click - toggle hidden and visible reports in reports list.
  *
  * @type Module revealing
  * @since 1.0.0
  */
	var ToggleHiddenReports = function () {

		var toggle_button = $('#StrCPVisits_js_db_options_menu_hidden_toggle_btn');
		var btn_icon_visible = $('#StrCPVisits_js_db_options_menu_visible_icon');
		var btn_icon_hidden = $('#StrCPVisits_js_db_options_menu_hidden_icon');
		var report_options_sub_tabs = $('.StrCPVisits_db_list_row_tab');
		var report_options_visible = void 0;
		var report_options_hidden = void 0;
		var list_type = void 0;

		toggle_button.click(function () {

			// If button disabled -> Abort.
			if (toggle_button.hasClass('disabled')) {
				return; // Abort.
			}

			setPropertyValues();
			checkSelectionsInCurrentList();
		});

		function setPropertyValues() {
			report_options_visible = $("#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row:not('.StrCPVisits-hidden-indicator')");
			report_options_hidden = $('#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row.StrCPVisits-hidden-indicator');

			// Check which icon is visible/active and accordingly set current list type.
			if (btn_icon_hidden.is(':visible')) {
				// HIDDEN.
				list_type = "list-hidden";
			} else {
				// VISIBLE.
				list_type = "list-visible";
			}
		}

		/**
   * CHECK SELECTIONS IN CURRENT LIST
   *
   * DESC: Check if at least one checkbox is selected in the current report list and
   *	   if it is, display a confirm popup message with warning that everything that
   *	   is selected in the list is going to be deselected before switching to another report list.
   *
   * @since 1.0.0
   */
		function checkSelectionsInCurrentList() {

			// Check if at least one visible checkbox is selected in the current report list.
			var selected = isChkboxsSelected(); // TRUE ||FALSE.
			if (selected === false) {
				return; // Abort.
			}

			// Display default Confirm - popup message.
			if (!window.confirm(getMessage())) {
				// User clicked Cancel.
				return; // Abort.
			}

			resetSelectionsInCurrentList();

			switchReport();
		}

		function isChkboxsSelected() {
			// Check if there is at least one checkbox selected.
			var checkbox_checked_nr = $('.StrCPVisits_db_list_chkbox:checked').length;
			if (checkbox_checked_nr > 0) {

				// SOMETHING IS SELECTED.
				return true;
			} else {

				// NOTHING IS SELECTED.
				switchReport();
				return false;
			}
		}

		function getMessage() {
			// Set message.
			var message = void 0;
			// Check the current list type.
			if (list_type === "list-visible") {
				// Message for Hidden list.
				message = STR_CPVISITS.text_switching_to_hidden_list;
			} else if (list_type === "list-hidden") {
				// Message for Visible list.
				message = STR_CPVISITS.text_switching_to_visible_list;
			}
			return message;
		}

		/**
   * RESET SELECTIONS IN CURRENT LIST
   *
   * DESC: Reset all selections in the current list:
   *	   - select all / deselect all
   *	   - select by type
   *	   - reports in the list
   *
   * @since 1.0.0
   */
		function resetSelectionsInCurrentList() {
			SelectAllToggle.reset();
			SelectingByType.reset();
			SelectReport.reset();
			EnableIcons.reset();
		}

		function switchReport() {
			if (list_type === "list-visible") {
				displayHiddenReports();
			} else if (list_type === "list-hidden") {
				displayVisibleReports();
			}
		}

		function displayHiddenReports() {

			activateIconBtnHidden();

			// If there is no report options visible.
			if (report_options_visible.length == 0) {
				// Display hidden reports.
				report_options_hidden.css('display', 'flex'); // Show.
			} else {
				// Animate hidining visible reports and after tha display hidden reports.
				report_options_visible.fadeOut('slow', function () {
					// Display hidden reports.
					report_options_hidden.css('display', 'flex'); // Show.
				});
			}

			doAllAdditionalTasks();
		}

		function activateIconBtnHidden() {
			// Toggle Button - change icon and styling.
			toggle_button.addClass('button_active_background_color');
			btn_icon_hidden.show();
			btn_icon_visible.hide();
		}

		function displayVisibleReports() {

			activateIconBtnVisible();

			// If there is no hidden report.
			if (report_options_hidden.length == 0) {
				// Display report options visible.
				report_options_visible.css('display', 'flex'); // Show.
			} else {
				// Animate hiding hidden reports and after that display visible reports.
				report_options_hidden.fadeOut('slow', function () {
					// Display report options visible.
					report_options_visible.css('display', 'flex'); // Show.
				});
			}

			doAllAdditionalTasks();
		}

		function activateIconBtnVisible() {
			// Toggle Button - change icon and styling.
			toggle_button.removeClass('button_active_background_color');
			btn_icon_hidden.hide();
			btn_icon_visible.show();
		}

		function doAllAdditionalTasks() {
			// Hide all page reports sub-tabs.
			report_options_sub_tabs.hide();

			/**
    * Count how many reports there are under each page type and display the number in format
    * current_nr_in_list/total_nr_of_reports. ( For visible and hidden lists. )
    */
			CountVisibleReports.init();

			// If everything is deleted from the list - disable select-all option, else enable it.
			StrCPVevents.publish("StrCPVisEverythingDeletedInList");

			// Close search menu.
			SearchToggle.close();
		}

		/**
   * GET LIST TYPE
   *
   * DESC: Create response obj which holds data about current list_type  and list type that is going to be displayed.
   * INFO: Invoked from outside this module.
   *
   * @since 1.0.0
   */
		function getListType() {

			var current_list_type = "";
			var open_list_type = "";

			if (list_type === "list-visible") {
				current_list_type = "list-visible";
				open_list_type = "list-hidden";
			} else if (list_type === "list-hidden") {
				current_list_type = "list-hidden";
				open_list_type = "list-visible";
			}

			var list_type_obj = {
				'current_list_type': current_list_type,
				'open_list_type': open_list_type
			};

			return list_type_obj;
		}

		return {
			getListType: getListType
		};
	}();

	/**
  * SEARCH OPTION TOGGLE
  *
  * DESC: On search button click display/hide search menu.
  *
  * @since 1.0.0
  */
	var SearchToggle = function () {

		// Properties.
		var search_btn = $('#StrCPVisits_js_db_options_menu_search_btn');
		var search_menu = $('#StrCPVisits_js_db_search_menu');
		var search_box = $('#StrCPVisits_js_db_search_input_field');

		// Click Event listener.
		search_btn.click(function () {

			// If button disabled -> Abort.
			if (search_btn.hasClass('disabled')) {
				return; // Abort.
			}

			if (search_menu.is(':visible')) {
				hideMenu();
			} else {
				displayMenu();
			}
		});

		function displayMenu() {
			search_btn.addClass('button_active_background_color');
			search_menu.slideDown();
			search_box.keyup();
		}

		function hideMenu() {
			search_btn.removeClass('button_active_background_color');
			search_menu.slideUp();
			SearchFilter.reset();
		}

		return {
			close: hideMenu
		};
	}();

	/**
  * SEARCH OPTION TOGGLE
  *
  * DESC: On typing the name in the search input field automatically filter/hide reports that doesn't match.
  *
  * @type Module revealing
  * @since 1.0.0
  */
	var SearchFilter = function () {

		var reports_wrapper = void 0; // Search list wrapper.
		var report_options = void 0; // List.
		var wait_timer = void 0; // Debouncer.
		var value = void 0;
		var report_option = void 0;

		// KeyUp listener.
		$('#StrCPVisits_js_db_search_input_field').keyup(function () {
			setPropertyValues($(this));
			checkTimer();
		});

		function setPropertyValues(search_box_el) {
			value = search_box_el.val();
			reports_wrapper = $('#StrCPVisits_js_db_list_wrapper'); // Search list wrapper.
			report_options = reports_wrapper.find('.StrCPVisits_db_list_row'); // List.
		}

		// Debouncer - wait 400ms for new updates.
		function checkTimer() {
			clearTimeout(wait_timer);
			wait_timer = setTimeout(function () {
				checkIfValueEmpty();
			}, 400);
		}

		function checkIfValueEmpty() {
			if (value.length == 0) {
				// No search term. ( The term deleted. )
				searchReset();
			} else {
				// There is a search term.
				filterOutReports();
			}
		}

		function filterOutReports() {
			// Loop through all report options.
			for (var i = 0; i < report_options.length; i++) {
				report_option = report_options.eq(i);
				var page_name = report_option.attr('data-strcpv-page-name');
				// Check if report option page name has substring that is typed by user.
				if (!page_name.includes(value)) {
					hideReportOption();
				} else {
					displayReportOption();
				}
			}
		}

		function hideReportOption() {
			// If report option expanded - close it.
			if (report_option.hasClass('StrCPVisits_accordion_active')) {
				report_option.click();
			}
			report_option.hide();
		}

		function displayReportOption() {
			report_option.show();
		}

		/**
   * SEARCH RESET
   *
   * DESC: Restore current list type. Either hidden or visible list.
   *
   * @since 1.0.0
   */
		function searchReset() {
			var list_type_obj = ToggleHiddenReports.getListType();
			var report_options_visible = $("#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row:not('.StrCPVisits-hidden-indicator')");
			var report_options_hidden = $('#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row.StrCPVisits-hidden-indicator');

			if (list_type_obj.open_list_type === "list-hidden") {
				/**
     * DISPLAY HIDDEN LIST
     *
     * DESC: Display all reports with indicator-class-hidden and
     *	   Hide all reports without indicator-class-hidden.
     */
				report_options_visible.hide();
				report_options_hidden.show();
			} else {
				/**
     * DISPLAY VISIBLE LIST
     *
     * DESC: Hide all reports with indicator-class-hidden and
     *	   Display all reports without indicator-class-hidden.
     */
				report_options_visible.show();
				report_options_hidden.hide();
			}
		}

		return {
			reset: searchReset
		};
	}();

	/**
  * CLOSE OTHER MENUS
  *
  * DESC: This is the module for closing all other menus when expanding one of the menus.
  *
  * @type MODULE REVEALING - close - this menu tab
  * @param name of the menu that is opening - string
  * @since 1.0.0
  */
	var CloseOtherMenus = function () {

		// Properties.
		var all_menus_arr = [ToggleResetMenu, ToggleFilterMenu, QuickInfo];

		function closeAllOtherMenus(expanding_menu) {
			for (var i = 0; i < all_menus_arr.length; i++) {
				var menu_name = all_menus_arr[i];
				if (menu_name != expanding_menu) {
					menu_name.close();
				}
			}
		}

		return {
			except: closeAllOtherMenus
		};
	}();

	/**
  * BUILD MENUS PAGE TYPE OPTIONS
  *
  * DESC: On page load get page type options by looping through page options
  *	   and after data are collected and saved into array - duplicate values removed,
  *	   start initializing individual menu build methods.
  *
  * @since 1.0.0
  */
	var BuildMenusPageTypeOptions = function () {

		// Properties.
		var list_rows = $('#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row');
		var page_types_arr = [];
		var page_types_unique_arr = [];
		var data_arr = [];

		getAllPageTypes();
		generateDataArr();
		initializeIndividualMenuBuilds();

		// GET ALL PAGE TYPES - THAT ARE DISPLAYED IN THE PAGE REPORT LIST.
		function getAllPageTypes() {
			// Get all page_types and push them to arr.
			for (var i = 0; i < list_rows.length; i++) {
				var page_type_name = list_rows.eq(i).attr('data-StrCPV-page-type');
				// Strip HTML tags.
				page_type_name = StrCPV.stripHTMLtags(page_type_name);
				page_types_arr.push(page_type_name);
			}

			// Remove duplicates from array.
			page_types_unique_arr = [].concat(_toConsumableArray(new Set(page_types_arr)));
		}

		/**
   * GENERATE DATA ARRAY
   *
   * DESC: It will generate data_arr which is going to be passed as a param in the end.
   * INFO: It is collecting page-type-names and nr of their occurrences.
   *
   * @type ARRAY OF ARRAYS -> [ ["page_type_name1", nr], ["page_type_name2", nr]... ]
   * @since 1.0.0
   */
		function generateDataArr() {
			for (var i = 0; i < page_types_unique_arr.length; i++) {
				var page_type_name = page_types_unique_arr[i];
				var name_occurrences_nr = StrCPV.countOccurrences(page_types_arr, page_type_name);
				data_arr.push([page_type_name, name_occurrences_nr]);
			}
		}

		/**
   * INITIALIZE INDIVIDUAL MENU BUILDS
   *
   * DESC: In this method add a call to each build-menu-init method.
   *
   * @param - pass param data_arr - array
   * @since 1.0.0
   */
		function initializeIndividualMenuBuilds() {

			BuildResetMenu.init(data_arr);

			BuildFilterMenu.init(data_arr);

			BuildSelectByTypeMenu.init(data_arr);
		}
	}();

	/**
  * IS LAST PAGE TYPE OPTION DELETED - Function
  *
  * DESC: On page report delete - check if that is the last of that page type.
  *	   If that was the last of that page type -> return true and if not return false.
  * INFO: Invoked by observer from ajax delete-page.js and 0050-delete.js - that way the check is only run once.
  *	   If page_row param. is not passed then check all reports in all page-types because
  *	   select multiple page reports action is triggered.
  *
  * @param page_row - removed section element  (accordion option - page name - row)
  * @since 1.0.0
  */
	var LastPageTypeOptionDeleted = function () {

		// Listen to event for deleting filter option.
		StrCPVevents.subscribe("StrCPVcheckAndDeletePageByTypeOption", function (page_row) {

			// IF PAGE_ROW IS NOT DEFINED - loop through all page-types.
			if (typeof page_row == "undefined") {
				// Multiple page rows deleted - check all page types and delete page type options from the menus that are no longer required.
				checkAndDeleteOptions();
			} else {
				// ONLY ONE PAGE DELETED - we have page row el. - check only its page type.
				checkAndDeleteOption(page_row);
			}
		});

		/**
   * CHECK AND DELETE OPTION-S
   *
   * DESC: Loop through all page types and count page reports for each type.
   *	   If counted page reports number is zero, remove that page type option from all menus.
   *
   * @since 1.0.0
   */
		function checkAndDeleteOptions() {

			// Get all page type names.
			var page_type_names_arr = getPageTypeNamesArr();

			// Loop through page type names array.
			for (var i = 0; i < page_type_names_arr.length; i++) {
				var page_type_name = page_type_names_arr[i];

				// Get all page reports under that page-type-name.
				var all_page_reports_by_type = $('#StrCPVisits_js_db_list_wrapper').find("section[data-strcpv-page-type='" + page_type_name + "']");

				// Check if there is no more page reports belonging to that page type.
				if (all_page_reports_by_type.length === 0) {
					removePageTypeOptionFromMenus(page_type_name);
				}
			}
		}

		function getPageTypeNamesArr() {
			var page_type_names_arr = [];
			// Select all checkboxes in select-by-type menu.
			var page_type_checkboxes = $('#StrCPVisits_js_db_page_type_menu .StrCPVisits-select-by-type-option');

			// Loop through checkboxes and extract page-type-names.
			for (var i = 0; i < page_type_checkboxes.length; i++) {
				var page_type_name = page_type_checkboxes.eq(i).val();
				page_type_name = StrCPV.stripHTMLtags(page_type_name);
				page_type_names_arr.push(page_type_name);
			}
			return page_type_names_arr;
		}

		/**
   * CHECK AND DELETE OPTION
   *
   * DESC: Get page-type-name from deleted page row anc count all page reports under that type.
   *	   If counted page reports number is zero, remove page type option from all menus.
   *
   * @param page_row - el
   * @since 1.0.0
   */
		function checkAndDeleteOption(page_row) {
			// Get page-type-name - for removing filter option - if needed.
			var page_type_name = page_row.attr('data-strcpv-page-type');
			// Get all page reports under that type.
			var all_page_reports_by_type = $('#StrCPVisits_js_db_list_wrapper').find("section[data-strcpv-page-type='" + page_type_name + "']");

			// Check if there is no more page reports belonging to that page type.
			if (all_page_reports_by_type.length === 0) {
				removePageTypeOptionFromMenus(page_type_name);
			}
		}

		/**
   * REMOVE PAGE TYPE NAME FROM MENUS
   *
   * DESC: In this method add a call to each menu delete method
   *	   that you wish to delete option that does not exist among options.
   *
   * @param - pass an argument page_type_name as parameter - string
   * @since 1.0.0
   */
		function removePageTypeOptionFromMenus(page_type_name) {

			// RESET MENU
			ResetOption.delete(page_type_name);
			// FILTER MENU
			FilterOption.delete(page_type_name);
			// SELECT-BY-TYPE MENU
			SelectByTypeOption.delete(page_type_name);
		}
	}();

	/**
  * IS EVERYTHING DELETED IN LIST - hidden or visible
  *
  * DESC: Check if all page reports are deleted in the current list,
  *	   and if it is, disable the select-all option.
  * INFO: Invoked in ajax delete-page.js and 0050-delete.js
  *
  * @type Module revealing
  * @since 1.0.0
  */
	var IsEverythingDeletedInList = function () {

		// Properties.
		var list_type_obj = void 0;

		// Listen to ajax delete responses.
		StrCPVevents.subscribe("StrCPVisEverythingDeletedInList", init);

		function init() {
			setProperties();
			detectListType();
		}

		function setProperties() {
			// Get list type obj - {current_list_type: "list-hidden", open_list_type: "list-visible"}.
			list_type_obj = ToggleHiddenReports.getListType();
		}

		function detectListType() {

			if (list_type_obj.open_list_type === "list-hidden") {
				// LIST HIDDEN.
				HiddenListCountAllHiddenReports();
			} else if (list_type_obj.open_list_type === "list-visible") {
				// LIST VISIBLE.
				VisibleListCountAllReports();
			} else {
				// Page is loaded - default list type is LIST-VISIBLE.
				// console.log('default list type');
				VisibleListCountAllReports();
			}
		}

		function VisibleListCountAllReports() {
			var visible_reports_nr = $(".StrCPVisits_db_list_row:not('.StrCPVisits-hidden-indicator')").length;
			// console.log( visible_reports_nr );
			checkNrAndHideDisableSelectAll(visible_reports_nr);
		}

		function HiddenListCountAllHiddenReports() {
			var hidden_reports_nr = $(".StrCPVisits_db_list_row.StrCPVisits-hidden-indicator").length;
			// console.log( hidden_reports_nr );
			checkNrAndHideDisableSelectAll(hidden_reports_nr);
		}

		function checkNrAndHideDisableSelectAll(list_reports_nr) {
			if (list_reports_nr == 0) {
				SelectAllToggle.disable();
			} else {
				SelectAllToggle.enable();
			}
		}

		return {
			init: init
		};
	}();

	/**
  * COUNTER TAB
  *
  * DESC: Select frontend counter position in parent el. ( LEFT or CENTER or RIGHT. )
  *
  * @since 1.0.6
  */
	var CounterTab = function () {

		// PROPERTIES.
		var page_select_position = $('#StrCPVisits-page-counter-select-position');
		var website_select_position = $('#StrCPVisits-website-counter-select-position');
		var examples = void 0; // Examples to be changed.
		var codes = void 0; // Codes that are going to be rewritten. ( position: left, center, right. )


		// LISTENERS.
		page_select_position.change(function () {
			changePosition($(this));
		});

		website_select_position.change(function () {
			changePosition($(this));
		});

		/**
   * CHANGE POSITION
   *
   * @param - HTML element -> page-counter select el. or website-counter select el.
   * @since 1.0.6
   */
		function changePosition(counter_type) {

			setProperties(counter_type);

			var selected_option = counter_type.val();
			if (selected_option === "left") {
				// LEFT
				examples.css('text-align', 'left');
				rewriteCodePosition('left');
			} else if (selected_option === "center") {
				// CENTER
				examples.css('text-align', 'center');
				rewriteCodePosition('center');
			} else if (selected_option === "right") {
				// RIGHT
				examples.css('text-align', 'right');
				rewriteCodePosition('right');
			}
		}

		function setProperties(counter_type) {
			var parent_li_el = counter_type.closest('.StrCPVisits-frontend-counter-code');
			examples = parent_li_el.find('.strcpv-js-page-counter-example-pos');
			codes = parent_li_el.find('.strcpv-frontend-counter-position-rewrite');
		}

		function rewriteCodePosition(position) {

			var remaining_positions_arr = filterOutRemainingPositions(position);

			// Loop through code samples.
			for (var i = 0; i < codes.length; i++) {
				var code = codes.eq(i);
				// Get code sample text.
				var code_text = code.html();
				// Change <br> tags to "bbbrrr" - so it can be reverted later.
				code_text = code_text.replace(new RegExp("<br>", "g"), 'bbbrrr');
				// Strip all HTML tags.
				code_text = StrCPV.stripHTMLtags(code_text);
				// Rewrite sample code position with given position.
				var new_code_text = replacePositionStringInCodeSample(code_text, remaining_positions_arr, position);
				// Revert <br> tags.
				new_code_text = new_code_text.replace(new RegExp("bbbrrr", "g"), '<br>');
				// Display new code sample.
				code.html(new_code_text);
			}
		}

		/**
   * FILTER OUT REMAINING POSITIONS
   *
   * DESC: Filter out given position and return an array of remaining positions.
   *
   * @param type-string  ("left" || "center" || "right")
   * @since 1.0.6
   */
		function filterOutRemainingPositions(position) {
			var positions_arr = ["left", "center", "right"];
			var filtered_positions_arr = positions_arr.filter(function (value, index, arr) {
				return value != position;
			});
			return filtered_positions_arr;
		}

		/**
   * REPLACE POSITION STRING IN CODE SAMPLE
   *
   * DESC: Replace the first occurrence of position with a new position.
   * EXAMPLE: "text-align: left;" replace with "text-align: center;" or "text-align: right;"
   *
   * @param1  type->string  ( Code sample text. )
   * @param2  type->array   ( Remaining positions that can be found in code sample text and it should be replaced. )
   * @param3  type->string  ( new-given position. )
   * @since 1.0.0
   */
		function replacePositionStringInCodeSample(code_text, remaining_positions_arr, position) {

			var new_code_sample_text = void 0;

			// Loop through remaining two positions array.
			for (var i = 0; i < remaining_positions_arr.length; i++) {
				var remaining_position = remaining_positions_arr[i]; // Two of these three values: "left", "center", "right".
				var search_substring = "text-align: " + remaining_position + ";";
				var replace_substring = "text-align: " + position + ";";
				// If code has substring.
				if (code_text.includes(search_substring)) {
					// Replace the first occurrence of position with a new position.
					new_code_sample_text = code_text.replace(search_substring, replace_substring);
				}
			}
			return new_code_sample_text;
		}
	}();

	/**
  * LIGHT TABS MENU - COMPONENT
  *
  * @since 1.0.0
  */
	var StrCPVisitsLightTabs = function () {

		// Click Listener - works on dynamically added tab options.
		$(document).on('click', '.StrCPVisits-light-tabs > ul > li', function () {
			lightTabs($(this));
		});

		function lightTabs(option_clicked) {
			var light_tabs = option_clicked.closest('.StrCPVisits-light-tabs');
			var class_active = light_tabs.attr('data-active-class');
			var index_nr = light_tabs.find('ul li').index(option_clicked);
			var active_box = light_tabs.find('>div').eq(index_nr);

			option_clicked.siblings('li').removeClass(class_active);
			option_clicked.addClass(class_active);
			active_box.siblings('.StrCPVisits-form-tab').hide();
			active_box.show();
		}
	}();

	/**
  * ACCORDION MENU COMPONENT
  *
  * @since 1.0.0
  */
	var StrCPVisitsAccordionMenu = function () {

		// Config.
		var button = ".StrCPVisits_accordion_btn";
		var active_class = "StrCPVisits_accordion_active";
		var panel = ".StrCPVisits_accordion_panel";

		// Click Listener - works on dynamically added tab options.
		$(document).on('click', function (e) {
			// Toggle menu if clicked on button but do not toggle if clicked in input-checkbox in button.
			var is_chkbox_el = $(e.target).closest(".StrCPVisits_db_list_chkbox_wrapper").length;
			var btn_el = $(e.target).closest(button);
			var is_btn_el = btn_el.length;

			if (is_chkbox_el == 0 && is_btn_el == 1) {
				toggleAccordion(btn_el);
			}
		});

		function toggleAccordion(clicked_btn) {

			// Close other options.
			var acc_menu = clicked_btn.closest('.StrCPVisits_accordion_menu');
			// Get data attribute close-other-options value - true || false.
			acc_menu.attr('data-stracc-close-other-options', function (i, close_other_options_value) {
				if (close_other_options_value == "true") {
					closeOtherExpandedOptions(clicked_btn);
				}
			});

			if (clicked_btn.hasClass(active_class)) {
				closeExpandedOption(clicked_btn);
			} else {
				expandClosedOption(clicked_btn);
			}
		}

		function closeExpandedOption(clicked_btn) {
			clicked_btn.removeClass(active_class);
			clicked_btn.next(panel).slideUp();
		}

		function expandClosedOption(clicked_btn) {
			clicked_btn.addClass(active_class);
			clicked_btn.next(panel).slideDown();
		}

		function closeOtherExpandedOptions(clicked_btn) {
			clicked_btn.siblings('section').removeClass(active_class);
			clicked_btn.siblings('section').next(panel).slideUp();
		}
	}(); // ! AccordionMenu
})(jQuery);