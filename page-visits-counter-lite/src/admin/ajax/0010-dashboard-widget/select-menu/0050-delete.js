/**
 * AJAX - SELECTION DELETE
 *
 * DESC: Delete only selected page reports.
 *
 * @since 1.0.0
 */
const AjaxSelectionDelete = (function(){


	// Base Properties.
	let BaseProperties = AjaxSelectMenuBase.getProperties();
	let spinner = BaseProperties.spinner;
	let response_box = BaseProperties.response_box; // Master reset is set in JS.
	let pages_list_wrapper = BaseProperties.pages_list_wrapper;
	let all_list_checkboxes = BaseProperties.all_list_checkboxes;


	// Properties.
	let total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
	let delete_button = $("#StrCPVisits_js_db_select_delete_btn");
	let selected_reports;
	let page_names_arr = [];




	// Form submit listener.
	delete_button.click( function(e){
		e.preventDefault();

		// If Button is disabled -> ABORT.
		if ( delete_button.hasClass('StrCPVisits_icon_btn_disabled') ) {
			return; // Abort.
		}


		// Display popup confirmation message - proceed only if user accept.
		if ( ! window.confirm( STR_CPVISITS.text_delete_selected ) ){
			// User clicked Cancel.
			return; // Abort.
		}


		disableSelection();
		displaySpinners();
		setProperties();


		$.ajax({
			url: ajaxurl,  // Works by default in WP backend.
			type: 'POST',
			data: {
				action: 'StrCPVisits_delete_pages',
				data: page_names_arr,
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
		});// !$.ajax
	});// ! AJAX form.submit




	function disableSelection(){
		all_list_checkboxes.prop('disabled', true);
	}




	function enableSelection(){
		all_list_checkboxes.prop('disabled', false);
	}



	function setProperties(){
		selected_reports = AjaxSelectMenuBase.getSelectedReports();
		page_names_arr = AjaxSelectMenuBase.getSelectedPageNamesArr( selected_reports );
	}




	function displaySpinners(){
		total_page_visits_spinner.show();
		spinner.show();
	}




	function hideSpinners(){
		total_page_visits_spinner.hide();
		spinner.hide();
	}




	function handleSuccess( response_msg ){

		let page_rows = selected_reports.closest('.StrCPVisits_db_list_row');
		let page_sub_rows = page_rows.next('.StrCPVisits_db_list_row_tab');

		removePageSubRowsFromList( page_sub_rows );
		removePageRowsFromList( page_rows );
	}




	function handleError( response_msg ){
		hideSpinners();
		// Display response in response box.
		response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
		response_box.slideDown();
		enableSelection();
	}




	function removePageRowsFromList( page_rows ){
		animatePagesRemoving( page_rows );
		// Remove page row el. after all CSS animation steps are finished.
		setTimeout(function(){
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




	function animatePagesRemoving( page_rows ){
		// Add the delete class triggered by css transition steps.
		page_rows.addClass('StrCPVisits_dblist_delete_page_animation');
	}




	function removePageSubRowsFromList( row_sub_tabs ){
		// REMOVE ROW SUB-TAB.
		row_sub_tabs.hide();
		row_sub_tabs.remove();
	}

})();
