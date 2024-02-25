import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import one from  '../src/assets/new1.jpg'
import two from '../src/assets/new2.jpg'
import three from '../src/assets/last.jpg'


const Bennar = () => {
 
    
     return (
      <>
    <Carousel fade>
      <Carousel.Item>
        <img src={one} alt="First slide" style={{ width: '100%', height: '405%' }} />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={two} alt="Second slide" style={{ width: '100%', height: '405%' }} />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={three} alt="Third slide" style={{ width: '100%', height: '300%' }} />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  );
}

export default Bennar;