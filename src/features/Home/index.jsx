import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import BodyPage from "./Body";
import { useDispatch } from "react-redux";
import { getListProductThunk } from "../../store/action/product";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Subcribe from "../../components/Subcribe";
const HomePage = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState();
  useEffect(() => {
    dispatch(getListProductThunk([0, 100])).then((res) => {
      setList(res?.payload);
    });
  }, []);
  console.log(list);
  
  useEffect(() => {
    AOS.init();
    AOS.refresh();
}, []);
  return (
    <div className="container">
      <div className="home_container">
        <section className="slider mx-auto w-[95%] max-w-screen-2xl h-[530px] bg-[url('./images/4.jpg')] bg-cover bg-no-repeat bg-bottom" >
          <div className="relative w-full h-full">
            <div className='absolute w-full h-full bg-[#050827] opacity-20 z-1'>

            </div>
            <div className="absolute flex flex-col items-center justify-center w-full h-full text-white z-3">
              <h3 className="text-xs font-bold tracking-widest">BEST PLACE TO BUY TREES</h3>
              <h1 className="my-8 text-5xl">Planty Shop</h1>
              <p className="w-3/5 sm:w-[90%] mb-16 text-lg font-semibold text-center ">Planty luôn cố gắng tạo ra những sản phẩm đẹp, độc đáo và khác biệt hoàn toàn so với thị trường. Chúng tôi biến sản phẩm thành những tác phẩm nghệ thuật với tất cả niềm đam mê và tâm huyết của mình để đáp ứng mọi nhu cầu của khách hàng.</p>
              <button className="text-xs font-extrabold tracking-widest text-black bg-white w-60 h-14 text-opacity-80">
                <Link to='/products'>KHÁM PHÁ SẢN PHẨM</Link>
              </button>
            </div>
          </div>
        </section>
        <section className="w-full m-auto text-center story max-w-screen-2xl my-100px lg:px-64 sm:px-0" data-aos="fade-up" data-aos-duration="1000">
          <h2 className="font-medium text-2xl mt-5 mb-[15px]">Trạm dừng chân của nhưng tâm hồn cần bình yên</h2>
          <p className="leading-7 text-main">Trang trí không gian bằng cây xanh không chỉ tạo nên môi trường sống và làm việc trong lành, mà việc chọn đúng cây hợp với mệnh còn giúp tăng vượng khí và vận may cho gia đình</p>
    
        </section>
        {list != undefined && <BodyPage productList={list.productList} />}
        <div className="wrapper sm:mx-0">
                <div className="ndv-subheadline-decor">
                    <div className="w-8 h-[1px] bg-gray-400"></div>
                    <div className="mx-4">
                        <h2 className='tracking-widest uppercase'>cam kết 100% sự hài lòng của khách hàng</h2>
                    </div>
                    <div className="w-8 h-[1px] bg-gray-400"></div>
                </div>
                <div className="flex mt-[50px] md:flex-row justify-center items-center gap-5 sm:flex-wrap">
                    <div className="flex w-full h-full gap-5 mb-5 basis-1/2 md:flex md:flex-row md:mb-0 sm:basis-full" data-aos="fade-right">
                        <div className="h-[280px] basis-2/3 xs:mb-5 md:mb-0 bg-[url('./images/1.jpg')] bg-cover bg-no-repeat bg-center"></div>
                        <div className="flex flex-col gap-3 basis-1/3 xs:gap-5">
                            <div className="h-[130px] xs:h-[200px] md:h-[130px] basis-1/2 bg-[url('./images/2.jpg')] bg-cover bg-no-repeat bg-center"></div>
                            <div className="h-[130px] xs:h-[200px] md:h-[130px] basis-1/2 bg-[url('./images/3.jpg')] bg-cover bg-no-repeat bg-center"></div>
                        </div>

                    </div>
                    <div className="pl-8 text-left basis-1/2 xl:pl-14 sm:basis-full sm:pl-0 sm:text-center" data-aos="fade-left">
                        <div className="mb-4 text-xs font-medium tracking-widest text-gray-500 uppercase">Premium Offer</div>
                        <div className="mb-4 text-4xl">Món quà tuyệt vời</div>
                        <div className="mb-4 leading-7 text-gray-500">Chúng tôi hiểu mức độ quan trọng trong công việc của mình là truyền tải đúng và đủ thông điệp của người tặng đến người nhận.</div>
                        <Link to='/products' className="px-[24px] py-[18px] mt-4 block text-sm tracking-widest font-bold uppercase bg-gray-900 text-white text-center w-[100%] duration-300 hover:bg-slate-800">Start Shopping</Link>
                    </div>
                </div>
            </div>
            {/* Parallax */}
            <div className=" bg-[url('./images/parallax.jpg')] lg:h-[350px] h-[250px]  bg-cover bg-fixed bg-center w-[100vw] relative left-[calc(-50vw+50%)]" data-aos="fade-up">
            </div>
            <Subcribe/>
      </div>
    </div>
  );
};

export default HomePage;
