import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";


export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(12); 
  
  async function getProducts() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    console.log(data.data);
    setProducts(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const handleShowMore = () => {
    setVisibleProducts(visibleProducts + 12);
  };

  let { addToCart } = useContext(CartContext);
  async function postToCart(id) {
    let { data } = await addToCart(id);
    if (data.status == "success") {
      toast.success(data.message);
    } else {
      toast.error('Failed to add the data to the cart',  {duration: 1000});
    }
    console.log(data)
  }

  return (
    <>
      <h2>Featured Products</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      ) : (
        <div className="row gy-4">
          {products.slice(0, visibleProducts).map((product) => (
            <div key={product.id} className="col-lg-2">
              <Link to={`/productdetails/${product.id}`}>
                <div className="product">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="img-fluid"
                  />
                  <span className="font-sm text-main">
                    {product.category.name}
                  </span>
                  <h3 className="h5">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex py-3 justify-content-between align-items-center">
                    <span className="font-sm">{product.price} EGP</span>
                    <span className="font-sm">
                      <i className="fa fa-star rating-color me-2">
                        {product.ratingsAverage}
                      </i>
                    </span>
                  </div>
                </div>
              </Link>
              <button onClick={() => postToCart(product.id)} className="btn bg-main text-main-light">
                Add to cart
              </button>
            </div>
          ))}

          {visibleProducts < products.length && (
            <div className="text-center my-4">
              <button className="btn btn-primary" onClick={handleShowMore}>
                Show More
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
