<?php

    $DS = DIRECTORY_SEPARATOR;
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."config.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."users.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."divisions.php";
    $params = json_decode(file_get_contents("php://input"));


    $link = pg_pconnect("host=$db_host port=5432 dbname=$db_name user=$db_user password=$db_password");
    if (!$link) die ("can't connect to db");


    switch ($params -> action) {
        case "getInitialData": getInitialData(); break;

        case "getAllUsers": getAllUsers(); break;
        case "getUsersPortion": getUsersPortion($params -> data); break;
        case "getUserById": getUserById($params -> data); break;
        case "searchUsers": searchUsers($params -> data); break;
        case "addUser": addUser($params -> data); break;

        case "getAllDivisions": getAllDivisions(); break;
        case "addDivision": addDivision($params -> data); break;
        case "editDivision": editDivision($params -> data); break;
    }
    pg_close($link);

?>
