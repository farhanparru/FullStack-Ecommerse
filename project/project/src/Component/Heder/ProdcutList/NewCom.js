import React from 'react';

const NewCom = () => {
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', overflow: 'hidden', maxWidth: '100%' }}>
      <iframe
      
        title="Embedded YouTube Video"
        src="https://www.youtube.com/embed/XHTrLYShBRQ?autoplay=1&mute=1"
        frameBorder="0"
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      ></iframe>
    </div>
  );
};

export default NewCom;
