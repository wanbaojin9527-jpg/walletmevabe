
import React, { useState } from 'react';
import { ArrowLeft, Plus, CheckCircle2, CreditCard, X, Building2, User as UserIcon, Hash, Trash2, AlertCircle } from 'lucide-react';
import { Screen, User, BankAccount } from '../types';
import { CloudAPI } from '../services/api';

interface BankingProps {
  user: User;
  onNavigate: (screen: Screen) => void;
  onAddBank: (bank: BankAccount) => void;
}

const Banking: React.FC<BankingProps> = ({ user, onNavigate, onAddBank }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountHolder: user.name.toUpperCase()
  });

  const handleAdd = () => {
    if (!formData.bankName || !formData.accountNumber) return;
    
    const newBank: BankAccount = {
      id: Date.now().toString(),
      ...formData
    };
    
    onAddBank(newBank);
    setShowAddForm(false);
    setFormData({ bankName: '', accountNumber: '', accountHolder: user.name.toUpperCase() });
  };

  const handleRemoveBank = async () => {
    try {
      const updatedUser = { ...user, banks: [] };
      await CloudAPI.updateUser(updatedUser);
      // Buộc reload để sync lại từ cloud
      window.location.reload();
    } catch (e) {
      alert("Lỗi khi gỡ ngân hàng");
    }
  };

  const hasBank = user.banks && user.banks.length > 0;

  return (
    <div className="flex flex-col min-h-full bg-white relative">
      <div className="px-6 pt-12 pb-6 flex items-center border-b border-gray-50 bg-white sticky top-0 z-10">
        <button onClick={() => onNavigate('PROFILE')} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full active:scale-90">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h2 className="text-lg font-bold text-gray-800 ml-4">Liên kết ngân hàng</h2>
      </div>

      <div className="p-6 flex-1">
        {!hasBank ? (
          <div className="py-12 flex flex-col items-center text-center px-8 animate-fade-in">
            <div className="w-24 h-24 bg-gray-50 rounded-[40px] flex items-center justify-center text-gray-300 mb-6">
              <CreditCard size={48} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Chưa có ngân hàng</h3>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              Mỗi khách hàng chỉ được liên kết 1 ngân hàng duy nhất để đảm bảo an toàn.
            </p>
            
            <button 
              onClick={() => setShowAddForm(true)}
              className="mt-8 w-full flex items-center justify-center p-5 bg-[#FF85A1] text-white rounded-[32px] font-bold shadow-lg shadow-pink-100 active:scale-95 transition-all"
            >
              <Plus size={20} className="mr-2" />
              <span>Liên kết ngay</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center px-1">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tài khoản chính chủ</h4>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-500 p-2 bg-red-50 rounded-xl active:scale-90 transition-transform"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            {user.banks.slice(0, 1).map((bank) => (
              <div key={bank.id} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden animate-scale-up">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="px-4 py-1.5 bg-white/10 border border-white/10 rounded-xl backdrop-blur-md">
                      <span className="text-white font-black text-xs uppercase tracking-widest">{bank.bankName}</span>
                    </div>
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                      <CheckCircle2 size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-white/40 text-[9px] uppercase font-bold tracking-[0.3em] mb-2">Số tài khoản</p>
                    <p className="text-2xl font-black tracking-[0.1em]">
                        {bank.accountNumber}
                    </p>
                  </div>
                  <div className="mt-8 flex justify-between items-end">
                    <div>
                        <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest mb-1">Chủ tài khoản</p>
                        <span className="text-sm font-bold uppercase tracking-wider">{bank.accountHolder}</span>
                    </div>
                    <div className="bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                        <span className="text-[10px] text-white/60 font-bold uppercase">Primary</span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
              </div>
            ))}

            <div className="p-6 bg-orange-50 rounded-[32px] border border-orange-100 flex items-start space-x-3">
              <AlertCircle className="text-orange-400 shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-orange-700 leading-relaxed font-medium">
                Để bảo mật, mẹ chỉ được dùng duy nhất 1 tài khoản. Nếu mẹ đổi số tài khoản, mẹ vui lòng xóa thẻ cũ trước khi thêm thẻ mới nhé.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl animate-scale-up text-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Gỡ ngân hàng?</h3>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed px-4">
              Mẹ có chắc chắn muốn gỡ bỏ tài khoản này? Sau khi gỡ, mẹ có thể liên kết tài khoản mới.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button onClick={() => setShowDeleteConfirm(false)} className="py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold active:scale-95">Hủy</button>
              <button onClick={handleRemoveBank} className="py-4 bg-red-500 text-white rounded-2xl font-bold shadow-lg active:scale-95">Gỡ ngay</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Bank Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-[110] flex flex-col justify-end bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-t-[48px] p-8 w-full max-h-[90%] overflow-y-auto animate-slide-up shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Liên kết ngân hàng</h3>
                <p className="text-xs text-gray-400 mt-1">Vui lòng nhập đúng thông tin chính chủ</p>
              </div>
              <button onClick={() => setShowAddForm(false)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center active:scale-90">
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Tên ngân hàng</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Ví dụ: MB Bank, VIB..."
                    value={formData.bankName}
                    onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#FF85A1] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Số tài khoản</label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Nhập số tài khoản ngân hàng"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-[#FF85A1] outline-none font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Tên chủ tài khoản</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    disabled
                    value={formData.accountHolder}
                    className="w-full pl-12 pr-4 py-4 bg-gray-100 text-gray-500 rounded-2xl border-none font-bold uppercase"
                  />
                </div>
              </div>

              <button 
                onClick={handleAdd}
                className="w-full py-4 bg-[#FF85A1] text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-transform mt-4"
              >
                Xác nhận liên kết
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banking;
