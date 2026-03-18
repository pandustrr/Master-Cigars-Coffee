import SidebarAdmin from '@/Layouts/SidebarAdmin';
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
        <SidebarAdmin
            header={<h2 className="font-black text-2xl text-gold leading-tight tracking-tighter uppercase italic">System Configuration</h2>}
        >
            <Head title="Admin - Settings" />

            <div className="py-8 bg-hitam-pekat min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="bg-gradient-to-r from-hitam-pekat to-coklat-kopi p-6 rounded-2xl shadow-2xl shadow-gold/5 text-gold flex justify-between items-center overflow-hidden relative border border-gold/10">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black tracking-tighter mb-2 italic uppercase">Payment Control Center</h3>
                            <p className="text-cream-gold/60 text-xs font-bold uppercase tracking-[0.2em] opacity-80">Global payment settings and contact integration</p>
                        </div>
                        <ShieldCheckIcon className="w-32 h-32 absolute -right-8 -bottom-8 text-gold/5 rotate-12" />
                    </div>

                    {recentlySuccessful && (
                        <div className="p-5 bg-gold rounded-2xl flex items-center text-hitam-pekat shadow-xl shadow-gold/5 animate-bounce">
                            <CheckCircleIcon className="w-6 h-6 mr-3" />
                            <span className="text-xs font-black uppercase tracking-widest">Configuration Updated Successfully!</span>
                        </div>
                    )}

                    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Left Column: Bank & WhatsApp */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Banking Section */}
                            <div className="bg-coklat-kopi/5 shadow-sm rounded-2xl border border-gold/5 overflow-hidden backdrop-blur-sm">
                                <div className="p-8">
                                    <div className="flex items-center space-x-5 mb-10 pb-6 border-b border-gold/5">
                                        <div className="w-16 h-16 bg-gold/5 rounded-2xl flex items-center justify-center text-gold">
                                            <BanknotesIcon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gold tracking-tight italic uppercase">Banking Infrastructure</h3>
                                            <p className="text-[10px] text-cream-gold/20 font-black uppercase tracking-widest mt-1">Direct transfer account management</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="p-6 bg-hitam-pekat/50 rounded-2xl border border-gold/10 space-y-4 group hover:border-gold/30 hover:bg-hitam-pekat transition-all duration-300 shadow-sm hover:shadow-xl">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black uppercase tracking-[0.3em] text-gold bg-gold/5 px-4 py-2 rounded-xl">Bank Mandiri Official</span>
                                                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black uppercase text-gold/40 tracking-widest">Account Number (Norek)</label>
                                                    <input
                                                        type="text"
                                                        value={data.bank_mandiri_norek}
                                                        onChange={e => setData('bank_mandiri_norek', e.target.value)}
                                                        className="w-full border-gold/10 rounded-2xl text-sm font-black p-5 focus:ring-gold focus:border-gold transition-all bg-hitam-pekat/50 text-cream-gold placeholder-cream-gold/20 shadow-inner"
                                                        placeholder="0000 0000 0000"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black uppercase text-gold/40 tracking-widest">Account Holder (A/N)</label>
                                                    <input
                                                        type="text"
                                                        value={data.bank_mandiri_name}
                                                        onChange={e => setData('bank_mandiri_name', e.target.value)}
                                                        className="w-full border-gold/10 rounded-2xl text-sm font-black p-5 focus:ring-gold focus:border-gold transition-all bg-hitam-pekat/50 text-cream-gold placeholder-cream-gold/20 shadow-inner"
                                                        placeholder="Master Cigars Coffee"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-hitam-pekat/50 rounded-2xl border border-gold/10 space-y-4 group hover:border-gold/30 hover:bg-hitam-pekat transition-all duration-300 shadow-sm hover:shadow-xl">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-black uppercase tracking-[0.3em] text-gold bg-gold/5 px-4 py-2 rounded-xl">Bank BCA Official</span>
                                                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black uppercase text-gold/40 tracking-widest">Account Number (Norek)</label>
                                                    <input
                                                        type="text"
                                                        value={data.bank_bca_norek}
                                                        onChange={e => setData('bank_bca_norek', e.target.value)}
                                                        className="w-full border-gold/10 rounded-2xl text-sm font-black p-5 focus:ring-gold focus:border-gold transition-all bg-hitam-pekat/50 text-cream-gold placeholder-cream-gold/20 shadow-inner"
                                                        placeholder="000 000 0000"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black uppercase text-gold/40 tracking-widest">Account Holder (A/N)</label>
                                                    <input
                                                        type="text"
                                                        value={data.bank_bca_name}
                                                        onChange={e => setData('bank_bca_name', e.target.value)}
                                                        className="w-full border-gold/10 rounded-2xl text-sm font-black p-5 focus:ring-gold focus:border-gold transition-all bg-hitam-pekat/50 text-cream-gold placeholder-cream-gold/20 shadow-inner"
                                                        placeholder="Master Cigars Coffee"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Section */}
                            <div className="bg-coklat-kopi/10 shadow-sm rounded-2xl border border-gold/10 overflow-hidden">
                                <div className="p-8">
                                    <div className="flex items-center space-x-5 mb-10 pb-6 border-b border-gold/5">
                                        <div className="w-16 h-16 bg-gold/5 rounded-2xl flex items-center justify-center text-gold">
                                            <ChatBubbleLeftRightIcon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gold tracking-tight italic uppercase">Support Channels</h3>
                                            <p className="text-xs text-cream-gold/20 font-black uppercase tracking-widest mt-1">Customer relationship integration</p>
                                        </div>
                                    </div>

                                    <div className="bg-gold/5 p-6 rounded-2xl border border-gold/10">
                                        <div className="max-w-md space-y-4">
                                            <label className="block text-[10px] font-black uppercase text-gold/60 tracking-widest">Primary WhatsApp Number</label>
                                            <div className="flex relative items-center">
                                                <div className="absolute left-6 text-gold font-black">+</div>
                                                <input
                                                    type="text"
                                                    value={data.whatsapp_admin}
                                                    onChange={e => setData('whatsapp_admin', e.target.value)}
                                                    placeholder="628123456789"
                                                    className="w-full border-gold/10 rounded-2xl text-base font-black p-5 pl-10 focus:ring-gold focus:border-gold shadow-sm bg-hitam-pekat/50 text-cream-gold"
                                                />
                                            </div>
                                            <div className="flex items-start space-x-3 mt-4">
                                                <div className="w-5 h-5 bg-gold rounded-full flex items-center justify-center text-hitam-pekat shrink-0 mt-1 font-black">!</div>
                                                <p className="text-[11px] text-gold/80 font-bold uppercase leading-relaxed tracking-tight">Use international format without '+' sign. Ex: 62812XXXXXX. Customers will be automatically directed to this endpoint.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: QRIS */}
                        <div className="space-y-6">
                            <div className="bg-coklat-kopi/5 shadow-sm rounded-2xl border border-gold/5 p-8 text-center sticky top-8 backdrop-blur-sm">
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-gold/5 rounded-[2rem] flex items-center justify-center text-gold mb-6 shadow-inner border border-gold/10">
                                        <QrCodeIcon className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-xl font-black text-gold tracking-tight mb-2 italic uppercase">QRIS Universal</h3>
                                    <p className="text-[11px] text-cream-gold/20 font-black uppercase tracking-[0.2em] mb-10">Dynamic scan-to-pay artifact</p>

                                    <div className="relative group w-full mb-10">
                                        <input
                                            type="file"
                                            onChange={handleQrisChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            accept="image/*"
                                        />
                                        <div className={`
                                            border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-500 min-h-[300px]
                                            ${qrisPreview ? 'border-gold/20 bg-hitam-pekat/50 shadow-2xl shadow-gold/5 active:scale-95' : 'border-gold/5 bg-hitam-pekat/20 translate-y-0'}
                                        `}>
                                            {qrisPreview ? (
                                                <div className="relative w-full aspect-square bg-white rounded-3xl overflow-hidden p-4 shadow-inner ring-8 ring-gold/5">
                                                    <img src={qrisPreview} className="w-full h-full object-contain" alt="QRIS Preview" />
                                                    <div className="absolute inset-0 bg-hitam-pekat/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <CloudArrowUpIcon className="w-16 h-16 text-gold mb-2" />
                                                        <span className="text-gold text-[10px] font-black uppercase tracking-[0.3em]">Update QR Artifact</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center p-10">
                                                    <div className="w-16 h-16 bg-hitam-pekat rounded-2xl shadow-sm flex items-center justify-center mb-4 border border-gold/10">
                                                        <PhotoIcon className="w-8 h-8 text-gold/20" />
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-gold">Select QRIS Image</span>
                                                    <p className="text-[9px] text-cream-gold/20 font-bold mt-2 uppercase tracking-tighter">Clear high-res recommended</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`
                                            w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all duration-500 flex items-center justify-center space-x-3 active:scale-90
                                            ${processing ? 'bg-gold/20 text-gold/40 cursor-not-allowed shadow-none' : 'bg-gold text-hitam-pekat hover:bg-gold-muda hover:-translate-y-1 shadow-gold/5'}
                                        `}
                                    >
                                        {processing ? (
                                            <div className="w-5 h-5 border-2 border-hitam-pekat/20 border-t-hitam-pekat rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircleIcon className="w-5 h-5" />
                                                <span>Deploy Changes</span>
                                            </>
                                        )}
                                    </button>
                                    <p className="text-[10px] text-gold/20 font-black uppercase tracking-widest mt-6">Secure encrypted communication active</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </SidebarAdmin>
    );
}
