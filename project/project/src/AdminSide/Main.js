import React from 'react';
import SideBar from './SideBar';

const Main = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-1" style={{ marginTop: '-870px' }}>
          <SideBar />
        </div>
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-8">
            </div>
            <div className="col-md-4">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
