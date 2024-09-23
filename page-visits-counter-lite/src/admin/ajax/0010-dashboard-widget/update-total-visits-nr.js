
/**
 * AJAX - UPDATE TOTAL VISITS NUMBER in dashboard widget - total visits box
 *
 * @since 1.0.0
 */
const AjaxUpdateTotalVisitsNr = (function(){


	// Properties.
	let spinner = $('#StrCPVisits-js-db-edit-total-visits-spinner');
	let total_nr = $('#StrCPVisits_js_db_total_visits_box_nr');
	let form = $('#StrCPVisits-js-db-edit-total-visits-nr-form');
	let response_box = $('#StrCPVisits-js-db-edit-total-visits-respone-box');
	let new_nr;


	// Form submit listener.
	form.submit(function(evt){
		evt.preventDefault();
		response_box.html('');// Reset.
		spinner.show();

		// Get NEW NUMBER.
		new_nr = $('#StrCPVisits-js-db-edit-total-visits-nr').val();
		// Remove HTML tags before displaying data.
		new_nr = StrCPV.stripHTMLtags( new_nr );


		$.ajax({
			url: ajaxurl,  // Works by default in WP backend.
			type: 'POST',
			data: {
				action: 'StrCPVisits_update_total_visits_nr',
				data: new_nr,
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




	function handleSuccess( response_msg ){
		spinner.hide();
		// Display response in response box.
		response_box.html("<p class='StrCPVisits-success-msg'>" + response_msg + "</p>");
		response_box.slideDown();
		// Update page visits number.
		total_nr.html( new_nr );
	}




	function handleError( response_msg ){
		spinner.hide();
		// Display response in response box.
		response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
		response_box.slideDown();
	}

})();
