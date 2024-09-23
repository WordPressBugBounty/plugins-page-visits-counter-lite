/**
 * BUILD FILTER MENU
 *
 * DESC: On page load create filter menu options.
 * INFO: Invoked in 0500-menu-operations/0020-build-menus-page-type-options.js
 *
 * @type module revealing
 * @param - accepts page-type-names as array parameter
 * @since 1.0.0
 */
const BuildFilterMenu = (function(){


	// Config.
	let All_other_as_last_option = true; // true || false

	// Properties.
	let filter_menu  = $('#StrCPVisits_js_db_filter_menu_options_wrapper');
	let page_types_data_arr = []; // page-type-names stripped HTML tags


	// INITIALIZE CONSTRUCTION OF FILTER MENU OPTIONS.
	function init( data_arr ){
		page_types_data_arr = data_arr;
		buildOptions();
	}




	// BUILD FILTER OPTIONS.
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
		let html_el = "<li class='StrCPVisits-" + page_type_name + "'>";
			html_el +=	  "<input type='checkbox'  id='StrCPVisits-" + page_type_name + "' value='" + page_type_name + "' checked>";

		if ( page_type_name === "All-Others" ) {
			html_el +=	  "<label for='StrCPVisits-" + page_type_name + "'>(<span class='StrCPVisits_js_db_filter_option_page_type_name_nr'>" + nr + "</span>) " + page_type_name + "</label>";
		} else {
			html_el +=	  "<label for='StrCPVisits-" + page_type_name + "'>(<span class='StrCPVisits_js_db_filter_option_page_type_name_nr'>" + nr + "</span>) " + page_type_name + ": ...</label>";
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
			filter_menu.append( all_other_li_el );
		}

		// Add all other reset options.
		filter_menu.append( options_li_el );


		// If there is a page report that belongs to "All-Others" type, display it as a last reset option.
		if ( all_other_li_el != "" && All_other_as_last_option === true ) {
			filter_menu.append( all_other_li_el );
		}

	}




	return {
		init : init
	};

})();
