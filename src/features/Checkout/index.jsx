import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import CustomInput from "../../components/CustomInput";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  creatOrderThunk,
  getDiscountsThunk,
  getPaymentsThunk,
} from "../../store/action/order";
import { getCartThunk } from "../../store/action/cart";
import { schema } from "./validate";
import { yupResolver } from "@hookform/resolvers/yup";

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.auth.login.currentUser);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getPaymentsThunk()).then((res) => {
      console.log(res?.payload?.data);
      setPayment(res?.payload?.data);
    });

    dispatch(getCartThunk([0, 100])).then((res) => {
      setCartDTO(res?.payload?.cartDTO);
    });
  }, []);
  const [cartDTO, setCartDTO] = useState();
  const [payment, setPayment] = useState();

  // const { cartDTO } = useSelector((state) => state.cart.data);
  const [selectedPayment, setSelectedPayment] = useState(1);
  // const { discount, payment } = useSelector((state) => state.order);

  const handlePayment = (event) => {
    setSelectedPayment(event.target.value);
  };
  const calculateTotal = () => {
    return cartDTO?.subTotal.toLocaleString();
  };
  const formRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    let order_detail = cartDTO.list.map((item) => {
      return {
        product_id: item.productDTO.id,
        quantity: item.quantity,
        sum: item.productDTO.priceDTO[0].price * item.quantity,
        price_id: item.productDTO.priceDTO[0].id,
      };
    });
    // Handle form submission here using the values in formData
    const receiverName = formData.get("receiver_name");
    const receiverAddress = formData.get("receiver_address");
    const receiverPhone = formData.get("receiver_phone");
    let sendData = new FormData();
    sendData.append("receiver_name", receiverName);
    sendData.append("receiver_address", receiverAddress);
    sendData.append("receiver_phone", receiverPhone);
    sendData.append(
      "payment_id",
      selectedPayment !== "" ? parseInt(selectedPayment) : 1
    );
    sendData.append("order_detail", JSON.stringify(order_detail));
    sendData.append("total", Number(cartDTO?.subTotal));
    console.log("sendData:", Object.fromEntries(sendData));
    dispatch(creatOrderThunk(sendData)).then((res) => {
      dispatch(getCartThunk([0, 100]));
      if (res?.payload?.message == "Order created successfully") {
        toast.success("Đặt hàng thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#DEF2ED" },
        });
        navigate("/");
      } else if (
        res?.payload?.message == "Ordered quantity exceeds available stock."
      ) {
        toast.error("Trong giỏ hàng có sản phẩm vượt quá số lượng tồn kho", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#DEF2ED" },
        });
      }
    });
    // Perform any additional actions you need
  };
  console.log(payment);
  return (
    <div className="container">
      <div className="order_container">
        <div className="order_left">
          <h4>Thông tin người nhận hàng</h4>
          <div>
            <form ref={formRef} onSubmit={onSubmit}>
              <CustomInput
                label="Họ và tên"
                id="receiver_name"
                setValue={setValue}
                register={register}
                type="text"
                placeholder="Họ và tên"
                defaultValue={data?.userDTO?.name}
              >
                {errors.receiver_name?.message}
              </CustomInput>
              <CustomInput
                label="Địa chỉ"
                id="receiver_address"
                setValue={setValue}
                register={register}
                type="text"
                placeholder="Địa chỉ"
                defaultValue={data?.userDTO?.address}
              >
                {errors.receiver_address?.message}
              </CustomInput>
              <CustomInput
                label="Số điện thoại"
                id="receiver_phone"
                setValue={setValue}
                register={register}
                type="text"
                placeholder="Số điện thoại"
                defaultValue={data?.userDTO?.phone}
              >
                {errors.receiver_phone?.message}
              </CustomInput>

              {/* <Button name={"Xác nhận"} type="submit"></Button> */}
            </form>
          </div>
        </div>
        <div className="order_right">
          <h4>Đơn hàng</h4>
          {cartDTO != undefined ? (
            <div className="order_right-listItem">
              {cartDTO.list.map((value) => {
                return (
                  <div className="order_right-item">
                    <div className="order_right-itemContent">
                      <div className="order_right-itemImg">
                        <img
                          src={`http://localhost:4000/uploads/${value?.productDTO?.itemDTO?.imageDTO[0]?.name}`}
                          alt=""
                        />
                      </div>
                      <div className="order_right-content">
                        <p>
                          {value?.productDTO?.itemDTO?.data?.name} -{" "}
                          {value?.productDTO?.sizeDTO?.info_size}
                        </p>
                        <span>
                          Số lượng: <span>{value.quantity}</span>
                        </span>
                      </div>
                    </div>
                    <div className="order_right-itemTotal">
                      <p>
                        {" "}
                        <span>
                          {(
                            value.quantity *
                            value.productDTO?.priceDTO[0]?.price
                          ).toLocaleString()}
                          VND
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
          {cartDTO != undefined ? (
            <div className="order_right-subTotal">
              <h4>Tạm tính</h4>
              <p>
                <span>{cartDTO.subTotal.toLocaleString()}VND</span>
              </p>
            </div>
          ) : (
            <></>
          )}

          <div className="order_right-selection">
            {payment != undefined ? (
              <div className="order_right-payment">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Phương thức thanh toán
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectedPayment}
                    label="Phương thức thanh toán"
                    onChange={handlePayment}
                  >
                    <MenuItem value="">Chọn phương thức thanh toán</MenuItem>
                    {payment.map((item) => {
                      return (
                        <MenuItem value={item.id}> {item.method}</MenuItem>
                      );
                    })}
                  </Select>
                  {/* <FormHelperText>With label + helper text</FormHelperText> */}
                </FormControl>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="order_right-total">
            <h4>Tổng tiền</h4>
            <p>
              <span>{cartDTO?.subTotal.toLocaleString()} VND</span>
            </p>
          </div>
        </div>
      </div>
      <div className="order_submit">
        <button onClick={onSubmit}>Đặt hàng</button>
      </div>
    </div>
  );
};

export default OrderPage;
