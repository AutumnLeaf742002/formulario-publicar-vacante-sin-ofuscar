<?php

    

    if(!empty($_POST))

    {

        // authorized

        $mail = "23ac803ffaf91a46a7d88f589306112727d28ad5adb51f47dc23a8ef485c1caa";

        $password = "9c2c66c40f40f6b76e76c0ce2a980743e0af24e7a31caae56c4f0a3da3d5ed60";



        // objeto de conexion y metodos de manejo sql

        include_once "./connection.php";

        include_once "./commands.php";

        include_once "./functions.php";

        session_start();

        $oCon = connect();

        $action = $_POST["action"];



        //includes para los controladores php

        include_once "tablero.php";

        include_once "descripcion-vacante.php";

        include_once "formulario_vacantes.php";

        include_once "compartir.php";

        include_once "autenticate.php";



        // objetos

        $tablero = new Tablero();

        $descripcion_vacante = new Descripcion_vacante();

        $formulario_vacantes = new Formulario_vacantes();

        $compartir = new Compartir();

        $autenticate = new Autenticate();



        // Determinantes para la decision de la accion



        if($action == "sesion_confirm")

        {

            $s_mail = $_SESSION["mail"] ?? "none";

            $s_password = $_SESSION["password"] ?? "none";

            $authorized = "denied";



            if($s_mail != $mail && $s_password != $password)

            {

                $authorized = "denied";

            }

            else

            {

                $authorized = "authorized";

            }



            echo $authorized;

        }



        if($action == "set_sesion")

        {

            $p_mail = encrypt($_POST["mail"]);

            $p_password = encrypt($_POST["password"]);

            

            if($p_mail == $mail && $p_password == $password)

            {

                $_SESSION["mail"] = $p_mail;

                $_SESSION["password"] = $p_password;



                echo "Correct";

            }

            else

            {

                echo "Datos erroneos";

            }

        }



        if($action == "close_sesion")

        {

            try

            {

                session_destroy();

                echo "Correct";

            }

            catch(Exception $e)

            {

                echo $e;

            }

        }



        if($action == "get_news_vacantes")

        {

            $res = $tablero->get_news_vacantes($oCon);

            echo $res;

        }



        if($action == "get_published_vacantes")

        {

            $arq = $_POST["arq"] ?? "false";
            $res = $tablero->get_published_vacantes($arq, $oCon);

            echo $res;

        }



        if($action == "set_vacante_id")

        {

            $vacante_id = $_POST["id"] ?? 0;



            if($vacante_id > 0)

            {

                $_SESSION["vacante_id"] = $vacante_id;

                echo "Correct";

            }

            else

            {

                echo "Ha ocurrido un error, el id en post es menor a 1";

            }

        }



        if($action == "change_status")

        {

            $id = $_POST["id"] ?? 0;

            $res = $descripcion_vacante->change_status($oCon, $id);

            echo $res;

        }



        if($action == "send_form")

        {

            $nombre_empresa = $_POST['nombre_empresa'] ?? "";

            $provincia = $_POST['provincia'] ?? "";

            $direccion = $_POST['direccion'] ?? "";

            $sexo = $_POST['sexo'] ?? 0;

            $nacionalidad = $_POST['nacionalidad'] ?? 0;

            $posicion = $_POST['posicion'] ?? "";

            $nivel_estudio = $_POST['nivel_estudio'] ?? 0;

            $requisitos = $_POST['requisitos'] ?? "";

            $beneficios = $_POST['beneficios'] ?? "";

            $correo = $_POST['mail'] ?? "";

            $telefono = $_POST['password'] ?? "";

            $fecha = $_POST['fecha'] ?? "";

            $categoria = $_POST['categoria'] ?? "";

            $comentarios = $_POST['comentarios'] ?? "";



            $nombre_empresa = trim($nombre_empresa);

            $provincia = trim($provincia);

            $direccion = trim($direccion);

            $sexo = trim($sexo);

            $nacionalidad = trim($nacionalidad);

            $posicion = trim($posicion);

            $nivel_estudio = trim($nivel_estudio);

            $requisitos = trim($requisitos);

            $beneficios = trim($beneficios);

            $correo = trim($correo);

            $telefono = trim($telefono);

            $fecha = trim($fecha);

            $categoria = trim($categoria);

            $comentarios = trim($comentarios);

            // quitar signos de puntuacion a campos Nombre empresa, provincia sector, posicion requerida

            $nombre_empresa = quitarSignosDePuntuacion($nombre_empresa);
            $provincia = quitarSignosDePuntuacion($provincia);
            $posicion = quitarSignosDePuntuacion($posicion);

            // quitar los dobles espacios en blanco entre cada palabra

            $nombre_empresa = corregirEspacios($nombre_empresa);
            $provincia = corregirEspacios($provincia);
            $posicion = corregirEspacios($posicion);

            if(

                strlen($nombre_empresa) >= 1 && strlen($nombre_empresa) <= 100 &&

                strlen($provincia) >= 1 && strlen($provincia) <= 100 &&

                strlen($direccion) >= 1 && strlen($direccion) <= 100 &&

                strlen($sexo) == 1 &&

                strlen($nacionalidad) == 1 &&

                strlen($posicion) >= 1 && strlen($posicion) <= 100 &&

                strlen($nivel_estudio) == 1 &&

                strlen($requisitos) >= 1 && strlen($requisitos) <= 4000 &&

                strlen($beneficios) >= 1 && strlen($beneficios) <= 4000 &&

                strlen($correo) >= 1 && strlen($correo) <= 50 &&

                strlen($telefono) <= 30 &&

                strlen($fecha) <= 10 &&

                strlen($categoria) >= 1 && strlen($categoria) <= 50 &&

                strlen($comentarios) <= 4000

            ) 

            {

                $res = $formulario_vacantes->send_form($oCon, $nombre_empresa, $provincia, $direccion, $sexo, $nacionalidad, $posicion, $nivel_estudio, $requisitos, $beneficios, $correo, $telefono, $fecha, $categoria, $comentarios);



                echo $res;

            } 

            else 

            {

                echo "no paso la validacion de los campos en php";

            }

            

        }



        if($action == "delete_vacante")

        {

            $id = $_POST["id"] ?? 0;

            $res = $descripcion_vacante->delete_vacante($oCon, $id);

            echo $res;

        }

        if($action == "block_ip")

        {

            $id = $_POST["id"] ?? 0;

            $res = $descripcion_vacante->block_ip($oCon, $id);

            echo $res;

        }

        if($action == "set_compartida")

        {

            $id = $_POST["id"] ?? 0;

            $res = $compartir->set_compartida($oCon, $id);

            echo $res;

        }

        if($action == "get_vacante_by_id_for_share")

        {

            $id = $_POST["id"] ?? 0;

            $res = $compartir->get_vacante_by_id_for_share($oCon, $id);

            echo $res;

        }

        if($action == "autenticate")
        {

            $res = $autenticate->get_credentials();

            echo json_encode($res);
        }

        if($action == "setAccessToken")
        {

            $accessToken = $_POST["accessToken"]??"";

            $res = $autenticate->set_accesToken($accessToken);
        }
    }



?>