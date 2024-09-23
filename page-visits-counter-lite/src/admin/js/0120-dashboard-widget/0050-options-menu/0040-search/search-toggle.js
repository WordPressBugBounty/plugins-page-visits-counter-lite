/**
 * SEARCH OPTION TOGGLE
 *
 * DESC: On search button click display/hide search menu.
 *
 * @since 1.0.0
 */
const SearchToggle = (function(){


	// Properties.
	let search_btn = $('#StrCPVisits_js_db_options_menu_search_btn');
	let search_menu = $('#StrCPVisits_js_db_search_menu');
	let search_box = $('#StrCPVisits_js_db_search_input_field');




	// Click Event listener.
	search_btn.click(function(){

		// If button disabled -> Abort.
		if ( search_btn.hasClass('disabled') ) {
			return; // Abort.
		}


		if ( search_menu.is(':visible') ) {
			hideMenu();

		} else {
			displayMenu();
		}

	});




	function displayMenu(){
		search_btn.addClass('button_active_background_color');
		search_menu.slideDown();
		search_box.keyup();
	}




	function hideMenu(){
		search_btn.removeClass('button_active_background_color');
		search_menu.slideUp();
		SearchFilter.reset();
	}




	return {
		close : hideMenu
	};

})();
