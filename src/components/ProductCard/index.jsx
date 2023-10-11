import React from "react";
import "./style.scss";
import { NavLink, useNavigate } from "react-router-dom";
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
  const handleScroll = () =>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <div >
    <div className="relative m-auto " data-aos="fade-up" data-aos-duration="1000">
      <div className='relative group ' onClick={() => handleScroll()}>
        <NavLink to={`/detail_product/${data[0]?.itemDTO?.data?.id}`}>
          <div className='h-[380px]' >
            <img className="h-[100%] bg-center ndv__img" src={`http://localhost:4000/uploads/${data[0]?.itemDTO?.imageDTO[0]?.name}`} alt="img" />
            <div className='absolute top-0 w-full h-full opacity-0 bg-img__overplay group-hover:opacity-100'>
            </div>
          </div>
          {data.sale && (
            <div className="absolute w-[100px] z-10 bg-white py-2 px-4 top-3 right-3 text-[#a25f4b] text-sm tracking-widest font-bold">
              On Sale
            </div>
          )}

          <button className="ndv-button absolute z-2 bg-white translate-y-[70%] transition-all opacity-0 group-hover:duration-700 group-hover:translate-y-[0%] duration-600 left-[10%] group-hover:opacity-100 text-[#1d1f2e] " onClick={handleAddtoCart}>
            THÊM GIỎ HÀNG
          </button>

        </NavLink>
      </div>

    </div>
    <div className="mt-[25px] mb-[20px] text-center">
      <p className="ndv-name-product">{data[0]?.itemDTO?.data?.name}</p>
      {
        data.sale ? (<div>
          <span className="text-lg font-bold text-color-second">$ {data.priceOnSale} VND</span>
          <span className="ml-2 line-through text-main">$ {data[0]?.priceDTO[0]?.price} VND</span>
        </div>) : (<p className="text-main">$ {data[0]?.priceDTO[0]?.price} VND</p>)
      }

    </div>

  </div>
  );
};

export default ProductCard;
