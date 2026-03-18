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

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Header Card */}


                    {recentlySuccessful && (
                        <div className="p-4 bg-gold rounded-xl flex items-center text-hitam-pekat shadow-2xl shadow-gold/20 animate-fade-in-down">
                            <CheckCircleIcon className="w-8 h-8 mr-3" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Assets Synchronized! Experience is now live.</span>
                        </div>
                    )}

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-3 p-2 bg-white rounded-3xl border border-gray-100 sticky top-20 z-30 overflow-x-auto no-scrollbar shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 relative overflow-hidden group/tab
                                    ${activeTab === tab.id
                                        ? 'bg-gold text-hitam-pekat shadow-sm'
                                        : 'bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                    }
                                `}
                            >
                                <tab.icon className={`w-4 h-4 transition-transform duration-300 ${activeTab === tab.id ? 'text-gold rotate-0' : 'text-gray-400 -rotate-12 group-hover/tab:rotate-0'}`} />
                                <span>{tab.name}</span>
                                {activeTab === tab.id && (
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/tab:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="bg-white shadow-sm rounded-3xl border border-gray-100 overflow-hidden">
                            <div className="p-6 md:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {assetsByTab[activeTab].map((item) => (
                                        <div key={item.key} className="space-y-6 group/asset">
                                            <div className="flex justify-between items-end px-4">
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] mb-2">{item.label}</label>
                                                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest italic">{item.desc}</p>
                                                </div>
                                                {previews[item.key] && (
                                                    <div className="flex items-center space-x-2 bg-green-50 px-4 py-1.5 rounded-full border border-green-200">
                                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                        <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.1em]">Synched</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="relative overflow-hidden rounded-2xl border border-gray-200 aspect-video bg-gray-50 flex flex-col items-center justify-center transition-all duration-1000 hover:border-gold group-hover/asset:scale-[1.02] shadow-sm hover:shadow-md">
                                                {previews[item.key] ? (
                                                    <div className="w-full h-full relative">
                                                        <img src={previews[item.key]} className="w-full h-full object-cover grayscale group-hover/asset:grayscale-0 group-hover/asset:scale-110 transition-all duration-1000" alt="" />
                                                        <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover/asset:opacity-100 flex flex-col items-center justify-center transition-all duration-700 backdrop-blur-md">
                                                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 border border-white/20 transform rotate-12 group-hover/asset:rotate-0 scale-50 group-hover/asset:scale-100 transition-all duration-700 shadow-xl">
                                                                <CloudArrowUpIcon className="w-8 h-8 text-white" />
                                                            </div>
                                                            <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] translate-y-4 group-hover/asset:translate-y-0 opacity-0 group-hover/asset:opacity-100 transition-all duration-700">Overwrite Protocol</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center space-y-4 group-hover/asset:scale-110 transition-transform duration-1000">
                                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-gray-200 shadow-sm group-hover/asset:bg-gray-50 transition-colors">
                                                            <PhotoIcon className="w-8 h-8 text-gray-300 group-hover/asset:text-gold transition-colors" />
                                                        </div>
                                                        <div className="text-center">
                                                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Initialize Matrix</span>
                                                            <p className="text-[10px] text-gray-300 font-bold uppercase mt-1 tracking-wider italic opacity-70">Upload HD Standard</p>
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

                            <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="text-center md:text-left">
                                    <h5 className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-1">Security Verification</h5>
                                    <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-xs">
                                        All assets are processed through the secure Master CMS cloud infrastructure. HD verification enabled.
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`
                                        group flex items-center space-x-4 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-sm hover:shadow-md transition-all duration-500 active:scale-95
                                        ${processing ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gold text-white hover:bg-gold-muda hover:-translate-y-1'}
                                    `}
                                >
                                    {processing ? (
                                        <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <SparklesIcon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-700" />
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
