/**
 * SELECTING BY TYPE
 *
 * DESC: When page type option checked, check all pages with under that type and vice versa.
 * INFO: It has a reset option.
 *
 * @type: Module revealing
 * @since 1.0.0
 */
const SelectingByType =(function(){


	// Properties,
	let page_type_name;
	let page_checkboxes_visible;




	// Listen to checkbox change.
	$('#StrCPVisits_js_db_page_type_menu').on('change', '.StrCPVisits-select-by-type-option', function(){
		setPropertyValues( $(this) );
		isChkboxChecked( $(this) );
		checkSelectAll();
	});




	function setPropertyValues( checked_input_chkbox ) {
		page_type_name = checked_input_chkbox.val();
		let page_rows_visible = $('#StrCPVisits_js_db_list_wrapper').find(".StrCPVisits_db_list_row[data-strcpv-page-type='" + page_type_name + "']:visible");
		page_checkboxes_visible = page_rows_visible.find('.StrCPVisits_db_list_chkbox');
	}




	function isChkboxChecked( current_chkbox ) {
		if ( current_chkbox.is(':checked')) {
			// Select all pages under this type.
			page_checkboxes_visible.prop('checked', true);
		} else {
			// Deselect all pages under this type.
			page_checkboxes_visible.prop('checked', false);
		}
	}



	function checkSelectAll(){
		// Select and count all checkboxes in select-by-type menu.
		let checkbox_nr_visible = $('.StrCPVisits-select-by-type-option:visible').length;
		// Select and count all checkboxes in select-by-type menu that are selected.
		let checkbox_selected_nr_visible = $('.StrCPVisits-select-by-type-option:checked:visible').length;
		// console.log(checkbox_nr_visible);
		// console.log(checkbox_selected_nr_visible);

		if ( checkbox_nr_visible === checkbox_selected_nr_visible ) {
			// ALL SELECTED.
			SelectAllToggle.changeToDeselectAll();

		} else if( checkbox_selected_nr_visible == 0 ) {
			// ALL UNSELECTED.
			SelectAllToggle.changeToSelectAll();
		}
	}




	/**
	 * DESELECT ALL
	 *
	 * DESC: Invoke this method from the outside of this module.
	 *
	 * @since 1.0.0
	 */
	function deselectAll(){
		// Select all checkboxes in select-by-type menu.
		let checkboxes = $('.StrCPVisits-select-by-type-option');
		// Deselect.
		checkboxes.prop('checked', false);
	}




	return {
			reset : deselectAll
	};

})();
