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

            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Luxury Lounge"
                        className="w-full h-full object-cover brightness-50"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-hitam-pekat via-hitam-pekat/40 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
                    <div className="inline-block px-4 py-1 border border-gold/50 rounded-full mb-6">
                        <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Sanctuari Para Aficionado</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold text-cream-gold mb-6 leading-tight uppercase tracking-tighter">
                        Master <br /><span className="text-gold">Heritage</span>
                    </h1>
                    <p className="text-cream-gold/70 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
                        Manjakan diri dalam dunia cerutu lintingan tangan yang eksklusif, dipadukan dengan racikan kopi artisan khas kami. Didesain untuk mereka yang menghargai kualitas terbaik dalam hidup.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            href={route('product')}
                            className="group flex items-center justify-center space-x-3 px-10 py-4 bg-gold text-hitam-pekat font-black uppercase tracking-[0.2em] text-sm hover:bg-gold-muda transition-all duration-500 hover:scale-105"
                        >
                            <span>Jelajahi Koleksi</span>
                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                        </Link>
                        <Link
                            href={route('about')}
                            className="px-10 py-4 border border-gold-tua text-gold-muda font-bold uppercase tracking-widest text-sm hover:bg-gold-tua/10 transition-all duration-300"
                        >
                            Kisah Kami
                        </Link>
                    </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute right-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden lg:block">
                    <div className="aspect-square rounded-full border border-gold border-dashed animate-spin-slow"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-hitam-pekat">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Lintingan Tangan', desc: 'Setiap cerutu dibuat dengan teliti oleh pakar torcedores menggunakan daun tembakau pilihan.', icon: FireIcon },
                            { title: 'Sangrai Artisan', desc: 'Biji kopi kami berasal dari perkebunan dataran tinggi dan disangrai untuk memunculkan cita rasa kompleks.', icon: BeakerIcon },
                            { title: 'Lounge Eksklusif', desc: 'Lingkungan khusus anggota yang didedikasikan untuk privasi dan kenyamanan murni.', icon: SparklesIcon }
                        ].map((feature, idx) => (
                            <div key={idx} className="group p-10 border border-gold-tua/10 bg-hitam-pekat/50 backdrop-blur-md hover:border-gold/30 transition-all duration-700 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-0 bg-gold group-hover:h-full transition-all duration-700"></div>
                                <div className="p-4 bg-gold/5 rounded-full w-fit mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <feature.icon className="w-10 h-10 text-gold stroke-1" />
                                </div>
                                <h3 className="text-gold font-bold text-xl mb-4 uppercase tracking-widest">{feature.title}</h3>
                                <p className="text-cream-gold/50 leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {settings.home_quote_bg ? (
                        <img src={`/storage/${settings.home_quote_bg}`} className="w-full h-full object-cover brightness-[0.3]" alt="" />
                    ) : (
                        <div className="w-full h-full bg-coklat-tua"></div>
                    )}
                </div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold rounded-full border-dashed"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <span className="text-4xl text-gold-muda font-serif block mb-8">"</span>
                    <h2 className="text-3xl md:text-5xl text-cream-gold font-medium italic leading-tight mb-8">
                        Cerutu adalah sebuah ritual sekaligus relaksasi. Ini adalah momen waktu di mana tidak ada hal lain yang penting.
                    </h2>
                    <p className="text-gold uppercase tracking-[0.4em] font-bold text-xs">— Sang Master Peracik</p>
                </div>
            </section>
        </MainLayout>
    );
}
