import React, { useEffect, useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSizesThunk } from "../../store/action/manage";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; // Import Yup
import { ToastContainer, toast } from "react-toastify";

import CustomInput from "../../components/CustomInput";
import {
  createImportThunk,
  getListProductThunk,
  getProductsForImportThunk,
} from "../../store/action/product";
import SelectCustom from "../../components/Select";
import { useNavigate } from "react-router-dom";
const ImportPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { productList } = useSelector((state) => state.product.data);
  const [productsImport, setProductsImport] = useState();
  useEffect(() => {
    dispatch(getProductsForImportThunk()).then((res) => {
      setProductsImport(res?.payload?.itemList);
    });
  }, []);
  const [rowsInside, setRowsInside] = useState([
    {
      selection: "OLD",
      size: "",
      quantity: 0,
      raw_price: 0,
      width: 0,
      height: 0,
      length: 0,
    },
  ]);
  const [rowsOutside, setRowsOutside] = useState([]);
  const createDefaultRowInside = () => ({
    selection: "OLD",
    size: "",
    quantity: 0,
    raw_price: 0,
    width: 0,
    height: 0,
    length: 0,
  });

  const addRowOutside = () => {
    setRowsOutside((prevRowsOutside) => [
      ...prevRowsOutside,
      {
        insideRows: [createDefaultRowInside()],
      },
    ]);
  };

  const addRowInsideToOutside = (outsideIndex) => {
    setRowsOutside((prevRowsOutside) => {
      const updatedRowsOutside = [...prevRowsOutside];
      updatedRowsOutside[outsideIndex].insideRows.push(
        createDefaultRowInside()
      );
      return updatedRowsOutside;
    });
  };
  const [insideRowIndex, setInsideRowIndex] = useState(0);
  const [outsideRowIndex, setOutsideRowIndex] = useState(0);

  const [raw_prices, setRawPrices] = useState(
    Array(rowsInside.length).fill("")
  );
  const schema2 = yup.object().shape({
    ...Object.fromEntries(
      rowsOutside.map((_, outsideIndex) => [
        `name-${outsideIndex}`,
        yup.string().required("Vui lòng chọn sản phẩm"),
      ])
    ),
    ...rowsOutside.reduce((acc, outsideRow, outsideIndex) => {
      const insideSchema = outsideRow.insideRows.reduce(
        (insideAcc, rowInside, insideIndex) => {
          insideAcc[`quantity-${outsideIndex}-${insideIndex}`] = yup
            .string()
            .test(
              "startsWithNonZero",
              "Vui lòng nhập số bắt đầu là số khác 0",
              (value) => {
                return /^[1-9]/.test(value);
              }
            )
            .test(
              "validNumber",
              "Vui lòng nhập một số nguyên dương hợp lệ",
              (value) => {
                const numericValue = parseInt(value, 10);
                return /^[0-9]+$/.test(value) && numericValue > 0;
              }
            )
            .required("Vui lòng nhập Số lượng nhập");

          insideAcc[`raw_price-${outsideIndex}-${insideIndex}`] = yup
            .string()
            .transform((value) =>
              value ? value.replace(/\D/g, "") : undefined
            )
            .test("minValue", "* Giá nhập phải lớn hơn 0", (value) => {
              if (!value) return false;
              return Number(value) > 0;
            })
            .required("* Vui lòng nhập Giá nhập");

          // Add validation rules for the "NEW" selection
          if (rowInside.selection === "NEW") {
            insideAcc[`length-${outsideIndex}-${insideIndex}`] = yup
              .string()
              .test(
                "startsWithNonZero",
                "Vui lòng nhập số bắt đầu là số khác 0",
                (value) => {
                  return /^[1-9]/.test(value);
                }
              )
              .test(
                "greaterThanZero",
                "Vui lòng nhập một số lớn hơn 0",
                (value) => {
                  const numericValue = parseFloat(value);
                  return !isNaN(numericValue) && numericValue > 0;
                }
              )
              .required("Vui lòng nhập chiều dài");

            insideAcc[`width-${outsideIndex}-${insideIndex}`] = yup
              .string()
              .test(
                "startsWithNonZero",
                "Vui lòng nhập số bắt đầu là số khác 0",
                (value) => {
                  return /^[1-9]/.test(value);
                }
              )
              .test(
                "greaterThanZero",
                "Vui lòng nhập một số lớn hơn 0",
                (value) => {
                  const numericValue = parseFloat(value);
                  return !isNaN(numericValue) && numericValue > 0;
                }
              )
              .required("Vui lòng nhập chiều rộng");

            insideAcc[`height-${outsideIndex}-${insideIndex}`] = yup
              .string()
              .test(
                "startsWithNonZero",
                "Vui lòng nhập số bắt đầu là số khác 0",
                (value) => {
                  return /^[1-9]/.test(value);
                }
              )
              .test(
                "greaterThanZero",
                "Vui lòng nhập một số lớn hơn 0",
                (value) => {
                  const numericValue = parseFloat(value);
                  return !isNaN(numericValue) && numericValue > 0;
                }
              )
              .required("Vui lòng nhập chiều cao");
          }
          if (rowInside.selection === "OLD") {
            insideAcc[`size-${outsideIndex}-${insideIndex}`] = yup
              .string()
              .required("* Vui lòng chọn kích thước");
          }

          return insideAcc;
        },
        {}
      );

      return {
        ...acc,
        ...insideSchema,
      };
    }, {}),
  });

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema2),
  });
  const [sizeList, setSizeList] = useState();

  const handleRadioChange = (outsideIndex, insideIndex, value) => {
    setRowsOutside((prevRowsOutside) => {
      const updatedRowsOutside = [...prevRowsOutside];
      updatedRowsOutside[outsideIndex].insideRows = updatedRowsOutside[
        outsideIndex
      ].insideRows.map((rowInside, rowIndex) =>
        rowIndex === insideIndex
          ? { ...rowInside, selection: value }
          : rowInside
      );
      return updatedRowsOutside;
    });
  };
  const handleInputChange = (index, inputName, inputValue) => {
    const updatedRows = [...rowsInside];
    updatedRows[index][inputName] = inputValue;
    setRowsInside(updatedRows);
  };

  useEffect(() => {
    dispatch(getSizesThunk()).then((res) => {
      setSizeList(res?.payload?.data);
    });
  }, []);
  useEffect(() => {
    dispatch(getListProductThunk());
  }, []);
  // const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const handleMoneyValue = (outsideIndex, insideIndex, value) => {
    let numericValue = value.replace(/\D/g, "");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    setRowsOutside((prevRowsOutside) => {
      const updatedRowsOutside = [...prevRowsOutside];
      updatedRowsOutside[outsideIndex].insideRows[insideIndex].raw_price =
        formattedValue;
      return updatedRowsOutside;
    });
  };

  const handleImport = (value) => {
    const groupedValues = [];
    for (const key in value) {
      const [fieldName, outsideIndex, insideIndex] = key.split("-");

      if (!groupedValues[outsideIndex]) {
        groupedValues[outsideIndex] = {
          outsideIndex,
          insideRows: [],
          name: "", // Initialize an empty array for names
        };
      }

      if (!groupedValues[outsideIndex].insideRows[insideIndex]) {
        groupedValues[outsideIndex].insideRows[insideIndex] = {
          insideIndex,
        };
      }

      if (fieldName === "name") {
        groupedValues[outsideIndex].name = value[key];
      } else {
        groupedValues[outsideIndex].insideRows[insideIndex][fieldName] =
          value[key];
      }
    }

    const sendData = new FormData();
    sendData.append("imports", JSON.stringify(groupedValues));
    dispatch(createImportThunk(sendData)).then((res) => {
      if (res?.payload?.message == "Create import successfully") {
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
        <form className="import_form" onSubmit={handleSubmit(handleImport)}>
          {rowsOutside.map((rowOutside, outsideIndex) => (
            <div key={outsideRowIndex}>
              <div className="import_form-name">
                {productsImport && (
                  <SelectCustom
                    setValue={setValue}
                    id={`name-${outsideIndex}`}
                    register={register}
                    label={"Sản phẩm"}
                    options={productsImport}
                    type="productImport"
                    // arrDefault={otherInfo?.positionDTOs || null}
                    placeholder={"Chọn sản phẩm"}
                  >
                    {errors[`name-${outsideIndex}`]?.message}
                  </SelectCustom>
                )}
              </div>
              <div className="import_form-size-price">
                {rowOutside.insideRows.map((rowInside, insideIndex) => (
                  <div key={insideIndex}>
                    <RadioGroup
                      className="import_form-size-radioGr"
                      name={`option-${insideIndex}`}
                      value={rowInside.selection}
                      onChange={(event) =>
                        handleRadioChange(
                          outsideIndex,
                          insideIndex,
                          event.target.value
                        )
                      }
                    >
                      <FormControlLabel
                        value="OLD"
                        control={<Radio />}
                        label="Size cũ"
                      />
                      <FormControlLabel
                        value="NEW"
                        control={<Radio />}
                        label="Size mới"
                      />
                    </RadioGroup>
                    {rowInside.selection == "OLD" ? (
                      <div className="import_form-size-oldValueGr">
                        {sizeList.length > 0 ? (
                          <SelectCustom
                            setValue={setValue}
                            id={`size-${outsideIndex}-${insideIndex}`}
                            register={register}
                            label={"Kích thước"}
                            options={sizeList}
                            type="size"
                            // arrDefault={otherInfo?.positionDTOs || null}
                            placeholder={"Chọn Kích thước"}
                          >
                            {
                              errors[`size-${outsideIndex}-${insideIndex}`]
                                ?.message
                            }
                          </SelectCustom>
                        ) : (
                          <></>
                        )}

                        <CustomInput
                          label="Số lượng"
                          id={`quantity-${outsideIndex}-${insideIndex}`}
                          setValue={setValue}
                          register={register}
                          type="text"
                          placeholder="Nhập số lượng nhập"
                          className="form_product-name"
                        >
                          {
                            errors[`quantity-${outsideIndex}-${insideIndex}`]
                              ?.message
                          }
                        </CustomInput>
                        <CustomInput
                          label="Giá nhập"
                          id={`raw_price-${outsideIndex}-${insideIndex}`}
                          setValue={setValue}
                          register={register}
                          type="text"
                          placeholder="Nhập giá nhập"
                          className="form_product-name"
                          onChange={(e) =>
                            handleMoneyValue(
                              outsideIndex,
                              insideIndex,
                              e.target.value
                            )
                          }
                          value={
                            rowsOutside[outsideIndex]?.insideRows[insideIndex]
                              ?.raw_price
                          } // Use the formatted value from your state
                        >
                          {
                            errors[`raw_price-${outsideIndex}-${insideIndex}`]
                              ?.message
                          }
                        </CustomInput>
                      </div>
                    ) : (
                      <div className="import_form-size-newValueGr">
                        <CustomInput
                          className="import_form-size-newValue"
                          label="Dài"
                          id={`length-${outsideIndex}-${insideIndex}`}
                          setValue={setValue}
                          register={register}
                          type="text"
                          placeholder="Nhập chiều dài"
                        >
                          {
                            errors[`length-${outsideIndex}-${insideIndex}`]
                              ?.message
                          }
                        </CustomInput>
                        <CustomInput
                          className="import_form-size-newValue"
                          label="Rộng"
                          id={`width-${outsideIndex}-${insideIndex}`}
                          setValue={setValue}
                          register={register}
                          type="text"
                          placeholder="Nhập chiều rộng"
                          // onChange={(e) => handleMoneyValue(e, index)}
                          // value={raw_prices[index]}
                        >
                          {
                            errors[`width-${outsideIndex}-${insideIndex}`]
                              ?.message
                          }
                        </CustomInput>

                        <CustomInput
                          className="import_form-size-newValue"
                          label="Cao"
                          id={`height-${outsideIndex}-${insideIndex}`}
                          setValue={setValue}
                          register={register}
                          type="text"
                          placeholder="Nhập chiều cao"
                          // onChange={(e) => handleMoneyValue(e, index)}
                          // value={raw_prices[index]}
                        >
                          {
                            errors[`height-${outsideIndex}-${insideIndex}`]
                              ?.message
                          }
                        </CustomInput>

                        <CustomInput
                          label="Số lượng"
                          id={`quantity-${outsideIndex}-${insideIndex}`}
                          setValue={setValue}
                          register={register}
                          type="text"
                          placeholder="Nhập số lượng nhập"
                          className="form_product-name"
                        >
                          {
                            errors[`quantity-${outsideIndex}-${insideIndex}`]
                              ?.message
                          }
                        </CustomInput>
                        <CustomInput
                          label="Giá nhập"
                          id={`raw_price-${outsideIndex}-${insideIndex}`}
                          setValue={setValue}
                          register={register}
                          type="text"
                          placeholder="Nhập giá nhập"
                          className="form_product-name"
                          onChange={(e) =>
                            handleMoneyValue(
                              outsideIndex,
                              insideIndex,
                              e.target.value
                            )
                          }
                          value={
                            rowsOutside[outsideIndex]?.insideRows[insideIndex]
                              ?.raw_price
                          } // Use the formatted value from your state
                        >
                          {
                            errors[`raw_price-${outsideIndex}-${insideIndex}`]
                              ?.message
                          }
                        </CustomInput>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addRowInsideToOutside(outsideIndex)}
                >
                  Thêm kích thước
                </button>
              </div>
            </div>
          ))}
          <div className="import_form-btnGroup">
            <button type="button" onClick={() => addRowOutside()}>
              Thêm sản phẩm
            </button>
            <button type="submit">Hoàn tất nhập hàng</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportPage;
