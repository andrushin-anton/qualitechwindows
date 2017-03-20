<?php
    include 'sessioncheck.php';
 	include 'common.php';
 	
  	//fetch table rows from mysql db
    $sql = "SELECT sellers.ID, login.LOGINNAME, sellers.LASTNAME, sellers.NAME, sellers.PHONE, sellers.MISC  FROM login JOIN sellers ON login.SELLER_ID = sellers.ID";
    $result = mysqli_query($dbcon, $sql) or die("Error in Selecting " . mysqli_error($dbcon));

    //create an array
    $emparray = array();
    while($row = mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }
    echo json_encode($emparray);

    //close the db connection
    mysqli_close($dbcon);
?>