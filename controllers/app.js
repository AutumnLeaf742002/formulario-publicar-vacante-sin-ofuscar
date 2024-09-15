// imports

import Sesion from './sesion.js'

import Tablero from './tablero.js'

import Descripcion_vacante from './descripcion_vacante.js'

import Formulario_vacantes from './formulario_vacantes.js'

import Compartir from './compartir.js'

import { postToBlogger } from './publish.js'



// objects

const sesion = new Sesion()

const tablero = new Tablero()

const descripcion_vacante = new Descripcion_vacante()

const formulario_vacantes = new Formulario_vacantes()

const compartir_js = new Compartir()



// ejecucion por modulos



let turn = true

var url = window.location.href

var filename = url.substring(url.lastIndexOf('/') + 1)



// si la sesion no esta iniciada te manda al login

function sesion_confirm()

{

    sesion.sesion_confirm((res)=>{



        if(res == "authorized")

        {

            if(filename == "login.html")

            {

                window.location.href = "tablero.html"

            }

        }

        else if(res == "denied")

        {

            if(filename == "tablero.html" || filename == "descripcion-vacante.php" || filename == "compartir.html")

            {

                window.location.href = "login.html"

            }

        }

    })

}

sesion_confirm()



// iniciar sesion

function set_sesion()

{

    if(filename == "login.html")

    {

        const btn = document.getElementById('btn_set_sesion')



        btn.addEventListener('click', e=>{

            set(e)
        })



        window.addEventListener('keyup', function(event) {



            if (event.key === 'Enter') {



                set(false)

            }

        });



        function set(e)

        {

            const mail = document.getElementById('mail').value

            const password = document.getElementById('password').value



            if(mail.length > 0 && password.length > 0 && mail.length < 26 && password.length < 26)

            {

                let textContent = ""

                if(e != false)
                {
                    textContent = e.target.textContent
                    loading_button_start(e)
                }
                else
                {
                    textContent = btn.textContent
                    btn.innerHTML = `
                    <svg class="loading-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                    </svg>
                    `
                }

                sesion.set_sesion(mail, password, (res)=>{



                    if(res == "Correct")

                    {

                        if(e != false)
                        {
                            loading_button_quit(e, textContent);
                        }
                        else
                        {
                            btn.innerHTML = textContent;
                        }

                        noti_success("Estas dentro, redireccionando...")

                        window.location.href = "tablero.html"

                    }

                    else

                    {

                        if(e != false)
                        {
                            loading_button_quit(e, textContent);
                        }
                        else
                        {
                            btn.innerHTML = textContent;
                        }

                        noti_error("Mail o clave incorrectos")

                    }

                })

            }

            else

            {

                noti_error("Debes llenar los campos correctamente")

            }

        }

    }

}

set_sesion()



// cerrar sesion

function close_sesion()

{

    if(filename == "tablero.html" || filename == "descripcion-vacante.php")

    {

        const btn_close_sesion = document.getElementById('btn_close_sesion')



        btn_close_sesion.addEventListener('click', (e)=>{



            loading_button_start(e)



            sesion.close_sesion((res)=>{



                if(res == "Correct")

                {

                    loading_button_quit(e)
                    window.location.href = "login.html"

                }

                else

                {

                    loading_button_quit(e)

                    noti_error(`Ha ocurrido un error, contacte con el desarrollador: ${res}`)

                }

            })

        })

    }

}

close_sesion()



// Obtener vacantes nuevas

const btn_vacantes_nuevas = document.getElementById('btn_vacantes_nuevas')

function get_news_vacantes()

{

    if(filename == "tablero.html")

    {

        btn_vacantes_nuevas.addEventListener('click', get_news_vacantes_now)



        function get_news_vacantes_now()

        {

            const ul_contain_vacantes = document.getElementById('ul_contain_vacantes')

            ul_contain_vacantes.innerHTML = `<h1 style="text-align: center; width: 100%;">Cargando...</h1>`



            tablero.get_news_vacantes((res)=>{



                ul_contain_vacantes.innerHTML = res

                btn_vacantes_nuevas.style.transform = "scale(1.2)"

                btn_vacantes_publicadas.style.transform = "scale(1)"



                show_vacante()

            })

        }



        get_news_vacantes_now()

    }

}

get_news_vacantes()



// Obtener vacantes publicadas

const btn_vacantes_publicadas = document.getElementById('btn_vacantes_publicadas')

function get_published_vacantes()

