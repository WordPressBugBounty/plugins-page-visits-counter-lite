/**
 * SEARCH OPTION TOGGLE
 *
 * DESC: On typing the name in the search input field automatically filter/hide reports that doesn't match.
 *
 * @type Module revealing
 * @since 1.0.0
 */
const SearchFilter = (function(){


	let reports_wrapper; // Search list wrapper.
	let report_options; // List.
	let wait_timer; // Debouncer.
	let value;
	let report_option;




	// KeyUp listener.
	$('#StrCPVisits_js_db_search_input_field').keyup(function(){
		setPropertyValues( $(this) );
		checkTimer();
	});




	function setPropertyValues( search_box_el ){
		value = search_box_el.val();
		reports_wrapper = $('#StrCPVisits_js_db_list_wrapper'); // Search list wrapper.
		report_options = reports_wrapper.find('.StrCPVisits_db_list_row'); // List.
	}




	// Debouncer - wait 400ms for new updates.
	function checkTimer(){
		clearTimeout(wait_timer);
		wait_timer = setTimeout(function() {
			checkIfValueEmpty();
		}, 400);
	}




	function checkIfValueEmpty() {
		if ( value.length == 0 ) {
			// No search term. ( The term deleted. )
			searchReset();
		} else {
			// There is a search term.
			filterOutReports();
		}
	}




	function filterOutReports(){
		// Loop through all report options.
		for (let i = 0; i < report_options.length; i++) {
			report_option = report_options.eq(i);
			let page_name = report_option.attr('data-strcpv-page-name');
			// Check if report option page name has substring that is typed by user.
			if( !page_name.includes( value ) ) {
				hideReportOption();
			} else {
				displayReportOption();
			}
		}
	}




	function hideReportOption() {
		// If report option expanded - close it.
		if ( report_option.hasClass('StrCPVisits_accordion_active') ) {
			report_option.click();
		}
		report_option.hide();
	}




	function displayReportOption() {
		report_option.show();
	}




	/**
	 * SEARCH RESET
	 *
	 * DESC: Restore current list type. Either hidden or visible list.
	 *
	 * @since 1.0.0
	 */
	function searchReset(){
		let list_type_obj = ToggleHiddenReports.getListType();
		let report_options_visible = $("#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row:not('.StrCPVisits-hidden-indicator')");
		let report_options_hidden = $('#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row.StrCPVisits-hidden-indicator');

		if( list_type_obj.open_list_type === "list-hidden" ) {
			/**
			 * DISPLAY HIDDEN LIST
			 *
			 * DESC: Display all reports with indicator-class-hidden and
			 *	   Hide all reports without indicator-class-hidden.
			 */
			report_options_visible.hide();
			report_options_hidden.show();

		} else{
			/**
			 * DISPLAY VISIBLE LIST
			 *
			 * DESC: Hide all reports with indicator-class-hidden and
			 *	   Display all reports without indicator-class-hidden.
			 */
			report_options_visible.show();
			report_options_hidden.hide();
		}
	}




	return {
		reset : searchReset
	};

})();
