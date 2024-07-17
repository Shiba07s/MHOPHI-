import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ className = '' }) => {
  return (
    <div>
    <div className={`header ${className}`}>
      <div className="headerChild" />
      <img className="maskGroupIcon" alt="" src="/mask-group@2x.png" />
      <img className="headerItem" alt="" src="/group-4.svg" />
      <img className="headerInner" alt="" src="/group-3.svg" />
      <div className="rectangleParent">
        <div className="groupChild" />
        <img
          className="magnifyingGlass1Icon"
          alt=""
          src="/magnifyingglass-1.svg"
        />
        <div className="searchForSomething">Search for something</div>
      </div>
      <div className='project-name'>
      <div className="navbar-logo">
        <img src="https://xbui-hlie-qbta.m2.xano.io/vault/MUW8Xu0D/Ziv4zuHXgVt3Jq4E5u_bvoxeLJI/H2Zz2g../512x512.png" alt="Logo" />
      </div>
        {/* <h1 style={{color: '#82659C',left: '1%'}}>MHOPHI</h1> */}
      </div>
      <div className="frameParent">
        {/* <div className="dashboardParent">
          <div className="dashboard" style={{color: '#82659C'}}>Dashboard</div>
          <img className="frameIcon" alt="" src="/frame.svg" />
        </div> */}
        {/* <div className="ordersProductDetails">
          Order’s Product Details
        </div> */}
      </div>
    </div>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;