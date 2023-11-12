import Layout from "@/components/layout/layout";
import ListAdminProducts from "@/components/products/listAdminProducts";
import withAuth from "@/components/shared/authHOC";

function Products() {
    return(
        <>
            <ListAdminProducts></ListAdminProducts> 
        </>
    )
}

export default withAuth(Products, true);