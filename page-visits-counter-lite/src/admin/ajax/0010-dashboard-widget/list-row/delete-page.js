/**
 * AJAX - DELETE PAGE from dashboard widget - page list
 *
 * DESC: Execute delete page procedure on delete button click.
 *
 * @since 1.0.0
 */
const AjaxDeletePage = (function(){

	// Properties.
	let total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
	let clicked_delete_btn;
	let response_box;

	// Delete button click listener.
	$('#StrCPVisits_js_db_list_wrapper').on('click', '.StrCPVisits-dblist-delete-page-btn', function(evt){
		evt.preventDefault();
		total_page_visits_spinner.show();

		// Get HTML elements and set them as properties.
		clicked_delete_btn = $(this);
		response_box = clicked_delete_btn.closest('.StrCPVisits_db_list_row_tab').find('.StrCPVisits_db_list_row_msg_box');

		// Display popup confirmation message - proceed only if user accept.
		if ( ! window.confirm( STR_CPVISITS.text_delete_page ) ){
			// User clicked Cancel.
			total_page_visits_spinner.hide();
			return; // Abort.
		}

		// Get page name.
		let page_name = $(this).attr('data-StrCPVisits-dblist-page-name');

		$.ajax({
			url: ajaxurl,  // Works by default in WP backend.
			type: 'POST',
			data: {
				action: 'StrCPVisits_delete_page',
				page_name: page_name,
				security: STR_CPVISITS.security
			},
			success: function( response ) {
				// console.log(response);

				// wp_send_json_success.
				if ( response.success === true ) {
					// console.log(response.data);
					handleSuccess();

				} else {
					// console.log(response.data);
					handleError( response.data );
				}

			}
		});// ! $.ajax
	});// ! Delete Btn click




	function handleSuccess(){

		let row_sub_tab = clicked_delete_btn.closest('.StrCPVisits_accordion_panel');
		let page_row = row_sub_tab.prev('section');

		removePageSubRowFromList( row_sub_tab );
		removePageRowFromList( page_row );
	}




	function handleError( response_msg ){
		// Display error.
		response_box.html("<p class='StrCPVisits-error-msg'>" + response_msg + "</p>");
		response_box.slideDown();
		// Hide spinner - total page visits number.
		total_page_visits_spinner.hide();
	}




	function resetResponseBox(){
		response_box.html('');
		response_box.hide();
	}




	function removePageRowFromList( page_row ){
		animatePageRemoving( page_row );
		// Remove page row el after all css animation steps are finished.
		setTimeout(function(){
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




	function animatePageRemoving( page_row ){
		// Set el. height for css animation step.
		let row_height = page_row.height();
		page_row.height(row_height);
		// Add delete class runned by css transition steps.
		page_row.addClass('StrCPVisits_dblist_delete_page_animation');
	}




	function removePageSubRowFromList( row_sub_tab ){
		// REMOVE ROW SUB-TAB.
		row_sub_tab.hide();
		row_sub_tab.remove();
	}

})();
