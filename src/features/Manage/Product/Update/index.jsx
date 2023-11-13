import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button, Form, Input, Upload, message, Checkbox, Col, Row } from "antd";
import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import ConfirmModalAntd from "../../../../components/ConfirmModalAntd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  createItemThunk,
  getProductByItemIdThunk,
  updateItemThunk,
} from "../../../../store/action/product";
import messages from "../../../../config/messageCode/messages";
const ProductUpdateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state;
  const [fileList, setFileList] = useState([]);
  const [item, setItem] = useState();
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const maxSize = 25 * 1024 * 1024; // 25MB in bytes

  useEffect(() => {
    dispatch(getProductByItemIdThunk(id)).then((res) => {
      let temp = res?.payload?.productDTO[0]?.itemDTO?.data?.type_id;
      form.setFieldValue("type_id", temp.toString());
      setItem(res?.payload?.productDTO[0]?.itemDTO);
      let tempList = res?.payload?.productDTO[0]?.itemDTO?.imageDTO?.map(
        (item, index) => {
          return {
            uid: index,
            name: item?.name,
            status: "done",
            url: item?.url,
            thumbUrl: item?.url,
          };
        }
      );
      setFileList(tempList);
    });
  }, []);
  const beforeUpload = async (file) => {
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
    const validFiles = info.fileList.filter(
      (file) => file?.type?.match(/image\/.*/) || file.url
    );

    setFileList(validFiles);
    // const firstFile = info?.fileList[0];
    // const secondFile = info?.fileList[1];
    // if (info?.fileList?.length < fileList.length) {
    //   if (info?.fileList?.length === 0) {
    //   } else {
    //     setFileList([firstFile]);
    //   }
    // } else {
    //   setFileList(info.fileList);
    // }
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
    const formDataAsObject = {};
    // value.forEach((value, key) => {
    //   formDataAsObject[key] = value;
    // });

    // console.log(formDataAsObject);
    value &&
      dispatch(updateItemThunk([id, sendData])).then((res) => {
        if (res?.payload?.message == "Updated item successfully") {
          toast.success("Cập nhật mặt hàng thành công", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "green", backgroundColor: "#D7F1FD" },
          });
          navigate("/manage/product");
        } else {
          if (
            res?.payload?.response?.data?.message ===
            messages.ITEM_NAME_ALREADY_EXISTS
          ) {
            toast.error("Mặt hàng đã tồn tại", {
              position: "top-right",
              autoClose: 3000,
              style: { color: "red", backgroundColor: "#D7F1FD" },
            });
          } else {
            toast.success("Cập nhật mặt hàng thất bại", {
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
    setOpenModal(true);
  };
  return (
    <div className="container">
      <div className="addProduct_container">
        <h4>Thông tin mặt hàng</h4>
        {item && (
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
            initialValues={{
              name: item?.data.name,
              description: item?.data.description,
              guide: item?.data.guide,
              type_id: item?.data.type_id,
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
                    {
                      pattern: new RegExp(
                        /^[A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+( [A-Za-zÀ-ỹẠ-ỹĂ-ắÂ-ẽÊ-ỷÔ-ỗƠ-ờƯ-ứĐđ]+)*$/
                      ),
                      message: "Tên mặt hàng không hợp lệ",
                    },
                    {
                      validator: (_, value) => {
                        if (value) {
                          if (value.length < 2 || value.length > 64) {
                            return Promise.reject(
                              "Tên mặt hàng có độ dài từ 2 đến 64 ký tự"
                            );
                          }
                          if (value.trim() == "") {
                            return Promise.reject("Vui lòng nhập tên mặt hàng");
                          }
                          return Promise.resolve();
                        } else if (!value || value == "") {
                          return Promise.reject();
                        }
                      },
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
                          return Promise.reject(
                            "Vui lòng nhập tối đa 500 kí tự"
                          );
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
                  placeholder="Nhập nội dung mô tả mặt hàng"
                />
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
                            "Vui lòng nhập nội dung hướng dẫn chăm sóc"
                          );
                        }
                        if (value.trim().length > 500) {
                          return Promise.reject(
                            "Vui lòng nhập tối đa 500 kí tự"
                          );
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
                    required: false,
                    // message: "Vui lòng chọn hình ảnh mặt hàng",
                  },
                  {
                    validator: (_, value) => {
                      console.log(value);
                      if (value) {
                        if (value?.fileList?.length === 0 || !fileList) {
                          return Promise.reject(
                            "Vui lòng chọn hình ảnh mặt hàng"
                          );
                        } else {
                          return Promise.resolve();
                        }
                      } else {
                        return Promise.resolve();
                      }
                    },
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
                <Button
                  type="button"
                  onClick={() => navigate(`/manage/product`)}
                >
                  Huỷ
                </Button>
              </Form.Item>
            </div>

            <ConfirmModalAntd
              open={openModal}
              onCancel={handleModalCancel}
              onOk={() => handleOkModal(sendData)}
              header={`Hoàn thành cập nhật mặt hàng mặt hàng`}
              title={`Bạn có muốn cập nhật mặt hàng này ?`}
            ></ConfirmModalAntd>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ProductUpdateForm;
