/**
 * SELECT REPORT
 *
 * DESC: The Purpose of this module is to reset all visible checkboxes in report list.
 *
 * @type Module revealing
 * @since 1.0.0
 */
const SelectReport = (function(){


	// Properties.
	let reports_chkboxes = $('.StrCPVisits_db_list_chkbox');




	function uncheckAllCheckboxes(){
		reports_chkboxes.prop('checked', false); // Disable.
	}




	return {
		reset : uncheckAllCheckboxes
	};

})();
