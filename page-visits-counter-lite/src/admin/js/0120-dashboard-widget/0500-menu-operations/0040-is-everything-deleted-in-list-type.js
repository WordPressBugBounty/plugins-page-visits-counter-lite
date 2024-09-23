/**
 * IS EVERYTHING DELETED IN LIST - hidden or visible
 *
 * DESC: Check if all page reports are deleted in the current list,
 *	   and if it is, disable the select-all option.
 * INFO: Invoked in ajax delete-page.js and 0050-delete.js
 *
 * @type Module revealing
 * @since 1.0.0
 */
const IsEverythingDeletedInList = (function(){


	// Properties.
	let list_type_obj;




	// Listen to ajax delete responses.
	StrCPVevents.subscribe("StrCPVisEverythingDeletedInList", init);




	function init() {
		setProperties();
		detectListType();
	}




	function setProperties(){
		// Get list type obj - {current_list_type: "list-hidden", open_list_type: "list-visible"}.
		list_type_obj = ToggleHiddenReports.getListType();
	}




	function detectListType(){

		if ( list_type_obj.open_list_type === "list-hidden" ) {
			// LIST HIDDEN.
			HiddenListCountAllHiddenReports();
		} else if( list_type_obj.open_list_type === "list-visible" ) {
			// LIST VISIBLE.
			VisibleListCountAllReports();
		} else {
			// Page is loaded - default list type is LIST-VISIBLE.
			// console.log('default list type');
			VisibleListCountAllReports();
		}

	}




	function VisibleListCountAllReports(){
		let visible_reports_nr = $(".StrCPVisits_db_list_row:not('.StrCPVisits-hidden-indicator')").length;
		// console.log( visible_reports_nr );
		checkNrAndHideDisableSelectAll( visible_reports_nr );
	}




	function HiddenListCountAllHiddenReports(){
		let hidden_reports_nr = $(".StrCPVisits_db_list_row.StrCPVisits-hidden-indicator").length;
		// console.log( hidden_reports_nr );
		checkNrAndHideDisableSelectAll( hidden_reports_nr );
	}




	function checkNrAndHideDisableSelectAll( list_reports_nr ) {
		if ( list_reports_nr == 0 ) {
			SelectAllToggle.disable();
		} else {
			SelectAllToggle.enable();
		}
	}




	return {
		init : init
	};

})();
