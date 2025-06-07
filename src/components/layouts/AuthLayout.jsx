import React from 'react';
import CARD_2 from "../../assets/images/Card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      
      {/* Left: Form section */}
      <div className="w-full md:w-[60%] px-6 sm:px-10 py-10 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-black mb-6">Finance Tracker</h2>
        {children}
      </div>

      {/* Right: Visual section (hidden on small screens) */}
      <div className="hidden md:block md:w-[40%] h-screen bg-violet-50 relative overflow-hidden p-8">
        
        {/* Decorative circles */}
        <div className="w-48 h-48 rounded-[40px] bg-pink-600 absolute -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-[10px] border-fuchsia-600 absolute top-[40%] z-10 right-2" />
        <div className="w-48 h-48 rounded-[40px] bg-pink-500 absolute -bottom-7 -left-5" />

        {/* Stat card */}
        <div className="z-50 relative">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Progress"
            value="430,000"
            color="bg-primary"
          />
        </div>

        {/* Graphic image */}
        <img
          src={CARD_2}
          alt="Card design"
          className="w-64 lg:w-[70%] absolute bottom-10 right-6 shadow-lg shadow-blue-400/15"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-4 bg-gray-100 p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200 z-10 relative mt-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px] font-semibold">${value}</span>
      </div>
    </div>
  );
};
