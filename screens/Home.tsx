
import React, { useState, useEffect } from 'react';
import { PlusCircle, ArrowDownCircle, Gift, Bell, Search, AlertCircle, X, Clock, ChevronRight, MessageSquare, AlertTriangle } from 'lucide-react';
import { Screen, User, TransactionRecord, AppNotification } from '../types';
import { APP_CONFIG } from '../constants';
import { CloudAPI } from '../services/api';

interface HomeProps {
  user: User;
  onNavigate: (screen: Screen, params?: any) => void;
}

const Home: React.FC<HomeProps> = ({ user, onNavigate }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [latestNotif, setLatestNotif] = useState<AppNotification | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<TransactionRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông báo mới nhất chưa đọc
        const notifs = await CloudAPI.getNotifications(user.phone);
        const unread = notifs.filter(n => !n.isRead);
        if (unread.length > 0) {
          setLatestNotif(unread[0]);
        } else {
          setLatestNotif(null);
        }
        
        // Lấy giao dịch gần đây của chính user này
        const allTxs = await CloudAPI.getTransactions();
        const userTxs = allTxs
          .filter(t => t.userPhone === user.phone)
          .slice(0, 5);
        setRecentTransactions(userTxs);
      } catch (e) {
        console.warn("Lỗi đồng bộ Home");
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [user.phone]);

  const handleAction = (type: 'DEPOSIT' | 'WITHDRAW') => {
    if (!user.banks || user.banks.length === 0) {
      setShowWarning(true);
    } else {
      onNavigate('TRANSACTION', { type });
    }
  };

  const goToNotifications = async () => {
    try {
      await CloudAPI.markNotifsAsRead(user.phone);
      setLatestNotif(null);
    } catch (e) {}
    onNavigate('NOTIFICATIONS');
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pb-24 relative">
      {/* Floating Notification Toast - Nổi bật khi có tin mới */}
      {latestNotif && (
        <div className="fixed top-14 left-0 right-0 z-[110] px-6 animate-slide-up">
          <button 
            onClick={goToNotifications}
            className={`w-full p-4 rounded-2xl shadow-2xl flex items-center space-x-3 border-2 transform active:scale-95 transition-all ${
              latestNotif.type === 'ERROR' 
              ? 'bg-red-50 border-red-200 text-red-700' 
              : 'bg-white border-pink-100 text-gray-800'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
              latestNotif.type === 'ERROR' ? 'bg-red-500 text-white' : 'bg-[#FF85A1] text-white'
            }`}>
              {latestNotif.type === 'ERROR' ? <AlertTriangle size={20} /> : <Bell size={20} />}
            </div>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Thông báo mới</p>
              <p className="font-bold text-sm truncate">{latestNotif.title}</p>
              <p className="text-[11px] opacity-80 line-clamp-1">{latestNotif.content}</p>
            </div>
            <ChevronRight size={16} className="opacity-30" />
          </button>
        </div>
      )}

      {showWarning && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[32px] p-6 w-full max-w-sm shadow-2xl animate-scale-up">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                <AlertCircle size={28} />
              </div>
              <button onClick={() => setShowWarning(false)} className="p-2 text-gray-400">
                <X size={20} />
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Chưa có ngân hàng</h3>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Mẹ vui lòng liên kết tài khoản ngân hàng để thực hiện nạp hoặc rút tiền an toàn.
            </p>
            <div className="flex flex-col space-y-3 mt-6">
              <button 
                onClick={() => onNavigate('BANKING')}
                className="w-full py-4 bg-[#FF85A1] text-white rounded-2xl font-bold shadow-lg shadow-[#FF85A1]/20 active:scale-95 transition-transform"
              >
                Liên kết ngay
              </button>
              <button 
                onClick={() => setShowWarning(false)}
                className="w-full py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold active:scale-95 transition-transform"
              >
                Để sau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-[#FF85A1] rounded-b-[40px] px-6 pt-12 pb-10 text-white shadow-xl shadow-[#FF85A1]/20">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="w-12 h-12 rounded-full border-2 border-white/50 bg-white/20"
            />
            <div>
              <p className="text-xs text-white/80">Chào mẹ,</p>
              <h3 className="font-bold text-lg">{user.name}</h3>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-white/20 rounded-full backdrop-blur-md">
                <Search size={20} />
            </button>
            <button 
              onClick={goToNotifications}
              className="p-2 bg-white/20 rounded-full backdrop-blur-md relative active:scale-90 transition-transform"
            >
                <Bell size={20} />
                {latestNotif && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-[#FF85A1] animate-pulse"></span>
                )}
            </button>
          </div>
        </div>

        <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-md border border-white/20">
          <p className="text-sm text-white/80 font-medium">Số dư tài khoản</p>
          <div className="flex items-end space-x-2">
            <h2 className="text-3xl font-bold mt-1 tracking-wide">
              {user.balance.toLocaleString('vi-VN')}
            </h2>
            <span className="mb-1.5 font-bold text-white/80">đ</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 -mt-6">
        <div className="bg-white rounded-3xl p-4 shadow-xl shadow-gray-200 flex justify-around items-center border border-gray-50">
            <button onClick={() => handleAction('DEPOSIT')} className="flex flex-col items-center space-y-2 group">
                <div className="w-14 h-14 bg-[#FFF0F3] rounded-2xl flex items-center justify-center text-[#FF85A1] group-active:scale-95 transition-transform">
                    <PlusCircle size={28} />
                </div>
                <span className="text-xs font-bold text-gray-700">Nạp tiền</span>
            </button>
            <div className="w-[1px] h-10 bg-gray-100"></div>
            <button onClick={() => handleAction('WITHDRAW')} className="flex flex-col items-center space-y-2 group">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-400 group-active:scale-95 transition-transform">
                    <ArrowDownCircle size={28} />
                </div>
                <span className="text-xs font-bold text-gray-700">Rút tiền</span>
            </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-6 mt-8 space-y-4">
        <div className="flex justify-between items-center px-1">
          <h4 className="font-bold text-gray-800">Lịch sử gần đây</h4>
          <button onClick={goToNotifications} className="text-[10px] text-[#FF85A1] font-bold uppercase tracking-wider">Xem tất cả</button>
        </div>
        
        {recentTransactions.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-gray-50">
            <Clock size={32} className="text-gray-200 mx-auto mb-2" />
            <p className="text-xs text-gray-400">Mẹ chưa có giao dịch nào</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map(tx => (
              <div key={tx.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                      tx.type === 'DEPOSIT' ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-500'
                    }`}>
                      {tx.type === 'DEPOSIT' ? <PlusCircle size={20} /> : <ArrowDownCircle size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{tx.type === 'DEPOSIT' ? 'Nạp tiền' : 'Rút tiền'}</p>
                      <p className="text-[10px] text-gray-400">{new Date(tx.timestamp).toLocaleString('vi-VN')}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-base font-black ${tx.type === 'DEPOSIT' ? 'text-green-500' : 'text-orange-500'}`}>
                      {tx.type === 'DEPOSIT' ? '+' : '-'}{tx.amount.toLocaleString()}đ
                    </p>
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      tx.status === 'APPROVED' ? 'bg-green-50 text-green-500' : 
                      tx.status === 'REJECTED' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'
                    }`}>
                      {tx.status === 'PENDING' ? 'Chờ duyệt' : tx.status === 'APPROVED' ? 'Thành công' : 'Từ chối'}
                    </span>
                  </div>
                </div>
                
                {/* LÝ DO TỪ CHỐI HIỆN RÕ RÀNG Ở ĐÂY */}
                {tx.status === 'REJECTED' && tx.rejectionReason && (
                  <div className="bg-red-50/50 p-3 rounded-2xl flex items-start space-x-2 border border-red-100/50">
                    <MessageSquare size={14} className="text-red-400 mt-0.5 shrink-0" />
                    <p className="text-[11px] text-red-600 font-medium leading-relaxed italic">
                      Lý do: {tx.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Promotion Banner */}
      <div className="px-6 mt-8 space-y-4">
        <h4 className="font-bold text-gray-800 px-1">Ưu đãi độc quyền</h4>
        <div 
          onClick={() => onNavigate('GIFTS')}
          className="relative bg-gradient-to-br from-orange-400 to-[#FF85A1] rounded-3xl p-6 text-white overflow-hidden shadow-lg active:scale-[0.98] transition-transform cursor-pointer"
        >
          <div className="relative z-10 w-2/3">
            <h3 className="text-xl font-bold leading-tight">Quà tặng 0 đồng cho mẹ & bé</h3>
            <p className="text-white/80 text-[10px] mt-2">Hàng ngàn sản phẩm tã sữa đang chờ đón mẹ.</p>
            <button className="mt-4 bg-white text-[#FF85A1] px-5 py-2 rounded-xl text-[11px] font-bold shadow-md">
                Nhận ngay
            </button>
          </div>
          <img 
            src={APP_CONFIG.HOME_BANNER_IMAGE} 
            alt="Product" 
            className="absolute -right-6 -bottom-6 w-40 h-40 opacity-30 rotate-12"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
