<?php


    /**
    * Возвращает все АТС
    **/
    function getAllATS() {
        global $link;

        $result = pg_query($link, "SELECT get_ats()");
        $ats = pg_fetch_all($result);

        echo $ats[0]["get_ats"];
        return true;
    }


    /**
    * Добавляет новую АТС
    * @parameters {Object} - параметры добавляемой АТС
    **/
    function addATS ($parameters) {
        global $link;
        $parentId = $parameters -> parentId;
        $type = $parameters -> type;
        $title = $parameters -> title;

        $result = pg_query_params(
            $link,
            'SELECT add_ats($1, $2, $3)',
            array($parentId, $type, $title)
        );

        $ats = pg_fetch_all($result);
        echo $ats[0]["add_ats"];
        return true;
    }


    /**
    * Сохраняет изменения в АТС
    * @parameters {Object} - параметры редактируемой АТС
    **/
    function editATS($parameters) {
        global $link;
        $id = $parameters -> id;
        $parentId = $parameters -> parentId;
        $type = $parameters -> type;
        $title = $parameters -> title;

        $result = pg_query_params(
            $link,
            'SELECT edit_ats($1, $2, $3, $4)',
            array($id, $parentId, $type, $title)
        );

        $ats = pg_fetch_all($result);
        echo $ats[0]["edit_ats"];
        return true;
    }


    /**
    *
    *
    **/
    function getATSCodesByATSId($parameters) {
        global $link;
        $atsId = $parameters -> atsId;

        $result = pg_query_params(
            $link,
            'SELECT get_ats_codes_by_ats_id($1)',
            array($atsId)
        );

        $codes = pg_fetch_all($result);
        echo $codes[0]["get_ats_codes_by_ats_id"];
        return true;
    }


    /**
    *
    *
    **/
    function addATSCode($parameters) {
        global $link;
        $sourceATSId = $parameters -> sourceATSId;
        $targetATSId = $parameters -> targetATSId;
        $code = $parameters -> code;

        $result = pg_query_params(
            $link,
            'SELECT add_ats_code($1, $2, $3)',
            array($sourceATSId, $targetATSId, $code)
        );

        $code = pg_fetch_all($result);
        echo $code[0]["add_ats_code"];
        return true;
    }


    /**
    *
    *
    **/
    function deleteATSCode($parameters) {
        global $link;
        $atsCodeId = $parameters -> atsCodeId;

        $result = pg_query_params(
            $link,
            'SELECT delete_ats_code($1)',
            array($atsCodeId)
        );

        echo $result != false ? json_encode(true) : json_encode(false);
        return true;
    }

?>