{

    if(filename == "tablero.html")

    {

        btn_vacantes_publicadas.addEventListener('click', get_published_vacantes_now)



        function get_published_vacantes_now()

        {

            const ul_contain_vacantes = document.getElementById('ul_contain_vacantes')

            ul_contain_vacantes.innerHTML = `<h1 style="text-align: center; width: 100%;">Cargando...</h1>`



            tablero.get_published_vacantes("false", (res)=>{



                ul_contain_vacantes.innerHTML = res

                btn_vacantes_publicadas.style.transform = "scale(1.2)"

                btn_vacantes_nuevas.style.transform = "scale(1)"



                show_vacante()

            })

        }

    }

}

get_published_vacantes()



// redirige para ver la vacante seleccionada

function show_vacante()

{

    let array_view_button = document.querySelectorAll('.view-button')



    array_view_button.forEach((item)=>{



        item.addEventListener('click', (btn)=>{


            const textContent = btn.target.textContent
            loading_button_start(btn)



            const vacante_id = btn.target.getAttribute('data-vacante-id')

            

            sesion.set_vacante_id(vacante_id, (res)=>{



                if(res == "Correct")

                {

                    loading_button_quit(btn, textContent)
                    window.location.href = "descripcion-vacante.php"

                }

                else

                {

                    loading_button_quit(btn, textContent)

                    alert(res)

                }

            })

        })

    })

}





// funcion para copiar al portapapeles el html para poner en blogger

function copiarContenido()

{

    if(filename == "descripcion-vacante.php")

    {

        const btn = document.getElementById('btn_copiar_codigo')



        btn.addEventListener('click', (e)=>{

            const textContent = e.target.textContent
            loading_button_start(e)

            const contenido = get_contenido_copiar()



            navigator.clipboard.writeText(contenido)

            .then(function() {

            noti_success("contenido copiado")
            loading_button_quit(e, textContent)

            })

            .catch(function(error) {

                noti_error("Error al copiar el contenido: ", error);
                loading_button_quit(e, textContent)
            });



        })



    }

}

copiarContenido()

function get_contenido_copiar()

