let lista_celdas = []
Array.from(document.querySelectorAll('td')) 
const histo = document.getElementById('historial')
let num = 0, filas, columnas

const historial = []


// Esperamos a que la paginas se termine de cargar para ejecutar el codigo
window.onload = () =>{
    const boton_num = document.getElementById('cambiar_num')
    

    const form = document.getElementById("form");
    // Asignamos una función al evento submit
    form.onsubmit = (e) => {
        // Capturamos el evento y evitamos que el submit refresque la pagina
        e.preventDefault();

        fila = document.getElementById('cantidad-fila')
        columna = document.getElementById('cantidad-col')
        // Controlo los nº para que no superen el espacio asignado
        if(columna.value > 9 && fila.value > 15) {
            columna.value = 9;
            alert("El maximo de columnas es 9 si las filas son mas de 15");
        }
        // Controlo que no se ingresen nº negativos
        if(columna.value < 0 || fila.value < 0){
            alert("Tienes que ingresar valor positivos en las filas y columnas")
        }
        else{
            crearTabla()
            
            // Una vez creada la tabla guardamos en un array cada celda
            lista_celdas = Array.from(document.querySelectorAll('td')) 
            
            // recoremos el array de celdas y le asignamos un escuchador de eventos
            lista_celdas.map((el, i) => {
                lista_celdas[i].addEventListener('click', colorear_fondo(i), false)
            })

        }


    }

    boton_num.addEventListener("click", numero_random, false)
    
}
function numero_random() {
    const numero = document.getElementById('num')
    let  intervalo

    intervalo = setInterval(function(){
        num = random()
        numero.innerHTML = num
    },200)
    setTimeout(function(){
        clearInterval(intervalo)
        let repetido = comprobar()
        while(repetido){
            num = random()
            repetido = comprobar()
        }
        
        numero.innerHTML = num
        historial.push(num)
        histo.innerHTML += '<li>' + num + '</li>' 
    }, 2000)



}

function colorear_fondo (indice) {
    return function () {
        // Guardo en una variable la posición del input
        let num = Number(columna.value) + 1
        // Verificamos que la celda precionada no sea donde esta el input
        if(indice % num != 0){
            lista_celdas[indice].classList.toggle('bg-success')
        }
    }
}

function random() {
    return Math.round(Math.random() * ((fila.value * columna.value) - 1) + 1);

}

function comprobar() {
    let comprueba = false
    for(let i=0; i < historial.length; i++) {
        if(num == historial[i]){
            comprueba = true
        }
    }
    return comprueba
}

function crearTabla() {
    const tabla = document.getElementById('boydTabla')
    const cabezera = document.getElementById('headTabla')
    tabla.innerHTML = ""
    cabezera.innerHTML = ""


    for(let i=0; i <= columna.value; i++) {
        if(i == 0) {
            let columnas_cabezera = document.createElement("th");
            let textoCabezera = document.createTextNode('Nombres')
            columnas_cabezera.appendChild(textoCabezera);
            cabezera.appendChild(columnas_cabezera);
        }
        else {

            let columnas_cabezera = document.createElement("th");
            let textoCabezera = document.createTextNode('col ' + i)
            
            columnas_cabezera.appendChild(textoCabezera);
            cabezera.appendChild(columnas_cabezera);
        }

    }
  
    for(let x=1; x <= fila.value; x++) {
        let hilera = document.createElement("tr");

        for(let y=0; y <= columna.value; y++){
            let y2 = (y-1) * fila.value

            let celda = document.createElement("td");
            let textoCelda
            
            if(y == 0){
                let input = document.createElement('input');
                celda.appendChild(input);
                hilera.appendChild(celda);
            }
            else {
                textoCelda = document.createTextNode(x + y2);
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            }
        }
        
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tabla.appendChild(hilera);
    }
    
}

