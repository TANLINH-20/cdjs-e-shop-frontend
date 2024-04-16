import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import ProductItem from "./ProductItem";

const ProductSale = () => {
    const [productSale, setProductSale] = useState([]);
    useEffect(() => {
        (async ()=>{
            const res = await ProductService.list_sale(8);
            setProductSale(res.products);
        })()
    },[])
  return (
    <>
        {productSale && productSale.length >0 &&productSale.map((product)=>{
            return(
                <div key={product.id} className="col-md-3 col-sm-6">
                    <ProductItem product = {product}/>
                </div>
            )
        })}
    </>
  )
}

export default ProductSale