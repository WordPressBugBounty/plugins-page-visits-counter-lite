
/**
 * SELECT BY PAGE TYPE TOGGLE
 *
 * DESC: On select button click display checkboxes instead of arrows in dashboard report list.
 *
 * @since 1.0.0
 */
const SelectByTypeToggle = (function(){


	// Properties.
	let select_btn = $('#StrCPVisits_js_db_select_menu_select_by_type_toggle');
	let select_btn_txt = $('#StrCPVisits_js_db_select_menu_select_by_type_text');
	let select_btn_close_txt = $('#StrCPVisits_js_db_select_menu_select_by_type_close_text');
	let select_menu = $('#StrCPVisits_js_db_page_type_menu');




	// Click event listener.
	select_btn.click(function(e){
		e.preventDefault();
		if ( select_menu.is(':visible') ) {
			hideMenu();

		} else {
			displayMenu();
		}
	});




	function displayMenu(){
		select_menu.slideDown();
		// Replace text.
		select_btn_txt.hide();
		select_btn_close_txt.show();
	}




	function hideMenu(){
		select_menu.slideUp();
		// Replace text.
		select_btn_txt.show();
		select_btn_close_txt.hide();
	}




	return {
		close: hideMenu
	};

})();
