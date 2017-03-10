<?php

    /**
    *
    **/
    function getContactsByDivisionId ($parameters) {
        global $link;
        $divisionId = $parameters -> divisionId;

        $result = pg_query_params(
            $link,
            "SELECT get_contacts_by_division_id($1)",
            array($divisionId)
        );

        $contacts = pg_fetch_result($result, 0, 0);
        echo is_null($contacts) ? json_encode(NULL) : $contacts;
        return true;
    }


    /**
    *
    **/
    function searchContacts ($parameters) {
        global $link;
        $search = $parameters -> search;

        $result = pg_query_params(
            $link,
            "SELECT search_contacts($1)",
            array($search)
        );

        $contacts = pg_fetch_all($result);
        echo is_null($contacts) ? json_encode(NULL) : $contacts[0]["search_contacts"];
        return true;
    }

?>
