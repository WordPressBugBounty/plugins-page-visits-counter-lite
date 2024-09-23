/**
 * RECALCULATE TOTAL PAGE VISITS
 *
 * DESC: After single page visits number is updated, reset or deleted recalculate total page visits nr
 *	   and update the total page visits nr in total page visits box.
 * INFO: Invoked by observer from
 *		   - ajax/update-page-visits.js
 *		   - ajax/delete-page.js
 *
 * @type Revealing module
 * @since 1.0.0
 */
const RecalculateTotalPageNr =(function(){


	// Observer listener.
	StrCPVevents.subscribe("StrCPVrecalculateTotalPageNr", function(){
		calculateTotalPageNr();
	});





	/**
	 * CALCULATE TOTAL PAGE NR
	 *
	 * DESC: This will be executed after the:
	 *		   - successful page visits number update
	 *		   - page report deleted from the report list
	 *
	 * @since 1.0.0
	 */
	function calculateTotalPageNr(){
		// Variables.
		let total_page_visits_spinner = $('#StrCPVisits-js-db-total-page-visits-spinner');
		let total_visits_holder = $('#StrCPVisits_js_db_total_page_visits');
		// Get all number holder elements - visible and hidden.
		let nr_holder_elements = $('.StrCPVisits_db_list_visits_nr');
		// Calculate total visits.
		let total_visits_nr = calculate( nr_holder_elements );
		// Hide spinner - total page visits number.
		total_page_visits_spinner.hide();
		// Replace total page visits number
		total_visits_holder.text( total_visits_nr ); // stripped HTML tags in calculate().
		// Update filtered page number as well.
		calculateFilteredPageNr();
	}




	/**
	 * CALCULATE FILTERED PAGE NR.
	 *
	 * DESC: Summarize all none filtered ( not hidden ) page visit numbers.
	 * INFO: It will be updated when:
	 *		   - option filtered out
	 *		   - option filtered in
	 *		   - page visits number updated
	 *		   - page deleted from report
	 *
	 * @since 1.0.0
	 */
	function calculateFilteredPageNr(){
		// Get Notification and Filtered visits nr holder early so change can be instant.
		let filtered_notification_visits_holder = $('#StrCPVisits_js_db_filter_menu_notific_nr');
		let filtered_visits_holder = $('#StrCPVisits_js_db_filter_menu_header_nr');

		// Select all visible sections - number holder elements.
		let report_list_wrapper = $('#StrCPVisits_js_db_list_wrapper');
		let visible_nr_holder_elements = report_list_wrapper.find('.StrCPVisits_db_list_row span.StrCPVisits-visible-indicator');
		// Calculate total visits and return the number.
		let total_visits_nr =  calculate( visible_nr_holder_elements );

		// Update notification and filtered visits number.
		filtered_visits_holder.text( total_visits_nr ); // Stripped HTML tags in calculate().
		filtered_notification_visits_holder.text( total_visits_nr ); // Stripped HTML tags in calculate().
	}




	/**
	 * CALCULATE
	 *
	 * DESC: Summarize all row numbers and return the total number.
	 *
	 * @since 1.0.0
	 */
	function calculate( nr_holder_elements ){
		let total_visits = 0;

		// Calculate new total page visits number.
		for (let i = 0; i < nr_holder_elements.length; i++) {
			let page_visits_nr = Number( StrCPV.stripHTMLtags( nr_holder_elements.eq(i).text() ) );
			total_visits = total_visits + page_visits_nr;
		}
		return total_visits;
	}




	// Reveal the calculate method so it can be reused in recalc-filtered-visits.js
	return {
		calculateFilteredVisits: calculateFilteredPageNr
	};

})();
