<?php



    class Descripcion_vacante

    {



        function change_status($oCon, $id)

        {

            $fecha = get_date2();

            $sql = "CALL sp_change_status_vacante($id, 2); CALL sp_set_compartido($id, '$fecha');";

            $res = command($oCon, $sql);



            return $res;

        }



        function delete_vacante($oCon, $id)

        {

            $sql = "CALL sp_delete_vacante($id); CALL sp_reset_auto_increment;";

            $res = command($oCon, $sql);



            return $res;

        }

        function block_ip($oCon, $id)

        {

            $ip_vacante = "";    
            $sql_get_ip = "CALL sp_get_ip($id)";
            $res_get_ip = select($oCon, $sql_get_ip);

            if(is_array($res_get_ip))
            {
                if(count($res_get_ip) == 1 )
                {
                    $ip_vacante = $res_get_ip[0]["Ip"] ?? "default";
                }
            }

            $sql = "CALL sp_block_ip('$ip_vacante')";

            if($ip_vacante != "default")
            {
                $res = command($oCon, $sql);
                return $res;
            }
            else 
            {
                return "es default";
            }


            

        }

    }



?>