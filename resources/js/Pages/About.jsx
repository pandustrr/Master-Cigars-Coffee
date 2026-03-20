import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import {
    ClockIcon,
    ShieldCheckIcon,
    SparklesIcon,
    GlobeAltIcon,
    ArrowRightIcon,
    EyeIcon,
    RocketLaunchIcon,
    TrophyIcon
} from '@heroicons/react/24/outline';

export default function About() {
    const { settings, translations } = usePage().props;
    const heroImage = settings.hero_about ? `/storage/${settings.hero_about}` : '/images/hero.png';

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

    return (
        <MainLayout>
            <Head title={__('about.head_title')} />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center overflow-hidden text-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Warisan Kami"
                        className="w-full h-full object-cover brightness-[0.4] grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-hitam-pekat via-hitam-pekat/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
                    <div className="inline-block px-5 py-1.5 border border-gold/40 rounded-full mb-8 backdrop-blur-xl bg-gold/5 animate-pulse">
                        <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-black italic">{__('about.hero.label')}</span>
                    </div>
                    <h1 className="text-5xl md:text-9xl font-black text-white uppercase tracking-tighter mb-6 italic">{__('about.hero.title_1')} <span className="text-gold/80 italic">{__('about.hero.title_2')}</span></h1>
                    <p className="text-cream-gold/50 uppercase tracking-[0.5em] text-[10px] max-w-md mx-auto font-bold">{__('about.hero.sub')}</p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="aspect-4/5 bg-coklat-tua border border-gold/20 overflow-hidden relative group shadow-2xl">
                                {settings.about_story_image ? (
                                    <img src={`/storage/${settings.about_story_image}`} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000" alt="Our Story" />
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-gold/5 group-hover:bg-transparent transition-all duration-700"></div>
                                        <div className="absolute inset-0 flex items-center justify-center border-8 border-hitam-pekat m-4">
                                            <span className="text-gold-tua/20 text-9xl font-bold select-none">M</span>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-gold flex flex-col items-center justify-center p-8 hidden md:flex ring-[12px] ring-hitam-pekat shadow-[0_20px_50px_rgba(212,175,55,0.3)] rotate-3 hover:rotate-0 transition-transform duration-700">
                                <p className="text-hitam-pekat font-black text-sm leading-tight text-center uppercase tracking-tighter italic">{__('about.story.badge').split(' ')[0]} {__('about.story.badge').split(' ')[1]} <br /> <span className="text-4xl block mt-1">{__('about.story.badge').split(' ').slice(2).join(' ')}</span></p>
                            </div>
                        </div>
                        <div className="space-y-10">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black text-gold-muda mb-6 uppercase tracking-tighter leading-tight italic">{__('about.story.title_1')} <br /><span className="text-gold/30">{__('about.story.title_2')}</span></h2>
                                <div className="w-20 h-1.5 bg-gold mb-10"></div>
                            </div>
                            <div className="space-y-8 text-cream-gold/70 leading-relaxed text-lg font-light font-sans">
                                <p className="first-letter:text-6xl first-letter:text-gold first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:mt-1 italic">
                                    {__('about.story.p1')}
                                </p>
                                <p>
                                    {__('about.story.p2')}
                                </p>
                                <div className="pt-6 border-t border-gold-tua/10 grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <GlobeAltIcon className="w-8 h-8 text-gold stroke-1 opacity-40" />
                                        <p className="text-[10px] text-gold uppercase tracking-widest font-black leading-tight">{__('about.story.stat_source')}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <ShieldCheckIcon className="w-8 h-8 text-gold stroke-1 opacity-40" />
                                        <p className="text-[10px] text-gold uppercase tracking-widest font-black leading-tight">{__('about.story.stat_quality')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission Section */}
            <section className="py-32 bg-hitam-pekat relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/20 border border-gold/20 shadow-2xl overflow-hidden">
                        {/* Vision Card */}
                        <div className="bg-hitam-pekat p-14 lg:p-24 group relative overflow-hidden transition-all duration-1000 hover:bg-gold/[0.03]">
                            <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] group-hover:scale-125 transition-all duration-1000">
                                <EyeIcon className="w-64 h-64 text-gold" />
                            </div>
                            <div className="relative z-10 space-y-10">
                                <div className="flex items-center space-x-8">
                                    <div className="p-5 bg-gold/5 rounded-2xl border border-gold/10 text-gold shadow-[0_0_30px_rgba(212,175,55,0.1)] group-hover:scale-110 transition-transform duration-700">
                                        <EyeIcon className="w-12 h-12 stroke-[1px]" />
                                    </div>
                                    <h3 className="text-4xl font-black text-gold uppercase tracking-tighter italic">{__('about.vision.title')}</h3>
                                </div>
                                <p className="text-cream-gold/50 text-2xl md:text-3xl font-light leading-relaxed italic border-l-4 border-gold/30 pl-10 group-hover:text-cream-gold transition-colors duration-1000">
                                    {__('about.vision.text')}
                                </p>
                            </div>
                        </div>

                        {/* Mission Card */}
                        <div className="bg-hitam-pekat p-14 lg:p-24 group relative overflow-hidden transition-all duration-1000 hover:bg-gold/[0.03]">
                            <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] group-hover:scale-125 transition-all duration-1000">
                                <RocketLaunchIcon className="w-64 h-64 text-gold" />
                            </div>
                            <div className="relative z-10 space-y-10">
                                <div className="flex items-center space-x-8">
                                    <div className="p-5 bg-gold/5 rounded-2xl border border-gold/10 text-gold shadow-[0_0_30px_rgba(212,175,55,0.1)] group-hover:scale-110 transition-transform duration-700">
                                        <RocketLaunchIcon className="w-12 h-12 stroke-[1px]" />
                                    </div>
                                    <h3 className="text-4xl font-black text-gold uppercase tracking-tighter italic">{__('about.mission.title')}</h3>
                                </div>
                                <ul className="space-y-8">
                                    {[
                                        __('about.mission.m1'),
                                        __('about.mission.m2'),
                                        __('about.mission.m3')
                                    ].map((mission, i) => (
                                        <li key={i} className="flex items-start space-x-6 group/item">
                                            <div className="w-3 h-3 bg-gold mt-2.5 shrink-0 group-hover/item:scale-150 group-hover/item:rotate-45 transition-all duration-500"></div>
                                            <p className="text-cream-gold/40 text-sm md:text-base leading-relaxed tracking-widest font-medium uppercase italic group-hover/item:text-cream-gold/80 transition-colors">
                                                {mission}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section - Updated Compact Grid with 4 Cards */}
            <section className="py-24 bg-coklat-kopi/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center space-x-4 mb-4">
                            <div className="w-12 h-px bg-gold/30"></div>
                            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-black italic">{__('about.values.label')}</span>
                            <div className="w-12 h-px bg-gold/30"></div>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-gold uppercase tracking-tighter italic">{__('about.values.title')}</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gold/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-hitam-pekat/20">
                        {[
                            { title: __('about.values.v1_t'), body: __('about.values.v1_b'), icon: ShieldCheckIcon },
                            { title: __('about.values.v2_t'), body: __('about.values.v2_b'), icon: SparklesIcon },
                            { title: __('about.values.v3_t'), body: __('about.values.v3_b'), icon: TrophyIcon },
                            { title: __('about.values.v4_t'), body: __('about.values.v4_b'), icon: GlobeAltIcon }
                        ].map((v, i) => (
                            <div key={i} className={`group p-8 lg:p-10 border-b sm:border-b-0 border-gold/10 bg-hitam-pekat/40 hover:bg-gold/[0.02] transition-all duration-500 relative overflow-hidden ${i < 3 ? 'sm:border-r' : ''} ${i === 1 ? 'lg:border-r' : ''} ${i === 2 ? 'lg:border-r' : ''}`}>
                                <div className="p-3 bg-gold/10 border border-gold/20 rounded-xl w-fit mb-8 group-hover:scale-110 transition-transform shadow-xl">
                                    <v.icon className="w-6 h-6 text-gold stroke-1" />
                                </div>
                                <h3 className="text-gold font-black text-xl mb-4 uppercase tracking-widest italic">{v.title}</h3>
                                <p className="text-cream-gold/40 text-[11px] leading-relaxed font-sans uppercase tracking-[0.2em] italic">{v.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Decoration */}
                <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
                    <SparklesIcon className="w-64 h-64 text-gold stroke-[0.5]" />
                </div>
            </section>
        </MainLayout>
    );
}