{



    const data = get_datos()



    const contenido = `



    <!--Empresa: ${data.nombreEmpresa}, solicita ${data.posicionRequerida} - ${data.provincia}.-->

    <!--Empresa-${data.nombreEmpresa.replace(/\s/g, "-")}-solicita-${data.posicionRequerida.replace(/\s/g, "-")}-${data.provincia.replace(/\s/g, "-")}-->

    <h2 style="text-align: -webkit-center;">

    <div class="separator" style="clear: both;">

        <div style="font-size: medium; font-weight: 400; text-align: left;">

            <div align="center" class="MsoNormal"

                style="line-height: normal; mso-margin-bottom-alt: auto; mso-margin-top-alt: auto; mso-outline-level: 2; text-align: center;">

                <div align="center" class="MsoNormal" style="line-height: normal;">

                    <div class="separator" style="clear: both;"><span

                            style="font-family: arial; margin-left: 1em; margin-right: 1em;">

                            <div class="separator" style="clear: both;"><a

                                    href="https://1.bp.blogspot.com/--02kItvc6rE/YPdizEV04TI/AAAAAAABCdY/VG8jytjbQOgKyBry2oshqJAAWe88LdjwwCPcBGAYYCw/s1472/vacante-disponible.jpg"

                                    style="margin-left: 1em; margin-right: 1em;"><img border="0"

                                        data-original-height="1461" data-original-width="1472" height="279"

                                        src="https://1.bp.blogspot.com/--02kItvc6rE/YPdizEV04TI/AAAAAAABCdY/VG8jytjbQOgKyBry2oshqJAAWe88LdjwwCPcBGAYYCw/w281-h279/vacante-disponible.jpg"

                                        width="281" /></a></div>

                        </span></div>

                </div>

            </div>

        </div>

    </div>

</h2>

<h2 style="text-align: -webkit-center;"><b><span lang="" style="font-family: arial; font-size: 18pt;">Vacante

            Disponible</span></b></h2>

<h2 style="text-align: -webkit-center;">

    <div class="separator" style="clear: both;">

        <div style="font-size: medium; font-weight: 400; text-align: left;">

            <div align="center" class="MsoNormal"

                style="line-height: normal; mso-margin-bottom-alt: auto; mso-margin-top-alt: auto; mso-outline-level: 2; text-align: center;">

            </div>

        </div>

        <div style="font-size: medium; font-weight: 400; text-align: left;"></div>

        <div style="font-size: medium; font-weight: 400; text-align: left;">

            <table border="0" cellpadding="5" cellspacing="0" id="m_1796505601468005748emailFieldsTable"

                style="color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: small; width: 100%;">

                <tbody id="m_1796505601468005748emailFieldsTableBody">

                    <tr id="m_1796505601468005748row_16">

                        <td bgcolor="white" id="m_1796505601468005748question_16" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Nombre de la Empresa</td>

                        <td bgcolor="white" id="m_1796505601468005748value_16" style="margin: 0px; padding: 5px;">

                            ${data.nombreEmpresa}</td>

                    </tr>

                    <tr id="m_1796505601468005748row_18">

                        <td bgcolor="#f3f3f3" id="m_1796505601468005748question_18" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Provincia / Sector</td>

                        <td bgcolor="#f3f3f3" id="m_1796505601468005748value_18" style="margin: 0px; padding: 5px;">

                            ${data.provincia}</td>

                    </tr>

                    <tr id="m_1796505601468005748row_35">

                        <td bgcolor="white" id="m_1796505601468005748question_35" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Dirección / Ubicación</td>

                        <td bgcolor="white" id="m_1796505601468005748value_35" style="margin: 0px; padding: 5px;">

                            ${data.direccion}</td>

                    </tr>

                    <tr id="m_1796505601468005748row_17">

                        <td bgcolor="#f3f3f3" id="m_1796505601468005748question_17" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Sexo</td>

                        <td bgcolor="#f3f3f3" id="m_1796505601468005748value_17" style="margin: 0px; padding: 5px;">

                            ${data.sexo}</td>

                    </tr>

                    <tr id="m_1796505601468005748row_20">

                        <td bgcolor="white" id="m_1796505601468005748question_20" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Nacionalidad</td>

                        <td bgcolor="white" id="m_1796505601468005748value_20" style="margin: 0px; padding: 5px;">

                            ${data.nacionalidad}</td>

                    </tr>

                    <tr id="m_1796505601468005748row_21">

                        <td bgcolor="#f3f3f3" id="m_1796505601468005748question_21" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Posición requerida</td>

                        <td bgcolor="#f3f3f3" id="m_1796505601468005748value_21" style="margin: 0px; padding: 5px;">

                            ${data.posicionRequerida}</td>

                    </tr>

                    <tr id="m_1796505601468005748row_22">

                        <td bgcolor="white" id="m_1796505601468005748question_22" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Nivel de Estudio</td>

                        <td bgcolor="white" id="m_1796505601468005748value_22" style="margin: 0px; padding: 5px;">

                            ${data.nivelEstudio}</td>

                    </tr>

                    <tr id="m_1796505601468005748row_32">

                        <td bgcolor="white" id="m_1796505601468005748question_32" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Requisitos</td>

                        <td bgcolor="white" id="m_1796505601468005748value_32" style="margin: 0px; padding: 5px;">

                            ${data.requisitos}</td>

                    </tr>

                    <tr id="m_1796505601468005748row_33">

                        <td bgcolor="#f3f3f3" id="m_1796505601468005748question_33" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Beneficios</td>

                        <td bgcolor="#f3f3f3" id="m_1796505601468005748value_33" style="margin: 0px; padding: 5px;">

                            ${data.beneficios}</td>

                    </tr>

                    <tr id="m_1796505601468005748row_25">

                        <td bgcolor="white" id="m_1796505601468005748question_25" style="margin: 0px; padding: 5px;"

                            valign="top" width="170"><br /></td>

                        <td bgcolor="white" id="m_1796505601468005748value_25" style="margin: 0px; padding: 5px;"></td>

                    </tr>

                </tbody>

            </table>

            <table border="0" cellpadding="5" cellspacing="0" id="m_1796505601468005748emailFieldsTable"

                style="color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: small; width: 669px;">

                <tbody id="m_1796505601468005748emailFieldsTableBody">

                    <tr id="m_1796505601468005748row_21">

                        <td bgcolor="#f3f3f3" id="m_1796505601468005748question_21" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Categoría</td>

                        <td bgcolor="#f3f3f3" id="m_1796505601468005748value_21" style="margin: 0px; padding: 5px;">

                            ${data.categoria}</td>

                    </tr>

                    <tr id="m_1796505601468005748row_22">

                        <td bgcolor="white" id="m_1796505601468005748question_22" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Número de teléfono</td>

                        <td bgcolor="white" id="m_1796505601468005748value_22" style="margin: 0px; padding: 5px;">

                            ${data.numeroTelefono}</td>

                    </tr>

                    <tr id="m_1796505601468005748row_32">

                        <td bgcolor="white" id="m_1796505601468005748question_32" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Fecha límite para Aplicar</td>

                        <td bgcolor="white" id="m_1796505601468005748value_32" style="margin: 0px; padding: 5px;">

                            ${data.fechaLimite}</td>

                    </tr>

                    <tr id="m_1796505601468005748row_33">

                        <td bgcolor="#f3f3f3" id="m_1796505601468005748question_33" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Comentarios adicionales</td>

                        <td bgcolor="#f3f3f3" id="m_1796505601468005748value_33" style="margin: 0px; padding: 5px;">

                            ${data.comentarioAdicional}</td>

                    </tr>

                </tbody>

            </table>

        </div>

        <!--anuncio  de google-->

            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8274336709196323"
                crossorigin="anonymous"></script>
            <ins class="adsbygoogle"
                style="display:block"
                data-ad-format="autorelaxed"
                data-ad-client="ca-pub-8274336709196323"
                data-ad-slot="1540389018"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>

        <!--anuncio de google-->

        <div style="text-align: left;"><span

                style="color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: small; font-weight: 400;"><span><br /></span></span>

        </div>

        <div style="font-size: medium; font-weight: 400; text-align: left;"><span

                style="font-family: arial;"><br /></span></div>

        <div style="font-size: medium; font-weight: 400; text-align: left;">

            <table border="0" cellpadding="5" cellspacing="0" id="m_1796505601468005748emailFieldsTable"

                style="color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: small; width: 100%;">

                <tbody id="m_1796505601468005748emailFieldsTableBody">

                    <tr id="m_1796505601468005748row_25">

                        <td bgcolor="white" id="m_1796505601468005748question_25" style="margin: 0px; padding: 5px;"

                            valign="top" width="170">Correo electrónico</td>

                        <td bgcolor="white" id="m_1796505601468005748value_25" style="margin: 0px; padding: 5px;">

                        <a href="mailto:${data.correoElectronicoAplicante}">${data.correoElectronicoAplicante}</a>
                        
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

        <div style="font-size: medium; font-weight: 400; text-align: left;">

            <font face="arial"></font>

        </div>

        <div style="font-size: medium; font-weight: 400; text-align: left;">

            <table border="0" cellpadding="5" cellspacing="0" id="m_1796505601468005748emailFieldsTable"

                style="color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: small; width: 100%;">

                <tbody id="m_1796505601468005748emailFieldsTableBody">

                    <tr id="m_1796505601468005748row_25">

                        <td bgcolor="white" id="m_1796505601468005748question_25" style="margin: 0px; padding: 5px;"

                            valign="top" width="170"><br /></td>

                        <td bgcolor="white" id="m_1796505601468005748value_25" style="margin: 0px; padding: 5px;"></td>

                    </tr>

                </tbody>

            </table>

        </div>

        <div style="font-size: medium; font-weight: 400; text-align: left;"><span style="font-family: arial;"><span

                    face="" style="color: blue; font-weight: 700;">*Para aplicar a estas Vacantes Disponibles

                    debe&nbsp;enviar su Curriculum Vitae a los correos electrónico (poner en el Asunto del correo la

                    Vacante que desea Aplicar) o&nbsp;contactarse a los números telefónicos indicados en cada una de las

                    Vacantes Disponibles si los tienen. Si es presencial, debe dirigirse a la dirección colocada en el

                    post. Gracias!*</span></span>

            <div style="text-align: center;"><span style="font-family: arial;"><b><br /></b><br /></span>

                <div style="text-align: left;"><span style="font-family: arial;"><span face=""

                            style="color: red;"><b>Síguenos en:</b></span><br /><span face=""><br /></span><span

                            face="">⭐<b>Página de FB:</b>&nbsp;<a

                                href="https://www.facebook.com/MiEmpleoRD/?ref=bookmarks">https://www.facebook.com/MiEmpleoRD/?ref=bookmarks</a></span><br /><span

                            face=""><br /></span><span face="">⭐<b>Grupo de FB:</b>&nbsp;<a

                                href="https://www.facebook.com/groups/303729433390221/?source_id=292141951239286">https://www.facebook.com/groups/303729433390221/?source_id=292141951239286</a></span><br /><span

                            face=""><br /></span><span face="">⭐<b>Grupo de Telegram:&nbsp;</b></span><span face=""><a

                                href="http://t.me/MiempleoRD">t.me/MiempleoRD</a></span><br /><span

                            face=""><br /></span><span face="">⭐<b>Cuenta de Instagram:</b>&nbsp;<a

                                href="https://www.instagram.com/infomiempleord/">https://www.instagram.com/infomiempleord/</a></span><br /><span

                            face=""><br /></span><span face="">⭐<b>Cuenta de LinkedIn:</b>&nbsp;<a

                                href="https://www.linkedin.com/in/mi-empleo-rd-234b30166/">https://www.linkedin.com/in/mi-empleo-rd-234b30166/</a></span><br /><span

                            face=""><br /></span><span face="">⭐<b>Canal de YouTube:</b>&nbsp;<a

                                href="https://www.youtube.com/channel/UCbUW992UTMu_VpXEWoWAslw">https://www.youtube.com/channel/UCbUW992UTMu_VpXEWoWAslw</a></span><br /><br /><span

                            face=""><b>Gracias.</b></span></span></div>

            </div>

        </div>

    </div>

</h2>





    `



    return contenido

}

