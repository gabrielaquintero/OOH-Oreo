


const NGROK = `https://${window.location.hostname}`;
let socket = io(NGROK, { path: '/real-time' });
console.log('Server IP: ', NGROK);

let controllerX, controllerY = 0;
let deviceWidth, deviceHeight = 0;
let mupiWidth, mupiHeight = 0;
let balls=[]
let boom=[]
let score=0
let perdidas=0
let pantalla=0
let pantallaMupi



function preload(){
  oreo=loadImage('img/galleta.png')
  fondoJuego=loadImage('img/fondo juego.png')
  bomba=loadImage('img/bomba.png')
  vaso=loadImage('img/vaso.png')
  fondoJuego=loadImage('img/fondo juego.png')
  instrucciones=loadImage('img/instrucciones.png')
  desct50=loadImage('img/50.png')
  desct30=loadImage('img/30.png')
  desct10=loadImage('img/10.png')
  perdio=loadImage('img/perdio.png')
  inicio=loadImage('img/inicio.png')
  final=loadImage('img/final.png')
}

function setup() {
  createCanvas(788,1067)
    background(0)
    frameRate(60);
  
    
    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    mupiWidth = windowWidth;
    mupiHeight = windowHeight;
    background(0);


    for(let i=0;i<8;i++){
        balls[i]=new Ball(oreo)
      }

      for(let i=0;i<3;i++){
        boom[i]=new Boom(bomba)
      }
}


function validateColissionOreo(){
balls.forEach((cookie,i) => {
  if(dist(cookie.x, cookie.y, controllerX, windowHeight-425)<40){
    balls.splice(i,1);
    puntaje(5)
    

    
  }
  
});
}

function validateColissionBomba(){
  boom.forEach((bomb,i) => {
    if(dist(bomb.x, bomb.y, controllerX, windowHeight-425)<40){
      console.log("funciona")
      boom.splice(i,1);
      menosPuntaje(3)
      console.log(score);
      
    }
    
  });
  }

function puntaje(number){
  score+=number

}

function menosPuntaje(number){
  score-=number

}

function galletasPerdidas(number){
perdidas += number
console.log(perdidas)
}

function moreCookies(){
  
  balls.forEach((cookie,i) => {
    if(cookie.y > windowHeight){
      balls.push(new Ball(oreo));
      balls.splice(i,1);
      galletasPerdidas(1)  
      
    }
cookie.show()
  })
}

function moreBomba(){
  
  boom.forEach((bomb,i) => {
    if(bomb.y > windowHeight){
      boom.push(new Boom(bomba));
      boom.splice(i,1);
}
bomb.show()
  })
}






function draw() {
    background(255);
  
    
  
if(pantalla===0){
  image(inicio,0,0,788,1067)
  

  
}

if(pantalla===1){
  image(instrucciones,0,0,788,1067)
}




if (pantalla===2){
  
    image(fondoJuego,0,0,788,1067)
    image(vaso,controllerX, windowHeight-400,147,265)
    

  for(let i=0;i<balls.length;i++){
    balls[i].move()
    balls[i].show()
  }

  for(let i=0;i<boom.length;i++){
    boom[i].move()
    boom[i].show()
  }
  validateColissionOreo()
  validateColissionBomba()
  moreCookies()
  moreBomba()
  fill(255)
  textSize(50)
  text(score,30,30,50,50)
  
}

if(pantalla===3){
  image(desct10,0,0,788,1067)
  cambioPantalla()
}

if(pantalla===4){
  image(desct30,0,0,788,1067)
}

if(pantalla===5){
  image(desct50,0,0,788,1067)
}

if(pantalla===6){
  image(perdio,0,0,788,1067)
  cambioPantalla()
}

if(pantalla===7){
  image(final,0,0,788,1067)
}


if(pantallaMupi===2){
  pantalla=2
}

if(pantalla===2&&perdidas===3){
  console.log('perdiste')
  pantalla=6
}
if(pantalla===2 && score>25&&score<=39 && perdidas<3){
  pantalla=3
}

if(pantalla===2 && score>40&&score<=69&&perdidas<3){
  pantalla=4
}

if(pantalla===2 && score>70&&score<=99&&perdidas<3){
  pantalla=5
}

}




function cambioPantalla(){
  socket.emit('actual-pantalla',{pantallaController:pantalla})
}






socket.on('mupi-instructions', instructions => {

  let { interactions } = instructions;
  switch (interactions) {
      case 2:
          let { rotationX, rotationY, rotationZ } = instructions;
          controllerY = (rotationX * mupiHeight) / 90;
          controllerX = (rotationY * mupiWidth) / 90;
          break;
  }


});

socket.on('pantalla-mupi',message =>{
  let{screenController}=message;
pantallaMupi=screenController

console.log(pantallaMupi)

})

socket.on('mupi-size', deviceSize => {
    let { windowWidth, windowHeight } = deviceSize;
    deviceWidth = windowWidth;
    deviceHeight = windowHeight;
    console.log(`User is using a smartphone size of ${deviceWidth} and ${deviceHeight}`);
    pantalla=1
});


class Ball{
    constructor(image){
      this.image=image
      this.x=Math.random()*700
      this.y=(windowHeight-windowHeight) - Math.random()*600
      this.r=100
      this.dirX=1
      this.dirY=1
      this.aceleracion=1
      this.aceleration()
    }
    aceleration(){
      setTimeout(() =>{
        this.acelaracion += 5
      },2000)}

    move(){
      this.y+=(this.aceleracion)*(this.dirY)
    }
    
    
    show(){
      image(this.image,this.x, this.y,this.r, this.r)
    }

  }

  class Boom{
    constructor(image){
      this.image=image
      this.x=Math.random()*700
      this.y=(windowHeight-windowHeight) - Math.random()*600
      this.dirX=1
      this.dirY=1
    }
  
    move(){
      this.y+=(1)*(this.dirY)
    }
  
    show(){
      image(this.image,this.x, this.y,87, 139)
    }

  }