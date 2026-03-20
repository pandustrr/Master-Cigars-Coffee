import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import {
    CheckCircleIcon,
    QrCodeIcon,
    BanknotesIcon,
    CloudArrowUpIcon,
    ChatBubbleLeftRightIcon,
    ArrowLeftIcon,
    InformationCircleIcon,
    DocumentDuplicateIcon,
    PhotoIcon,
    MagnifyingGlassPlusIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Invoice({ order, type, settings }) {
    const { translations } = usePage().props;
    const [isQrisPreviewOpen, setIsQrisPreviewOpen] = useState(false);

    // Helper function for translations
    const __ = (key) => {
        const keys = key.split('.');
        let result = translations;
        for (const k of keys) {
            if (result && result[k]) {
                result = result[k];
            } else {
                return key;
            }
        }
        return result;
    };

    const waNumber = settings.whatsapp_admin || "6281234567890";
    const localizedType = type === 'retail' ? __('sale.invoice.type_retail') : (order.package_type || order.service_type);
    
    const message = __('sale.invoice.wa_msg')
        .replace('%id%', order.id)
        .replace('%name%', order.customer_name)
        .replace('%type%', localizedType.toUpperCase())
        .replace('%total%', parseFloat(order.total_price).toLocaleString());

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert(__('sale.invoice.copied'));
    };

    return (
        <MainLayout>
            <Head title={__('sale.invoice.head_title').replace('%id%', order.id)} />

            <section className="py-16 md:py-24 bg-hitam-pekat min-h-screen">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb / Back */}
                    <Link href={route('sale.index')} className="inline-flex items-center text-gold/60 hover:text-gold text-[10px] md:text-xs uppercase tracking-widest mb-6 md:mb-8 transition-all group">
                        <ArrowLeftIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        {__('sale.invoice.back')}
                    </Link>

                    {/* Screenshot Disclaimer */}
                    <div className="mb-6 md:mb-8 bg-gold/10 border border-gold/30 rounded-xl p-4 flex items-start space-x-3 md:space-x-4 animate-fade-in-up">
                        <InformationCircleIcon className="w-5 h-5 md:w-6 md:h-6 text-gold shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-gold font-black uppercase text-[9px] md:text-[10px] tracking-widest mb-1">{__('sale.invoice.disc_title')}</h3>
                            <p className="text-white/80 text-[9px] md:text-[10px] leading-relaxed">
                                {__('sale.invoice.disc_desc')}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

                        {/* Left Column: Order Summary */}
                        <div className="md:col-span-2 space-y-6 md:space-y-8">
                            <div className="bg-[#16120e] border border-white/10 rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
                                <div className="p-5 md:p-6 border-b border-white/5 bg-linear-to-r from-gold/10 to-transparent">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                                        <div>
                                            <span className="text-gold text-[9px] md:text-[10px] font-black uppercase tracking-widest block mb-2 opacity-60">{__('sale.invoice.order_status')}</span>
                                            <div className="inline-flex items-center px-3 py-1 bg-gold/20 border border-gold/30 rounded-full">
                                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gold rounded-full mr-2 animate-pulse"></span>
                                                <span className="text-gold text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                                                    {order.status === 'Selesai' ? __('sale.tracking.status_done') :
                                                     order.status === 'Dikirim' ? __('sale.tracking.status_ship') :
                                                     order.status === 'Diproses' ? __('sale.tracking.status_process') :
                                                     order.status === 'Menunggu Konfirmasi' ? __('sale.tracking.status_wait') :
                                                     order.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <span className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest block mb-1">{__('sale.invoice.order_id')}</span>
                                            <h2 className="text-white font-black text-base md:text-lg tracking-tighter">#{order.id}</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 md:p-6 space-y-4 md:space-y-6">
                                    <div className="flex justify-between items-center text-[10px] md:text-xs">
                                        <span className="text-cream-gold/40 uppercase tracking-widest font-bold">{__('sale.invoice.customer')}</span>
                                        <span className="text-white font-bold">{order.customer_name}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] md:text-xs">
                                        <span className="text-cream-gold/40 uppercase tracking-widest font-bold">{__('sale.invoice.item')}</span>
                                        <span className="text-gold font-bold uppercase tracking-tight">{type === 'retail' ? __('sale.invoice.type_retail') : order.package_type || order.service_type}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] md:text-xs">
                                        <span className="text-cream-gold/40 uppercase tracking-widest font-bold">{__('sale.invoice.method')}</span>
                                        <span className="text-white font-bold">{order.payment_method}</span>
                                    </div>
                                    <div className="pt-5 md:pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-end gap-2 md:gap-0">
                                        <div>
                                            <span className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest block mb-1">{__('sale.invoice.total')}</span>
                                            <p className="text-gold text-xl md:text-2xl font-black tracking-tighter">Rp {parseFloat(order.total_price).toLocaleString()}</p>
                                        </div>
                                        <div className="text-left md:text-right">
                                            <p className="text-white/20 text-[8px] md:text-[9px] font-bold italic uppercase tracking-widest">{__('sale.invoice.vat')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Instructions */}
                            <div className="bg-[#16120e] border border-white/10 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-xl">
                                <h3 className="text-white font-black uppercase tracking-widest text-[10px] md:text-xs mb-6 flex items-center">
                                    <BanknotesIcon className="w-4 h-4 mr-2 text-gold" />
                                    {__('sale.invoice.instr_title')}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    {/* Bank Transfer */}
                                    <div className="space-y-4">
                                        {settings.bank_accounts && settings.bank_accounts.map((acc, index) => (
                                            <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/5">
                                                <span className="text-gold text-[8px] md:text-[9px] font-black uppercase tracking-widest block mb-2 md:mb-3 opacity-60">
                                                    {__('sale.invoice.instr_tf').replace('%bank%', acc.bank)}
                                                </span>
                                                <div className="flex justify-between items-center">
                                                    <code className="text-white text-xs md:text-sm font-bold font-mono tracking-widest">{acc.norek}</code>
                                                    <button onClick={() => copyToClipboard(acc.norek)} className="p-2 hover:bg-gold/20 rounded-lg transition-colors">
                                                        <DocumentDuplicateIcon className="w-4 h-4 text-gold" />
                                                    </button>
                                                </div>
                                                <p className="text-white/40 text-[8px] md:text-[10px] uppercase font-bold mt-1 md:mt-2">A/N {acc.name}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* QRIS Placeholder */}
                                    <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-white rounded-xl">
                                        <span className="text-hitam-pekat text-[8px] md:text-[9px] font-black uppercase tracking-widest block mb-3 md:mb-4 opacity-100">{__('sale.invoice.instr_scan')}</span>
                                        <div className="relative group w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg flex items-center justify-center mb-3 md:mb-4 border-2 border-dashed border-gray-100 p-2">
                                            {settings.qris_image ? (
                                                <>
                                                    <img src={`/storage/${settings.qris_image}`} className="w-full h-full object-contain" alt="QRIS" />
                                                    <button 
                                                        type="button"
                                                        onClick={() => setIsQrisPreviewOpen(true)}
                                                        className="absolute top-1 right-1 bg-black/50 hover:bg-black/80 p-1.5 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm cursor-pointer"
                                                    >
                                                        <MagnifyingGlassPlusIcon className="w-4 h-4 md:w-5 md:h-5" />
                                                    </button>
                                                </>
                                            ) : (
                                                <QrCodeIcon className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
                                            )}
                                        </div>
                                        <p className="text-hitam-pekat/40 text-[7px] md:text-[8px] font-bold uppercase text-center leading-tight">{__('sale.invoice.instr_e_wallet')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Status */}
                        <div className="space-y-6 md:sticky md:top-24 h-fit">
                            <div className="bg-[#16120e] border border-gold/30 rounded-xl md:rounded-2xl p-5 md:p-6 text-white shadow-xl shadow-gold/5 flex flex-col h-full">
                                <div className="flex items-center space-x-4 mb-6 md:mb-8">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gold shadow-lg">
                                        <CheckCircleIcon className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <div>
                                        <span className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest block leading-none mb-1">{__('sale.invoice.pay_status')}</span>
                                        <h4 className="text-gold font-black uppercase tracking-tighter text-base md:text-lg leading-none">
                                            {order.status === 'Selesai' ? __('sale.tracking.status_done') :
                                             order.status === 'Dikirim' ? __('sale.tracking.status_ship') :
                                             order.status === 'Diproses' ? __('sale.tracking.status_process') :
                                             order.status === 'Menunggu Konfirmasi' ? __('sale.tracking.status_wait') :
                                             order.status}
                                        </h4>
                                    </div>
                                </div>

                                <div className="p-4 md:p-5 bg-gold/10 rounded-xl border border-gold/20 mb-6 md:mb-8">
                                    <span className="text-gold/60 text-[8px] md:text-[9px] font-black uppercase tracking-widest block mb-1">{__('sale.invoice.your_id')}</span>
                                    <div className="flex justify-between items-center">
                                        <code className="text-gold text-base md:text-xl font-black font-mono tracking-wider">{order.tracking_code}</code>
                                        <button onClick={() => copyToClipboard(order.tracking_code)} className="p-2 hover:bg-gold/20 shrink-0 rounded-lg transition-colors text-gold">
                                            <DocumentDuplicateIcon className="w-4 h-4 md:w-5 md:h-5" />
                                        </button>
                                    </div>
                                    <p className="text-white/40 text-[8px] md:text-[9px] font-bold uppercase mt-2 md:mt-3 italic leading-tight">{__('sale.invoice.id_note')}</p>
                                </div>

                                <div className="space-y-3 mt-auto">
                                    <Link
                                        href={route('sale.tracking')}
                                        className="w-full py-3 md:py-4 bg-transparent border border-gold text-gold font-black text-center uppercase tracking-widest text-[9px] md:text-[10px] rounded-xl flex items-center justify-center hover:bg-gold hover:text-hitam-pekat transition-all"
                                    >
                                        <QrCodeIcon className="w-4 h-4 mr-2" />
                                        {__('sale.invoice.track_button')}
                                    </Link>
                                    <a
                                        href={waUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 md:py-4 bg-gold text-hitam-pekat font-black text-center uppercase tracking-widest text-[9px] md:text-[10px] rounded-xl flex items-center justify-center shadow-lg hover:-translate-y-0.5 transition-all"
                                    >
                                        <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
                                        {__('sale.invoice.confirm_button')}
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* QRIS Preview Modal */}
            {isQrisPreviewOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm shadow-2xl animate-fade-in" onClick={() => setIsQrisPreviewOpen(false)}>
                    <div className="relative max-w-[90vw] md:max-w-lg w-full bg-white p-4 rounded-2xl animate-modal-in" onClick={e => e.stopPropagation()}>
                        <button 
                            type="button"
                            onClick={() => setIsQrisPreviewOpen(false)}
                            className="absolute -top-4 -right-4 bg-hitam-pekat rounded-full p-2 border-2 border-white text-white shadow-lg hover:scale-110 transition-transform cursor-pointer"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                        <img src={`/storage/${settings.qris_image}`} alt="QRIS Preview" className="w-full h-auto object-contain rounded-xl" />
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
