import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

const Bennar = () => {
  return (
    <>
     

      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://img.freepik.com/free-vector/flat-design-minimal-technology-youtube-thumbnail_23-2149146024.jpg?w=1060&t=st=1702201561~exp=1702202161~hmac=18c828dbfbcfba2c7ec6d3264e000fb2a8c4510a20cda080a736c2fe7e57f95b"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://img.freepik.com/premium-psd/banner-black-friday-portuguese-3d-render-marketing-campaign-brazil_363450-5709.jpg?w=1380"
            alt="Second slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="https://img.freepik.com/free-psd/landing-page-cyber-monday-template_23-2148707043.jpg?w=1380&t=st=1702727523~exp=1702728123~hmac=7bf4ffe4fc78b37ee0edb65a48a64d0d0f1cc7796848ba14bbc4d5b7adb6b9f4"
            alt="Third slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Bennar;
