<?php
// OVDJE SU TI SVI PODACI ZA DETEKTIRATI MOST COMMON
// - BOT, CRAWLER, SPIDER I DR.



// // Get header info
// $header_arr = getallheaders();
//
// if ( isset( $header_arr["User-Agent"] ) ) {
//
//	 // Treba li ovo sanitizirati ili esc
//	 $user_agent = $header_arr["User-Agent"];
//	 echo $user_agent;
//
//	 var_dump($header_arr);
// }


//
// /////////////////////////////////////////////////////////////////////////////////
// /**
//  * Check if the given user agent string is one of a crawler, spider, or bot.
//  *
//  * @param string $user_agent
//  *   A user agent string (e.g. Googlebot/2.1 (+http://www.google.com/bot.html))
//  *
//  * @return bool
//  *   TRUE if the user agent is a bot, FALSE if not.
//  */
// function smart_ip_detect_crawler($user_agent) {
//   // User lowercase string for comparison.
//   $user_agent = strtolower($_SERVER['HTTP_USER_AGENT']);
//
//   // A list of some common words used only for bots and crawlers.
//   $bot_identifiers = array(
//	 'bot',
//	 'slurp',
//	 'crawler',
//	 'spider',
//	 'curl',
//	 'facebook',
//	 'fetch',
//   );
//
//   // See if one of the identifiers is in the UA string.
//   foreach ($bot_identifiers as $identifier) {
//	 if (strpos($user_agent, $identifier) !== FALSE) {
//	   return TRUE;
//	 }
//   }
//
//   return FALSE;
// }
