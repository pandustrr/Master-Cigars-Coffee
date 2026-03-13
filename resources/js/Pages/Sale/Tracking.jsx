import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import { MagnifyingGlassIcon, ArrowPathIcon, CheckCircleIcon, TruckIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Tracking({ order, type }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sale.tracking.track'));
    };

    const getStatusStep = (status) => {
        const steps = [
            'Pending',
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

            <div className="relative max-w-2xl mx-auto px-6 py-20">
                <Link href={route('home')} className="inline-flex items-center text-xs font-black uppercase tracking-widest text-[#C9A24A] hover:text-[#E2C27A] transition mb-12">
                    <span className="mr-2">&larr;</span> Kembali ke Beranda
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Lacak <span className="text-[#C9A24A]">Pesanan</span></h1>
                    <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">Masukkan kode pelacakan unik Anda untuk melihat status terbaru pesanan Anda.</p>
                </div>

                <form onSubmit={submit} className="mb-12">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Contoh: MST-A1B2C3"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            className={`w-full bg-[#151515] border-2 ${errors.code ? 'border-red-500' : 'border-[#222]'} rounded-2xl py-5 px-6 pt-8 text-xl font-black tracking-widest text-white focus:outline-none focus:border-[#C9A24A] transition-all group-hover:border-[#333]`}
                            required
                        />
                        <label className="absolute left-6 top-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-[#C9A24A]">ID Pelacakan</label>
                        <button
                            disabled={processing}
                            className="absolute right-3 top-3 bottom-3 bg-[#C9A24A] text-black px-6 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#E2C27A] transition flex items-center shadow-lg shadow-[#C9A24A]/20"
                        >
                            {processing ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <MagnifyingGlassIcon className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.code && <p className="text-red-500 text-[10px] font-bold uppercase mt-2 tracking-widest px-2">{errors.code}</p>}
                </form>

                {order && (
                    <div className="bg-[#151515] rounded-3xl p-8 border border-[#222] animate-fade-in shadow-2xl">
                        <div className="flex justify-between items-start mb-10 pb-6 border-b border-[#222]">
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Status Saat Ini</h3>
                                <p className="text-2xl font-black text-[#C9A24A] uppercase tracking-tight">{order.status}</p>
                            </div>
                            <div className="text-right">
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Kode</h3>
                                <p className="text-sm font-mono text-white tracking-widest">{order.tracking_code}</p>
                            </div>
                        </div>

                        {/* Visual Progress Bar */}
                        <div className="space-y-10 relative">
                            {/* Track line */}
                            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-[#222]" />

                            {[
                                { status: 'Pending', label: 'Pesanan Dibuat', icon: ClockIcon },
                                { status: 'Menunggu Konfirmasi', label: 'Pembayaran Diverifikasi', icon: CheckCircleIcon },
                                { status: 'Diproses', label: 'Sedang Disiapkan', icon: ArrowPathIcon },
                                { status: 'Dikirim', label: 'Dalam Pengiriman', icon: TruckIcon },
                                { status: 'Selesai', label: 'Selesai', icon: CheckCircleIcon }
                            ].map((step, idx) => {
                                const isCompleted = idx <= currentStep;
                                const isCurrent = idx === currentStep;

                                return (
                                    <div key={idx} className={`relative flex items-center space-x-6 ${!isCompleted ? 'opacity-30' : ''}`}>
                                        <div className={`
                                            relative z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500
                                            ${isCompleted ? 'bg-[#C9A24A] text-black scale-110 shadow-lg shadow-[#C9A24A]/20' : 'bg-[#222] text-gray-600'}
                                            ${isCurrent ? 'ring-4 ring-[#C9A24A]/20' : ''}
                                        `}>
                                            <step.icon className={`w-5 h-5 ${isCurrent ? 'animate-pulse' : ''}`} />
                                        </div>
                                        <div>
                                            <p className={`text-xs font-black uppercase tracking-widest ${isCompleted ? 'text-[#C9A24A]' : 'text-gray-500'}`}>{step.label}</p>
                                            <p className="text-[10px] text-gray-600 font-medium">
                                                {isCompleted ? (isCurrent ? 'Sedang berlangsung' : 'Berhasil diselesaikan') : 'Tahap selanjutnya'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-12 pt-8 border-t border-[#222] grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Nama Pemesan</h4>
                                <p className="text-sm font-bold text-white">{order.customer_name}</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Jenis Layanan</h4>
                                <p className="text-sm font-bold text-white uppercase tracking-tighter">
                                    {type === 'retail' ? 'Retail / Eceran' : type === 'package' ? 'Paket Layanan' : 'Point Corner'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
