<?php
/**
 * SETTINGS - SETTINGS TAB
 *
 * This file is responsible for displaying the HTML content of the settings tab.
 *
 * The settings tab provides options and information related to the display and placement
 * of the page and website visits counters on the website. Users can customize the appearance
 * and behavior of the counters through the settings available in this tab.
 *
 * @package Strongetic - count page visits
 * @since 1.0.6
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}




// Define default styles for counter boxes.
$StrCpv_counter_default_style_dark = "  display: inline-block !important;<br>
										padding-top: 0 !important;<br>
										padding-bottom: 0 !important;<br>
										padding-left: 5px !important;<br>
										padding-right: 1px !important;<br>
										letter-spacing: 5px !important;<br>
										background-color: black !important;<br>
										color: white !important;<br>
										border-radius: 4px !important;<br>
										font-weight: bold !important;<br>
										font-size: 12px !important;<br>
									 ";

$StrCpv_counter_default_style_light = " display: inline-block !important;<br>
										padding-top: 0 !important;<br>
										padding-bottom: 0 !important;<br>
										padding-left: 5px !important;<br>
										padding-right: 1px !important;<br>
										letter-spacing: 5px !important;<br>
										background-color: #d8d8d8 !important;<br>
										color: #333333 !important;<br>
										border-radius: 4px !important;<br>
										font-weight: bold !important;<br>
										font-size: 12px !important;<br>
									";
?>



<div class="StrCPVisits-light-tab-counter">
	<!-- MAIN TITLE and DESCRIPTION -->
	<h2><?php esc_html_e( 'DISPLAY COUNTER - on the website', 'page-visits-counter-lite' ); ?></h2>
	<p class="StrCPVisits-light-tab-counter-description"><?php esc_html_e( 'If you wish to display a visits-counter on your website, copy the counter code and paste it into "HTML widget" or "page custom HTML block". (Not code block!)', 'page-visits-counter-lite' ); ?></p>
	<br>

	<!-- INFO BOX -->
	<section class="StrCPVisits-light-tab-counter-info-section">
		<!-- INFO TITLE -->
		<h3><?php esc_html_e( 'INFO', 'page-visits-counter-lite' ); ?></h3>
		<p><?php esc_html_e( 'About counter N/A status:', 'page-visits-counter-lite' ); ?></p>
		<ul>
			<li><?php esc_html_e( 'N/A stands for "Not Available"', 'page-visits-counter-lite' ); ?></li>
			<li><?php esc_html_e( 'N/A is a default counter status - counter does not start from zero - zero is set on reset', 'page-visits-counter-lite' ); ?></li>
		</ul>
		<p><?php esc_html_e( 'A not-counting page is going to display N/A.', 'page-visits-counter-lite' ); ?></p>
		<p><?php esc_html_e( 'Also, any other page is going to display N/A until it is visited by either: ', 'page-visits-counter-lite' ); ?></p>
		<ul>
			<li><?php esc_html_e( 'signed-out user', 'page-visits-counter-lite' ); ?></li>
			<li><?php esc_html_e( 'signed-in user with a counting user role', 'page-visits-counter-lite' ); ?></li>
		</ul>
		<i>( <?php esc_html_e( 'For more info about "Counting" and "Not Counting" read in the plugin documentation.', 'page-visits-counter-lite' ); ?> )</i>

	</section>
	<br><br>


	<!-- WARNING-TITLE -->
	<h3 class="StrCPVisits-warning"><?php esc_html_e( 'WARNING', 'page-visits-counter-lite' ); ?></h3>
	<p><?php esc_html_e( 'If you are placing the code into dynamic website element like header, footer or sidebar then you can add only one page-visits-counter and one website-visits-counter on your website.', 'page-visits-counter-lite' ); ?></p>
	<i><?php esc_html_e( '( A dynamic element is an element displayed across the web pages of your website. )', 'page-visits-counter-lite' ); ?></i>
	<p><?php esc_html_e( 'If you wish to place it on a static page then each page can have only one page-visits-counter and one website-visits-counter.', 'page-visits-counter-lite' ); ?></p>
	<br><br>

	<!-- VIDEO ICON -->
	<span class="dashicons dashicons-format-video"></span>
	<!-- VIDEO LINK -->
	<a href="https://www.youtube.com/watch?v=LWKxYhtYH3o" class="StrCPVisits-light-tab-counter-video-expl-link" target="_blank"><?php esc_html_e( 'VIDEO EXPLANATION', 'page-visits-counter-lite' ); ?></a>
	<br><br><br><br>

	<ul class="StrCPVisits-frontend-counter-code-list">

		<!-- PAGE VISITS COUNTER -->
		<li class="StrCPVisits-frontend-counter-code StrCPVisits-page-counter-code StrCPVisits-two-col">

			<!-- TITLE -->
			<h3><?php esc_html_e( 'Page Visits Counter - code samples', 'page-visits-counter-lite' ); ?></h3>
			<!-- TITLE DESCRIPTION -->
			<ul class="StrCPVisits-frontend-counter-code-description">
				<li><?php esc_html_e( 'It will display the number of total visits for the currently loaded page.', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'It does not count page refresh as a new visit.', 'page-visits-counter-lite' ); ?></li>
			</ul>
			<br>

			<!-- POSITION MENU -->
			<span class="StrCPVisits-frontend-counter-code-select-position-text"><?php esc_html_e( 'Set counter position in parent element', 'page-visits-counter-lite' ); ?></span>
			<select id="StrCPVisits-page-counter-select-position">
				<option value="left"><?php esc_html_e( 'Left', 'page-visits-counter-lite' ); ?></option>
				<option value="center"><?php esc_html_e( 'Center', 'page-visits-counter-lite' ); ?></option>
				<option value="right"><?php esc_html_e( 'Right', 'page-visits-counter-lite' ); ?></option>
			</select>

			<!-- PAGE VISITS COUNTER - CODE BLOCKS -->
			<div class="StrCPVisits-counter-tab-content-col">


				<div class="StrCPVisits-counter-code-box">
					<!-- TITLE - BASE -->
					<h4><?php esc_html_e( 'BASE - counter', 'page-visits-counter-lite' ); ?></h4>
					<!-- COUNTER SAMPLE - BASE -->
					<div class="strcpv-page-counter-example strcpv-page-counter-example-base">
						<p>00128</p>
						<i>( <?php esc_html_e( 'Position is always LEFT', 'page-visits-counter-lite' ); ?> )</i>
					</div>
					<code>
						&lt;!-- PAGE VISITS COUNTER - BASE --&gt;<br>
						&lt;div id=&quot;strcpv-page-counter&quot;&gt;N/A&lt;/div&gt;<br>
					</code>
				</div>


				<div class="StrCPVisits-counter-code-box">
					<!-- TITLE - BASE and POSITION -->
					<h4><?php esc_html_e( 'BASE and POSITION - counter', 'page-visits-counter-lite' ); ?></h4>
					<!-- COUNTER SAMPLE - BASE + Position -->
					<div class="strcpv-page-counter-example strcpv-js-page-counter-example-pos strcpv-page-counter-example-base-and-position"><p>00128</p></div>
					<code class="strcpv-frontend-counter-position-rewrite">
						&lt;!-- PAGE VISITS COUNTER - BASE+POS. --&gt;<br>
						&lt;div id=&quot;strcpv-page-counter&quot;&gt;N/A&lt;/div&gt;<br>
						&lt;style&gt;<br>
						#strcpv-page-counter {<br> text-align: left;<br> }<br>
						&lt;/style&gt;
					</code>
				</div>


				<div class="StrCPVisits-counter-code-box">
					<!-- TITLE - LIGHT -->
					<h4><?php esc_html_e( 'LIGHT - counter', 'page-visits-counter-lite' ); ?></h4>
					<!-- COUNTER SAMPLE - LIGHT -->
					<div class="strcpv-page-counter-example strcpv-js-page-counter-example-pos strcpv-page-counter-example-light"><p>00128</p></div>
					<code class="strcpv-frontend-counter-position-rewrite">
						&lt;!-- PAGE VISITS COUNTER - LIGHT --&gt;<br>
						&lt;div id=&quot;strcpv-page-counter&quot;&gt;N/A&lt;/div&gt;<br>
						&lt;style&gt;<br>
						#strcpv-page-counter {<br> text-align: left;<br> }<br>
						#strcpv-page-counter p {<br> <?php echo $StrCpv_counter_default_style_light; ?> }<br>
						&lt;/style&gt;
					</code>
				</div>


				<div class="StrCPVisits-counter-code-box">
					<!-- TITLE - DARK -->
					<h4><?php esc_html_e( 'DARK - counter', 'page-visits-counter-lite' ); ?></h4>
					<!-- COUNTER SAMPLE - DARK -->
					<div class="strcpv-page-counter-example strcpv-js-page-counter-example-pos strcpv-page-counter-example-dark"><p>00128</p></div>
					<code class="strcpv-frontend-counter-position-rewrite">
						&lt;!-- PAGE VISITS COUNTER - DARK --&gt;<br>
						&lt;div id=&quot;strcpv-page-counter&quot;&gt;N/A&lt;/div&gt;<br>
						&lt;style&gt;<br>
						#strcpv-page-counter {<br> text-align: left;<br> }<br>
						#strcpv-page-counter p {<br> <?php echo $StrCpv_counter_default_style_dark; ?> }<br>
						&lt;/style&gt;
					</code>
				</div>


			</div>
		</li>




		<!-- WEBSITE VISITS COUNTER -->
		<li class="StrCPVisits-frontend-counter-code StrCPVisits-website-counter-code StrCPVisits-two-col">

			<!-- TITLE -->
			<h3><?php esc_html_e( 'Website Visits Counter - code samples', 'page-visits-counter-lite' ); ?></h3>
			<!-- TITLE DESCRIPTION -->
			<ul class="StrCPVisits-frontend-counter-code-description">
				<li><?php esc_html_e( 'It will display the sum of total visits for all website pages.', 'page-visits-counter-lite' ); ?></li>
				<li><?php esc_html_e( 'It counts page refresh.', 'page-visits-counter-lite' ); ?></li>
			</ul>
			<br>

			<!-- POSITION MENU -->
			<span class="StrCPVisits-frontend-counter-code-select-position-text"><?php esc_html_e( 'Set counter position in parent element', 'page-visits-counter-lite' ); ?></span>
			<select id="StrCPVisits-website-counter-select-position">
				<option value="left"><?php esc_html_e( 'Left', 'page-visits-counter-lite' ); ?></option>
				<option value="center"><?php esc_html_e( 'Center', 'page-visits-counter-lite' ); ?></option>
				<option value="right"><?php esc_html_e( 'Right', 'page-visits-counter-lite' ); ?></option>
			</select>

			<!-- WEBSITE VISITS COUNTER - CODE BLOCKS -->
			<div class="StrCPVisits-counter-tab-content-col">


				<div class="StrCPVisits-counter-code-box">
					<!-- TITLE - BASE -->
					<h4><?php esc_html_e( 'BASE - counter', 'page-visits-counter-lite' ); ?></h4>
					<!-- COUNTER SAMPLE - BASE -->
					<div class="strcpv-page-counter-example strcpv-page-counter-example-base">
						<p>00128</p>
						<i>( <?php esc_html_e( 'Position is always LEFT', 'page-visits-counter-lite' ); ?> )</i>
					</div>
					<code>
						&lt;!-- WEBSITE VISITS COUNTER - BASE --&gt;<br>
						&lt;div id=&quot;strcpv-website-counter&quot;&gt;N/A&lt;/div&gt;<br>
					</code>
				</div>


				<div class="StrCPVisits-counter-code-box">
					<!-- TITLE - BASE and POSITION -->
					<h4><?php esc_html_e( 'BASE and POSITION - counter', 'page-visits-counter-lite' ); ?></h4>
					<!-- COUNTER SAMPLE - BASE + Position -->
					<div class="strcpv-page-counter-example strcpv-js-page-counter-example-pos strcpv-page-counter-example-base-and-position"><p>00128</p></div>
					<code class="strcpv-frontend-counter-position-rewrite">
						&lt;!-- WEBSITE VISITS COUNTER - BASE+POS. --&gt;<br>
						&lt;div id=&quot;strcpv-website-counter&quot;&gt;N/A&lt;/div&gt;<br>
						&lt;style&gt;<br>
						#strcpv-website-counter {<br> text-align: left;<br> }<br>
						&lt;/style&gt;
					</code>
				</div>


				<div class="StrCPVisits-counter-code-box">
					<!-- TITLE - LIGHT -->
					<h4><?php esc_html_e( 'LIGHT - counter', 'page-visits-counter-lite' ); ?></h4>
					<!-- COUNTER SAMPLE - LIGHT -->
					<div class="strcpv-page-counter-example strcpv-js-page-counter-example-pos strcpv-page-counter-example-light"><p>00128</p></div>
					<code class="strcpv-frontend-counter-position-rewrite">
						&lt;!-- WEBSITE VISITS COUNTER - LIGHT --&gt;<br>
						&lt;div id=&quot;strcpv-website-counter&quot;&gt;N/A&lt;/div&gt;<br>
						&lt;style&gt;<br>
						#strcpv-website-counter {<br> text-align: left;<br> }<br>
						#strcpv-website-counter p {<br> <?php echo $StrCpv_counter_default_style_light; ?> }<br>
						&lt;/style&gt;
					</code>
				</div>


				<div class="StrCPVisits-counter-code-box">
					<!-- TITLE - DARK -->
					<h4><?php esc_html_e( 'DARK - counter', 'page-visits-counter-lite' ); ?></h4>
					<!-- COUNTER SAMPLE - DARK -->
					<div class="strcpv-page-counter-example strcpv-js-page-counter-example-pos strcpv-page-counter-example-dark"><p>00128</p></div>
					<code class="strcpv-frontend-counter-position-rewrite">
						&lt;!-- WEBSITE VISITS COUNTER - DARK --&gt;<br>
						&lt;div id=&quot;strcpv-website-counter&quot;&gt;N/A&lt;/div&gt;<br>
						&lt;style&gt;<br>
						#strcpv-website-counter {<br> text-align: left;<br> }<br>
						#strcpv-website-counter p {<br> <?php echo $StrCpv_counter_default_style_dark; ?> }<br>
						&lt;/style&gt;
					</code>
				</div>


			</div>
		</li>
	</ul>


</div>
