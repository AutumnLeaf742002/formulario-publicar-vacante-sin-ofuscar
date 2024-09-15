<?php



    class Compartir

    {



        function set_compartida($oCon, $id)

        {

            $sql = "CALL sp_change_status_vacante($id, 3)";

            $res = command($oCon, $sql);

            return $res;

        }

        function get_vacante_by_id_for_share($oCon, $id)

        {

            $sql = "CALL sp_get_vacante_by_id($id)";

            $res = select($oCon, $sql);

            $html = "";

            if(is_array($res))
            {
                if(count($res) == 1)
                {
                    $url = 'https://www.miempleord.com/'.$res[0]["Fecha_publicacion"].'/Empresa-'.$res[0]["Nombre_empresa"].'-solicita-'.$res[0]["Posicion_requerida"].'-'.$res[0]["Provincia"].'.html';

                    $url = str_replace(' ', '-', $url);

                    $html .= '
Empresa: '.$res[0]["Nombre_empresa"].', solicita '.$res[0]["Posicion_requerida"].' - '.$res[0]["Provincia"].'.
Link vacante  || '.$url.'
                    
                    ';
                }
                else
                {
                    $html = "Aqui falla";
                }
            }
            else
            {
                $html = "No es array";
            }

            return $html;

        }

    }



?>