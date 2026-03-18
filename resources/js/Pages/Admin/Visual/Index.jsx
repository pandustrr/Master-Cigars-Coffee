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
        'site_logo', 'site_favicon', 'about_story_image', 'home_quote_bg', 'investment_context_bg'
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
        { id: 'global', name: 'Global Assets', icon: GlobeAltIcon },
        { id: 'home', name: 'Home Page', icon: HomeIcon },
        { id: 'about', name: 'About Page', icon: InformationCircleIcon },
        { id: 'investment', name: 'Investment', icon: CurrencyDollarIcon },
        { id: 'partners', name: 'Partners', icon: UserGroupIcon },
        { id: 'products', name: 'Products', icon: ShoppingBagIcon },
    ];

    const assetsByTab = {
        global: [
            { key: 'site_logo', label: 'Main Logo', desc: 'Used in navbar and footer' },
            { key: 'site_favicon', label: 'Favicon', desc: 'Browser tab icon' },
        ],
        home: [
            { key: 'hero_home', label: 'Hero Background', desc: 'Main home banner' },
            { key: 'home_quote_bg', label: 'Quote Section BG', desc: 'Background for the testimonial area' },
        ],
        about: [
            { key: 'hero_about', label: 'Hero Background', desc: 'About page banner' },
            { key: 'about_story_image', label: 'Story Image', desc: 'Featured image in history section' },
        ],
        investment: [
            { key: 'hero_investment', label: 'Hero Background', desc: 'Investment page banner' },
            { key: 'investment_context_bg', label: 'Context Section BG', desc: 'Background for ROI details' },
        ],
        partners: [
            { key: 'hero_partners', label: 'Hero Background', desc: 'Partners page banner' },
        ],
        products: [
            { key: 'hero_products', label: 'Hero Background', desc: 'Catalogue page banner' },
        ],
    };

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-2xl text-gold leading-tight tracking-tighter uppercase italic">Visual Command Center</h2>}
        >
            <Head title="Admin - Visual CMS" />

            <div className="py-8 bg-hitam-pekat min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Header Card */}
                    <div className="bg-gradient-to-br from-hitam-pekat via-coklat-pekat to-hitam p-8 rounded-2xl border border-gold/10 relative overflow-hidden shadow-2xl shadow-gold/5">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black text-gold tracking-tighter italic uppercase mb-2">Elite Visual Management</h3>
                            <p className="text-cream-gold/40 text-[10px] font-bold uppercase tracking-[0.2em] max-w-xl">
                                Curate every pixel of the Master Cigars & Coffee experience. Orchestrate brand assets and immersive visuals across the entire platform.
                            </p>
                        </div>
                        <SwatchIcon className="w-64 h-64 absolute -right-16 -bottom-16 text-gold/5 -rotate-12" />
                    </div>

                    {recentlySuccessful && (
                        <div className="p-4 bg-gold rounded-xl flex items-center text-hitam-pekat shadow-2xl shadow-gold/20 animate-fade-in-down">
                            <CheckCircleIcon className="w-8 h-8 mr-3" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Assets Synchronized! Experience is now live.</span>
                        </div>
                    )}

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-2 p-1.5 bg-hitam-pekat/50 rounded-xl border border-gold/5 backdrop-blur-xl sticky top-20 z-30 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center space-x-2.5 px-6 py-3 rounded-lg font-black uppercase tracking-widest text-[9px] transition-all duration-500
                                    ${activeTab === tab.id
                                        ? 'bg-gold text-hitam-pekat shadow-xl shadow-gold/20 scale-105'
                                        : 'text-gold/40 hover:text-gold hover:bg-gold/5'
                                    }
                                `}
                            >
                                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-hitam-pekat' : 'text-gold/30'}`} />
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="bg-coklat-kopi/5 shadow-2xl rounded-2xl border border-gold/5 overflow-hidden backdrop-blur-md">
                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {assetsByTab[activeTab].map((item) => (
                                        <div key={item.key} className="space-y-6 group">
                                            <div className="flex justify-between items-end px-4">
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase text-gold/60 tracking-[0.2em] mb-1">{item.label}</label>
                                                    <p className="text-[8px] text-cream-gold/20 font-bold uppercase tracking-widest">{item.desc}</p>
                                                </div>
                                                {previews[item.key] && (
                                                    <div className="flex items-center space-x-2 bg-gold/5 px-3 py-1 rounded-full border border-gold/10">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                                                        <span className="text-[8px] font-black text-gold uppercase tracking-tighter">Active</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="relative overflow-hidden rounded-2xl border-2 border-gold/5 aspect-video bg-hitam-pekat/80 flex flex-col items-center justify-center transition-all duration-700 hover:border-gold/40 hover:shadow-2xl hover:shadow-gold/10 group-hover:ring-4 ring-gold/5 ring-offset-8 ring-offset-hitam-pekat">
                                                {previews[item.key] ? (
                                                    <div className="w-full h-full relative">
                                                        <img src={previews[item.key]} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000" alt="" />
                                                        <div className="absolute inset-0 bg-hitam-pekat/90 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all duration-500 backdrop-blur-md">
                                                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4 border border-gold/20 scale-50 group-hover:scale-100 transition-transform duration-700">
                                                                <CloudArrowUpIcon className="w-8 h-8 text-gold" />
                                                            </div>
                                                            <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em] translate-y-4 group-hover:translate-y-0 transition-all duration-700">Overwrite Asset</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center space-y-4 group-hover:scale-110 transition-transform duration-700">
                                                        <div className="w-20 h-20 bg-gold/5 rounded-[2.5rem] flex items-center justify-center border border-gold/5 shadow-inner">
                                                            <PhotoIcon className="w-10 h-10 text-gold/10" />
                                                        </div>
                                                        <div className="text-center">
                                                            <span className="text-[11px] font-black text-gold/20 uppercase tracking-[0.3em]">Initialize Asset</span>
                                                            <p className="text-[9px] text-cream-gold/10 font-bold uppercase mt-2 tracking-tighter italic">High Definition Recommended</p>
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

                            <div className="p-8 bg-hitam-pekat/40 border-t border-gold/10 flex justify-between items-center">
                                <div className="hidden md:block">
                                    <p className="text-[10px] text-gold/20 font-black uppercase tracking-widest leading-relaxed">
                                        All assets are processed through the secure <br />Master CMS cloud infrastructure.
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`
                                        group flex items-center space-x-4 px-10 py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all duration-700 active:scale-90
                                        ${processing ? 'bg-gold/20 text-gold/40 cursor-not-allowed' : 'bg-gold text-hitam-pekat hover:bg-gold-muda hover:-translate-y-2 shadow-gold/20'}
                                    `}
                                >
                                    {processing ? (
                                        <div className="w-6 h-6 border-4 border-hitam-pekat/20 border-t-hitam-pekat rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <CheckCircleIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                            <span>Synchronize {activeTab.toUpperCase()}</span>
                                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
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
