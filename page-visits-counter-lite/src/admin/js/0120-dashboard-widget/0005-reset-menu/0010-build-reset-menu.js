/**
 * BUILD RESET MENU
 *
 * DESC: On page load create reset menu options.
 * INFO: Invoked in 0500-menu-operations/0020-build-menus-page-type-options.js
 *
 * @type module revealing
 * @param - accepts page-type-names as array parameter
 * @since 1.0.0
 */
const BuildResetMenu = (function(){


	// Config.
	let All_other_as_last_option = true; // true || false

	// Properties.
	let reset_menu  = $('#StrCPVisits_js_db_reset_menu_options_wrapper');
	let page_types_data_arr = []; // page-type-names stripped HTML tags



	// INITIALIZE CONSTRUCTION OF RESET MENU OPTIONS.
	function init( data_arr ){
		page_types_data_arr = data_arr;
		buildOptions();
	}




	// BUILD RESET OPTIONS.
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
		addResetOptionsToMenu( all_other_li_el, options_li_el );
	}




	// BUILD ONE RESET OPTION.
	function buildOption( page_type_name, nr ){
		let html_el = "<li class='StrCPVisits-reset-" + page_type_name + "'>";
			html_el +=	  "<div class='StrCPVisits_db_reset_button button' data-strcpvisits-dbreset-page-type-name='" + page_type_name + "'>";
			html_el +=		  buildSpinner();
			html_el +=		  "<span class='StrCPVisits_js_db_reset_buttons_text'>Reset</span>";
			html_el +=	  "</div>";

		// Page type name.
		if ( page_type_name === "All-Others" ) {
			html_el +=	  "<span class='StrCPVisits_js_db_reset_button_page_type_name'>(<span class='StrCPVisits_js_db_reset_button_page_type_name_nr'>" + nr + "</span>) " + page_type_name + "</span>";
		} else {
			html_el +=	  "<span class='StrCPVisits_js_db_reset_button_page_type_name'>(<span class='StrCPVisits_js_db_reset_button_page_type_name_nr'>" + nr + "</span>) " + page_type_name + ": ...</span>";
		}
			html_el +="</li>";
		return html_el;
	}




	function buildSpinner(){
		let html_el = "<!-- Loading spinner -->";
			html_el += "<div class='StrCPVisits-loading-spinner-wrapper-toggle'>";
			html_el +=	  "<div class='StrCPVisits-loading-spinner'>";
			html_el +=		  "<div class='StrCPVisits-spinner-loader'></div>";
			html_el +=	  "</div>";
			html_el += "</div>";
		return html_el;
	}




	/**
	 * ADD RESET OPTIONS TO MENU
	 *
	 * INFO: This module has config option at the properties level where you can set to display "All other" as first or as last option.
	 *
	 * @since 1.0.0
	 */
	function addResetOptionsToMenu( all_other_li_el, options_li_el ){
		// If there is a page report that belongs to "All-Others" type, display it as a first reset option.
		if ( all_other_li_el != "" && All_other_as_last_option === false ) {
			reset_menu.append( all_other_li_el );
		}

		// Add all other reset options.
		reset_menu.append( options_li_el );


		// If there is a page report that belongs to "All-Others" type, display it as a last reset option.
		if ( all_other_li_el != "" && All_other_as_last_option === true ) {
			reset_menu.append( all_other_li_el );
		}

	}




	return {
		init : init
	};

})();
