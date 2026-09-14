/**
  *
  * DESC: Before displaying html attributes data on frontend make sure to remove these symbols: &, <, >, ", '
  * ESCAPE HTML ATTRIBUTE
  *
  * @param string  str - The input string to be processed.
  * @since 2.0.0
  */
	function escapeHtmlAttr(str) {
			return String(str)
					.replace(/&/g, '&amp;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/"/g, '&quot;')
					.replace(/'/g, '&#039;');
	}
