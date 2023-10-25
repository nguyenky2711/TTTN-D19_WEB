// import React, { useEffect, useState } from "react";
// import {
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   TextField,
//   Container,
//   Paper,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";

// import "./style.scss";
// import { useDispatch, useSelector } from "react-redux";
// import { getSizesThunk } from "../../store/action/manage";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup"; // Import Yup
// import { ToastContainer, toast } from "react-toastify";

// import CustomInput from "../../components/CustomInput";
// import {
//   createImportThunk,
//   getListProductThunk,
//   getProductsForImportThunk,
// } from "../../store/action/product";
// import SelectCustom from "../../components/Select";
// import { useNavigate } from "react-router-dom";
// const ImportPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // const { productList } = useSelector((state) => state.product.data);
//   const [productsImport, setProductsImport] = useState();
//   useEffect(() => {
//     dispatch(getProductsForImportThunk()).then((res) => {
//       setProductsImport(res?.payload?.itemList);
//     });
//   }, []);
//   const [rowsInside, setRowsInside] = useState([
//     {
//       selection: "OLD",
//       size: "",
//       quantity: 0,
//       raw_price: 0,
//       width: 0,
//       height: 0,
//       length: 0,
//     },
//   ]);
//   const [rowsOutside, setRowsOutside] = useState([]);
//   const createDefaultRowInside = () => ({
//     selection: "OLD",
//     size: "",
//     quantity: 0,
//     raw_price: 0,
//     width: 0,
//     height: 0,
//     length: 0,
//   });

//   const addRowOutside = () => {
//     setRowsOutside((prevRowsOutside) => [
//       ...prevRowsOutside,
//       {
//         insideRows: [createDefaultRowInside()],
//       },
//     ]);
//   };

//   const addRowInsideToOutside = (outsideIndex) => {
//     setRowsOutside((prevRowsOutside) => {
//       const updatedRowsOutside = [...prevRowsOutside];
//       updatedRowsOutside[outsideIndex].insideRows.push(
//         createDefaultRowInside()
//       );
//       return updatedRowsOutside;
//     });
//   };
//   const [insideRowIndex, setInsideRowIndex] = useState(0);
//   const [outsideRowIndex, setOutsideRowIndex] = useState(0);

//   const [raw_prices, setRawPrices] = useState(
//     Array(rowsInside.length).fill("")
//   );
//   const schema2 = yup.object().shape({
//     ...Object.fromEntries(
//       rowsOutside.map((_, outsideIndex) => [
//         `name-${outsideIndex}`,
//         yup.string().required("Vui lòng chọn sản phẩm"),
//       ])
//     ),
//     ...rowsOutside.reduce((acc, outsideRow, outsideIndex) => {
//       const insideSchema = outsideRow.insideRows.reduce(
//         (insideAcc, rowInside, insideIndex) => {
//           insideAcc[`quantity-${outsideIndex}-${insideIndex}`] = yup
//             .string()
//             .test(
//               "startsWithNonZero",
//               "Vui lòng nhập số bắt đầu là số khác 0",
//               (value) => {
//                 return /^[1-9]/.test(value);
//               }
//             )
//             .test(
//               "validNumber",
//               "Vui lòng nhập một số nguyên dương hợp lệ",
//               (value) => {
//                 const numericValue = parseInt(value, 10);
//                 return /^[0-9]+$/.test(value) && numericValue > 0;
//               }
//             )
//             .required("Vui lòng nhập Số lượng nhập");

//           insideAcc[`raw_price-${outsideIndex}-${insideIndex}`] = yup
//             .string()
//             .transform((value) =>
//               value ? value.replace(/\D/g, "") : undefined
//             )
//             .test("minValue", "* Giá nhập phải lớn hơn 0", (value) => {
//               if (!value) return false;
//               return Number(value) > 0;
//             })
//             .required("* Vui lòng nhập Giá nhập");

//           // Add validation rules for the "NEW" selection
//           if (rowInside.selection === "NEW") {
//             insideAcc[`length-${outsideIndex}-${insideIndex}`] = yup
//               .string()
//               .test(
//                 "startsWithNonZero",
//                 "Vui lòng nhập số bắt đầu là số khác 0",
//                 (value) => {
//                   return /^[1-9]/.test(value);
//                 }
//               )
//               .test(
//                 "greaterThanZero",
//                 "Vui lòng nhập một số lớn hơn 0",
//                 (value) => {
//                   const numericValue = parseFloat(value);
//                   return !isNaN(numericValue) && numericValue > 0;
//                 }
//               )
//               .required("Vui lòng nhập chiều dài");

