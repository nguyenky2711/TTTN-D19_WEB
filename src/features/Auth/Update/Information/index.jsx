import React, { useEffect, useState } from "react";
import CustomInput from "../../../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import {
  changeInforThunk,
  getUserByIdThunk,
} from "../../../../store/action/auth";
import "./style.scss";
import { schema } from "./validate";
import { yupResolver } from "@hookform/resolvers/yup";
const ChangeInforPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.auth.login.currentUser);
  const [realData, setRealData] = useState();
  useEffect(() => {
    dispatch(getUserByIdThunk(data?.userDTO?.id)).then((res) => {
      setRealData(res?.payload?.data);
    });
  }, []);

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
    // setValue('na')
  }, [data]);
  const handleUpdateInfor = (value) => {
    let dataSend = new FormData();
    dataSend.append("name", value.name);
    dataSend.append("address", value.address);
    dataSend.append("phone", value.phone);
    dispatch(changeInforThunk([data?.userDTO?.id, dataSend])).then((res) => {
      console.log(res);
      if (res?.payload == undefined) {
        toast.error("Cập nhật tài khoản thất bại", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "red", backgroundColor: "#DEF2ED" },
        });
      } else {
        toast.success("Cập nhật tài khoản thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#DEF2ED" },
        });
        data?.userDTO?.role != "admin"
          ? navigate("/")
          : navigate("/manage/product");
      }
    });
  };
  console.log(realData);
  return (
    <div className="container">
      <div className="updateInfo_container">
        <div className="updateInfo-header">Thông tin tài khoản</div>
        <div className="form_updateInfo">
          {realData != undefined && (
            <form action="" onSubmit={handleSubmit(handleUpdateInfor)}>
              <CustomInput
                label="Email"
                id="email"
                setValue={setValue}
                register={register}
                type="text"
                placeholder="Email"
                defaultValue={realData?.userDTO?.email}
                disabled
              ></CustomInput>
              <CustomInput
                label="Họ và tên"
                id="name"
                setValue={setValue}
                register={register}
                type="text"
                placeholder="Họ và tên"
                defaultValue={realData?.userDTO?.name}
              >
                {errors.name?.message}
              </CustomInput>
              <CustomInput
                label="Địa chỉ"
                id="address"
                setValue={setValue}
                register={register}
                type="text"
                placeholder="Địa chỉ"
                defaultValue={realData?.userDTO?.address}
              >
                {errors.address?.message}
              </CustomInput>
              <CustomInput
                label="Số điện thoại"
                id="phone"
                setValue={setValue}
                register={register}
                type="text"
                placeholder="Số điện thoại"
                defaultValue={realData?.userDTO?.phone}
              >
                {errors.phone?.message}
              </CustomInput>
              <CustomInput
                label="Trạng thái"
                id="status"
                setValue={setValue}
                register={register}
                type="text"
                placeholder="Trạng thái"
                defaultValue={"Active"}
                disabled
              ></CustomInput>
              <Button name={"Xác nhận"} type="submit"></Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeInforPage;
