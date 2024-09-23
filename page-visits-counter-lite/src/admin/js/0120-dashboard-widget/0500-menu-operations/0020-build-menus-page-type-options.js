/**
 * BUILD MENUS PAGE TYPE OPTIONS
 *
 * DESC: On page load get page type options by looping through page options
 *	   and after data are collected and saved into array - duplicate values removed,
 *	   start initializing individual menu build methods.
 *
 * @since 1.0.0
 */
const BuildMenusPageTypeOptions = (function(){


	// Properties.
	let list_rows = $('#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row');
	let page_types_arr = [];
	let page_types_unique_arr = [];
	let data_arr = [];




	getAllPageTypes();
	generateDataArr();
	initializeIndividualMenuBuilds();




	// GET ALL PAGE TYPES - THAT ARE DISPLAYED IN THE PAGE REPORT LIST.
	function getAllPageTypes(){
		// Get all page_types and push them to arr.
		for (let i = 0; i < list_rows.length; i++) {
			let page_type_name = list_rows.eq(i).attr('data-StrCPV-page-type');
			// Strip HTML tags.
			page_type_name = StrCPV.stripHTMLtags( page_type_name );
			page_types_arr.push(page_type_name);
		}

		// Remove duplicates from array.
		page_types_unique_arr = [...new Set(page_types_arr)];
	}




	/**
	 * GENERATE DATA ARRAY
	 *
	 * DESC: It will generate data_arr which is going to be passed as a param in the end.
	 * INFO: It is collecting page-type-names and nr of their occurrences.
	 *
	 * @type ARRAY OF ARRAYS -> [ ["page_type_name1", nr], ["page_type_name2", nr]... ]
	 * @since 1.0.0
	 */
	function generateDataArr() {
		for (var i = 0; i < page_types_unique_arr.length; i++) {
			let page_type_name = page_types_unique_arr[i];
			let name_occurrences_nr = StrCPV.countOccurrences( page_types_arr, page_type_name );
			data_arr.push([page_type_name, name_occurrences_nr]);
		}
	}




	/**
	 * INITIALIZE INDIVIDUAL MENU BUILDS
	 *
	 * DESC: In this method add a call to each build-menu-init method.
	 *
	 * @param - pass param data_arr - array
	 * @since 1.0.0
	 */
	function initializeIndividualMenuBuilds(){

		BuildResetMenu.init( data_arr );

		BuildFilterMenu.init( data_arr );

		BuildSelectByTypeMenu.init( data_arr );
	}

})();
