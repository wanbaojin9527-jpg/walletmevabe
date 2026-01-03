
import React from 'react';
import { Screen } from '../types';
import { APP_CONFIG } from '../constants';

interface WelcomeProps {
  onNavigate: (screen: Screen) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#FFF0F3] to-white p-8">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
        <div className="w-24 h-24 bg-[#FF85A1] rounded-3xl flex items-center justify-center shadow-lg transform rotate-6 animate-bounce-slow">
            <span className="text-white text-4xl font-bold">M&B</span>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-[#FF85A1]">Mẹ & Bé</h1>
          <p className="text-gray-600 text-lg px-4 leading-relaxed">
            “Đồng hành cùng mẹ – Chăm sóc bé yêu”
          </p>
        </div>

        <div className="w-full max-w-xs aspect-square bg-[#FFE4E9] rounded-full overflow-hidden flex items-center justify-center p-6 relative">
             <img 
               src={APP_CONFIG.WELCOME_IMAGE} 
               alt="Mother and Baby illustration" 
               className="w-full h-full object-cover rounded-full shadow-inner"
             />
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <button 
          onClick={() => onNavigate('LOGIN')}
          className="w-full py-4 bg-[#FF85A1] text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
        >
          Đăng nhập
        </button>
        <button 
          onClick={() => onNavigate('REGISTER')}
          className="w-full py-4 bg-white text-[#FF85A1] border-2 border-[#FF85A1] rounded-2xl font-bold active:scale-95 transition-transform"
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default Welcome;
