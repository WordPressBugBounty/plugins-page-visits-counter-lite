/**
 * SELECTING BY TYPE UPDATE
 *
 * DESC: When selecting reports - check if all reports from page-type are selected
 *	   and if they are, automatically select that option in select-by-page-type menu.
 *	   For the opposite action use unselect the page type in the end.
 *
 *	   Also - change the Select-All / Deselect All link.
 *
 * @since 1.0.0
 */
const SelectingByTypeUpdate = (function(){


	// Properties.
	let page_type_name;




	// Listen to checkbox change in report list.
	$('#StrCPVisits_js_db_list_wrapper').on('change', '.StrCPVisits_db_list_chkbox', function(){
		page_type_name = StrCPV.stripHTMLtags( $(this).attr('data-StrCPV-inp-page-type') );
		compareNrOfSelectedOptionsByPageType();
		compareNrOfSelectedOptionsForSelectAllLink();
	});




	function compareNrOfSelectedOptionsByPageType(){
		// Select and count all report input checkboxes under clicked type (checked or unchecked).
		let occurances_nr_visible = $(".StrCPVisits_db_list_chkbox[data-StrCPV-inp-page-type='" + page_type_name + "']:visible").length;
		let occurances_checked_nr_visible = $(".StrCPVisits_db_list_chkbox[data-StrCPV-inp-page-type='" + page_type_name + "']:checked:visible").length;
		// console.log(occurances_nr_visible);
		// console.log(occurances_checked_nr_visible);

		if ( occurances_nr_visible === occurances_checked_nr_visible ) {
			// ALL SELECTED - select the option IF IT IS NOT SELECTED in the select-by-the-page-type.
			selectPageType();

		} else if( occurances_checked_nr_visible === 0) {
			// ALL UNSELECTED - unselect the option IF IT IS NOT UNSELECTED in the select-by-the-page-type.
			unselectPageType();
		}
	}




	function selectPageType() {
		// If option type not selected.
		let option_page_type = $("#StrCPVisits-select-" + page_type_name);
		if ( ! option_page_type.is(':checked') ) {
			// Select it.
			option_page_type.prop('checked', true);
		}
	}




	function unselectPageType() {
		// If option type is selected.
		let option_page_type = $("#StrCPVisits-select-" + page_type_name);
		if ( option_page_type.is(':checked') ) {
			// Unselect it.
			option_page_type.prop('checked', false);
		}
	}




	function compareNrOfSelectedOptionsForSelectAllLink(){
		// Select and count all report input checkboxes.
		let checkboxes_nr_visible = $(".StrCPVisits_db_list_chkbox:visible").length;
		// Select and count all report input checkboxes that are checked.
		let checkboxes_checked_nr_visible = $(".StrCPVisits_db_list_chkbox:checked:visible").length;
		// console.log(checkboxes_nr_visible);
		// console.log(checkboxes_checked_nr_visible);

		if ( checkboxes_nr_visible === checkboxes_checked_nr_visible ) {
			// ALL SELECTED.
			SelectAllToggle.changeToDeselectAll();

		} else if( checkboxes_checked_nr_visible === 0) {
			// ALL UNSELECTED.
			SelectAllToggle.changeToSelectAll();
		}
	}

})();
