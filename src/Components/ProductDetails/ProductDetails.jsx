import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  async function ProductDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProduct(data.data);
    console.log(data.data);
    setLoading(false);
  }
  useEffect(() => {
    ProductDetails();
  }, []);
  var settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 1000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
        <>
          <div className="row align-items-center">
            <div className="col-md-4">
              <Slider {...settings}>
                {product.images.map((image) => (
                  <img src={image} alt={image.title} className="w-100" />
                ))}
              </Slider>
            </div>
            <div className="col-md-8">
              <div className="details">
                <h3 className="h5">{product.title}</h3>
                <p className="">{product.description}</p>
                <span className="font-sm">{product.category.name}</span>
                <div className="d-flex py-3 justify-content-between align-items-center">
                  <span className="font-sm text-main">{product.price} EGP</span>
                  <span className="font-sm">
                    <i className="fa fa-star rating-color me-2">
                      {product.ratingsAverage}
                    </i>
                  </span>
                </div>
              </div>
              <button onClick={() => postToCart(product.id)} className="btn bg-main text-main-light w-100 btn-sm">
                Add to cart
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
