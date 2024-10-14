=== Page Visits Counter - Lite ===
Contributors: strongetic
Donate link: https://www.fiverr.com/denis555/gladly-accept-5usd-tip-for-my-good-work/
Tags: page counter, post counter, page visits, post visits, wordpress post view, wordpress page view, wordpress visit stats, page visits report, console counter, count without refresh, count without reload, developer tools counter
Requires at least: 5.0
Tested up to: 6.6.2
Stable tag: 1.2.1.
Requires PHP: 5.6.40
WC requires at least: 4.9.2
WC tested up to: 6.7.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Display number of visits for each page in admin dashboard and browser developer-tool/console. Doesn't count page refresh as a new visit...


== Description ==

This plugin is going to display the number of visits for each page in the:

* Admin dashboard
* Browser developer-tools/console tab - (HIDDEN COUNTERS)
* Website/page frontend - (OPTIONAL)

You can add and display counters on the frontend of your website:

* total page-visits-counter and/or
* total website-visits-counter


( Page-visits-counter does not count page refresh as a new visit while Website-visits-counter counts everything. )

<h3> Hidden page counter + admin page reports </h3>

https://www.youtube.com/watch?v=wxWiFin8NwE

<h3> How to display hidden counter on a website frontend? </h3>

https://www.youtube.com/watch?v=LWKxYhtYH3o


The purpose of this plugin is to supplement the report of actual visits to the pages of the website that cannot be recorded through advanced analytical tools. Advanced analytical tools require the consent of a visitor before the visit is recorded.


<h3> WHY LITE? </h3>

* It is a small size software and it does not require much memory.
* It is not going to crowd your database with tons of metric data and "eat" database memory.
* It is not going to collect user's personal data - GDPR compliant.


<h3> NOT COUNTING </h3>

<ul>
    <li>Logged in user with a role:
        <ul>
            <li>admin</li>
            <li>editor</li>
            <li>shop manager</li>
            <li>custom role</li>
        </ul>
    </li>
    <li>Page refresh/reload ( But "Total Visits" load&reload sum will count it. )</li>
    <li>Submitting comments ( But "Total Visits" load&reload sum will count it. )</li>
    <li>Visiting direct media link in the uploads folder</li>
    <li>Media - attachment page</li>
    <li>Search results page</li>
    <li>Update cart ( But "Total Visits" load&reload sum will count it. )</li>
    <li>Checkout/order received ( But "Total Visits" load&reload sum will count it. )</li>
</ul>


<h3> COUNTING </h3>

<ul>
    <li>A visitor ( Not logged in )</li>
    <li>Logged in user with a role:
        <ul>
            <li>Subscriber</li>
            <li>Author</li>
            <li>Contributor</li>
            <li>Pending_user</li>
            <li>Customer</li>
        </ul>
    </li>
    <li>Pages and posts:
        <ul>
            <li>Pages and subpages</li>
            <li>Default and Static Homepage</li>
            <li>Blog Posts page</li>
            <li>Single post</li>
            <li>Default category and tag - archive pages</li>
            <li>404</li>
            <li>CPT</li>
            <li>Taxonomy archive pages</li>
            <li>WooCommerce:
                <ul>
                    <li>SHOP - archive page</li>
                    <li>Single product</li>
                    <li>Default category and tag - archive pages</li>
                    <li>Attribute archive pages</li>
                    <li>Cart ( Check Update cart is not counting... )</li>
                    <li>Checkout ( Check "Checkout/order received" is not counting...)</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>


<h3> ON CHANGE NAME of Page, Post, Product... </h3>

If you change the name of an existing page, post, product, archive, etc. then the old page will remain intact in the page visits report.
After a new visit, the new page name will appear in the page visits report and the counter will start counting visits for the new page from the start.


<h3> ON DELETE of Page, Post, Product... </h3>

If you delete an existing page, post, product, archive, etc. then the page will remain intact in the page visits report including its number of visits.


<h3> VISITS-COUNTER ON THE WEBSITE FRONTEND </h3>

There are two counter types:

* Website counter
* Page counter ( Not counting page refresh. )

You can add one or both counter types on your website or page frontend.

Instructions on how to add counter/s to your website are in the plugin settings page under the tab named counter.


<h3> FEATURES </h3>

* Invisible counter (In browser Developer-tools / Console)
* GDPR Compliant
* WooCommerce compatible


