/**
 * TOGGLE QUICK INFO
 *
 * DESC: Click on info button to toggle quick info menu tab.
 * INFO: Close other two menu tabs before expanding quick info menu tab.
 *
 * @type MODULE REVEALING - close - this menu tab
 * @since 1.0.0
 */
const QuickInfo = (function(){


	// Properties.
	let button = $('#StrCPVisits_js_db_quick_info_btn');
	let info_box = $('#StrCPVisits_js_db_info_box');




	// CLICK EVENT LISTENER.
	button.click(function(){

		// Abort if button is disabled - ( if there is no visits yet... ).
		if ( $(this).hasClass('StrCPVisits_icon_btn_disabled') ) {
			return;
		}


		CloseOtherMenus.except( QuickInfo );
		// Close SELECT menu.
		SelectToggle.close();


		// Get fresh - info box el - and - toggle it.
		if ( $('#StrCPVisits_js_db_info_box').hasClass('hidden')) {
			displayInfoBox();
		} else {
			hideInfoBox();
		}
	});




	function displayInfoBox(){
		info_box.slideDown();
		info_box.removeClass('hidden');
		button.addClass('btn_active');
	}



	/**
	 * HIDE INFO BOX
	 *
	 * DESC: It will close quick-info-box menu
	 * INFO: Invoked by:
	 *				   -  quick info button click
	 *				   -  filter menu button click
	 *				   -  Restart button click
	 *
	 * @since 1.0.0
	 */
	function hideInfoBox(){
		info_box.slideUp();
		info_box.addClass('hidden');
		button.removeClass('btn_active');
	}



	return {
		close: hideInfoBox
	};

})();
