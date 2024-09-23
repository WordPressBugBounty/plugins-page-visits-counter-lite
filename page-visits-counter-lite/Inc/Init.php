<?php
/**
 * INIT
 *
 * DESC:
 * ********************************************************
 * ** AUTOMATIZE call of REGISTER METHODS in all classes **
 * ********************************************************
 *
 * @package Strongetic - count page visits
 */

namespace StrCPVisits_Inc;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


// Final class -> it will never get extended -> used by another class.
final class Init {



	/**
	 * GET SERVICES
	 *
	 * DESC: Store all the classes inside an array.
	 * INFO: To be able to use register_services method, we need to get all classes from BASE and COUNTER folders
	 *       and save/return them as an array.
	 *
	 * @return array Full list of classes
	 * @since 1.0.0
	 */
	public static function get_services() {
		return [
			Base\Enqueue::class, // Declare a class that you wish to initialize.
			Base\Settings_Links::class,
			Counter\frontend\Total_Visits::class,
			Counter\backend\Dashboard_Widget::class,
			API\Settings_Api::class,
			Ajax\Counter\Total_Visits::class,
			Ajax\SettingsPage\Save_Settings::class,
			Ajax\Dashboard_Widget\Update_Total_Visits_Nr::class,
			Ajax\Dashboard_Widget\Update_Page_Data::class,
			Ajax\Dashboard_Widget\Delete_Pages::class,
			Ajax\Dashboard_Widget\Delete_Page::class,
			Ajax\Dashboard_Widget\reset\Reset_All::class,
			Ajax\Dashboard_Widget\reset\Reset_Page_Type::class,
			Ajax\Dashboard_Widget\Toggle_Hidden_Reports::class,
		];
		// From php 5.4 we can use [].
	}




	/**
	 * REGISTER SERVICES
	 *
	 * DESC: Loop trough the classes, initialize them, and call the register() method if it exist.
	 *
	 * @since 1.0.0
	 */
	public static function register_services() {
		foreach ( self::get_services() as $class ) {
			$service = self::instantiate( $class );
			if ( method_exists( $service, 'register' ) ) {
				$service->register();
			}
		}
	}




	/**
	 * INSTANTIATE
	 *
	 * DESC: Initialize the class.
	 *
	 * @param   class $class    class from the services array
	 * @return  class instance  new instance of the class
	 * @since 1.0.0
	 */
	private static function instantiate( $class ) {
		return new $class();
	}

}
