import React, { useEffect, useState } from "react";
import CustomInput from "../../../../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../../../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import { creatDiscountThunk } from "../../../../../store/action/manage";
import { getDiscountsThunk } from "../../../../../store/action/order";
import { schema } from "./validate";
import { yupResolver } from "@hookform/resolvers/yup";

const DiscountAddForm = () => {
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
  const [valueCondition, setValueCondition] = useState("");
  const [valueMaxGet, setValueMaxGet] = useState("");
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
  const handleCreateDiscount = (data) => {
    const sendData = new FormData();
    sendData.append("condition", data.condition);
    sendData.append("maxGet", data.maxGet);
    dispatch(creatDiscountThunk(sendData))
      .then((res) => {
        if (res?.payload?.message == "Create discount successfully") {
          toast.success("Tạo mới khuyến mãi thành công", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "green", backgroundColor: "#DEF2ED" },
          });
          navigate("/manage/discount");
        }
      })
      .then(() => {
        dispatch(getDiscountsThunk(0, 4)); // Corrected syntax
      });
  };
  return (
    <div className="container">
      <div className="discount_form-container">
        <h4 className="discount_form-title">Tạo mới khuyến mãi</h4>
        <div className="discount_form-content">
          <form action="" onSubmit={handleSubmit(handleCreateDiscount)}>
            <CustomInput
              label="Điều kiện tối thiểu"
              id="condition"
              setValue={setValue}
              register={register}
              type="text"
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
              placeholder="Giảm tối đa đến"
              onChange={handleMaxGetChange}
              value={valueMaxGet}
            >
              {errors.maxGet?.message}
            </CustomInput>

            <div className="discount_form-btnGroup">
              <Button
                name={"Tạo mới"}
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

export default DiscountAddForm;
