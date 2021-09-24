const socket = io.connect();

let submit = document.getElementById('form-product');
let submitChat = document.getElementById('form-Chat');

//Pedimos la data que hay actualmente enviando un socket
socket.emit('Productos');
socket.emit('Mensajes');

// Si emite un mensaje individual
socket.on('mensajes', (data) => {
    console.log('RECIBI MENSAJE');
    alert(data);
});

// Mensaje para todos los clientes
socket.on('update', (products) => {
    products.forEach((product) => {
      render(product);
    });
});

// // WebSocket que recibe mensajes desde le backend para pintar un nuevo mensaje del chat
socket.on('updateChat', (messages) => {
    messages.forEach((message) => {
      renderChat(message);
    });
});



submit.addEventListener('submit', (e) => {
    let form = e.target;
    let inputs = new Object();
    e.preventDefault();
    form = submit.getElementsByTagName('input');

    for (let index = 0; index < form.length; index++) {
        inputs[form[index].name] = form[index].value;
    }
    console.log(inputs);
    socket.emit('newProducto', inputs);
    submit.reset();
});

submitChat.addEventListener('submit', (e) => {
    let form = submitChat.getElementsByTagName('input');
    let inputTxt = document.getElementById('text');
    let inputs = new Object();
    e.preventDefault();
  
    for (let index = 0; index < form.length; index++) {
      inputs[form[index].name] = form[index].value;
    }
    socket.emit('newMensaje', inputs);
    inputTxt.value = '';
});


render = (data) => {
    let listProduct = document.getElementById('list-Product');
    let newElement = document.createElement('tr');
    let htmlProducto = `
        <td>${data.producto}</td>
        <td>${data.precio}</td>
        <td>
            <div class='text-center wd-100'>
                <div
                class='card'
                style='width: 4rem; margin-left: auto; margin-right: auto;'
                >
                    <img
                        src='${data.url}'
                        class='card-img-top mx-auto d-block'
                        alt='...'
                    />
                </div>
            </div>
        </td>
        `;
    newElement.innerHTML = htmlProducto;
    listProduct.appendChild(newElement);
};

renderChat = (data) => {
    let chatUl = document.getElementById('messages');
    let newElement = document.createElement('li');
    newElement.className = 'message left appeared';
    let htmlMessage = `
    <div class="avatar"></div>
    <div class="text_wrapper">
        <span class="email">${data.email}</span>
        <span class="date"> [ ${data.date} ]: </span>
        <span class="text">${data.text}</span>
    </div>`;
    newElement.innerHTML = htmlMessage;
    chatUl.appendChild(newElement);
    chatUl.scrollTo(0, document.body.scrollHeight);
};
