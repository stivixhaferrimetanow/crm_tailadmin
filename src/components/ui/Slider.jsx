'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdAccountBalanceWallet } from "react-icons/md";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { MdArrowOutward } from "react-icons/md";
import { HiOutlineReceiptTax } from "react-icons/hi";

import { FaCreditCard } from "react-icons/fa";
// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function Slider({data}) {
  const [swiperRef, setSwiperRef] = useState(null);

  let appendNumber = 4;
  let prependNumber = 1;

  const prepend2 = () => {
    swiperRef.prependSlide([
      '<div class="swiper-slide">Slide ' + --prependNumber + '</div>',
      '<div class="swiper-slide">Slide ' + --prependNumber + '</div>',
    ]);
  };

  const prepend = () => {
    swiperRef.prependSlide(
      '<div class="swiper-slide">Slide ' + --prependNumber + '</div>'
    );
  };

  const append = () => {
    swiperRef.appendSlide(
      '<div class="swiper-slide">Slide ' + ++appendNumber + '</div>'
    );
  };

  const append2 = () => {
    swiperRef.appendSlide([
      '<div class="swiper-slide">Slide ' + ++appendNumber + '</div>',
      '<div class="swiper-slide">Slide ' + ++appendNumber + '</div>',
    ]);
  };

  return (
    <>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation={false}
        modules={[ ]}
        className="mySwiper"
      >
        <SwiperSlide className='rounded-lg cursor-pointer'>
              <div className='p-5 flex items-center'>
                <div className='w-[50px] justify-center flex items-center h-[50px] text-center rounded-full bg-[#A5F403]'>
                  <MdAccountBalanceWallet className='text-2xl' />
                </div>
               
              </div>
              <div className='pt-5 px-5 flex items-center'>
                <div className='w-[50%] flex justify-start text-start'>
                  <h2 className='pl-2 text-2xl'>Total Blance:</h2>
                </div>
                <div className='w-[50%] text-start justify-start pt-1 gap-2 flex items-center'>
                        <MdArrowOutward className='bg-[#A5F403]  rounded-full' />
                        {data.today_difference > 0 ? (<span className='text-green-600'>+{data.today_difference}€</span>) : (<span className='text-red-600'>{data.today_difference}€</span>)}
                        
                </div>
              </div>
              <div className='w-full flex text-start justify-start'>
                <h1 className='text-6xl font-semibold pl-5 pt-[13%]'>€{data.today_total_payment}</h1>
              </div>
        </SwiperSlide>
        <SwiperSlide className='rounded-lg cursor-pointer'>
              <div className='p-5 flex items-center'>
                <div className='w-[50px] justify-center flex items-center h-[50px] text-center rounded-full bg-[#A5F403]'>
                  <HiOutlineReceiptTax className='text-2xl' />
                </div>
               
              </div>
              <div className='pt-5 px-5 flex items-center'>
                <div className='w-[50%] flex justify-start text-start'>
                  <h2 className='pl-2 text-2xl'>Tax Reserve:</h2>
                </div>
                <div className='w-[50%] text-start justify-start pt-1 gap-2 flex items-center'>
                        <MdArrowOutward className='bg-[#A5F403]  rounded-full' />
                        {data.today_tax_diff >= 0 ? (<span className='text-green-600'>+{data.today_tax_diff}€</span>) : (<span className='text-red-600'>{data.today_tax_diff}€</span>)}
                </div>
              </div>
              <div className='w-full flex text-start justify-start'>
                <h1 className='text-6xl font-semibold pl-5 pt-[13%]'>€{data.today_tax}</h1>
              </div>
        </SwiperSlide>
        
        <SwiperSlide className='rounded-lg cursor-pointer'>
              <div className='p-5 flex items-center'>
                <div className='w-[50px] justify-center flex items-center h-[50px] text-center rounded-full bg-[#A5F403]'>
                  <MdAccountBalanceWallet className='text-2xl' />
                </div>
               
              </div>
              <div className='pt-5 px-5 flex items-center'>
                <div className='w-full flex justify-start text-start'>
                  <h2 className='pl-2 text-2xl'>Payments Amount:</h2>
                </div>
                
              </div>
              <div className='w-full flex text-start justify-start'>
                <h1 className='text-6xl font-semibold pl-5 pt-[13%]'>{data.payments && data.payments.length}</h1>
              </div>
        </SwiperSlide>
        <SwiperSlide className='cursor-pointer bg-none bg-opacity-0 rounded-2xl' style={{backgroundImage: `url('/14.svg')`, backgroundSize : '110%' , backgroundPosition: 'center' , backgroundRepeat: 'no-repeat'}}>
         
        </SwiperSlide>
      </Swiper>

      <p className="append-buttons">
        
      </p>
    </>
  );
}
