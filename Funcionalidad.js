

let score = 0;
let options =[];
let objetoPreguntas;
let numero = 0;
let niveles =1;
const random = (Math.floor(Math.random()*basePreguntas[numero].length))



//creacion de estructura HTML

// div para mostrar las preguntas 
const container = document.getElementById("game board");
const header = document.createElement("div");
header.id = "header";
header.textContent ="BIEMVENIDOS A QUIEN QUIERE SER MILLONARIO INGRESE SU NOMBRE PARA EMPEZAR "

//niveles en pantalla
  const nivel = document.createElement("div");
  nivel.id = "nivel";
  nivel.textContent = "5 niveles para ser multimillonario";
/**
 * contenedores donde se muestran las opciones 
 */
 const option1 = document.createElement("div");
  option1.id = "option-1"
  option1.className ="option"  
  option1.textContent =""

  const option2 =document.createElement("div");
  option2.id = "option-2"
  option2.className ="option"  
  option2.textContent =""

  const option3 =document.createElement("div");
  option3.id = "option-3"
  option3.className ="option"  
  option3.textContent =""

  const option4 =document.createElement("div");
  option4.id = "option-4"
  option4.className ="option"  
  option4.textContent =""

//puntaje en pantalla
  const puntaje =document.createElement("div");
  puntaje.id = "puntaje"
  puntaje.textContent ="puntaje " + score

//nombre del jugador en pantalla
  const nombre = document.createElement("div");
  nombre.id ="nombre";
  nombre.textContent = "jugador" 

  

container.append(nivel,header,option1,option3,option2,option4,nombre,puntaje);

//input para agregar el nombre del jugador
const boton = document.getElementById("header");
const input = document.createElement("input");
input.type = "text";
input.id = "input";
input.placeholder = "Ingrese su nombre"
input.required = true;

//boton para comenzar el juego 
const button = document.createElement("button");
button.id = "button";
button.textContent = "Comenzar Juego "

header.append(input,button);



///funcionalidad



document.getElementById("button").addEventListener("click",() => cargaPregunta());


document.getElementById("option-1").addEventListener("click",() => seleccionar(0));
document.getElementById("option-2").addEventListener("click",() => seleccionar(1));
document.getElementById("option-3").addEventListener("click",() => seleccionar(2));
document.getElementById("option-4").addEventListener("click",() => seleccionar(3));


/**
 * Esta funcion coloca el nombre del jugador ingresado en el index.Html
 */
function cargarPersona( ){
  document.getElementById("nombre").innerHTML = "Jugador: " + input.value;
}


/**
 * Esta funcion me trae las preguntas del objeto BasePreguntas y me las muestra en el index.HTML de manera random por  niveles
 */
function cargaPregunta(){  
  if(input.value== ""){
    alert("debes de ingresar el nombre para comenzar");
  }else{
  cargarPersona();
  document.getElementById("nivel").innerHTML = "Nivel " +niveles
  objetoPreguntas = basePreguntas[numero][random];
  console.log(objetoPreguntas);
  options = [...objetoPreguntas.incorrecto];
  console.log(options);
  options.push(objetoPreguntas.respuesta);
  options.sort(()=>Math.random()-0.5);
  document.getElementById("header").innerHTML= objetoPreguntas.pregunta;
  document.getElementById("option-1").innerHTML= options[0];
  document.getElementById("option-2").innerHTML =options[1];
  document.getElementById("option-3").innerHTML =options[2];
  document.getElementById("option-4").innerHTML =options[3];
  }
}

/**
 * Esta funcion trae los datos en un objeto los convierte en string , los agrega a una lista y  los almacena en el localStorage como un objeto
 * @param {String} name El nombre puesto al iniciar el juego
 * @param {number} points Los puntos sumados en el juego 
 */
function addData(name,points){
  const ObjetoStorage={
    "name":name,
    "points":points
  }
  
console.log(localStorage.getItem("players"));
  if(localStorage.getItem("players") != null){

const player =JSON.parse(localStorage.getItem("players")); 
player.push(ObjetoStorage);

localStorage.setItem("players",JSON.stringify(player));
 }else{
    const newData =[];
    newData.push(ObjetoStorage);


  localStorage.setItem("players",JSON.stringify(newData));
  
 }

}


/**
 * Esta funcion dice si la resuesta seleccionada por el jugador es correcta y me define la terminacion del juego
 * @param {number} index el numero del indice con el cual va a llamar a las opciones en el arreglo de opciones
 */
  async function seleccionar(index){
  let response = options[index] == objetoPreguntas.respuesta;
  if(response){
    await Swal.fire({
      title: "Respuesta correcta",
      text: "La respuesta ha sido correcta",
      icon: "success",
    });
    score= score + 100;
    numero++;
    niveles++;
    puntaje.textContent ="puntaje " + score
  }else{
    await Swal.fire({
      title: "Respuesta Incorrecta",
      html: `La respuesta correcta es ${objetoPreguntas.respuesta}`,
      icon: "error",
    });

    await Swal.fire({
      title: "Juego finalizado",
      html: `tu puntaje fue de: ${score}`,
    });
    addData(input.value,score);
    numero = 0;
    score = 0;
    niveles = 1;
   cargaPregunta();
  }

    if(numero >= 5){ 
    await Swal.fire({
      title: "Juego finalizado",
      html: `tu puntaje fue de: ${score}`,
    });
    addData(input.value,score);
    numero = 0;
    score = 0;
    niveles = 1;
   cargaPregunta();
  }
  
 cargaPregunta();
}


