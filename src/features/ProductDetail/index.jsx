import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./style.scss";

import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useDispatch } from "react-redux";
import {
  getProductByIdThunk,
  getProductByItemIdThunk,
} from "../../store/action/product";
import { addProductToCartThunk, getCartThunk } from "../../store/action/cart";
const ProductDetailPage = () => {
  const url = window.location.href;
  const segments = url.split("/");
  const id = segments[segments.length - 1];
  const dispatch = useDispatch();
  const [productDetail, setProductDetail] = useState([]);
  const [selectProduct, setSelectProduct] = useState({});
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [selectImage, setSelectImage] = useState("");
  const [clickedId, setClickedId] = useState(null);
  useEffect(() => {
    dispatch(getProductByItemIdThunk(id)).then((res) => {
      console.log(res);
      setProductDetail(res?.payload?.productDTO);
      setSelectProduct(res?.payload?.productDTO[0]);
      setPrice(res?.payload?.productDTO[0]?.priceDTO[0].price);
      setStock(res?.payload?.productDTO[0]?.stockDTO[0].stock);
      setClickedId(res?.payload?.productDTO[0]?.id);
      setSelectImage(
        `http://localhost:4000/uploads/${res?.payload?.productDTO[0]?.itemDTO.imageDTO[0].name}`
      );
    });
  }, [dispatch]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const addQuantity = (stock) => {
    if (cartQuantity < stock) {
      const temp = cartQuantity + 1;
      setCartQuantity(temp);
    }
  };
  const subtractQuantity = (stock) => {
    if (cartQuantity > 1) {
      const temp = cartQuantity - 1;
      setCartQuantity(temp);
    }
  };
  const [description, setDescription] = useState("");
  const [careGuide, setCareGuide] = useState("");
  const showContent = (value) => {
    if (value == "description") {
      if (description == "") {
        setDescription(selectProduct?.itemDTO?.data?.description);
      } else {
        setDescription("");
      }
    } else if (value == "careGuide") {
      if (careGuide == "") {
        setCareGuide(selectProduct?.itemDTO?.data?.guide);
      } else {
        setCareGuide("");
      }
    }
  };
  const handleAddtoCart = () => {
    const sendData = new FormData();
    sendData.append("product_id", selectProduct?.id);
    sendData.append("quantity", cartQuantity);
    dispatch(addProductToCartThunk(sendData)).then((res) => {
      dispatch(getCartThunk()).then((res) => {});
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
  const handleClickImage = (event) => {
    const srcValue = event.target.getAttribute("src");
    setSelectImage(srcValue); // Do whatever you want with the srcValue
  };
  const handleStock = (value) => {
    for (var index in productDetail) {
      if (productDetail[index].id == value) {
        setStock(productDetail[index].stockDTO[0].stock);
        setPrice(productDetail[index].priceDTO[0].price);
        setSelectProduct(productDetail[index]);
        setClickedId(value);
        setCartQuantity(1);
      }
    }
  };
  return (
    <div className="container">
      <div className="product_detail-container">
        <div className="product_detail-img">
          <div className="product_detail-img-list">
            {selectProduct?.itemDTO?.imageDTO?.map((item) => {
              return (
                <img
                  src={`http://localhost:4000/uploads/${item.name}`}
                  alt=""
                  onClick={handleClickImage}
                />
              );
            })}
          </div>
          <div className="product_detail-img-show">
            <img src={selectImage} alt="" />
          </div>
        </div>
        <div className="product_detail-content">
          <div className="product_detail-name">
            <h4>{selectProduct?.itemDTO?.data?.name}</h4>
          </div>
          <div className="product_detail-price">
            <p>
              $ <span>{price}</span>
            </p>
          </div>
          <div className="product_detail-selection">
            <h4>Kích thước</h4>
            <div className="product_detail-sizes">
              {productDetail?.map((detail) => {
                return (
                  <div
                    className={`product_detail-size ${
                      clickedId === detail.id ? "clicked" : ""
                    }`}
                    onClick={() => handleStock(detail.id)}
                    key={detail.id}
                  >
                    <p id={detail.id}>{detail?.sizeDTO?.info_size}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="product_detail-selection">
            <h4>Số lượng</h4>
            <div className="product_detail-quantity">
              <RemoveOutlinedIcon onClick={() => subtractQuantity(stock)} />
              {cartQuantity}
              <AddOutlinedIcon onClick={() => addQuantity(stock)} />
            </div>
            <p>
              <span>{stock} sản phẩm có sẵn</span>
            </p>
          </div>

          <div className="product_detail-action">
            <button
              className="product_detail-addToCart"
              onClick={handleAddtoCart}
            >
              Thêm vào giỏ hàng
            </button>
            {/* <button className="product_detail-buy">Mua ngay</button> */}
          </div>
          <div className="product_detail-guarantee">
            <p>
              <VerifiedUserOutlinedIcon />
              <span>Bảo hành 30 ngày đối với tất cả sản phẩm</span>
            </p>
          </div>
          <div className="product_detail-description">
            <div
              className="showContent"
              onClick={() => showContent("description")}
            >
              <p>
                <DescriptionOutlinedIcon /> <span>Mô tả</span>
              </p>
              {description ? (
                <KeyboardArrowUpOutlinedIcon />
              ) : (
                <KeyboardArrowDownOutlinedIcon />
              )}
            </div>
            {<div dangerouslySetInnerHTML={{ __html: description }} />}
          </div>
          <div className="product_detail-careGuide">
            <div
              className="showContent"
              onClick={() => showContent("careGuide")}
            >
              <p>
                <SpaOutlinedIcon /> <span>Hướng dẫn chăm sóc</span>
              </p>
              {careGuide ? (
                <KeyboardArrowUpOutlinedIcon />
              ) : (
                <KeyboardArrowDownOutlinedIcon />
              )}
            </div>
            {<div dangerouslySetInnerHTML={{ __html: careGuide }} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
