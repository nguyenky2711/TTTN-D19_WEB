import React, { useEffect, useState } from "react";
import "./style.scss";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getListProductThunk } from "../../../store/action/product";
import DatePickerWithLabel from "../../../components/CustomDatePicker/CustomDatePicker";
import {
  statisticItemByDateThunk,
  statisticItemByMonthThunk,
  statisticTotalByDateThunk,
  statisticTotalByMonthThunk,
} from "../../../store/action/manage";
import moment from "moment";
import ChartStatistic from "./chart";
const ManageStatistic = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(1);
  const [dateStatictic, setDateStatictic] = useState();
  const [monthStatictic, setMonthStatictic] = useState();
  const [selectedProduct, setSelectedProduct] = useState("");
  const handleSelectedProduct = (event) => {
    setSelectedProduct(event.target.value);
  };
  useEffect(() => {
    dispatch(getListProductThunk());
  }, []);
  useEffect(() => {
    if (
      selectedDate != undefined &&
      selectedTime == 1 &&
      (selectedProduct == "" || selectedProduct == "Tất cả")
    ) {
      const sendDate = moment(selectedDate).format("DD-MM-YYYY");
      console.log(sendDate);
      dispatch(statisticTotalByDateThunk(sendDate)).then((res) => {
        setDateStatictic(res?.payload?.data);
      });
    }
    if (
      selectedDate != undefined &&
      selectedTime == 2 &&
      (selectedProduct == "" || selectedProduct == "Tất cả")
    ) {
      const sendDate = moment(selectedDate).format("MM");

      dispatch(statisticTotalByMonthThunk(sendDate)).then((res) => {
        setMonthStatictic(res?.payload?.data);
      });
    }
    if (
      selectedDate != undefined &&
      selectedTime == 1 &&
      selectedProduct != "" &&
      selectedProduct != "Tất cả"
    ) {
      const sendDate = moment(selectedDate).format("DD-MM-YYYY");
      dispatch(statisticItemByDateThunk([selectedProduct, sendDate])).then(
        (res) => {
          setDateStatictic(res?.payload?.data);
        }
      );
    }
    if (
      selectedDate != undefined &&
      selectedTime == 2 &&
      selectedProduct != "" &&
      selectedProduct != "Tất cả"
    ) {
      const sendDate = moment(selectedDate).format("MM");
      dispatch(statisticItemByMonthThunk([selectedProduct, sendDate])).then(
        (res) => {
          setMonthStatictic(res?.payload?.data);
        }
      );
    }
    // if(selectedDate )
  }, [selectedDate, selectedTime, selectedProduct]);
  const { productList } = useSelector((state) => state.product.data);

  const handleRadioChange = (event) => {
    setSelectedTime(event.target.value); // Update the selected value when radio changes
  };
  const handleDateChange = (date) => {
    if (date != undefined) {
      setSelectedDate(date);
    }
    // dispatch(statisticTotalByDateThunk())
    // Perform any other actions you want with the selected date
  };

  const handleStatistic = () => {
    console.log(moment(selectedDate).format("DD-MM-YYYY"));
    dispatch();
  };
  return (
    <div className="container">
      <div className="manageStatistic_container">
        <h1 className="manageStatistic_title">Thống kê</h1>
        <div className="manageStatistic_selection">
          <div className="manageStatistic_selection-type">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Sản phẩm
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedProduct}
                label="Sản phẩm"
                onChange={handleSelectedProduct}
                defaultValue="Tất cả"
              >
                <MenuItem value="Tất cả">Tất cả</MenuItem>
                {productList.map((item) => {
                  return (
                    <MenuItem value={item[0].itemDTO.data.id}>
                      {item[0].itemDTO.data.name}
                    </MenuItem>
                  );
                })}
              </Select>
              {/* <FormHelperText>With label + helper text</FormHelperText> */}
            </FormControl>
          </div>
          <div className="manageStatistic_selection-time">
            <FormControl className="manageStatistic_form-time">
              {/* <FormLabel id="demo-radio-buttons-group-label">
                Loại sản phẩm
              </FormLabel> */}
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={selectedTime} // Set the value of the RadioGroup to the selected value
                onChange={handleRadioChange} // Handle radio change
                name="radio-buttons-group"
                className="radioButton"
              >
                <FormControlLabel value="1" control={<Radio />} label="Ngày" />
                <FormControlLabel value="2" control={<Radio />} label="Tháng" />
              </RadioGroup>
            </FormControl>
            {selectedTime == 1 ? (
              <DatePickerWithLabel
                className="profile-form__input"
                label={"Chọn ngày muốn thống kê"}
                onChange={(date) => {
                  if (date != null && date != undefined) {
                    handleDateChange(date);
                  }
                }}
                selectedDate={selectedDate}
                format="dd/MM/yyyy"
              ></DatePickerWithLabel>
            ) : (
              <></>
            )}
          </div>
          {/* <div
            className="manageStatistic_selection-button"
            onClick={() => handleStatistic}
          >
            {" "}
            <p>Thống kê</p>
          </div> */}
        </div>
        <div className="manageStatistic_result">
          {dateStatictic != undefined && selectedTime == 1 ? (
            <div>
              <h4>Doanh thu ngày {dateStatictic.date}</h4>
              <p>
                Tổng thu:{" "}
                <span>{dateStatictic.total.toLocaleString()} VND</span>
              </p>
            </div>
          ) : selectedTime == 2 && monthStatictic != undefined ? (
            <ChartStatistic list={monthStatictic}></ChartStatistic>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageStatistic;
