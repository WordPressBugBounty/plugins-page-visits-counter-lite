/**
 * TOGGLE RESET MENU
 *
 * DESC: Click on reset button to toggle reset menu tab.
 * INFO: Close other two menu tabs before expanding reset menu tab.
 *
 * @type MODULE REVEALING - close - this menu tab
 * @since 1.0.0
 */
const ToggleResetMenu = (function(){


	// Properties.
	let btn = $('#StrCPVisits_js_db_list_reset_menu_btn');
	let btn_wrapper = $('#StrCPVisits_js_db_list_reset_menu_btn_wrapper');
	let reset_menu = $('#StrCPVisits_js_db_reset_menu');




	// Click listener.
	btn.click( function(){

		// If button is disabled - ABORT.
		if ($(this).hasClass('StrCPVisits_icon_btn_disabled')) {
			return; // Abort
		}


		CloseOtherMenus.except( ToggleResetMenu );


		// Get fresh - filter menu el - and - Toggle info tab.
		if ($('#StrCPVisits_js_db_reset_menu').hasClass('hidden')) {
			displayResetMenu();
		} else {
			hideResetMenu();
		}

	});




	function displayResetMenu(){
		reset_menu.slideDown();
		reset_menu.removeClass('hidden');
		btn_wrapper.addClass('StrCPVisits_db_list_reset_menu_btn_wrapper_active');
		btn.addClass('StrCPVisits_db_list_reset_menu_btn_active');
	}




	function hideResetMenu(){
		reset_menu.slideUp();
		reset_menu.addClass('hidden');
		btn_wrapper.removeClass('StrCPVisits_db_list_reset_menu_btn_wrapper_active');
		btn.removeClass('StrCPVisits_db_list_reset_menu_btn_active');
	}




	return {
		close: hideResetMenu
	};

})();