function get_datos()

{

    const data = {

        nombreEmpresa: document.getElementById('nombre_empresa').innerText,

        provincia: document.getElementById('provincia').innerText,

        direccion: document.getElementById('direccion').innerText,

        sexo: document.getElementById('sexo').innerText,

        nacionalidad: document.getElementById('nacionalidad').innerText,

        posicionRequerida: document.getElementById('posicion_requerida').innerText,

        nivelEstudio: document.getElementById('nivel_estudio').innerText,

        requisitos: document.getElementById('requisitos').innerText,

        beneficios: document.getElementById('beneficios').innerText,

        correoElectronicoAplicante: document.getElementById('correo_electronico_aplicante').innerText,

        numeroTelefono: document.getElementById('numero_telefono').innerText,

        fechaLimite: document.getElementById('fecha_limite').innerText,

        categoria: document.getElementById('categoria').innerText,

        comentarioAdicional: document.getElementById('comentario_adicional').innerText,

    };



    return data

}



// cambia el estado al presionar el boton

function change_status()

{

    if(filename == "descripcion-vacante.php")

    {

        const btn = document.getElementById('btn_cambiar_estado')

        const id_vacante = btn.getAttribute('data-vacante-id')



        btn.addEventListener('click', (e)=>{


            const textContent = e.target.textContent


            if(btn.textContent.trim() == "Publicar")

            {

                loading_button_start(e)

                descripcion_vacante.change_status(id_vacante, (res)=>{



                    if(res == "Correct")

                    {

                        loading_button_quit(e, textContent);

                        btn.textContent = "Vacante publicada"

                        noti_success("Marcado como publicado")

                        const { categoria, nombreEmpresa,  posicionRequerida, provincia} = get_datos()
                        const title = `Empresa ${nombreEmpresa}, solicita ${posicionRequerida} - ${provincia}`
                        const content = get_contenido_copiar()

                        postToBlogger(title, categoria, content)

                        setTimeout(()=>{

                            window.location.href = "tablero.html"
                        }, 4000)

                    }

                    else

                    {

                        loading_button_quit(e, textContent)
                        noti_error(res)

                    }

                })

            }

            else

            {

                loading_button_quit(e, textContent)

                noti_warning("Vacante ya esta publicada")

            }

        })

    }

}

