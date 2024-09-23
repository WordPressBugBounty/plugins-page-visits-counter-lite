/**
 * EDIT TOTAL VISITS
 *
 * DESC: On edit icon click open edit box.
 *	   On X icon click close edit box.
 *
 * @since 1.0.0
 */
const EditTotalVisits = (function(){


	// Properties.
	let edit_box  = $('#StrCPVisits_js_db_edit_total_visits_box');
	let x_icon = $('#StrCPVisits_js_db_close_edit_total_visits_box');
	let edit_icon = $('#StrCPVisits_js_db_edit_total_visits_icon');




	// Click listeners.
	edit_icon.click(function(){
		// Display edit box
		edit_box.slideDown('fast');
	});

	x_icon.click(function(){
		// Hide edit box
		edit_box.slideUp('fast');
	});

})();
