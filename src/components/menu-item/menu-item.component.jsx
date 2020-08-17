import React from 'react';
// 'withRouter' is a higher order component
// is a func that takes any component as an argument
// && modifies it in some way
// && then returns new modified component.
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

// by wrapping, we now have access to 'history'
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
  return (
    <div
      className={`${size} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
        className='background-image'
      />
      <div className='content'>
        <h1 className='title'>{ title }</h1>
        <span className='subtitle'>SHOW NOW</span>
      </div>
    </div>
  )
};

// pass 'MenuItem' into 'withRouter'
// 'withRouter' will return us back with the same name of this 'MenuItem' (a super powered 'MenuItem' component)
// which access to those location/match/history props
export default withRouter(MenuItem);