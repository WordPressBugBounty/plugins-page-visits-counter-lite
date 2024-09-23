/**
 * OPTIONS FILTERED NOTIFICATION
 *
 * DESC: Display visits number out of the filter menu if there is at least one option filtered out.
 * INFO: Visits number is displayed above filter menu button.
 *	   Invoked from toggle-menu.js
 *
 * @type Module revealing pattern
 * @since 1.0.0
 */
const OptionsFilteredNotific =(function(){


	function checkAndDisplayNr(){
		let checkboxes = $("#StrCPVisits_js_db_filter_menu_options_wrapper input[type='checkbox']");
		let checkboxes_checked = $("#StrCPVisits_js_db_filter_menu_options_wrapper input[type='checkbox']:checked");

		if ( checkboxes.length != checkboxes_checked.length ) {
			// There is at least one filtered option after filter menu closed.
			displayNotificVisitsNr();
		}
	}




	function displayNotificVisitsNr(){
		$('#StrCPVisits_js_db_filter_menu_notific_visits_wrapper').fadeIn();
	}




	/**
	 * HIDE NOTIFICATION VISITS NR.
	 *
	 * INFO: Invoked from toggle-menu.js only
	 *
	 * @since 1.0.0
	 */
	function hideNotificVisitsNr(){
		$('#StrCPVisits_js_db_filter_menu_notific_visits_wrapper').hide();
	}




	return {
		checkAndDisplayNr : checkAndDisplayNr,
		hideNotificVisitsNr : hideNotificVisitsNr
	};

})();
