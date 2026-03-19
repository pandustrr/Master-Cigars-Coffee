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
                    <h1 className="text-4xl md:text-7xl font-bold text-gold uppercase tracking-tighter mb-4 italic">Warisan Kami</h1>
                    <p className="text-cream-gold/60 uppercase tracking-[0.3em] text-xs max-w-md mx-auto">Tradisi Kesempurnaan Sejak 1998</p>
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
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold flex items-center justify-center p-6 hidden md:flex ring-8 ring-hitam-pekat shadow-2xl">
                                <p className="text-hitam-pekat font-black text-sm leading-tight text-center uppercase tracking-tighter italic">Berdiri Sejak <br/> <span className="text-2xl">1998</span></p>
                            </div>
                        </div>
                        <div className="space-y-10">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black text-gold-muda mb-6 uppercase tracking-tighter leading-tight italic">Menguasai Keahlian <br /><span className="text-gold/30">Ciptakan Legasi</span></h2>
                                <div className="w-20 h-1.5 bg-gold mb-10"></div>
                            </div>
                            <div className="space-y-8 text-cream-gold/70 leading-relaxed text-lg font-light font-sans">
                                <p className="first-letter:text-6xl first-letter:text-gold first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:mt-1 italic">
                                    Didirikan dengan semangat untuk perpaduan yang tak tertandingi antara tembakau halus dan kafein yang kaya, Master Cigars & Coffee telah berevolusi dari koleksi pribadi yang sederhana menjadi destinasi utama bagi para penikmat.
                                </p>
                                <p>
                                    Perjalanan kami dimulai di tanah vulkanik Karibia, di mana kami menemukan bahwa rahasia asap yang sempurna terletak pada kesabaran penuaan dan ketepatan campuran. Kami membawa filosofi ini pulang, memasangkan cerutu kami dengan biji kopi yang dipilih dengan cermat dari kepulauan Indonesia.
                                </p>
                                <div className="pt-6 border-t border-gold-tua/10 grid grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <GlobeAltIcon className="w-8 h-8 text-gold stroke-1 opacity-40" />
                                        <p className="text-[10px] text-gold uppercase tracking-widest font-black leading-tight">Sumber Global <br/> Terpilih</p>
                                    </div>
                                    <div className="space-y-2">
                                        <ShieldCheckIcon className="w-8 h-8 text-gold stroke-1 opacity-40" />
                                        <p className="text-[10px] text-gold uppercase tracking-widest font-black leading-tight">Standar <br/> Kualitas Tinggi</p>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/10 border border-gold/10">
                        {/* Vision Card */}
                        <div className="bg-hitam-pekat p-12 lg:p-20 group relative overflow-hidden transition-all duration-700 hover:bg-coklat-kopi/10">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-150 transition-transform duration-1000">
                                <EyeIcon className="w-48 h-48 text-gold" />
                            </div>
                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center space-x-6">
                                    <div className="p-4 bg-gold/5 rounded-2xl border border-gold/10 text-gold shadow-2xl">
                                        <EyeIcon className="w-10 h-10 stroke-1" />
                                    </div>
                                    <h3 className="text-3xl font-black text-gold uppercase tracking-tighter italic">Visi</h3>
                                </div>
                                <p className="text-cream-gold/60 text-xl md:text-2xl font-light leading-relaxed italic border-l-4 border-gold/20 pl-8">
                                    "Menjadi standar emas internasional dalam industri cerutu dan kopi, di mana kemewahan bertemu dengan tradisi untuk menciptakan pengalaman yang tak terlupakan bagi setiap pelanggan kami."
                                </p>
                            </div>
                        </div>

                        {/* Mission Card */}
                        <div className="bg-hitam-pekat p-12 lg:p-20 group relative overflow-hidden transition-all duration-700 hover:bg-coklat-kopi/10">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-150 transition-transform duration-1000">
                                <RocketLaunchIcon className="w-48 h-48 text-gold" />
                            </div>
                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center space-x-6">
                                    <div className="p-4 bg-gold/5 rounded-2xl border border-gold/10 text-gold shadow-2xl">
                                        <RocketLaunchIcon className="w-10 h-10 stroke-1" />
                                    </div>
                                    <h3 className="text-3xl font-black text-gold uppercase tracking-tighter italic">Misi</h3>
                                </div>
                                <ul className="space-y-6">
                                    {[
                                        'Mengkurasi biji kopi dan tembakau terbaik dari seluruh penjuru dunia dengan integritas tinggi.',
                                        'Memberikan pelayanan personal yang eksklusif untuk gaya hidup modern yang menghargai kualitas.',
                                        'Membangun ekosistem penikmat yang saling berbagi pengetahuan dan apresiasi seni.'
                                    ].map((mission, i) => (
                                        <li key={i} className="flex items-start space-x-4 group/item">
                                            <div className="w-2 h-2 bg-gold mt-2 shrink-0 group-hover/item:scale-150 transition-transform"></div>
                                            <p className="text-cream-gold/60 text-sm md:text-base leading-relaxed tracking-wider">
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
                            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-black italic">Core Philosophy</span>
                            <div className="w-12 h-px bg-gold/30"></div>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-gold uppercase tracking-tighter italic">Prinsip Inti</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gold/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-hitam-pekat/20">
                        {[
                            { title: 'Otentik', body: 'Keaslian tanpa kompromi pada asal dan kualitas bahan setiap produk.', icon: ShieldCheckIcon },
                            { title: 'Elegan', body: 'Detail presentasi yang dirancang untuk estetika kelas dunia.', icon: SparklesIcon },
                            { title: 'Eksklusif', body: 'Menjaga gengsi dan standar pelayanan bagi para penikmat sejati.', icon: TrophyIcon },
                            { title: 'Komunitas', body: 'Membangun persaudaraan penggemar dalam atmosfer premium.', icon: GlobeAltIcon }
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
