// Definir el blogId y la apiKey de Blogger
const blogId = '3853686814920547447';
const apiKey = 'AIzaSyDI4gD0KXTFvyvj_BaX5nu5HHOl2KmlJfY'; // Reemplazar con tu API Key de Blogger

// Construir la URL de la API de Blogger
const blogUrl = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;

// Función para obtener y mostrar las publicaciones con URL, título, etiqueta, fecha e imagen
function fetchPosts() {
    fetch(blogUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener las publicaciones');
            }
            return response.json();
        })
        .then(data => {
            const posts = data.items; // Obtener todas las publicaciones

            // Mostrar cada publicación en la página
            displayPosts(posts);
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
}

// Función para mostrar las publicaciones en la página
function displayPosts(posts) {
    const postsContainer = document.getElementById('latest-posts');
    postsContainer.innerHTML = ''; // Limpiar contenido anterior (si lo hubiera)

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        // Obtener URL, título, etiquetas, fecha y contenido de la publicación
        const postUrl = post.url;
        const postTitle = post.title;
        const postLabels = post.labels ? post.labels.join(', ') : 'Sin etiquetas';
        const postDate = new Date(post.published).toLocaleDateString();
        const postContentSnippet = post.content ? extractSnippet(post.content) : 'Descripción no disponible';

        // URL de la imagen específica que quieres mostrar en todas las publicaciones
        const specificImageUrl = 'https://1.bp.blogspot.com/--02kItvc6rE/YPdizEV04TI/AAAAAAABCdY/VG8jytjbQOgKyBry2oshqJAAWe88LdjwwCPcBGAYYCw/s1472/vacante-disponible.jpg';

        // Crear elementos HTML para mostrar la publicación con la imagen específica
        if (postUrl && postTitle) {
            const imageElement = document.createElement('img');
            imageElement.src = specificImageUrl;
            imageElement.alt = postTitle;
            imageElement.width = 100; // Ancho de la imagen
            imageElement.height = 100; // Alto de la imagen

            const whatsappButton = document.createElement('button');
            whatsappButton.textContent = 'Compartir en WhatsApp';
            whatsappButton.onclick = () => {
                const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(postTitle)}%20${encodeURIComponent(postUrl)}`;
                window.open(whatsappUrl, '_blank');
            };

            postElement.innerHTML = `
                <div class="post-content">
                    <div class="post-image">
                        <img src="${specificImageUrl}" alt="${postTitle}" width="100" height="100">
                    </div>
                    <div class="post-details">
                        <a href="${postUrl}" target="_blank">
                            <h3>${postTitle}</h3>
                        </a>
                        <p>${postLabels} - ${postDate}</p>
                        <p>${postContentSnippet}</p>
                    </div>
                </div>
            `;
            postElement.appendChild(whatsappButton); // Agregar botón de WhatsApp
            postsContainer.appendChild(postElement); // Agregar publicación al contenedor principal
        }
    });
}

// Función para extraer una línea de la descripción del contenido HTML
function extractSnippet(htmlContent) {
    // Crear un elemento temporal para manipular el contenido HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;

    // Intentar obtener el primer párrafo, luego el primer texto si no hay párrafos
    let snippet = 'Descripción no disponible';
    const paragraph = tempDiv.querySelector('p');
    if (paragraph) {
        snippet = paragraph.textContent;
    } else {
        const textContent = tempDiv.textContent.trim();
        if (textContent) {
            snippet = textContent.split('\n')[0]; // Obtener la primera línea de texto
        }
    }
    return snippet;
}



// Función para manejar el botón de refrescar la página
document.getElementById('refresh-button').onclick = () => {
    location.reload();
};

// Llamar a la función para obtener y mostrar las publicaciones al cargar la página
document.addEventListener('DOMContentLoaded', fetchPosts);
