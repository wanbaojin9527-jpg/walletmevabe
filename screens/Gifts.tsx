
import React, { useState } from 'react';
import { Gift, ChevronRight, Star, X, MessageCircle, ArrowUpCircle } from 'lucide-react';
import { Screen, GiftItem } from '../types';
import { APP_CONFIG } from '../constants';

const GIFT_DATA: GiftItem[] = [
  { id: '1', name: 'Xe đạp gấp gọn j9', image: APP_CONFIG.GIFT_IMAGES.GIFT_1, price: 0 },
  { id: '2', name: 'Xe đạp gấp gọn j9', image: APP_CONFIG.GIFT_IMAGES.GIFT_2, price: 0 },
  { id: '3', name: 'Xe máy điện Vespa 2 yên', image: APP_CONFIG.GIFT_IMAGES.GIFT_3, price: 0 },
  { id: '4', name: 'Xe máy điện vespa liền yên', image: APP_CONFIG.GIFT_IMAGES.GIFT_4, price: 0 },
  { id: '5', name: 'Bàn học thông minh cho bé', image: APP_CONFIG.GIFT_IMAGES.GIFT_5, price: 0 },
];

interface GiftsProps {
  onNavigate: (screen: Screen) => void;
}

const Gifts: React.FC<GiftsProps> = ({ onNavigate }) => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showUpgradeInfo, setShowUpgradeInfo] = useState(false);

  const handleClaimGift = () => {
    setShowContactInfo(true);
  };

  const handleUpgradeClick = () => {
    setShowUpgradeInfo(true);
  };

  const handleContactAction = () => {
    window.open(APP_CONFIG.CONTACT_LINK, '_blank');
    setShowContactInfo(false);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#fdfdfd] pb-24 relative">
      {/* Contact Modal */}
      {showContactInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl animate-scale-up text-center border border-pink-50">
            <div className="w-20 h-20 bg-[#FFF0F3] rounded-full flex items-center justify-center text-[#FF85A1] mx-auto mb-6">
              <MessageCircle size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Hướng dẫn nhận quà</h3>
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <p className="text-gray-700 font-medium leading-relaxed">
                Liên Hệ Chuyên Viên <span className="text-[#FF85A1] font-bold">Minh Tú</span> để được hướng dẫn nhận 0 đ.
              </p>
            </div>
            <button 
              onClick={handleContactAction}
              className="w-full py-4 bg-[#FF85A1] text-white rounded-2xl font-bold shadow-lg shadow-[#FF85A1]/20 active:scale-95 transition-transform"
            >
              Liên Hệ Ngay
            </button>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl animate-scale-up text-center border border-orange-50">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-400 mx-auto mb-6">
              <ArrowUpCircle size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Nâng cấp tài khoản</h3>
            <div className="bg-orange-50/50 rounded-2xl p-4 mb-6">
              <p className="text-gray-700 font-medium leading-relaxed">
                Hoàn thành <span className="text-orange-500 font-bold">hoạt động 3</span> để được nâng cấp.
              </p>
            </div>
            <button 
              onClick={() => setShowUpgradeInfo(false)}
              className="w-full py-4 bg-orange-400 text-white rounded-2xl font-bold shadow-lg shadow-orange-400/20 active:scale-95 transition-transform"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Kho quà tặng</h2>
            <p className="text-sm text-gray-500">Mọi thứ cho bé đều 0đ</p>
        </div>
        <div className="w-10 h-10 bg-[#FFF0F3] rounded-full flex items-center justify-center text-[#FF85A1]">
            <Gift size={20} />
        </div>
      </div>

      <div className="px-6 mb-6">
          <button 
            onClick={handleUpgradeClick}
            className="w-full bg-[#FFF0F3] rounded-3xl p-4 flex items-center space-x-4 border border-[#FF85A1]/20 text-left active:scale-[0.98] transition-transform"
          >
              <div className="flex-1">
                  <span className="text-[10px] font-bold text-[#FF85A1] uppercase tracking-wider">Dành riêng cho bạn</span>
                  <p className="text-sm font-bold text-gray-700 mt-1">Nâng cấp tài khoản nhận quà X2</p>
              </div>
              <ChevronRight className="text-[#FF85A1]" size={20} />
          </button>
      </div>

      <div className="px-6 space-y-6">
        {GIFT_DATA.map((item) => (
          <div key={item.id} className="bg-white rounded-[32px] overflow-hidden shadow-md shadow-gray-100 flex items-center p-3 border border-gray-50 animate-fade-in">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 ml-4 py-1">
              <div className="flex items-center space-x-1 mb-1">
                  <Star size={10} className="text-yellow-400 fill-current" />
                  <span className="text-[10px] text-gray-400 font-medium">Bán chạy nhất</span>
              </div>
              <h4 className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight h-10">{item.name}</h4>
              <div className="flex items-end justify-between mt-1">
                <span className="text-lg font-black text-orange-500">0đ</span>
                <button 
                  onClick={handleClaimGift}
                  className="bg-[#FF85A1] text-white text-[11px] font-bold px-4 py-2 rounded-xl shadow-md shadow-[#FF85A1]/30 active:scale-95 transition-all"
                >
                  Nhận quà
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gifts;
