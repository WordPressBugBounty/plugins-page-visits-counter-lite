/**
 * AJAX - RESET ALL in dashboard widget
 *
 * DESC: Reset all visits number to zero - excl. TOTAL INDEPENDENT Loads & Reloads box.
 *
 * @since 1.0.0
 */
const AjaxResetAll = (function(){


	// Properties
	let total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
	let btn_spinner = $("#StrCPVisits-js-db-reset-all-spinner");
	let btn = $('#StrCPVisits_js_db_reset_all_btn');
	let response_box = $("#StrCPVisits_js_db_reset_response_box"); // Master reset is set in JS.


	// Form submit listener.
	btn.click( function(){
		displaySpinners();


		$.ajax({
			url: ajaxurl,  // Works by default in WP backend.
			type: 'POST',
			data: {
				action: 'StrCPVisits_db_reset_all',
				data: "RESET-ALL",
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




	function displaySpinners(){
		total_page_visits_spinner.show();
		btn.addClass('StrCPVisits_js_db_reset_btn_active');
		btn_spinner.show();
	}




	function hideSpinners(){
		total_page_visits_spinner.hide();
		btn.removeClass('StrCPVisits_js_db_reset_btn_active');
		btn_spinner.hide();
	}




	function handleSuccess( response_msg ){
		// Set all pages visits number to zero.
		$('.StrCPVisits_db_list_visits_nr').text('0');
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
