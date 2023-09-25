import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import BodyPage from "./Body";
import { useDispatch } from "react-redux";
import { getListProductThunk } from "../../store/action/product";

const HomePage = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState();
  useEffect(() => {
    dispatch(getListProductThunk([0, 100])).then((res) => {
      setList(res?.payload);
    });
  }, []);
  console.log(list);
  const handleSearchSubmit = (searchInput, selectedType) => {
    dispatch(getListProductThunk([0, 100, searchInput, selectedType])).then(
      (res) => {
        setList(res?.payload);
      }
    );
  };
  return (
    <div className="container">
      <div className="home_container">
        <SearchBar onSubmit={handleSearchSubmit} />
        {list != undefined && <BodyPage productList={list.productList} />}
      </div>
    </div>
  );
};

export default HomePage;
