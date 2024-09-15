<?php

    function quitarSignosDePuntuacion($texto) {
        $signos = array('!', '/','@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', ',', '.', '?', '<', '>', ':', '"', '|', ';');

        $resultado = str_replace($signos, '', $texto);

        return $resultado;
    }

    function corregirEspacios($texto) {
        // Definimos la expresión regular para encontrar dos o más espacios seguidos
        $expresionRegular = '/\s{2,}/';
    
        // Usamos preg_replace() para reemplazar los espacios múltiples por un solo espacio
        $textoCorregido = preg_replace($expresionRegular, ' ', $texto);
    
        return $textoCorregido;
    }

?>