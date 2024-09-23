/**
 * AJAX - SET AS VISIBLE
 *
 * DESC: Set page reports as visible reports.
 *	   They can be displayed in the visible list only.
 *
 * @since 1.0.0
 */
const AjaxSetAsVisible = (function(){


	// Base Properties.
	let BaseProperties = AjaxSelectMenuBase.getProperties();
	let spinner = BaseProperties.spinner;
	let response_box = BaseProperties.response_box; // Master reset is set in JS.
	let pages_list_wrapper = BaseProperties.pages_list_wrapper;
	let all_list_checkboxes = BaseProperties.all_list_checkboxes;
	let report_options_sub_tabs = BaseProperties.report_options_sub_tabs;


	// Properties.
	let set_visible_button = $("#StrCPVisits_js_db_select_set_visible_btn");
	let selected_reports_checkboxes;
	let page_names_arr = [];




	// CLICK LISTENER.
	set_visible_button.click( function(e){
		e.preventDefault();


		// If Button is disabled -> ABORT.
		if ( $(this).hasClass('StrCPVisits_icon_btn_disabled') ) {
			return; // Abort
		}


		// Display popup confirmation message - proceed only if user accepts.
		if ( ! window.confirm( STR_CPVISITS.text_move_to_visible_list ) ){
			// User has clicked Cancel.
			return; // Abort
		}


		disableSelection();
		spinner.show();
		setProperties();


		$.ajax({
			url: ajaxurl,  // Works by default in WP backend.
			type: 'POST',
			data: {
				action: 'StrCPVisits_db_toggle_hidden_reports',
				data: page_names_arr,
				list: 'visible',
				security: STR_CPVISITS.security
			},
			success: function( response ) {
				// console.log(response);

				// wp_send_json_success.
				if ( response.success === true ) {
					// console.log(response.data);
					handleSuccess( response.data );

				} else {
					// console.log(response.data);
					handleError( response.data );
				}

			}
		}); // ! $.ajax
	}); // ! btn.click()




	function disableSelection(){
		all_list_checkboxes.prop('disabled', true);
	}




	function enableSelection(){
		all_list_checkboxes.prop('disabled', false);
	}




	function setProperties(){
		selected_reports_checkboxes = AjaxSelectMenuBase.getSelectedReports();
		page_names_arr = AjaxSelectMenuBase.getSelectedPageNamesArr( selected_reports_checkboxes );
	}




	function handleSuccess( response_msg ){
		// Hide all page reports sub-tabs.
		report_options_sub_tabs.hide();
		// Hide selected reports from the visible list - and add the hidden class.
		let selected_reports = selected_reports_checkboxes.closest('.StrCPVisits_db_list_row');
		selected_reports.removeClass('StrCPVisits-hidden-indicator');
		selected_reports.hide();
		selected_reports_checkboxes.prop('checked', false); // unselect all selected.
		enableSelection();
		publishEvents();
		spinner.hide();
	}




	function publishEvents(){
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




	function handleError( response_msg ){
		spinner.hide();
		// Display response in response box.
		response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
		response_box.slideDown();
		enableSelection();
	}

})();