//             insideAcc[`width-${outsideIndex}-${insideIndex}`] = yup
//               .string()
//               .test(
//                 "startsWithNonZero",
//                 "Vui lòng nhập số bắt đầu là số khác 0",
//                 (value) => {
//                   return /^[1-9]/.test(value);
//                 }
//               )
//               .test(
//                 "greaterThanZero",
//                 "Vui lòng nhập một số lớn hơn 0",
//                 (value) => {
//                   const numericValue = parseFloat(value);
//                   return !isNaN(numericValue) && numericValue > 0;
//                 }
//               )
//               .required("Vui lòng nhập chiều rộng");

//             insideAcc[`height-${outsideIndex}-${insideIndex}`] = yup
//               .string()
//               .test(
//                 "startsWithNonZero",
//                 "Vui lòng nhập số bắt đầu là số khác 0",
//                 (value) => {
//                   return /^[1-9]/.test(value);
//                 }
//               )
//               .test(
//                 "greaterThanZero",
//                 "Vui lòng nhập một số lớn hơn 0",
//                 (value) => {
//                   const numericValue = parseFloat(value);
//                   return !isNaN(numericValue) && numericValue > 0;
//                 }
//               )
//               .required("Vui lòng nhập chiều cao");
//           }
//           if (rowInside.selection === "OLD") {
//             insideAcc[`size-${outsideIndex}-${insideIndex}`] = yup
//               .string()
//               .required("* Vui lòng chọn kích thước");
//           }

//           return insideAcc;
//         },
//         {}
//       );

//       return {
//         ...acc,
//         ...insideSchema,
//       };
//     }, {}),
//   });

//   const {
//     register,
//     setValue,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     mode: "all",
//     resolver: yupResolver(schema2),
//   });
//   const [sizeList, setSizeList] = useState();

//   const handleRadioChange = (outsideIndex, insideIndex, value) => {
//     setRowsOutside((prevRowsOutside) => {
//       const updatedRowsOutside = [...prevRowsOutside];
//       updatedRowsOutside[outsideIndex].insideRows = updatedRowsOutside[
//         outsideIndex
//       ].insideRows.map((rowInside, rowIndex) =>
//         rowIndex === insideIndex
//           ? { ...rowInside, selection: value }
//           : rowInside
//       );
//       return updatedRowsOutside;
//     });
//   };
//   const handleInputChange = (index, inputName, inputValue) => {
//     const updatedRows = [...rowsInside];
//     updatedRows[index][inputName] = inputValue;
//     setRowsInside(updatedRows);
//   };

//   useEffect(() => {
//     dispatch(getSizesThunk()).then((res) => {
//       setSizeList(res?.payload?.data);
//     });
//   }, []);
//   useEffect(() => {
//     dispatch(getListProductThunk());
//   }, []);
//   // const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//   const handleMoneyValue = (outsideIndex, insideIndex, value) => {
//     let numericValue = value.replace(/\D/g, "");
//     const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

//     setRowsOutside((prevRowsOutside) => {
//       const updatedRowsOutside = [...prevRowsOutside];
//       updatedRowsOutside[outsideIndex].insideRows[insideIndex].raw_price =
//         formattedValue;
//       return updatedRowsOutside;
//     });
//   };

//   const handleImport = (value) => {
//     const groupedValues = [];
//     for (const key in value) {
//       const [fieldName, outsideIndex, insideIndex] = key.split("-");

//       if (!groupedValues[outsideIndex]) {
//         groupedValues[outsideIndex] = {
//           outsideIndex,
//           insideRows: [],
//           name: "", // Initialize an empty array for names
//         };
//       }

//       if (!groupedValues[outsideIndex].insideRows[insideIndex]) {
//         groupedValues[outsideIndex].insideRows[insideIndex] = {
//           insideIndex,
//         };
//       }

//       if (fieldName === "name") {
//         groupedValues[outsideIndex].name = value[key];
//       } else {
//         groupedValues[outsideIndex].insideRows[insideIndex][fieldName] =
//           value[key];
//       }
//     }

