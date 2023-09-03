import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Metadata from "./Metadata";
import { Link } from "react-router-dom";
import "./single.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const SingleProduct = ({ cartItems, setCartItems }) => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const [mainImage, setMainImage] = useState(null); // Initialize to null
  const handleImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dosomethingbackend-anish-stack.vercel.app/products/${productId}`
        );
        setProduct(response.data.product);

        // Set the main image after product data is fetched
        if (response.data.product.images.length > 0) {
          setMainImage(response.data.product.images[0]);
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [productId]);
  const colorArray = [];

  if (!product) {
    return <div>Loading...</div>;
  }
  const addToCart = () => {
    // Validate quantity
    console.log("Product ID:", product._id);
    if (quantity <= 0) {
      toast.error("Please select a quantity greater than 0.");
      return;
    }

    // Create a new cart item object
    const newItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      productImg: product.images,
      quantity,
    };

    // Update the cart items using setCartItems
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);

    // Display a success message
    toast.success("Product added to cart!");
  };

  return (
    <div className="main-containerr">
      <Metadata title="Quick View" />
      <div className="container2">
        <div className="single-product">
          <div className="row">
            <div className="col-6">
              <div className="product-image">
                <div className="product-image-main">
                  {mainImage && (
                    <img
                      src={mainImage}
                      alt={product.name}
                      id="product-main-image"
                    />
                  )}
                </div>
                <div className="product-image-slider">
                  {product &&
                    product.images.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={product.name}
                        className="image-list"
                        onClick={() => handleImageClick(imageUrl)}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="breadcrumb">
                <span>
                  <Link to="/">Home</Link>
                </span>
                <span>
                  <Link to="/">Product</Link>
                </span>
                <span className="active">{product.category}</span>
              </div>

              <div className="product">
                <div className="product-title">
                  <h2>{product.name}</h2>
                </div>
                <div className="product-rating" style={{ display: "flex" }}>
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.0972 19.25C15.9506 19.2506 15.806 19.216 15.6755 19.1492L11.0005 16.7017L6.32551 19.1492C6.17371 19.229 6.00255 19.2647 5.8315 19.252C5.66045 19.2394 5.49637 19.1791 5.35791 19.0779C5.21945 18.9767 5.11216 18.8386 5.04824 18.6795C4.98433 18.5203 4.96635 18.3464 4.99635 18.1775L5.91301 13.0167L2.13635 9.35003C2.01852 9.23244 1.93493 9.08499 1.89456 8.9235C1.85418 8.762 1.85855 8.59256 1.90718 8.43336C1.96031 8.27044 2.05804 8.12568 2.18929 8.0155C2.32053 7.90532 2.48003 7.83414 2.64968 7.81003L7.87468 7.04919L10.1755 2.34669C10.2506 2.19171 10.3678 2.061 10.5137 1.96955C10.6596 1.8781 10.8283 1.82959 11.0005 1.82959C11.1727 1.82959 11.3414 1.8781 11.4873 1.96955C11.6333 2.061 11.7505 2.19171 11.8255 2.34669L14.1538 7.04003L19.3788 7.80086C19.5485 7.82497 19.708 7.89616 19.8392 8.00634C19.9705 8.11652 20.0682 8.26128 20.1213 8.42419C20.17 8.58339 20.1743 8.75283 20.134 8.91433C20.0936 9.07582 20.01 9.22327 19.8922 9.34086L16.1155 13.0075L17.0322 18.1684C17.0649 18.3402 17.0478 18.5178 16.9828 18.6803C16.9178 18.8427 16.8077 18.9832 16.6655 19.085C16.4995 19.2014 16.2997 19.2594 16.0972 19.25Z"
                        fill={index < product.ratings ? "#FFD700" : "#1F2937"}
                      />
                    </svg>
                  ))}
                </div>
                <div className="product-price">
                  <span className="offer-price"> Rs {product.price}</span>
                  <span className="sale-price"> Rs {product.Cancelprice}</span>
                </div>

                <div className="product-details">
                  <h3>Description</h3>
                  <p>{product.description}</p>
                </div>
                {product.sizes &&
                  product.sizes.length > 0 &&
                  // Check if the product category is "cloth" or "shoes"
                  (product.category === "cloth" ||
                    product.category === "shoes") && (
                    <div className="product-size">
                      <h4>Size</h4>
                      <div className="size-layout">
                        {product.sizes.map((size, index) => (
                          <div key={index}>
                            <input
                              type="radio"
                              name="size"
                              value={size}
                              id={`size-${size}-${index}`}
                              className="size-input"
                            />
                            <label
                              htmlFor={`size-${size}-${index}`}
                              className="size"
                            >
                              {size}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  style={{
                    marginTop: "4px",
                    width: "40px",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    outline: "none",
                    fontSize: "14px",
                  }}
                />

                <div className="product-color">
                  <h4>Color</h4>
                  <div className="color-layout">
                    {colorArray.map((color, index) => (
                      <div key={index}>
                        <input
                          type="radio"
                          name="colors"
                          value={color}
                          className="colors-input"
                          style={{
                            backgroundColor:
                              product.colors && product.colors.includes(color)
                                ? color
                                : "transparent",
                          }}
                        />
                        <label
                          htmlFor={color}
                          className="colors-label"
                          style={{ backgroundColor: color }}
                        ></label>
                      </div>
                    ))}
                  </div>
                </div>

                <span className="divider"></span>

                <div className="product-btn-group">
                  <div className="button buy-now" onClick={addToCart}>
                    <i className="bx bxs-zap"></i> Add To Cart
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SingleProduct;
