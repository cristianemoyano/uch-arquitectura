import Layout from "@/components/layout/layout";
import ListAdminProducto from "@/components/producto/listAdminProducto";
import FormProducto from "@/components/producto/formProducto";
import ListClientProducto from "@/components/producto/listClientProducto";

export default function Producto(){

    return(
        <>
            
            <FormProducto></FormProducto>
            <ListAdminProducto></ListAdminProducto> 
            <ListClientProducto></ListClientProducto>
        </>
    )
}