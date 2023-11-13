import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { Form, Input } from "antd";
import messages from "../../config/messageCode/messages";
const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    dispatch(getPaymentsThunk()).then((res) => {
      console.log(res?.payload?.data);
      setPayment(res?.payload?.data);
    });

    dispatch(getCartThunk([0, 100])).then((res) => {
      setCartDTO(res?.payload?.cartDTO);
    });
  }, []);
  const [form] = Form.useForm();

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
    const formData = new FormData();
    let order_detail = cartDTO.list.map((item) => {
      return {
        product_id: item.productDTO.id,
        quantity: item.quantity,
        sum: item.productDTO.priceDTO[0].price * item.quantity,
        price_id: item.productDTO.priceDTO[0].id,
      };
    });
    // Handle form submission here using the values in formData
    const receiverName = form.getFieldValue("receiver_name");
    const receiverAddress = form.getFieldValue("receiver_address");
    const receiverPhone = form.getFieldValue("receiver_phone");
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
      if (res?.payload?.message == messages.ORDER_CREATED_SUCCESSFULLY) {
        toast.success("Đặt hàng thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#DEF2ED" },
        });
        navigate("/");
      } else if (
        res?.payload?.message == messages.ORDERED_QUANTITY_EXCEEDS_STOCK
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
  return (
    <div className="container">
      <div className="order_container">
        <Form
          style={{ display: "flex" }}
          name="dynamic_form_nest_item"
          form={form}
          // onFinish={onFinish}
          onFieldsChange={(changeField, allFields) => {}}
          initialValues={{
            receiver_name: data?.userDTO?.name,
            receiver_address: data?.userDTO?.address,
            receiver_phone: data?.userDTO?.phone,
          }}
        >
          <div className="order_left">
            <h4>Thông tin người nhận hàng</h4>
            <div>
              <div className="name_gender">
                <Form.Item
                  className="staff_item name"
                  label="Họ và tên"
                  name="receiver_name"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên",
                    },
                    {
                      pattern: new RegExp(
                        /^[A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+( [A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+)*$/
                      ),
                      message: "Họ tên không hợp lệ",
                    },
                    {
                      validator: (_, value) => {
                        if (value) {
                          if (value.length < 2 || value.length > 64) {
                            return Promise.reject(
                              "Họ và tên phải có độ dài từ 2 đến 64 ký tự"
                            );
                          }
                          if (value.trim() == "") {
                            return Promise.reject("Vui lòng nhập họ và tên");
                          }
                          return Promise.resolve();
                        } else if (!value || value == "") {
                          return Promise.reject();
                        }
                      },
                    },
                  ]}
                >
                  <Input placeholder="Nhập họ và tên" />
                </Form.Item>
              </div>
              <Form.Item
                className="staff_item name"
                label="Địa chỉ"
                name="receiver_address"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ",
                  },
                ]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
              <Form.Item
                className="staff_item phone"
                label="Số điện thoại"
                name="receiver_phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                  },
                  {
                    pattern: new RegExp(/^[0-9]+$/),
                    message: "Số điện thoại không hợp lệ",
                  },
                  {
                    validator: (_, value) => {
                      if (value) {
                        if (value.trim() == "") {
                          return Promise.reject("Vui lòng nhập họ và tên");
                        }
                        if (value.length < 9 || value.length > 10) {
                          return Promise.reject(
                            "Số điện thoại phải có độ dài từ 9 đến 10 ký tự"
                          );
                        } else {
                          return value.length == 9
                            ? value.charAt(0) == 1 ||
                              value.charAt(0) == 0 ||
                              value.charAt(0) == 2 ||
                              value.charAt(0) == 4 ||
                              value.charAt(0) == 6
                              ? Promise.reject("Đầu số điện thoại không đúng")
                              : Promise.resolve()
                            : value.charAt(0) != 0
                            ? Promise.reject("Đầu số điện thoại không đúng")
                            : value.charAt(1) == 1 ||
                              value.charAt(1) == 0 ||
                              value.charAt(1) == 2 ||
                              value.charAt(1) == 4 ||
                              value.charAt(1) == 6
                            ? Promise.reject("Đầu số điện thoại không đúng")
                            : Promise.resolve();
                        }
                      } else if (!value || value == "") {
                        return Promise.reject();
                      }
                    },
                  },
                ]}
              >
                <Input
                  placeholder="Số điện thoại bắt đầu với đầu số 03,05,07,09"
                  addonBefore="+84"
                />
              </Form.Item>
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
        </Form>
      </div>
      <div className="order_submit">
        <button onClick={onSubmit}>Đặt hàng</button>
      </div>
    </div>
  );
};

export default OrderPage;
