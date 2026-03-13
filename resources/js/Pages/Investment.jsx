import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { 
    CurrencyDollarIcon, 
    ArrowTrendingUpIcon, 
    LinkIcon, 
    BuildingOffice2Icon,
    DocumentTextIcon,
    PaperAirplaneIcon
} from '@heroicons/react/24/outline';

export default function Investment() {
    return (
        <MainLayout>
            <Head title="Peluang Investasi - Master Cerutu & Kopi" />

            {/* Hero Section */}
            <section className="relative h-[45vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/images/hero.png" 
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
                    <p className="text-cream-gold/60 uppercase tracking-[0.3em] text-xs">Visi Pertumbuhan Berkelanjutan</p>
                </div>
            </section>

            {/* Investment Context */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-24">
                        <h2 className="text-3xl md:text-5xl font-bold text-cream-gold uppercase tracking-tighter mb-8 leading-tight">Tumbuh Bersama <br /><span className="text-gold">Membangun Legasi</span></h2>
                        <p className="text-cream-gold/70 text-lg leading-relaxed font-light font-sans">
                            Master Cigars & Coffee bukan sekadar merek; ini adalah aset gaya hidup. Kami menawarkan instrumen investasi unik bagi mereka yang memahami nilai prestise jangka panjang.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Model Waralaba', metric: 'Starting Rp 4M', desc: 'Miliki Master Lounge di lokasi metropolis utama dengan dukungan rantai pasokan penuh.', icon: BuildingOffice2Icon },
                            { title: 'Berdasarkan Aset', metric: '100% Tangible', desc: 'Portofolio investasi yang didukung oleh stok tembakau fisik yang dimatangkan dan lahan kopi perkebunan pegunungan.', icon: LinkIcon },
                            { title: 'Seri Pertumbuhan', metric: '18.5% ROI', desc: 'Berpartisipasi dalam ekspansi digital kami dan infrastruktur logistik pengiriman internasional.', icon: ArrowTrendingUpIcon }
                        ].map((box, i) => (
                            <div key={i} className="group p-12 bg-hitam-pekat/40 border border-gold-tua/10 hover:border-gold transition-all duration-700 relative overflow-hidden">
                                <div className="p-4 bg-gold/5 rounded-full w-fit mb-8 group-hover:scale-110 transition-transform">
                                    <box.icon className="w-10 h-10 text-gold stroke-1" />
                                </div>
                                <h3 className="text-gold font-bold text-xl mb-2 uppercase tracking-widest">{box.title}</h3>
                                <div className="text-cream-gold font-black text-2xl mb-4 tracking-tighter italic">{box.metric}</div>
                                <p className="text-cream-gold/40 text-sm leading-relaxed">{box.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ROI / Stats Section */}
            <section className="py-24 bg-coklat-tua relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                     {[
                        { label: 'Pertumbuhan Pendapatan', val: '24%' },
                        { label: 'Anggota Aktif', val: '12rb+' },
                        { label: 'Negara', val: '15+' },
                        { label: 'Master Lounge', val: '28' }
                     ].map((stat, i) => (
                        <div key={i}>
                            <h4 className="text-4xl md:text-6xl font-black text-gold mb-2 tracking-tighter">{stat.val}</h4>
                            <p className="text-cream-gold/40 text-[10px] uppercase font-bold tracking-[0.3em]">{stat.label}</p>
                        </div>
                     ))}
                </div>
            </section>

            {/* Investigation Form CTA */}
            <section className="py-32 bg-coklat-kopi/5">
                <div className="max-w-4xl mx-auto px-4 border border-gold-tua/10 p-16 bg-hitam-pekat relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 left-0 w-2 h-full bg-gold"></div>
                    <div className="relative z-10">
                        <div className="flex justify-center mb-10">
                            <DocumentTextIcon className="w-16 h-16 text-gold/20 stroke-1" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-gold uppercase tracking-tighter text-center mb-16 italic">Permintaan Prospektus</h2>
                        <form className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="relative group">
                                    <input type="text" placeholder="NAMA LENGKAP" className="w-full bg-transparent border-b border-gold-tua/30 py-4 text-cream-gold focus:border-gold outline-none transition-all placeholder:text-gold-tua/20 text-xs tracking-[0.2em] font-bold" />
                                </div>
                                <div className="relative group">
                                    <input type="email" placeholder="ALAMAT EMAIL" className="w-full bg-transparent border-b border-gold-tua/30 py-4 text-cream-gold focus:border-gold outline-none transition-all placeholder:text-gold-tua/20 text-xs tracking-[0.2em] font-bold" />
                                </div>
                            </div>
                            <div className="relative group">
                                <input type="text" placeholder="RENTANG INVESTASI (Rp 1.5M - Rp 75M+)" className="w-full bg-transparent border-b border-gold-tua/30 py-4 text-cream-gold focus:border-gold outline-none transition-all placeholder:text-gold-tua/20 text-xs tracking-[0.2em] font-bold" />
                            </div>
                            <div className="relative group">
                                <textarea placeholder="PESAN TAMBAHAN" rows="4" className="w-full bg-transparent border-b border-gold-tua/30 py-4 text-cream-gold focus:border-gold outline-none transition-all placeholder:text-gold-tua/20 text-xs tracking-[0.2em] font-bold resize-none"></textarea>
                            </div>
                            <div className="flex justify-center pt-8">
                                <button className="group flex items-center space-x-4 bg-gold px-12 py-5 text-hitam-pekat font-black uppercase tracking-[0.3em] text-sm hover:bg-gold-muda transition-all duration-500 hover:scale-105 active:scale-95">
                                    <span>Kirim Aplikasi</span>
                                    <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
