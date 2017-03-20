<?php
include 'sessioncheck.php';
include 'common.php';


$rawData = file_get_contents("php://input");
	try
	{
		mysqli_query($dbcon, $rawData) or die("Error in SQL stmnt: ". $rawData." Error: " . mysqli_error($dbcon));
		echo '{"success":true}';
	}
	//catch exception
	catch (Exception $e) {
		echo 'Message: ' .$e->getMessage();
	}
?>