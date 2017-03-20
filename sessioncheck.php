<?php
ob_start();
session_start();

if (!isset($_SESSION['username']))
{
	
	header('Refresh: 2; URL = logon.html');
	die("You aren't allowed to access this page");
	
}
?>