import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Radio, Select, Space } from "antd";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import ConfirmModalAntd from "../../components/ConfirmModalAntd";
import {
  createImportThunk,
  getProductsForImportThunk,
} from "../../store/action/product";
import { getSizesThunk } from "../../store/action/manage";
// import ConfirmModalAntd from "src/component/shared/ConfirmModalAntd";
const ImportPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [sendData, setSendData] = useState();
  const [itemList, setItemList] = useState();
  const [sizeList, setSizeList] = useState();

  useEffect(() => {
    dispatch(getProductsForImportThunk()).then((res) => {
      const tempList = res?.payload?.itemList?.map((item) => {
        return {
          value: item?.id,
          label: item?.name,
        };
      });
      setItemList(tempList);
    });
    dispatch(getSizesThunk()).then((res) => {
      const tempList = res?.payload?.data?.map((item) => {
        return {
          value: item?.id,
          label: item?.info_size,
        };
      });
      setSizeList(tempList);
    });
  }, []);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleModalCancel = (cancelled) => {
    if (cancelled) {
      // Handle cancellation here or set state based on the cancellation flag
      // console.log("Modal was cancelled");
    }
    setOpenModal(false);
  };

  const onFinish = (values) => {
    const lastData = new FormData();
    lastData.append("requestData", JSON.stringify(values));
    setSendData(lastData);
    setOpenModal(true);
  };
  const handleOkModal = (value) => {
    value &&
      dispatch(createImportThunk(value)).then((res) => {
        if (res?.payload?.message === "Create import successfully") {
          toast.success("Nhập hàng thành công", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "green", backgroundColor: "#D7F1FD" },
          });
          navigate("/manage/product");
        } else {
          toast.error("Nhập hàng thất bại", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "red", backgroundColor: "#D7F1FD" },
          });
        }
      });
  };

  return (
    <div className="container">
      <div className="import_container">
        <div className="import_title">
          <h2>Thông tin nhập hàng </h2>
          <p>
            Ngày: <span>{moment(new Date()).format("DD-MM-YYYY")}</span>
          </p>
        </div>
        {itemList && sizeList && (
          <Form
            name="dynamic_form_nest_item"
            form={form}
            onFinish={onFinish}
            style={{
              maxWidth: "100%",
            }}
            autoComplete="off"
            onFieldsChange={(changeField, allFields) => {
              // console.log(changeField);
              if (changeField[0].name[4] === "sizeType") {
                // The fields you want to set to null
                const fieldsToSetNull = ["height", "width", "length", "size"];

                // Loop through the fields and set them to null
                fieldsToSetNull.forEach((fieldName) => {
                  form.setFieldValue(
                    [
                      changeField[0].name[0],
                      changeField[0].name[1],
                      changeField[0].name[2],
                      changeField[0].name[3],
                      fieldName,
                    ],
                    null
                  );
                });
              }
            }}
          >
            <Form.List name="importlist" initialValue={[{ sizeType: 1 }]}>
              {(outerFields, { add: addOuter, remove: removeOuter }) => (
                <div>
                  {outerFields.map((outerField, outerIndex) => (
                    <Space
                      className="import_item_container"
                      key={outerField.key}
                      style={{
                        display: "flex",
                        gap: "15px",
                      }}
                      align="baseline"
                    >
                      <div className="import_item top">
                        <Form.Item
                          className="import_item name"
                          label="Tên sản phẩm"
                          name={[outerField.name, "itemId"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn sản phẩm",
                            },
                          ]}
                        >
                          <Select options={itemList} />
                        </Form.Item>
                        <Form.Item
                          className="import_item size"
                          label="Loại kích thước (Size)"
                          name={[outerField.name, "sizeType"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn loại kích thước",
                            },
                          ]}
                        >
                          <Radio.Group
                            defaultValue={1}
                            value={form.getFieldValue([
                              outerField.name,
                              "sizeType",
                            ])}
                            onChange={(e) => {
                              // Khi radiobutton thay đổi, cập nhật giá trị trong form
                              form.setFieldsValue({
                                [outerField.name + ".sizeType"]: e.target.value,
                              });
                            }}
                          >
                            <Radio value={1}>Cũ</Radio>
                            <Radio value={2}>Mới</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
                      <div className="importContent_container">
                        {form.getFieldValue([
                          "importlist",
                          outerIndex,
                          "sizeType",
                        ]) === 2 ? (
                          <>
                            <Form.Item
                              className="import_item height"
                              label="Chiều cao (cm)"
                              name={[outerField.name, "height"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập chiều cao",
                                },
                                // ...
                              ]}
                            >
                              <InputNumber
                                onKeyDown={(event) => {
                                  if (
                                    !(
                                      /[0-9.]/.test(event.key) ||
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
                              className="import_item width"
                              label="Chiều rộng (cm)"
                              name={[outerField.name, "width"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập chiều rộng",
                                },
                                // ...
                              ]}
                            >
                              <InputNumber
                                onKeyDown={(event) => {
                                  if (
                                    !(
                                      /[0-9.]/.test(event.key) ||
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
                              className="import_item length"
                              label="Chiều dài (cm)"
                              name={[outerField.name, "length"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập chiều dài",
                                },
                                // ...
                              ]}
                            >
                              <InputNumber
                                onKeyDown={(event) => {
                                  if (
                                    !(
                                      /[0-9.]/.test(event.key) ||
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
                          </>
                        ) : (
                          <Form.Item
                            className="import_item size"
                            label="Kích thước (Size)"
                            name={[outerField.name, "sizeId"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng chọn kích thước",
                              },
                            ]}
                          >
                            <Select options={sizeList} />
                          </Form.Item>
                        )}
                        <Form.Item
                          className="import_item price"
                          label="Giá nhập (VND)"
                          name={[outerField.name, "price"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập giá nhập",
                            },
                            // ...
                          ]}
                        >
                          <InputNumber
                            formatter={(value) =>
                              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
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
                          className="import_item quantity"
                          label="Số lượng (Cái)"
                          name={[outerField.name, "quantity"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập số lượng nhập",
                            },
                            // ...
                          ]}
                        >
                          <InputNumber
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
                      </div>

                      {outerIndex > 0 && (
                        <p
                          className="removeBtn"
                          onClick={() => {
                            removeOuter(outerField.name);
                          }}
                        >
                          <DeleteOutlined />
                          Xoá sản phẩm
                        </p>
                      )}
                    </Space>
                  ))}
                  <Form.Item
                    style={{
                      margin: "50px auto",
                      width: "180px",
                    }}
                  >
                    <Button
                      type="dashed"
                      onClick={() => {
                        addOuter();
                      }} // Make sure 'add' is a valid function
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm sản phẩm
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>

            <div className="buttonGroup">
              <Form.Item className="submitBtn">
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
                  onClick={() => navigate("/manage/product")}
                >
                  Huỷ
                </Button>
              </Form.Item>
            </div>
          </Form>
        )}

        <ConfirmModalAntd
          open={openModal}
          onCancel={handleModalCancel}
          onOk={() => handleOkModal(sendData)}
          header={"Thêm khoá học "}
          title={"Bạn có muốn thêm khoá học"}
        ></ConfirmModalAntd>
      </div>
    </div>
  );
};

export default ImportPage;
