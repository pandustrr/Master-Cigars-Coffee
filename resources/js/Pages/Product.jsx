import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { 
    ShoppingBagIcon, 
    PlusIcon, 
    FunnelIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const products = [
    { id: 1, category: 'Cerutu', name: 'Master Reserva Elite', price: 'Rp 650rb', desc: 'Sebuah mahakarya full-body yang dimatangkan selama 12 tahun.', tag: 'Terlaris' },
    { id: 2, category: 'Kopi', name: 'Black Velvet Roast', price: 'Rp 180rb', desc: 'Mandheling Indonesia dengan catatan cokelat hitam.', tag: 'Populer' },
    { id: 3, category: 'Cerutu', name: 'Signature Series Gold', price: 'Rp 850rb', desc: 'Dilinting tangan dengan pembungkus Connecticut ultra-langka.', tag: 'Terbatas' },
    { id: 4, category: 'Kopi', name: 'Highland Mist', price: 'Rp 220rb', desc: 'Single origin Arabika dari dataran tinggi Gayo.', tag: 'Baru' },
    { id: 5, category: 'Cerutu', name: 'Midnight Robusto', price: 'Rp 500rb', desc: 'Kekuatan kompak dengan nuansa tanah yang pedas.', tag: null },
    { id: 6, category: 'Aksesoris', name: 'Silver Gilded Cutter', price: 'Rp 1.8jt', desc: 'Baja bedah presisi dengan aksen daun emas.', tag: null },
];

export default function Product() {
    return (
        <MainLayout>
            <Head title="Koleksi Kami - Master Cerutu & Kopi" />

            {/* Hero Section */}
            <section className="relative h-[45vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/images/hero.png" 
                        alt="Koleksi Kami" 
                        className="w-full h-full object-cover brightness-[0.4] grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-hitam-pekat via-hitam-pekat/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <ShoppingBagIcon className="w-6 h-6 text-gold stroke-1" />
                                <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold underline decoration-gold-tua underline-offset-8">Catalogue</span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-bold text-gold uppercase tracking-tighter">Koleksi Kami</h1>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {['Semua', 'Cerutu', 'Kopi', 'Aksesoris'].map((cat) => (
                                <button key={cat} className="px-8 py-3 border border-gold-tua/20 text-gold-muda/40 text-[10px] uppercase font-bold tracking-widest bg-hitam-pekat/40 backdrop-blur-md hover:border-gold hover:text-gold transition-all duration-300">
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-12 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {products.map((product) => (
                            <div key={product.id} className="group relative bg-coklat-kopi/10 border border-gold-tua/10 p-1 overflow-hidden transition-all duration-500 hover:border-gold/30">
                                <div className="aspect-square bg-coklat-tua relative overflow-hidden">
                                     {/* Placeholder Image */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-1/2 h-1/2 border-2 border-gold/10 rounded-full animate-pulse-slow flex items-center justify-center">
                                            <span className="text-gold-tua/20 font-bold text-4xl uppercase">{product.category[0]}</span>
                                        </div>
                                    </div>
                                    {product.tag && (
                                        <div className="absolute top-4 left-4 bg-gold px-3 py-1 text-[10px] uppercase font-black tracking-tighter text-hitam-pekat">
                                            {product.tag}
                                        </div>
                                    )}
                                    {/* Hover Action */}
                                    <div className="absolute inset-0 bg-hitam-pekat/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-sm">
                                        <div className="flex flex-col items-center">
                                            <p className="text-gold uppercase tracking-widest text-[10px] font-bold mb-4">Pesan Sekarang</p>
                                            <p className="text-cream-gold text-sm mb-8 leading-relaxed font-light">{product.desc}</p>
                                            <button className="flex items-center space-x-3 px-8 py-4 bg-gold text-hitam-pekat font-black uppercase text-[10px] tracking-widest hover:bg-gold-muda transition-all">
                                                <span>Pilih Menu</span>
                                                <PlusIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gold uppercase tracking-[0.2em] text-[10px] mb-2 font-bold">{product.category}</p>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-cream-gold font-bold text-xl uppercase tracking-tight">{product.name}</h3>
                                        <span className="text-gold font-bold text-xl">{product.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
