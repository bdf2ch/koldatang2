<?php

    /**
    * Возвращает все структурные подразделения
    **/
    function getAllDivisions () {
        global $link;

        $result = pg_query($link, "SELECT get_divisions()");
        $divisions = pg_fetch_all($result);

        echo $divisions[0]["get_divisions"];
    }

?>
