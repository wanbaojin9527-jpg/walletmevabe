
import React from 'react';
import { User, CreditCard, ShieldCheck, Key, LogOut, ChevronRight, Heart, ShieldAlert, Settings } from 'lucide-react';
import { Screen, User as UserType } from '../types';

interface ProfileProps {
  user: UserType;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

const MenuLink: React.FC<{ 
    icon: any, 
    label: string, 
    onClick: () => void,
    isDanger?: boolean,
    isSpecial?: boolean,
    subLabel?: string
}> = ({ icon: Icon, label, onClick, isDanger, isSpecial, subLabel }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center justify-between p-5 rounded-[32px] shadow-sm transition-all active:scale-[0.98] mb-4 border ${
          isSpecial 
          ? 'bg-slate-900 border-slate-800 text-white shadow-xl shadow-slate-200' 
          : 'bg-white border-gray-50'
        }`}
    >
        <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-2xl ${
              isSpecial ? 'bg-amber-400 text-slate-900' :
              isDanger ? 'bg-red-50 text-red-500' : 
              'bg-[#FFF0F3] text-[#FF85A1]'
            }`}>
                <Icon size={20} strokeWidth={2.5} />
            </div>
            <div className="text-left">
                <span className={`font-bold block ${
                  isSpecial ? 'text-white' :
                  isDanger ? 'text-red-500' : 
                  'text-gray-800'
                }`}>{label}</span>
                {subLabel && <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{subLabel}</span>}
            </div>
        </div>
        <ChevronRight size={18} className={isSpecial ? 'text-amber-400/50' : isDanger ? 'text-red-300' : 'text-gray-300'} />
    </button>
);

const Profile: React.FC<ProfileProps> = ({ user, onNavigate, onLogout }) => {
  return (
    <div className="flex flex-col min-h-full bg-[#FAFAFA] pb-24">
      {/* Profile Header */}
      <div className="bg-white px-8 pt-16 pb-10 rounded-b-[56px] shadow-xl shadow-gray-100 text-center flex flex-col items-center border-b border-gray-50">
        <div className="relative mb-6">
            <div className="w-28 h-28 rounded-full border-4 border-pink-50 p-1.5 bg-white shadow-lg shadow-pink-100">
                <img 
                    src={user.avatar} 
                    alt="User" 
                    className="w-full h-full rounded-full object-cover"
                />
            </div>
            <div className={`absolute bottom-1 right-1 w-9 h-9 border-4 border-white rounded-full flex items-center justify-center text-white shadow-md ${user.isAdmin ? 'bg-slate-900' : 'bg-[#FF85A1]'}`}>
                {user.isAdmin ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />}
            </div>
        </div>
        <h3 className="text-2xl font-black text-gray-800">{user.name}</h3>
        <p className="text-gray-400 text-sm mt-1 font-medium">{user.phone}</p>
        
        <div className="flex space-x-4 mt-6">
            <div className={`px-5 py-2 rounded-full flex items-center space-x-2 border ${user.isAdmin ? 'bg-slate-50 border-slate-200' : 'bg-pink-50 border-pink-100'}`}>
                {user.isAdmin ? (
                  <Settings size={14} className="text-slate-600 animate-spin-slow" />
                ) : (
                  <Heart size={14} className="text-[#FF85A1] fill-current" />
                )}
                <span className={`text-[11px] font-bold uppercase tracking-wider ${user.isAdmin ? 'text-slate-600' : 'text-[#FF85A1]'}`}>
                  {user.isAdmin ? 'Chế độ Quản trị viên' : 'Hội viên cao cấp'}
                </span>
            </div>
        </div>
      </div>

      <div className="px-6 mt-8">
        {user.isAdmin && (
          <MenuLink 
            icon={ShieldAlert} 
            label="Bảng điều khiển Admin" 
            subLabel="Quản lý hội viên & giao dịch Cloud"
            isSpecial
            onClick={() => onNavigate('ADMIN_DASHBOARD')} 
          />
        )}

        <div className="bg-white rounded-[32px] p-2 shadow-sm mb-6 border border-gray-50">
            <MenuLink 
                icon={User} 
                label="Thông tin cá nhân" 
                onClick={() => {}} 
            />
            <MenuLink 
                icon={CreditCard} 
                label="Liên kết ngân hàng" 
                onClick={() => onNavigate('BANKING')} 
            />
            <MenuLink 
                icon={ShieldCheck} 
                label="Bảo mật & Quyền riêng tư" 
                onClick={() => onNavigate('SECURITY')} 
            />
        </div>

        <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-3 p-5 rounded-[32px] bg-red-50 text-red-500 font-bold active:scale-[0.98] transition-all border border-red-100"
        >
            <LogOut size={20} />
            <span>Đăng xuất tài khoản</span>
        </button>
      </div>

      <div className="mt-12 text-center text-gray-300 text-[10px] px-12 uppercase tracking-[0.2em] font-bold">
          Hệ thống Cloud Mẹ & Bé v4.2.0
      </div>
    </div>
  );
};

export default Profile;
