import React from "react";
import CustomInput from "../../../components/CustomInput/index";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "../../../store/action/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import { schema } from "./validate";
import { yupResolver } from "@hookform/resolvers/yup";
const SignUpPage = () => {
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
  const handleClick = (data) => {
    let formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    dispatch(registerThunk(formData)).then((res) => {
      console.log(res);
      if (
        res?.payload?.response?.data?.message ===
        "Email already exists. Please use a different email address."
      ) {
        toast.error("Địa chỉ mail đã được dùng để đăng ký tài khoản", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "red", backgroundColor: "#DEF2ED" },
        });
      } else {
        toast.success("Đăng ký tài khoản thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#DEF2ED" },
        });
        toast.success("Hãy kiểm tra mail của bạn", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#DEF2ED" },
        });
        navigate("/login");
      }
    });
  };
  return (
    <div className="container">
      <div className="register_container">
        <div className="register-header">Đăng ký</div>
        <div className="form_register">
          <form action="" onSubmit={handleSubmit(handleClick)}>
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
            <CustomInput
              label="Mật khẩu"
              id="password"
              type="password"
              placeholder="Mật khẩu"
              register={register}
              subtitle={"Mật khẩu"}
            >
              {errors.password?.message}
            </CustomInput>
            <CustomInput
              label="Mật khẩu"
              id="confirmPassword"
              type="password"
              placeholder="Mật khẩu"
              register={register}
              subtitle={"Mật khẩu"}
            >
              {errors.confirmPassword?.message}
            </CustomInput>
            <CustomInput
              label="Họ và tên"
              id="name"
              type="text"
              placeholder="Họ và tên"
              register={register}
              subtitle={"Họ và tên"}
            >
              {errors.name?.message}
            </CustomInput>
            <CustomInput
              label="Địa chỉ"
              id="address"
              type="text"
              placeholder="Địa chỉ"
              register={register}
              subtitle={"Địa chỉ"}
            >
              {errors.address?.message}
            </CustomInput>
            <CustomInput
              label="Số điện thoại"
              id="phone"
              type="phone"
              placeholder="Số điện thoại"
              register={register}
              subtitle={"Số điện thoại"}
            >
              {errors.phone?.message}
            </CustomInput>
            <Button name={"Đăng ký"} type="submit"></Button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
