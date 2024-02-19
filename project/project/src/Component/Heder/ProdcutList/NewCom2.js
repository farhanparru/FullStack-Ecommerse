import React from 'react';

const NewCom2 = () => {
  return (
    <div style={style.parent}>
      <img
        src='https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg'
        alt='iPhone 15'
      />

      <div style={style.typography}>
        <p style={style.new}>
          The 48MP Main camera is more advanced than ever, capturing super‑high‑resolution photos with a{' '}
          <strong style={style.strongTransform}>new level of detail and colour</strong>
        </p>
        <p style={style.new}>
          You’ll see the improvements in your portraits. And now you no longer have to switch to Portrait mode. If your subject is a person, dog, or cat, iPhone automatically captures depth information. So you can choose to instantly{' '}
          <strong style={style.strongTransform}>see your photo as a portrait</strong>, with an artful blur effect. Or later in the Photos app.
        </p>
      </div>
    </div>
  );
};

const style = {
  parent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem 2rem',
    gap:"11px"
  },
  typography: {
    fontSize: '21px',
    lineHeight: '1.381',
    fontWeight: 600,
    letterSpacing: '0.011em',
    fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif',
    width:"46rem"
  },

  new: {
    transform: 'translateY(51px)',
    opacity: 20,
    pointerEvents: 'auto',
  },

  strongTransform: {
    // Add your transformation styles for <strong> here
    display: 'inline-block',
    transition: 'transform 0.3s ease-in-out',
  },
};

export default NewCom2;
