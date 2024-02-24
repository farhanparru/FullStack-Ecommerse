import React from 'react'
import '../ProdcutList/Video.css'
import BgNew  from  '../../../assets/BgVideo.mp4';


const Video = () => {
  return (
    <div className='landingpage'>
      
      <video src={ BgNew} autoPlay muted loop class="Video-bg"/>
      <div className='bg-overlay'></div>
     <div className='navbar'></div>


     <div className='home-text'></div>
     <h1>This is Number one of Brand </h1>
     <p> Allso Brand Avlaible</p>
    </div>
  )
}

export default Video