change_status()



// funcion para enviar los datos del formulario a la base de datos

function send_form(e)

{

    if(filename == "formulario-vacantes.html")

    {



            const nombre_empresa_dom = document.getElementById('nombre_empresa');

            const provincia_dom = document.getElementById('provincia');

            const direccion_dom = document.getElementById('direccion');

            const sexo_dom = document.getElementById('sexo');

            const nacionalidad_dom = document.getElementById('nacionalidad');

            const posicion_dom = document.getElementById('posicion');

            const nivel_estudio_dom = document.getElementById('nivel_estudio');

            const requisitos_dom = document.getElementById('requisitos');

            const beneficios_dom = document.getElementById('beneficios');

            const correo_dom = document.getElementById('correo');

            const telefono_dom = document.getElementById('telefono');

            const fecha_dom = document.getElementById('fecha');

            const categoria_dom = document.getElementById('categoria');

            const comentarios_dom = document.getElementById('comentarios');



            const nombre_empresa = nombre_empresa_dom.value

            const provincia = provincia_dom.value

            const direccion = direccion_dom.value

            const sexo = sexo_dom.value

            const nacionalidad =  nacionalidad_dom.value

            const posicion = posicion_dom.value

            const nivel_estudio = nivel_estudio_dom.value

            const requisitos = requisitos_dom.value

            const beneficios = beneficios_dom.value

            const correo = correo_dom.value

            const telefono = telefono_dom.value

            const fecha = fecha_dom.value

            const categoria = categoria_dom.value

            const comentarios = comentarios_dom.value



            if(

                nombre_empresa.length >= 1 && nombre_empresa.length <= 100 &&

                provincia.length >= 1 && provincia.length <= 100 &&

                direccion.length >= 1 && direccion.length <= 100 &&

                sexo.length == 1 &&

                nacionalidad.length == 1 &&

                posicion.length >= 1 && posicion.length <= 100 &&

                nivel_estudio.length == 1 &&

                requisitos.length >= 1 && requisitos.length <= 4000 &&

                beneficios.length >= 1 && beneficios.length <= 4000 &&

                correo.length >= 1 && correo.length <= 50  &&

                telefono.length <= 30 &&

                fecha.length <= 10 &&

                categoria.length >= 1 && categoria.length <= 50 &&

                comentarios.length <= 4000

            )

            {



                if(turn == true)

                {

                    const textContent = e.target.textContent
                    loading_button_start(e)



                    formulario_vacantes.send_form(nombre_empresa, provincia, direccion, sexo, nacionalidad, posicion, nivel_estudio, requisitos, beneficios, correo, telefono, fecha, categoria, comentarios, (res)=>{



                        if(res == "Correct")

                        {

                            turn = false

                            loading_button_quit(e, textContent)

                            noti_success("Formulario enviado correctamente para verificacion y publicacion")



                            setTimeout(()=>{



                                window.location.reload()

                            }, 5000)

                        }

                        else

                        {
                            loading_button_quit(e, textContent)
                            noti_error(res)

                        }

                    })

                }

                else

                {

                    noti_error("Debes esperar 5 segundos para poder enviar otro formulario")

                }



            }

            else

            {
                set_input_required()
                noti_error("Debes llenar los campos obligatorios (*) correctamente y sin exceder el limite");
            }



    }

}



