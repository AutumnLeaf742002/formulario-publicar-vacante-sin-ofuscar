class Compartir

{



    set_compartida(id, callback)

    {

        let request = new XMLHttpRequest()

        request.open('POST', '../models/app.php', true)

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        request.onreadystatechange = function () {



            if (request.readyState == 4 && request.status == 200) {



                callback(request.responseText)

            }

        }



        request.send(`id=${id}&action=set_compartida`)

    }

    get_vacante_by_id_for_share(id, callback)

    {

        let request = new XMLHttpRequest()

        request.open('POST', '../models/app.php', true)

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        request.onreadystatechange = function () {



            if (request.readyState == 4 && request.status == 200) {



                callback(request.responseText)

            }

        }



        request.send(`id=${id}&action=get_vacante_by_id_for_share`)

    }

}



export default Compartir