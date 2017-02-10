<?php

    $DS = DIRECTORY_SEPARATOR;
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."config.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."users.php";
    $params = json_decode(file_get_contents("php://input"));


    $link = pg_pconnect("host=$db_host port=5432 dbname=$db_name user=$db_user password=$db_password");
    if (!$link) die ("can't connect to db");


    switch ($params -> action) {
        case "getUsers": getUsers(); break;
        case "addUser": add_user($params -> data); break;
    }


    pg_close($link);

?>
