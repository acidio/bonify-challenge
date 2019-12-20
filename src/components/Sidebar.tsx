import React from 'react';

import './Sidebar.css';

const Sidebar: React.FC = ({ children }) => {
  return (
    <div id="sidebar">
      <h1>Latests videos</h1>
      {children}
    </div>
  );
};

export default Sidebar;
