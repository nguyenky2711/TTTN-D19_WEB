import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { addProductToCartThunk, getCartThunk } from "../../store/action/cart";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const ProductCard = ({ data }) => {
  // console.log(data[0]?.itemDTO?.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNext = () => {
    navigate(`/detail_product/${data[0]?.itemDTO?.data?.id}`);
  };
  const handleAddtoCart = () => {
    const sendData = new FormData();
    sendData.append("product_id", data[0]?.id);
    sendData.append("quantity", 1);
    dispatch(addProductToCartThunk(sendData)).then((res) => {
      dispatch(getCartThunk([0, 100])).then((res) => {});
      if (res?.error?.message == "Request failed with status code 401") {
        toast.error("Vui lòng đăng nhập để sử dụng chức năng này", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "red", backgroundColor: "#D7F1FD" },
        });
      } else if (res?.payload?.message == "Product already exists in cart.") {
        toast.error("Sản phẩm đã có trong giỏ hàng", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "red", backgroundColor: "#D7F1FD" },
        });
      } else {
        toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#D7F1FD" },
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 4000);
      }
    });
  };
  return (
    <div className="product_card">
      <div className="product_card-img">
        <img
          src={`http://localhost:4000/uploads/${data[0]?.itemDTO?.imageDTO[0]?.name}`}
          alt=""
        />
        <p onClick={handleNext}>Xem chi tiết</p>
      </div>
      <div className="product_card-content">
        <div className="product_card-price">
          <p>
            $ <span>{data[0]?.priceDTO[0]?.price}</span>
          </p>
        </div>
        <div className="product_card-name">
          <span onClick={handleNext}>{data[0]?.itemDTO?.data?.name}</span>
        </div>
        <div className="product_card-button">
          <button onClick={handleAddtoCart}>Thêm vào giỏ hàng</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
