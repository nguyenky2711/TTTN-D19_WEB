import React, { useState } from "react";
import "./style.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { InputLabel, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
const SearchBar = ({ onSubmit }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const handleInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchInput, selectedType);
  };
  return (
    <form action="" className="search_bar" onSubmit={handleSubmit}>
      <div className="search_input">
        <SearchOutlinedIcon />
        <input
          type="text"
          value={searchInput}
          onChange={handleInput}
          placeholder="Nhập từ khóa"
        />
      </div>
      <div className="search_type">
        <CategoryOutlinedIcon />
        <FormControl>
          <InputLabel id="demo-simple-select-label">
            Tìm kiếm theo loại sản phẩm
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedType}
            onChange={handleTypeChange}
            placeholder="Tìm kiếm theo loại sản phẩm"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={2}>Chậu</MenuItem>
            <MenuItem value={1}>Cây</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="search_button">
        <button type="submit"> Tìm kiếm</button>
      </div>
    </form>
  );
};

export default SearchBar;
