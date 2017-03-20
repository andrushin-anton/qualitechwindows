<?php

 	include 'sessioncheck.php';
 	include 'common.php';
 	//fetch table rows from mysql db
      $sql1 =   "SELECT * from appointments where WEEKDAY = 'Monday' AND WEEK(CURRENT_DATE,2) = WEEK ";
      $sql2 =	"SELECT * from appointments where WEEKDAY = 'Tuesday' AND WEEK(CURRENT_DATE,2) = WEEK ";
      $sql3 =   "SELECT * from appointments where WEEKDAY = 'Wednsday' AND WEEK(CURRENT_DATE,2) = WEEK ";
      $sql4 =	"SELECT * from appointments where WEEKDAY = 'Thursday' AND WEEK(CURRENT_DATE,2) = WEEK ";
      $sql5 =	"SELECT * from appointments where WEEKDAY = 'Friday' AND WEEK(CURRENT_DATE,2) = WEEK ";
      $sql6 =	"SELECT * from appointments where WEEKDAY = 'Saturday' AND WEEK(CURRENT_DATE,2) = WEEK ";
      $sql7 =	"SELECT * from appointments where WEEKDAY = 'Sunday' AND WEEK(CURRENT_DATE,2) = WEEK ";
      
    $result = mysqli_query($dbcon, $sql1) or die("Error in Selecting " . mysqli_error($dbcon));
    //create an arrays
    $emparray1 = array();
    while($row = mysqli_fetch_assoc($result))
    {
        $emparray1[] = $row;
    }
    		
    $result = mysqli_query($dbcon, $sql2) or die("Error in Selecting " . mysqli_error($dbcon));    		
    $emparray2 = array();
    while($row = mysqli_fetch_assoc($result))
    {
    	$emparray2[] = $row;
    }
    
    $result = mysqli_query($dbcon, $sql3) or die("Error in Selecting " . mysqli_error($dbcon));
    $emparray3 = array();
    while($row = mysqli_fetch_assoc($result))
    {
    	$emparray3[] = $row;
    }
    
    $result = mysqli_query($dbcon, $sql4) or die("Error in Selecting " . mysqli_error($dbcon));
    $emparray4 = array();
    while($row = mysqli_fetch_assoc($result))
    {
    	$emparray4[] = $row;
    }
    
    $result = mysqli_query($dbcon, $sql5) or die("Error in Selecting " . mysqli_error($dbcon));
    $emparray5 = array();
    while($row = mysqli_fetch_assoc($result))
    {
    	$emparray5[] = $row;
    }
    
    $result = mysqli_query($dbcon, $sql6) or die("Error in Selecting " . mysqli_error($dbcon));
    $emparray6 = array();
    while($row = mysqli_fetch_assoc($result))
    {
    	$emparray6[] = $row;
    }

    $result = mysqli_query($dbcon, $sql7) or die("Error in Selecting " . mysqli_error($dbcon));
    $emparray7 = array();
    while($row = mysqli_fetch_assoc($result))
    {
    	$emparray7[] = $row;
    }
    
    echo "[".json_encode($emparray1).",".json_encode($emparray2).",".json_encode($emparray3).",".json_encode($emparray4).",".json_encode($emparray5).",".json_encode($emparray6).",".json_encode($emparray7)."]";
    

?>