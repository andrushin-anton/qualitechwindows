<?php

 	include 'sessioncheck.php';
 	include 'common.php';
 	//fetch table rows from mysql db
    $sql = "select * from customers";
    $result = mysqli_query($dbcon, $sql) or die("Error in Selecting " . mysqli_error($dbcon));

    //create an array
    $emparray = array();
    while($row = mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }
    echo json_encode($emparray);

?>