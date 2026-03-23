import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import {
    UserGroupIcon,
    HandRaisedIcon,
    GlobeAsiaAustraliaIcon,
    BriefcaseIcon,
    ChatBubbleLeftEllipsisIcon,
    HandThumbUpIcon,
    AcademicCapIcon,
    BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { useState, useMemo } from 'react';

export default function Index({ partners, partnerCategories }) {
    const { settings, translations } = usePage().props;
    const [activeCategory, setActiveCategory] = useState('Semua');

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

    const categories = ['Semua', ...partnerCategories.map(c => c.name)];

    const filteredPartners = useMemo(() => {
        if (activeCategory === 'Semua') return partners;
        return partners.filter(p => p.category === activeCategory);
    }, [partners, activeCategory]);

    const heroImage = settings.hero_partners ? `/storage/${settings.hero_partners}` : '/images/hero.png';

    return (
        <MainLayout>
            <Head title={__('partners.head_title')} />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Ekosistem Mitra"
                        className="w-full h-full object-cover brightness-[0.4] grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-hitam-pekat via-hitam-pekat/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
                    <div className="inline-block px-4 py-1 border border-gold/30 rounded-full mb-6 backdrop-blur-md bg-gold/5 animate-pulse">
                        <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-black">{__('partners.hero.label')}</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4 italic">
                        {__('partners.hero.title')}
                    </h1>
                    <p className="text-cream-gold/60 uppercase tracking-[0.5em] text-[10px] font-bold">{__('partners.hero.sub')}</p>
                </div>
            </section>

            {/* Category Filter Section */}
            <section className="sticky top-20 z-40 bg-hitam-pekat/60 backdrop-blur-xl border-y border-gold/5 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-700 border ${activeCategory === cat
                                        ? 'bg-gold text-hitam-pekat border-gold shadow-[0_10px_35px_-5px_rgba(212,175,55,0.45)] scale-105'
                                        : 'bg-gold/5 text-gold/50 border-gold/20 hover:border-gold-muda hover:text-gold-muda hover:bg-gold/10 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                                    }`}
                            >
                                {cat === 'Semua' ? __('partners.all') : cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-linear-to-b from-hitam-pekat to-coklat-kopi/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPartners.length > 0 ? (
                            filteredPartners.map((item, idx) => (
                                <div key={idx} className="group relative bg-hitam-pekat/40 border border-gold/10 p-8 hover:border-gold/40 transition-all duration-700 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[80px] -mr-16 -mt-16 group-hover:bg-gold/10 transition-all duration-700"></div>

                                    <div className="relative z-10 space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className="w-20 h-20 bg-gold/5 border border-gold/10 rounded-2xl p-3 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
                                                {item.logo ? (
                                                    <img src={`/storage/${item.logo}`} className="w-full h-full object-contain" alt={item.name} />
                                                ) : (
                                                    <BuildingOfficeIcon className="w-8 h-8 text-gold/30" />
                                                )}
                                            </div>
                                            <span className="text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-gold/10 text-gold border border-gold/20 rounded-full">
                                                {item.category}
                                            </span>
                                        </div>

                                        <div>
                                            <h4 className="text-xl font-black text-gold uppercase tracking-tight mb-3 italic group-hover:text-gold-muda transition-colors">
                                                {item.name}
                                            </h4>
                                            <p className="text-cream-gold/40 text-[11px] leading-relaxed font-sans uppercase tracking-widest italic group-hover:text-cream-gold/60 transition-all duration-700">
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="pt-4 flex items-center justify-between border-t border-gold/5">
                                            <div className="flex items-center space-x-2 opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                                                <div className="w-8 h-0.5 bg-gold/50"></div>
                                                <span className="text-[8px] font-black text-gold uppercase tracking-widest">{__('partners.item.global')}</span>
                                            </div>
                                            {item.link && (
                                                <a 
                                                    href={item.link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-[9px] font-black text-gold uppercase tracking-widest px-4 py-2 bg-gold/5 border border-gold/20 rounded-lg hover:bg-gold hover:text-hitam-pekat transition-all transform hover:-translate-y-1"
                                                >
                                                    Visit Site
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <div className="inline-block p-6 rounded-full bg-gold/5 mb-6">
                                    <HandRaisedIcon className="w-12 h-12 text-gold/20" />
                                </div>
                                <h3 className="text-gold font-black uppercase tracking-widest">{__('partners.empty.title')}</h3>
                                <p className="text-cream-gold/30 text-xs mt-2">{__('partners.empty.desc')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Collaboration Form CTA */}
            <section className="py-40 bg-hitam-pekat relative overflow-hidden border-t border-gold-tua/10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-coklat-kopi/5 blur-[120px] rounded-full"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="flex justify-center mb-10">
                        <ChatBubbleLeftEllipsisIcon className="w-16 h-16 text-gold/20 stroke-1" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-gold uppercase tracking-tighter mb-8 italic">{__('partners.cta.title')}</h2>
                    <p className="text-cream-gold/60 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                        {__('partners.cta.desc')}
                    </p>
                    <button className="group relative px-12 py-5 bg-transparent overflow-hidden">
                        <div className="absolute inset-0 border border-gold group-hover:bg-gold transition-all duration-500"></div>
                        <span className="relative z-10 text-gold group-hover:text-hitam-pekat font-black uppercase tracking-[0.3em] text-sm transition-colors duration-500">{__('partners.cta.btn')}</span>
                    </button>
                </div>
                {/* Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold opacity-[0.03] blur-[150px] rounded-full"></div>
            </section>
        </MainLayout>
    );
}
