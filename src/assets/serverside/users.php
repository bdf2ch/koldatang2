<?php


    function getAllUsers () {
        global $link;

        $result = pg_query($link, "SELECT get_users()");
        $users = pg_fetch_all($result);

        echo $users[0]["get_users"];
    }


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


    function addUser ($parameters) {
        global $link;
        $departmentId = $parameters -> departmentId;
        $divisionId = $parameters -> divisionId;
        $surname = $parameters -> surname;
        $name = $parameters -> name;
        $fname = $parameters -> fname;
        $position = $parameters -> position;
        $email = $parameters -> email;
        $password = $parameters -> password;
        $isAdministrator = $parameters -> isAdministrator == 1 ? true : false;

        $result = pg_query_params(
            $link,
            'SELECT add_user($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            $departmentId, $divisionId, $surname, $name, $fname, $position, $email, $password, $isAdministrator
        );
        $user = pg_fetch_assoc($result);

        echo(json_encode($user));
        return true;
    }

?>
