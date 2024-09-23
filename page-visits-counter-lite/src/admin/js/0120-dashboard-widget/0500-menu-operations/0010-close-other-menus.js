/**
 * CLOSE OTHER MENUS
 *
 * DESC: This is the module for closing all other menus when expanding one of the menus.
 *
 * @type MODULE REVEALING - close - this menu tab
 * @param name of the menu that is opening - string
 * @since 1.0.0
 */
const CloseOtherMenus = (function(){


	// Properties.
	let all_menus_arr = [
		ToggleResetMenu,
		ToggleFilterMenu,
		QuickInfo,
	];




	function closeAllOtherMenus( expanding_menu ){
		for (var i = 0; i < all_menus_arr.length; i++) {
			let menu_name = all_menus_arr[i];
			if ( menu_name != expanding_menu ) {
				menu_name.close();
			}
		}
	}




	return {
		except : closeAllOtherMenus
	};

})();
