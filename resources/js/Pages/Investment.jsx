import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import {
    DocumentTextIcon,
    BuildingOffice2Icon,
    LinkIcon,
    ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export default function Investment({ investments }) {
    const { settings } = usePage().props;
    const heroImage = settings.hero_investment ? `/storage/${settings.hero_investment}` : '/images/hero.png';

    return (
        <MainLayout>
            <Head title="Peluang Investasi - Master Cerutu & Kopi" />

            {/* Hero Section */}
            <section className="relative h-[35vh] md:h-[45vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Investasi Kualitas"
                        className="w-full h-full object-cover brightness-[0.4] grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-hitam-pekat via-hitam-pekat/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
                    <div className="inline-block px-4 py-1 border border-gold/30 rounded-full mb-6 backdrop-blur-sm">
                        <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold">Capital Growth</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold text-gold uppercase tracking-tighter mb-4">Investasi Kualitas</h1>
                    <p className="text-gold-muda/60 uppercase tracking-[0.3em] text-xs">Visi Pertumbuhan Berkelanjutan</p>
                </div>
            </section>

            {/* Investment Context */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-gold-muda uppercase tracking-tighter mb-8 leading-tight">Tumbuh Bersama <br /><span className="text-gold">Membangun Legasi</span></h2>
                        <p className="text-gold-muda/80 text-lg leading-relaxed font-light font-sans">
                            Master Cigars & Coffee bukan sekadar merek; ini adalah aset gaya hidup. Kami menawarkan instrumen investasi unik bagi mereka yang memahami nilai prestise jangka panjang.
                        </p>
                    </div>

                    {/* Investment Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {[
                            { title: 'Model Waralaba', desc: 'Miliki Master Lounge di lokasi metropolis utama dengan dukungan rantai pasokan penuh.', icon: BuildingOffice2Icon },
                            { title: 'Berdasarkan Aset', desc: 'Portofolio investasi yang didukung oleh stok tembakau fisik yang dimatangkan dan lahan kopi perkebunan pegunungan.', icon: LinkIcon },
                            { title: 'Seri Pertumbuhan', desc: 'Berpartisipasi dalam ekspansi digital kami and infrastruktur logistik pengiriman internasional.', icon: ArrowTrendingUpIcon }
                        ].map((box, i) => (
                            <div key={i} className="group p-10 bg-coklat-tua border border-gold-tua/20 hover:border-gold/50 transition-all duration-700 relative overflow-hidden rounded-2xl shadow-2xl">
                                <div className="p-4 bg-gold/5 rounded-full w-fit mb-8 group-hover:scale-110 transition-transform">
                                    <box.icon className="w-8 h-8 text-gold-muda stroke-1" />
                                </div>
                                <h3 className="text-gold font-bold text-lg mb-4 uppercase tracking-widest">{box.title}</h3>
                                <p className="text-gold-muda/70 text-sm leading-relaxed">{box.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Document Downloads Section - Horizontal List */}
                    {investments && investments.length > 0 && (
                        <div className="max-w-5xl mx-auto space-y-4 pt-12 border-t border-gold-tua/10">
                            <div className="mb-10 text-center md:text-left">
                                <h3 className="text-xl md:text-2xl font-black text-gold-muda uppercase tracking-tighter mb-2">Dokumen Investasi</h3>
                                <div className="w-16 h-1 bg-gold mx-auto md:mx-0"></div>
                            </div>
                            
                            <div className="space-y-4">
                                {investments.map((doc) => (
                                    <div key={doc.id} className="group bg-coklat-tua border border-gold-tua/20 p-5 md:p-6 rounded-2xl hover:border-gold/50 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
                                        <div className="flex items-start space-x-6 overflow-hidden w-full">
                                            <div className="p-3.5 bg-gold/5 rounded-xl shrink-0 group-hover:bg-gold/10 transition-colors mt-1">
                                                <DocumentTextIcon className="w-7 h-7 text-gold-muda" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <h4 className="text-white font-bold text-base md:text-lg uppercase tracking-tight truncate">{doc.title}</h4>
                                                {doc.description && (
                                                    <p className="text-gold-muda/80 text-xs mt-1 leading-relaxed line-clamp-2 md:line-clamp-none italic font-sans">{doc.description}</p>
                                                )}
                                                <span className="text-[9px] font-black text-gold-muda/20 uppercase tracking-[0.2em] mt-3 block">Official PDF Document</span>
                                            </div>
                                        </div>
                                        <a 
                                            href={`/storage/${doc.pdf_path}`} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="w-full md:w-auto inline-flex items-center justify-center space-x-3 bg-gold-muda hover:bg-gold text-hitam-pekat px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 shadow-lg shadow-gold-muda/5 hover:scale-[1.02] active:scale-95"
                                        >
                                            <DocumentTextIcon className="w-4 h-4" />
                                            <span>Unduh Dokumen</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
