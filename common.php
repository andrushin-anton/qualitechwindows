 <?php
# Fill our vars and run on cli
# $ php -f db-connect-test.php
 // Database Variables
 $dbhost = "107.180.27.180";
 $dbuser = "sales_manager";
 $dbpass = "Ivan1971";
 $dbname = "customers_db";

 //open connection to mysql db
 $dbcon = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname) or die("Unable to Connect to '$dbhost'");
 
  // Set autocommit to on
 mysqli_autocommit($dbcon,TRUE);
 