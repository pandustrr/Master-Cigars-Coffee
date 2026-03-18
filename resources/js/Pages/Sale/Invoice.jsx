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
    const { data, setData, post, processing, errors } = useForm({
        payment_proof: null,
        id: order.id,
        type: type
    });

    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('payment_proof', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('sale.payment-proof.store'), {
            forceFormData: true,
        });
    };

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
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <span className="text-gold text-[9px] font-black uppercase tracking-widest block mb-3 opacity-60">Transfer Bank Mandiri</span>
                                            <div className="flex justify-between items-center">
                                                <code className="text-white text-lg font-bold font-mono tracking-widest">{settings.bank_mandiri_norek}</code>
                                                <button onClick={() => copyToClipboard(settings.bank_mandiri_norek)} className="p-2 hover:bg-gold/20 rounded-lg transition-colors">
                                                    <DocumentDuplicateIcon className="w-4 h-4 text-gold" />
                                                </button>
                                            </div>
                                            <p className="text-white/40 text-[10px] uppercase font-bold mt-2">A/N {settings.bank_mandiri_name}</p>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <span className="text-gold text-[9px] font-black uppercase tracking-widest block mb-3 opacity-60">Transfer Bank BCA</span>
                                            <div className="flex justify-between items-center">
                                                <code className="text-white text-lg font-bold font-mono tracking-widest">{settings.bank_bca_norek}</code>
                                                <button onClick={() => copyToClipboard(settings.bank_bca_norek)} className="p-2 hover:bg-gold/20 rounded-lg transition-colors">
                                                    <DocumentDuplicateIcon className="w-4 h-4 text-gold" />
                                                </button>
                                            </div>
                                            <p className="text-white/40 text-[10px] uppercase font-bold mt-2">A/N {settings.bank_bca_name}</p>
                                        </div>
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

                        {/* Right Column: Upload Proof */}
                        <div className="space-y-6">
                            {order.payment_proof ? (
                                <div className="bg-[#51c49f] border border-[#00b37e] rounded-[2rem] p-8 lg:sticky lg:top-28 text-white">
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
                                        <p className="text-white/40 text-[9px] font-bold uppercase mt-3 italic leading-tight">*ID akan aktif sepenuhnya setelah pembayaran dikonfirmasi oleh Admin.</p>
                                    </div>

                                    <div className="space-y-3">
                                        <Link
                                            href={route('sale.tracking')}
                                            className="w-full py-4 bg-white text-[#00b37e] font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center justify-center shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                                        >
                                            <QrCodeIcon className="w-4 h-4 mr-2" />
                                            Cek Status Pesanan
                                        </Link>
                                        <a
                                            href={waUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-4 bg-[#25d366]/20 border border-white/20 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center justify-center hover:bg-[#25d366]/40 transition-all"
                                        >
                                            <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                                            Konfirmasi via WA
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-[#f0f9f6] border border-[#d1e7dd] rounded-[2rem] p-8 lg:sticky lg:top-28">
                                    <div className="flex items-center space-x-4 mb-8">
                                        <div className="w-12 h-12 bg-[#00b37e] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#00b37e]/20">
                                            <BanknotesIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <span className="text-[#00b37e] text-[10px] font-black uppercase tracking-widest block leading-none mb-1">Metode Pembayaran</span>
                                            <h4 className="text-[#1a4d3c] font-black uppercase tracking-tighter text-xl leading-none">Instruksi Transfer</h4>
                                        </div>
                                    </div>

                                    <div className="w-full h-px bg-[#d1e7dd] mb-8"></div>

                                    <h5 className="text-[#1a4d3c]/50 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Unggah Bukti Pembayaran</h5>

                                    <form onSubmit={submit} className="space-y-6">
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                accept="image/*"
                                            />
                                            <div className={`
                                                border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all duration-500
                                                ${preview ? 'border-[#00b37e] bg-white' : 'border-[#d1e7dd] bg-[#f8fdfb] group-hover:border-[#00b37e] group-hover:bg-white'}
                                            `}>
                                                {preview ? (
                                                    <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-xl">
                                                        <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                            <PhotoIcon className="w-8 h-8 text-white" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="w-14 h-14 bg-[#dcf5ec] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                            <PhotoIcon className="w-6 h-6 text-[#00b37e]" />
                                                        </div>
                                                        <span className="text-[#00b37e] text-[10px] font-black uppercase tracking-widest text-center leading-relaxed">
                                                            Pilih Gambar Bukti Transfer
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {errors.payment_proof && (
                                            <p className="text-red-500 text-[10px] font-bold uppercase text-center">{errors.payment_proof}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={processing || !data.payment_proof}
                                            className={`
                                                w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-xl transition-all duration-300
                                                ${!data.payment_proof || processing
                                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                                                    : 'bg-[#51c49f] text-white hover:bg-[#00b37e] hover:-translate-y-1 shadow-[#00b37e]/20'}
                                            `}
                                        >
                                            {processing ? 'Sedang Mengunggah...' : 'Konfirmasi & Unggah'}
                                        </button>
                                    </form>

                                    <div className="mt-8 pt-8 border-t border-[#d1e7dd] flex items-start space-x-4">
                                        <InformationCircleIcon className="w-5 h-5 text-[#00b37e] shrink-0 mt-0.5" />
                                        <div>
                                            <h6 className="text-[#1a4d3c] text-[10px] font-black uppercase tracking-widest mb-1">Informasi Verifikasi</h6>
                                            <p className="text-[#1a4d3c]/40 text-[9px] leading-relaxed">
                                                Verifikasi manual membutuhkan 5-15 menit. Anda akan mendapatkan ID Tracking setelah mengunggah bukti.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
