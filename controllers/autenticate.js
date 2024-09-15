// Inicializa el botón de One Tap y OAuth 2.0

let clientId = null

window.addEventListener("load", ()=>{

    let request = new XMLHttpRequest()
        request.open('POST', '../models/app.php', true)
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.onreadystatechange = function () {

            if (request.readyState == 4 && request.status == 200) {
                const {client_id} = JSON.parse(request.responseText)
                clientId = client_id

                onLoad()
            }
        }

        request.send(`action=autenticate`)
})

function onLoad () {
    google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: true
    });

    google.accounts.id.prompt(); // Mostrar el One-Tap
};

// Función para manejar la respuesta del ID Token
function handleCredentialResponse(response) {
    const idToken = response.credential;

    // Ahora solicitamos el Access Token utilizando el OAuth2.0 implicit flow
    google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'https://www.googleapis.com/auth/blogger', // Agrega los scopes necesarios
        callback: (tokenResponse) => {
            accessToken = tokenResponse.access_token;
            
            let request = new XMLHttpRequest()
            request.open('POST', '../models/app.php', true)
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            request.onreadystatechange = function () {

                if (request.readyState == 4 && request.status == 200) {
                    console.log(`Token de acceso guardado`)
                }
            }

            request.send(`accessToken=${accessToken}&action=setAccessToken`)

        },
        error_callback: (error) => {
            console.error('Error al obtener Access Token:', error);
        }
    }).requestAccessToken();
}