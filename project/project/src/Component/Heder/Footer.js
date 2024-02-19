import React from 'react';

const Footer = () => {
  return (
    <>
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div>
            <h3>Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3>Follow Us</h3>
            <p>Twitter</p>
            <p>Facebook</p>
            <p>Instagram</p>
          </div>
        </div>
        <div style={styles.bottomText}>
          <p>&copy; 2024 Your Website. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '25px 0',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  bottomText: {
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default Footer;
