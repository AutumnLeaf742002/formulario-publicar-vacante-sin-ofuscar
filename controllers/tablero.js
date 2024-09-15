class Tablero

{



    get_news_vacantes(callback)

    {

        let request = new XMLHttpRequest()

        request.open('POST', '../models/app.php', true)

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        request.onreadystatechange = function () {



            if (request.readyState == 4 && request.status == 200) {



                callback(request.responseText)

            }

        }



        request.send(`action=get_news_vacantes`)

    }



    get_published_vacantes(arq, callback)

    {

        let request = new XMLHttpRequest()

        request.open('POST', '../models/app.php', true)

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        request.onreadystatechange = function () {



            if (request.readyState == 4 && request.status == 200) {



                callback(request.responseText)

            }

        }



        request.send(`arq=${arq}&action=get_published_vacantes`)

    }



}



export default Tablero