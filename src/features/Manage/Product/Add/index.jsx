import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { createItemThunk } from "../../../../store/action/product";
import { Button, Form, Input, Upload, message, Checkbox, Col, Row } from "antd";
import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import ConfirmModalAntd from "../../../../components/ConfirmModalAntd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const ProductAddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state;
  const [fileList, setFileList] = useState([]);
  // hàm trim dữ liệu trong thẻ html

  const beforeUpload = async (file) => {
    const maxSize = 25 * 1024 * 1024; // 25MB in bytes
    if (file.size > maxSize) {
      message.error("File size must be within 25MB!");
      return false; // Prevent file from being uploaded
    }
    if (file.type != "") {
      if (!file.type.match(/image\/.*/)) {
        message.error("Only accept image!");
        return false; // Prevent file from being uploaded
      }
    } else {
      if (!file.name.endsWith(".heif")) {
        message.error("Only accept image!");
        return false;
      }
    }
    return false; // Allow file upload
  };

  const handleUploadChange = async (info) => {
    if (info.file.status === "done") {
      // File upload was successful
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === "error") {
      // File upload failed
      message.error(`${info.file.name} file upload failed.`);
    }
    const firstFile = info.fileList[0];
    const secondFile = info.fileList[1];
    if (info?.fileList?.length < fileList.length) {
      if (info?.fileList?.length === 0) {
        setFileList();
      } else {
        setFileList([firstFile]);
      }
    } else {
      setFileList(info.fileList);
    }
  };

  const handleRemove = (file) => {
    // Filter out the removed file from the fileList
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);
  };
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [hadErrors, setHadErrors] = useState(true);
  const [sendData, setSendData] = useState();
  const handleModalCancel = (cancelled) => {
    if (cancelled) {
      // Handle cancellation here or set state based on the cancellation flag
      // console.log("Modal was cancelled");
    }
    setOpenModal(false);
    setOpenAddModal(false);
  };
  const handleOkModal = (value) => {
    // const formDataAsObject = {};
    // value.forEach((value, key) => {
    //   formDataAsObject[key] = value;
    // });

    // console.log(formDataAsObject);"Request failed with status code 409"
    value &&
      dispatch(createItemThunk(value)).then((res) => {
        console.log(res);
        if (res?.payload?.message === "Item created successfully") {
          toast.success("Thêm mặt hàng thành công", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "green", backgroundColor: "#D7F1FD" },
          });
          navigate("/manage/product");
        } else {
          if (res?.error?.message === "Request failed with status code 409") {
            toast.error("Mặt hàng đã tồn tại", {
              position: "top-right",
              autoClose: 3000,
              style: { color: "red", backgroundColor: "#D7F1FD" },
            });
          } else {
            toast.error("Thêm mặt hàng thất bại", {
              position: "top-right",
              autoClose: 3000,
              style: { color: "red", backgroundColor: "#D7F1FD" },
            });
          }
        }
        // navigate("/manage/discount");
      });
  };
  const onFinish = (values) => {
    const filesName = fileList.map((file) => {
      return file.name;
    });
    const filesUrl = fileList.map((file) => {
      return file.thumbUrl;
    });
    const lastData = new FormData();
    lastData.append("name", values.name);
    lastData.append("description", values.description);
    lastData.append("guide", values.guide);
    lastData.append("type_id", values.type_id);
    lastData.append("imagesName", JSON.stringify(filesName));
    lastData.append("imagesUrl", JSON.stringify(filesUrl));
    setSendData(lastData);
  };
  return (
    <div className="container">
      <div className="addProduct_container">
        <h4>Tạo mới mặt hàng</h4>

        <Form
          name="dynamic_form_nest_item"
          form={form}
          onFinish={onFinish}
          style={{
            maxWidth: "100%",
          }}
          autoComplete="off"
          onFieldsChange={(changeField, allFields) => {
            let error = false;
            for (let index in allFields) {
              if (allFields[index].errors.length != 0) {
                error = true;
                setHadErrors(true);
              }
            }
            for (let index in allFields) {
              if (
                allFields[index].name[0] != "courseUpload" ||
                allFields[index].name[0] != "courseNote"
              ) {
                if (allFields[index].value) {
                  error = false;
                } else {
                  error = true;
                }
              }
            }
            setHadErrors(error);
          }}
        >
          <div className="product_content">
            <div className="product_name_type">
              <Form.Item
                className="product_name"
                label="Tên mặt hàng"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên mặt hàng",
                  },
                ]}
              >
                <Input placeholder="Nhập tên mặt hàng" />
              </Form.Item>
            </div>
            <Form.Item
              className="product_type"
              label="Loại mặt hàng"
              name="type_id"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại mặt hàng",
                },
              ]}
            >
              <Checkbox.Group>
                <Row>
                  <Col span={8}>
                    <Checkbox
                      value={1}
                      style={{
                        lineHeight: "32px",
                      }}
                    >
                      Cây
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      value={2}
                      style={{
                        lineHeight: "32px",
                      }}
                    >
                      Chậu
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              className="product_description"
              label="Mô tả mặt hàng"
              name={"description"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập nội dung mô tả mặt hàng",
                },
                {
                  validator: (_, value) => {
                    if (value && value.trim()) {
                      if (value.trim() == "<p><br></p>") {
                        return Promise.reject(
                          "Vui lòng nhập nội dung mô tả mặt hàng"
                        );
                      }
                      if (value.trim().length > 500) {
                        return Promise.reject("Vui lòng nhập tối đa 500 kí tự");
                      }
                      if (value.trim().length < 10) {
                        return Promise.reject(
                          "Vui lòng nhập tối thiểu 10 kí tự"
                        );
                      }
                      return Promise.resolve();
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <ReactQuill rows={3} placeholder="Nhập nội dung mô tả mặt hàng" />
            </Form.Item>
            <Form.Item
              className="product_guide"
              label="Hướng dẫn chăm sóc"
              name={"guide"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập nội dung hướng dẫn chăm sóc",
                },
                {
                  validator: (_, value) => {
                    if (value && value.trim()) {
                      if (value.trim() == "<p><br></p>") {
                        return Promise.reject(
                          "Vui lòng nhập nội dung mô tả mặt hàng"
                        );
                      }
                      if (value.trim().length > 500) {
                        return Promise.reject("Vui lòng nhập tối đa 500 kí tự");
                      }
                      if (value.trim().length < 10) {
                        return Promise.reject(
                          "Vui lòng nhập tối thiểu 10 kí tự"
                        );
                      }
                      return Promise.resolve();
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <ReactQuill
                rows={3}
                placeholder="Nhập nội dung hướng dẫn chăm sóc"
              />
            </Form.Item>
            <Form.Item
              className="product_picture"
              label="Hình ảnh mặt hàng"
              name={"upload"}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn hình ảnh mặt hàng",
                },
              ]}
            >
              <Upload
                listType="picture"
                beforeUpload={beforeUpload}
                fileList={fileList ? fileList : null}
                onRemove={handleRemove} // Handle file removal
                onChange={handleUploadChange} // Handle file addition to fileList
              >
                <Button icon={<CloudUploadOutlined />}>
                  Tải hình lên{" "}
                  <span className="img_allowText">{`Dạng file .jpg, .jpeg, .png, .heif dung lượng <= 25MB`}</span>
                </Button>
              </Upload>
            </Form.Item>
          </div>

          <div className="buttonGroup">
            <Form.Item className="submitBtn finish">
              <Button
                type="submit"
                htmlType="submit"
                // onClick={() => !hadErrors && setOpenModal(true)}
              >
                Hoàn thành
              </Button>
            </Form.Item>

            <Form.Item className="cancelBtn">
              <Button type="button" onClick={() => navigate(`/manage/product`)}>
                Huỷ
              </Button>
            </Form.Item>
          </div>

          <ConfirmModalAntd
            open={openModal}
            onCancel={handleModalCancel}
            onOk={() => handleOkModal(sendData)}
            header={`Hoàn thành thêm mặt hàng`}
            title={`Bạn có muốn thêm mặt hàng này vào danh sách ?`}
          ></ConfirmModalAntd>
        </Form>
      </div>
    </div>
  );
};

export default ProductAddForm;
