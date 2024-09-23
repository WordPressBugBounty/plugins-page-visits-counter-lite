/**
 * AJAX - SETTINGS FORM
 *
 * DESC: saving data in settings tab menu.
 *
 * @since 1.0.0
 */
const AjaxSettingsForm = (function(){

	// Properties.
	let spinner = $('#StrCPVisits-js-settings-form-submit-btn-spinner');
	let settings_form = $('#StrCPVisits-js-settings-form');
	let main_response_box = $('#StrCPVisits-js-settings-form-response');
	let individual_response_boxes = $('.StrCPVisits-settings-form-response-box-individual');




	// Reset response box on form data click/change.
	settings_form.click(function(){
		main_response_box.html('');
		individual_response_boxes.html('');
	});




	// Form submit listener.
	settings_form.submit(function(evt){
		evt.preventDefault();
		spinner.show();
		let formData = $(this).serialize();

		$.ajax({
			url: ajaxurl,  // Works by default in WP backend.
			type: 'POST',
			data: {
				action: 'StrCPVisits_save_settings',
				settings_data: formData,
				security: STR_CPVISITS.security
			},
			success: function( response ) {
				// console.log(response);

				// wp_send_json_success.
				if ( response.success === true ) {
					// console.log(response.data);
					handleResponse( response.data );
				}

			}
		});// ! $.ajax
	});// ! AJAX form.submit




	/**
	 * HANDLE RESPONSE
	 *
	 * DESC: Check response statuses for each option on settings page.
	 *
	 * @since 1.0.0
	 */
	function handleResponse( data ){

		// DELETE PLUGIN DATA.
		if ( data.delete_plugin_data.success === true ) {
			// UPDATE SUCCESS.
			$('#StrCPVisits-js-sett-form-plugin-data-response-box').html("<span class='dashicons dashicons-yes'></span>");

		} else if( data.delete_plugin_data.success === false ){
			// NOT UPDATED.
			$('#StrCPVisits-js-sett-form-plugin-data-response-box').html("<p class='StrCPVisits-success-msg'>( " + data.delete_plugin_data.msg + " )</p>");
		}




		// response_box.html("<p class='StrCPVisits-success-msg'>" + response_msg + "</p>");
		spinner.hide();
	}

})();
