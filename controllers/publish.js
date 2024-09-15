export const postToBlogger = async (title, category, content) => {

    let request = new XMLHttpRequest()

        request.open('POST', '../models/app.php', true)

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        request.onreadystatechange = function () {

            if (request.readyState == 4 && request.status == 200) {

                const publish = async () => {
                    
                    const {client_id, blogId, accessToken} = JSON.parse(request.responseText)

                    console.log(`client id: ${client_id} / blogId: ${blogId} / accessToken: ${accessToken}`)

                    if (!accessToken) {
                        alert('Inicia sesión con Google antes de publicar.');
                        return;
                    }
                    
                    try {
                        const postBody = {
                            kind: "blogger#post",
                            blog: {
                                id: blogId
                            },
                            title: title,
                            labels: [category],
                            content: `${content}`,
                            status: 'DRAFT'
                        };
                    
                        const bloggerResponse = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/`, {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${accessToken}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(postBody)
                        });
                    
                        const result = await bloggerResponse.json();
                    
                        if (bloggerResponse.ok) {
                            toastr.success(`Vacante publicada exitosamente: ${result.id}`);
                        } else {
                            toastr.success(`Vacante publicada exitosamente: ${result.error.message}`);
                        }
                    } catch (error) {
                        console.error('Error al publicar:', error);
                        alert('Error al publicar la vacante.');
                    }
                }
                publish()

            }

        }



        request.send(`action=autenticate`)
}

