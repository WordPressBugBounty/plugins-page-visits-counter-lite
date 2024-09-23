/**
 * FILTER OPTION -> DELETE
 *
 * DESC: On page report delete - check if that is the last of that page type.
 *	   If that was the last of that page type -> remove that filter option from the filter menu.
 * INFO: Initialized by observer from ajax delete-page.js then
 *	   Check operations done in menu-operations/0020-last-page-type-option-deleted, which has invoked this.
 *
 * @since 1.0.0
 */
const FilterOption = (function(){


	function remove( page_type_name ){
		// Get and remove filter Option.
		let filter_option = $('#StrCPVisits_js_db_filter_menu_options_wrapper').find("li.StrCPVisits-" + page_type_name);
		filter_option.fadeOut();
		// $filter_option.remove();
	}




	return {
		delete : remove
	};

})();
