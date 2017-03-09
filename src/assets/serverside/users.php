<?php

    /**
    *
    **/
    function getAllUsers () {
        global $link;

        $result = pg_query($link, "SELECT get_users()");
        $users = pg_fetch_all($result);

        echo $users[0]["get_users"];
    }


    /**
    * Получает массив пользователей
    * @start {number} - начальная позиция
    * @limit {number} - количество
    **/
    function getUsersPortion ($parameters) {
        global $link;
        $start = $parameters -> start;
        $limit = $parameters -> limit;

        $result = pg_query_params(
            $link,
            "SELECT get_users_portion($1, $2)",
            array($start, $limit)
        );

        $users = pg_fetch_all($result);
        echo $users[0]["get_users_portion"];
    }


    /**
    * Получает массив пользователей по идентифкатору структурного подразделения
    * @divisionId {number} - идентификатор структурного подразделения
    **/
    function getUsersByDivisionId ($parameters) {
        global $link;
        $divisionId = $parameters -> divisionId;

        $result = pg_query_params(
            $link,
            "SELECT get_users_by_division_id($1)",
            array($divisionId)
        );

        $users = pg_fetch_result($result, 0, 0);
        echo is_null($users) ? json_encode(NULL) : $users;
        return true;
    }


    /**
    *
    **/
    function getUserById ($parameters) {
        global $link;
        $id = $parameters -> id;

        $result = pg_query_params(
            $link,
            "SELECT get_user_by_id($1)",
            array($id)
        );

        $user = pg_fetch_result($result, 0, 0);
        echo is_null($user) ? json_encode(NULL) : $user;
        return true;
    }


    function searchUsers ($parameters) {
        global $link;
        $search = $parameters -> search;

        $result = pg_query_params(
            $link,
            "SELECT search_users($1)",
            array($search)
        );

        $users = pg_fetch_all($result);
        echo is_null($users) ? json_encode(NULL) : $users[0]["search_users"];
        return true;
    }


    /**
    *
    **/
    function addUser ($parameters) {
        global $link;
        $tabId = $parameters -> tabId;
        $departmentId = $parameters -> departmentId;
        $divisionId = $parameters -> divisionId;
        $surname = $parameters -> surname;
        $name = $parameters -> name;
        $fname = $parameters -> fname;
        $position = $parameters -> position;
        $email = $parameters -> email;
        $password = $parameters -> password;
        $activeDirectoryAccount = $parameters -> activeDirectoryAccount;
        $isAdministrator = $parameters -> isAdministrator;

        $result = pg_query_params(
            $link,
            "SELECT add_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
            array($tabId, $departmentId, $divisionId, $surname, $name, $fname, $position, $email, $password, $activeDirectoryAccount)
        );

        var_dump($result);

        $user = pg_fetch_result($result, 0, 0);
        echo($user);
        return true;
    }


    /**
    *
    **/
    function editUser ($parameters) {
        global $link;
        $id = $parameters -> id;
        $departmentId = $parameters -> departmentId;
        $divisionId = $parameters -> divisionId;
        $tabId = $parameters -> tabId;
        $surname = $parameters -> surname;
        $name = $parameters -> name;
        $fname = $parameters -> fname;
        $email = $parameters -> email;
        $position = $parameters -> position;
        $activeDirectoryAccount = $parameters -> activeDirectoryAccount;
        $password = $parameters -> password;
        $isAdministrator = $parameters -> isAdministrator;

        $result = pg_query_params(
            $link,
            "SELECT edit_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
            array($id, $departmentId, $divisionId, $tabId, $surname, $name, $fname, $email, $position, $activeDirectoryAccount, $password, $isAdministrator ? 't' : 'f')
        );

        $user = pg_fetch_all($result);
        echo $user[0]["edit_user"];
        return true;
    }

?>
