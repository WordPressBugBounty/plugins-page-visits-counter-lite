/**
 * LIGHT TABS MENU - COMPONENT
 *
 * @since 1.0.0
 */
var StrCPVisitsLightTabs = (function() {


	// Click Listener - works on dynamically added tab options.
	$(document).on('click', '.StrCPVisits-light-tabs > ul > li', function(){
		lightTabs( $(this) );
	});




	function lightTabs( option_clicked ){
		var light_tabs = option_clicked.closest('.StrCPVisits-light-tabs');
		var class_active = light_tabs.attr('data-active-class');
		var index_nr = light_tabs.find('ul li').index( option_clicked );
		var active_box = light_tabs.find('>div').eq(index_nr);

		option_clicked.siblings('li').removeClass( class_active );
		option_clicked.addClass( class_active );
		active_box.siblings('.StrCPVisits-form-tab').hide();
		active_box.show();
	}

})();
