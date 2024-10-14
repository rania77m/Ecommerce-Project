import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { BallTriangle } from "react-loader-spinner";

export default function Cart() {
  let [products, setProducts] = useState(null);
  let [loading, setLoading] = useState(true);
  let { getCartItems } = useContext(CartContext);

  async function getItems() {
    let { data } = await getCartItems();
    console.log(data);
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <div className="bg-main-light p-2 mt-5">
        <h2>Cart</h2>
        {loading ? (
          <>
            <BallTriangle
              height={50}
              width={50}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </>
        ) : (
          <>
            <p className="text-main">
              Number of cart items: {products.numOfCartItems}
            </p>
            <p className="text-main">
              Total price is: {products.data.totalCartPrice}
            </p>
            {products.data.products.map((product) => (
              <div
                key={product.product.id}
                className="row p-2 align-items-center border-1 m-0 border-bottom"
              >
                <div className="col-md-2">
                  <div className="image-fluid">
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      width={180}
                      height={220}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="item pl-20">
                    <h3 className="h5 fw-bold">
                      {product.product.title.split(" ").splice(0, 3).join(" ")}
                    </h3>

                    <p className="text-main fw-bold">
                      Price: {product.price} EGP
                    </p>
                    <button className="btn">
                      <i className="fas fa-trash-can text-danger"></i>Remove
                    </button>
                  </div>
                </div>
                <div className="col-md-1">
                  <div className="count">
                    <div className="btn brdr p-1">+</div>
                  <span className="mx-2">{product.count}</span>
                    <div className="btn brdr p-1">-</div>

                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
