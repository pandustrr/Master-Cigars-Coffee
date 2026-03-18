import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import {
    ShoppingBagIcon,
    PlusIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    ArrowLongRightIcon as ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Product({ products, mainProducts, categories }) {
    const { settings } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    
    const heroImage = settings.hero_products ? `/storage/${settings.hero_products}` : '/images/hero.png';

    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'Semua') return products;
        return products.filter(p => p.category === selectedCategory);
    }, [products, selectedCategory]);

    return (
        <MainLayout>
            <Head title="Koleksi Kami - Master Cerutu & Kopi" />

            {/* Hero Section */}
            <section className="relative h-[45vh] flex items-center overflow-hidden">
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
                            <h1 className="text-4xl md:text-7xl font-bold text-gold uppercase tracking-tighter">Koleksi Kami</h1>
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

            {/* Main Brand Section */}
            {mainProducts && mainProducts.length > 0 && (
                <section className="py-24 bg-coklat-kopi/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="space-y-24">
                            {mainProducts.map((brand, idx) => (
                                <div key={brand.id} className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}>
                                    <div className="w-full md:w-1/2 relative group">
                                        <div className="aspect-[16/9] overflow-hidden border border-gold/20 shadow-2xl">
                                            {brand.image ? (
                                                <img src={`/storage/${brand.image}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={brand.name} />
                                            ) : (
                                                <div className="w-full h-full bg-coklat-tua flex items-center justify-center text-gold/20 font-black italic text-6xl">MASTER</div>
                                            )}
                                        </div>
                                        <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-gold/30 hidden md:block"></div>
                                    </div>
                                    <div className="w-full md:w-1/2 space-y-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-px bg-gold/50"></div>
                                            <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-black italic">Signature Brand</span>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-black text-gold uppercase tracking-tighter italic leading-none">{brand.name}</h2>
                                        <p className="text-cream-gold/60 text-lg leading-relaxed font-light whitespace-pre-wrap">
                                            {brand.description}
                                        </p>
                                        <div className="pt-6">
                                            <Link href={route('sale.index')} className="text-gold font-black uppercase text-[10px] tracking-[0.3em] flex items-center space-x-4 group/btn">
                                                <span>Pesan Dari Brand Ini</span>
                                                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                                            </Link>
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
                                            <p className="text-cream-gold text-sm mb-8 leading-relaxed font-light">{product.desc}</p>
                                            <Link href={route('sale.index')} className="flex items-center space-x-3 px-8 py-4 bg-gold text-hitam-pekat font-black uppercase text-[10px] tracking-widest hover:bg-gold-muda transition-all">
                                                <span>Pilih Menu</span>
                                                <PlusIcon className="w-4 h-4" />
                                            </Link>
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
