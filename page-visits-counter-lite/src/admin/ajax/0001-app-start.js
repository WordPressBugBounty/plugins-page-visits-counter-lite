/**
 * AJAX - IIFE
 *
 * DESC: wrap everything into IIFE for security reasons and to prevent naming conflict.
 * INFO: AJAX should be concatenated into separate file from js file.
 *	   That way we can exempt ajax file from cashing as ajax communication is protected with NONCE.
 *
 * @since 1.0.0
 */
(function($){
