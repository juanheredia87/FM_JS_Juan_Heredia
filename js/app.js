
/*Efecto Cambio de Color en texto*/
var x;
    x=$(document);
    x.ready(iniciar);
 /*Funcion para reetir el efecto de texto*/
    function iniciar(){
        var x=$("h1");
        x.animate({color: "red"}, 1000);
        //volver a llamar a iniciar() luego de terminar la última animación
        x.animate({color: "yellow"},iniciar);
    }




