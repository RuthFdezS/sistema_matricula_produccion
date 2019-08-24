/*
	Intensify by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/
 
(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header');
			
		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly').scrolly({
				offset: function() {
					return $header.height();
				}
			});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right'
				});

		//Filtro Cursos
			$("#buscador").on("keyup", function() {
				var value = $(this).val().toLowerCase();
				$(".card").filter(function() {
				  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			  });

			$("#buscadorCurso").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#cursosDisponibles tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			});

			$("#buscadorMatricula").on("keyup", function() {
				var value = $(this).val().toLowerCase();
				$("#matriculaDisponible tr").filter(function() {
					$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
					});
				});

		//Checkbox
		$("#terms").on( 'change', function() {
			if( $(this).is(':checked') ) {
				// si el checkbox ha sido seleccionado
				$('#btnMatricula').prop('disabled',false);
			} else {
				// si el checkbox ha sido deseleccionado
				$('#btnMatricula').prop('disabled',true);
			}
		});

		$(".delete-curso").on('click',function(e){
			$target = $(e.target);
			const id = ($target.attr('data-id'));
			let resp = confirm("¿Desea elimimar este curso?");
			if(resp){
				$.ajax({
					type: 'DELETE',
					url: '/modificarCurso/'+id,
					success : function(response){
						alert("Elemento eliminado");
						window.location.href='/cursosVista';
					},
					error: function(err){
						console.log(err);
					}
				});
			}else{
				alert("No se elimino el curso");
			}
		});

		
		$(".busquedaDatos").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$(".infoBusqueda tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
				});
			});
			
		//Tutores
		$(".delete-tutor").on('click',function(e){
			$target = $(e.target);
			const id = ($target.attr('data-id'));
			let resp = confirm("¿Desea elimimar este tutor?");
			if(resp){
				$.ajax({
					type: 'DELETE',
					url: '/modificarTutor/'+id,
					success : function(response){
						alert("Elemento eliminado");
						window.location.href='/tutoresVista';
						console.log(response);
					},
					error: function(err){
						console.log(err);
					}
				});
			}else{
				alert("No se elimino el elemento");
			}
		});

		$(".delete-estudiante").on('click',function(e){
			$target = $(e.target);
			const email_estudiante = ($target.attr('data-id'));
			let resp = confirm("¿Desea elimimar el estudiante? Nota: Recuerde verificar que el estudiante no este matriculado en ningun curso para poder borrarlo correctamente");
			if(resp){
				$.ajax({
					type: 'DELETE',
					url: '/modificarEstudiante/'+email_estudiante,
					success : function(response){
						alert("Elemento eliminado");
						window.location.href='/estudiantesVista';
						console.log(response);
					},
					error: function(err){
						console.log(err);
					}
				});
			}else{
				alert("No se elimino el elemento");
			}
		});
		//Estudiantes
		// $(".delete-estudiante").on('click',function(e){
		// 	$target = $(e.target);
		// 	const email_estudiante = ($target.attr('data-id'));
		// 	let resp = confirm("¿Desea elimimar el estudiante?"+" Nota: Recuerde verificar que el estudiante no este matriculado en ningun curso para poder borrarlo correctamente");
		// 	if(resp){
		// 		$.ajax({
		// 			type: 'DELETE',
		// 			url: '/modificarEstudiante/'+email_estudiante,
		// 			success : function(response){
		// 				alert("Elemento eliminado");
		// 				window.location.href='/estudiantesVista';
		// 				console.log(response);
		// 			},
		// 			error: function(err){
		// 				console.log(err);
		// 			}
		// 		});
		// 	}else{
		// 		alert("No se elimino el elemento");
		// 	}
		// });

		// Matricula
		$(".delete-matricula").on('click',function(e){
			$target = $(e.target);
			const num_matricula = ($target.attr('data-id'));
			let resp = confirm("¿Desea elimimar esta matricula con el numero de matricula: ?");
			if(resp){
				$.ajax({
					type: 'DELETE',
					url: '/modificarMatricula/'+num_matricula,
					success : function(response){
						alert("Elemento eliminado");
						window.location.href='/cursosMatriculados';
						console.log(response);
					},
					error: function(err){
						console.log(err);
					}
				});
			}else{
				alert("No se elimino el elemento");
			}
		});

		// $(".btnEliminarMatr").on('click',function(e){
		// 	$target = $(e.target);
		// 	console.log($target);
		// 	const id = ($target.attr('data-id'));
		// 	let resp = confirm("¿Desea elimimar la matrícula?");
		// 	if(resp){
				
		// 		alert("Elemento eliminado");
		
				
		// 	}else{
		// 		alert("No se elimino el elemento");
		// 	}
		// });

		// $(".btnMatriculaMod").on('click',function(e){
		// 	$target = $(e.target);
		// 	const id = ($target.attr('data-id'));
		// 	let resp = confirm("¿Desea modificar la matrícula?");
		// 	if(resp){
		// 		popUp('/cursos','Modificar matricula');
		// 	}else{
		// 		alert("No se elimino el elemento");
		// 	}
		// });

		$(".btnExpCursos").on('click',function(e){
			$target = $(e.target);
			const id = ($target.attr('data-id'));
			popUp('/cursosVistaPrint','Exportar Cursos');
		});

		$(".btnExpEstudiantes").on('click',function(e){
			$target = $(e.target);
			const id = ($target.attr('data-id'));
			popUp('/estudiantesVistaPrint','Exportar Estudiantes');
		});

		$(".btnExpTutores").on('click',function(e){
			$target = $(e.target);
			const id = ($target.attr('data-id'));
			popUp('/tutoresVistaPrint','Exportar Tutores');
		});
		$(".btnExpMatriculas").on('click',function(e){
			$target = $(e.target);
			const num_matricula = ($target.attr('data-id'));
			popUp('/matriculasVistaPrint','Exportar Matriculas');
		});

		// $(".btnImprimir").on('click',function(e){
		// 	$("#tableEstudiantes").tableExport({
		// 		formats: ["xlsx","txt", "csv","xls"], //Tipo de archivos a exportar ("xlsx","txt", "csv", "xls")
		// 		position: 'bottom',  // Posicion que se muestran los botones puedes ser: (top, bottom)
		// 		bootstrap: false,//Usar lo estilos de css de bootstrap para los botones (true, false)
		// 		fileName: "Listado Estudiantes",    //Nombre del archivo 
		// 	});
		// });



	});

})(jQuery);

function submitMessage(element)
{
  alert("Su comentario ha sido enviado");
  document.getElementById("formComentario").reset();
  return false;
}

function submitForgot(element)
{
  alert("Se enviado un correo a su dirección de correo electrónico para recuperar la contraseña.");
  document.getElementById("formForgotPass").reset();
  return false;
}

function loginUser(element)
{
	alert("Inicio Correcto");
	document.getElementById("formLogin").reset();
	window.location = "/home"
	return false;
}

function go(){
	if (document.form.password.value=='CONTRASEÑA' && document.form.login.value=='USUARIO'){ 
        document.form.submit(); 
    } 
    else{ 
         alert("Porfavor ingrese, nombre de usuario y contraseña correctos."); 
    } 
}

function popUp(pageURL,title){
	//alert("Matrícula realizada con éxito, a continuación se mostrara el comprobante de matrícula");
	var pageURL = pageURL;
	var title = title;
	var w = 800;
	var h = 800;
	var left = (screen.width - w) / 2;
	var top = (screen.height - h) / 4;  // for 25% - devide by 4  |  for 33% - devide by 3
	var targetWin = window.open(pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

	//window.location = "/cursos"
	return false;
}

function popUpMatricula(pageURL,title){
	alert("Matrícula realizada con éxito, a continuación se mostrara el comprobante de matrícula");
	var pageURL = pageURL;
	var title = title;
	var w = 800;
	var h = 800;
	var left = (screen.width - w) / 2;
	var top = (screen.height - h) / 4;  // for 25% - devide by 4  |  for 33% - devide by 3
	var targetWin = window.open(pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

	window.location = "/cursos"
	return false;
}

function imprimirLista(idTabla,nombre){
	$(`${idTabla}`).tableExport({
		formats: ["xlsx","txt", "csv","xls"], //Tipo de archivos a exportar ("xlsx","txt", "csv", "xls")
		position: 'bottom',  // Posicion que se muestran los botones puedes ser: (top, bottom)
		bootstrap: false,//Usar lo estilos de css de bootstrap para los botones (true, false)
		fileName: nombre,    //Nombre del archivo 
	});
}



