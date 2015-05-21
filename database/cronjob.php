<?php

$conn = mysqli_connect("localhost",'ripzerycom_dtd','Rabarip1','ripzerycom_dtd');
//$conn = mysqli_connect("localhost",'root','root','dealthedroid');

//Remove all tables
$emptyDatabase = "DROP TABLE android, brand, records,transactions, users";
$query = $conn->query($emptyDatabase);

if($query === TRUE){
    echo "All tables has been removed successfully <br>";

    // Here, we will restore all our backup

    $restoreDatabase = file_get_contents('/home/ripzerycom/domains/ripzery.com/public_html/dealthedroid/database/dealthedroid-backup.sql');

    if( ($restore = $conn->multi_query($restoreDatabase)) === TRUE){
        echo "Yay !, restore the database successfully.";
    }else{
        echo "Pssh, restore database failed :(";
    }

}else{
    echo "Fail to remove all tables";
}

mysqli_close($conn);