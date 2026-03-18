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

                    <div className="bg-gradient-to-br from-coklat-kopi/40 via-hitam-pekat/80 to-hitam-pekat p-12 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] text-gold flex justify-between items-center overflow-hidden relative border border-gold/10 group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] group-hover:bg-gold/10 transition-all duration-1000"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black tracking-tighter mb-4 italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-cream-gold to-gold">Neural Payment Nexus</h3>
                            <p className="text-cream-gold/40 text-[10px] font-black uppercase tracking-[0.4em] max-w-xl leading-relaxed">
                                Orchestrate the financial infrastructure. Global payment protocols and secure contact integration management.
                            </p>
                        </div>
                        <ShieldCheckIcon className="w-64 h-64 absolute -right-16 -bottom-16 text-gold/5 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
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
                            <div className="bg-coklat-kopi/5 shadow-[0_50px_100px_rgba(0,0,0,0.2)] rounded-[3rem] border border-gold/10 overflow-hidden backdrop-blur-3xl">
                                <div className="p-10">
                                    <div className="flex items-center space-x-8 mb-12 pb-8 border-b border-gold/10">
                                        <div className="w-20 h-20 bg-gold/5 rounded-3xl flex items-center justify-center text-gold shadow-inner border border-gold/10">
                                            <BanknotesIcon className="w-10 h-10" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-gold tracking-tighter italic uppercase">Financial Infrastructure</h3>
                                            <p className="text-[10px] text-cream-gold/20 font-black uppercase tracking-[0.3em] mt-2 italic leading-none">Account Matrix Authorization</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-8">
                                        <div className="p-8 bg-hitam-pekat/60 rounded-[2.5rem] border border-gold/10 space-y-6 group hover:border-gold hover:shadow-[0_20px_50px_rgba(175,146,109,0.1)] transition-all duration-700 shadow-2xl">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gold bg-gold/10 px-6 py-2.5 rounded-2xl border border-gold/20 shadow-inner">Mandiri Protocol 01</span>
                                                <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse shadow-[0_0_15px_rgba(175,146,109,0.8)]" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                <div className="space-y-3">
                                                    <label className="block text-[10px] font-black uppercase text-gold/40 tracking-[0.3em]">Account Serial</label>
                                                    <input
                                                        type="text"
                                                        value={data.bank_mandiri_norek}
                                                        onChange={e => setData('bank_mandiri_norek', e.target.value)}
                                                        className="w-full border-gold/10 rounded-2xl text-sm font-black p-5 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all bg-hitam-pekat/80 text-cream-gold placeholder-cream-gold/10 shadow-inner"
                                                        placeholder="0000 0000 0000"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="block text-[10px] font-black uppercase text-gold/40 tracking-[0.3em]">Signature (A/N)</label>
                                                    <input
                                                        type="text"
                                                        value={data.bank_mandiri_name}
                                                        onChange={e => setData('bank_mandiri_name', e.target.value)}
                                                        className="w-full border-gold/10 rounded-2xl text-sm font-black p-5 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all bg-hitam-pekat/80 text-cream-gold placeholder-cream-gold/10 shadow-inner"
                                                        placeholder="Master Cigars Coffee"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 bg-hitam-pekat/60 rounded-[2.5rem] border border-gold/10 space-y-6 group hover:border-gold hover:shadow-[0_20px_50px_rgba(175,146,109,0.1)] transition-all duration-700 shadow-2xl">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gold bg-gold/10 px-6 py-2.5 rounded-2xl border border-gold/20 shadow-inner">BCA Protocol 02</span>
                                                <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse shadow-[0_0_15px_rgba(175,146,109,0.8)]" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                <div className="space-y-3">
                                                    <label className="block text-[10px] font-black uppercase text-gold/40 tracking-[0.3em]">Account Serial</label>
                                                    <input
                                                        type="text"
                                                        value={data.bank_bca_norek}
                                                        onChange={e => setData('bank_bca_norek', e.target.value)}
                                                        className="w-full border-gold/10 rounded-2xl text-sm font-black p-5 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all bg-hitam-pekat/80 text-cream-gold placeholder-cream-gold/10 shadow-inner"
                                                        placeholder="000 000 0000"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="block text-[10px] font-black uppercase text-gold/40 tracking-[0.3em]">Signature (A/N)</label>
                                                    <input
                                                        type="text"
                                                        value={data.bank_bca_name}
                                                        onChange={e => setData('bank_bca_name', e.target.value)}
                                                        className="w-full border-gold/10 rounded-2xl text-sm font-black p-5 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all bg-hitam-pekat/80 text-cream-gold placeholder-cream-gold/10 shadow-inner"
                                                        placeholder="Master Cigars Coffee"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Section */}
                            <div className="bg-coklat-kopi/5 shadow-[0_50px_100px_rgba(0,0,0,0.2)] rounded-[3rem] border border-gold/10 overflow-hidden backdrop-blur-3xl">
                                <div className="p-10">
                                    <div className="flex items-center space-x-8 mb-12 pb-8 border-b border-gold/10">
                                        <div className="w-20 h-20 bg-gold/5 rounded-3xl flex items-center justify-center text-gold shadow-inner border border-gold/10">
                                            <ChatBubbleLeftRightIcon className="w-10 h-10" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-gold tracking-tighter italic uppercase">Relay Terminals</h3>
                                            <p className="text-[10px] text-cream-gold/20 font-black uppercase tracking-[0.3em] mt-2 italic leading-none">Global Direct Link Integration</p>
                                        </div>
                                    </div>

                                    <div className="bg-hitam-pekat/60 p-8 rounded-[2.5rem] border border-gold/10 shadow-2xl">
                                        <div className="max-w-md space-y-6">
                                            <label className="block text-[10px] font-black uppercase text-gold/40 tracking-[0.3em]">Master Command WhatsApp</label>
                                            <div className="flex relative items-center">
                                                <div className="absolute left-6 text-gold font-black text-lg">+</div>
                                                <input
                                                    type="text"
                                                    value={data.whatsapp_admin}
                                                    onChange={e => setData('whatsapp_admin', e.target.value)}
                                                    placeholder="628123456789"
                                                    className="w-full border-gold/10 rounded-2xl text-base font-black p-6 pl-12 focus:ring-2 focus:ring-gold/50 focus:border-gold shadow-inner bg-hitam-pekat text-cream-gold placeholder-cream-gold/10"
                                                />
                                            </div>
                                            <div className="flex items-start space-x-4 mt-6 p-4 bg-gold/5 rounded-2xl border border-gold/10 italic">
                                                <div className="w-6 h-6 bg-gold rounded-xl flex items-center justify-center text-hitam-pekat shrink-0 mt-0.5 font-black text-xs shadow-lg shadow-gold/20">!</div>
                                                <p className="text-[11px] text-gold/60 font-black uppercase leading-relaxed tracking-wider">Deploy International Format [ISO-8601]. Omit '+' prefix. Ex: 62812XXXXXX. Direct neural redirection active.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: QRIS */}
                        <div className="space-y-8">
                            <div className="bg-coklat-kopi/5 shadow-[0_50px_100px_rgba(0,0,0,0.3)] rounded-[3rem] border border-gold/10 p-10 text-center sticky top-24 backdrop-blur-3xl overflow-hidden group/qris">
                                <div className="absolute -top-24 -left-24 w-48 h-48 bg-gold/5 rounded-full blur-[50px] group-hover/qris:bg-gold/10 transition-colors"></div>
                                <div className="flex flex-col items-center relative z-10">
                                    <div className="w-24 h-24 bg-gold/5 rounded-[2.5rem] flex items-center justify-center text-gold mb-8 shadow-inner border border-gold/10 group-hover/qris:rotate-12 transition-transform duration-700">
                                        <QrCodeIcon className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-2xl font-black text-gold tracking-tighter mb-3 italic uppercase">Visual Auth QR</h3>
                                    <p className="text-[10px] text-cream-gold/20 font-black uppercase tracking-[0.3em] mb-12 italic leading-none">Dynamic Transaction Artifact</p>

                                    <div className="relative group w-full mb-12">
                                        <input
                                            type="file"
                                            onChange={handleQrisChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                            accept="image/*"
                                        />
                                        <div className={`
                                            border border-dashed rounded-[2.5rem] p-6 flex flex-col items-center justify-center transition-all duration-[1000ms] min-h-[350px] group-hover/qris:border-gold/40 shadow-2xl relative overflow-hidden
                                            ${qrisPreview ? 'border-gold/20 bg-hitam-pekat/80' : 'border-gold/10 bg-hitam-pekat/40'}
                                        `}>
                                            {qrisPreview ? (
                                                <div className="relative w-full aspect-square bg-white rounded-[2rem] overflow-hidden p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] ring-1 ring-gold/10 group-hover/qris:ring-gold/30 transition-all">
                                                    <img src={qrisPreview} className="w-full h-full object-contain grayscale-[0.2] group-hover/qris:grayscale-0 transition-all duration-1000" alt="QRIS Preview" />
                                                    <div className="absolute inset-0 bg-hitam-pekat/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-xl">
                                                        <CloudArrowUpIcon className="w-14 h-14 text-gold mb-4 animate-bounce" />
                                                        <span className="text-gold text-[10px] font-black uppercase tracking-[0.5em]">Reload Matrix</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center p-12 space-y-6">
                                                    <div className="w-20 h-20 bg-hitam-pekat rounded-3xl shadow-inner flex items-center justify-center border border-gold/10 group-hover:bg-gold/5 transition-colors">
                                                        <PhotoIcon className="w-10 h-10 text-gold/10 group-hover:text-gold/30 transition-colors" />
                                                    </div>
                                                    <div className="text-center">
                                                        <span className="text-[12px] font-black uppercase tracking-[0.4em] text-gold/20">Provision QR</span>
                                                        <p className="text-[9px] text-cream-gold/10 font-black mt-3 uppercase tracking-widest italic opacity-50">Vector Precision Required</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`
                                            w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-[800ms] flex items-center justify-center space-x-4 active:scale-95 shadow-[0_20px_50px_rgba(175,146,109,0.2)]
                                            ${processing ? 'bg-gold/20 text-gold/40 cursor-not-allowed' : 'bg-gold text-hitam-pekat hover:bg-gold-muda hover:-translate-y-3 hover:shadow-[0_40px_80px_rgba(175,146,109,0.3)]'}
                                        `}
                                    >
                                        {processing ? (
                                            <div className="w-6 h-6 border-4 border-hitam-pekat/20 border-t-hitam-pekat rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircleIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                                <span>Deploy Protocol</span>
                                            </>
                                        )}
                                    </button>
                                    <p className="text-[10px] text-gold/20 font-black uppercase tracking-widest mt-10 italic leading-none">Shield Encrypted Nexus Active</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </SidebarAdmin>
    );
}
