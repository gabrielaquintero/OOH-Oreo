const NGROK = `https://${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

let controllerX, controllerY = 0;
let interactions = 2;
let isTouched = false;
let usuario = {nombre:'',
              correo: ''}
let userInput
let screen=1
let btn
let pantallaCelular
let btnenviar
let btnterminar

function preload(){
    boton=loadImage('img/jugar.png')
    juego=loadImage('img/game.png')
    dataGather=loadImage('img/datagather.png')
    listo=loadImage('img/listoparajugar.png')
    perdio=loadImage('img/perdiophone.png')
    final=loadImage('img/final.png')
    
  }

function setup() {
    frameRate(60);
    createCanvas(428, 926);

userInput = createInput('')
userInput.position(10, 330)
userInput.size(350,30)
userInput.input(myInputEvent)

nameInput = createInput('')
nameInput.position(10, 400)
nameInput.size(350,30)
nameInput.input(myInputEvent)

    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    background(0);
    angleMode(DEGREES);

    socket.emit('device-size', {windowWidth, windowHeight});
    

    
    btn = createButton("Jugar");
	btn.mousePressed(function(){
		DeviceOrientationEvent.requestPermission();
        console.log("hola")
        screen=2
        cambioPantalla()
	});
    btn.position(225,550)
    btn.size(300,60)


    btnenviar = createButton("Enviar");
	btnenviar.mousePressed(function(){
        console.log("hola")
        screen=6 
    })
    
    btnenviar.position(70,450)
    btnenviar.size(220,60) 
    
    
    btnterminar = createButton("Salir");
	btnterminar.mousePressed(function(){
        screen=6 
    })
    
    btnterminar.position(265,585)
    btnterminar.size(230,60)
    
	}
    

    

   





function draw() {
    background(0);
    
    if (screen===1){
        image(listo, 0,0,428,926);
        userInput.style('display', 'none');
        nameInput.style('display', 'none');
       btn.style('display', 'block')
       btnenviar.style('display', 'none')
       btnterminar.style('display', 'none')
        
        
        }

     if(screen===2){
        image(juego,0,0,428,926);
        userInput.style('display', 'none');
        nameInput.style('display', 'none');
        btn.style('display', 'none') 
        btnenviar.style('display', 'none')
        btnterminar.style('display', 'none')
     }   

     if(screen===3){
        image(perdio,0,0,428,926)
        userInput.style('display', 'none');
        nameInput.style('display', 'none');
        btn.style('display', 'none')
        btnenviar.style('display', 'none')
        btnterminar.style('display', 'block')
     }

     if(screen===4){
        image(dataGather,0,0,390,664)
        userInput.style('display', 'block');
        nameInput.style('display', 'block');
        btn.style('display', 'none')
        btnenviar.style('display', 'block')
        btnterminar.style('display', 'none')
     }

     if(screen===5){
        image(perdio,0,0,428,926)
        userInput.style('display', 'none');
        nameInput.style('display', 'none');
        btn.style('display', 'none')
        btnenviar.style('display', 'none')
        btnterminar.style('display', 'none')
     }

     if(screen===6){
        image(final,0,0,428,926)
        userInput.style('display', 'none');
        nameInput.style('display', 'none');
        btn.style('display', 'none')
        btnenviar.style('display', 'none')
        btnterminar.style('display', 'none')
     }

     



     if(pantallaCelular===3){
        screen=4
     }

     if(pantallaCelular===6){
        screen=5
     }
     
    



     

       
}

function myInputEvent(){
    usuario.correo=this.value()
    console.log(usuario.correo)
}

function myInputEvent(){
    usuario.nombre=this.value()
    console.log(usuario.nombre)
}


function mousePressed(){
        if(mouseX > 61 && mouseX < 123 && mouseY > 56 && mouseY < 151){
            console.log("con permiso")
            screen=2
            cambioPantalla()
}
if(mouseX > 97 && mouseX < 283 && mouseY > 465 && mouseY < 500 && screen===4){
    console.log("hola");
    screen=6
}

if(mouseX > 107 && mouseX < 312 && mouseY > 584 && mouseY < 639 && screen===5){
    console.log("hola");
    screen=6
}


}

function cambioPantalla(){
    socket.emit('actual-screen',{screenController:screen})
}
 




function deviceMoved() {
    switch (interactions) {
        case 2:
            socket.emit('mobile-instructions', { interactions, rotationY, rotationZ });
            background(0, 255, 0);
            break;
    }
    
}

socket.on('pantalla-cel', message =>{
    let {pantallaController}=message
    pantallaCelular=pantallaController
})

