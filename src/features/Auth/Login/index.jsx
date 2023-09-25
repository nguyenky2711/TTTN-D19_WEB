import React from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../../components/CustomInput/index";
import { useForm } from "react-hook-form";
import { loginThunk } from "../../../store/action/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import { schema } from "./validate";
import { yupResolver } from "@hookform/resolvers/yup";
const LoginPage = () => {
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
    dispatch(loginThunk(formData)).then((res) => {
      console.log(res);
      if (res?.payload?.code == "ERR_BAD_REQUEST") {
        const message = JSON.parse(
          res?.payload?.request?.responseText
        )?.message;
        if (message == "Invalid email or password") {
          toast.error("Hãy kiểm tra lại tài khoản hoặc mật khẩu", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "red", backgroundColor: "#DEF2ED" },
          });
        } else if (message == "Your account has been locked") {
          toast.error(
            "Tài khoản của bạn đã bị khoá. Hãy liên hệ quản trị viên để mở lại",
            {
              position: "top-right",
              autoClose: 3000,
              style: { color: "red", backgroundColor: "#DEF2ED" },
            }
          );
        }
      } else {
        res?.payload?.data?.userDTO?.role != "admin"
          ? navigate("/")
          : navigate("/manage/product");
      }
    });
  };
  return (
    <div className="container">
      <div className="login_container">
        <div className="login-header">Đăng nhập</div>
        <div className="form_login">
          <form action="" onSubmit={handleSubmit(handleClick)}>
            <CustomInput
              label="Email"
              id="email"
              type="email"
              placeholder="Email"
              register={register}
            >
              {errors.email?.message}
            </CustomInput>
            <CustomInput
              label="Mật khẩu"
              id="password"
              type="password"
              placeholder="Mật khẩu"
              register={register}
            >
              {errors.password?.message}
            </CustomInput>

            <Button name={"Đăng nhập"} type="submit"></Button>
            <p>
              <Link to="/resetPassword/request">Quên mật khẩu? </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
