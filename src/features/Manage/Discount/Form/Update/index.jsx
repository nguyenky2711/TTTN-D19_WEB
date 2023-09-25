import React, { useEffect, useState } from "react";
import CustomInput from "../../../../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../../../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import {
  creatDiscountThunk,
  getDiscountByIdThunk,
  getDiscountsThunk,
  updateDiscountThunk,
} from "../../../../../store/action/manage";
import { schema } from "./validate";
import { yupResolver } from "@hookform/resolvers/yup";

const DiscountUpdateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const currentUrl = window.location.href;
  const parts = currentUrl.split("/");
  const id = parts[parts.length - 1];
  const { data } = useSelector((state) => state.manage.discount);
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   dispatch(getDiscountByIdThunk(id)).then((res) =>
  //     setData(res?.payload?.data)
  //   );
  // }, [id]);
  const renderData = data?.find((item) => item.id == id);
  const [valueCondition, setValueCondition] = useState(
    `${renderData?.condition}`
  );
  const [valueMaxGet, setValueMaxGet] = useState(`${renderData?.maxGet}`);
  useEffect(() => {
    format("condition", valueCondition);
    format("maxGet", valueMaxGet);
  }, []);
  const format = (type, value) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    type == "condition"
      ? setValueCondition(formattedValue)
      : setValueMaxGet(formattedValue);
  };
  const handleConditionChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    setValueCondition(formattedValue);
  };
  const handleMaxGetChange = (e) => {
    const { value } = e.target;

    const numericValue = value.replace(/\D/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    setValueMaxGet(formattedValue);
  };
  const handleUpdateDiscount = (data) => {
    const sendData = new FormData();
    sendData.append("condition", data.condition);
    sendData.append("maxGet", data.maxGet);
    sendData.append("status_id", renderData.statusDTO.id);
    dispatch(updateDiscountThunk([id, sendData]))
      .then((res) => {
        // dispatch(getDiscountsThunk[(0, 4)]);
        if (res?.payload?.message == "Update successfully") {
          toast.success("Cập nhật khuyến mãi thành công", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "green", backgroundColor: "#DEF2ED" },
          });
          navigate("/manage/discount");
        }
        // dispatch(getDiscountsThunk());
      })
      .then(() => {
        dispatch(getDiscountsThunk(0, 4)); // Corrected syntax
      });
  };
  return (
    <div className="container">
      <div className="discount_form-container">
        <h4 className="discount_form-title">Thông tin khuyến mãi</h4>
        <div className="discount_form-content">
          <form action="" onSubmit={handleSubmit(handleUpdateDiscount)}>
            <CustomInput
              label="Điều kiện tối thiểu"
              id="condition"
              setValue={setValue}
              register={register}
              type="text"
              // defaultValue={renderData?.condition}
              placeholder="Điều kiện tối thiểu"
              onChange={handleConditionChange}
              value={valueCondition}
            >
              {errors.condition?.message}
            </CustomInput>
            <CustomInput
              label="Giảm tối đa đến"
              id="maxGet"
              setValue={setValue}
              register={register}
              type="text"
              // defaultValue={renderData?.maxGet}
              placeholder="Giảm tối đa đến"
              onChange={handleMaxGetChange}
              value={valueMaxGet}
            >
              {errors.maxGet?.message}
            </CustomInput>
            <div className="discount_form-btnGroup">
              <Button
                name={"Cập nhật"}
                type="submit"
                className="discount_form-addBtn"
              ></Button>
              <Button
                name={"Huỷ"}
                type="button"
                onClick={() => navigate("/manage/discount")}
                className="discount_form-cancelBtn"
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiscountUpdateForm;
