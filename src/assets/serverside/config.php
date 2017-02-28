<?php

    /*** DB ***/
    $db_host = "10.50.0.242";
    $db_name = "phone";
    $db_user = "docuser";
    $db_password = "docasu";

    /*** AD ***/
    $ad_host = "10.50.0.2";


    function getInitialData() {
      global $link;

      $result = pg_query($link, "SELECT get_initial_data()");
      $data = pg_fetch_all($result)[0]["get_initial_data"];
      echo $data;
    }

?>
