var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

canvas.height=400;
canvas.width=500;
canvas.style.border="1px solid"
var images = {
  accessories:["glasses","ice","hands","makeup","none"],
  mouth:["smile","tired","yum","rage","bucktooth","teeth","surprise","scream","makeup"],
  eyes:["basic","tired","yum","rage","down","open"],
  eyebrows:["tired","none"],
  face:["basic","rage","cold","mind_blown","surprise","clown"]
};
var loaded = {};

let drawIndex = {
  face:0,
  mouth:0,
  eyes:0,
  eyebrows:0,
  accessories:0
}

function loop(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Object.keys(drawIndex).forEach((key,index) =>{
    try{
      ctx.drawImage(loaded[key][images[key][drawIndex[key]]],0,0,400,400);
    }catch(e){}
  });

  Object.keys(images).forEach((key,index) =>{
    ctx.fillStyle="black";
    ctx.fillRect(450,index*88,50,50)
  })
  setTimeout(loop,100);
}

loop();

Object.keys(images).forEach(key => {
  if(typeof images[key] ==="object"){
    for(let i = 0;i<images[key].length;i++){
      if(images[key]!=="none"){
        let img = new Image;
        img.src = "./assets/"+key+"/"+images[key][i]+".svg";
        img.onload = function(){
          if(!loaded.hasOwnProperty(key)){
            loaded[key]=[];
          }
          loaded[key][images[key][i]]=img;
        };
      }
    }
  }else{
    let img = new Image;
    img.src = "./assets/"+key+"/"+images[key]+".svg";
    img.onload = function(){
      if(!loaded.hasOwnProperty(key)){
        loaded[key]=[];
      }
      loaded[key]=img;
    };
  }
});

canvas.addEventListener("click", (e)=>{
  let mouseX = e.clientX;
  let mouseY = e.clientY;
  if(mouseX>450){
    if(mouseY<50){
      if(images.face.length-1>drawIndex.face){
        drawIndex.face++;
      }else{
        drawIndex.face=0;
      }
    }else if(mouseY>88 && mouseY<88+50){
      if(images.mouth.length-1>drawIndex.mouth){
        drawIndex.mouth++;
      }else{
        drawIndex.mouth=0;
      }
    }else if(mouseY>88*2 && mouseY<(88*2)+50){
      if(images.eyes.length-1>drawIndex.eyes){
        drawIndex.eyes++;
      }else{
        drawIndex.eyes=0;
      }
    }else if(mouseY>88*3 && mouseY<(88*3)+50){
      if(images.eyebrows.length-1>drawIndex.eyebrows){
        drawIndex.eyebrows++;
      }else{
        drawIndex.eyebrows=0;
      }
    }else if(mouseY>88*4 && mouseY<(88*4)+50){
      if(images.accessories.length-1>drawIndex.accessories){
        drawIndex.accessories++;
      }else{
        drawIndex.accessories=0;
      }
    }
  }
});

function download(){
  let img = new Image;
  img.src=canvas.toDataURL("image/png");
  img.onload = ()=>{
    var canvas1=document.createElement('canvas');
    var ctx1=canvas1.getContext('2d');
    canvas1.width=400;
    canvas1.height=400;
    ctx1.drawImage(img,0,0,400,400,0,0,400,400);
    let newImg = canvas1.toDataURL("image/png");
    let link = document.createElement("a");
    link.download = "emoji.png";
    link.href = newImg;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
    delete copy;
  }
}

function downloadAll(){
  for(let a = 0;a<images.face.length;a++){
    for(let b = 0;b<images.mouth.length;b++){
      for(let c = 0;c<images.eyes.length;c++){
        for(let d = 0;d<images.eyebrows.length;d++){
          for(let e = 0;e<images.accessories.length;e++){
            possibility={
              face:a,
              mouth:b,
              eyes:c,
              eyebrows:d,
              accessories:e
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            Object.keys(possibility).forEach((key,index) =>{
              try{
                ctx.drawImage(loaded[key][images[key][possibility[key]]],0,0,400,400);
              }catch(err){}
            });

            let img = new Image;
            img.src=canvas.toDataURL("image/png");
            img.onload = ()=>{
              var canvas1=document.createElement('canvas');
              var ctx1=canvas1.getContext('2d');
              canvas1.width=400;
              canvas1.height=400;
              ctx1.drawImage(img,0,0,400,400,0,0,400,400);
              let newImg = canvas1.toDataURL("image/png");
              let link = document.createElement("a");
              link.download = images["face"][a]+"-"+images["mouth"][b]+"-"+images["eyes"][c]+"-"+images["eyebrows"][d]+"-"+images["accessories"][e]+".png";
              link.href = newImg;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              delete link;
              delete copy;
            }
          }
        }
      }
    }
  }
}
