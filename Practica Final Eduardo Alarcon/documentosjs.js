$(document).ready(function () {
	$('#nav-icon1').click(function () {
		$(this).toggleClass('open');
	});
});//Animación icono hamburguesa

//Inicio Carrusel
const carousel = document.querySelector('.carrusel');//se selecciona el elemento html con la clase carrusel
let currentIndex = 0;//Esta variable representa la posicion actual en el carrusel

function nextSlide() {//Desplazamiento a la derecha
	currentIndex = (currentIndex + 1) % carousel.children.length;
	updateCarousel();
}

function prevSlide() {//Desplazar a la izquierda
	currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;//carousel.children.length toma el numero de elementos hijos que hay en la clase carrusel
	//Ejemplo:(0 - 1 + 8) se convierte en 7. 7 % 8 es igual a 7
	updateCarousel();
}

function updateCarousel() {
	const translateValue = -currentIndex * 100 + '%';//se desplaza el porcentaje del elemento al que va, es decir, si va al 7, 700
	carousel.style.transform = 'translateX(' + translateValue + ')';//quiere decir que usara css y usara la propiedad transform y translateX(100%) para desplazar el porcentaje para que se mueva la imágen
}

setInterval(nextSlide, 3000); // Cambia la imagen cada 3 segundos, se llama a desplazar a la derecha en ese tiempo
//Fin Carrusel

//Inicio Modal de lo de la Galeria
function openModal(imageUrl, title, price) {
	document.getElementById('miModal').style.display = 'flex';//Se agrega el estilo display:flex

	// Configura la imagen, el título y el precio en el modal con los parametros que se obtuvieron
	document.getElementById('modalImagen').src = imageUrl;
	document.getElementById('modalImagen').alt = title;
	document.getElementById('modalImagen').title = title + ' - ' + price;

	// Añade un event listener para cerrar el modal al hacer clic en la imagen
	document.getElementById('modalImagen').addEventListener('click', closeModal);
}

function closeModal() {
	document.getElementById('miModal').style.display = 'none';//display:none lo oculta
	// Remueve el event listener para cerrar el moda
	document.getElementById('modalImagen').removeEventListener('click', closeModal);
}
//Fin Modal de lo de la Galeria
//Formulario Inicio
function enviarFormulario() {
	let formulario = document.getElementById('formularioContacto');//Obtiene el elemento por su id
	let campos = formulario.elements;//obtiene  la coleeción de elementos dentro del formulario

	// Reiniciar estilos
	resetearEstilos();

	// Objeto para almacenar los datos del formulario
	let formData = {};

	for (let i = 0; i < campos.length; i++) {//Se recorren todos los campos
		if (campos[i].type !== 'button') {//Que no sea boton
			formData[campos[i].name] = campos[i].value;//Asigna el valor del campo actual (campos[i].value) a una propiedad en el objeto formData
			if (campos[i].value.trim() === '' && campos[i].tagName !== 'SELECT') {
				mostrarError(campos[i], 'Este campo no puede estar vacío.');
				return;
				// Verifica si el valor del campo, después de eliminar espacios en blanco al principio y al final con trim(), es una cadena vacía
				//Asegura que esta validación no se aplique a elementos de tipo SELECT
			}
			if (campos[i].name === 'email' && !validarEmail(campos[i].value)) {
				mostrarError(campos[i], 'Formato de email incorrecto.');
				return;
				//Verifica si el nombre del campo actual es 'email'
				//Utiliza la función validarEmail para verificar si el valor del campo de correo electrónico no cumple con un formato válido.
			}
			if (campos[i].name === 'telefono' && !validarTelefono(campos[i].value)) {
				mostrarError(campos[i], 'Formato de teléfono incorrecto.');
				return;
				//Verifica si el nombre del campo actual es 'telefono'
				//: Llama a la función mostrarError para mostrar un mensaje de error indicando que el formato del número de teléfono es incorrecto.
			}
			if (campos[i].name === 'nombre' || campos[i].name === 'apellidos' || campos[i].name === 'motivo') {
				if (contieneNumeros(campos[i].value)) {
					mostrarError(campos[i], 'Este campo no puede contener números.');
					return;
				}
				//Verifica si el nombre del campo actual es 'nombre', 'apellidos' o 'motivo
				// Utiliza la función contieneNumeros para verificar si el valor del campo actual contiene números.
				//: Llama a la función mostrarError para mostrar un mensaje de error indicando que el campo no puede contener números.
			}
		}
	}

	// Configurar la solicitud POST
	fetch('https://httpbin.org/post', {//fetch es una función incorporada en JavaScript que se utiliza para realizar solicitudes HTTP y recuperar recursos de una red.
		method: 'POST',//Especifica que se está realizando una solicitud POST
		headers: {
			'Content-Type': 'application/json',//Indica que el tipo de contenido de la solicitud es JSON.
		},
		body: JSON.stringify(formData),//onvierte el objeto formData a una cadena JSON y lo establece como el cuerpo de la solicitud
	})
		.then(response => response.json())//Procesa la respuesta de la solicitud. Convierte la respuesta a formato JSON para poder trabajar con ella.
		.then(data => {//Se ejecuta cuando la respuesta se ha convertido correctamente a formato JSON.
			console.log(data);
			alert('Formulario enviado con éxito');//Muestra un alerta de que se pudo enviar
		})
		.catch(error => {//: Se ejecuta en caso de que ocurra algún error durante la solicitud. Imprime el error en la consola y muestra una alerta indicando que ha habido un error al enviar el formulario.
			console.error('Error al enviar el formulario:', error);
			alert('Error al enviar el formulario');//Muestra un alerta de que no se pudo enviar
		});
}

