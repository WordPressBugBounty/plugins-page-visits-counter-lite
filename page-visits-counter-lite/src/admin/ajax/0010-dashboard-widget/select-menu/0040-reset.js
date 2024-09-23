/**
 * AJAX - SELECTION RESET
 *
 * DESC: Reset only selected page reports to zero.
 *
 * @since 1.0.0
 */
const AjaxSelectionReset = (function(){


	// Base Properties.
	let BaseProperties = AjaxSelectMenuBase.getProperties();
	let spinner = BaseProperties.spinner;
	let response_box = BaseProperties.response_box; // Master reset is set in JS.
	let pages_list_wrapper = BaseProperties.pages_list_wrapper;


	// Properties.
	let total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
	let reset_button = $("#StrCPVisits_js_db_select_reset_btn");
	let selected_reports;
	let page_names_arr = [];




	// Form submit listener.
	reset_button.click( function(e){
		e.preventDefault();

		// If Button is disabled -> ABORT.
		if ( $(this).hasClass('StrCPVisits_icon_btn_disabled') ) {
			return; // Abort
		}


		// Display popup confirmation message - proceed only if user accepts.
		if ( ! window.confirm( STR_CPVISITS.text_reset_selected ) ){
			// User clicked Cancel.
			return; // Abort.
		}


		displaySpinners();
		setProperties();


		$.ajax({
			url: ajaxurl,  // Works by default in WP backend.
			type: 'POST',
			data: {
				action: 'StrCPVisits_db_reset_page_type',
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
		});// ! $.ajax
	});// ! AJAX form.submit




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
		// Set all pages - visits number to zero - (By page type of reset pages).
		selected_reports.closest('.StrCPVisits_db_list_row').find('.StrCPVisits_db_list_visits_nr').text('0');
		setTimeout(function(){
			// Recalculate total page nr.
			StrCPVevents.publish("StrCPVrecalculateTotalPageNr");
			hideSpinners();
		},1000);
	}




	function handleError( response_msg ){
		hideSpinners();
		// Display response in response box.
		response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
		response_box.slideDown();
	}

})();
