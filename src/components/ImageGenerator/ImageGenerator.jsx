import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'

const ImageGenerator = () => {

  const [imageUrl, setImageUrl] = useState("/");
  let inputRef = useRef(null);

  const imageGenerator = async() => {
    if (inputRef.current.value==="") {
      return 0;
    } 

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
            "Bearer AIzaSyCp0om6klP6zCpY54RhS7ubsuP9FMaplJw",
            "User-Agent":"Chrome",
          },
          body:JSON.stringify({
            prompt: `${inputRef.current.value}`,
            n:1,
            size:"512x512",
          }),
        }
      );
      let data = await response.json();
      console.log(data);
  }

  return (
    <div className='ai-image-generator'>
      <div className="header">Ai Image <span>generator</span></div>
      <div className="img-loading">
        <div className="image"><img src={imageUrl === "/" ? default_image : imageUrl} alt="" /></div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See' />
        <div className="generate-btn" onClick={() => {imageGenerator()}}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator

