import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import ProductItem from "./ProductItem";

const ProductNew = () => {
    const [productNew, setProductNew] = useState([]);
    useEffect(() => {
        (async ()=>{
            const res = await ProductService.list_new(8);
            setProductNew(res.products);
        })()
    },[])
  return (
    <>
        {productNew && productNew.length >0 &&productNew.map((product)=>{
            return(
                <div key={product.id} className="col-md-3 col-sm-6">
                    <ProductItem product = {product}/>
                </div>
            )
        })}
    </>
  )
}

export default ProductNew