//     const sendData = new FormData();
//     sendData.append("imports", JSON.stringify(groupedValues));
//     for (const entry of sendData.entries()) {
//       const [key, value] = entry;
//       console.log(`${key}: ${value}`);
//     }
//     // dispatch(createImportThunk(sendData)).then((res) => {
//     //   if (res?.payload?.message == "Create import successfully") {
//     //     toast.success("Nhập hàng thành công", {
//     //       position: "top-right",
//     //       autoClose: 3000,
//     //       style: { color: "green", backgroundColor: "#D7F1FD" },
//     //     });
//     //     navigate("/manage/product");
//     //   } else {
//     //     toast.error("Nhập hàng thất bại", {
//     //       position: "top-right",
//     //       autoClose: 3000,
//     //       style: { color: "red", backgroundColor: "#D7F1FD" },
//     //     });
//     //   }
//     // });
//   };

//   return (
//     <div className="container">
//       <div className="import_container">
//         <form className="import_form" onSubmit={handleSubmit(handleImport)}>
//           {rowsOutside.map((rowOutside, outsideIndex) => (
//             <div key={outsideRowIndex}>
//               <div className="import_form-name">
//                 {productsImport && (
//                   <SelectCustom
//                     setValue={setValue}
//                     id={`name-${outsideIndex}`}
//                     register={register}
//                     label={"Sản phẩm"}
//                     options={productsImport}
//                     type="productImport"
//                     // arrDefault={otherInfo?.positionDTOs || null}
//                     placeholder={"Chọn sản phẩm"}
//                   >
//                     {errors[`name-${outsideIndex}`]?.message}
//                   </SelectCustom>
//                 )}
//               </div>
//               <div className="import_form-size-price">
//                 {rowOutside.insideRows.map((rowInside, insideIndex) => (
//                   <div key={insideIndex}>
//                     <RadioGroup
//                       className="import_form-size-radioGr"
//                       name={`option-${insideIndex}`}
//                       value={rowInside.selection}
//                       onChange={(event) =>
//                         handleRadioChange(
//                           outsideIndex,
//                           insideIndex,
//                           event.target.value
//                         )
//                       }
//                     >
//                       <FormControlLabel
//                         value="OLD"
//                         control={<Radio />}
//                         label="Size cũ"
//                       />
//                       <FormControlLabel
//                         value="NEW"
//                         control={<Radio />}
//                         label="Size mới"
//                       />
//                     </RadioGroup>
//                     {rowInside.selection == "OLD" ? (
//                       <div className="import_form-size-oldValueGr">
//                         {sizeList.length > 0 ? (
//                           <SelectCustom
//                             setValue={setValue}
//                             id={`size-${outsideIndex}-${insideIndex}`}
//                             register={register}
//                             label={"Kích thước"}
//                             options={sizeList}
//                             type="size"
//                             // arrDefault={otherInfo?.positionDTOs || null}
//                             placeholder={"Chọn Kích thước"}
//                           >
//                             {
//                               errors[`size-${outsideIndex}-${insideIndex}`]
//                                 ?.message
//                             }
//                           </SelectCustom>
//                         ) : (
//                           <></>
//                         )}

//                         <CustomInput
//                           label="Số lượng"
//                           id={`quantity-${outsideIndex}-${insideIndex}`}
//                           setValue={setValue}
//                           register={register}
//                           type="text"
//                           placeholder="Nhập số lượng nhập"
//                           className="form_product-name"
//                         >
//                           {
//                             errors[`quantity-${outsideIndex}-${insideIndex}`]
//                               ?.message
//                           }
//                         </CustomInput>
//                         <CustomInput
//                           label="Giá nhập"
//                           id={`raw_price-${outsideIndex}-${insideIndex}`}
//                           setValue={setValue}
//                           register={register}
//                           type="text"
//                           placeholder="Nhập giá nhập"
//                           className="form_product-name"
//                           onChange={(e) =>
//                             handleMoneyValue(
//                               outsideIndex,
//                               insideIndex,
//                               e.target.value
//                             )
//                           }
//                           value={
//                             rowsOutside[outsideIndex]?.insideRows[insideIndex]
//                               ?.raw_price
//                           } // Use the formatted value from your state
//                         >
//                           {
//                             errors[`raw_price-${outsideIndex}-${insideIndex}`]
//                               ?.message
//                           }
//                         </CustomInput>
//                       </div>
//                     ) : (
//                       <div className="import_form-size-newValueGr">
//                         <CustomInput
//                           className="import_form-size-newValue"
//                           label="Dài"
//                           id={`length-${outsideIndex}-${insideIndex}`}
//                           setValue={setValue}
//                           register={register}
//                           type="text"
//                           placeholder="Nhập chiều dài"
//                         >
//                           {
//                             errors[`length-${outsideIndex}-${insideIndex}`]
//                               ?.message
//                           }
//                         </CustomInput>
//                         <CustomInput
//                           className="import_form-size-newValue"
//                           label="Rộng"
//                           id={`width-${outsideIndex}-${insideIndex}`}
//                           setValue={setValue}
//                           register={register}
//                           type="text"
//                           placeholder="Nhập chiều rộng"
//                           // onChange={(e) => handleMoneyValue(e, index)}
//                           // value={raw_prices[index]}
//                         >
//                           {
//                             errors[`width-${outsideIndex}-${insideIndex}`]
//                               ?.message
//                           }
//                         </CustomInput>

//                         <CustomInput
//                           className="import_form-size-newValue"
//                           label="Cao"
//                           id={`height-${outsideIndex}-${insideIndex}`}
//                           setValue={setValue}
//                           register={register}
//                           type="text"
//                           placeholder="Nhập chiều cao"
//                           // onChange={(e) => handleMoneyValue(e, index)}
//                           // value={raw_prices[index]}
//                         >
//                           {
//                             errors[`height-${outsideIndex}-${insideIndex}`]
//                               ?.message
//                           }
//                         </CustomInput>

//                         <CustomInput
//                           label="Số lượng"
//                           id={`quantity-${outsideIndex}-${insideIndex}`}
//                           setValue={setValue}
//                           register={register}
//                           type="text"
//                           placeholder="Nhập số lượng nhập"
//                           className="form_product-name"
//                         >
//                           {
//                             errors[`quantity-${outsideIndex}-${insideIndex}`]
//                               ?.message
//                           }
//                         </CustomInput>
//                         <CustomInput
//                           label="Giá nhập"
//                           id={`raw_price-${outsideIndex}-${insideIndex}`}
//                           setValue={setValue}
//                           register={register}
//                           type="text"
//                           placeholder="Nhập giá nhập"
//                           className="form_product-name"
//                           onChange={(e) =>
//                             handleMoneyValue(
//                               outsideIndex,
//                               insideIndex,
//                               e.target.value
//                             )
//                           }
//                           value={
//                             rowsOutside[outsideIndex]?.insideRows[insideIndex]
//                               ?.raw_price
//                           } // Use the formatted value from your state
//                         >
//                           {
//                             errors[`raw_price-${outsideIndex}-${insideIndex}`]
//                               ?.message
//                           }
//                         </CustomInput>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => addRowInsideToOutside(outsideIndex)}
//                 >
//                   Thêm kích thước
//                 </button>
//               </div>
//             </div>
//           ))}
//           <div className="import_form-btnGroup">
//             <button type="button" onClick={() => addRowOutside()}>
//               Thêm sản phẩm
//             </button>
//             <button type="submit">Hoàn tất nhập hàng</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ImportPage;

import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Radio, Select, Space } from "antd";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import ConfirmModalAntd from "../../components/ConfirmModalAntd";
// import ConfirmModalAntd from "src/component/shared/ConfirmModalAntd";
const ImportPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [hadOpenModal, setHadOpenModal] = useState(false);

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
    console.log(values);
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
          <Form.List name="itemlist" initialValue={[{ sizeType: 1 }]}>
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
                        name={[outerField.name, "nameItem"]}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn sản phẩm",
                          },
                        ]}
                      >
                        <Select options={[{ value: "a", label: "as" }]} />
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
                        "itemlist",
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
                            <InputNumber />
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
                            <InputNumber />
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
                            <InputNumber />
                          </Form.Item>
                        </>
                      ) : (
                        <Form.Item
                          className="import_item size"
                          label="Kích thước (Size)"
                          name={[outerField.name, "size"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn kích thước",
                            },
                          ]}
                        >
                          <Select options={[{ value: "a", label: "as" }]} />
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
                        <InputNumber />
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
                        <InputNumber />
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
              <Button type="button" onClick={() => navigate("/manage/product")}>
                Huỷ
              </Button>
            </Form.Item>
          </div>
          <ConfirmModalAntd
            open={openModal}
            onCancel={handleModalCancel}
            onOk={() => form.submit()}
            header={"Thêm khoá học "}
            title={"Bạn có muốn thêm khoá học"}
          ></ConfirmModalAntd>
        </Form>
      </div>
    </div>
  );
};

export default ImportPage;
