import React from "react";
import "./style.scss";
import CustomInput from "../../../components/CustomInput/index";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { registerThunk } from "../../../store/action/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  resetPasswordThunk,
  verifyEmailThunk,
} from "../../../store/action/auth";
import { schema1 } from "./startValidate";
import { yupResolver } from "@hookform/resolvers/yup";
import messages from "../../../config/messageCode/messages";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const currentURL = window.location.href;
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema1),
  });
  const confirmEmail = (data) => {
    let email = new FormData();
    email.append("email", data.email);
    dispatch(verifyEmailThunk(email)).then((res) => {
      console.log(res);
      if (res?.payload?.response?.data?.message == messages.USER_NOT_FOUND) {
        toast.error("Địa chỉ Mail không tồn tại", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "red", backgroundColor: "#DEF2ED" },
        });
      } else if (
        res?.payload?.response?.data?.message == messages.ACCOUNT_NOT_CONFIRMED
      ) {
        toast.error(
          "Tài khoản của bạn chưa được xác thực. Hãy kiểm tra mail của bạn",
          {
            position: "top-right",
            autoClose: 3000,
            style: { color: "red", backgroundColor: "#DEF2ED" },
          }
        );
      } else {
        toast.success("Hãy kiểm tra mail của bạn", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#DEF2ED" },
        });
      }
      // navigate("/login");
    });
  };
  const resetPassword = (data) => {
    let formData = new FormData();
    formData.append("newPassword", data.newPassword);
    formData.append("resetToken", resetToken);
    dispatch(resetPasswordThunk(formData)).then((res) => {
      if (res?.payload?.success == true) {
        toast.success("Đổi mật khẩu thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#DEF2ED" },
        });
      }
      navigate("/login");
    });
  };
  return (
    <div className="container">
      <div className="resetPassword_container">
        <div className="resetPassword-header">Cập nhật lại mật khẩu</div>
        <div className="form_resetPassword">
          {currentURL.includes("/resetPassword/request") ? (
            <div>
              <p>Vui lòng nhập Email xác thực</p>
              <form action="" onSubmit={handleSubmit(confirmEmail)}>
                <CustomInput
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  register={register}
                  subtitle={"Email"}
                >
                  {errors.email?.message}
                </CustomInput>
                <Button name={"Xác nhận"} type="submit"></Button>
              </form>
            </div>
          ) : (
            <div>
              <p>Hãy nhập mật khẩu mới</p>
              <form action="" onSubmit={handleSubmit(resetPassword)}>
                <CustomInput
                  label="Mật khẩu mới"
                  id="newPassword"
                  type="password"
                  placeholder="Mật khẩu mới"
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
                <Button name={"Đổi mật khẩu"} type="submit"></Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
