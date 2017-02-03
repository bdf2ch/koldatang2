<?php

    function getDivisions () {
        global $link;

         $result = pg_query($link, "SELECT get_divisions()");
         $divisions = pg_fetch_all($result);

         return $divisions[0]["get_divisions"];
    }

?>