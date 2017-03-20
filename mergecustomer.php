<?php
include 'sessioncheck.php';
include 'common.php';


$rawData = file_get_contents("php://input");
$my_arr = json_decode($rawData, true);
if($my_arr != null ){
	try
	{
		$sql = array();
		$action = "INSERT INTO";
		$post_action = '';
		foreach($my_arr as $key => $value){
			if( $key == 'ID') {
				$action = "UPDATE";
				$post_action = " WHERE ID = ". $value;
			}
			else {
				$sql[] = (is_numeric($value)) ? "`".$key."` =".$value : "`".$key."` = '" .$value. "'";
				//$sql[] = (is_numeric($value)) ?  `$key`."=" . $value :  `$key`." = '". $value."'";
				//echo (is_numeric($value)) ? "`".$key."` =".$value : "`".$key."` = '" .$value . "'";
			}
		}
		
		$sqlclause = implode(",",$sql) . $post_action;
		//echo ($action . " `customers` SET ". $sqlclause);
		mysqli_query($dbcon,  $action . " `customers` SET". $sqlclause ) or die("Error in execution " . mysqli_error($dbcon));
		echo '{"success":true}';
	}
	//catch exception
	catch (Exception $e) {
		echo 'Message: ' .$e->getMessage();
	}
} else echo 'Message: ' ."failed to decode this JSON". $rawData;
?>