// Home/Hero.tsx
"use client"
import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  
    return (
      <div className="flex mt-14">
            <div className='text-center bg-slate-800 text-[20px] font-extrabold border border-b-gold text-neutral-200 mt-4 ml-6 mr-8 py-8 px-12 rounded-xl'>
                <h1 className='pt-7'>
                    Play Smarter!
                </h1>
                <button className="w-72 py-1.5 mt-4 bg-blue-600 rounded-full hover:text-emerald-400 border border-b-black ">Register Now!</button> 
                <h1 className='p-2'>OR</h1>
                <hr className='border border-gray-700 mb-3' />
                <p className='font-light text-[12px] text-gray-500 pb-2'>sign up with</p>
                <div className='flex justify-between mt-1'>
                    <button className="authButton">F</button> 
                    <button className="authButton">G</button> 
                    <button className="authButton">T</button> 
                    <button className="authButton">E</button> 
                </div>
            </div>
        <div className="mt-4 ml-5 border border-b-gold w-fit rounded-xl">
          <Image className="rounded-xl" src="/Images/Hero.png" width={1262} height={600} alt="Logo" priority={true}/>
        </div>
      </div>
    );
  };
  
  export default Hero;