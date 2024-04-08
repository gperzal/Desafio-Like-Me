document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayPosts(); // Llama a esta función al cargar la página para mostrar los posts existentes
});


document.getElementById('postForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const titulo = document.getElementById('postTitle').value;
  const img = document.getElementById('postImage').value;
  const descripcion = document.getElementById('postDescription').value;

  try {
    await axios.post('/posts', { titulo, img, descripcion });
    fetchAndDisplayPosts(); // Recarga los posts después de crear uno nuevo
    event.target.reset(); // Resetea el formulario
  } catch (error) {
    console.error('Error al crear el post:', error);

  }

  const offcanvasCrearPost = document.getElementById('offcanvasCrearPost');
  const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasCrearPost);
  bsOffcanvas.hide();

  // Opcionalmente, limpiar el formulario aquí
});


// Función para obtener y mostrar todos los posts
async function fetchAndDisplayPosts() {
  try {
    const { data: posts } = await axios.get('/posts');
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.className = 'col-lg-3 col-md-4 col-sm-6 col-12 mt-3 mb-4';
      postElement.style = "width: 18rem";
      postElement.innerHTML = `
                <div class="card h-100  d-flex flex-column"> 
                  <img src="${post.img}" class="card-img-top" alt="${post.titulo}">
                  <div class="card-body  d-flex flex-column justify-content-between">
                      <h5 class="card-title">${post.titulo}</h5>
                      <p class="card-text">${post.descripcion}</p>
                      <div class="d-flex justify-content-between align-items-center">
                          <div class="reactions-container">
                              <!-- Botones de like y dislike -->
                              <button class="btn reaction-btn like-btn" data-post-id="${post.id}">
                                  <i class="bi bi-hand-thumbs-up"></i>
                                  <span class="like-reaction-count" id="like-count-${post.id}">${post.likeCount || 0}</span>
                              </button>
                              <button class="btn reaction-btn dislike-btn" data-post-id="${post.id}">
                                  <i class="bi bi-hand-thumbs-down"></i>
                                  <span class="dislike-reaction-count" id="dislike-count-${post.id}">${post.dislikeCount || 0}</span>
                              </button>
                          </div>
                          <div class="actions-container">
                              <!-- Botones de editar y eliminar -->
                              <button class="btn btn-outline-secondary edit-btn" data-post-id="${post.id}">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button class="btn btn-outline-danger delete-btn" data-post-id="${post.id}">
                                <i class="bi bi-trash"></i>
                            </button> 
                          </div>
                      </div>
                  </div>
                </div>
          `;
      postsContainer.appendChild(postElement);
    });
    // Llamar a esta función cada vez que se añadan o actualicen los posts en el DOM
    addPostEventListeners();
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    // Considera mostrar un mensaje de error al usuario
  }
}

function addPostEventListeners() {

  // Agrega manejadores de eventos para "editar"
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function () {
      const postId = this.getAttribute('data-post-id');
      editPost(postId);
    });
  });

  // Agrega manejadores de eventos para "eliminar"
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function () {
      const postId = this.getAttribute('data-post-id');
      deletePost(postId);
    });
  });

  // Agrega manejadores de eventos para "actualizar"
  document.getElementById('updateBtn').addEventListener('click', () => {
    const postId = document.getElementById('editId').value; // Asegúrate de que este elemento exista y tenga el valor correcto
    updatePost(postId);
  });

  // Agrega manejadores de eventos para "confirmar eliminación"
  document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDelete);


  // Event listener para "like"
  document.querySelectorAll('.like-btn').forEach(button => {
    button.addEventListener('click', function () {
      const postId = this.dataset.postId;
      handleReaction(postId, 'like');
    });
  });
  // Event listener para 'dislike'
  document.querySelectorAll('.dislike-btn').forEach(button => {
    button.addEventListener('click', function () {
      const postId = this.dataset.postId;
      handleReaction(postId, 'dislike');

    });
  });




}
//Funciones para capturar la informacion para editar un post desde el modal
function editPost(postId) {
  // Realiza una petición al servidor para obtener los detalles del post
  axios.get(`/posts/${postId}`)
    .then(response => {
      const post = response.data;
      // Asegúrate de que los IDs aquí coincidan con los de tu formulario en el modal
      document.getElementById('editId').value = post.id;
      document.getElementById('editTitle').value = post.titulo;
      document.getElementById('editImg').value = post.img;
      document.getElementById('editDescription').value = post.descripcion;

      // Abre el modal
      const editModal = new bootstrap.Modal(document.getElementById('editPostModal'));
      editModal.show();
    })
    .catch(error => {
      console.error('Error al recuperar los detalles del post:', error);
    });
}

// Funcion para actualizar un post desde el modal
function updatePost(postId) {
  const editModal = bootstrap.Modal.getInstance(document.getElementById('editPostModal'));
  console.log(postId);
  const titulo = document.getElementById('editTitle').value;
  const descripcion = document.getElementById('editDescription').value;
  const img = document.getElementById('editImg').value; // O cómo sea que recuperes este valor

  axios.put(`/posts/${postId}`, { titulo, img, descripcion })
    .then(() => {
      fetchAndDisplayPosts();
      editModal.hide();
    })
    .catch(error => {
      console.error('Error al actualizar el post:', error);
      // Aquí manejarías los errores, mostrando algún mensaje al usuario
    });
}




function deletePost(postId) {
  // Guarda el postId en un atributo del botón de confirmación para usarlo después
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  confirmDeleteBtn.setAttribute('data-post-id', postId);

  // Muestra el modal
  const deleteModal = new bootstrap.Modal(document.getElementById('deletePostModal'));
  deleteModal.show();
}

// Esta función se llama cuando el usuario confirma que quiere eliminar el post
function confirmDelete() {
  // Obtiene el postId del atributo del botón
  const postId = document.getElementById('confirmDeleteBtn').getAttribute('data-post-id');

  axios.delete(`/posts/${postId}`)
    .then(() => {
      // Cierra el modal y actualiza la lista de posts
      const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deletePostModal'));
      deleteModal.hide();
      fetchAndDisplayPosts();
    })
    .catch(error => {
      console.error('Error al eliminar el post:', error);
      // Manejar errores, mostrar un mensaje al usuario
    });
}



function handleReaction(postId, reactionType) {
  console.log("Post ID:", postId, "Tipo de reacción:", reactionType);
  axios.put(`/posts/${postId}/reaction`, { reaction: reactionType })
    .then(response => {
      updateReactionsUI(postId, response.data);

    })
    .catch(error => {
      console.error('Error al enviar la reacción:', error);
    });
}

function updateReactionsUI(postId, postData) {
  const likeCountElement = document.getElementById(`like-count-${postId}`);
  if (likeCountElement) {
    likeCountElement.textContent = postData.likeCount;
  }

  const dislikeCountElement = document.getElementById(`dislike-count-${postId}`);
  if (dislikeCountElement) {
    dislikeCountElement.textContent = postData.dislikeCount;
  }
}

