import React, { PropsWithChildren } from "react";
import Navbar from "../navbar/navbar";


const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
        <Navbar />
        <div className="pt-16"></div>
          {children}
          
        
    </>
  );
};
export default Layout;
