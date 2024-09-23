/**
 * COUNTER TAB
 *
 * DESC: Select frontend counter position in parent el. ( LEFT or CENTER or RIGHT. )
 *
 * @since 1.0.6
 */
const CounterTab = (function(){


	// PROPERTIES.
	let page_select_position = $('#StrCPVisits-page-counter-select-position');
	let website_select_position = $('#StrCPVisits-website-counter-select-position');
	let examples; // Examples to be changed.
	let codes; // Codes that are going to be rewritten. ( position: left, center, right. )




	// LISTENERS.
	page_select_position.change(function(){
		changePosition( $(this) );
	});

	website_select_position.change(function(){
		changePosition( $(this) );
	});




	/**
	 * CHANGE POSITION
	 *
	 * @param - HTML element -> page-counter select el. or website-counter select el.
	 * @since 1.0.6
	 */
	function changePosition( counter_type ){

		setProperties( counter_type );

		let selected_option = counter_type.val();
		if( selected_option === "left" ){
			// LEFT
			examples.css('text-align', 'left');
			rewriteCodePosition('left');

		} else if( selected_option === "center" ){
			// CENTER
			examples.css('text-align', 'center');
			rewriteCodePosition('center');

		} else if( selected_option === "right" ){
			// RIGHT
			examples.css('text-align', 'right');
			rewriteCodePosition('right');
		}

	}




	function setProperties( counter_type ){
		let parent_li_el = counter_type.closest('.StrCPVisits-frontend-counter-code');
		examples = parent_li_el.find('.strcpv-js-page-counter-example-pos');
		codes = parent_li_el.find('.strcpv-frontend-counter-position-rewrite');
	}




	function rewriteCodePosition( position ){

		let remaining_positions_arr = filterOutRemainingPositions( position );

		// Loop through code samples.
		for (let i = 0; i < codes.length; i++) {
			let code = codes.eq(i);
			// Get code sample text.
			let code_text = code.html();
			// Change <br> tags to "bbbrrr" - so it can be reverted later.
			code_text = code_text.replace(new RegExp("<br>", "g"), 'bbbrrr');
			// Strip all HTML tags.
			code_text = StrCPV.stripHTMLtags( code_text );
			// Rewrite sample code position with given position.
			let new_code_text = replacePositionStringInCodeSample( code_text, remaining_positions_arr, position );
			// Revert <br> tags.
			new_code_text = new_code_text.replace(new RegExp("bbbrrr", "g"), '<br>');
			// Display new code sample.
			code.html( new_code_text );
		}
	}




	/**
	 * FILTER OUT REMAINING POSITIONS
	 *
	 * DESC: Filter out given position and return an array of remaining positions.
	 *
	 * @param type-string  ("left" || "center" || "right")
	 * @since 1.0.6
	 */
	function filterOutRemainingPositions( position ){
		let positions_arr = ["left", "center", "right"];
		let filtered_positions_arr = positions_arr.filter(function(value, index, arr){
			return value != position;
		});
		return filtered_positions_arr;
	}




	/**
	 * REPLACE POSITION STRING IN CODE SAMPLE
	 *
	 * DESC: Replace the first occurrence of position with a new position.
	 * EXAMPLE: "text-align: left;" replace with "text-align: center;" or "text-align: right;"
	 *
	 * @param1  type->string  ( Code sample text. )
	 * @param2  type->array   ( Remaining positions that can be found in code sample text and it should be replaced. )
	 * @param3  type->string  ( new-given position. )
	 * @since 1.0.0
	 */
	function replacePositionStringInCodeSample( code_text, remaining_positions_arr, position ){

		let new_code_sample_text;

		// Loop through remaining two positions array.
		for (let i = 0; i < remaining_positions_arr.length; i++) {
			let remaining_position = remaining_positions_arr[i]; // Two of these three values: "left", "center", "right".
			let search_substring = "text-align: " + remaining_position + ";";
			let replace_substring = "text-align: " + position + ";";
			// If code has substring.
			if ( code_text.includes(search_substring) ) {
				// Replace the first occurrence of position with a new position.
				new_code_sample_text = code_text.replace( search_substring, replace_substring );
			}

		}
		return new_code_sample_text;
	}

})();
