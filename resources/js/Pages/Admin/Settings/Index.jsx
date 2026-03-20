import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, useForm, usePage } from '@inertiajs/react';
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

export default function Index({ settings, auth }) {
    const { user } = auth;

    // Site Settings Form
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        bank_accounts: settings.bank_accounts || [],
        whatsapp_admin: settings.whatsapp_admin || '',
        qris_image: null,
    });

    // Profile Settings Form
    const {
        data: profileData,
        setData: setProfileData,
        post: postProfile,
        processing: profileProcessing,
        errors: profileErrors,
        recentlySuccessful: profileRecentlySuccessful
    } = useForm({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
    });

    // Password Settings Form
    const {
        data: passwordData,
        setData: setPasswordData,
        post: postPassword,
        processing: passwordProcessing,
        errors: passwordErrors,
        recentlySuccessful: passwordRecentlySuccessful,
        reset: resetPassword
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const addBank = () => {
        setData('bank_accounts', [...data.bank_accounts, { bank: '', norek: '', name: '' }]);
    };

    const updateBank = (index, field, value) => {
        const newBanks = [...data.bank_accounts];
        newBanks[index][field] = value;
        setData('bank_accounts', newBanks);
    };

    const removeBank = (index) => {
        const newBanks = data.bank_accounts.filter((_, i) => i !== index);
        setData('bank_accounts', newBanks);
    };

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

    const submitProfile = (e) => {
        e.preventDefault();
        postProfile(route('admin.account.profile.update'));
    };

    const submitPassword = (e) => {
        e.preventDefault();
        postPassword(route('admin.account.password.update'), {
            onSuccess: () => resetPassword(),
        });
    };

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-2xl text-gold leading-tight tracking-tighter uppercase">Pengaturan Sistem</h2>}
        >
            <Head title="Admin - Settings" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* 
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm text-gray-800 flex justify-between items-center overflow-hidden relative border border-gray-100 group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full blur-[80px] group-hover:bg-gray-100 transition-all duration-1000"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 uppercase text-gray-800">Neural Payment Nexus</h3>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest max-w-xl leading-relaxed">
                                Orchestrate the financial infrastructure. Global payment protocols and secure contact integration management.
                            </p>
                        </div>
                        <ShieldCheckIcon className="w-56 h-56 absolute -right-10 -bottom-10 text-gray-50 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                    </div> */}


                    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Left Column: Bank & WhatsApp */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Banking Section */}
                            <div className="bg-white shadow-sm rounded-3xl border border-gray-100 overflow-hidden">
                                <div className="p-8">
                                    <div className="flex items-center space-x-6 mb-8 pb-6 border-b border-gray-100">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gold border border-gray-200">
                                            <BanknotesIcon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-800 tracking-tight uppercase">Informasi Rekening Bank</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1 leading-none">Kelola rekening untuk pembayaran</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6">
                                        {data.bank_accounts.map((acc, index) => (
                                            <div key={index} className="p-6 bg-gray-50/50 rounded-2xl border border-gray-200 space-y-5 group hover:border-gold hover:shadow-md transition-all duration-500 shadow-sm relative">
                                                <div className="flex items-center justify-between">
                                                    <input
                                                        type="text"
                                                        value={acc.bank}
                                                        onChange={e => updateBank(index, 'bank', e.target.value)}
                                                        placeholder="NAMA BANK (Misal: BANK MANDIRI)"
                                                        className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-4 py-2 rounded-xl border border-gold/30 focus:ring-2 focus:ring-gold/50 focus:border-gold min-w-[200px] placeholder-gold/50"
                                                    />
                                                    <button type="button" onClick={() => removeBank(index)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-red-100 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors shadow-sm">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider">Nomor Rekening</label>
                                                        <input
                                                            type="text"
                                                            value={acc.norek}
                                                            onChange={e => updateBank(index, 'norek', e.target.value)}
                                                            className="w-full border-gray-300 rounded-xl text-sm font-bold p-3 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all bg-white text-gray-800 shadow-sm"
                                                            placeholder="000 000 0000"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-[10px] font-bold uppercase text-gray-500 tracking-wider">Atas Nama (A/N)</label>
                                                        <input
                                                            type="text"
                                                            value={acc.name}
                                                            onChange={e => updateBank(index, 'name', e.target.value)}
                                                            className="w-full border-gray-300 rounded-xl text-sm font-bold p-3 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all bg-white text-gray-800 shadow-sm"
                                                            placeholder="Master Cigars Coffee"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={addBank}
                                            className="w-full py-5 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center space-x-2 text-gray-500 font-bold uppercase tracking-widest text-[10px] hover:border-gold hover:text-gold hover:bg-gold/5 transition-all"
                                        >
                                            <span className="text-lg font-normal">+</span>
                                            <span>Tambah Rekening Bank</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Section */}
                            <div className="bg-white shadow-sm rounded-3xl border border-gray-100 overflow-hidden">
                                <div className="p-8">
                                    <div className="flex items-center space-x-6 mb-8 pb-6 border-b border-gray-100">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gold border border-gray-200">
                                            <ChatBubbleLeftRightIcon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-800 tracking-tight uppercase">Kontak & WhatsApp</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1 leading-none">Nomor WhatsApp Admin</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="max-w-md space-y-4">
                                            <label className="block text-[10px] font-bold uppercase text-gray-400 tracking-wider">Nomor WhatsApp Utama</label>
                                            <div className="flex relative items-center">
                                                <div className="absolute left-4 text-gold font-black text-base">+</div>
                                                <input
                                                    type="text"
                                                    value={data.whatsapp_admin}
                                                    onChange={e => setData('whatsapp_admin', e.target.value)}
                                                    placeholder="628123456789"
                                                    className="w-full border-gray-300 rounded-xl text-sm font-bold p-3 pl-10 focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white text-gray-800 shadow-sm transition-all"
                                                />
                                            </div>
                                            <div className="flex items-start space-x-3 mt-4 p-3 bg-gray-100 rounded-xl border border-gray-200">
                                                <div className="w-5 h-5 bg-gold rounded-full flex items-center justify-center text-white shrink-0 mt-0.5 font-bold text-[10px] shadow-sm">!</div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase leading-relaxed">Gunakan kode negara tanpa awalan '+'. Contoh: 62812XXXXXX.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Admin Account Section */}
                            <div className="bg-white shadow-sm rounded-3xl border border-gray-100 overflow-hidden">
                                <div className="p-8">
                                    <div className="flex items-center space-x-6 mb-8 pb-6 border-b border-gray-100">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gold border border-gray-200">
                                            <ShieldCheckIcon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-800 tracking-tight uppercase">Pengaturan Akun Admin</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1 leading-none">Ubah username dan password login</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        {/* Profile Form */}
                                        <div className="space-y-6">
                                            <form onSubmit={submitProfile} className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-[11px] font-black uppercase text-gold tracking-widest">Informasi Profil</h4>
                                                </div>

                                                <div className="space-y-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                                                    <div className="space-y-1.5">
                                                        <label className="block text-[9px] font-black uppercase text-gray-400 tracking-widest">Username Admin</label>
                                                        <input
                                                            type="text"
                                                            value={profileData.username}
                                                            onChange={e => setProfileData('username', e.target.value)}
                                                            className="w-full border-gray-200 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all"
                                                            required
                                                        />
                                                        {profileErrors.username && <div className="text-[9px] text-red-500 font-bold uppercase mt-1">{profileErrors.username}</div>}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="block text-[9px] font-black uppercase text-gray-400 tracking-widest">Nama Lengkap</label>
                                                        <input
                                                            type="text"
                                                            value={profileData.name}
                                                            onChange={e => setProfileData('name', e.target.value)}
                                                            className="w-full border-gray-200 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all"
                                                            required
                                                        />
                                                        {profileErrors.name && <div className="text-[9px] text-red-500 font-bold uppercase mt-1">{profileErrors.name}</div>}
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={profileProcessing}
                                                        className="w-full py-3 bg-gray-900 text-white text-[9px] font-black rounded-xl uppercase tracking-widest hover:bg-gray-800 transition-all shadow-md mt-2"
                                                    >
                                                        Simpan Profil
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        {/* Password Form */}
                                        <div className="space-y-6">
                                            <form onSubmit={submitPassword} className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="text-[11px] font-black uppercase text-gold tracking-widest">Keamanan & Password</h4>
                                                </div>

                                                <div className="space-y-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                                                    <div className="space-y-1.5">
                                                        <label className="block text-[9px] font-black uppercase text-gray-400 tracking-widest">Password Saat Ini</label>
                                                        <input
                                                            type="password"
                                                            value={passwordData.current_password}
                                                            onChange={e => setPasswordData('current_password', e.target.value)}
                                                            className="w-full border-gray-200 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all"
                                                        />
                                                        {passwordErrors.current_password && <div className="text-[9px] text-red-500 font-bold uppercase mt-1">{passwordErrors.current_password}</div>}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="block text-[9px] font-black uppercase text-gray-400 tracking-widest">Password Baru</label>
                                                        <input
                                                            type="password"
                                                            value={passwordData.password}
                                                            onChange={e => setPasswordData('password', e.target.value)}
                                                            className="w-full border-gray-200 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all"
                                                        />
                                                        {passwordErrors.password && <div className="text-[9px] text-red-500 font-bold uppercase mt-1">{passwordErrors.password}</div>}
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="block text-[9px] font-black uppercase text-gray-400 tracking-widest">Konfirmasi Password Baru</label>
                                                        <input
                                                            type="password"
                                                            value={passwordData.password_confirmation}
                                                            onChange={e => setPasswordData('password_confirmation', e.target.value)}
                                                            className="w-full border-gray-200 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all"
                                                        />
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={passwordProcessing}
                                                        className="w-full py-3 bg-gold text-white text-[9px] font-black rounded-xl uppercase tracking-widest hover:bg-gold-muda transition-all shadow-md mt-2"
                                                    >
                                                        Ubah Password
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: QRIS */}
                        <div className="space-y-6">
                            <div className="bg-white shadow-sm rounded-3xl border border-gray-100 p-8 text-center sticky top-20 overflow-hidden group/qris">
                                <div className="absolute -top-16 -left-16 w-32 h-32 bg-gray-50 rounded-full blur-[40px] group-hover/qris:bg-gray-100 transition-colors"></div>
                                <div className="flex flex-col items-center relative z-10">
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gold mb-6 border border-gray-200 group-hover/qris:rotate-12 transition-transform duration-500">
                                        <QrCodeIcon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-800 tracking-tight mb-2 uppercase">QRIS Pembayaran</h3>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-8 leading-none">Gambar Barcode QRIS</p>

                                    <div className="relative group w-full mb-8">
                                        <input
                                            type="file"
                                            onChange={handleQrisChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                            accept="image/*"
                                        />
                                        <div className={`
                                            border border-dashed rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-700 min-h-[250px] shadow-sm relative overflow-hidden
                                            ${qrisPreview ? 'border-gray-200 bg-gray-50/80' : 'border-gray-300 bg-gray-50'}
                                        `}>
                                            {qrisPreview ? (
                                                <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden p-4 shadow-sm ring-1 ring-gray-200 group-hover/qris:ring-gold/30 transition-all">
                                                    <img src={qrisPreview} className="w-full h-full object-contain grayscale-[0.2] group-hover/qris:grayscale-0 transition-all duration-700" alt="QRIS Preview" />
                                                    <div className="absolute inset-0 bg-gray-900/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-md">
                                                        <CloudArrowUpIcon className="w-10 h-10 text-white mb-2 animate-bounce" />
                                                        <span className="text-white text-[10px] font-bold uppercase tracking-wider">Ganti QRIS</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center p-8 space-y-4">
                                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-gray-200 group-hover:border-gray-300 transition-colors">
                                                        <PhotoIcon className="w-8 h-8 text-gray-300 group-hover:text-gold transition-colors" />
                                                    </div>
                                                    <div className="text-center">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Unggah QRIS</span>
                                                        <p className="text-[9px] text-gray-300 font-bold mt-2 uppercase tracking-widest opacity-70">Format gambar (.jpg, .png)</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`
                                            w-full py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-500 flex items-center justify-center space-x-3 active:scale-95 shadow-sm
                                            ${processing ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gold text-white hover:bg-gold-muda hover:-translate-y-1 hover:shadow-md'}
                                        `}
                                    >
                                        {processing ? (
                                            <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <CheckCircleIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                                <span>Simpan Perubahan</span>
                                            </>
                                        )}
                                    </button>
                                    <p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest mt-6 leading-none">Semua data diamankan sistem</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </SidebarAdmin>
    );
}
