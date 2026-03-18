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
                    <div className="bg-gradient-to-br from-coklat-kopi/40 via-hitam-pekat to-coklat-tua/40 p-12 rounded-[3.5rem] border border-gold/10 relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] group-hover:bg-gold/10 transition-all duration-1000"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cream-gold to-gold tracking-tighter italic uppercase mb-4">Elite Visual Command</h3>
                            <p className="text-cream-gold/40 text-[10px] font-black uppercase tracking-[0.4em] max-w-2xl leading-relaxed">
                                Curate the Master Cigars & Coffee aesthetic. Orchestrate brand assets and high-definition immersive visuals across the entire platform ecosystem.
                            </p>
                        </div>
                        <SwatchIcon className="w-80 h-80 absolute -right-20 -bottom-20 text-gold/5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                    </div>

                    {recentlySuccessful && (
                        <div className="p-4 bg-gold rounded-xl flex items-center text-hitam-pekat shadow-2xl shadow-gold/20 animate-fade-in-down">
                            <CheckCircleIcon className="w-8 h-8 mr-3" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Assets Synchronized! Experience is now live.</span>
                        </div>
                    )}

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-3 p-2 bg-hitam-pekat/60 rounded-3xl border border-gold/10 backdrop-blur-3xl sticky top-20 z-30 overflow-x-auto no-scrollbar shadow-2xl">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center space-x-3 px-8 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 relative overflow-hidden group/tab
                                    ${activeTab === tab.id
                                        ? 'bg-gold text-hitam-pekat shadow-[0_10px_30px_rgba(175,146,109,0.3)] scale-105 active:scale-95'
                                        : 'text-gold/30 hover:text-gold hover:bg-gold/5'
                                    }
                                `}
                            >
                                <tab.icon className={`w-5 h-5 transition-transform duration-500 ${activeTab === tab.id ? 'text-hitam-pekat rotate-0' : 'text-gold/20 -rotate-12 group-hover/tab:rotate-0'}`} />
                                <span>{tab.name}</span>
                                {activeTab === tab.id && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/tab:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="bg-coklat-kopi/5 shadow-[0_50px_100px_rgba(0,0,0,0.3)] rounded-[3rem] border border-gold/10 overflow-hidden backdrop-blur-3xl">
                            <div className="p-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                    {assetsByTab[activeTab].map((item) => (
                                        <div key={item.key} className="space-y-6 group/asset">
                                            <div className="flex justify-between items-end px-4">
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase text-gold tracking-[0.3em] mb-2">{item.label}</label>
                                                    <p className="text-[9px] text-cream-gold/20 font-black uppercase tracking-widest italic">{item.desc}</p>
                                                </div>
                                                {previews[item.key] && (
                                                    <div className="flex items-center space-x-2 bg-gold/10 px-4 py-1.5 rounded-full border border-gold/20 shadow-inner">
                                                        <div className="w-2 h-2 rounded-full bg-gold-muda animate-pulse" />
                                                        <span className="text-[9px] font-black text-gold-muda uppercase tracking-[0.1em]">Synched</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/10 aspect-video bg-hitam-pekat/90 flex flex-col items-center justify-center transition-all duration-1000 hover:border-gold hover:shadow-[0_20px_50px_rgba(175,146,109,0.15)] group-hover/asset:scale-[1.02] shadow-2xl">
                                                {previews[item.key] ? (
                                                    <div className="w-full h-full relative">
                                                        <img src={previews[item.key]} className="w-full h-full object-cover grayscale-[0.5] group-hover/asset:grayscale-0 group-hover/asset:scale-110 transition-all duration-[1500ms]" alt="" />
                                                        <div className="absolute inset-0 bg-hitam-pekat/80 opacity-0 group-hover/asset:opacity-100 flex flex-col items-center justify-center transition-all duration-700 backdrop-blur-xl">
                                                            <div className="w-20 h-20 bg-gold/10 rounded-3xl flex items-center justify-center mb-6 border border-gold/20 transform rotate-12 group-hover/asset:rotate-0 scale-50 group-hover/asset:scale-100 transition-all duration-700 shadow-2xl">
                                                                <CloudArrowUpIcon className="w-10 h-10 text-gold" />
                                                            </div>
                                                            <span className="text-gold text-[10px] font-black uppercase tracking-[0.5em] translate-y-8 group-hover/asset:translate-y-0 opacity-0 group-hover/asset:opacity-100 transition-all duration-700">Overwrite Protocol</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center space-y-6 group-hover/asset:scale-110 transition-transform duration-1000">
                                                        <div className="w-24 h-24 bg-gold/5 rounded-[3rem] flex items-center justify-center border border-gold/10 shadow-inner group-hover/asset:bg-gold/10 transition-colors">
                                                            <PhotoIcon className="w-12 h-12 text-gold/10 group-hover/asset:text-gold/20 transition-colors" />
                                                        </div>
                                                        <div className="text-center">
                                                            <span className="text-[12px] font-black text-gold/20 uppercase tracking-[0.4em]">Initialize Matrix</span>
                                                            <p className="text-[9px] text-cream-gold/10 font-black uppercase mt-3 tracking-widest italic opacity-50">Upload HQ Standard</p>
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

                            <div className="p-12 bg-hitam-pekat/60 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-8">
                                <div className="text-center md:text-left">
                                    <h5 className="text-gold/40 font-black uppercase text-[10px] tracking-[0.3em] mb-2">Security Verification</h5>
                                    <p className="text-[9px] text-cream-gold/10 font-black uppercase tracking-[0.2em] leading-relaxed max-w-xs">
                                        All assets are processed through the secure Master CMS cloud infrastructure. HD verification enabled.
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`
                                        group flex items-center space-x-6 px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-[0_20px_50px_rgba(175,146,109,0.2)] transition-all duration-[800ms] active:scale-95
                                        ${processing ? 'bg-gold/20 text-gold/40 cursor-not-allowed' : 'bg-gold text-hitam-pekat hover:bg-gold-muda hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(175,146,109,0.3)]'}
                                    `}
                                >
                                    {processing ? (
                                        <div className="w-6 h-6 border-4 border-hitam-pekat/20 border-t-hitam-pekat rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <SparklesIcon className="w-6 h-6 group-hover:rotate-[30deg] transition-transform duration-700" />
                                            <span>Synchronize {activeTab.toUpperCase()} Matrix</span>
                                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-4 transition-transform duration-700" />
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
