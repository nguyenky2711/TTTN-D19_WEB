import {
  creatDiscountThunk,
  getDiscountsThunk,
} from "../../../../../store/action/manage";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Form,
  Input,
  Upload,
  message,
  Checkbox,
  Col,
  Row,
  InputNumber,
  DatePicker,
  Select,
} from "antd";
import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import ConfirmModalAntd from "../../../../../components/ConfirmModalAntd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getProductsForImportThunk } from "../../../../../store/action/product";
import moment from "moment";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

const DiscountAddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const stateData = location.state;
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [hadErrors, setHadErrors] = useState(true);
  const [sendData, setSendData] = useState();
  const [itemList, setItemList] = useState();
  useEffect(() => {
    dispatch(getProductsForImportThunk()).then((res) => {
      let temp = res?.payload?.itemList?.map((item) => {
        return { value: item?.id, label: item?.name };
      });
      setItemList(temp);
    });
  }, []);
  const handleModalCancel = (cancelled) => {
    if (cancelled) {
      // Handle cancellation here or set state based on the cancellation flag
      // console.log("Modal was cancelled");
    }
    setOpenModal(false);
  };
  const handleOkModal = (value) => {
    // const formDataAsObject = {};
    // value.forEach((value, key) => {
    //   formDataAsObject[key] = value;
    // });

    // console.log(formDataAsObject);
    value &&
      dispatch(creatDiscountThunk(value))
        .then((res) => {
          console.log(res);
          if (res?.payload?.message === "Create discount successfully") {
            toast.success("Tạo mới khuyến mãi thành công", {
              position: "top-right",
              autoClose: 3000,
              style: { color: "green", backgroundColor: "#DEF2ED" },
            });
            navigate("/manage/discount");
          } else {
            if (res?.error?.message === "Request failed with status code 409") {
              toast.error("Sản phẩm đã có khuyến mãi", {
                position: "top-right",
                autoClose: 3000,
                style: { color: "red", backgroundColor: "#DEF2ED" },
              });
            } else {
              toast.error("Thêm khuyến mãi thất bại", {
                position: "top-right",
                autoClose: 3000,
                style: { color: "red", backgroundColor: "#DEF2ED" },
              });
            }
          }
        })
        .then(() => {
          dispatch(getDiscountsThunk(0, 4)); // Corrected syntax
        });
  };
  const onFinish = (values) => {
    // console.log(moment(dayjs(values.time[0]).valueOf()).format("YYYY-MM-DD"));
    const lastData = new FormData();
    lastData.append("item_id", parseInt(values.item_id));
    lastData.append("percentDiscount", Number(values.percentDiscount));
    lastData.append(
      "startDate",
      moment(dayjs(values.time[0]).valueOf()).format("YYYY-MM-DD")
    );
    lastData.append(
      "endDate",
      moment(dayjs(values.time[1]).valueOf()).format("YYYY-MM-DD")
    );
    setSendData(lastData);
  };
  return (
    <div className="container">
      <div className="discount_form-container">
        <h4 className="discount_form-title">Tạo mới khuyến mãi</h4>
        <div className="discount_form-content">
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
            <div className="discount_content">
              <Form.Item
                className="discount_value"
                label="Mặt hàng khuyến mãi"
                name={"item_id"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn mặt hàng khuyến mãi",
                  },
                ]}
              >
                <Select options={itemList}></Select>
              </Form.Item>
              <Form.Item
                className="discount_value"
                label="Ưu đãi (%)"
                name={"percentDiscount"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập % ưu đãi",
                  },
                  {
                    validator: (_, value) => {
                      if (value != undefined && value != null) {
                        if (value <= 0) {
                          return Promise.reject("Ưu đãi phải lớn hơn 0%");
                        }
                        if (value > 100) {
                          return Promise.reject("Ưu đãi phải nhỏ hơn 100%");
                        }
                        return Promise.resolve();
                      } else {
                        return Promise.reject();
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                  placeholder="Nhập % ưu đãi"
                  onKeyDown={(event) => {
                    if (
                      !(
                        /[0-9]/.test(event.key) ||
                        event.key === "Backspace" ||
                        event.key === "Delete" ||
                        event.key.startsWith("Arrow")
                      )
                    ) {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
              <Form.Item
                className="discount_date"
                label="Thời gian áp dụng"
                name={"time"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian áp dụng",
                  },
                ]}
              >
                <RangePicker
                  format={"YYYY-MM-DD"}
                  placeholder={["Bắt đầu", "Kết thúc"]}
                />
              </Form.Item>
            </div>

            <div className="buttonGroup">
              <Form.Item className="submitBtn finish">
                <Button
                  type="submit"
                  htmlType="submit"
                  onClick={() => !hadErrors && setOpenModal(true)}
                >
                  Hoàn thành
                </Button>
              </Form.Item>

              <Form.Item className="cancelBtn">
                <Button
                  type="button"
                  onClick={() => navigate(`/manage/discount`)}
                >
                  Huỷ
                </Button>
              </Form.Item>
            </div>

            <ConfirmModalAntd
              open={openModal}
              onCancel={handleModalCancel}
              onOk={() => handleOkModal(sendData)}
              header={`Hoàn thành thêm khuyến mãi`}
              title={`Bạn có muốn thêm khuyến mãi này vào danh sách ?`}
            ></ConfirmModalAntd>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DiscountAddForm;
