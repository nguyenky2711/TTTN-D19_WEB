import React, { useEffect, useState } from "react";
import "./style.scss";

import PostAddIcon from "@mui/icons-material/PostAdd";
import Table from "../../../components/Table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListProductThunk } from "../../../store/action/product";
import ManageDiscountTable from "./Table";
import { getDiscountsThunk } from "../../../store/action/manage";

const ManageDiscount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { data } = useSelector((state) => state.manage.discount);
  const [data, setData] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;
  const [childChange, setChildChange] = useState(false);

  const handleChildAction = () => {
    setChildChange(true);
  };
  const handlePageChange = (page) => {
    if (page != currentPage) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    dispatch(getDiscountsThunk([currentPage - 1, limit])).then((res) => {
      setData(res?.payload?.data);
      setTotalPages(res?.payload?.totalPages);
      setChildChange(false);
    });
  }, [currentPage, childChange]);
  return (
    <div className="container">
      <div className="manageDiscount_container">
        <div className="manageDiscount_header">
          <div className="manageDiscount_header-left">
            <h4>Danh sách khuyến mãi</h4>
          </div>
          <div
            className="manageDiscount_header-right"
            onClick={() => navigate(`/manage/discount/addDiscount`)}
          >
            <PostAddIcon />
            <p>Thêm khuyến mãi</p>
          </div>
        </div>
        {data != undefined ? (
          <ManageDiscountTable
            list={data}
            no={currentPage - 1}
            limit={limit}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            onChildAction={handleChildAction}
          ></ManageDiscountTable>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ManageDiscount;
