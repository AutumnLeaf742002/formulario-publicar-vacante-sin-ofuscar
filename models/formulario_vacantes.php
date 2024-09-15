<?php



    class Formulario_vacantes

    {



        function send_form($oCon, $nombre_empresa, $provincia, $direccion, $sexo, $nacionalidad, $posicion, $nivel_estudio, $requisitos, $beneficios, $correo, $telefono, $fecha, $categoria, $comentarios)

        {

            $estado = 1;

            $fecha_creacion = get_date();


            $ip = $_SERVER['REMOTE_ADDR'] ?? 'default';

            $sql_ip = "CALL sp_get_blocks_ip()";

            $res_ip = select($oCon, $sql_ip);

            $confirm = false;

            foreach($res_ip as $item)
            {
                if($item["Ip"] == $ip)
                {
                    $confirm = true;
                }
            }

            if($confirm == false)
            {
                $sql = "CALL sp_add_vacante('$nombre_empresa', '$provincia', '$direccion', $sexo, $nacionalidad, '$posicion', $nivel_estudio, '$requisitos', '$beneficios', '$correo', '$telefono', '$fecha', '$categoria', '$comentarios', $estado, '$fecha_creacion', '$ip')";



                $res = command($oCon, $sql);

                //quitar comentario solo en produccion

                // if($res == "Correct")
                // {
                    
                //         // Recoge los datos del formulario
                //         $nombre = $nombre_empresa;
                //         $correo = $correo;
                //         $mensaje = $posicion;
                        
                //         // Configuración del correo saliente
                //         $correoSalida = 'soporte@site.miempleord.com';
                //         $contrasena = 'contraseña_de_la_cuenta_de_correo';
                //         $servidorSalida = 'site.miempleord.com';
                //         $puertoSMTP = 465;

                //         // Dirección de correo de destino
                //         $destinatario = 'infomiempleord@gmail.com';

                //         // Cuerpo del correo
                //         $asunto = 'Nueva vacante recibida';
                //         $cuerpo = "Empresa $nombre_empresa\n";
                //         $cuerpo .= "Correo: $correo\n";
                //         $cuerpo .= "Solicita: $posicion\n";

                //         // Configuración del correo
                //         $headers = array(
                //             'From' => $correoSalida,
                //             'Reply-To' => $correo,
                //             'X-Mailer' => 'PHP/' . phpversion()
                //         );

                //         // Envío del correo
                //         mail($destinatario, $asunto, $cuerpo, $headers);

                // }



                return $res;
            }
            else
            {
                return "Has sido bloqueado por violación a nuestras políticas";
            }

            

        }



    }



?>