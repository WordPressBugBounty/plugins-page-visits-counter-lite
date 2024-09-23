/**
 * IS LAST PAGE TYPE OPTION DELETED - Function
 *
 * DESC: On page report delete - check if that is the last of that page type.
 *	   If that was the last of that page type -> return true and if not return false.
 * INFO: Invoked by observer from ajax delete-page.js and 0050-delete.js - that way the check is only run once.
 *	   If page_row param. is not passed then check all reports in all page-types because
 *	   select multiple page reports action is triggered.
 *
 * @param page_row - removed section element  (accordion option - page name - row)
 * @since 1.0.0
 */
const LastPageTypeOptionDeleted = (function(){


	// Listen to event for deleting filter option.
	StrCPVevents.subscribe("StrCPVcheckAndDeletePageByTypeOption", function( page_row ){

		// IF PAGE_ROW IS NOT DEFINED - loop through all page-types.
		if( typeof page_row == "undefined" ) {
			// Multiple page rows deleted - check all page types and delete page type options from the menus that are no longer required.
			checkAndDeleteOptions();

		} else {
			// ONLY ONE PAGE DELETED - we have page row el. - check only its page type.
			checkAndDeleteOption( page_row );
		}

	});




	/**
	 * CHECK AND DELETE OPTION-S
	 *
	 * DESC: Loop through all page types and count page reports for each type.
	 *	   If counted page reports number is zero, remove that page type option from all menus.
	 *
	 * @since 1.0.0
	 */
	function checkAndDeleteOptions (){

		// Get all page type names.
		let page_type_names_arr = getPageTypeNamesArr();

		// Loop through page type names array.
		for (var i = 0; i < page_type_names_arr.length; i++) {
			let page_type_name = page_type_names_arr[i];

			// Get all page reports under that page-type-name.
			let all_page_reports_by_type = $('#StrCPVisits_js_db_list_wrapper').find("section[data-strcpv-page-type='" + page_type_name + "']");

			// Check if there is no more page reports belonging to that page type.
			if (all_page_reports_by_type.length === 0) {
				removePageTypeOptionFromMenus( page_type_name );
			}

		}
	}




	function getPageTypeNamesArr(){
		let page_type_names_arr = [];
		// Select all checkboxes in select-by-type menu.
		let page_type_checkboxes = $('#StrCPVisits_js_db_page_type_menu .StrCPVisits-select-by-type-option');

		// Loop through checkboxes and extract page-type-names.
		for (var i = 0; i < page_type_checkboxes.length; i++) {
			let page_type_name = page_type_checkboxes.eq(i).val();
				page_type_name = StrCPV.stripHTMLtags( page_type_name );
			page_type_names_arr.push( page_type_name );
		}
		return page_type_names_arr;
	}




	/**
	 * CHECK AND DELETE OPTION
	 *
	 * DESC: Get page-type-name from deleted page row anc count all page reports under that type.
	 *	   If counted page reports number is zero, remove page type option from all menus.
	 *
	 * @param page_row - el
	 * @since 1.0.0
	 */
	function checkAndDeleteOption ( page_row ){
		// Get page-type-name - for removing filter option - if needed.
		let page_type_name = page_row.attr('data-strcpv-page-type');
		// Get all page reports under that type.
		let all_page_reports_by_type = $('#StrCPVisits_js_db_list_wrapper').find("section[data-strcpv-page-type='" + page_type_name + "']");

		// Check if there is no more page reports belonging to that page type.
		if (all_page_reports_by_type.length === 0) {
			removePageTypeOptionFromMenus( page_type_name );
		}
	}




	/**
	 * REMOVE PAGE TYPE NAME FROM MENUS
	 *
	 * DESC: In this method add a call to each menu delete method
	 *	   that you wish to delete option that does not exist among options.
	 *
	 * @param - pass an argument page_type_name as parameter - string
	 * @since 1.0.0
	 */
	function removePageTypeOptionFromMenus( page_type_name ){

		// RESET MENU
		ResetOption.delete( page_type_name );
		// FILTER MENU
		FilterOption.delete( page_type_name );
		// SELECT-BY-TYPE MENU
		SelectByTypeOption.delete( page_type_name );

	}

})();
