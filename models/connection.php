<?php

    function connect()
    {
        
        if(!isset($oCon))
        {
            $host = "site.miempleord.com";
            $user = "qscbkfcv_wp998";
            $password = "z@03pS94";
            $db = "qscbkfcv_wp998";
            $host_info = "mysql:host=$host;dbname=$db;charset=utf8";

            try 
            {
                $oCon = new PDO($host_info, $user, $password);
                return $oCon;
            } 
            catch (PDOException $ex) {
                return "Error".$ex;
            }
        }
        else
        {
            return $oCon;
        }
        
    }

?>