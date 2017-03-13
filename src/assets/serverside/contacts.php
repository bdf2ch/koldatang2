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


    /**
    *
    *
    **/
    function getContactById($parameters) {
        global link;
        $contactId = $parameters -> contactId;

        $result = pg_query_params(
            $link,
            "SELECT get_contact_by_id($1)",
            array($contactId)
        );

        $contact = pg_fetch_all($result);
        echo is_null($contact) ? json_encode(NULL) : $contact[0]["get_contact_by_id"];
        return true;
    }


    /**
    *
    *
    **/
    function addContactPhone ($parameters) {
        global $link;
        $contactId = $parameters -> contactId;
        $atsId = $parameters -> atsId;
        $number = $parameters - > number;

        $result = pg_query_params(
            $link,
            "SELECT add_phone($1, $2, $3)",
            array($contactId, $atsId, $number)
        );

        $phone = pg_fetch_all($result);
        echo is_null($phone) ? json_encode(NULL) : $phone[0]["add_phone"];
        return true;
    }


    /**
    *
    *
    **/
    function editContactPhone ($parameters) {
        global $link;
        $phoneId = $parameters -> phoneId;
        $atsId = $parameters -> atsId;
        $number = $parameters - > number;

        $result = pg_query_params(
            $link,
            "SELECT edit_phone($1, $2, $3)",
            array($phoneId, $atsId, $number)
        );

        $phone = pg_fetch_all($result);
        echo is_null($phone) ? json_encode(NULL) : $phone[0]["edit_phone"];
        return true;
    }


    /**
    *
    *
    **/
    function deleteContactPhone($parameters) {
        global $link;
        $phoneId = $parameters -> phoneId;

        $result = pg_query_params(
            $link,
            'SELECT delete_phone($1)',
            array($phoneId)
        );

        echo $result != false ? json_encode(true) : json_encode(false);
        return true;
    }

?>
