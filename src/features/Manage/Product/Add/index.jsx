import React, { useEffect, useState } from "react";
import "./style.scss";
import CustomInput from "../../../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import { creatDiscountThunk } from "../../../../store/action/manage";
import Textarea from "../../../../components/Textarea";
import AddIcon from "@mui/icons-material/Add";
import PublishIcon from "@mui/icons-material/Publish";
import DeleteIcon from "@mui/icons-material/Delete";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { createItemThunk } from "../../../../store/action/product";
import { schema } from "./validate";
import { yupResolver } from "@hookform/resolvers/yup";

const ProductAddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedValue, setSelectedValue] = useState("1"); // Initialize the selected value state
  const [filesName, setFilesName] = useState([]);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value); // Update the selected value when radio changes
  };

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    // const updatedFiles = Array.from(selectedFiles).map((file) => ({
    //   name: file.name,
    //   isUploading: false,
    // }));
    Array.from(selectedFiles).map((file) => {
      setFilesName((prevFilesName) => [...prevFilesName, file.name]);
    });
    const updatedFiles = Array.from(selectedFiles).map((file) => ({
      name: file.name,
    }));
    setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  };
  const handleFileDelete = (index) => {
    const updatedFiles = [...files];
    const updatedNameFiles = [...filesName];
    updatedNameFiles.splice(index, 1);

    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setFilesName(updatedNameFiles);
  };
  const handleAddItem = (data) => {
    const sendData = new FormData();
    sendData.append("name", data.name);
    sendData.append("description", data.description);
    sendData.append("guide", data.guide);
    sendData.append("type_id", selectedValue);
    sendData.append("imagesName", JSON.stringify(filesName));
    dispatch(createItemThunk(sendData)).then((res) => {
      if (res?.payload?.message == "Item created successfully") {
        toast.success("Thêm mặt hàng thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#D7F1FD" },
        });
        navigate("/manage/product");
      } else {
        toast.error("Thêm mặt hàng thất bại", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "red", backgroundColor: "#D7F1FD" },
        });
      }
      // navigate("/manage/discount");
    });
  };
  return (
    <div className="container">
      <div className="addProduct_container">
        <h4>Tạo mới mặt hàng</h4>
        <div className="form_product">
          <form action="" onSubmit={handleSubmit(handleAddItem)}>
            <div className="form_product-name-type">
              <CustomInput
                label="Tên sản phẩm"
                id="name"
                setValue={setValue}
                register={register}
                type="text"
                placeholder="Nhập tên sản phẩm"
                className="form_product-name"
              >
                {errors.name?.message}
              </CustomInput>
              <FormControl className="form_product-type">
                {/* <FormLabel id="demo-radio-buttons-group-label">
                Loại sản phẩm
              </FormLabel> */}
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={selectedValue} // Set the value of the RadioGroup to the selected value
                  onChange={handleRadioChange} // Handle radio change
                  name="radio-buttons-group"
                  className="radioButton"
                >
                  <FormControlLabel value="1" control={<Radio />} label="Cây" />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Chậu"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <Textarea
              label="Mô tả sản phẩm"
              id="description"
              setValue={setValue}
              register={register}
              type="text"
              placeholder="Nhập mô tả sản phẩm"
              // className={"form_product-description"}
            >
              {errors.description?.message}
            </Textarea>
            <Textarea
              label="Hướng dẫn sử dụng"
              id="guide"
              setValue={setValue}
              register={register}
              type="text"
              placeholder="Nhập hướng dẫn sử dụng"
              // className={"form_product-description"}
            >
              {errors.guide?.message}
            </Textarea>
            <div className="form_product-picture">
              <label>Ảnh sản phẩm</label>
              <div className="file-card">
                <div className="file-inputs">
                  {/* <input type="file" onChange={uploadHandler} /> */}
                  <input type="file" onChange={handleFileSelect} multiple />
                  <button>
                    <i>
                      <AddIcon />
                    </i>
                    Tải ảnh lên
                  </button>
                </div>

                <p className="main">Hỗ trợ file</p>
                <p className="info">PDF, JPG, PNG</p>
              </div>
              <ul className="file-list">
                {files &&
                  files.map((f, index) => (
                    <li className="file-item" key={fetch.name}>
                      <PermMediaIcon />
                      <p>{f.name}</p>
                      <div className="actions">
                        <div className="loading"></div>
                        {f.isUploading && <PublishIcon />}
                        {!f.isUploading && (
                          <DeleteIcon onClick={() => handleFileDelete(index)} />
                        )}
                      </div>
                    </li>
                  ))}
              </ul>
              {filesName.length == 0 && (
                <p
                  className="error-message"
                  style={{ fontSize: "13px", color: "red" }}
                >
                  Vui lòng chọn ảnh mặt hàng
                </p>
              )}
            </div>
            <Button
              name={"Thêm mặt hàng"}
              type="submit"
              className="form_product-button"
            ></Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductAddForm;
