
import React, { useState, useRef } from 'react';
import { ArrowLeft, User, Phone, Lock, AlertCircle, Camera, Image as ImageIcon } from 'lucide-react';
import { Screen, User as UserType } from '../types';
import { APP_CONFIG } from '../constants';

interface RegisterProps {
  onNavigate: (screen: Screen) => void;
  onRegister: (user: UserType) => void;
}

const Register: React.FC<RegisterProps> = ({ onNavigate, onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [avatar, setAvatar] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Ảnh quá lớn, mẹ chọn ảnh dưới 2MB nhé!');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = () => {
    setError('');
    
    if (!avatar) {
      setError('Mẹ vui lòng chọn ảnh đại diện nhé');
      return;
    }

    if (!formData.name.trim()) {
      setError('Vui lòng nhập họ và tên');
      return;
    }

    if (!formData.phone.match(/^(0|84)(3|5|7|8|9)([0-9]{8})$/)) {
      setError('Số điện thoại không hợp lệ');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    const newUser: UserType = {
      name: formData.name,
      phone: formData.phone,
      balance: 0,
      avatar: avatar,
      password: formData.password,
      banks: []
    };

    onRegister(newUser);
  };

  return (
    <div className="min-h-full flex flex-col bg-white p-6 pb-12 overflow-y-auto">
      <button onClick={() => onNavigate('WELCOME')} className="mb-6 w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full active:scale-90 transition-transform">
        <ArrowLeft size={20} className="text-gray-600" />
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tạo tài khoản</h2>
        <p className="text-gray-500 mt-1">Gia nhập cộng đồng Mẹ & Bé cao cấp</p>
      </div>

      {/* Avatar Picker Section */}
      <div className="flex flex-col items-center mb-8">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative group cursor-pointer"
        >
          <div className="w-28 h-28 rounded-full border-4 border-pink-50 overflow-hidden bg-gray-50 flex items-center justify-center shadow-lg transition-all group-active:scale-95">
            {avatar ? (
              <img src={avatar} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-gray-300">
                <ImageIcon size={32} />
                <span className="text-[10px] font-bold mt-1 uppercase">Ảnh của mẹ</span>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 right-0 bg-[#FF85A1] p-2 rounded-full text-white shadow-md border-2 border-white">
            <Camera size={16} />
          </div>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          accept="image/*" 
          className="hidden" 
        />
        <p className="text-[10px] text-gray-400 font-bold mt-3 uppercase tracking-wider">Nhấn để chọn ảnh đại diện</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-500 text-sm rounded-2xl flex items-center space-x-2 border border-red-100 animate-pulse">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Họ và tên</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Nhập họ và tên đầy đủ"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#FF85A1] transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Số điện thoại</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="tel" 
              placeholder="Nhập số điện thoại của mẹ"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#FF85A1] transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="password" 
              placeholder="Mật khẩu bảo mật"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#FF85A1] transition-all outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Xác nhận mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="password" 
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#FF85A1] transition-all outline-none"
            />
          </div>
        </div>

        <button 
          onClick={handleRegister}
          className="w-full py-4 bg-[#FF85A1] text-white rounded-2xl font-bold shadow-lg shadow-[#FF85A1]/30 active:scale-95 transition-transform mt-4"
        >
          Đăng ký tài khoản
        </button>
      </div>

      <div className="mt-8 text-center pb-8">
        <p className="text-gray-600 text-sm">
          Đã có tài khoản?{' '}
          <button onClick={() => onNavigate('LOGIN')} className="text-[#FF85A1] font-bold">Đăng nhập</button>
        </p>
      </div>
    </div>
  );
};

export default Register;