function form()

{

    if(filename == "formulario-vacantes.html")

    {

        const btn = document.getElementById('btn_publicar_vacante')

        btn.addEventListener('click', function(e){



            send_form(e)

        })  

    }

}

form()



// funcion para defenza en caso de que filename tenga ?

function defenza()

{

    if(filename == "formulario-vacantes.html?")

    {

        window.location.href = "formulario-vacantes.html"

    }

}

setInterval(defenza, 2000)





// la pantalla oscura no se quita gracias a este codigo

// Función para agregar el elemento si no existe

function agregarElemento() {

    var elementoExistente = document.getElementById("loading");

    if (!elementoExistente) {

        var elemento = document.createElement("div");

        elemento.id = "loading";



        var cuerpo = document.getElementsByTagName("body")[0];

        cuerpo.insertBefore(elemento, cuerpo.firstChild);

    }

}



// Llamar a la función para agregar el elemento al cargar la página

agregarElemento();



// Observador de mutaciones para detectar cambios en el DOM

var observer = new MutationObserver(function (mutationsList) {

    for (var mutation of mutationsList) {

        if (mutation.type === "childList") {

            var removedNodes = mutation.removedNodes;

            for (var i = 0; i < removedNodes.length; i++) {

                if (removedNodes[i].id === "loading") {

                    agregarElemento();

                    break;

                }

            }

        }

    }

});



// Configuración del observador para detectar cambios en el cuerpo del documento

var cuerpo = document.getElementsByTagName("body")[0];

var config = { childList: true };

observer.observe(cuerpo, config);





// funciones para aparecer o desaparecer la pantalla negra de carga

function show_loading()

{

    try

    {

        const loading = document.getElementById('loading')

        loading.style.display = "block"

    }

    catch(error)

    {

        console.log("loading no encontrado")

    }

}



function quit_loading()

{

    try

    {

        const loading = document.getElementById('loading')

        loading.style.display = "none"

    }

    catch(error)

    {

        console.log("loading no encontrado")

    }

}



// funcion para la notificacion

function noti_success(msg) 
{

    toastr.success(msg);

}

function noti_error(msg)

{

    toastr.error(msg);

}

function noti_warning(msg)

