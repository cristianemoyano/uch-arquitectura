import FormProducto from "@/components/products/formProducts";
import ListAdminProducto from "@/components/products/listAdminProducts";
import ListClientProducto from "@/components/products/listClientProducts";


export default function Producto(){

    return(
        <>
            <FormProducto></FormProducto>
            <ListAdminProducto></ListAdminProducto> 
        </>
    )
}