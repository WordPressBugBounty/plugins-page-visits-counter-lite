/**
 * AJAX - UPDATE PAGE VISITS NUMBER in dashboard widget - page list
 *
 * @since 1.0.0
 */
const AjaxUpdatePageVisitsNr = (function(){


	// Properties.
	let total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
	let submit_form_spinner;
	let response_box; // Master reset is set in JS
	let new_nr;
	let row_nr;


	// Form submit listener.
	$('#StrCPVisits_js_db_list_wrapper').on('submit', '.StrCPVisits-dblist-page-visits-form', function(evt){
		evt.preventDefault();

		// Display spinner aside total page visits number.
		StrCPVevents.publish("StrCPVTotalPageNrDisplaySpinner");

		setPropertyValues( $(this) );
		displaySpinners();

		// Get form data.
		let formData = $(this).serialize();

		$.ajax({
			url: ajaxurl,  // Works by default in the WP backend.
			type: 'POST',
			data: {
				action: 'StrCPVisits_update_page_data',
				settings_data: formData,
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




	/**
	 * SET GLOB VARIABLE VALUES
	 *
	 * DESC: Set values for variables: response_box, row_nr, and new_nr.
	 *
	 * @since 1.0.0
	 */
	function setPropertyValues( submited_form ){
		// Get current SubROW el.
		let sub_tab = submited_form.closest('.StrCPVisits_db_list_row_tab ');
		// Set current form spinner el.
		submit_form_spinner = sub_tab.find('.StrCPVisits-loading-spinner-wrapper-toggle');
		// Get current response box el.
		response_box = sub_tab.find('.StrCPVisits_db_list_row_msg_box');
		// Get current page visits nr el.
		row_nr = sub_tab.prev('section').find('.StrCPVisits_db_list_visits_nr');

		// Get new number (int).
		new_nr = submited_form.find('.StrCPVisits-dblist-page-visits-nr').val();
		// Remove HTML tags before displaying data.
		new_nr = StrCPV.stripHTMLtags( new_nr );
	}




	function displaySpinners(){
		total_page_visits_spinner.show();
		submit_form_spinner.show();
	}




	function handleSuccess( response_msg ){
		// Update page visits number.
		row_nr.html( new_nr );
		// Hide edit page nr spinner.
		submit_form_spinner.hide();
		// Recalculate total page nr.
		StrCPVevents.publish("StrCPVrecalculateTotalPageNr");
	}




	function handleError( response_msg ){
		// Hide spinners.
		submit_form_spinner.hide();
		total_page_visits_spinner.hide();
		// Display response in response box..
		response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
		response_box.slideDown();
	}

})();
