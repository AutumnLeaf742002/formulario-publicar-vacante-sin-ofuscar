<?php

  session_start();

  $vacante_id = $_SESSION["vacante_id"] ?? 0;

  $_SESSION["vacante_id"] = "0";



  if($vacante_id < 1)

  {

    header("location: tablero.html");

  }

  else

  {



    include_once "../models/connection.php";

    include_once "../models/commands.php";

    $oCon = connect();

    $sql = "CALL sp_get_vacante_by_id($vacante_id)";



    $id = "0";

    $nombre_empresa = "Cargando...";

    $provincia = "Cargando...";

    $direccion = "Cargando...";

    $sexo = "Cargando...";

    $nacionalidad = "Cargando...";

    $posicion_requerida = "Cargando...";

    $nivel_estudio = "Cargando...";

    $requisitos = "Cargando...";

    $beneficios = "Cargando...";

    $correo_electronico_aplicante = "Cargando...";

    $numero_telefonico = "Cargando...";

    $fecha_limite = "Cargando...";

    $categoria = "Cargando...";

    $comentarios_adicionales = "Cargando...";

    $estado_string = "Estado desconocido o cargando...";



    $res = select($oCon, $sql);



    if(is_array($res))

    {

      if(count($res) == 1)

      {



        $id = $res[0]["Id"];

        $nombre_empresa = $res[0]["Nombre_empresa"];

        $provincia = $res[0]["Provincia"];

        $direccion = $res[0]["Direccion"];

        $sexo = $res[0]["sexo"];

        $nacionalidad = $res[0]["nacionalidad"];

        $posicion_requerida = $res[0]["Posicion_requerida"];

        $nivel_estudio = $res[0]["nivel_estudio"];

        $requisitos = $res[0]["Requisitos"];

        $beneficios = $res[0]["Beneficios"];

        $correo_electronico_aplicante = $res[0]["Correo_electronico_aplicante"];

        $numero_telefonico = $res[0]["Numero_telefono"];

        $fecha_limite = $res[0]["Fecha_limite"];

        $categoria = $res[0]["Categoria"];

        $comentarios_adicionales = $res[0]["Comentario_adicional"];

        $estado = $res[0]["Estado"];



        if($estado == 1)

        {

          $estado_string = "Publicar";

        }

        else if($estado == 2)

        {

          $estado_string = "Vacante publicada";

        }

        else if($estado == 3)
        {
          $estado_string = "Vacante compartida";
        }

      }

    }

  }



?>



<!DOCTYPE html>