{

    toastr.warning(msg);

}



// funcion para aparecer ventana emergente

function show_window_delete()

{

    window_delete.style.display = "block"

}



function hidde_window_delete()

{

    window_delete.style.display = "none"

}



if(filename == "descripcion-vacante.php")

{

    const window_delete = document.getElementById('window_delete')

    const btn_cancel = document.getElementById('btn_cancel')



    const btn_eliminar_vacante = document.getElementById('btn_eliminar_vacante')

    btn_eliminar_vacante.addEventListener('click', ()=>{



        show_window_delete()

        show_loading()

    })



    btn_cancel.addEventListener('click', ()=>{



        quit_loading()

        hidde_window_delete()

    })

}



// funcion eliminar vacante

function delete_vacante()

{

    if(filename == "descripcion-vacante.php")

    {

        const btn_delete_confirm = document.getElementById('btn_delete_confirm')

        const id = btn_delete_confirm.getAttribute("data-vacante-id") ?? 0

        btn_delete_confirm.addEventListener('click', (e)=>{

            const textContent = e.target.textContent
            loading_button_start(e)

            descripcion_vacante.delete_vacante(id, (res)=>{

                if(res == "Correct")

                {

                    noti_success("Vacante eliminada, redireccionando...")

                    loading_button_quit(e, textContent)

                    setTimeout(()=>{



                        window.location.href = "tablero.html"

                    }, 2000)

                }

                else

                {

                    loading_button_quit(e, textContent)
                    noti_error(`Ha ocurrido un error ${res}`)

                }

            })

        })

    }

}

delete_vacante()



// funcion de direccionar home con logo

if(filename == "tablero.html" || filename == "descripcion-vacante.php")

{

    const logo = document.getElementById('logo')

    logo.addEventListener('click', ()=>{



        window.location.href = "tablero.html"

    })

}

// funcion para ir a la pagina para compartir enlaces

function compartir()

{

    if(filename == "tablero.html" || filename == "descripcion-vacante.php")

    {

        const btn = document.getElementById('btn_compartir_enlaces')

        btn.addEventListener('click', (e)=>{


            loading_button_start(e)
            window.location.href = "compartir.html"

        })

    }

}

compartir()

//funcion para bloquear ip 

function block_ip()

{

    if(filename == "descripcion-vacante.php")

    {

        const btn_bloquear_ip = document.getElementById('btn_bloquear_ip')

        const id = btn_bloquear_ip.getAttribute("data-vacante-ip") ?? 0

        btn_bloquear_ip.addEventListener('click', (e)=>{

            const textContent = e.target.textContent
            loading_button_start(e)

            descripcion_vacante.block_ip(id, (res)=>{




                if(res == "Correct")

                {

                    loading_button_quit(e, textContent)
                    noti_success("IP bloqueada con exito." + res)
                }

                else if(res.includes("for key 'Ip'"))
                {
                    loading_button_quit(e, textContent)
                    noti_warning("Esta IP ya esta bloqueada")
                }

                else

                {

                    loading_button_quit(e, textContent)
                    noti_error(`Ha ocurrido un error ${res}`)

                }

            })

        })

    }
        
}
block_ip()

// funcion volver a la pagina tablero desde descripcion vacante

function volver()
{
    if(filename == "descripcion-vacante.php")
    {
        const arrow_volver = document.getElementById('arrow_volver')
        arrow_volver.addEventListener('click', ()=>{

            window.location.href = "tablero.html"
        })
    }
}
volver()

function set_input_required()
{
    if(filename == "formulario-vacantes.html")
    {

        const array_set_input_required = document.querySelectorAll('.input-required')
    
        array_set_input_required.forEach(item => {

            const total = item.value.length
            

            if(total == 0)
            {
                item.style.border = '2px solid red'

                item.addEventListener('click', (e) => {

                    e.target.style.border = 'none'
                    e.target.style.borderBottom = '2px solid rgb(207, 207, 207)'

                })
            }
        })

    }
}

// funciones para marcar botones cargando
function loading_button_start(e) 
{

    const html = `
                <svg class="loading-svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>    
                `

    e.target.innerHTML = html

}

function loading_button_quit(button, textContent)
{
    try
    {
        button.target.textContent = textContent
    }
    catch(e) 
    {
        console.log(e)
    }
}

// funcion para obtener vacantes para compartir
function get_published_vacantes_for_share()

