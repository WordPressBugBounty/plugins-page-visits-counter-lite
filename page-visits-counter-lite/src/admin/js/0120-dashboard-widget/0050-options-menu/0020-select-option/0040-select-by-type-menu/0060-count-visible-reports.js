/**
 * COUNT VISIBLE REPORTS
 *
 * @type: Module revealing
 * @since 1.0.0
 */
const CountVisibleReports = (function(){


	let select_by_type_options;
	let select_option_displayed_nr;
	let select_option_displayed_total_nr;
	let list_type_obj; // {current_list_type: "list-hidden", open_list_type: "list-visible"}
	let select_option;
	let page_type_name;



	// Listen to ajax delete event/s - single page report and multiple selections delete.
	// Listen to ajax set-as-visible.js and set-as-hidden.js
	StrCPVevents.subscribe("StrCPVcountAndUpdatePageByTypeReportsNr", init);




	function init(){
		setPropertyValues();

		// For each page-type-name.
		for (let i = 0; i < select_by_type_options.length; i++) {
			select_option = select_by_type_options.eq(i);
			page_type_name = select_option.val();
			select_option_displayed_nr = select_option.closest(".StrCPVisits-select-" + page_type_name).find('.StrCPVisits_js_select_by_type_option_nr');
			select_option_displayed_total_nr = select_option.closest(".StrCPVisits-select-" + page_type_name).find('.StrCPVisits_js_select_by_type_option_total_nr');

			detectListType();
			countTotalReportsInPageType();
		}
	}




	function setPropertyValues(){
		select_by_type_options = $('.StrCPVisits-select-by-type-option');
		// Get list type obj - {current_list_type: "list-hidden", open_list_type: "list-visible"}.
		list_type_obj = ToggleHiddenReports.getListType();
	}




	function detectListType(){
		if ( list_type_obj.open_list_type === "list-hidden" ) {
			// LIST HIDDEN.
			HiddenListCountHiddenReportsInPageType();
		} else if( list_type_obj.open_list_type === "list-visible" ) {
			// LIST VISIBLE.
			VisibleListCountReportsInPageType();
		} else {
			// Page is loaded - default list type is LIST-VISIBLE.
			// console.log('default list type');
			VisibleListCountReportsInPageType();
		}
	}




	function VisibleListCountReportsInPageType(){
		let visible_reports_nr = $(".StrCPVisits_db_list_row:not('.StrCPVisits-hidden-indicator')[data-strcpv-page-type='" + page_type_name + "']").length;
		// console.log(visible_reports_nr);
		displayListCountedNr( visible_reports_nr );
	}




	function HiddenListCountHiddenReportsInPageType(){

		let hidden_reports_nr = $(".StrCPVisits_db_list_row.StrCPVisits-hidden-indicator[data-strcpv-page-type='" + page_type_name + "']").length;
		// console.log(hidden_reports_nr);
		displayListCountedNr( hidden_reports_nr );
	}




	function displayListCountedNr( nr ){
		// Add counted number ( in list ) to the select-by-type element.
		select_option_displayed_nr.text( nr );

		/**
		 * Hide select-by-type option if number of reports in current list is zero,
		 * else display the option.
		 */
		if (nr == 0) {
			select_option.prop('checked', false); // Uncheck.
			select_option.attr('disabled', true); // Disable.
		} else {
			select_option.attr('disabled', false); // Enable.
		}
	}




	function countTotalReportsInPageType(){
		let total_reports_nr = $(".StrCPVisits_db_list_row[data-strcpv-page-type='" + page_type_name + "']").length;
		displayTotalCountedNr( total_reports_nr );
	}




	function displayTotalCountedNr( total_nr ){
		// Add total number to the select-by-type element.
		select_option_displayed_total_nr.text( total_nr );
	}




	return {
		init : init
	};


})();