<html lang="es">

  

  <head>

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <meta charset="UTF-8">

    <meta property="og:image" content="https://1.bp.blogspot.com/--02kItvc6rE/YPdizEV04TI/AAAAAAABCdY/VG8jytjbQOgKyBry2oshqJAAWe88LdjwwCPcBGAYYCw/s1472/vacante-disponible.jpg">

    <title>Dashboard-Vacante Disponible</title>

    <link rel="stylesheet" href="../styles/config.css">

    <link rel="stylesheet" type="text/css" href="../styles/descripcion-vacante.css">

    <link rel="shortcut icon" href="../img/logo-nuevo-para-redes-sociales.png" type="image/x-icon">

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">

  </head>

  <body>

    

    <header>

      <div class="logo-container">

        <img id="logo" src="../img/logo-nuevo-mi-empleo-rd-borde-blanco.png" alt="Logo de la página">

      </div>

      <div class="logout-container">

        <button id="btn_compartir_enlaces" class="logout-button btn-loading">Compartir enlaces</button>

        <button id="btn_close_sesion" class="logout-button btn-loading">Cerrar sesión</button>

      </div>

    </header>

  <div class="c-arrow-volver">
    <svg id="arrow_volver" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left arrow-volver" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
  </div>

  <div class="imagen">

    <img  src="../img/vacante-disponible.jpg" alt="imagen logo mi empleo rd">

  </div>



  <div class="view-form">



    <h1>Formulario de Empleo</h1>

    <table>

      <tr>

        <th>Nombre de la Empresa</th>

        <td id="nombre_empresa"><?php echo $nombre_empresa; ?></td>

      </tr>

      <tr>

        <th>Provincia / Sector</th>

        <td id="provincia"><?php echo $provincia; ?></td>

      </tr>

      <tr>

        <th>Dirección / Ubicación</th>

        <td id="direccion"><?php echo $direccion; ?></td>

      </tr>

      <tr>

        <th>Sexo</th>

        <td id="sexo"><?php echo $sexo; ?></td>

      </tr>

      <tr>

        <th>Nacionalidad</th>

        <td id="nacionalidad"><?php echo $nacionalidad; ?></td>

      </tr>

      <tr>

        <th>Posicion requerida</th>

        <td id="posicion_requerida"><?php echo $posicion_requerida; ?></td>

      </tr>

      <tr>

        <th>Nivel de Estudio</th>

        <td id="nivel_estudio"><?php echo $nivel_estudio; ?></td>

      </tr>

      <tr>

        <th>Requisitos</th>

        <td id="requisitos"><?php echo $requisitos; ?></td>

      </tr>

      <tr>

        <th>Beneficios</th>

        <td id="beneficios"><?php echo $beneficios; ?></td>

      </tr>

      <tr>

        <th>Correo Electrónico para el aplicante</th>

        <td id="correo_electronico_aplicante"><?php echo $correo_electronico_aplicante; ?></td>

      </tr>

      <tr>

        <th>Número telefónico</th>

        <td id="numero_telefono"><?php echo $numero_telefonico; ?></td>

      </tr>

      <tr>

        <th>Fecha límite para aplicar</th>

        <td id="fecha_limite"><?php echo $fecha_limite; ?></td>

      </tr>

      <tr>

        <th>Categoria</th>

        <td id="categoria"><?php echo $categoria; ?></td>

      </tr>

      <tr>

        <th>Comentarios adicionales</th>

        <td id="comentario_adicional"><?php echo $comentarios_adicionales; ?></td>

      </tr>

    </table>



</div>



  <div class="buttons">



    <button style="display: none;" id="btn_copiar_codigo" class="btn btn-loading">Copiar Código</button>

    

    <button id="btn_cambiar_estado" data-vacante-id="<?php echo $id; ?>" class="btn btn-loading"><?php echo $estado_string; ?>

    </button>



    <button id="btn_eliminar_vacante" data-vacante-id="<?php echo $id; ?>" class="btn btn-delete btn-loading">

      Eliminar

    </button>

    <button id="btn_bloquear_ip" data-vacante-ip="<?php echo $id; ?>" class="btn btn-delete btn-loading">

      Bloquear Ip

    </button>

  </div>





<!-- Ventana emergente de confirmacion -->



<div class="c-window-delete" id="window_delete">



<div class="c-principal-messegge">

  <h1>

    ¿Deseas eliminar esta vacante?

  </h1>

</div>



<div class="c-secondary-messegge">

  <p>

    Si realizas esta acción se eliminará permanentemente

  </p>

</div>



<div class="c-btn">



  <button id="btn_cancel" class="btn">

    Cancelar

  </button>



  <button id="btn_delete_confirm" class="btn btn-delete btn-loading" data-vacante-id="<?php echo $id; ?>">

    Eliminar

  </button>



</div>



</div>



<!-- Ventana emergente de confirmacion -->





  <!--footer-->

  <footer>

    <div class="pie-de-pagina">

      <p>&copy; 2023 by Mi Empleo RD. Todos los derechos reservados.</p>

    </div>

  </footer>

  <!--footer-->

  <script type="module" src="../controllers/app.js"></script>



  <!-- jQuery -->

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

  <!-- Toastr JS -->

  <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>



  </body>

</html>