import React, { PropsWithChildren } from "react";
import Navbar from "../navbar/navbar";
import Producto from "../producto/producto";


const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
        
        <Navbar />
        <Producto/>
        {children}

    </>
  );
};
export default Layout;
