/**
 * FILTER REPORTS
 *
 * DESC: On filter option uncheck (in menu filter):
 *	   - Hide all reports of page type
 *	   - Recalculate total page visits
 *
 * @since 1.0.0
 */
const FilterReports = (function(){


	// Properties.
	let options  = $('#StrCPVisits_js_db_filter_menu_options_wrapper');
	let report_list_wrapper = $('#StrCPVisits_js_db_list_wrapper');
	let report_section_elements; // accordion btn-row.
	let report_div_elements; // accordion panel.




	// Checkbox click listener.
	options.on('change', 'li > input', function(){

		// Get page-type-name value from clicked input/checkbox el.
		let page_type_name = $(this).val();

		// Select all elements with page-type-name.
		report_section_elements = report_list_wrapper.find("section[data-strcpv-page-type='" + page_type_name + "']");
		report_div_elements = report_list_wrapper.find("div[data-strcpv-page-type='" + page_type_name + "']");

		checkInputState( $(this) );
	});




	// Check input state. ( Checked or not. )
	function checkInputState( clicked_input_el ){

		if ( clicked_input_el.is(':checked')) {
			// Checked.
			displayReports( clicked_input_el );

		} else {
			// Unchecked.
			hideReports( clicked_input_el );
		}

		RecalculateTotalPageNr.calculateFilteredVisits();

	}




	function hideReports( clicked_input_el ){
		// Remove visible indicator class from number holder on filtered out reports.
		report_section_elements.find('.StrCPVisits_db_list_visits_nr').removeClass('StrCPVisits-visible-indicator');

		report_div_elements.hide();
		report_section_elements.hide();
		report_section_elements.removeClass('StrCPVisits_accordion_active');
		// Mark row with indicator class - hidden - which is telling that this row should be hidden even if displayed in search results.
		report_section_elements.addClass('StrCPVisits-hidden-indicator'); // Add line-through styling for page name.
	}




	function displayReports( clicked_input_el ){
		// Add visible indicator class to number holder on filtered in reports.
		report_section_elements.find('.StrCPVisits_db_list_visits_nr').addClass('StrCPVisits-visible-indicator');
		report_section_elements.css('display', 'flex');
		// Remove indicator class - hidden - from row.
		report_section_elements.removeClass('StrCPVisits-hidden-indicator');
	}

})();
