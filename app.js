const canvas = document.getElementById("jsCanvas");
const ctx =  canvas.getContext("2d");
const colors = document.getElementsByClassName('jsColor');
const controlRange = document.querySelector('#jsRange');
const controlMode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const signImg = document.getElementById('jsImg');

canvas.width = 218;
canvas.height = 100;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;


ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);
const FILL_TEXT = "FILL";
const PAINT_TEXT = "PAINT";

function startPainting(){
    painting = true;
}

let filling = false;
let painting = false;

function onMouseMove(event){
    const x= event.offsetX;
    const y= event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    

}

function onMouseDown(event){
    painting = true;
}

function stopPainting(event){
    painting = false;
}

function handleChangeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    

}

function handleCm(event){

    event.preventDefault();
    console.log(event);
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    //link.download = "hello";
    //link.click();
    console.log(image);

    
    // const ajax = new XMLHttpRequest();
    // ajax.open("POST", "http://localhost:8080/files/dumm", false);
    // ajax.onreadystatechange = function() {
        // console.log(ajax.responseText);
    // }
    // ajax.setRequestHeader("Content-Type", "application/json");
  

    // ajax.onreadystatechange = function() {
    // console.log(ajax.responseText);
//   }

  var blobBin = atob(image.split(',')[1]);	// base64 데이터 디코딩
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], {type: 'image/png'});	// Blob 생성
    var formdata = new FormData();	// formData 생성
    formdata.append("file", file);	// file data 추가
  //ajax.send("data=" + formdata);

    formdata.append("webmasterfile", file);

    var request = new XMLHttpRequest();
    request.open("POST", "https:api.pugshop.co.kr/files/dumm");
    request.send(formdata);
      
    setTimeout(reload,1000);
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCm);
}
function handleChangeLineWidth(event){
    ctx.lineWidth = event.target.value;
    console.log(event.target.value);
}

function handleChangeMode(event){
    
    if(filling === true){
        event.target.innerText = FILL_TEXT;
        filling= false;
        
    }else{
        event.target.innerText = PAINT_TEXT;
        filling = true;
        ctx.fillStyle = ctx.strokeStyle;
        
    }

}


function reload(){
    console.log('reload');
        location.reload(true);

}

function checkUrl(url){
   const img = new Image();
   img.onload = function(){

    canvas.classList.add('noned');    
    saveBtn.classList.add('noned');    
    
    signImg.src="https://s3.ap-northeast-2.amazonaws.com/storage.rankup.storelink.io/notices/blob.png";
    
   } 
   img.onerror = function(){
    signImg.classList.add('img');
    

    } 
    img.src = url;
    //setTimeout(reload,5000);


 }

function init(){
    Array.from(colors).forEach(colors => colors.addEventListener("click",handleChangeColor));
    saveBtn.addEventListener("click",handleSaveClick);
    
    checkUrl('https://s3.ap-northeast-2.amazonaws.com/storage.rankup.storelink.io/notices/blob.png');
}
init();