function contieneNumeros(texto) {
	// verificar si el texto contiene números
	let expresionRegularNumeros = /\d/;///\d/ se utiliza para buscar cualquier dígito numérico (0-9) en el texto
	return expresionRegularNumeros.test(texto);//test(texto) de la expresión regular devuelve true si encuentra al menos una coincidencia en el texto y false si no encuentra ninguna.
}

function validarEmail(email) {
	//  validar email
	let expresionRegularEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//validar el formato del correo electrónico
	return expresionRegularEmail.test(email);//evuelve true si la cadena cumple con el formato especificado y false si no
}

function validarTelefono(telefono) {
	//validar que el teléfono contenga solo números
	let expresionRegularTelefono = /^\d+$/;// se utiliza para validar que la cadena contenga solo dígitos numéricos.
	return expresionRegularTelefono.test(telefono);// devuelve true si la cadena contiene solo dígitos numéricos y false si no
}

function mostrarError(elemento, mensaje) {
	// Agrega la clase 'error' al elemento para resaltarlo visualmente
	elemento.classList.add('error');
	//Identificador unico para el mensaje de error
	let idError = 'error-' + elemento.id;
	//Busca en el DOM el elemento que tiene el identificador único generado para el mensaje de error
	let errorElemento = document.getElementById(idError);
	if (errorElemento) {//Verifica si ya existe un elemento de error para este campo. Si existe, se actualiza el contenido del elemento con el nuevo mensaje de error.
		errorElemento.textContent = mensaje;
	}
}

function resetearEstilos() {
	let form = document.getElementById('formularioContacto');//Obtención de Referencia al Formulario y sus Elementos
	let campos = form.elements;
	//Se usa un bucle for para recorrer los elementos
	for (let i = 0; i < campos.length; i++) {
		//Verifica que el tipo del campo actual no sea 'button'. Esto se hace para asegurarse de que las acciones se apliquen solo a campos de entrada y no a botones
		if (campos[i].type !== 'button') {
			campos[i].classList.remove('error');//quitar la clase 'error' 
			let idError = 'error-' + campos[i].id;//dentificador único para el mensaje de error asociado al campo. Esto se hace concatenando 'error-' con el ID del campo
			let errorElemento = document.getElementById(idError);//se obtiene el id de idError
			if (errorElemento) {
				errorElemento.textContent = '';//Verifica si el elemento existe y elimina cualquier mensaje de error previamente mostrado
			}
		}
	}
}
//formulario Fin

//Banner
function ocultarBanner() {
	// Oculta el banner al hacer clic en el botón "Ocultar"
	document.getElementById("bannerContainer").style.display = "none";//Con display:none en el css se borra
}