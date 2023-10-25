import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersThunk } from "../../../store/action/order";
import { getUsersThunk } from "../../../store/action/manage";
import ManageUserTable from "./Table";
const ManageUser = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(0);
  const [flagReload, setFlagReload] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;
  useEffect(() => {
    dispatch(getUsersThunk([currentPage - 1, limit])).then((res) => {
      setData(res?.payload?.data);
      setTotalPages(res?.payload?.totalPages);
    });
  }, [currentPage]);
  useEffect(() => {
    dispatch(getUsersThunk([currentPage - 1, limit])).then((res) => {
      setData(res?.payload?.data);
      setTotalPages(res?.payload?.totalPages);
      setFlagReload();
    });
  }, [flagReload]);
  const handlePageChange = (page) => {
    if (page != currentPage) {
      setCurrentPage(page);
    }
  };
  const handleReload = (value) => {
    value && setFlagReload(true);
  };
  return (
    <div className="container">
      <div className="manageUser_container">
        <h1 className="manageUser_title">Danh sách người dùng</h1>
        {data != undefined ? (
          <ManageUserTable
            list={data}
            no={currentPage - 1}
            limit={limit}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            reload={handleReload}
          ></ManageUserTable>
        ) : (
          <></>
        )}

        {/* <Table
          list={data}
          className="orderHistory_list"
          type={"orderHistory"}
        /> */}
      </div>
    </div>
  );
};

export default ManageUser;
