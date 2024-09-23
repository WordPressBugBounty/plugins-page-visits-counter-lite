/**
 * TOGGLE FILTER MENU
 *
 * DESC: Click on filter button to toggle filter menu tab.
 * INFO: Close other two menu tabs before expanding filter menu tab.
 *
 * @type MODULE REVEALING - close - this menu tab
 * @since 1.0.0
 */

const ToggleFilterMenu = (function(){

	// Properties.
	let btn = $('#StrCPVisits_js_db_list_filter_btn');
	// Get filter menu el.
	let filter_menu = $('#StrCPVisits_js_db_filter_menu');
	// Displays a shadow to active filter menu icon btn.
	let icon_btn_wrapper = $('#StrCPVisits_js_db_list_filter_btn_wrapper');


	// Click listener.
	btn.click( function(){

		// If button is disabled - ABORT.
		if ($(this).hasClass('StrCPVisits_icon_btn_disabled')) {
			return; // Abort.
		}


		CloseOtherMenus.except( ToggleFilterMenu );


		// Get fresh - filter menu el - and - Toggle info tab.
		if ($('#StrCPVisits_js_db_filter_menu').hasClass('hidden')) {
			displayFilterMenu();
		} else {
			hideFilterMenu();
		}

	});




	function displayFilterMenu(){
		filter_menu.slideDown();
		filter_menu.removeClass('hidden');
		icon_btn_wrapper.addClass('StrCPVisits_icon_active');
		OptionsFilteredNotific.hideNotificVisitsNr();
	}




	function hideFilterMenu(){
		filter_menu.slideUp();
		filter_menu.addClass('hidden');
		icon_btn_wrapper.removeClass('StrCPVisits_icon_active');
		OptionsFilteredNotific.checkAndDisplayNr();
	}




	return {
		close: hideFilterMenu
	};

})();
