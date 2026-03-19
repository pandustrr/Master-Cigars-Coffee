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
                        className="w-full h-full object-cover brightness-[0.3] scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-hitam-pekat via-hitam-pekat/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-linear-to-r from-hitam-pekat/80 via-transparent to-transparent"></div>

                    {/* Floating Decorative Elements */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 blur-[100px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-coklat-kopi/10 blur-[130px] rounded-full animate-float"></div>
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
                                className="group relative px-14 py-6 bg-gold text-hitam-pekat font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-700 overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.2)] active:scale-95 hover:shadow-[0_0_60px_rgba(212,175,55,0.4)]"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                                <span className="relative z-10 flex items-center space-x-4">
                                    <span>Jelajahi Koleksi</span>
                                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-700" />
                                </span>
                            </Link>
                            <Link
                                href={route('about')}
                                className="group px-14 py-6 border border-white/10 text-white/70 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white/5 hover:text-white transition-all duration-700 backdrop-blur-md shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                <span className="relative z-10">Kisah Kami</span>
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
                            <div key={idx} className="group p-14 lg:p-20 bg-hitam-pekat hover:bg-gold/[0.03] border-gold/0 hover:border-gold/30 transition-all duration-1000 relative overflow-hidden">
                                {/* Subtle Hover Accent */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-gold/[0.02] blur-[100px] -mr-24 -mt-24 group-hover:bg-gold/[0.05] transition-all duration-1000"></div>

                                <div className="p-5 bg-gold/5 border border-gold/10 rounded-2xl w-fit mb-12 group-hover:scale-125 group-hover:rotate-6 transition-all duration-1000 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                                    <feature.icon className="w-10 h-10 text-gold/40 group-hover:text-gold transition-colors stroke-[1px]" />
                                </div>
                                <h3 className="text-gold/70 group-hover:text-gold font-black text-3xl mb-8 uppercase tracking-tighter italic transition-all duration-700">{feature.title}</h3>
                                <p className="text-white/20 group-hover:text-white/40 leading-relaxed text-[11px] font-medium uppercase tracking-[0.2em] italic transition-all duration-1000">{feature.desc}</p>

                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gold transition-all duration-1000 group-hover:w-full"></div>
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
        </MainLayout >
    );
}