<h3> REQUIREMENTS </h3>

* WordPress 5.0 +
* PHP 5.6.40 +
* WooCommerce 4.9.2 +


<h3> PLUGIN UNINSTALL </h3>

On the plugin delete/uninstall it will automatically clean its data from the database unless you select to preserve them in the plugin settings area.
Therefore, it is harmless for you to try out this plugin.


<h3> FOR DEVELOPER </h3>

Admin dashboard widget has four wp-hooks:

* add_action( 'StrCPVisits_db_widget_wrapper_start' );
* add_action( 'StrCPVisits_db_widget_after_total_visits_boxes' );
* add_action( 'StrCPVisits_db_widget_wrapper_end_before_js' );
* add_action( 'StrCPVisits_db_widget_wrapper_end_after_js' );




== Screenshots ==

1. VISITS BY PAGE NAME - Dashboard widget
2. SETTINGS AND DOCUMENTATION PAGE
3. DEVELOPER-TOOLS/CONSOLE - Page visits
4. DISPLAY COUNTER ON WEBSITE FRONTEND - code samples

* /assets/screenshot-1.jpg
* /assets/screenshot-2.jpg
* /assets/screenshot-3.jpg
* /assets/screenshot-4.jpg




== LEGAL ==

<a href="https://github.com/DenisBotic/WP-org-plugin-PAGE-VISITS-COUNTER-LITE/blob/main/privacy-policy.txt">Privacy policy</a>

<a href="https://github.com/DenisBotic/WP-org-plugin-PAGE-VISITS-COUNTER-LITE/blob/main/read-me-disclaimer.txt">Disclaimer</a>




== Frequently Asked Questions ==

= Where I can find the page visits report as seen on the screenshot? =

If you have installed and activated the plugin then you can select the "Dashboard" option from the WordPress admin menu and there you should find a widget called "ALL PAGE VISITS."
If it is not expanded, just click on the title and you should be able to see it.
If there are no recorded visits yet, a quick info tab is going to be expanded with a short explanation on what type of visits are going to be recorded.

= Where I can find the plugin settings page? =

You will find it under the settings option in the WordPress admin menu.
It is called "Page Visits Counter Lite".



= Is it going to count the sum of all page visits? =

Yes, there are two TOTAL VISITS boxes.
The first one is going to sum all page visits without counting a page refresh/reload.
The second one will count the sum of all visits, including a page refresh/reload.

= Can I delete a page from the report? =

Yes, you can.

= Can I update the number of visits? =

Yes, you can update the number of TOTAL VISITS box and you can update the number of visits for each page.
The TOTAL PAGE VISITS box will recalculate the number of page visits automatically.

= Can I enable page refresh/reload counting for each page report? =

No, there is no such option.

= Can I set it up so it will preserve page visit records after the plugin is uninstalled? =

Yes, you will find that option (checkbox) in the plugin settings area under the settings tab.
Just check the option called "Do not delete plugin data on plugin delete/uninstall" and click on the Save button.

= Can I display a number of page visits on the website/page frontend? =

Yes, you can add and display one or both counters on the frontend of your website:

* Page-Visits-Counter - does not count page refresh
* Website-Visits-Counter

= Why frontend visits-counter displays N/A? =

* N/A stands for "Not Available"
* It is a default counter state - counter does not use zero

A not-counting page is going to display N/A.

Also, any other page is going to display N/A until it is visited by either:

* signed-out user
* signed-in user with a counting user role

( For more info about "Counting" and "Not Counting" read in the plugin documentation. )

You can find explanation in the plugin settings page under counter tab.

= Does it set cookies into the user browser?  =

No, this plugin does not set browser cookie/s.

= I have visited my page but my visit is not recorded? =

You have to logout before visiting the page or login with one of the user roles that page will count.
(Please read the plugin documentation under titles "NOT COUNTING" and "COUNTING".)

= I have visited my page but only the TOTAL VISITS box has recorded the visit? =

You have probably refreshed the page and the TOTAL VISITS box is counting everything including a page refresh/reload.
Page visits are not counting page refresh/reload.
(Please read the plugin documentation under titles "NOT COUNTING" and "COUNTING".)




== Installation ==

1. FIRST DOWNLOAD PLUGIN ZIP FILE.
2. Log in to your administration panel.
3. Go to Plugins page, click on Add New, then click “Upload Plugin” .
4. Then click “Choose file” then select the plugin zip file.
5. Install and activate plugin.

