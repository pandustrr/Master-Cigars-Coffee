import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import {
    ClockIcon,
    ShieldCheckIcon,
    SparklesIcon,
    GlobeAltIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function About() {
    const { settings } = usePage().props;
    const heroImage = settings.hero_about ? `/storage/${settings.hero_about}` : '/images/hero.png';

    return (
        <MainLayout>
            <Head title="Tentang Kami - Master Cerutu & Kopi" />

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
                    <div className="inline-block px-4 py-1 border border-gold/30 rounded-full mb-6 backdrop-blur-sm">
                        <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">The Heritage</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold text-gold uppercase tracking-tighter mb-4">Warisan Kami</h1>
                    <p className="text-cream-gold/60 uppercase tracking-[0.3em] text-xs max-w-md mx-auto">Tradisi Kesempurnaan Sejak 1998</p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="aspect-[4/5] bg-coklat-tua border border-gold/20 overflow-hidden relative group">
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
                            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold p-8 hidden md:block">
                                <p className="text-hitam-pekat font-bold text-lg leading-tight">BERDIRI SEJAK 1998</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold text-gold-muda mb-10 uppercase tracking-tighter leading-tight">Menguasai Keahlian <br /><span className="text-gold/50">Ciptakan Legasi</span></h2>
                            <div className="space-y-8 text-cream-gold/70 leading-relaxed text-lg font-light">
                                <p className="first-letter:text-5xl first-letter:text-gold first-letter:font-serif first-letter:mr-3 first-letter:float-left">
                                    Didirikan dengan semangat untuk perpaduan yang tak tertandingi antara tembakau halus dan kafein yang kaya, Master Cigars & Coffee telah berevolusi dari koleksi pribadi yang sederhana menjadi destinasi utama bagi para penikmat.
                                </p>
                                <p>
                                    Perjalanan kami dimulai di tanah vulkanik Karibia, di mana kami menemukan bahwa rahasia asap yang sempurna terletak pada kesabaran penuaan dan ketepatan campuran. Kami membawa filosofi ini pulang, memasangkan cerutu kami dengan biji kopi yang dipilih dengan cermat dari kepulauan Indonesia.
                                </p>
                                <div className="pt-6 border-t border-gold-tua/10 grid grid-cols-2 gap-8">
                                    <div className="flex items-center space-x-4">
                                        <GlobeAltIcon className="w-10 h-10 text-gold/30 stroke-1" />
                                        <span className="text-xs text-gold uppercase tracking-widest font-bold">Sumber Global</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <ShieldCheckIcon className="w-10 h-10 text-gold/30 stroke-1" />
                                        <span className="text-xs text-gold uppercase tracking-widest font-bold">Kualitas Terjamin</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-coklat-kopi/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gold uppercase tracking-widest mb-4">Prinsip Inti</h2>
                        <div className="w-24 h-1 bg-gold mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Otentik', body: 'Kami tidak pernah berkompromi pada asal dan kualitas bahan-bahan kami.', icon: ShieldCheckIcon },
                            { title: 'Elegan', body: 'Setiap detail presentasi kami dirancang untuk kesempurnaan estetika.', icon: SparklesIcon },
                            { title: 'Komunitas', body: 'Membangun persaudaraan penggemar yang berbagi gairah yang sama.', icon: GlobeAltIcon }
                        ].map((v, i) => (
                            <div key={i} className="group p-12 border border-gold-tua/10 bg-hitam-pekat/40 hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
                                <div className="p-4 bg-gold/5 rounded-full w-fit mb-8 group-hover:scale-110 transition-transform">
                                    <v.icon className="w-8 h-8 text-gold stroke-1" />
                                </div>
                                <h3 className="text-gold font-bold text-xl mb-4 uppercase tracking-wider">{v.title}</h3>
                                <p className="text-cream-gold/40 text-sm leading-relaxed">{v.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
