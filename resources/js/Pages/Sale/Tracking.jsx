import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { MagnifyingGlassIcon, ArrowPathIcon, CheckCircleIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Tracking({ order, type, saleItem }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sale.tracking.track'));
    };

    const getStatusStep = (status) => {
        const steps = [
            'Menunggu Konfirmasi',
            'Diproses',
            'Dikirim',
            'Selesai'
        ];
        return steps.indexOf(status);
    };

    const currentStep = order ? getStatusStep(order.status) : -1;

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-[#F2D9A6] font-sans selection:bg-[#C9A24A] selection:text-black">
            <Head title="Lacak Pesanan - Master Cigars & Coffee" />

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C9A24A]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#3B2416]/20 rounded-full blur-[120px]" />
            </div>

            <div className="relative max-w-lg md:max-w-xl mx-auto px-4 md:px-6 py-8 md:py-16">
                <Link href={route('sale.index')} className="inline-flex items-center text-[10px] md:text-xs font-black uppercase tracking-widest text-[#C9A24A] hover:text-[#E2C27A] transition mb-6 md:mb-10">
                    <span className="mr-2">&larr;</span> Kembali ke Sale Center
                </Link>

                <div className="text-center mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-2 md:mb-3">Lacak <span className="text-[#C9A24A]">Pesanan</span></h1>
                    <p className="text-gray-500 text-[10px] md:text-xs max-w-sm mx-auto leading-relaxed px-4 md:px-0">Masukkan ID Pelacakan untuk melihat status terbaru pesanan Anda.</p>
                </div>

                <form onSubmit={submit} className="mb-8 md:mb-10">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Contoh: MST-A1B2C3"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            className={`w-full bg-[#151515] border-2 ${errors.code ? 'border-red-500' : 'border-[#222]'} rounded-lg md:rounded-xl py-3 md:py-4 px-4 md:px-5 pt-6 md:pt-7 text-base md:text-lg font-black tracking-widest text-white focus:outline-none focus:border-[#C9A24A] transition-all hover:border-[#333]`}
                            required
                        />
                        <label className="absolute left-4 md:left-5 top-2 title-text text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-[#C9A24A]">ID Pelacakan</label>
                        <button
                            disabled={processing}
                            className="absolute right-1.5 md:right-2 top-1.5 md:top-2 bottom-1.5 md:bottom-2 bg-[#C9A24A] text-black px-4 md:px-5 rounded-md md:rounded-lg font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-[#E2C27A] transition flex items-center shadow-md shadow-[#C9A24A]/20"
                        >
                            {processing ? <ArrowPathIcon className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> : <MagnifyingGlassIcon className="w-3 h-3 md:w-4 md:h-4" />}
                            <span className="hidden sm:inline ml-1.5 md:ml-2">Lacak</span>
                        </button>
                    </div>
                    {errors.code && <p className="text-red-500 text-[9px] md:text-[10px] font-bold uppercase mt-2 tracking-widest px-2">{errors.code}</p>}
                </form>

                {order && order.status === 'Dibatalkan' && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center space-x-4 animate-fade-in shadow-lg">
                         <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                             <span className="text-red-500 font-black text-xl">!</span>
                         </div>
                         <div>
                             <h3 className="text-red-500 font-black uppercase text-[10px] tracking-widest mb-0.5">Pesanan Dibatalkan</h3>
                             <p className="text-gray-400 text-[10px] leading-tight">Mohon maaf, pesanan Anda tidak dapat dilanjutkan. Silakan hubungi admin untuk info lebih lanjut.</p>
                         </div>
                    </div>
                )}

                {order && order.status !== 'Dibatalkan' && (
                    <div className="bg-[#151515] rounded-xl md:rounded-2xl p-4 md:p-6 border border-[#222] animate-fade-in shadow-2xl">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 pb-4 md:pb-5 border-b border-[#222] gap-3 sm:gap-0">
                            <div>
                                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500 mb-1 md:mb-2">Status Saat Ini</h3>
                                <p className="text-lg md:text-2xl font-black text-[#C9A24A] uppercase tracking-tight">{order.status}</p>
                            </div>
                            <div className="text-left sm:text-right">
                                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500 mb-1 md:mb-2">ID Tracking</h3>
                                <p className="text-xs md:text-sm font-mono text-white tracking-widest">{order.tracking_code}</p>
                            </div>
                        </div>

                        {/* Visual Progress Bar */}
                        <div className="space-y-10 relative">
                            {/* Track line */}
                            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-[#222]" />

                             {[
                                { status: 'Menunggu Konfirmasi', label: 'Menunggu Verifikasi', sub: 'Admin melihat bukti bayar', icon: ClockIcon },
                                { status: 'Diproses', label: 'Diproses / Menyiapkan', sub: 'Pembayaran Sah, barang disiapkan', icon: CheckCircleIcon },
                                { status: 'Dikirim', label: 'Dalam Pengiriman', sub: 'Paket sedang menuju lokasi Anda', icon: TruckIcon },
                                { status: 'Selesai', label: 'Pesanan Selesai', sub: 'Kiriman telah sampai di tujuan', icon: CheckCircleIcon }
                            ].map((step, idx) => {
                                const isCompleted = idx < currentStep || (order && order.status === 'Selesai');
                                const isCurrent = idx === currentStep && order && order.status !== 'Selesai';
                                const isPending = idx > currentStep && order && order.status !== 'Selesai';

                                return (
                                    <div key={idx} className={`relative flex items-center space-x-6 ${!isCompleted && !isCurrent ? 'opacity-30' : ''}`}>
                                        <div className={`
                                            relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500
                                            ${isCompleted ? 'bg-[#C9A24A] text-black scale-110 shadow-lg shadow-[#C9A24A]/20' : 'bg-[#222] text-gray-600'}
                                            ${isCurrent ? 'ring-4 ring-[#C9A24A]/20' : ''}
                                        `}>
                                            <step.icon className={`w-5 h-5 ${isCurrent ? 'animate-pulse' : ''}`} />
                                        </div>
                                         <div>
                                            <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${isCompleted ? 'text-[#C9A24A]' : isCurrent ? 'text-white' : 'text-gray-500'}`}>{step.label}</p>
                                            <p className="text-[9px] md:text-[10px] text-gray-600 font-medium tracking-tight">
                                                {step.sub}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[#222] grid grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Nama Pemesan</h4>
                                <p className="text-xs md:text-sm font-bold text-white">{order.customer_name}</p>
                            </div>
                            <div>
                                <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Jenis Layanan</h4>
                                <p className="text-xs md:text-sm font-bold text-white uppercase tracking-tighter">
                                    {type === 'retail' ? 'Retail / Eceran' : type === 'package' ? 'Paket Layanan' : 'Point Corner'}
                                </p>
                            </div>
                        </div>

                        {/* Ordered Item Details */}
                        {saleItem && (
                            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-dashed border-[#222]">
                                <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 md:mb-4">Item yang Dipesan</h4>
                                <div className="flex items-center space-x-4 bg-[#111] p-3 md:p-4 rounded-xl border border-white/5">
                                    <div className="w-14 h-14 md:w-16 md:h-16 bg-black rounded-lg overflow-hidden shrink-0 border border-[#222]">
                                        <img src={saleItem.image ? `/storage/${saleItem.image}` : '/images/hero.png'} alt={saleItem.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h5 className="text-xs md:text-sm font-bold text-white mb-1">{saleItem.name}</h5>
                                        <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest mb-1">{saleItem.category}</p>
                                        <p className="text-[10px] md:text-xs font-mono text-[#C9A24A] font-black tracking-widest">Rp {parseFloat(saleItem.price).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
