score_leftwrist=0;
score_rightwrist=0;

leftwristX=0;
rightwristX=0;
rightwristY=0;
leftwristY=0;
song="";

function preload(){
song=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function gotPoses(results){
if (results.length>0) {
console.log(results); 
leftwristX=results[0].pose.leftWrist.x;
rightwristX=results[0].pose.rightWrist.x;
leftwristY=results[0].pose.leftWrist.y;
rightwristY=results[0].pose.rightWrist.y;
score_leftwrist=results[0].pose.keypoints[9].score;
score_rightwrist=results[0].pose.keypoints[10].score;
}
}

function modelLoaded(){
console.log("Model is loaded");
}

function draw(){
image(video,0,0,600,500);
fill("blue");
stroke("blue");
if(score_rightwrist > 0.2){
circle(rightwristX,rightwristY,20);
if(rightwristY > 0 && rightwristY <= 100){
document.getElementById("speed").innerHTML="speed = 0.5x";
song.rate(0.5);
}
else if(rightwristY > 100 && rightwristY <= 200){
document.getElementById("speed").innerHTML="speed = 1x";
song.rate(1);
}
else if(rightwristY > 200 && rightwristY <= 300){
document.getElementById("speed").innerHTML="speed = 1.5x";
song.rate(1.5);
}
else if(rightwristY > 300 && rightwristY <= 400){
document.getElementById("speed").innerHTML="speed = 2x";
song.rate(2);
}
else if(rightwristY > 400 && rightwristY <= 500){
document.getElementById("speed").innerHTML="speed = 2.5x";
song.rate(2.5);
}
}
if(score_leftwrist>0.2){
circle(leftwristX,leftwristY,20);
numb_leftwristy=Number(leftwristY);
remove_decimals=Math.floor(numb_leftwristy);
volume=remove_decimals/500
song.setVolume(volume);
document.getElementById("volume").innerHTML="volume = "+volume;
}
}

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}
