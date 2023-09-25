import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import "./style.scss";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomInput from "../../../../components/CustomInput";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updatePriceThunk } from "../../../../store/action/product";
import { schema } from "./validate";
import { yupResolver } from "@hookform/resolvers/yup";
const ModalPrice = ({
  open,
  onClose,
  oldPrice,
  productId,
  sendFlagToParent,
}) => {
  const [openChild, setOpenChild] = useState(false);
  const [formattedPrice, setFormattedPrice] = useState("");
  const [acceptUpdate, setAcceptUpdate] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const handleChildOpen = () => {
    setOpenChild(true);
  };
  const handleChildClose = () => {
    setOpenChild(false);
  };
  useEffect(() => {
    setOpenChild(false);
    setFormattedPrice("");
    setAcceptUpdate(false);
  }, [onClose]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const handleOldMoneyValue = (oldPrice) => {
    let numericValue = String(oldPrice).replace(/\D/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };
  const handleMoneyValue = (value) => {
    let numericValue = value.replace(/\D/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setFormattedPrice(formattedValue);
    return formattedValue;
  };

  const handleAcceptUpdate = () => {
    setAcceptUpdate(true);
    setOpenChild(false);
  };
  const handleUpdatePrice = (data) => {
    const sendData = new FormData();
    sendData.append("price", data.new_price);
    dispatch(updatePriceThunk([productId, sendData]))
      .then((res) => {
        if (res?.payload?.message == "Updated price successfully") {
          toast.success("Cập nhật giá sản phẩm thành công", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "green", backgroundColor: "#DEF2ED" },
          });
          sendFlagToParent(true);
        }
      })
      .then(() => {
        onClose();
      });
  };
  const handleParentClose = () => {
    onClose(); // Call the onClose prop to close the parent modal
  };
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Chỉnh sửa giá sản phẩm</h2>
          <form action="" onSubmit={handleSubmit(handleUpdatePrice)}>
            <CustomInput
              label="Giá cũ"
              id={`old_price`}
              setValue={setValue}
              register={register}
              type="text"
              // placeholder="Nhập giá mới"
              className="form_product-name"
              defaultValue={oldPrice && handleOldMoneyValue(oldPrice)}
              disabled
            >
              {/* {errors[`price`]?.message} */}
            </CustomInput>
            <CustomInput
              label="Giá mới"
              id={`new_price`}
              setValue={setValue}
              register={register}
              type="text"
              placeholder="Nhập giá mới"
              className="form_product-name"
              onChange={(e) => handleMoneyValue(e.target.value)}
              value={formattedPrice} // Use the formatted value from your state
            >
              {errors?.new_price?.message}
            </CustomInput>
            {acceptUpdate == false ? (
              <Button type="button" onClick={handleChildOpen}>
                Cập nhật
              </Button>
            ) : (
              <Button type="submit">Cập nhật</Button>
            )}
            <Button type="button" onClick={handleParentClose}>
              Huỷ
            </Button>
          </form>

          <div>
            <Modal
              open={openChild}
              onClose={handleChildClose}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...style, width: 200 }}>
                <h2 id="child-modal-title">Bạn có muốn cập nhật</h2>
                <p id="child-modal-description">
                  Giá sẽ được cập nhật khi bạn bấm đồng ý
                </p>
                <Button type="button" onClick={handleChildClose}>
                  Huỷ
                </Button>
                <Button type="button" onClick={handleAcceptUpdate}>
                  Đồng ý
                </Button>
              </Box>
            </Modal>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalPrice;
