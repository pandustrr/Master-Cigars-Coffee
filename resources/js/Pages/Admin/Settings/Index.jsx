import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    BanknotesIcon,
    QrCodeIcon,
    ChatBubbleLeftRightIcon,
    CloudArrowUpIcon,
    CheckCircleIcon,
    PhotoIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Index({ settings }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        bank_mandiri_norek: settings.bank_mandiri_norek || '',
        bank_mandiri_name: settings.bank_mandiri_name || '',
        bank_bca_norek: settings.bank_bca_norek || '',
        bank_bca_name: settings.bank_bca_name || '',
        whatsapp_admin: settings.whatsapp_admin || '',
        qris_image: null,
    });

    const [qrisPreview, setQrisPreview] = useState(settings.qris_image ? `/storage/${settings.qris_image}` : null);

    const handleQrisChange = (e) => {
        const file = e.target.files[0];
        setData('qris_image', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setQrisPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-black text-2xl text-gray-900 leading-tight tracking-tighter">System Configuration</h2>}
        >
            <Head title="Admin - Settings" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-200 text-white flex justify-between items-center overflow-hidden relative">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black tracking-tighter mb-2">Payment Control Center</h3>
                            <p className="text-indigo-100 text-xs font-bold uppercase tracking-[0.2em] opacity-80">Global payment settings and contact integration</p>
                        </div>
                        <ShieldCheckIcon className="w-32 h-32 absolute -right-8 -bottom-8 text-white/10 rotate-12" />
                    </div>

                    {recentlySuccessful && (
                        <div className="p-5 bg-green-600 rounded-2xl flex items-center text-white shadow-xl shadow-green-100 animate-bounce">
                            <CheckCircleIcon className="w-6 h-6 mr-3" />
                            <span className="text-xs font-black uppercase tracking-widest">Configuration Updated Successfully!</span>
                        </div>
                    )}

                    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Bank Details Section */}
                        <div className="lg:col-span-2 space-y-10">
                            <div className="bg-white shadow-sm sm:rounded-[3rem] border border-gray-200 overflow-hidden">
                                <div className="p-10">
                                    <div className="flex items-center space-x-5 mb-10 pb-6 border-b border-gray-100">
                                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                            <BanknotesIcon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Banking Infrastructure</h3>
                                            <p className="text-xs text-gray-400 font-black uppercase tracking-widest mt-1">Direct transfer account management</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-10">
                                        {/* Mandiri */}
                                        <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-200 space-y-6 group hover:border-indigo-300 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl">Bank Mandiri Official</span>
                                                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black uppercase text-gray-900 tracking-widest">Account Number (Norek)</label>
                                                    <input
                                                        type="text"
                                                        value={data.bank_mandiri_norek}
                                                        onChange={e => setData('bank_mandiri_norek', e.target.value)}
                                                        className="w-full border-gray-200 rounded-2xl text-sm font-black p-5 focus:ring-indigo-600 focus:border-indigo-600 transition-all bg-white shadow-inner"
                                                        placeholder="0000 0000 0000"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black uppercase text-gray-900 tracking-widest">Account Holder (A/N)</label>
                                                    <input
                                                        type="text"
                                                        value={data.bank_mandiri_name}
                                                        onChange={e => setData('bank_mandiri_name', e.target.value)}
                                                        className="w-full border-gray-200 rounded-2xl text-sm font-black p-5 focus:ring-indigo-600 focus:border-indigo-600 transition-all bg-white shadow-inner"
                                                        placeholder="Master Cigars Coffee"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* BCA */}
                                        <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-200 space-y-6 group hover:border-blue-300 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">Bank BCA Official</span>
                                                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black uppercase text-gray-900 tracking-widest">Account Number (Norek)</label>
                                                    <input
                                                        type="text"
                                                        value={data.bank_bca_norek}
                                                        onChange={e => setData('bank_bca_norek', e.target.value)}
                                                        className="w-full border-gray-200 rounded-2xl text-sm font-black p-5 focus:ring-indigo-600 focus:border-indigo-600 transition-all bg-white shadow-inner"
                                                        placeholder="000 000 0000"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black uppercase text-gray-900 tracking-widest">Account Holder (A/N)</label>
                                                    <input
                                                        type="text"
                                                        value={data.bank_bca_name}
                                                        onChange={e => setData('bank_bca_name', e.target.value)}
                                                        className="w-full border-gray-200 rounded-2xl text-sm font-black p-5 focus:ring-indigo-600 focus:border-indigo-600 transition-all bg-white shadow-inner"
                                                        placeholder="Master Cigars Coffee"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Section */}
                            <div className="bg-white shadow-sm sm:rounded-[3rem] border border-gray-200 overflow-hidden">
                                <div className="p-10">
                                    <div className="flex items-center space-x-5 mb-10 pb-6 border-b border-gray-100">
                                        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                                            <ChatBubbleLeftRightIcon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Support Channels</h3>
                                            <p className="text-xs text-gray-400 font-black uppercase tracking-widest mt-1">Customer relationship integration</p>
                                        </div>
                                    </div>

                                    <div className="bg-green-50/50 p-8 rounded-[2rem] border border-green-100">
                                        <div className="max-w-md space-y-4">
                                            <label className="block text-[10px] font-black uppercase text-gray-600 tracking-widest">Primary WhatsApp Number</label>
                                            <div className="flex relative items-center">
                                                <div className="absolute left-6 text-green-600 font-black">+</div>
                                                <input
                                                    type="text"
                                                    value={data.whatsapp_admin}
                                                    onChange={e => setData('whatsapp_admin', e.target.value)}
                                                    placeholder="628123456789"
                                                    className="w-full border-gray-200 rounded-2xl text-base font-black p-5 pl-10 focus:ring-green-600 focus:border-green-600 shadow-sm"
                                                />
                                            </div>
                                            <div className="flex items-start space-x-3 mt-4">
                                                <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white shrink-0 mt-1">!</div>
                                                <p className="text-[11px] text-green-800 font-bold uppercase leading-relaxed tracking-tight">Use international format without '+' sign. Ex: 62812XXXXXX. Customers will be automatically directed to this endpoint.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* QRIS Section */}
                        <div className="space-y-10">
                            <div className="bg-white shadow-sm sm:rounded-[3rem] border border-gray-200 p-10 text-center sticky top-8">
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-purple-50 rounded-[2rem] flex items-center justify-center text-purple-600 mb-6 shadow-indigo-50 shadow-inner">
                                        <QrCodeIcon className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight mb-2">QRIS Universal</h3>
                                    <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] mb-10">Dynamic scan-to-pay artifact</p>

                                    <div className="relative group w-full mb-10">
                                        <input
                                            type="file"
                                            onChange={handleQrisChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            accept="image/*"
                                        />
                                        <div className={`
                                            border-4 border-dashed rounded-[3rem] p-6 flex flex-col items-center justify-center transition-all duration-500 min-h-[350px]
                                            ${qrisPreview ? 'border-indigo-100 bg-white shadow-2xl shadow-indigo-50 active:scale-95' : 'border-gray-100 bg-gray-50 translate-y-0'}
                                        `}>
                                            {qrisPreview ? (
                                                <div className="relative w-full aspect-square bg-white rounded-3xl overflow-hidden p-4 shadow-inner ring-8 ring-gray-50/50">
                                                    <img src={qrisPreview} className="w-full h-full object-contain" alt="QRIS Preview" />
                                                    <div className="absolute inset-0 bg-indigo-900/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <CloudArrowUpIcon className="w-16 h-16 text-white mb-2" />
                                                        <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Update QR Artifact</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center p-10">
                                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                                                        <PhotoIcon className="w-8 h-8 text-gray-300" />
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Select QRIS Image</span>
                                                    <p className="text-[9px] text-gray-400 font-bold mt-2 uppercase tracking-tighter">Clear high-res recommended</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`
                                            w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl transition-all duration-500 flex items-center justify-center space-x-3 active:scale-90
                                            ${processing ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none' : 'bg-gray-900 text-white hover:bg-black hover:-translate-y-2 shadow-gray-200'}
                                        `}
                                    >
                                        {processing ? (
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircleIcon className="w-5 h-5" />
                                                <span>Deploy Changes</span>
                                            </>
                                        )}
                                    </button>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-6">Secure encrypted communication active</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
