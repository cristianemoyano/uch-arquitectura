import FormProducts from "@/components/products/formProducts";
import withAuth from "@/components/shared/authHOC";

function Products() {
    return(
        <>
            <FormProducts></FormProducts>
        </>
    )
}
export default withAuth(Products, true);