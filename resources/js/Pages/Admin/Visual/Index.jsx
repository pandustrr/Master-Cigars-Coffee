import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, usePage, useForm } from '@inertiajs/react';
import {
    PhotoIcon,
    CloudArrowUpIcon,
    CheckCircleIcon,
    SparklesIcon,
    ArrowRightIcon,
    SwatchIcon,
    GlobeAltIcon,
    HomeIcon,
    InformationCircleIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Index({ settings }) {
    const [activeTab, setActiveTab] = useState('global');

    const imageKeys = [
        'hero_home', 'hero_about', 'hero_investment', 'hero_partners', 'hero_products',
        'site_logo', 'about_story_image', 'home_quote_bg', 'investment_context_bg'
    ];

    const initialData = {};
    imageKeys.forEach(key => initialData[key] = null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm(initialData);

    const initialPreviews = {};
    imageKeys.forEach(key => initialPreviews[key] = settings[key] ? `/storage/${settings[key]}` : null);
    const [previews, setPreviews] = useState(initialPreviews);

    const handleHeroChange = (e, key) => {
        const file = e.target.files[0];
        setData(key, file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [key]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.visual.update'), {
            forceFormData: true,
        });
    };

    const tabs = [
        { id: 'global', name: 'Aset Global', icon: GlobeAltIcon },
        { id: 'home', name: 'Halaman Utama', icon: HomeIcon },
        { id: 'about', name: 'Tentang Kami', icon: InformationCircleIcon },
        { id: 'investment', name: 'Investasi', icon: CurrencyDollarIcon },
        { id: 'partners', name: 'Mitra', icon: UserGroupIcon },
        { id: 'products', name: 'Produk', icon: ShoppingBagIcon },
    ];

    const assetsByTab = {
        global: [
            { key: 'site_logo', label: 'Logo Utama', desc: 'Muncul di navigasi & footer' },
        ],
        home: [
            { key: 'hero_home', label: 'Latar Belakang Hero', desc: 'Banner utama halaman depan' },
            { key: 'home_quote_bg', label: 'BG Bagian Quote', desc: 'Latar belakang area testimoni' },
        ],
        about: [
            { key: 'hero_about', label: 'Latar Belakang Hero', desc: 'Banner halaman tentang' },
            { key: 'about_story_image', label: 'Gambar Sejarah', desc: 'Gambar utama di bagian sejarah' },
        ],
        investment: [
            { key: 'hero_investment', label: 'Latar Belakang Hero', desc: 'Banner halaman investasi' },
            { key: 'investment_context_bg', label: 'BG Bagian Konteks', desc: 'Latar belakang detail ROI' },
        ],
        partners: [
            { key: 'hero_partners', label: 'Latar Belakang Hero', desc: 'Banner halaman mitra' },
        ],
        products: [
            { key: 'hero_products', label: 'Latar Belakang Hero', desc: 'Banner halaman Marketplace' },
        ],
    };

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-xl text-gold leading-tight tracking-tight uppercase italic">Pusat Visual</h2>}
        >
            <Head title="Admin - Kelola Visual" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">

                    {recentlySuccessful && (
                        <div className="p-3 bg-gold rounded-xl flex items-center text-hitam-pekat shadow-lg shadow-gold/10 animate-fade-in-down border border-white/20">
                            <CheckCircleIcon className="w-5 h-5 mr-3" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Aset Visual Berhasil Diperbarui! Tampilan website kini telah diperbarui secara langsung.</span>
                        </div>
                    )}

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-gray-100 sticky top-20 z-30 overflow-x-auto no-scrollbar shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center space-x-2 px-4 py-2 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all duration-300 relative overflow-hidden group/tab
                                    ${activeTab === tab.id
                                        ? 'bg-gold text-hitam-pekat shadow-sm'
                                        : 'bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                    }
                                `}
                            >
                                <tab.icon className={`w-3.5 h-3.5 transition-transform duration-300 ${activeTab === tab.id ? 'text-hitam-pekat scale-110' : 'text-gray-400 group-hover/tab:scale-110'}`} />
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                            <div className="p-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {assetsByTab[activeTab].map((item) => (
                                        <div key={item.key} className="space-y-4 group/asset">
                                            <div className="flex justify-between items-end px-2">
                                                <div>
                                                    <label className="block text-[9px] font-black uppercase text-gray-500 tracking-widest mb-1">{item.label}</label>
                                                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest italic opacity-70 leading-none">{item.desc}</p>
                                                </div>
                                                {previews[item.key] && (
                                                    <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full border border-green-100 bg-green-50/50">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                        <span className="text-[7px] font-black text-green-600 uppercase">Aktif</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="relative overflow-hidden rounded-xl border border-gray-100 aspect-video bg-gray-50/50 flex flex-col items-center justify-center transition-all duration-500 hover:border-gold shadow-sm">
                                                {previews[item.key] ? (
                                                    <div className="w-full h-full relative group">
                                                        <img src={previews[item.key]} className="w-full h-full object-cover transition-all duration-1000" alt="" />
                                                        <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-500 backdrop-blur-sm">
                                                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-2 border border-white/20 transform scale-50 group-hover:scale-100 transition-all duration-500 shadow-xl">
                                                                <CloudArrowUpIcon className="w-5 h-5 text-white" />
                                                            </div>
                                                            <span className="text-white text-[8px] font-black uppercase tracking-widest">Ganti Gambar</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center space-y-2 opacity-40 group-hover/asset:opacity-100 transition-opacity">
                                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200">
                                                            <PhotoIcon className="w-5 h-5 text-gray-300 group-hover/asset:text-gold transition-colors" />
                                                        </div>
                                                        <div className="text-center">
                                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none block">Belum Ada Gambar</span>
                                                            <p className="text-[7px] text-gray-300 font-bold uppercase mt-1">Klik Untuk Unggah</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleHeroChange(e, item.key)}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                    accept="image/*"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`
                                        group flex items-center space-x-3 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[9px] shadow-md transition-all duration-500 active:scale-95
                                        ${processing ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-hitam-pekat text-white hover:bg-gold hover:text-hitam-pekat'}
                                    `}
                                >
                                    {processing ? (
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Simpan Perubahan Visual</span>
                                            <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </SidebarAdmin>
    );
}
