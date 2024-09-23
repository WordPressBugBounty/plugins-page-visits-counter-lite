/**
 * ENABLE ICONS
 *
 * DESC: On select report from the report list - enable select icons-menu.
 *	   On unselect all reports - disable select icon menu.
 *	   Also listen for change in select-by-type and run the check.
 *	   Reveal the module so it can be triggered from the select/deselect all module.
 *
 * @type: Module revealing
 * @since 1.0.0
 */
const EnableIcons = (function(){


	// Properties.
	let icon_menu_buttons = $('#StrCPVisits_js_db_select_icon_menu a');
	let icon_menu_btns_hidden_list = $("#StrCPVisits_js_db_select_icon_menu a:not('#StrCPVisits_js_db_select_set_hidden_btn')");
	let icon_menu_butns_visible_list = $("#StrCPVisits_js_db_select_icon_menu a:not('#StrCPVisits_js_db_select_set_visible_btn')");
	let list_type_obj;




	// LISTENERS:

	// Listen to ajax selection delete success and disable the icons-menu after all selected page reports are deleted.
	StrCPVevents.subscribe("StrCPVdisableIconMenu", disableIconsMenu);

	// Listen to checkbox change in report list.
	$('#StrCPVisits_js_db_list_wrapper').on('change', '.StrCPVisits_db_list_chkbox', checkNrOfSelectedReportOptions);
	$('#StrCPVisits_js_db_page_type_menu').on('change', '.StrCPVisits-select-by-type-option', checkNrOfSelectedByPageTypeOptions );




	/**
	 * CHECK NR OF SELECTED REPORT OPTIONS
	 *
	 * DESC: Count all checked checkboxes in report list.
	 *	   If there is at least one checked checkbox, enable select icons menu, else disable it.
	 *
	 * @since 1.0.0
	 */
	function checkNrOfSelectedReportOptions(){

		setPropertyValues();

		let checkboxes_checked_nr_visible = $(".StrCPVisits_db_list_chkbox:checked:visible").length;
		// console.log( checkboxes_checked_nr_visible );

		if ( checkboxes_checked_nr_visible > 0) {
			enableIconsMenu();

		} else {
			disableIconsMenu();
		}
	}




	function setPropertyValues(){
		list_type_obj = ToggleHiddenReports.getListType();
	}




	/**
	 * CHECK NR OF SELECTED BY PAGE TYPE OPTIONS
	 *
	 * DESC: Count all checked checkboxes in select-by-page-type menu list.
	 *	   If there is at least one checked checkbox, enable select icons menu, else disable it.
	 *
	 * @since 1.0.0
	 */
	function checkNrOfSelectedByPageTypeOptions(){
		let checkboxes_checked_nr= $(".StrCPVisits-select-by-type-option:checked").length;
		// console.log( checkboxes_checked_nr );

		if ( checkboxes_checked_nr > 0) {
			enableIconsMenu();
		} else {
			disableIconsMenu();
		}
	}




	/**
	 * ENABLE ICONS MENU
	 *
	 * DESC: Check the current list type - hidden or visible.
	 *	   Accordingly to the list type enable icons in the icons menu_
	 *		   - Hidden list - has set to hidden button DISABLED
	 *		   - Visible list - has set to visible button DISABLED
	 *
	 * @since 1.0.0
	 */
	function enableIconsMenu() {
		setPropertyValues();

		// Check list type. ( Hidden or visible )
		if ( list_type_obj.open_list_type === "list-hidden" ) {
			/**
			 * LIST HIDDEN
			 *
			 * DESC: Enable all icon menu buttons except set-hidden button.
			 */
			icon_menu_btns_hidden_list.removeClass('StrCPVisits_icon_btn_disabled');

		} else {
			/**
			 * LIST VISIBLE
			 *
			 * DESC: Enable all icon menu button except set-visible button.
			 */
			icon_menu_butns_visible_list.removeClass('StrCPVisits_icon_btn_disabled');
		}
		// All icon menu buttons active.
		icon_menu_buttons.addClass('StrCPVisits_db_select_icon_menu_active');
	}




	function disableIconsMenu() {
		// Disable all icon menu buttons.
		icon_menu_buttons.addClass('StrCPVisits_icon_btn_disabled');
		// All icon menu inactive.
		icon_menu_buttons.removeClass('StrCPVisits_db_select_icon_menu_active');
	}




	return {
		true : enableIconsMenu,
		false : disableIconsMenu,
		reset : disableIconsMenu
	};

})();
