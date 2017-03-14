<?php

    /**
    * Возвращает все структурные подразделения
    **/
    function getAllDivisions () {
        global $link;

        $result = pg_query($link, "SELECT get_divisions()");
        $divisions = pg_fetch_all($result);

        echo $divisions[0]["get_divisions"];
        return true;
    }


    /**
    * Добавляет новое структурное подразделение
    * @parameters {Object} - параметры добавляемого структурного подразделения
    **/
    function addDivision ($parameters) {
        global $link;
        $parentId = $parameters -> parentId;
        $title = $parameters -> title;
        $isDepartment = $parameters -> isDepartment;

        $result = pg_query_params(
            $link,
            'SELECT add_division($1, $2, $3)',
            array($parentId, $title, $isDepartment ? 't' : 'f')
        );

        $division = pg_fetch_all($result);
        echo $division[0]["add_division"];
        return true;
    }


    /**
    * Сохраняет изменения в структурном подразделении
    * @parameters {Object} - парасетры изменяемого структурного подразделения
    **/
    function editDivision ($parameters) {
        global $link;
        $id = $parameters -> id;
        $parentId = $parameters -> parentId;
        $title = $parameters -> title;
        $isDepartment = $parameters -> isDepartment;

        $result = pg_query_params(
            $link,
            'SELECT edit_division($1, $2, $3, $4)',
            array($id, $parentId, $title, $isDepartment ? 't' : 'f')
        );

        $division = pg_fetch_all($result);
        echo $division[0]["edit_division"];
        return true;
    }

?>
