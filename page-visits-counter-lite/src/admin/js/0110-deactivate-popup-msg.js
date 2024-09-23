/**
 * POPUP MESSAGE - ON PLUGIN DEACTIVATE
 *
 * @since 1.0.0
 */
$(document).on('click', '#deactivate-page-visits-counter-lite', function(e){
	alert( STR_CPVISITS_JS.text_plugin_delete_warning );
});
