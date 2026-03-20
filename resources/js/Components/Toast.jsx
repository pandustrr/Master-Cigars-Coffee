import { useState, useEffect } from 'react';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Toast({ message, type = 'success', onClose }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setTimeout(onClose, 300); // Tunggu transisi selesai
            }, 2000); // 2 detik saja
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div 
            className={`fixed top-10 right-10 z-[9999] transition-all duration-300 transform ${
                visible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
        >
            <div className={`
                flex items-center space-x-3 px-6 py-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border backdrop-blur-md
                ${type === 'success' 
                    ? 'bg-hitam-pekat/90 border-gold/20 text-white' 
                    : 'bg-red-900/90 border-red-500/20 text-white'}
            `}>
                <div className={`p-2 rounded-xl ${type === 'success' ? 'bg-gold/10 text-gold' : 'bg-red-500/10 text-red-500'}`}>
                    <CheckCircleIcon className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 leading-none mb-1">Notifikasi Sistem</span>
                    <span className="text-sm font-bold tracking-tight uppercase">{message}</span>
                </div>
                <button 
                    onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
                    className="ml-4 text-white/20 hover:text-white transition-colors"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
