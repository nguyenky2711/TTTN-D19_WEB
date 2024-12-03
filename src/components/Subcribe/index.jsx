import React, { useEffect } from "react";
import swal from "sweetalert";
import AOS from "aos";
import "aos/dist/aos.css";
const Subcribe = () => {
  const handleSubcribe = () => {
    swal("Sent success!", "I'll contact you soon", "success");
  };
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div
      className="subcribe w-full bg-[#1d1f2e] flex flex-col items-center justify-center mb-[50px] mt-[100px]"
      data-aos="fade-up"
      data-aos-delay="50"
      data-aos-duration="800"
    >
      <div className="ndv-subheadline-decor pt-[100px]">
        <div className="w-8 h-[1px] bg-gray-400"></div>
        <div className="mx-4">
          <h2>SIGN UP AND GET FREE PLANT BAGS</h2>
        </div>
        <div className="w-8 h-[1px] bg-gray-400"></div>
      </div>
      <h2 className="my-[30px] text-4xl text-white">Planty Updates</h2>
      <div className="pb-[100px] flex sm:flex-col">
        <input
          type="email"
          required
          className="text-white bg-transparent w-[350px] mr-[10px] p-[15px] border-[#2f303e] border-[1px] text-xs"
          placeholder="CUSTOMER@GMAIL.COM"
        />
        <div className="w-[200px] sm:w-full sm:flex sm:mt-4">
          <button
            className="uppercase ndv-button bg-white text-[#1d1f2e] "
            onClick={() => handleSubcribe()}
          >
            subcribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subcribe;
