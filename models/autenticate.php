<?php

    class Autenticate
    {
        function get_credentials()
        {
            $credentials = array(
                "client_id" => "854803103529-26tarl12egacqjim9pcec1l83ulc1jdg.apps.googleusercontent.com",
                "blogId" => "3853686814920547447",
                "accessToken" => $_SESSION['accessToken']??"none"
            );

            return $credentials;
        }

        function set_accesToken($accesToken)
        {
            $_SESSION['accessToken'] = $accesToken;
            return true;
        }
    }

?>