class Sesion
{

    set_sesion(mail, password, callback)
    {
        let request = new XMLHttpRequest()
        request.open('POST', '../models/app.php', true)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.onreadystatechange = function () {

            if (request.readyState == 4 && request.status == 200) {

                callback(request.responseText)
            }
        }

        request.send(`mail=${mail}&password=${password}&action=set_sesion`)
    }

    close_sesion(callback)
    {
        let request = new XMLHttpRequest()
        request.open('POST', '../models/app.php', true)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.onreadystatechange = function () {

            if (request.readyState == 4 && request.status == 200) {

                callback(request.responseText)
            }
        }

        request.send(`action=close_sesion`)
    }

    sesion_confirm(callback)
    {
        let request = new XMLHttpRequest()
        request.open('POST', '../models/app.php', true)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.onreadystatechange = function () {

            if (request.readyState == 4 && request.status == 200) {

                callback(request.responseText)
            }
        }

        request.send(`action=sesion_confirm`)
    }

    set_vacante_id(id, callback)
    {
        let request = new XMLHttpRequest()
        request.open('POST', '../models/app.php', true)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.onreadystatechange = function () {

            if (request.readyState == 4 && request.status == 200) {

                callback(request.responseText)
            }
        }

        request.send(`id=${id}&action=set_vacante_id`)
    }
}

export default Sesion