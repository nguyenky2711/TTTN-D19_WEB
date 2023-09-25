import React from "react";
import CustomInput from "../../../../components/CustomInput/index";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/index";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { changePasswordThunk } from "../../../../store/action/auth";
import "./style.scss";
import { schema } from "./validate";
import { yupResolver } from "@hookform/resolvers/yup";
const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleChangePassword = (data) => {
    let dataSend = new FormData();
    dataSend.append("newPassword", data.newPassword);
    dataSend.append("oldPassword", data.oldPassword);
    dispatch(changePasswordThunk(dataSend)).then((res) => {
      console.log(res);
      if (res?.payload == undefined) {
        toast.error("Mật khẩu cũ không đúng", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "red", backgroundColor: "#DEF2ED" },
        });
      } else {
        toast.success("Đổi mật khẩu thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#DEF2ED" },
        });
        navigate("/");
      }
    });
  };
  return (
    <div className="container">
      <div className="changePw_container">
        <div className="changePw_header">Đổi mật khẩu</div>
        <div className="form_changePw">
          <form action="" onSubmit={handleSubmit(handleChangePassword)}>
            <CustomInput
              label="Mật khẩu cũ"
              id="oldPassword"
              type="password"
              placeholder="Nhập  mật khẩu cũ"
              register={register}
            >
              {errors.oldPassword?.message}
            </CustomInput>
            <CustomInput
              label="Mật khẩu mới"
              id="newPassword"
              type="password"
              placeholder="Nhập mật khẩu mới"
              register={register}
            >
              {errors.newPassword?.message}
            </CustomInput>
            <CustomInput
              label="Nhập lại mật khẩu mới"
              id="confirmNewPassword"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              register={register}
            >
              {errors.confirmNewPassword?.message}
            </CustomInput>

            <Button name={"Xác nhận"} type="submit"></Button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
