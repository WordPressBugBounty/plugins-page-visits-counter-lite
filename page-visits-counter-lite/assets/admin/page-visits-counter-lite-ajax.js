'use strict';

/**
 * AJAX - IIFE
 *
 * DESC: wrap everything into IIFE for security reasons and to prevent naming conflict.
 * INFO: AJAX should be concatenated into separate file from js file.
 *	   That way we can exempt ajax file from cashing as ajax communication is protected with NONCE.
 *
 * @since 1.0.0
 */
(function ($) {

	/**
  * AJAX - UPDATE TOTAL VISITS NUMBER in dashboard widget - total visits box
  *
  * @since 1.0.0
  */
	var AjaxUpdateTotalVisitsNr = function () {

		// Properties.
		var spinner = $('#StrCPVisits-js-db-edit-total-visits-spinner');
		var total_nr = $('#StrCPVisits_js_db_total_visits_box_nr');
		var form = $('#StrCPVisits-js-db-edit-total-visits-nr-form');
		var response_box = $('#StrCPVisits-js-db-edit-total-visits-respone-box');
		var new_nr = void 0;

		// Form submit listener.
		form.submit(function (evt) {
			evt.preventDefault();
			response_box.html(''); // Reset.
			spinner.show();

			// Get NEW NUMBER.
			new_nr = $('#StrCPVisits-js-db-edit-total-visits-nr').val();
			// Remove HTML tags before displaying data.
			new_nr = StrCPV.stripHTMLtags(new_nr);

			$.ajax({
				url: ajaxurl, // Works by default in WP backend.
				type: 'POST',
				data: {
					action: 'StrCPVisits_update_total_visits_nr',
					data: new_nr,
					security: STR_CPVISITS.security
				},
				success: function success(response) {
					// console.log(response);

					// wp_send_json_success.
					if (response.success === true) {
						// console.log(response.data);
						handleSuccess(response.data);
					} else {
						// console.log(response.data);
						handleError(response.data);
					}
				}
			}); // ! $.ajax
		}); // ! AJAX form.submit


		function handleSuccess(response_msg) {
			spinner.hide();
			// Display response in response box.
			response_box.html("<p class='StrCPVisits-success-msg'>" + response_msg + "</p>");
			response_box.slideDown();
			// Update page visits number.
			total_nr.html(new_nr);
		}

		function handleError(response_msg) {
			spinner.hide();
			// Display response in response box.
			response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
			response_box.slideDown();
		}
	}();

	/**
  * AJAX - DELETE PAGE from dashboard widget - page list
  *
  * DESC: Execute delete page procedure on delete button click.
  *
  * @since 1.2.1
  */
	var AjaxDeletePage = function () {

		// Properties.
		var total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
		var clicked_delete_btn = void 0;
		var response_box = void 0;

		// Delete button click listener.
		$('#StrCPVisits_js_db_list_wrapper').on('click', '.StrCPVisits-dblist-delete-page-btn', function (evt) {
			evt.preventDefault();
			total_page_visits_spinner.show();

			// Get HTML elements and set them as properties.
			clicked_delete_btn = $(this);
			response_box = clicked_delete_btn.closest('.StrCPVisits_db_list_row_tab').find('.StrCPVisits_db_list_row_msg_box');

			// Display popup confirmation message - proceed only if user accept.
			if (!window.confirm(STR_CPVISITS.text_delete_page)) {
				// User clicked Cancel.
				total_page_visits_spinner.hide();
				return; // Abort.
			}

			// Get page name.
			var page_name = $(this).attr('data-StrCPVisits-dblist-page-name');
			// Encode the page name.
			page_name = encodeURIComponent(page_name);

			$.ajax({
				url: ajaxurl, // Works by default in WP backend.
				type: 'POST',
				data: {
					action: 'StrCPVisits_delete_page',
					page_name: page_name,
					security: STR_CPVISITS.security
				},
				success: function success(response) {
					// console.log(response);

					// wp_send_json_success.
					if (response.success === true) {
						// console.log(response.data);
						handleSuccess();
					} else {
						// console.log(response.data);
						handleError(response.data);
					}
				}
			}); // ! $.ajax
		}); // ! Delete Btn click


		function handleSuccess() {

			var row_sub_tab = clicked_delete_btn.closest('.StrCPVisits_accordion_panel');
			var page_row = row_sub_tab.prev('section');

			removePageSubRowFromList(row_sub_tab);
			removePageRowFromList(page_row);
		}

		function handleError(response_msg) {
			// Display error.
			response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
			response_box.slideDown();
			// Hide spinner - total page visits number.
			total_page_visits_spinner.hide();
		}

		function resetResponseBox() {
			response_box.html('');
			response_box.hide();
		}

		function removePageRowFromList(page_row) {
			animatePageRemoving(page_row);
			// Remove page row el after all css animation steps are finished.
			setTimeout(function () {
				page_row.remove();
				// Delete: Filter-Option, Select-By-Type-Option, and Reset-Option
				// if this was the last page of the option type.
				// Listening in menu-operations/0020-last-page-type-option-deleted.js
				StrCPVevents.publish("StrCPVcheckAndDeletePageByTypeOption", page_row);
				// Update page-type reports nr in Select-By-Type menu.
				// Listening in 0050-options-menu/0020-select-option/0040-select-by-type-menu/0060-count-visible-reports.js
				StrCPVevents.publish("StrCPVcountAndUpdatePageByTypeReportsNr", page_row);
				// Recalculate total page visits nr.
				StrCPVevents.publish("StrCPVrecalculateTotalPageNr");
				// If everything is deleted from the list - disable select-all option ( so it cannot enable icon menu... ).
				StrCPVevents.publish("StrCPVisEverythingDeletedInList");
			}, 4000);
		}

		function animatePageRemoving(page_row) {
			// Set el. height for css animation step.
			var row_height = page_row.height();
			page_row.height(row_height);
			// Add delete class runned by css transition steps.
			page_row.addClass('StrCPVisits_dblist_delete_page_animation');
		}

		function removePageSubRowFromList(row_sub_tab) {
			// REMOVE ROW SUB-TAB.
			row_sub_tab.hide();
			row_sub_tab.remove();
		}
	}();

	/**
  * AJAX - UPDATE PAGE VISITS NUMBER in dashboard widget - page list
  *
  * @since 1.0.0
  */
	var AjaxUpdatePageVisitsNr = function () {

		// Properties.
		var total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
		var submit_form_spinner = void 0;
		var response_box = void 0; // Master reset is set in JS
		var new_nr = void 0;
		var row_nr = void 0;

		// Form submit listener.
		$('#StrCPVisits_js_db_list_wrapper').on('submit', '.StrCPVisits-dblist-page-visits-form', function (evt) {
			evt.preventDefault();

			// Display spinner aside total page visits number.
			StrCPVevents.publish("StrCPVTotalPageNrDisplaySpinner");

			setPropertyValues($(this));
			displaySpinners();

			// Get form data.
			var formData = $(this).serialize();

			$.ajax({
				url: ajaxurl, // Works by default in the WP backend.
				type: 'POST',
				data: {
					action: 'StrCPVisits_update_page_data',
					settings_data: formData,
					security: STR_CPVISITS.security
				},
				success: function success(response) {
					// console.log(response);

					// wp_send_json_success.
					if (response.success === true) {
						// console.log(response.data);
						handleSuccess(response.data);
					} else {
						// console.log(response.data);
						handleError(response.data);
					}
				}
			}); // ! $.ajax
		}); // ! AJAX form.submit


		/**
   * SET GLOB VARIABLE VALUES
   *
   * DESC: Set values for variables: response_box, row_nr, and new_nr.
   *
   * @since 1.0.0
   */
		function setPropertyValues(submited_form) {
			// Get current SubROW el.
			var sub_tab = submited_form.closest('.StrCPVisits_db_list_row_tab ');
			// Set current form spinner el.
			submit_form_spinner = sub_tab.find('.StrCPVisits-loading-spinner-wrapper-toggle');
			// Get current response box el.
			response_box = sub_tab.find('.StrCPVisits_db_list_row_msg_box');
			// Get current page visits nr el.
			row_nr = sub_tab.prev('section').find('.StrCPVisits_db_list_visits_nr');

			// Get new number (int).
			new_nr = submited_form.find('.StrCPVisits-dblist-page-visits-nr').val();
			// Remove HTML tags before displaying data.
			new_nr = StrCPV.stripHTMLtags(new_nr);
		}

		function displaySpinners() {
			total_page_visits_spinner.show();
			submit_form_spinner.show();
		}

		function handleSuccess(response_msg) {
			// Update page visits number.
			row_nr.html(new_nr);
			// Hide edit page nr spinner.
			submit_form_spinner.hide();
			// Recalculate total page nr.
			StrCPVevents.publish("StrCPVrecalculateTotalPageNr");
		}

		function handleError(response_msg) {
			// Hide spinners.
			submit_form_spinner.hide();
			total_page_visits_spinner.hide();
			// Display response in response box..
			response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
			response_box.slideDown();
		}
	}();

	/**
  * AJAX - RESET ALL in dashboard widget
  *
  * DESC: Reset all visits number to zero - excl. TOTAL INDEPENDENT Loads & Reloads box.
  *
  * @since 1.0.0
  */
	var AjaxResetAll = function () {

		// Properties
		var total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
		var btn_spinner = $("#StrCPVisits-js-db-reset-all-spinner");
		var btn = $('#StrCPVisits_js_db_reset_all_btn');
		var response_box = $("#StrCPVisits_js_db_reset_response_box"); // Master reset is set in JS.


		// Form submit listener.
		btn.click(function () {
			displaySpinners();

			$.ajax({
				url: ajaxurl, // Works by default in WP backend.
				type: 'POST',
				data: {
					action: 'StrCPVisits_db_reset_all',
					data: "RESET-ALL",
					security: STR_CPVISITS.security
				},
				success: function success(response) {
					// console.log(response);

					// wp_send_json_success.
					if (response.success === true) {
						// console.log(response.data);
						handleSuccess(response.data);
					} else {
						// console.log(response.data);
						handleError(response.data);
					}
				}
			}); // ! $.ajax
		}); // ! AJAX form.submit


		function displaySpinners() {
			total_page_visits_spinner.show();
			btn.addClass('StrCPVisits_js_db_reset_btn_active');
			btn_spinner.show();
		}

		function hideSpinners() {
			total_page_visits_spinner.hide();
			btn.removeClass('StrCPVisits_js_db_reset_btn_active');
			btn_spinner.hide();
		}

		function handleSuccess(response_msg) {
			// Set all pages visits number to zero.
			$('.StrCPVisits_db_list_visits_nr').text('0');
			setTimeout(function () {
				// Recalculate total page nr.
				StrCPVevents.publish("StrCPVrecalculateTotalPageNr");
				hideSpinners();
			}, 1000);
		}

		function handleError(response_msg) {
			hideSpinners();
			// Display response in response box.
			response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
			response_box.slideDown();
		}
	}();

	/**
  * AJAX - RESET PAGE TYPE in dashboard widget
  *
  * DESC: Reset page type visits number only to zero.
  *
  * @since 1.0.0
  */
	var AjaxResetPageType = function () {

		// Properties.
		var total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
		var btn_spinner = void 0;
		var btns = $('.StrCPVisits_db_reset_button');
		var response_box = $("#StrCPVisits_js_db_reset_response_box"); // Master reset is set in JS.
		var clicked_button = void 0;
		var page_type_name = void 0;
		var pages_list_wrapper = $('#StrCPVisits_js_db_list_wrapper');
		var page_rows = void 0;
		var page_names_arr = [];

		// Form submit listener.
		btns.click(function () {
			setProperties($(this));
			displaySpinners($(this));
			page_names_arr = getPageNamesByPageType();

			$.ajax({
				url: ajaxurl, // Works by default in WP backend.
				type: 'POST',
				data: {
					action: 'StrCPVisits_db_reset_page_type',
					data: page_names_arr,
					security: STR_CPVISITS.security
				},
				success: function success(response) {
					// console.log(response);

					// wp_send_json_success.
					if (response.success === true) {
						// console.log(response.data);
						handleSuccess(response.data);
					} else {
						// console.log(response.data);
						handleError(response.data);
					}
				}
			}); // ! $.ajax
		}); // ! AJAX form.submit


		function setProperties(clicked_btn) {
			btn_spinner = clicked_btn.find('.StrCPVisits-loading-spinner-wrapper-toggle');
			page_type_name = clicked_btn.attr('data-strcpvisits-dbreset-page-type-name');
			clicked_button = clicked_btn;
		}

		function getPageNamesByPageType() {
			var page_titles_arr = [];
			page_rows = pages_list_wrapper.find("section[data-strcpv-page-type='" + page_type_name + "']");
			// Get page names.
			for (var i = 0; i < page_rows.length; i++) {
				var page_row = page_rows.eq(i);
				var page_name = page_row.attr('data-strcpv-page-name');
				page_name = StrCPV.stripHTMLtags(page_name);
				page_titles_arr.push(page_name);
			}
			return page_titles_arr;
		}

		function displaySpinners() {
			total_page_visits_spinner.show();
			clicked_button.addClass('StrCPVisits_js_db_reset_btn_active');
			btn_spinner.show();
		}

		function hideSpinners() {
			total_page_visits_spinner.hide();
			clicked_button.removeClass('StrCPVisits_js_db_reset_btn_active');
			btn_spinner.hide();
		}

		function handleSuccess(response_msg) {
			// Set all pages - visits number to zero - (by page type of reset pages).
			page_rows.find('.StrCPVisits_db_list_visits_nr').text('0');
			setTimeout(function () {
				// Recalculate total page nr.
				StrCPVevents.publish("StrCPVrecalculateTotalPageNr");
				hideSpinners();
			}, 1000);
		}

		function handleError(response_msg) {
			hideSpinners();
			// Display response in response box.
			response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
			response_box.slideDown();
		}
	}();

	/**
  * AJAX - SELECT MENU BASE
  *
  * DESC: Base module for icon-menu options available after at least one page report is selected.
  *	   It holds properties and methods that are used in options:
  *	   set-as-visible, set-as-hidden, reset, and delete.
  * TYPE: Module revealing.
  *
  * @since 1.0.0
  */
	var AjaxSelectMenuBase = function () {

		// Properties.
		var spinner = $('#StrCPVisits-js-db-select-icon-menu-spinner');
		var response_box = $("#StrCPVisits_js_db_select_response_box"); // Master reset is set in JS.
		var pages_list_wrapper = $('#StrCPVisits_js_db_list_wrapper');
		var all_list_checkboxes = $('.StrCPVisits_db_list_chkbox');
		var report_options_sub_tabs = $('.StrCPVisits_db_list_row_tab');

		// Properties getter.
		function getProperties() {
			return {
				"spinner": spinner,
				"response_box": response_box,
				"pages_list_wrapper": pages_list_wrapper,
				"all_list_checkboxes": all_list_checkboxes,
				"report_options_sub_tabs": report_options_sub_tabs
			};
		}

		function getSelectedReports() {
			var selected_reports = pages_list_wrapper.find(".StrCPVisits_db_list_chkbox:checked");
			return selected_reports;
		}

		function getSelectedPageNamesArr(selected_reports) {
			var page_titles_arr = [];
			// Get page names.
			for (var i = 0; i < selected_reports.length; i++) {
				var page_row = selected_reports.eq(i);
				var page_name = page_row.attr('data-strcpv-inp-page-name');
				page_name = StrCPV.stripHTMLtags(page_name);
				page_titles_arr.push(page_name);
			}
			return page_titles_arr;
		}

		return {
			getProperties: getProperties,
			getSelectedReports: getSelectedReports,
			getSelectedPageNamesArr: getSelectedPageNamesArr
		};
	}();

	/**
  * AJAX - SET AS VISIBLE
  *
  * DESC: Set page reports as visible reports.
  *	   They can be displayed in the visible list only.
  *
  * @since 1.0.0
  */
	var AjaxSetAsVisible = function () {

		// Base Properties.
		var BaseProperties = AjaxSelectMenuBase.getProperties();
		var spinner = BaseProperties.spinner;
		var response_box = BaseProperties.response_box; // Master reset is set in JS.
		var pages_list_wrapper = BaseProperties.pages_list_wrapper;
		var all_list_checkboxes = BaseProperties.all_list_checkboxes;
		var report_options_sub_tabs = BaseProperties.report_options_sub_tabs;

		// Properties.
		var set_visible_button = $("#StrCPVisits_js_db_select_set_visible_btn");
		var selected_reports_checkboxes = void 0;
		var page_names_arr = [];

		// CLICK LISTENER.
		set_visible_button.click(function (e) {
			e.preventDefault();

			// If Button is disabled -> ABORT.
			if ($(this).hasClass('StrCPVisits_icon_btn_disabled')) {
				return; // Abort
			}

			// Display popup confirmation message - proceed only if user accepts.
			if (!window.confirm(STR_CPVISITS.text_move_to_visible_list)) {
				// User has clicked Cancel.
				return; // Abort
			}

			disableSelection();
			spinner.show();
			setProperties();

			$.ajax({
				url: ajaxurl, // Works by default in WP backend.
				type: 'POST',
				data: {
					action: 'StrCPVisits_db_toggle_hidden_reports',
					data: page_names_arr,
					list: 'visible',
					security: STR_CPVISITS.security
				},
				success: function success(response) {
					// console.log(response);

					// wp_send_json_success.
					if (response.success === true) {
						// console.log(response.data);
						handleSuccess(response.data);
					} else {
						// console.log(response.data);
						handleError(response.data);
					}
				}
			}); // ! $.ajax
		}); // ! btn.click()


		function disableSelection() {
			all_list_checkboxes.prop('disabled', true);
		}

		function enableSelection() {
			all_list_checkboxes.prop('disabled', false);
		}

		function setProperties() {
			selected_reports_checkboxes = AjaxSelectMenuBase.getSelectedReports();
			page_names_arr = AjaxSelectMenuBase.getSelectedPageNamesArr(selected_reports_checkboxes);
		}

		function handleSuccess(response_msg) {
			// Hide all page reports sub-tabs.
			report_options_sub_tabs.hide();
			// Hide selected reports from the visible list - and add the hidden class.
			var selected_reports = selected_reports_checkboxes.closest('.StrCPVisits_db_list_row');
			selected_reports.removeClass('StrCPVisits-hidden-indicator');
			selected_reports.hide();
			selected_reports_checkboxes.prop('checked', false); // unselect all selected.
			enableSelection();
			publishEvents();
			spinner.hide();
		}

		function publishEvents() {
			// Disable Icon-Menu.
			StrCPVevents.publish("StrCPVdisableIconMenu");
			/**
    * Count how many reports there are under each page type and display number in format
    * current_nr_in_list/total_nr_of_reports - ( visible and hidden lists ).
    */
			StrCPVevents.publish("StrCPVcountAndUpdatePageByTypeReportsNr");

			// If everything is removed from the list - disable select-all option, else enable it.
			StrCPVevents.publish("StrCPVisEverythingDeletedInList");
		}

		function handleError(response_msg) {
			spinner.hide();
			// Display response in response box.
			response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
			response_box.slideDown();
			enableSelection();
		}
	}();

	/**
  * AJAX - SET AS HIDDEN
  *
  * DESC: Set page reports as hidden reports.
  *	   They can be displayed in the hidden list only.
  *
  * @since 1.0.0
  */
	var AjaxSetAsHidden = function () {

		// Base Properties.
		var BaseProperties = AjaxSelectMenuBase.getProperties();
		var spinner = BaseProperties.spinner;
		var response_box = BaseProperties.response_box; // Master reset is set in JS.
		var pages_list_wrapper = BaseProperties.pages_list_wrapper;
		var all_list_checkboxes = BaseProperties.all_list_checkboxes;
		var report_options_sub_tabs = BaseProperties.report_options_sub_tabs;

		// Properties.
		var set_hidden_button = $("#StrCPVisits_js_db_select_set_hidden_btn");
		var selected_reports_checkboxes = void 0;
		var page_names_arr = [];

		// CLICK LISTENER.
		set_hidden_button.click(function (e) {
			e.preventDefault();

			// If Button is disabled -> ABORT.
			if ($(this).hasClass('StrCPVisits_icon_btn_disabled')) {
				return; // Abort.
			}

			// Display popup confirmation message - proceed only if user accepts.
			if (!window.confirm(STR_CPVISITS.text_move_to_hidden_list)) {
				// User clicked Cancel.
				return; // Abort.
			}

			disableSelection();
			spinner.show();
			setProperties();

			$.ajax({
				url: ajaxurl, // Works by default in WP backend.
				type: 'POST',
				data: {
					action: 'StrCPVisits_db_toggle_hidden_reports',
					data: page_names_arr,
					list: 'hidden',
					security: STR_CPVISITS.security
				},
				success: function success(response) {
					// console.log(response);

					// wp_send_json_success.
					if (response.success === true) {
						// console.log(response.data);
						handleSuccess(response.data);
					} else {
						// console.log(response.data);
						handleError(response.data);
					}
				}
			}); // ! $.ajax
		}); // ! btn.click()


		function disableSelection() {
			all_list_checkboxes.prop('disabled', true);
		}

		function enableSelection() {
			all_list_checkboxes.prop('disabled', false);
		}

		function setProperties() {
			selected_reports_checkboxes = AjaxSelectMenuBase.getSelectedReports();
			page_names_arr = AjaxSelectMenuBase.getSelectedPageNamesArr(selected_reports_checkboxes);
		}

		function handleSuccess(response_msg) {
			// Hide all page reports sub-tabs.
			report_options_sub_tabs.hide();
			// Hide selected reports from the visible list - and add the hidden class.
			var selected_reports = selected_reports_checkboxes.closest('.StrCPVisits_db_list_row');
			selected_reports.addClass('StrCPVisits-hidden-indicator');
			selected_reports.hide();
			selected_reports_checkboxes.prop('checked', false); // unselect all selected.
			enableSelection();
			publishEvents();
			spinner.hide();
		}

		function publishEvents() {
			// Disable Icon-Menu.
			StrCPVevents.publish("StrCPVdisableIconMenu");
			/**
    * Count how many reports there are under each page type and display number in format
    * current_nr_in_list/total_nr_of_reports - ( visible and hidden lists ).
    */
			StrCPVevents.publish("StrCPVcountAndUpdatePageByTypeReportsNr");

			// If everything is removed from the list - disable select-all option, else enable it.
			StrCPVevents.publish("StrCPVisEverythingDeletedInList");
		}

		function handleError(response_msg) {
			spinner.hide();
			// Display response in response box.
			response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
			response_box.slideDown();
			enableSelection();
		}
	}();

	/**
  * AJAX - SELECTION RESET
  *
  * DESC: Reset only selected page reports to zero.
  *
  * @since 1.0.0
  */
	var AjaxSelectionReset = function () {

		// Base Properties.
		var BaseProperties = AjaxSelectMenuBase.getProperties();
		var spinner = BaseProperties.spinner;
		var response_box = BaseProperties.response_box; // Master reset is set in JS.
		var pages_list_wrapper = BaseProperties.pages_list_wrapper;

		// Properties.
		var total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
		var reset_button = $("#StrCPVisits_js_db_select_reset_btn");
		var selected_reports = void 0;
		var page_names_arr = [];

		// Form submit listener.
		reset_button.click(function (e) {
			e.preventDefault();

			// If Button is disabled -> ABORT.
			if ($(this).hasClass('StrCPVisits_icon_btn_disabled')) {
				return; // Abort
			}

			// Display popup confirmation message - proceed only if user accepts.
			if (!window.confirm(STR_CPVISITS.text_reset_selected)) {
				// User clicked Cancel.
				return; // Abort.
			}

			displaySpinners();
			setProperties();

			$.ajax({
				url: ajaxurl, // Works by default in WP backend.
				type: 'POST',
				data: {
					action: 'StrCPVisits_db_reset_page_type',
					data: page_names_arr,
					security: STR_CPVISITS.security
				},
				success: function success(response) {
					// console.log(response);

					// wp_send_json_success.
					if (response.success === true) {
						// console.log(response.data);
						handleSuccess(response.data);
					} else {
						// console.log(response.data);
						handleError(response.data);
					}
				}
			}); // ! $.ajax
		}); // ! AJAX form.submit


		function setProperties() {
			selected_reports = AjaxSelectMenuBase.getSelectedReports();
			page_names_arr = AjaxSelectMenuBase.getSelectedPageNamesArr(selected_reports);
		}

		function displaySpinners() {
			total_page_visits_spinner.show();
			spinner.show();
		}

		function hideSpinners() {
			total_page_visits_spinner.hide();
			spinner.hide();
		}

		function handleSuccess(response_msg) {
			// Set all pages - visits number to zero - (By page type of reset pages).
			selected_reports.closest('.StrCPVisits_db_list_row').find('.StrCPVisits_db_list_visits_nr').text('0');
			setTimeout(function () {
				// Recalculate total page nr.
				StrCPVevents.publish("StrCPVrecalculateTotalPageNr");
				hideSpinners();
			}, 1000);
		}

		function handleError(response_msg) {
			hideSpinners();
			// Display response in response box.
			response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
			response_box.slideDown();
		}
	}();

	/**
  * AJAX - SELECTION DELETE
  *
  * DESC: Delete only selected page reports.
  *
  * @since 1.0.0
  */
	var AjaxSelectionDelete = function () {

		// Base Properties.
		var BaseProperties = AjaxSelectMenuBase.getProperties();
		var spinner = BaseProperties.spinner;
		var response_box = BaseProperties.response_box; // Master reset is set in JS.
		var pages_list_wrapper = BaseProperties.pages_list_wrapper;
		var all_list_checkboxes = BaseProperties.all_list_checkboxes;

		// Properties.
		var total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
		var delete_button = $("#StrCPVisits_js_db_select_delete_btn");
		var selected_reports = void 0;
		var page_names_arr = [];

		// Form submit listener.
		delete_button.click(function (e) {
			e.preventDefault();

			// If Button is disabled -> ABORT.
			if (delete_button.hasClass('StrCPVisits_icon_btn_disabled')) {
				return; // Abort.
			}

			// Display popup confirmation message - proceed only if user accept.
			if (!window.confirm(STR_CPVISITS.text_delete_selected)) {
				// User clicked Cancel.
				return; // Abort.
			}

			disableSelection();
			displaySpinners();
			setProperties();

			$.ajax({
				url: ajaxurl, // Works by default in WP backend.
				type: 'POST',
				data: {
					action: 'StrCPVisits_delete_pages',
					data: page_names_arr,
					security: STR_CPVISITS.security
				},
				success: function success(response) {
					// console.log(response);

					// wp_send_json_success.
					if (response.success === true) {
						// console.log(response.data);
						handleSuccess(response.data);
					} else {
						// console.log(response.data);
						handleError(response.data);
					}
				}
			}); // !$.ajax
		}); // ! AJAX form.submit


		function disableSelection() {
			all_list_checkboxes.prop('disabled', true);
		}

		function enableSelection() {
			all_list_checkboxes.prop('disabled', false);
		}

		function setProperties() {
			selected_reports = AjaxSelectMenuBase.getSelectedReports();
			page_names_arr = AjaxSelectMenuBase.getSelectedPageNamesArr(selected_reports);
		}

		function displaySpinners() {
			total_page_visits_spinner.show();
			spinner.show();
		}

		function hideSpinners() {
			total_page_visits_spinner.hide();
			spinner.hide();
		}

		function handleSuccess(response_msg) {

			var page_rows = selected_reports.closest('.StrCPVisits_db_list_row');
			var page_sub_rows = page_rows.next('.StrCPVisits_db_list_row_tab');

			removePageSubRowsFromList(page_sub_rows);
			removePageRowsFromList(page_rows);
		}

		function handleError(response_msg) {
			hideSpinners();
			// Display response in response box.
			response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
			response_box.slideDown();
			enableSelection();
		}

		function removePageRowsFromList(page_rows) {
			animatePagesRemoving(page_rows);
			// Remove page row el. after all CSS animation steps are finished.
			setTimeout(function () {
				page_rows.remove();
				/**
     * Delete: Filter-Option, Select-By-Type-Option, and Reset-Option
     *		 if this was the last page of the option type.
     * Listening in menu-operations/0030-last-page-type-option-deleted.js
     */
				StrCPVevents.publish("StrCPVcheckAndDeletePageByTypeOption");
				/**
     * Update page-type reports nr in Select-By-Type menu.
     * Listening in 0050-options-menu/0020-select-option/0040-select-by-type-menu/0060-count-visible-reports.js
     */
				StrCPVevents.publish("StrCPVcountAndUpdatePageByTypeReportsNr");
				// Recalculate total page visits nr.
				StrCPVevents.publish("StrCPVrecalculateTotalPageNr");
				// If everything is deleted from the list - disable select-all option.
				StrCPVevents.publish("StrCPVisEverythingDeletedInList");
				// Disable Icon-Menu.
				StrCPVevents.publish("StrCPVdisableIconMenu");
				enableSelection();
				spinner.hide();
			}, 4000);
		}

		function animatePagesRemoving(page_rows) {
			// Add the delete class triggered by css transition steps.
			page_rows.addClass('StrCPVisits_dblist_delete_page_animation');
		}

		function removePageSubRowsFromList(row_sub_tabs) {
			// REMOVE ROW SUB-TAB.
			row_sub_tabs.hide();
			row_sub_tabs.remove();
		}
	}();

	/**
  * AJAX - SETTINGS FORM
  *
  * DESC: saving data in settings tab menu.
  *
  * @since 1.0.0
  */
	var AjaxSettingsForm = function () {

		// Properties.
		var spinner = $('#StrCPVisits-js-settings-form-submit-btn-spinner');
		var settings_form = $('#StrCPVisits-js-settings-form');
		var main_response_box = $('#StrCPVisits-js-settings-form-response');
		var individual_response_boxes = $('.StrCPVisits-settings-form-response-box-individual');

		// Reset response box on form data click/change.
		settings_form.click(function () {
			main_response_box.html('');
			individual_response_boxes.html('');
		});

		// Form submit listener.
		settings_form.submit(function (evt) {
			evt.preventDefault();
			spinner.show();
			var formData = $(this).serialize();

			$.ajax({
				url: ajaxurl, // Works by default in WP backend.
				type: 'POST',
				data: {
					action: 'StrCPVisits_save_settings',
					settings_data: formData,
					security: STR_CPVISITS.security
				},
				success: function success(response) {
					// console.log(response);

					// wp_send_json_success.
					if (response.success === true) {
						// console.log(response.data);
						handleResponse(response.data);
					}
				}
			}); // ! $.ajax
		}); // ! AJAX form.submit


		/**
   * HANDLE RESPONSE
   *
   * DESC: Check response statuses for each option on settings page.
   *
   * @since 1.0.0
   */
		function handleResponse(data) {

			// DELETE PLUGIN DATA.
			if (data.delete_plugin_data.success === true) {
				// UPDATE SUCCESS.
				$('#StrCPVisits-js-sett-form-plugin-data-response-box').html("<span class='dashicons dashicons-yes'></span>");
			} else if (data.delete_plugin_data.success === false) {
				// NOT UPDATED.
				$('#StrCPVisits-js-sett-form-plugin-data-response-box').html("<p class='StrCPVisits-success-msg'>( " + data.delete_plugin_data.msg + " )</p>");
			}

			// response_box.html("<p class='StrCPVisits-success-msg'>" + response_msg + "</p>");
			spinner.hide();
		}
	}();
})(jQuery);