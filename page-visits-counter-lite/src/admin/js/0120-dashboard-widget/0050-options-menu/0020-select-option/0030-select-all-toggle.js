/**
 * SELECT ALL/NONE
 *
 * DESC: On select all option click - select/check all visible rows.
 *	   On deselect all option click - unselect/uncheck all visible rows.
 *
 * @type Module revealing
 * @since 1.0.0
 */
const SelectAllToggle = (function(){

	// Properties.
	let select_all_option = $('#StrCPVisits_js_db_select_menu_select_all_toggle');
	let select_all_text;
	let deselect_all_text;
	let list_rows;
	let list_checkboxes;
	let select_by_type_options_enabled;


	// Click event listener.
	select_all_option.click(function(e){
		e.preventDefault();

		// Check if option is disabled -> Abort.
		if ( select_all_option.hasClass('disabled') ) {
			return; // Abort
		}


		setPropertyValues();
		if ( select_all_text.is(':visible') ) {
			selectAll();
		} else {
			deselectAll();
		}
	});




	function setPropertyValues() {
		select_all_text = $('#StrCPVisits_js_db_select_menu_text_select_all');
		deselect_all_text = $('#StrCPVisits_js_db_select_menu_text_deselect_all');
		list_rows = $('#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row:visible');
		list_checkboxes = list_rows.find('.StrCPVisits_db_list_chkbox');
		select_by_type_options_enabled = $('.StrCPVisits-select-by-type-option:enabled');
	}




	function selectAll() {
		select_all_text.hide();
		deselect_all_text.show();
		list_checkboxes.prop('checked', true); // Check All.
		select_by_type_options_enabled.prop('checked', true); // Check All - select by type options.
		EnableIcons.true();
	}




	function deselectAll() {
		select_all_text.show();
		deselect_all_text.hide();
		list_checkboxes.prop('checked', false); // Uncheck All.
		select_by_type_options_enabled.prop('checked', false); // Uncheck All - select by type options.
		EnableIcons.false();
	}




	/**
	 * DISPLAY SELECT ALL
	 *
	 * DESC: Change link text to Select-All from outside this module.
	 *
	 * @since 1.0.0
	 */
	function displaySelectAll(){
		select_all_text = $('#StrCPVisits_js_db_select_menu_text_select_all');
		deselect_all_text = $('#StrCPVisits_js_db_select_menu_text_deselect_all');
		select_all_text.show();
		deselect_all_text.hide();
	}



	/**
	 * DISPLAY DESELECT ALL
	 *
	 * DESC: Change link text to Deselect-All from outside this module.
	 *
	 * @since 1.0.0
	 */
	function displayDeselectAll(){
		select_all_text = $('#StrCPVisits_js_db_select_menu_text_select_all');
		deselect_all_text = $('#StrCPVisits_js_db_select_menu_text_deselect_all');
		select_all_text.hide();
		deselect_all_text.show();
	}




	/**
	 * DISABLE
	 *
	 * DESC: Change link text to Select-All from outside this module and disable its click event.
	 *
	 * @since 1.0.0
	 */
	function disable(){
		displaySelectAll();
		select_all_option.addClass('disabled');
	}




	/**
	 * ENABLE
	 *
	 * DESC: Enable select-all / deselect-all option.
	 *
	 * @since 1.0.0
	 */
	function enable(){
		select_all_option.removeClass('disabled');
	}




	return {
		changeToSelectAll : displaySelectAll,
		changeToDeselectAll : displayDeselectAll,
		reset : displaySelectAll,
		disable : disable,
		enable : enable
	};

})();
