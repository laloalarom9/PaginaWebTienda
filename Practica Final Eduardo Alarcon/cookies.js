const botonAceptarCookies = document.getElementById('btn-aceptar-cookies');
const avisoCookies = document.getElementById('aviso-cookies');
const fondoAvisoCookies = document.getElementById('fondo-aviso-cookies');
//Se obitenen los elementos del html
dataLayer = [];//Se inicializa un array

// Se verifica si las cookies han sido aceptadas previamente
if(!localStorage.getItem('cookies-aceptadas')){
	avisoCookies.classList.add('activo');//Se añade la clase activo
	fondoAvisoCookies.classList.add('activo');
} else {
	dataLayer.push({'event': 'cookies-aceptadas'});// Si las cookies ya han sido aceptadas, se agrega un evento al dataLayer indicando que las cookies fueron aceptadas
}

// Se añade un evento de clic al botón de aceptar cookies
botonAceptarCookies.addEventListener('click', () => {
	// Se remueven las clases 'activo' de los elementos asociados al aviso de cookies
	avisoCookies.classList.remove('activo');
	fondoAvisoCookies.classList.remove('activo');
	// Se guarda en el almacenamiento local que las cookies han sido aceptadas
	localStorage.setItem('cookies-aceptadas', true);
	// Se agrega un evento al dataLayer indicando que las cookies fueron aceptadas
	dataLayer.push({'event': 'cookies-aceptadas'});
});