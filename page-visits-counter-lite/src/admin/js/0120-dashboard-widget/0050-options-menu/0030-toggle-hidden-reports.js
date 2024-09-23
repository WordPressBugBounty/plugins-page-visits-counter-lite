/**
 * TOGGLE HIDDEN REPORTS
 *
 * DESC: On options eyes icons click - toggle hidden and visible reports in reports list.
 *
 * @type Module revealing
 * @since 1.0.0
 */
const ToggleHiddenReports = (function(){


	let toggle_button = $('#StrCPVisits_js_db_options_menu_hidden_toggle_btn');
	let btn_icon_visible = $('#StrCPVisits_js_db_options_menu_visible_icon');
	let btn_icon_hidden = $('#StrCPVisits_js_db_options_menu_hidden_icon');
	let report_options_sub_tabs = $('.StrCPVisits_db_list_row_tab');
	let report_options_visible;
	let report_options_hidden;
	let list_type;



	toggle_button.click(function(){

		// If button disabled -> Abort.
		if ( toggle_button.hasClass('disabled') ) {
			return; // Abort.
		}

		setPropertyValues();
		checkSelectionsInCurrentList();

	});




	function setPropertyValues() {
		report_options_visible = $("#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row:not('.StrCPVisits-hidden-indicator')");
		report_options_hidden = $('#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row.StrCPVisits-hidden-indicator');

		// Check which icon is visible/active and accordingly set current list type.
		if ( btn_icon_hidden.is(':visible') ) {
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
		let selected = isChkboxsSelected(); // TRUE ||FALSE.
		if ( selected === false ) {
			return; // Abort.
		}

		// Display default Confirm - popup message.
		if ( ! window.confirm( getMessage() ) ){
			// User clicked Cancel.
			return; // Abort.
		}

		resetSelectionsInCurrentList();

		switchReport();

	}




	function isChkboxsSelected() {
		// Check if there is at least one checkbox selected.
		let checkbox_checked_nr = $('.StrCPVisits_db_list_chkbox:checked').length;
		if ( checkbox_checked_nr > 0) {

			// SOMETHING IS SELECTED.
			return true;

		} else {

			// NOTHING IS SELECTED.
			switchReport();
			return false;
		}
	}




	function getMessage(){
		// Set message.
		let message;
		// Check the current list type.
		if ( list_type === "list-visible") {
			// Message for Hidden list.
			message = STR_CPVISITS.text_switching_to_hidden_list;
		} else if( list_type === "list-hidden" ) {
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
		if ( list_type === "list-visible") {
			displayHiddenReports();
		} else if( list_type === "list-hidden" ) {
			displayVisibleReports();
		}
	}




	function displayHiddenReports() {

		activateIconBtnHidden();

		// If there is no report options visible.
		if (report_options_visible.length == 0) {
			// Display hidden reports.
			report_options_hidden.css('display','flex'); // Show.
		} else {
			// Animate hidining visible reports and after tha display hidden reports.
			report_options_visible.fadeOut('slow', function(){
				// Display hidden reports.
				report_options_hidden.css('display','flex'); // Show.
			});
		}

		doAllAdditionalTasks();
	}




	function activateIconBtnHidden(){
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
			report_options_visible.css('display','flex'); // Show.

		} else {
			// Animate hiding hidden reports and after that display visible reports.
			report_options_hidden.fadeOut('slow',function(){
				// Display report options visible.
				report_options_visible.css('display','flex'); // Show.

			});
		}

		doAllAdditionalTasks();
	}




	function activateIconBtnVisible(){
		// Toggle Button - change icon and styling.
		toggle_button.removeClass('button_active_background_color');
		btn_icon_hidden.hide();
		btn_icon_visible.show();
	}




	function doAllAdditionalTasks(){
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
	function getListType(){

		let current_list_type = "";
		let open_list_type = "";

		if ( list_type === "list-visible" ) {
			current_list_type = "list-visible";
			open_list_type = "list-hidden";

		} else if( list_type === "list-hidden" ) {
			current_list_type = "list-hidden";
			open_list_type = "list-visible";
		}

		let list_type_obj = {
			'current_list_type' : current_list_type,
			'open_list_type' : open_list_type
		};

		return list_type_obj;
	}




	return {
		getListType : getListType
	};

})();
