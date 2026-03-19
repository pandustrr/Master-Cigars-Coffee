import React, { useState } from 'react';
import { 
    ChatBubbleLeftRightIcon, 
    ClipboardDocumentIcon,
    FunnelIcon,
    CheckCircleIcon,
    ClockIcon,
    TruckIcon,
    XCircleIcon,
    QueueListIcon
} from '@heroicons/react/24/outline';
import StatusUpdateForm from './StatusUpdateForm';

export default function OrdersTab({ activeTab, orders }) {
    const [statusFilter, setStatusFilter] = useState('Semua');

    const statuses = [
        { id: 'Semua', name: 'Semua', icon: QueueListIcon, color: 'text-gray-400 bg-gray-50' },
        { id: 'Menunggu Konfirmasi', name: 'Menunggu', icon: ClockIcon, color: 'text-indigo-500 bg-indigo-50' },
        { id: 'Diproses', name: 'Proses', icon: FunnelIcon, color: 'text-amber-500 bg-amber-50' },
        { id: 'Dikirim', name: 'Kirim', icon: TruckIcon, color: 'text-sky-500 bg-sky-50' },
        { id: 'Selesai', name: 'Selesai', icon: CheckCircleIcon, color: 'text-emerald-500 bg-emerald-50' },
        { id: 'Dibatalkan', name: 'Batal', icon: XCircleIcon, color: 'text-red-500 bg-red-50' },
    ];

    const filteredOrders = statusFilter === 'Semua' 
        ? orders 
        : orders.filter(order => order.status === statusFilter);

    return (
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-gray-100">
                    <div>
                        <h3 className="text-lg font-black text-gray-800 tracking-tighter uppercase leading-none">
                            {activeTab === 'retail' ? 'Pesanan Ritel' : activeTab === 'package' ? 'Pesanan Paket' : 'Pesanan Point Corner'}
                        </h3>
                        <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1 leading-none">Pemantauan status pesanan secara waktu nyata</p>
                    </div>

                    {/* Status Filter Pills */}
                    <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1 group/filters">
                        {statuses.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setStatusFilter(s.id)}
                                className={`
                                    flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all duration-300 border
                                    ${statusFilter === s.id 
                                        ? 'bg-hitam-pekat text-white border-hitam-pekat shadow-lg shadow-black/10' 
                                        : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300 hover:text-gray-600'}
                                `}
                            >
                                <s.icon className={`w-3 h-3 ${statusFilter === s.id ? 'text-gold' : 'text-gray-300'}`} />
                                <span className="shrink-0">{s.name}</span>
                                {statusFilter === s.id && (
                                    <span className="ml-1 bg-gold text-hitam-pekat px-1.5 py-0.5 rounded-md text-[7px] leading-none font-black">
                                        {filteredOrders.length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead>
                            <tr className="bg-gray-50/80">
                                <th className="px-4 py-3.5 text-left text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Pelanggan</th>
                                <th className="px-4 py-3.5 text-left text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Pesanan</th>
                                <th className="px-4 py-3.5 text-left text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Total Harga</th>
                                <th className="px-4 py-3.5 text-left text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Bukti Bayar</th>
                                <th className="px-4 py-3.5 text-left text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-4 py-3.5 text-left text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">No. Resi</th>
                                <th className="px-4 py-3.5 text-right text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-all duration-300 group">
                                    <td className="px-4 py-4">
                                        <div className="text-base font-black text-gray-800 transition-colors uppercase">{order.customer_name}</div>
                                        <div className="text-[10px] text-gray-500 font-bold font-mono tracking-tighter flex items-center mt-1">
                                            <ChatBubbleLeftRightIcon className="w-3.5 h-3.5 mr-2" />
                                            {order.whatsapp}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        {activeTab === 'retail' ? (
                                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{order.quantity} Units</span>
                                        ) : (
                                            <span className="text-[9px] font-black text-gold-muda uppercase tracking-[0.2em] bg-gold/10 px-2 py-1 rounded-md border border-gold/20">
                                                {order.package_type || order.service_type}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="text-sm font-black text-gold italic">
                                            Rp {parseFloat(order.total_price || (order.price * (order.quantity || 1))).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        {order.payment_proof ? (
                                            <a href={`/storage/${order.payment_proof}`} target="_blank" rel="noreferrer" className="inline-flex items-center px-3 py-1.5 bg-gold/10 text-gold-muda border border-gold/20 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] hover:bg-gold hover:text-white transition-all shadow-sm active:scale-95">
                                                Lihat Bukti
                                            </a>
                                        ) : (
                                            <div className="flex items-center space-x-2 text-gray-400 justify-center">
                                                <div className="w-1 h-1 rounded-full bg-gray-300 animate-pulse"></div>
                                                <span className="text-[9px] font-black tracking-[0.2em] uppercase">Menunggu</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className={`inline-flex items-center px-3 py-1.5 text-[9px] font-black rounded-lg uppercase tracking-[0.1em] shadow-sm bg-white border ${
                                            order.status === 'Selesai' ? 'text-emerald-500 border-emerald-200' :
                                            order.status === 'Dikirim' ? 'text-sky-500 border-sky-200' :
                                            order.status === 'Menunggu Konfirmasi' ? 'text-indigo-500 border-indigo-200' :
                                            order.status === 'Dibatalkan' ? 'text-red-500 border-red-200' :
                                            'text-amber-500 border-amber-200'
                                        }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse bg-current`}></div>
                                            {order.status === 'Selesai' ? 'Pesanan Selesai' :
                                             order.status === 'Dikirim' ? 'Dalam Pengiriman' :
                                             order.status === 'Diproses' ? 'Diproses / Menyiapkan' :
                                             order.status === 'Menunggu Konfirmasi' ? 'Menunggu Verifikasi' :
                                             order.status}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200 group-hover:border-gold/30 transition-all shadow-inner min-w-[100px]">
                                            <span className="text-[11px] font-black font-mono text-gray-500 tracking-widest px-1">{order.tracking_code || '---'}</span>
                                            {order.tracking_code && (
                                                <button
                                                    onClick={() => { navigator.clipboard.writeText(order.tracking_code); alert('Nomor Resi Disalin!'); }}
                                                    className="p-1.5 bg-white hover:bg-gold hover:text-white border border-gray-100 rounded-lg text-gray-400 transition-all active:scale-95 shadow-sm"
                                                >
                                                    <ClipboardDocumentIcon className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="transition-all duration-300 flex justify-end">
                                            <StatusUpdateForm order={order} type={activeTab === 'point' ? 'point-corner' : activeTab} />
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredOrders.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="px-4 py-16 text-center text-gray-400 text-[10px] font-black uppercase tracking-widest border-t border-gray-50">
                                        <div className="flex flex-col items-center space-y-4">
                                            <FunnelIcon className="w-10 h-10 text-gray-100" />
                                            <span>Tidak ada pesanan dengan status "{statusFilter}"</span>
                                            <button onClick={() => setStatusFilter('Semua')} className="text-gold text-[8px] border-b border-gold/30 pb-0.5 hover:text-gold-muda">Lihat Semua Pesanan</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
