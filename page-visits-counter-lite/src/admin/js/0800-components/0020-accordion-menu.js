/**
 * ACCORDION MENU COMPONENT
 *
 * @since 1.0.0
 */
const StrCPVisitsAccordionMenu = (function(){


	// Config.
	let button = ".StrCPVisits_accordion_btn";
	let active_class = "StrCPVisits_accordion_active";
	let panel = ".StrCPVisits_accordion_panel";




	// Click Listener - works on dynamically added tab options.
	$(document).on('click', function(e){
		// Toggle menu if clicked on button but do not toggle if clicked in input-checkbox in button.
		var is_chkbox_el = $(e.target).closest(".StrCPVisits_db_list_chkbox_wrapper").length;
		var btn_el = $(e.target).closest(button);
		var is_btn_el = btn_el.length;

		if( is_chkbox_el == 0 && is_btn_el == 1 ) {
			toggleAccordion( btn_el );
		}
	});




	function toggleAccordion( clicked_btn ){

		// Close other options.
		let acc_menu = clicked_btn.closest('.StrCPVisits_accordion_menu');
		// Get data attribute close-other-options value - true || false.
		acc_menu.attr('data-stracc-close-other-options', function(i, close_other_options_value){
			if ( close_other_options_value == "true" ) {
				closeOtherExpandedOptions( clicked_btn );
			}
		});


		if( clicked_btn.hasClass( active_class ) ) {
			closeExpandedOption( clicked_btn );
		} else {
			expandClosedOption( clicked_btn );
		}

	}




	function closeExpandedOption( clicked_btn ){
		clicked_btn.removeClass( active_class );
		clicked_btn.next( panel ).slideUp();
	}




	function expandClosedOption( clicked_btn ){
		clicked_btn.addClass( active_class  );
		clicked_btn.next( panel ).slideDown();
	}




	function closeOtherExpandedOptions( clicked_btn ){
		clicked_btn.siblings('section').removeClass( active_class );
		clicked_btn.siblings('section').next( panel ).slideUp();
	}




})(); // ! AccordionMenu
