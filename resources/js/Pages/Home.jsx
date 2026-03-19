import MainLayout from '@/Layouts/MainLayout';
import { Link, Head, usePage } from '@inertiajs/react';
import {
    SparklesIcon,
    FireIcon,
    BeakerIcon,
    AcademicCapIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Home() {
    const { settings } = usePage().props;
    const heroImage = settings.hero_home ? `/storage/${settings.hero_home}` : '/images/hero.png';

    return (
        <MainLayout>
            <Head title="Cerutu Premium & Kopi Artisan" />

            {/* Hero Section - Refined & More Immersive */}
            <section className="relative h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Luxury Lounge"
                        className="w-full h-full object-cover brightness-[0.35] scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-hitam-pekat via-hitam-pekat/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-linear-to-r from-hitam-pekat/60 via-transparent to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-4xl space-y-8 animate-fade-in-up">
                        <div className="flex items-center space-x-4 mb-2">
                            <div className="w-12 h-px bg-gold/50"></div>
                            <span className="text-gold uppercase tracking-[0.5em] text-[10px] font-black italic">The Ultimate Aficionado Sanctuary</span>
                        </div>
                        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white mb-6 leading-[0.9] uppercase tracking-tighter italic">
                            Master <br /><span className="text-gold/80 hover:text-gold transition-colors duration-700">Heritage</span>
                        </h1>
                        <p className="text-white/50 text-base md:text-xl max-w-2xl mb-12 leading-relaxed font-light font-sans uppercase tracking-[0.1em] italic">
                            Manjakan diri dalam dunia cerutu lintingan tangan yang eksklusif, dipadukan dengan racikan kopi artisan khas kami.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 pt-6">
                            <Link
                                href={route('product')}
                                className="group relative px-12 py-5 bg-gold text-hitam-pekat font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-500 overflow-hidden shadow-2xl shadow-gold/20 active:scale-95"
                            >
                                <span className="relative z-10 flex items-center space-x-4">
                                    <span>Jelajahi Koleksi</span>
                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                                </span>
                            </Link>
                            <Link
                                href={route('about')}
                                className="px-12 py-5 border border-white/10 text-white/60 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white/5 hover:text-white transition-all duration-500 backdrop-blur-sm shadow-xl"
                            >
                                Kisah Kami
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Scroll Hint */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-20">
                    <div className="w-px h-16 bg-linear-to-b from-transparent via-gold to-transparent"></div>
                    <span className="text-[8px] uppercase tracking-[0.3em] font-black text-gold">Scroll Down</span>
                </div>
            </section>

            {/* Features Section - Blended Design */}
            <section className="py-32 bg-hitam-pekat relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/20 border border-gold/20 shadow-2xl">
                        {[
                            { title: 'Lintingan Tangan', desc: 'Setiap cerutu dibuat dengan teliti oleh pakar torcedores menggunakan daun tembakau pilihan.', icon: FireIcon },
                            { title: 'Sangrai Artisan', desc: 'Biji kopi kami berasal dari perkebunan dataran tinggi dan disangrai untuk memunculkan cita rasa kompleks.', icon: BeakerIcon },
                            { title: 'Lounge Eksklusif', desc: 'Lingkungan khusus anggota yang didedikasikan untuk privasi dan kenyamanan murni.', icon: SparklesIcon }
                        ].map((feature, idx) => (
                            <div key={idx} className="group p-12 lg:p-16 bg-hitam-pekat hover:bg-gold/[0.04] border-gold/0 hover:border-gold/50 transition-all duration-700 relative overflow-hidden">
                                {/* Subtle Hover Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/[0.03] blur-3xl -mr-16 -mt-16 group-hover:bg-gold/[0.07] transition-all"></div>
                                
                                <div className="p-4 bg-gold/5 border border-gold/10 rounded-2xl w-fit mb-10 group-hover:scale-110 transition-transform duration-700 shadow-xl">
                                    <feature.icon className="w-8 h-8 text-gold/60 group-hover:text-gold transition-colors stroke-1" />
                                </div>
                                <h3 className="text-gold/80 group-hover:text-gold font-black text-2xl mb-6 uppercase tracking-tighter italic transition-colors">{feature.title}</h3>
                                <p className="text-white/30 group-hover:text-white/50 leading-relaxed text-xs font-medium uppercase tracking-widest italic transition-all duration-700">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Background Decor */}
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full -translate-x-1/2"></div>
            </section>

            {/* Quote Section - Refined Integration */}
            <section className="py-40 relative overflow-hidden">
                {/* Background Image with Parallax-like feel */}
                <div className="absolute inset-0 z-0">
                    {settings.home_quote_bg ? (
                        <img src={`/storage/${settings.home_quote_bg}`} className="w-full h-full object-cover grayscale brightness-[0.2]" alt="" />
                    ) : (
                        <div className="w-full h-full bg-hitam-pekat"></div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-b from-hitam-pekat via-transparent to-hitam-pekat"></div>
                </div>
                
                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-12">
                    <div className="flex justify-center">
                        <div className="w-16 h-px bg-gold/50"></div>
                        <div className="mx-6 p-2 bg-gold/10 rounded-full">
                            <SparklesIcon className="w-6 h-6 text-gold" />
                        </div>
                        <div className="w-16 h-px bg-gold/50"></div>
                    </div>
                    
                    <h2 className="text-2xl md:text-4xl text-cream-gold font-black italic leading-[1.4] tracking-tight">
                        "Cerutu adalah sebuah ritual sekaligus relaksasi. Ini adalah momen waktu di mana tidak ada hal lain yang penting."
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="w-20 h-px bg-gold mx-auto opacity-30"></div>
                        <p className="text-gold uppercase tracking-[0.6em] font-black text-[10px] italic">Master Cigars & Coffee</p>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
