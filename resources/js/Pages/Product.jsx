import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import {
    ShoppingBagIcon,
    PlusIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    ArrowLongRightIcon as ArrowRightIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

export default function Product({ products, mainProducts, categories }) {
    const { settings } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [selectedBrandDetail, setSelectedBrandDetail] = useState(null);
    const [activeGalleryImage, setActiveGalleryImage] = useState(null);
    
    const heroImage = settings.hero_products ? `/storage/${settings.hero_products}` : '/images/hero.png';

    const filteredMainProducts = useMemo(() => {
        if (selectedCategory === 'Semua') return mainProducts;
        return mainProducts.filter(p => p.category === selectedCategory);
    }, [mainProducts, selectedCategory]);

    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'Semua') return products;
        return products.filter(p => p.category === selectedCategory);
    }, [products, selectedCategory]);

    const openBrandDetail = (brand) => {
        setSelectedBrandDetail(brand);
        setActiveGalleryImage(brand.image); // Start with main image
    };

    return (
        <MainLayout>
            <Head title="Koleksi Kami - Master Cerutu & Kopi" />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center overflow-hidden text-left">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
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
                            <h1 className="text-4xl md:text-7xl font-bold text-gold uppercase tracking-tighter italic">Koleksi Kami</h1>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <button 
                                onClick={() => setSelectedCategory('Semua')}
                                className={`px-8 py-3 border text-[10px] uppercase font-bold tracking-widest bg-hitam-pekat/40 backdrop-blur-md transition-all duration-300 ${
                                    selectedCategory === 'Semua' 
                                    ? 'border-gold text-gold ring-1 ring-gold/20' 
                                    : 'border-gold-tua/20 text-gold-muda/40 hover:border-gold hover:text-gold'
                                }`}
                            >
                                Semua
                            </button>
                            {categories.map((cat) => (
                                <button 
                                    key={cat.id} 
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`px-8 py-3 border text-[10px] uppercase font-bold tracking-widest bg-hitam-pekat/40 backdrop-blur-md transition-all duration-300 ${
                                        selectedCategory === cat.name 
                                        ? 'border-gold text-gold ring-1 ring-gold/20' 
                                        : 'border-gold-tua/20 text-gold-muda/40 hover:border-gold hover:text-gold'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Brand Section - Filtered but Original Design */}
            {filteredMainProducts && filteredMainProducts.length > 0 && (
                <section className="py-24 bg-coklat-kopi/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="space-y-40">
                            {filteredMainProducts.map((brand, idx) => (
                                <div key={brand.id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 group/brand`}>
                                    <div 
                                        className="w-full md:w-1/2 relative group cursor-pointer active:scale-95 transition-transform duration-300"
                                        onClick={() => openBrandDetail(brand)}
                                    >
                                        <div className="aspect-[16/9] overflow-hidden border border-gold/20 shadow-2xl relative translate-z-0">
                                            {brand.image ? (
                                                <img src={`/storage/${brand.image}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={brand.name} />
                                            ) : (
                                                <div className="w-full h-full bg-coklat-tua flex items-center justify-center text-gold/20 font-black italic text-6xl">MASTER</div>
                                            )}
                                            {/* Hover Overlay Visual Hint */}
                                            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="px-6 py-2 bg-hitam-pekat/60 backdrop-blur-sm border border-gold/30 text-gold font-black uppercase text-[8px] tracking-[0.4em] translate-y-4 group-hover:translate-y-0 transition-transform">Lihat Detail Koleksi</div>
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-gold/30 hidden md:block -z-10 group-hover:scale-110 transition-transform duration-700"></div>
                                    </div>
                                    <div className="w-full md:w-1/2 space-y-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-px bg-gold/50"></div>
                                            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-black italic">Signature Brand</span>
                                        </div>
                                        <h2 className="text-4xl md:text-7xl font-black text-gold uppercase tracking-tighter italic leading-none">{brand.name}</h2>
                                        <p className="text-cream-gold/60 text-lg leading-relaxed font-light whitespace-pre-wrap line-clamp-4">
                                            {brand.description}
                                        </p>
                                        <div className="pt-6">
                                            <button 
                                                onClick={() => openBrandDetail(brand)}
                                                className="text-gold font-black uppercase text-[10px] tracking-[0.3em] flex items-center space-x-4 group/btn"
                                            >
                                                <span>Lihat Detail</span>
                                                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Product Grid */}
            <section className="py-12 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="group relative bg-coklat-kopi/10 border border-gold-tua/10 p-1 overflow-hidden transition-all duration-500 hover:border-gold/30">
                                <div className="aspect-square bg-coklat-tua relative overflow-hidden">
                                    {product.image ? (
                                        <img 
                                            src={`/storage/${product.image}`} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                            alt={product.name} 
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-1/2 h-1/2 border-2 border-gold/10 rounded-full animate-pulse-slow flex items-center justify-center">
                                                <span className="text-gold-tua/20 font-bold text-4xl uppercase">{product.category ? product.category[0] : 'P'}</span>
                                            </div>
                                        </div>
                                    )}
                                    {product.tag && (
                                        <div className="absolute top-4 left-4 bg-gold px-3 py-1 text-[10px] uppercase font-black tracking-tighter text-hitam-pekat">
                                            {product.tag}
                                        </div>
                                    )}
                                    {/* Hover Action */}
                                    <div className="absolute inset-0 bg-hitam-pekat/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-sm">
                                        <div className="flex flex-col items-center">
                                            <p className="text-gold uppercase tracking-widest text-[10px] font-bold mb-4">Pesan Sekarang</p>
                                            <p className="text-cream-gold text-sm mb-8 leading-relaxed font-light italic">"{product.desc}"</p>
                                            <Link href={route('sale.index')} className="flex items-center space-x-3 px-8 py-4 bg-gold text-hitam-pekat font-black uppercase text-[10px] tracking-widest hover:bg-gold-muda transition-all shadow-xl shadow-gold/20 active:scale-95">
                                                <span>Pilih Menu</span>
                                                <PlusIcon className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gold uppercase tracking-[0.2em] text-[10px] mb-2 font-bold italic">{product.category}</p>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-cream-gold font-bold text-xl uppercase tracking-tighter italic">{product.name}</h3>
                                        <span className="text-gold font-bold text-xl tracking-tighter">{product.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Detail Modal with Shadow & No Backdrop Background */}
            {selectedBrandDetail && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Transparent Click-to-Close Overlay */}
                    <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedBrandDetail(null)}></div>
                    
                    {/* Modal Container with Heavy Shadow */}
                    <div className="relative bg-coklat-kopi border border-gold/20 max-w-6xl w-full max-h-[90vh] overflow-y-auto no-scrollbar group shadow-[0_30px_100px_rgba(0,0,0,0.6)] animate-fade-in-scale">
                        <button 
                            onClick={() => setSelectedBrandDetail(null)}
                            className="absolute top-6 right-6 z-20 p-1.5 text-gold/40 hover:text-gold transition-colors bg-hitam-pekat/60 backdrop-blur-md rounded-lg shadow-xl border border-gold/10"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                        
                        <div className="flex flex-col lg:flex-row">
                            {/* Visual Side & Gallery Swiper */}
                            <div className="w-full lg:w-3/5 bg-black flex flex-col min-h-[400px]">
                                <div className="flex-1 aspect-[16/10] overflow-hidden relative">
                                    <img 
                                        key={activeGalleryImage}
                                        src={`/storage/${activeGalleryImage}`} 
                                        className="w-full h-full object-cover animate-fade-in" 
                                        alt={selectedBrandDetail.name} 
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent pointer-events-none"></div>
                                </div>
                                
                                {/* Thumbnails */}
                                {selectedBrandDetail.gallery && selectedBrandDetail.gallery.length > 0 && (
                                    <div className="p-6 bg-black/40 backdrop-blur-md flex items-center space-x-3 overflow-x-auto no-scrollbar pb-8 shrink-0">
                                        <button 
                                            onClick={() => setActiveGalleryImage(selectedBrandDetail.image)}
                                            className={`w-20 h-20 shrink-0 border-2 transition-all duration-300 overflow-hidden ${activeGalleryImage === selectedBrandDetail.image ? 'border-gold scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                                        >
                                            <img src={`/storage/${selectedBrandDetail.image}`} className="w-full h-full object-cover" alt="Main" />
                                        </button>
                                        {selectedBrandDetail.gallery.map((img, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => setActiveGalleryImage(img)}
                                                className={`w-20 h-20 shrink-0 border-2 transition-all duration-300 overflow-hidden ${activeGalleryImage === img ? 'border-gold scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'border-white/10 opacity-50 hover:opacity-100'}`}
                                            >
                                                <img src={`/storage/${img}`} className="w-full h-full object-cover" alt="" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Info Side */}
                            <div className="w-full lg:w-2/5 p-8 lg:p-14 flex flex-col justify-center bg-coklat-kopi relative">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-12 h-px bg-gold/50"></div>
                                    <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-black italic">Collection Detail</span>
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black text-gold uppercase tracking-tighter italic mb-8 leading-none">
                                    {selectedBrandDetail.name}
                                </h1>
                                <div className="space-y-6 mb-12">
                                    <div className="inline-block px-4 py-2 border border-gold/10 bg-hitam-pekat/40 text-gold uppercase tracking-[0.3em] font-bold text-[9px]">
                                        Category: {selectedBrandDetail.category}
                                    </div>
                                    <p className="text-cream-gold/80 text-lg leading-relaxed font-light whitespace-pre-wrap italic">
                                        "{selectedBrandDetail.description}"
                                    </p>
                                </div>
                                <Link 
                                    href={route('sale.index')} 
                                    className="inline-flex items-center space-x-6 px-10 py-5 bg-gold text-hitam-pekat font-black uppercase text-[10px] tracking-[0.4em] hover:bg-gold-muda transition-all w-fit shadow-xl shadow-gold/10 active:scale-95"
                                >
                                    <span>Pesan Brand Ini</span>
                                    <ArrowRightIcon className="w-5 h-5" />
                                </Link>
                                
                                {/* Aesthetic Decoration */}
                                <div className="absolute bottom-10 right-10 opacity-5 pointer-events-none">
                                    <ShoppingBagIcon className="w-32 h-32 text-gold stroke-1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
