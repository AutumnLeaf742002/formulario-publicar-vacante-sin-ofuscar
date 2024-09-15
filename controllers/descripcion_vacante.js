class Descripcion_vacante

{

    change_status(id, callback)

    {

        let request = new XMLHttpRequest()

        request.open('POST', '../models/app.php', true)

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        request.onreadystatechange = function () {

            if (request.readyState == 4 && request.status == 200) {

                callback(request.responseText)

            }

        }



        request.send(`id=${id}&action=change_status`)

    }



    delete_vacante(id, callback)

    {

        let request = new XMLHttpRequest()

        request.open('POST', '../models/app.php', true)

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        request.onreadystatechange = function () {



            if (request.readyState == 4 && request.status == 200) {



                callback(request.responseText)

            }

        }



        request.send(`id=${id}&action=delete_vacante`)

    }
    
    block_ip(id, callback)

    {

        let request = new XMLHttpRequest()

        request.open('POST', '../models/app.php', true)

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        request.onreadystatechange = function () {



            if (request.readyState == 4 && request.status == 200) {



                callback(request.responseText)

            }

        }



        request.send(`id=${id}&action=block_ip`)

    }


}



export default Descripcion_vacante