{

    if(filename == "compartir.html")
    {

        const ul_contain_vacantes = document.getElementById("ul_contain_vacantes")

        tablero.get_published_vacantes("true", (res)=>{

            ul_contain_vacantes.innerHTML = res
        })
    }

}

get_published_vacantes_for_share()

// funcion para marcar como compartidas las vacantes de compartir.html

function marcar_compartidas() 
{
    if(filename == "compartir.html")
    {

        const btn_set_compartida = document.getElementById("btn_set_compartida")
        btn_set_compartida.addEventListener("click", (e) =>{

            const textContent = e.target.textContent

            const array_chek = document.querySelectorAll('.check')

            array_chek.forEach(item => {

                if(item.checked)
                {
                    loading_button_start(e)

                    const id = item.getAttribute('data-vacante-id') ?? 0

                    compartir_js.set_compartida(id, (res)=>{

                        if(res == "Correct")
                        {
                            noti_success(`Vacante ID(${id}) marcada como compartida`)
                            item.parentNode.parentNode.remove()
                            loading_button_quit(e, textContent)
                        }
                        else
                        {
                            noti_error(`Error en vacante ID(${id}): ${res}`)
                            loading_button_quit(e, textContent)
                        }
                    })
                }
            })
        })
    }
}
marcar_compartidas()

// funcion para url de compartir en whatsapp

let textWhatsApp = ""
function share_whatsapp()
{
    if(filename == "compartir.html")
    {
        const share_btn = document.getElementById("share_btn")
        const textAreaCode = document.getElementById('textAreaCode')
        share_btn.addEventListener("click", (e)=>{

            loading_button_start(e)

            textWhatsApp = ""

            let pass = 0

            const array_chek = document.querySelectorAll('.check')

                array_chek.forEach(item => {

                    if (item.checked) {

                        const id = item.getAttribute("data-vacante-id")
                        compartir_js.get_vacante_by_id_for_share(id, (res)=>{

                            textWhatsApp += res
                            pass += 1
                        })
                    }
                })

                const array_checked = document.querySelectorAll('input.check[type="checkbox"]:checked')

                let interval = setInterval(()=>{

                    if(pass == array_checked.length)
                    {
                        pass = 0

                        textWhatsApp = textWhatsApp.trim()
                        showCopy()
                        textAreaCode.textContent = textWhatsApp
                        loading_button_quit(e, "Compartir en Whatsapp")
                        clearInterval(interval)
                    }

                }, 1000)
        })
    }
}
share_whatsapp()

// agregar evento al svg para copiar
const svgCopyText = document.getElementById('svgCopyText')
svgCopyText.addEventListener("click", () => {

    copyToClipBoard(textWhatsApp)
})

// funcion para copiar el contenido al porta papeles
function copyToClipBoard(textWhatsApp) 
{
    if(textWhatsApp.length > 0)
    {
        navigator.clipboard.writeText(textWhatsApp)
        .then(noti_success("Texto copiado al portapapeles"))
        .catch(function(){
            noti_error("Error al copiar al portapapeles")
        })
    }
    else
    {
        noti_error("Longitud del texto a copiar es menor a 1")
    }
}

// funcion para aparecer el cuadro de copiar codigo

function showCopy()
{
    const copyCode = document.getElementById('copyCode')
    copyCode.style.display = "block"
    const cAll = document.getElementById('cAll')
    cAll.style.filter = "brightness(50%)"
}
function hiddeCopy()
{
    const copyCode = document.getElementById('copyCode')

    const svgExitCopy = document.getElementById('svgExitCopy')
    svgExitCopy.addEventListener('click', () =>{

        copyCode.style.display = "none"
        textWhatsApp = ""
        const cAll = document.getElementById('cAll')
        cAll.style.filter = "brightness(100%)"
    })
}
hiddeCopy()

// seleccionar todo para compartir en whatsapp

function select_all_checkbox()
{
    if(filename == "compartir.html")
    {
        const id_checkbox = document.getElementById("id_checkbox")

        id_checkbox.addEventListener("change", (e)=>{

            if(id_checkbox.checked)
            {
                var checkboxes = document.querySelectorAll('input[type="checkbox"]');
                
                for (var i = 0; i < checkboxes.length; i++) {
                    checkboxes[i].checked = true;
                }
            }
            else
            {
                var checkboxes = document.querySelectorAll('input[type="checkbox"]');
                
                for (var i = 0; i < checkboxes.length; i++) {
                    checkboxes[i].checked = false
                }
            }
        })

    }
}
select_all_checkbox()