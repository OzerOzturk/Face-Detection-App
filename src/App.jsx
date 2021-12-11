import { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js'
import './App.css';

function App() {
const imgRef= useRef();
const canvasRef= useRef();

const handleImage = async () => {
  const detections = await faceapi
    .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceExpressions();

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
    faceapi.matchDimensions(canvasRef.current, {
      width:950,
      height:750,
    })

    const resized = faceapi.resizeResults(detections,{
      width:950,
      height:750,
    })

    faceapi.draw.drawDetections(canvasRef.current,resized);
    faceapi.draw.drawFaceExpressions(canvasRef.current,resized);
    faceapi.draw.drawFaceLandmarks(canvasRef.current,resized);
};

useEffect(() => {
 const loadModels =() => {
   Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
   ])
    .then(handleImage)
    .catch((e) => console.log(e))
 };

 imgRef.current && loadModels();
  
},[]);



  return (
    <div className="app">
        <img
        crossOrigin='anonymous'
        ref={imgRef}
        src="https://images.unsplash.com/photo-1590650486895-79681b6f26a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
        alt="" 
        width='950' h
        eight='750' />
        <canvas ref={canvasRef} width='950' height='750'/>
    </div>
  );
};

export default App;
