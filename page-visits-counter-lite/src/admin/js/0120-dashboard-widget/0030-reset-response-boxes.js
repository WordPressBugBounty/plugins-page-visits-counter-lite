/**
 * DASHBOARD WIDGET - RESET RESPONSE BOXES
 *
 * DESC: On list menu click -> reset response boxes in:
 *		   -  page list sub-tabs
 *		   -  quick reset menu
 *		   -  select icon menu
 *
 * @since 1.0.0
 */
const ResetResponseBoxes = (function(){


	// -------- PROPERTIES: --------

	// Pages list.
	let list_wrapper = $('#StrCPVisits_js_db_list_wrapper');
	let list_row_rsp_box = $('.StrCPVisits_db_list_row_msg_box');

	// Reset menu.
	let reset_menu = $('#StrCPVisits_js_db_reset_menu');
	let reset_menu_rsp_box = $('#StrCPVisits_js_db_reset_response_box');

	// Select icon menu.
	let options_menu = $('#StrCPVisits-js-db-menu');
	let options_menu_rsp_box = $("#StrCPVisits_js_db_select_response_box");




	// -------- CLICK LISTENERS --------


	// PAGES LIST - RESPONSE BOXES.
	list_wrapper.click(function(){
		list_row_rsp_box.slideUp();
	});

	// RESET MENU - RESPONSE BOX.
	reset_menu.click(function(){
		reset_menu_rsp_box.slideUp();
	});

	// SELECT ICON MENU - RESPONSE BOX.
	options_menu.click(function(){
		options_menu_rsp_box.slideUp();
	});

})();
