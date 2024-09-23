/**
 * SELECT BY TYPE OPTION -> DELETE
 *
 * DESC: On page report delete - check if that is the last of that page type.
 *	   If that was the last of that page type -> remove that select-by-page-type option from the select-by-page-type menu.
 * INFO: Initialized by observer from ajax delete-page.js then
 *	   Check operations done in menu-operations/0020-last-page-type-option-deleted, which has invoked this.
 *
 * @since 1.0.0
 */
const SelectByTypeOption = (function(){


	function remove( page_type_name ){
		// Get and remove Select-By-Type Option.
		let option = $('#StrCPVisits_js_db_page_type_menu > ul').find("li.StrCPVisits-select-" + page_type_name);
		option.fadeOut(400, function(){
			option.remove();
		});
	}




	return {
		delete : remove
	};

})();
