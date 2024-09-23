/**
 * STRIP HTML TAGS
 *
 * DESC: Before displaying data on frontend make sure to remove script tags < and >.
 *
 * @param string  str - The input string to be processed.
 * @since 1.0.0
 */
function stripHTMLtags(str) {
	var map = {
		'<': '',
		'>': ''
	};
	return str.replace(/[<>]/g, function(m) { return map[m]; });
}
