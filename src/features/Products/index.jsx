import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Subcribe from '../../components/Subcribe';
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch } from 'react-redux';
import { getListProductThunk } from '../../store/action/product';
import BodyPage from '../Home/Body';
import ProductCard from '../../components/ProductCard';
const Loading = () => {
    return (
        <div>
            <SkeletonTheme baseColor="gray" highlightColor="#b8b5b5">
                <div className="mt-100px w-[75%] lg:w-[64%] mx-auto lg:grid lg:grid-cols-3 lg:gap-3 grid gap-y-28 grid-cols-2 sm:grid-cols-1 gap-x-8">
                    <div>
                        <Skeleton height={380} width={300} />
                    </div>
                    <div>
                        <Skeleton height={380} width={300} />
                    </div>
                    <div>
                        <Skeleton height={380} width={300} />
                    </div>
                </div>
            </SkeletonTheme>
        </div>
    )
}
const Products = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState(products)
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
    useEffect(() => {
        setLoading(true)
        const productsList = async () => {
            setLoading(true)
            setLoading(false)
        }
        productsList()
    }, []);

    const productFilter = (item) => {
        const updateList = products.filter((product) => {
            return product.category === item
        })
        setFilter(updateList)
    }
    return (
        <div>
            {
                loading ? <Loading /> : (
                    <div className='overflow-hidden'>
                        <section className="text-center wrapper" data-aos="fade-down">
                            <h1 className='text-4xl'>Our Products</h1>
                            <p className='text-lg text-gray-500 my-7'> Truyền tải đúng và đủ thông điệp của người tặng đến người nhận</p>
                            <div className='flex justify-center gap-x-4 sm:gap-x-0'>
                                <button onClick={() => setFilter(products)} className='ndv__btn-second'>ALL PRODUCTS</button>
                                <button onClick={() => productFilter("Coffee Mugs")} className='ndv__btn-second'>COFFEE MUGS</button>
                                <button onClick={() => productFilter("Others")} className='ndv__btn-second'>OTHERS</button>
                                <button onClick={() => productFilter("Premium")} className='ndv__btn-second'>PREMIUM</button>
                                <button onClick={() => productFilter("Tea Mugs")} className='ndv__btn-second'>TEA MUGS</button>
                            </div>
                        </section>
                        {/* <ProductsList products={filter} /> */}
                        <div className="product_card-List mt-100px  w-[75%] lg:w-[64%] mx-auto lg:grid lg:grid-cols-3 lg:gap-x-3 grid gap-y-10 sm:grid-cols-1 grid-cols-2 gap-x-8">
                            {list?.productList?.map((product) => {
                                return <ProductCard data={product}></ProductCard>;
                            })}
                        </div>
                        <Subcribe />
                    </div>
                )
            }
        </div>
    );
}

export default Products;
