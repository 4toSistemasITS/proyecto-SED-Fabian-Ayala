'use strict';
var app = angular.module('myApp', ['ui.router'])
.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('principal',{
		url:'/principal',
		templateUrl:'vistas/principal.html',
		controller:'vistaPrincipal'
	})
	.state('login',{
		url:'/login',
		templateUrl:'vistas/login.html',
		controller:'vistaLogin'
	})
	.state('cuestionario',{
		url:'/cuestionario',
		templateUrl:'vistas/cuestionario.html',
		controller:'vistaCuestionario'
	})
	.state('tutorial',{
		url:'/tutorial',
		templateUrl:'vistas/tutorial.html',
		controller:'vistaTutorial'
	})
	.state('docentes',{
		url:'/docentes',
		templateUrl:'vistas/docentes.html',
		controller:'vistaDocentes'
	})
	.state('reportes',{
		url:'/reportes',
		templateUrl:'vistas/reportes.html',
		controller:'vistaReportes'
	})
	$urlRouterProvider.otherwise('/principal');
});
app.controller('vistaPrincipal',function($scope,$state){
	$scope.ventana=function(){
		$state.go('login')
	} 
});
app.controller('vistaLogin',function($scope,$state,$http){
	$scope.reporte=function(){
		$state.go('reportes')
	}
		$scope.cambiar=function(){
			var req = {
	method: 'POST', 
 	url: 'http://localhost:8080/SED_1/webresources/com.model.login/consultar', 
 	
 	headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
 	data: 'usuario='+$scope.user+'&password='+$scope.psw};

    console.log('estoy vivo en el instituto');

	$http(req).then(function(resp){


 		//$scope.elementos=resp.data; 	
 		console.log('Entro' ,resp);
	
 		console.log('Entro' ,resp.data.Login);

 		if (resp.data.Login==true) {
			$state.go('reportes');	
		}
		else{
				alert('Datos incorrectos');
		}
		

 	});
		
	}

});
app.controller('vistaTutorial',function($scope,$state){
	$scope.informacion=function(){
		$state.go('docentes')
	}
	$scope.inicio=function(){
		$state.go('principal')
	}
});
app.controller('vistaDocentes',function($scope,$state){
	$scope.lista=function(){
		$state.go('cuestionario')
	}
	$scope.regresar=function(){
		$state.go('tutorial')
	}
});
app.controller('vistaCuestionario',function($scope,$state){
	$scope.regresar=function(){
		$state.go('docentes')
	}
});
app.controller('vistaReportes',function($scope,$state,$http){
	var req = {
	method: 'POST', 
 	url: 'http://localhost:8080/SED_1/webresources/com.model.evaluacion/leer', 
 	headers: {'Content-Type': 'application/x-www-form-urlencoded'}, 
 	data:' '};

	$http(req).then(function(resp){
 		$scope.elementos=resp.data; 		
 		console.log('Entro' ,resp.data)
		});	
	$scope.regresar=function(){
		$state.go('principal')
	}
});