import React, { useEffect } from "react";
import ProductCard from "../../../components/ProductCard";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getListProductThunk } from "../../../store/action/product";
const BodyPage = ({ productList }) => {
  const dispatch = useDispatch();

  // const { productList } = useSelector((state) => state?.product?.data);
  return (
    <div className="product_container">
      <div className="product_card-List">
        {productList?.map((product) => {
          return <ProductCard data={product}></ProductCard>;
        })}
      </div>
    </div>
  );
};

export default BodyPage;
