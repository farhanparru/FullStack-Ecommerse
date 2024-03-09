import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import one from  '../src/assets/Banrre lap.png'
import two from '../src/assets/new2.jpg'
import three from '../src/assets/last.jpg'


const Bennar = () => {
 
    
     return (
      <>
    <Carousel fade>
      <Carousel.Item>
        <img src={one} alt="First slide" style={{ width: '100%', height: '405%' }} />
        <Carousel.Caption>
          <h3>BEST PLATFROM</h3>
          <p>Number One of World India</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={two} alt="Second slide" style={{ width: '100%', height: '405%' }} />
        <Carousel.Caption>
        <h3>BEST PLATFROM</h3>
          <p>Number One of World India</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={three} alt="Third slide" style={{ width: '100%', height: '300%' }} />
        <Carousel.Caption>
        <h3>BEST PLATFROM</h3>
          <p>Number One of World India</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  );
}

export default Bennar;