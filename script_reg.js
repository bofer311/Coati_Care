    // Configurar EmailJS con tu información de cuenta
    emailjs.init('YOUR_USER_ID');

    // Capturar el evento de clic en el botón "Enviar"
    document.querySelector('.enviar').addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        // Obtener los valores de los campos de entrada
        var nombres = document.getElementById('nombres').value;
        var telefono = document.getElementById('telefono').value;
        var correo = document.getElementById('correo').value;

        // Realizar la validación de los campos aquí si es necesario

        // Enviar el correo electrónico
        var templateParams = {
            nombres: nombres,
            telefono: telefono,
            correo: correo
        };

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('Correo enviado:', response.status, response.text);
                // Realizar cualquier acción adicional después de enviar el correo electrónico
            }, function(error) {
                console.error('Error al enviar el correo:', error);
                // Realizar cualquier acción adicional en caso de error
            });
    });

    // Variables globales
    var paginaActual = 1;
    var numPaginas = document.querySelectorAll('.pagina').length;

    // Función para cambiar a la siguiente página
    function siguientePagina() {
        if (paginaActual < numPaginas) {
            document.querySelector('.pagina:nth-child(' + paginaActual + ')').classList.remove('movPag');
            document.querySelector('.pagina:nth-child(' + (paginaActual + 1) + ')').classList.add('movPag');
            actualizarPasos();
            paginaActual++;
        }
    }

    // Función para cambiar a la página anterior
    function paginaAnterior() {
        if (paginaActual > 1) {
            document.querySelector('.pagina:nth-child(' + paginaActual + ')').classList.remove('movPag');
            document.querySelector('.pagina:nth-child(' + (paginaActual - 1) + ')').classList.add('movPag');
            actualizarPasos();
            paginaActual--;
        }
    }

    // Función para actualizar los pasos del formulario
    function actualizarPasos() {
        var pasos = document.querySelectorAll('.paso');
        for (var i = 0; i < pasos.length; i++) {
            pasos[i].classList.remove('active');
        }
        pasos[paginaActual - 1].classList.add('active');
    }

    // Eventos de clic para los botones "Siguiente" y "Atrás"
    document.querySelector('.adelante-pag1').addEventListener('click', siguientePagina);
    document.querySelector('.adelante-pag2').addEventListener('click', siguientePagina);
    document.querySelector('.volver-pag1').addEventListener('click', paginaAnterior);
    document.querySelector('.volver-pag2').addEventListener('click', paginaAnterior);

















btn_final.addEventListener("click", function(e){
    e.preventDefault();
    alert("Registro completado");
    num[cont - 1].classList.add("active");
    progressCheck[cont - 1].classList.add("active");
    progressText[cont - 1].classList.add("active");
    cont += 1;
});

btn_atras1.addEventListener("click", function(e){
    e.preventDefault();
    movPag.style.marginLeft = "0%";
    num[cont - 2].classList.remove("active");
    progressCheck[cont - 2].classList.remove("active");
    progressText[cont - 2].classList.remove("active");
    cont -= 1;
});

btn_atras2.addEventListener("click", function(e){
    e.preventDefault();
    movPag.style.marginLeft = "-25%";
    num[cont - 2].classList.remove("active");
    progressCheck[cont - 2].classList.remove("active");
    progressText[cont - 2].classList.remove("active");
    cont -= 1;
});
