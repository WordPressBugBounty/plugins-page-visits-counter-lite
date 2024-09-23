/**
 * AJAX - SELECT MENU BASE
 *
 * DESC: Base module for icon-menu options available after at least one page report is selected.
 *	   It holds properties and methods that are used in options:
 *	   set-as-visible, set-as-hidden, reset, and delete.
 * TYPE: Module revealing.
 *
 * @since 1.0.0
 */
const AjaxSelectMenuBase = (function(){


	// Properties.
	let spinner = $('#StrCPVisits-js-db-select-icon-menu-spinner');
	let response_box = $("#StrCPVisits_js_db_select_response_box"); // Master reset is set in JS.
	let pages_list_wrapper = $('#StrCPVisits_js_db_list_wrapper');
	let all_list_checkboxes = $('.StrCPVisits_db_list_chkbox');
	let report_options_sub_tabs = $('.StrCPVisits_db_list_row_tab');

	// Properties getter.
	function getProperties(){
		return {
			"spinner" : spinner,
			"response_box" : response_box,
			"pages_list_wrapper" : pages_list_wrapper,
			"all_list_checkboxes" : all_list_checkboxes,
			"report_options_sub_tabs" : report_options_sub_tabs
		};
	}




	function getSelectedReports(){
		let selected_reports = pages_list_wrapper.find(".StrCPVisits_db_list_chkbox:checked");
		return selected_reports;
	}




	function getSelectedPageNamesArr( selected_reports ){
		let page_titles_arr = [];
		// Get page names.
		for (var i = 0; i < selected_reports.length; i++) {
			let page_row = selected_reports.eq(i);
			let page_name = page_row.attr('data-strcpv-inp-page-name');
				page_name = StrCPV.stripHTMLtags(page_name);
			page_titles_arr.push( page_name );
		}
		return page_titles_arr;
	}




	return {
		getProperties : getProperties,
		getSelectedReports : getSelectedReports,
		getSelectedPageNamesArr : getSelectedPageNamesArr
	};

})();
