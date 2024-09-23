/**
 * AJAX - RESET PAGE TYPE in dashboard widget
 *
 * DESC: Reset page type visits number only to zero.
 *
 * @since 1.0.0
 */
const AjaxResetPageType = (function(){


	// Properties.
	let total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
	let btn_spinner;
	let btns = $('.StrCPVisits_db_reset_button');
	let response_box = $("#StrCPVisits_js_db_reset_response_box"); // Master reset is set in JS.
	let clicked_button;
	let page_type_name;
	let pages_list_wrapper = $('#StrCPVisits_js_db_list_wrapper');
	let page_rows;
	let page_names_arr = [];


	// Form submit listener.
	btns.click( function(){
		setProperties( $(this) );
		displaySpinners( $(this) );
		page_names_arr = getPageNamesByPageType();

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




	function setProperties( clicked_btn ){
		btn_spinner = clicked_btn.find('.StrCPVisits-loading-spinner-wrapper-toggle');
		page_type_name = clicked_btn.attr('data-strcpvisits-dbreset-page-type-name');
		clicked_button = clicked_btn;
	}




	function getPageNamesByPageType(){
		let page_titles_arr = [];
		page_rows = pages_list_wrapper.find("section[data-strcpv-page-type='" + page_type_name + "']");
		// Get page names.
		for (var i = 0; i < page_rows.length; i++) {
			let page_row = page_rows.eq(i);
			let page_name = page_row.attr('data-strcpv-page-name');
				page_name = StrCPV.stripHTMLtags(page_name);
			page_titles_arr.push( page_name );
		}
		return page_titles_arr;
	}




	function displaySpinners(){
		total_page_visits_spinner.show();
		clicked_button.addClass('StrCPVisits_js_db_reset_btn_active');
		btn_spinner.show();
	}




	function hideSpinners(){
		total_page_visits_spinner.hide();
		clicked_button.removeClass('StrCPVisits_js_db_reset_btn_active');
		btn_spinner.hide();
	}




	function handleSuccess( response_msg ){
		// Set all pages - visits number to zero - (by page type of reset pages).
		page_rows.find('.StrCPVisits_db_list_visits_nr').text('0');
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
