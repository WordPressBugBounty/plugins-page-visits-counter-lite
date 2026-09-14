/**
 * REPORT EXPORT
 *
 * Downloads all page-report rows in the selected format.
 *
 * @since 2.0.0
 */
const ExportReports = (function(){

	let csv_button = $('#StrCPVisits_js_db_export_csv_btn');
	let xml_button = $('#StrCPVisits_js_db_export_xml_btn');

	csv_button.click(function(){
		downloadReport( 'StrCPVisits_export_csv' );
	});

	xml_button.click(function(){
		downloadReport( 'StrCPVisits_export_xml' );
	});

	function downloadReport( action ){
		let form = $('<form>', {
			action: ajaxurl,
			method: 'post'
		}).append(
			$('<input>', { type: 'hidden', name: 'action', value: action }),
			$('<input>', { type: 'hidden', name: 'security', value: STR_CPVISITS.security })
		);

		$('body').append( form );
		form.submit();
		form.remove();
	}

})();
