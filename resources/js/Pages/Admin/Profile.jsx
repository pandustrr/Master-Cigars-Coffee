import React, { useState } from 'react';
import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, useForm, usePage } from '@inertiajs/react';
import { 
    UserIcon, 
    LockClosedIcon, 
    CheckCircleIcon,
    ExclamationCircleIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
    const { auth } = usePage().props;
    const [status, setStatus] = useState(null);

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: auth.user.name,
        username: auth.user.username,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.profile.update'), {
            onSuccess: () => {
                setStatus('Profil berhasil diperbarui!');
                reset('password', 'password_confirmation');
                setTimeout(() => setStatus(null), 3000);
            },
        });
    };

    return (
        <SidebarAdmin header={<h2 className="font-black text-2xl text-gold uppercase tracking-tighter">Pengaturan Akun</h2>}>
            <Head title="Admin - Profil" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Success Message */}
                    {status && (
                        <div className="mb-6 bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center space-x-3 text-emerald-600 animate-fade-in">
                            <CheckCircleIcon className="w-5 h-5" />
                            <span className="text-xs font-black uppercase tracking-widest">{status}</span>
                        </div>
                    )}

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                                <ShieldCheckIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-800 uppercase tracking-tighter">Informasi Kredensial</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Ganti username atau kata sandi Anda secara berkala</p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                        <UserIcon className="w-3 h-3" />
                                        <span>Nama Lengkap</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl text-xs font-bold text-gray-800 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                                        placeholder="Masukkan nama..."
                                    />
                                    {errors.name && <div className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.name}</div>}
                                </div>

                                {/* Username Input */}
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                        <div className="text-[10px] sm:hidden">@</div>
                                        <span>Username</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.username}
                                        onChange={e => setData('username', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl text-xs font-bold text-gray-800 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                                        placeholder="Username unik..."
                                    />
                                    {errors.username && <div className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.username}</div>}
                                </div>
                            </div>

                            <div className="h-px bg-gray-50 w-full"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Password Input */}
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gold ml-1">
                                        <LockClosedIcon className="w-3 h-3" />
                                        <span>Password Baru</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl text-xs font-bold text-gray-800 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                    <p className="text-[9px] text-gray-400 font-bold uppercase ml-1">Kosongkan jika tidak ingin ganti password</p>
                                    {errors.password && <div className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.password}</div>}
                                </div>

                                {/* Confirm Password Input */}
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gold ml-1">
                                        <LockClosedIcon className="w-3 h-3" />
                                        <span>Konfirmasi Password Baru</span>
                                    </label>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl text-xs font-bold text-gray-800 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    disabled={processing}
                                    className="w-full bg-hitam-pekat text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all flex items-center justify-center space-x-3"
                                >
                                    {processing ? (
                                        <span>Menyimpan...</span>
                                    ) : (
                                        <>
                                            <ShieldCheckIcon className="w-4 h-4 text-gold" />
                                            <span>Simpan Perubahan Akun</span>
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-4 flex items-center justify-center space-x-2">
                                    <ExclamationCircleIcon className="w-3 h-3" />
                                    <span>Perubahan akan langsung diterapkan pada sesi berikutnya</span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </SidebarAdmin>
    );
}
