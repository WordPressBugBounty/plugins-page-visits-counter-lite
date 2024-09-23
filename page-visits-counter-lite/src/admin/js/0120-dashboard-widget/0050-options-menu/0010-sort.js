/**
 * SORT OPTION  (A-Z || Z-A)
 *
 * DESC: On "A-Z" button click sort page reports alphabetically and on another click reverse sorting from Z-A.
 *
 * @since 1.0.0
 */
const SortByPageNames = (function(){


	let sort_btn = $('#StrCPVisits_js_db_options_menu_sort_btn');
	let btn_txt_a_z = $('#StrCPVisits_js_db_options_menu_sort_btn_a-z');
	let btn_txt_z_a = $('#StrCPVisits_js_db_options_menu_sort_btn_z-a');
	let reports_wrapper;
	let report_buttons;
	let page_names_arr = [];




	sort_btn.click(function(){

		// If button disabled -> Abort.
		if ( sort_btn.hasClass('disabled') ) {
			return; // Abort
		}

		getAllPageNames();
		sortArray( $(this) );
		updateReportsWrapper();

	});




	// Get all page names and push them to array.
	function getAllPageNames(){
		// Get report wrapper and set it as property value.
		reports_wrapper = $('#StrCPVisits_js_db_list_wrapper');
		// Get report button elements and set it as property value.
		report_buttons = reports_wrapper.find('.StrCPVisits_db_list_row');

		// Loop through all buttons and get page names.
		for ( let i = 0; i < report_buttons.length; i++ ) {
			let btn = report_buttons.eq(i);
			let page_name = btn.attr('data-strcpv-page-name');
			page_names_arr.push( page_name );
		}
	}




	/**
	 * SORT ARRAY
	 *
	 * DESC: By the button state determine how to sort the page reports.
	 *	   Either A-Z or Z-A.
	 *
	 * @param sort_btn - clicked btn el - fresh to pick up changes
	 * @since 1.0.0
	 */
	function sortArray( sort_btn ){

		// Sort alphabetically  - case insensitive.
		page_names_arr.sort(function(a, b){
			let nameA=a.toLowerCase(), nameB=b.toLowerCase();
			if (nameA < nameB) //sort string ascending
				return -1;
			if (nameA > nameB)
				return 1;
			return 0; // Default - return value - no sorting
		});



		if ( sort_btn.hasClass("StrCPVisits_js_db_sort_btn_state_a-z") ) {
			// STATE A-Z.
			btn_txt_a_z.hide();
			btn_txt_z_a.show();
			sort_btn.removeClass("StrCPVisits_js_db_sort_btn_state_a-z");
		} else {
			// STATE Z-A.
			page_names_arr.reverse();
			btn_txt_a_z.show();
			btn_txt_z_a.hide();
			sort_btn.addClass("StrCPVisits_js_db_sort_btn_state_a-z");
		}
	}




	/**
	 * UPDATE REPORTS WRAPPER
	 *
	 * DESC: Get sorted page names from array and accordingly rebuild elements in reports wrapper.
	 *
	 * @since 1.0.0
	 */
	function updateReportsWrapper(){
		let reports_wrapper_clone = reports_wrapper.clone();
		reports_wrapper.html("");

		// Loop through page names array.
		for (var i = 0; i < page_names_arr.length; i++) {
			// Get page name from sorted array.
			let page_name = page_names_arr[i];

			// Get elements by name.
			let report_btn = reports_wrapper_clone.find(".StrCPVisits_db_list_row[data-strcpv-page-name='" + page_name + "']");
			let report_btn_row_tab = report_btn.next('.StrCPVisits_db_list_row_tab');

			// Add elements to reports wrapper.
			reports_wrapper.append( report_btn );
			reports_wrapper.append( report_btn_row_tab );
		}
		// Reset clone variable.
		reports_wrapper_clone = "";
	}

})();
