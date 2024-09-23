/**
 * BUILD SELECT-BY-PAGE-TYPE MENU
 *
 * DESC: On page load create menu options.
 * INFO: Invoked in 0500-menu-operations/0020-build-menus-page-type-options.js
 *
 * @type module revealing
 * @param - accepts page-type-names as array parameter
 * @since 1.0.0
 */
const BuildSelectByTypeMenu = (function(){


	// Config.
	let All_other_as_last_option = true; // TRUE || FALSE.

	// Properties.
	let menu  = $('#StrCPVisits_js_db_page_type_menu > ul');
	let page_types_data_arr = []; // page-type-names stripped HTML tags.




	// INITIALIZE CONSTRUCTION OF FILTER MENU OPTIONS.
	function init( data_arr ){
		page_types_data_arr = data_arr;
		buildOptions();
	}




	// BUILD OPTIONS.
	function buildOptions(){
		let all_other_li_el = "";
		let options_li_el = "";

		// For each page type in array build option.
		for (let i = 0; i < page_types_data_arr.length; i++) {
			let page_type_name = page_types_data_arr[i][0];
			let page_type_occurrances_nr = page_types_data_arr[i][1];

			// Build the "All-Others" li element - separately.
			if ( page_type_name === "All-Others" && all_other_li_el === "" ) { // Run it only once.
				all_other_li_el = buildOption( page_type_name, page_type_occurrances_nr );
			} else {
				options_li_el += buildOption( page_type_name, page_type_occurrances_nr );
			}
		}
		addFilterOptionsToMenu( all_other_li_el, options_li_el );
	}




	// BUILD ONE FILTER OPTION.
	function buildOption( page_type_name, nr ){
		let html_el = "<li class='StrCPVisits-select-" + page_type_name + "'>";
			html_el +=	  "<input type='checkbox'  id='StrCPVisits-select-" + page_type_name + "' class='StrCPVisits-select-by-type-option' value='" + page_type_name + "'>";

		let number = "<span class='StrCPVisits_js_select_by_type_option_nr'>" + nr + "</span>/<span class='StrCPVisits_js_select_by_type_option_total_nr'>" + nr + "</span>";

		if ( page_type_name === "All-Others" ) {
			html_el +=	  "<label for='StrCPVisits-select-" + page_type_name + "'>(" + number + ") " + page_type_name + "</label>";
		} else {
			html_el +=	  "<label for='StrCPVisits-select-" + page_type_name + "'>(" + number + ") " + page_type_name + ": ...</label>";
		}
			html_el +="</li>";
		return html_el;
	}




	/**
	 * ADD FILTER OPTIONS TO MENU
	 *
	 * INFO: This module has config option at the properties level where you can set to display "All other" as first or as last option.
	 *
	 * @since 1.0.0
	 */
	function addFilterOptionsToMenu( all_other_li_el, options_li_el ){

		// If there is a page report that belongs to "All-Others" type, display it as a first reset option.
		if ( all_other_li_el != "" && All_other_as_last_option === false ) {
			menu.append( all_other_li_el );
		}

		// Add all other reset options.
		menu.append( options_li_el );


		// If there is a page report that belongs to "All-Others" type, display it as a last reset option.
		if ( all_other_li_el != "" && All_other_as_last_option === true ) {
			menu.append( all_other_li_el );
		}

		/**
		 * INFO:
		 * Initialization of Count number of reports under each page type
		 * is set in select-toggle.js ( SELECT - TOGGLE BUTTON ).
		 */

	}




	return {
		init : init
	};

})();
