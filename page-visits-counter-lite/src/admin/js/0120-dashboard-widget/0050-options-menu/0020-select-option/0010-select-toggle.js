/**
 * SELECT OPTION
 *
 * DESC: On select button click display checkboxes instead of arrows in dashboard report list
 *	   and slide down the options menu.
 *	   On close menu, close select-by-type menu also.
 * INFO: On select menu active - hide row trash option.
 *
 * @since 1.0.0
 */
const SelectToggle = (function(){


	// Properties.
	let select_btn = $('#StrCPVisits_js_db_options_menu_select_btn');
	let select_menu = $('#StrCPVisits_js_db_select_menu');
	let icons_menu = $('#StrCPVisits_js_db_select_icon_menu');
	let list_rows;
	let list_checkboxes;
	let list_trash_buttons;




	// Select button click event.
	select_btn.click(function(){

		// If button disabled -> Abort
		if ( select_btn.hasClass('disabled') ) {
			return; // Abort.
		}

		setPropertyValues();

		if ( select_menu.is(':visible') ) {
			hideMenu();

		} else {
			/**
			 * Count how many reports there are under each page type and display number in format
			 * current_nr_in_list/total_nr_of_reports - ( visible and hidden lists ).
			 */
			CountVisibleReports.init();
			displayMenu();
		}

		// Close quick info menu.
		QuickInfo.close();

	});




	function setPropertyValues(){
		list_rows = $('#StrCPVisits_js_db_list_wrapper .StrCPVisits_db_list_row');
		list_checkboxes = $('.StrCPVisits_db_list_chkbox_toggle_wrapper');
		list_trash_buttons = $('.StrCPVisits-dblist-delete-page-btn');
	}




	function displayMenu(){
		select_btn.addClass('button_active_background_color');
		select_menu.slideDown();
		list_checkboxes.show();
		icons_menu.fadeIn();
		// Hide arrows.
		list_rows.addClass('StrCPVisits_db_list_row_select_active');
		// Hide trash options in list rows sub-tabs.
		list_trash_buttons.hide();
		// If everything is deleted from the list - disable select-all option, else enable it.
		StrCPVevents.publish("StrCPVisEverythingDeletedInList");
	}




	function hideMenu(){
		select_btn.removeClass('button_active_background_color');
		select_menu.slideUp();
		list_checkboxes.hide();
		icons_menu.fadeOut();
		// Display arrows.
		list_rows.removeClass('StrCPVisits_db_list_row_select_active');
		// Display trash options in list rows sub-tabs.
		list_trash_buttons.show();
		// Close Select-By-Page-Type menu.
		SelectByTypeToggle.close();
	}




	/**
	 * CLOSE MENU
	 *
	 * DESC: This function is used for closing the menu externally.
	 * @since 1.0.0
	 */
	function closeMenu(){
		setPropertyValues();
		hideMenu();
	}




	return {
		close : closeMenu
	};

})();