<h3>ATTENTION</h3>
After the plugin is installed and activated, you need to flush the cache memory for all pages and delete minified javascript (JS) and styling (CSS) files.

( Minified JS and CSS files will be recreated automatically by their own plugin/software.)

<h3> WHY? </h3>
If you are using cashing method to improve your website loading speed then you have to clean the cache memory so the plugin code gets included in your website code.
Otherwise, it will not work.

<h3> WHERE TO FIND? </h3>
A WP website cashing options can be found in:

1. WP cashing and automatic optimization plugins
2. Server/Hosting   ( Not every hosting has this option... )
3. Cloud

( A minify JS and CSS option can be found in WP automatic optimization plugins. )

You should flush the cache memory from all three places in the presented order.
Usually, there are buttons for that:

* A button can be named: Clear/Purge/Flush or a brume icon instead.
* A button named "Delete min JS and CSS" or something like that.

<h3> WHAT AFTER? </h3>
After that, log out from your website and visit the page that counts.
That visit should be recorded and you should see it in the plugin dashboard widget. To see it, you should log in again to your WP website backend and visit the menu option called Dashboard. Search for the widget like seen in the screenshot tab.



== Changelog ==

= 1.2.1 - 12.10.2024 =

Tested on WP version 6.6.2
Bug Fixed - delete page

= 1.2.0 - 13.12.2023 =

Fix coding standards
Add the disclaimer and privacy policy in plugin files
Hash IP address
Add Croatian translation
Tested on WP version 6.4.2

= 1.1.7 - 10.02.2023 =

Fix nonexistent array key error when new IP - ( prevent PHP warning in debug.log )

= 1.1.6 - 10.02.2023 =

Tested on WP version 6.2

= 1.1.5 - 04.11.2022 =

Tested on WP version 6.1

== Changelog ==

= 1.1.4 - 16.07.2022 =

Tested on WP version 6.0.3

= 1.1.3 - 12.07.2022 =

Tested on WP version 6.0
Tested with PHP version 7.4

= 1.1.2 - 10.02.2022 =

Tested on WP version 5.9

= 1.1.1 - 15.04.2021 =

Upgrade:

"Not counting this page" indicator in hidden counter when logged in with not counting user role.

Bug fixed - getting the page report data when page report deleted.


= 1.1.0 - 14.04.2021 =

Upgrade:

Add HTML code and display counter on the website frontend:
* Current page visits counter
* Website visits counter

Dev Tools / console - see the visits number even if you are logged in with a user role that doesn't count...

= 1.0.5 - 06.04.2021 =

Switching between hidden and visible list when search menu expanded is upgraded

= 1.0.4 - 31.03.2021 =

Plugin internationalized
Tested on WordPress 5.7.0
Bug fixed - deselect all on list type switch when options menu closed

= 1.0.3 - 29.03.2021 =

Dashboard widget - Video tutorial button added

= 1.0.2 - 23.03.2021 =

On page report/s delete - remove it from hidden reporting bug fixed


= 1.0.1 - 23.03.2021 =

On page report/s delete remove it from hidden reports list

= 1.0.0 - 22.03.2021 =

Initial release...




== Upgrade Notice ==


= 1.1.1 - 15.04.2021 =

Upgrade:

"Not counting this page" indicator in hidden counter when logged in with not counting user role.

Bug fixed - getting the page report data when page report deleted.

= 1.1.0 - 14.04.2021 =

Upgrade:

Add HTML code and display counter on the website frontend:
* Current page visits counter
* Website visits counter

Dev Tools / console - see the visits number even if you are logged in with a user role that doesn't count...

= 1.0.5 - 06.04.2021 =

Upgraded - switching between hidden and visible list when search menu expanded

= 1.0.4 - 31.03.2021 =

Plugin internationalized
Tested on WordPress 5.7.0
Bug fixed - deselect all on list type switch when options menu closed

= 1.0.3 - 29.03.2021 =

Dashboard widget - Video tutorial button added

= 1.0.1 - 23.03.2021 =

On page report/s delete remove it from hidden reports list

= 1.0.0 - 22.03.2021 =

Initial release...
On plugin delete, this plugin will automatically clean its data from the database unless you select to preserve data in the plugin settings area. Therefore, it is harmless for you to try out this plugin.
