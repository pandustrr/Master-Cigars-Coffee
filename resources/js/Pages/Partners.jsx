import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import {
    UserGroupIcon,
    HandRaisedIcon,
    GlobeAsiaAustraliaIcon,
    BriefcaseIcon,
    ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/outline';

export default function Partners({ partners }) {
    return (
        <MainLayout>
            <Head title="Mitra & Kolaborasi - Master Cerutu & Kopi" />

            {/* Hero Section */}
            <section className="relative h-[45vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero.png"
                        alt="Ekosistem Mitra"
                        className="w-full h-full object-cover brightness-[0.4] grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-hitam-pekat via-hitam-pekat/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
                    <div className="inline-block px-4 py-1 border border-gold/30 rounded-full mb-6 backdrop-blur-sm">
                        <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Synergy</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold text-gold uppercase tracking-tighter mb-4">Ekosistem</h1>
                    <p className="text-cream-gold/60 uppercase tracking-[0.3em] text-xs">Berkolaborasi dengan yang Terbaik</p>
                </div>
            </section>

            {/* Partnerships Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div>
                            <h2 className="text-3xl font-bold text-gold-muda mb-8 uppercase tracking-widest">Jaringan Global</h2>
                            <p className="text-cream-gold/70 leading-relaxed text-lg font-light mb-8">
                                Di Master Cigars & Coffee, kami percaya bahwa kesempurnaan diperkuat melalui kolaborasi. Kami bermitra dengan perkebunan terkemuka dunia, pengrajin legendaris, dan merek mewah untuk menghadirkan pengalaman eksklusif bagi komunitas kami.
                            </p>
                            <div className="space-y-6">
                                {partners.length > 0 ? (
                                    partners.map((item, idx) => (
                                        <div key={idx} className="group flex gap-6 p-8 border border-gold-tua/10 bg-hitam-pekat/40 hover:border-gold/30 transition-all duration-500">
                                            <div className="p-3 bg-gold/5 rounded-full h-fit group-hover:scale-110 transition-transform">
                                                <UserGroupIcon className="w-6 h-6 text-gold stroke-1" />
                                            </div>
                                            <div>
                                                <h4 className="text-gold font-bold uppercase tracking-wider mb-2">{item.name}</h4>
                                                <p className="text-cream-gold/50 text-sm leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-cream-gold/30 italic text-sm">Belum ada mitra yang ditambahkan.</div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {partners.map((partner) => (
                                <div key={partner.id} className="aspect-video bg-coklat-kopi/20 border border-gold-tua/5 flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 hover:border-gold transition-all duration-500">
                                    {partner.logo ? (
                                        <img src={`/storage/${partner.logo}`} className="w-full h-full object-contain p-4" alt={partner.name} />
                                    ) : (
                                        <span className="text-gold opacity-50 font-black text-xs tracking-tighter italic uppercase">{partner.name}</span>
                                    )}
                                </div>
                            ))}
                        </div>
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
                    <h2 className="text-4xl md:text-6xl font-black text-gold uppercase tracking-tighter mb-8 italic">Menjadi Kolaborator</h2>
                    <p className="text-cream-gold/60 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                        Ingin menyelaraskan merek Anda dengan puncak kemewahan? Kami selalu terbuka untuk menjajaki sinergi baru dan kemitraan kreatif.
                    </p>
                    <button className="group relative px-12 py-5 bg-transparent overflow-hidden">
                        <div className="absolute inset-0 border border-gold group-hover:bg-gold transition-all duration-500"></div>
                        <span className="relative z-10 text-gold group-hover:text-hitam-pekat font-black uppercase tracking-[0.3em] text-sm transition-colors duration-500">Diskusikan Kemitraan</span>
                    </button>
                </div>
                {/* Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold opacity-[0.03] blur-[150px] rounded-full"></div>
            </section>
        </MainLayout>
    );
}
