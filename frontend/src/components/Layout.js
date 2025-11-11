import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-cream-50">
      <main>{children}</main>
    </div>
  );
};

export default Layout;