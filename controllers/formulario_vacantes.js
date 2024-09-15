class Formulario_vacantes
{

    send_form(nombre_empresa, provincia, direccion, sexo, nacionalidad, posicion, nivel_estudio, requisitos, beneficios, correo, telefono, fecha, categoria, comentarios, callback)
    {
        let request = new XMLHttpRequest()
        request.open('POST', '../models/app.php', true)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.onreadystatechange = function () {

            if (request.readyState == 4 && request.status == 200) {

                callback(request.responseText)
            }
        }

        request.send(`nombre_empresa=${nombre_empresa}&provincia=${provincia}&direccion=${direccion}&sexo=${sexo}&nacionalidad=${nacionalidad}&posicion=${posicion}&nivel_estudio=${nivel_estudio}&requisitos=${requisitos}&beneficios=${beneficios}&mail=${correo}&password=${telefono}&fecha=${fecha}&categoria=${categoria}&comentarios=${comentarios}&action=send_form`)
    }

}

export default Formulario_vacantes