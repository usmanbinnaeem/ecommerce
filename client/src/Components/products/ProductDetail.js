import { useParams } from "react-router-dom";
import products from "../../assets/Products/products";

const ProductDetail = () => {
    const {slug} = useParams();
    const product = products[slug];

    if(!product){
        return <h2>not Found</h2>
    }

    const {name, img} = product;

    return (
        <div>
            <h2>{name}</h2>
            <img src = {img} alt = {name} />
        </div>
    )
}

export default ProductDetail
