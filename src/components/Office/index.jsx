import React from 'react';

const Offfice = ({images}) => {
    return (
        <div className=''>
                    <img src={images} alt="unitedOffice" className='ndv__img'/>
                    <h2 className='mb-2 text-xs font-bold tracking-widest text-gray-500 mt-7'>THU DUC CITY</h2>
                    <ul>
                        <li>Hiep Phu, Ho Chi Minh</li>
                        <li>HVCNBCVT</li>
                        <li>Dang Vu</li>
                        <li>LAM DONG</li>
                    </ul>
                    <p className='mb-2 text-xs font-bold tracking-widest text-gray-500 mt-7'>OPENING TIMES</p>
                    <ul>
                        <li>Mon - Fri 08:00 to 22:00</li>
                        <li>Sat - 09:00 to 20:00</li>
                        <li>Sun - 12:00 to 18:00</li>
                    </ul>
                </div>
    );
}

export default Offfice;
