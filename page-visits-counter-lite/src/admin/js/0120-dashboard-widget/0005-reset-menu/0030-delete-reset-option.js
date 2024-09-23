/**
 * RESET OPTION -> DELETE
 *
 * DESC: On page report delete - check if that is the last of that page type.
 *	   If that was the last of that page type -> remove that reset option from the filter menu.
 * INFO: Initialized by observer from ajax delete-page.js then
 *	   Check operations done in menu-operations/0020-last-page-type-option-deleted, which has invoked this.
 *
 * @since 1.0.0
 */
const ResetOption = (function(){


	function remove( page_type_name ){
		// Get and remove filter Option.
		let reset_option = $('#StrCPVisits_js_db_reset_menu_options_wrapper').find("li.StrCPVisits-reset-" + page_type_name);
		reset_option.fadeOut();
		// reset_option.remove();
	}




	return {
		delete : remove
	};

})();
