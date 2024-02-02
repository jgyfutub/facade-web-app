import React, { useEffect, useState, useRef  } from 'react'
import axios from 'axios';

export default function Dashboard(){
    const canvasRef = useRef(null);
    const [rectangles, setRectangles] = useState([]);
    const [displayRect,setdisplayRect]=useState(false)
    const [sliderValue, setSliderValue] = useState(0);
    const [sliderValue1, setSliderValue1] = useState(0);
    const [sliderValue2, setSliderValue2] = useState(0); 
    const [sliderValue3, setSliderValue3] = useState(0);
    const [rectlength,setreactlength]=useState(0)
    const [rectbreadth,setreactbreadth]=useState(0)
    const [rectX,setrectX]=useState(0)
    const [rectY,setrectY]=useState(0)
    const [color,setColor]=useState('white')

    const handleSliderChange = (event) => {
      setSliderValue(Number(event.target.value));
      setreactlength(Number(event.target.value))
    };
    const handleSliderChange1 = (event) => {
        setSliderValue1(Number(event.target.value));
        setreactbreadth(Number(event.target.value))
      };
    
      const handleSliderChange2 = (event) => {
        setSliderValue2(Number(event.target.value));
        setrectX(Number(event.target.value))
      };
      const handleSliderChange3 = (event) => {
          setSliderValue3(Number(event.target.value));
          setrectY(Number(event.target.value))
        };
      const handleColor=(e)=>{
        setColor(e.target.value)
      }
  const handleSaveAsImage =async () => {
          const canvas = canvasRef.current;
          const dataUrl = canvas.toDataURL('image/jpeg');
          const formdata=new FormData()
          formdata.append('image',dataUrl)
          console.log(formdata)
          const senddata=await axios.post('http://127.0.0.1:5000/facadegenerator/',formdata)
          const a = document.createElement('a');
          console.log(dataUrl)
          a.href = dataUrl;
          a.download = 'canvas_image.jpg';
          a.click();
        };
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 256;
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    rectangles.forEach((rect) => {
      ctx.fillStyle =rect.color
      ctx.fillRect(rect.rectX, rect.rectY, rect.rectlength,rect.rectbreadth)
    })
    if(displayRect){
    console.log(rectlength)
    ctx.fillStyle = color; 
    ctx.fillRect(rectX, rectY, rectlength,rectbreadth);}
  }, [displayRect,rectlength,rectbreadth,rectX,rectY,color]);
  const handleinput=(e)=>{
    setdisplayRect((prevState) => !prevState)
  }
  const handleRectinput=(e)=>{
    setRectangles((prevRectangles) => [
      ...prevRectangles,
      { rectX, rectY, rectlength,rectbreadth,color, id: prevRectangles.length + 1 },
    ]);
    setreactlength(0)
    setreactbreadth(0)
    setrectX(0)
    setrectY(0)
    setColor('white')
  }
  return<div>
   <div style={{display:'grid',justifyContent:'center',rowGap:20,marginTop:10}}><canvas ref={canvasRef} />
  <button onClick={handleinput}>Press</button>
  <input
        type="range"
        id="slider"
        name="slider"
        min="0"
        max="256"
        value={sliderValue}
        onChange={handleSliderChange}
      />
      <input
        type="range"
        id="slider"
        name="slider"
        min="0"
        max="256"
        value={sliderValue1}
        onChange={handleSliderChange1}
      />
      <input
        type="range"
        id="slider"
        name="slider"
        min={0}
        max={256}
        value={sliderValue2}
        onChange={handleSliderChange2}
      />
      <input
        type="range"
        id="slider"
        name="slider"
        min={0}
        max={256}
        value={sliderValue3}
        onChange={handleSliderChange3}
      />
      <span>Choose the color desired<br/>(if not chosen assumed white)</span>
      <div style={{display:'flex',columnGap:20}}>
        <button value='red' onClick={handleColor}>red</button>
        <button value='yellow' onClick={handleColor}>yellow</button>
        <button value='green' onClick={handleColor}>green</button>
        <button value='orange' onClick={handleColor}>orange</button>
      </div>
      <button onClick={handleRectinput}>add rectangle</button>
      <button onClick={handleSaveAsImage}>Save as Image</button>
      <h2>Instructions Table</h2>
      </div>
      <table style={{display:'grid',justifyContent:'center',rowGap:20}}>
  <tbody >
    <tr>
      <td>Press the Press button to see the changes you are doing and press <br/>it again if you dont want to see the changes you are doing </td>
    </tr>
    <tr>
      <td>Once a box is made by changing the sliding inputs press save Image if you are satisfied</td>
    </tr>
    <tr>
      <td>If not satisfied press add rectangle button to add another shape</td>
    </tr>
    <tr>
      <td>Also you can change the color (originally will be assumed white)</td>
    </tr>
  </tbody>
</table>
</div>
}