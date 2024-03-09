import React from 'react';
import '../ProdcutList/Video.css';

import  video  from '../../../assets/last.mp4';

const Video = () => {
  return (
    <div className='landingpage' style={{margin:"14px"}}>
      <video src={video} autoPlay muted loop className="Video-bg" />
      <div className='bg-overlay'></div>
      <div className='navbar'></div>
      <div className='home-text'></div>
      <h1>This is Number one of Brand </h1>
      <p>Also Brand Available</p>
    </div>
  );
}

export default Video;
