<?php

    $DS = DIRECTORY_SEPARATOR;
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."config.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."users.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."divisions.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."ats.php";
    require_once $_SERVER["DOCUMENT_ROOT"].$DS."assets".$DS."serverside".$DS."contacts.php";
    $params = json_decode(file_get_contents("php://input"));


    $link = pg_pconnect("host=$db_host port=5432 dbname=$db_name user=$db_user password=$db_password");
    if (!$link) die ("can't connect to db");


    switch ($params -> action) {
        case "getInitialData": getInitialData(); break;

        case "getAllUsers": getAllUsers(); break;
        case "getUsersPortion": getUsersPortion($params -> data); break;
        case "getUsersByDivisionId": getUsersByDivisionId($params -> data); break;
        case "getUserById": getUserById($params -> data); break;
        case "searchUsers": searchUsers($params -> data); break;
        case "addUser": addUser($params -> data); break;
        case "editUser": editUser($params -> data); break;

        case "getAllDivisions": getAllDivisions(); break;
        case "addDivision": addDivision($params -> data); break;
        case "editDivision": editDivision($params -> data); break;

        case "getAllATS": getAllATS(); break;
        case "addATS": addATS($params -> data); break;
        case "editATS": editATS($params -> data); break;
        case "getATSCodesByATSId": getATSCodesByATSId($params -> data); break;
        case "addATSCode": addATSCode($params -> data); break;
        case "deleteATSCode": deleteATSCode($params -> data); break;

        case "getContactsByDivisionId": getContactsByDivisionId($params -> data); break;
        case "searchContacts": searchContacts($params -> data); break;
    }
    pg_close($link);

?>
