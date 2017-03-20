<?php
/*
 ** Define a couple of functions for
** starting and ending an HTML document
*/

/*
 ** test for username/password
 */

include 'common.php';

ob_start();
session_start();
// $query = "SELECT * FROM login WHERE LOGINNAME = '". $user ."' AND PASSWORD = '". $pass ."'" ;
//print($query);
//    $result = mysqli_query($dbcon,$query);
 
$user=$_SERVER['PHP_AUTH_USER'];
$pass=$_SERVER['PHP_AUTH_PW'];

if( ( isset($user) && ( $user !=null ) ) AND
	( isset($pass) && ( $pass !=null ))
  AND ( mysqli_num_rows(mysqli_query($dbcon,"SELECT * FROM login WHERE LOGINNAME = '". $user ."' AND ACTIVE=1 AND PASSWORD = '". $pass ."'")) == 1) )
{
			$_SESSION['valid'] = true;
			$_SESSION['timeout'] = time();
			$_SESSION['username'] = $user;
			print("{\"login\":true, \"roles\":[]}" );
}
else
{
	
	echo 'You do not have  correct credentials';
	header('Refresh: 1; URL = logon.html');
	
	
	
/* 	 Browser login form */ 
/* 	//Send headers to cause a browser to request
	//username and password from user
	header("WWW-Authenticate: " .
			"Basic realm=\"Protected Area\"");
	header("HTTP/1.0 401 Unauthorized");

	//Show failure text, which browsers usually
	//show only after several failed attempts
	print("This page is protected by HTTP " .
			"Authentication failed for .<br>\nUser <b>". $user ."</b>\n");
 */ 
}
?>