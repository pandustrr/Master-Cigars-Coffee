import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import {
    CheckCircleIcon,
    QrCodeIcon,
    BanknotesIcon,
    CloudArrowUpIcon,
    ChatBubbleLeftRightIcon,
    ArrowLeftIcon,
    InformationCircleIcon,
    DocumentDuplicateIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Invoice({ order, type, settings }) {
    const waNumber = settings.whatsapp_admin || "6281234567890";
    const message = `Halo Admin, saya ingin konfirmasi pembayaran untuk pesanan:
Nomor Pesanan: #${order.id}
Nama: ${order.customer_name}
Tipe: ${type.toUpperCase()}
Total: Rp ${parseFloat(order.total_price).toLocaleString()}

Bukti pembayaran telah diunggah di sistem. Mohon segera diverifikasi. Terima kasih.`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Disalin ke clipboard!');
    };

    return (
        <MainLayout>
            <Head title={`Invoice #${order.id} - Master Cerutu & Kopi`} />

            <section className="py-24 bg-hitam-pekat min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb / Back */}
                    <Link href={route('sale.index')} className="inline-flex items-center text-gold/60 hover:text-gold text-xs uppercase tracking-widest mb-12 transition-all group">
                        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Kembali ke Sale Center
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: Order Summary */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                                <div className="p-8 border-b border-white/5 bg-gradient-to-r from-gold/10 to-transparent">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-gold text-[10px] font-black uppercase tracking-[0.3em] block mb-2 opacity-60">Status Pesanan</span>
                                            <div className="inline-flex items-center px-3 py-1 bg-gold/20 border border-gold/30 rounded-full">
                                                <span className="w-2 h-2 bg-gold rounded-full mr-2 animate-pulse"></span>
                                                <span className="text-gold text-[10px] font-black uppercase tracking-widest">{order.status}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest block mb-1">Invoice Number</span>
                                            <h2 className="text-white font-black text-xl tracking-tighter">#{order.id}</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 space-y-6">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-cream-gold/40 uppercase tracking-widest font-bold">Pelanggan</span>
                                        <span className="text-white font-bold">{order.customer_name}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-cream-gold/40 uppercase tracking-widest font-bold">Layanan / Produk</span>
                                        <span className="text-gold font-bold uppercase tracking-tight">{type === 'retail' ? 'Produk Retail' : order.package_type || order.service_type}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-cream-gold/40 uppercase tracking-widest font-bold">Metode Pembayaran</span>
                                        <span className="text-white font-bold">{order.payment_method}</span>
                                    </div>
                                    <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                                        <div>
                                            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest block mb-1">Total Pembayaran</span>
                                            <p className="text-gold text-3xl font-black tracking-tighter">Rp {parseFloat(order.total_price).toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white/20 text-[9px] font-bold italic uppercase tracking-widest">Sudah termasuk PPN & Biaya Layanan</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Instructions */}
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                                <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8 flex items-center">
                                    <BanknotesIcon className="w-4 h-4 mr-2 text-gold" />
                                    Instruksi Pembayaran
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Bank Transfer */}
                                    <div className="space-y-4">
                                        {settings.bank_accounts && settings.bank_accounts.map((acc, index) => (
                                            <div key={index} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                                <span className="text-gold text-[9px] font-black uppercase tracking-widest block mb-3 opacity-60">Transfer {acc.bank}</span>
                                                <div className="flex justify-between items-center">
                                                    <code className="text-white text-lg font-bold font-mono tracking-widest">{acc.norek}</code>
                                                    <button onClick={() => copyToClipboard(acc.norek)} className="p-2 hover:bg-gold/20 rounded-lg transition-colors">
                                                        <DocumentDuplicateIcon className="w-4 h-4 text-gold" />
                                                    </button>
                                                </div>
                                                <p className="text-white/40 text-[10px] uppercase font-bold mt-2">A/N {acc.name}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* QRIS Placeholder */}
                                    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl">
                                        <span className="text-hitam-pekat text-[9px] font-black uppercase tracking-widest block mb-4 opacity-100">Scan QRIS untuk Bayar</span>
                                        <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-gray-100 p-2">
                                            {settings.qris_image ? (
                                                <img src={`/storage/${settings.qris_image}`} className="w-full h-full object-contain" alt="QRIS" />
                                            ) : (
                                                <QrCodeIcon className="w-16 h-16 text-gray-400" />
                                            )}
                                        </div>
                                        <p className="text-hitam-pekat/40 text-[8px] font-bold uppercase text-center leading-tight">Mendukung All E-Wallet & Mobile Banking</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Status */}
                        <div className="space-y-6">
                            <div className="bg-[#51c49f] border border-[#00b37e] rounded-[2rem] p-8 lg:sticky lg:top-28 text-white shadow-xl shadow-[#00b37e]/10">
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#00b37e] shadow-lg">
                                        <CheckCircleIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-white/60 text-[10px] font-black uppercase tracking-widest block leading-none mb-1">Status Pembayaran</span>
                                        <h4 className="text-white font-black uppercase tracking-tighter text-xl leading-none">Menunggu Konfirmasi</h4>
                                    </div>
                                </div>

                                <div className="p-6 bg-white/10 rounded-2xl border border-white/20 mb-8">
                                    <span className="text-white/60 text-[9px] font-black uppercase tracking-widest block mb-1">ID Tracking Anda</span>
                                    <div className="flex justify-between items-center">
                                        <code className="text-white text-2xl font-black font-mono tracking-wider">{order.tracking_code}</code>
                                        <button onClick={() => copyToClipboard(order.tracking_code)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                                            <DocumentDuplicateIcon className="w-5 h-5 text-white" />
                                        </button>
                                    </div>
                                    <p className="text-white/40 text-[9px] font-bold uppercase mt-3 italic leading-tight">*Simpan kode pelacakan ini, Admin akan segera memverifikasi pesanan Anda (5-10 Menit).</p>
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        href={route('sale.tracking')}
                                        className="w-full py-4 bg-white text-[#00b37e] font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center justify-center shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        <QrCodeIcon className="w-4 h-4 mr-2" />
                                        Lacak Status Pesanan
                                    </Link>
                                    <a
                                        href={waUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-4 bg-[#25d366] text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center justify-center shadow-lg shadow-[#25d366]/30 hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                                        Konfirmasi via WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
