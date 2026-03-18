import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm } from '@inertiajs/react';
import {
    ShoppingBagIcon,
    SparklesIcon,
    MapPinIcon,
    CheckCircleIcon,
    ArrowLeftIcon,
    TagIcon,
    ShoppingCartIcon,
    XMarkIcon,
    InformationCircleIcon,
    ClipboardDocumentCheckIcon,
    UserIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Index({ saleItems = [] }) {
    const [view, setView] = useState('selection'); // selection, retail, package, point-corner
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedPointOption, setSelectedPointOption] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = [
        {
            id: 'retail',
            name: 'Retail / Eceran',
            description: 'Beli paket eceran dengan harga terjangkau.',
            icon: ShoppingBagIcon,
            color: 'from-gold/20 to-transparent'
        },
        {
            id: 'package',
            name: 'Paket Change',
            description: 'Pilih paket eksklusif Sultan atau Bamsroed.',
            icon: SparklesIcon,
            color: 'from-coklat-kopi/40 to-transparent'
        },
        {
            id: 'point-corner',
            name: 'Point Corner',
            description: 'Layanan Semi Bold & Full Facility.',
            icon: MapPinIcon,
            color: 'from-gold-muda/20 to-transparent'
        }
    ];

    const retailProducts = saleItems.filter(item => item.category === 'Retail');
    const packageItems = saleItems.filter(item => item.category === 'Package');
    const pointCornerOptions = saleItems.filter(item => item.category === 'Point Corner');

    const currentCategory = categories.find(c => c.id === view);

    const handleBack = () => {
        setSelectedProduct(null);
        setSelectedPointOption(null);
        setIsModalOpen(false);
        setView('selection');
    };

    const openRetailForm = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const openPointForm = (option) => {
        setSelectedPointOption(option);
        setIsModalOpen(true);
    };

    const openPackageForm = (type) => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <MainLayout>
            <Head title="SALE CENTER - Master Cerutu & Kopi" />

            {/* Hero Section */}
            <section className="relative h-[45vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/hero.png"
                        alt="Sale Center"
                        className="w-full h-full object-cover brightness-[0.4] grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-hitam-pekat via-hitam-pekat/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <TagIcon className="w-6 h-6 text-gold stroke-1" />
                                <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold underline decoration-gold-tua underline-offset-8">Marketplace</span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-bold text-gold uppercase tracking-tighter">
                                {view === 'selection' ? 'SALE CENTER' : currentCategory?.name}
                            </h1>
                        </div>
                        {view !== 'selection' ? (
                            <button
                                onClick={handleBack}
                                className="flex items-center space-x-3 px-8 py-4 border border-gold/20 bg-hitam-pekat/40 backdrop-blur-md text-gold font-bold uppercase text-[10px] tracking-widest hover:border-gold hover:bg-gold hover:text-hitam-pekat transition-all duration-300"
                            >
                                <ArrowLeftIcon className="w-4 h-4" />
                                <span>Kembali ke Pilihan</span>
                            </button>
                        ) : (
                            <a
                                href={route('sale.tracking')}
                                className="flex items-center space-x-3 px-8 py-4 border border-gold bg-gold/10 backdrop-blur-md text-gold font-bold uppercase text-[10px] tracking-widest hover:bg-gold hover:text-hitam-pekat transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                            >
                                <ClipboardDocumentCheckIcon className="w-4 h-4" />
                                <span>Lacak Pesanan</span>
                            </a>
                        )}
                    </div>
                </div>
            </section>

            <div className="py-24 bg-hitam-pekat min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {view === 'selection' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    onClick={() => setView(cat.id)}
                                    className={`group relative bg-gradient-to-br ${cat.color} border border-gold-tua/10 p-8 rounded-2xl cursor-pointer hover:border-gold/40 transition-all duration-500 overflow-hidden shadow-2xl shadow-black/50`}
                                >
                                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <cat.icon className="w-32 h-32 text-gold" />
                                    </div>
                                    <cat.icon className="w-12 h-12 text-gold mb-6 group-hover:scale-110 transition-transform duration-500" />
                                    <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">{cat.name}</h3>
                                    <p className="text-cream-gold/60 mb-8 max-w-xs">{cat.description}</p>
                                    <div className="flex items-center space-x-2 text-gold text-[10px] font-black uppercase tracking-[0.3em]">
                                        <span>Buka Layanan</span>
                                        <span className="w-8 h-px bg-gold/30 group-hover:w-16 transition-all duration-500"></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {view === 'retail' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up">
                            {retailProducts.map((p) => (
                                <div key={p.id} className="bg-coklat-kopi/10 border border-gold-tua/10 p-4 rounded-xl group hover:border-gold/30 transition-all transition-transform duration-500 hover:-translate-y-2">
                                    <div className="aspect-[4/5] bg-coklat-tua rounded-lg overflow-hidden mb-6 relative">
                                        <img src={p.image ? `/storage/${p.image}` : '/images/hero.png'} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500" alt={p.name} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-hitam-pekat via-transparent to-transparent opacity-60"></div>
                                    </div>
                                    <h4 className="text-white font-bold text-lg mb-1">{p.name}</h4>
                                    <p className="text-gold font-bold mb-4">Rp {p.price.toLocaleString()}</p>
                                    <button
                                        onClick={() => openRetailForm(p)}
                                        className="w-full py-3 bg-transparent border border-gold text-gold text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-hitam-pekat transition-all"
                                    >
                                        Langsung Beli
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {view === 'package' && (
                        <PackageSelection items={packageItems} onSelect={(item) => { setSelectedProduct(item); setIsModalOpen(true); }} />
                    )}

                    {view === 'point-corner' && (
                        <PointCornerSelection items={pointCornerOptions} onSelect={openPointForm} />
                    )}

                </div>
            </div>

            {/* Modal Overlay - SUGOI Layout */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
                    {/* Left Column - Poster */}
                    <div className="lg:w-2/5 relative overflow-hidden">
                        <img
                            src={view === 'retail' ? (selectedProduct?.image ? `/storage/${selectedProduct.image}` : '/images/hero.png') : '/images/hero.png'}
                            className="w-full h-full object-cover brightness-[0.6] grayscale-[0.3]"
                            alt="Order Preview"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-hitam-pekat/20 to-hitam-pekat"></div>
                        <div className="absolute bottom-12 left-12 right-12 z-10">
                            <h2 className="text-gold text-4xl font-black italic tracking-tighter leading-none mb-4 uppercase">
                                {view === 'retail' ? selectedProduct?.name : (selectedPointOption?.name || 'SPECIAL PACKAGE')}
                            </h2>
                            <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em]">Master Cigars & Coffee</p>
                            <div className="w-12 h-1 bg-gold mt-6"></div>
                        </div>
                    </div>

                    {/* Right Column - Content/Form */}
                    <div className="lg:w-3/5 p-10 lg:p-14 overflow-y-auto custom-scrollbar">
                        <div className="mb-10 flex justify-between items-start">
                            <div>
                                <h4 className="text-gold text-[10px] font-black uppercase tracking-[0.4em] mb-2 flex items-center">
                                    <InformationCircleIcon className="w-3 h-3 mr-2" />
                                    Detail Pendaftaran
                                </h4>
                                <p className="text-white font-bold uppercase tracking-widest text-xs opacity-40">Online System (Realtime Processing)</p>
                            </div>
                        </div>

                        {/* Description Box with Border Accent */}
                        <div className="pl-6 border-l-4 border-gold/30 mb-10">
                            <p className="text-cream-gold/80 text-sm leading-relaxed italic">
                                {view === 'retail' ? selectedProduct?.desc :
                                    view === 'point-corner' ? `Layanan ${selectedPointOption?.name} dirancang khusus untuk memberikan pengalaman visual dan kenyamanan terbaik bagi member Master Cigars & Coffee.` :
                                        "Nikmati perpaduan eksklusif antara cerutu premium dan kopi artisanal pilihan dalam satu paket Sultan atau Bamsroed."}
                            </p>
                        </div>

                        {/* Info Grids - SUGOI Style */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                                <span className="text-gold text-[9px] font-black uppercase tracking-widest block mb-2 opacity-50">Kategori</span>
                                <p className="text-white text-xs font-bold uppercase tracking-tight">
                                    {view === 'retail' ? 'Produk Eceran' : view === 'point-corner' ? selectedPointOption?.name : 'Paket Eksklusif'}
                                </p>
                            </div>
                            <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                                <span className="text-gold text-[9px] font-black uppercase tracking-widest block mb-2 opacity-50">Benefit</span>
                                <p className="text-white text-xs font-bold uppercase tracking-tight">
                                    {view === 'retail' ? 'Premium Quality & Fast Delivery' : 'Full Support & Exclusive Access'}
                                </p>
                            </div>
                        </div>

                        {/* Order Flow - SUGOI Style Steps */}
                        <div className="mb-12">
                            <h4 className="text-white/30 text-[9px] font-black uppercase tracking-[0.3em] mb-6">Alur Pembelian</h4>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {[
                                    { step: 1, label: 'Registrasi' },
                                    { step: 2, label: 'Pembayaran' },
                                    { step: 3, label: 'Verifikasi' },
                                    { step: 4, label: 'Pengiriman' }
                                ].map((item) => (
                                    <div key={item.step} className="bg-white/5 p-3 rounded-lg border border-white/5 flex items-center space-x-3 group hover:border-gold/20 transition-all">
                                        <span className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center text-[10px] font-black border border-gold/20 group-hover:bg-gold group-hover:text-hitam-pekat transition-colors">
                                            {item.step}
                                        </span>
                                        <span className="text-[9px] text-white/50 font-black uppercase tracking-tighter truncate">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Person Box */}
                        <div className="bg-gold/10 border border-gold/20 p-5 rounded-xl flex items-center space-x-4 mb-12">
                            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                                <ChatBubbleLeftRightIcon className="w-5 h-5 text-hitam-pekat" />
                            </div>
                            <div>
                                <span className="text-gold text-[9px] font-black uppercase tracking-widest block opacity-60">Admin Support</span>
                                <p className="text-white text-xs font-bold font-mono tracking-widest">Master Support - 0812 3456 7890</p>
                            </div>
                        </div>

                        {/* Form Integration */}
                        <div className="mt-16 border-t border-white/5 pt-12">
                            <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Pilih & Isi Data</h3>
                            {view === 'retail' && selectedProduct && <RetailForm product={selectedProduct} />}
                            {view === 'package' && selectedProduct && <PackageForm item={selectedProduct} />}
                            {view === 'point-corner' && selectedPointOption && <PointCornerForm option={selectedPointOption} />}
                        </div>
                    </div>
                </div>
            </Modal>
        </MainLayout>
    );
}

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 lg:p-10">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-hitam-pekat/95 backdrop-blur-md animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="relative bg-[#111111] border border-white/10 w-full lg:max-w-6xl h-full lg:h-[85vh] overflow-hidden lg:rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] animate-modal-in flex flex-col">
                {/* Close Button UI - SUGOI Style */}
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 z-[110] bg-white/10 p-4 rounded-full text-white/40 hover:text-gold hover:bg-white/20 transition-all border border-white/5"
                >
                    <XMarkIcon className="w-8 h-8" />
                </button>
                {children}
            </div>
        </div>
    );
}

function RetailForm({ product }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        foto_produk: null,
        harga: product?.price || '',
        jumlah_beli: 1,
        nama_lengkap: '',
        alamat_lengkap: '',
        nomor_whatsapp: '',
        pilihan_pengiriman: 'JNE',
        metode_pembayaran: 'Transfer Bank',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sale.retail.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup label="Jumlah Beli" error={errors.jumlah_beli}>
                    <input
                        type="number"
                        value={data.jumlah_beli}
                        onChange={e => setData('jumlah_beli', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold outline-none"
                    />
                </FormGroup>
                <FormGroup label="Nama Lengkap" error={errors.nama_lengkap}>
                    <input
                        type="text"
                        value={data.nama_lengkap}
                        onChange={e => setData('nama_lengkap', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold outline-none"
                    />
                </FormGroup>
            </div>

            <FormGroup label="Nomor WhatsApp" error={errors.nomor_whatsapp}>
                <input
                    type="text"
                    value={data.nomor_whatsapp}
                    onChange={e => setData('nomor_whatsapp', e.target.value)}
                    placeholder="628xxx"
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold outline-none"
                />
            </FormGroup>

            <FormGroup label="Alamat Lengkap" error={errors.alamat_lengkap}>
                <textarea
                    rows="2"
                    value={data.alamat_lengkap}
                    onChange={e => setData('alamat_lengkap', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold outline-none resize-none"
                ></textarea>
            </FormGroup>

            <div className="p-5 bg-gold/5 border border-gold/10 rounded-xl flex justify-between items-center">
                <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Total Bayar</span>
                <span className="text-gold text-lg font-black tracking-tight">Rp {(data.harga * data.jumlah_beli).toLocaleString()}</span>
            </div>

            <button
                disabled={processing}
                className="w-full py-5 bg-gold shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)] text-hitam-pekat font-black uppercase tracking-[0.4em] text-[10px] transform hover:-translate-y-1 transition-all duration-300"
            >
                Submit Pendaftaran
            </button>
        </form>
    );
}

function PackageSelection({ items, onSelect }) {
    if (items.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {['Sultan', 'Bamsroed'].map((type) => (
                    <div
                        key={type}
                        onClick={() => onSelect({ name: type, price: 0, category: 'Package' })}
                        className="group relative border border-gold-tua/10 bg-coklat-kopi/5 p-12 rounded-2xl cursor-pointer hover:border-gold hover:scale-[1.02] transition-all duration-500 overflow-hidden"
                    >
                        <h3 className="text-3xl font-bold text-gold tracking-tighter uppercase mb-2">{type}</h3>
                        <p className="text-gold-muda/40 text-[10px] uppercase tracking-widest font-black mb-10">Premium Choice</p>
                        <div className="space-y-4 mb-16">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center space-x-3">
                                    <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                                    <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Master Quality Guarantee</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-gold transition-colors">
                            Klik untuk Memilih
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {items.map((item) => (
                <div
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className="group relative border border-gold-tua/10 bg-coklat-kopi/5 p-12 rounded-2xl cursor-pointer hover:border-gold hover:scale-[1.02] transition-all duration-500 overflow-hidden"
                >
                    <h3 className="text-3xl font-bold text-gold tracking-tighter uppercase mb-2">{item.name}</h3>
                    <p className="text-gold-muda/40 text-[10px] uppercase tracking-widest font-black mb-10">Rp {parseFloat(item.price).toLocaleString()}</p>
                    <div className="space-y-4 mb-16">
                        <p className="text-white/50 text-[10px] font-bold uppercase leading-relaxed">{item.description}</p>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-gold transition-colors">
                        Klik untuk Memilih
                    </div>
                </div>
            ))}
        </div>
    );
}

function PackageForm({ item }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        package_type: item?.name || 'Sultan',
        price: item?.price || 0,
        nama: '',
        whatsapp: '',
        alamat: '',
        metode_pembayaran: 'Transfer Bank',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sale.package.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <FormGroup label="Nama Lengkap" error={errors.nama}>
                <input
                    type="text"
                    value={data.nama}
                    onChange={e => setData('nama', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold outline-none"
                />
            </FormGroup>
            <FormGroup label="Nomor WhatsApp" error={errors.whatsapp}>
                <input
                    type="text"
                    value={data.whatsapp}
                    onChange={e => setData('whatsapp', e.target.value)}
                    placeholder="628xxx"
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold outline-none"
                />
            </FormGroup>
            <FormGroup label="Alamat Lengkap" error={errors.alamat}>
                <textarea
                    rows="2"
                    value={data.alamat}
                    onChange={e => setData('alamat', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold outline-none resize-none"
                ></textarea>
            </FormGroup>
            <button
                disabled={processing}
                className="w-full py-5 bg-gold text-hitam-pekat font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-gold/20"
            >
                Konfirmasi Pendaftaran
            </button>
        </form>
    );
}

function PointCornerSelection({ items, onSelect }) {
    if (items.length === 0) {
        const options = [
            {
                name: 'SEMI BOLD',
                subtitle: 'PROFESSIONAL CHOICE',
                features: ['UNLIMETED FILE', '30 MENIT PEMOTRETRAN', 'REQUEST 10 EDITS PHOTO', 'ALL FILE ON DRIVE'],
            },
            {
                name: 'FULL FACILITY',
                subtitle: 'PREMIUM EXPERIENCE',
                features: ['UNLIMETED FILE', '60 MENIT PEMOTRETRAN', 'SKIN SMOOTH', 'SPLIT TIME 2X', 'ALL FILE ON DRIVE'],
            }
        ];

        return (
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {options.map((opt) => (
                    <div
                        key={opt.name}
                        onClick={() => onSelect(opt)}
                        className="group relative border border-gold-tua/10 bg-coklat-kopi/5 p-12 rounded-2xl cursor-pointer hover:border-gold hover:scale-[1.02] transition-all duration-500 overflow-hidden"
                    >
                        <h3 className="text-3xl font-bold text-gold tracking-tighter uppercase mb-2">{opt.name}</h3>
                        <p className="text-gold-muda/40 text-[10px] uppercase tracking-widest font-black mb-10">{opt.subtitle}</p>
                        <div className="space-y-4 mb-16">
                            {opt.features.slice(0, 3).map(f => (
                                <div key={f} className="flex items-center space-x-3">
                                    <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                                    <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{f}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-gold transition-colors">
                            Klik untuk Memilih
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            {items.map((opt) => (
                <div
                    key={opt.id}
                    onClick={() => onSelect(opt)}
                    className="group relative border border-gold-tua/10 bg-coklat-kopi/5 p-12 rounded-2xl cursor-pointer hover:border-gold hover:scale-[1.02] transition-all duration-500 overflow-hidden"
                >
                    <h3 className="text-3xl font-bold text-gold tracking-tighter uppercase mb-2">{opt.name}</h3>
                    <p className="text-gold-muda/40 text-[10px] uppercase tracking-widest font-black mb-10">Rp {parseFloat(opt.price).toLocaleString()}</p>
                    <div className="space-y-4 mb-16">
                        <p className="text-white/50 text-[10px] font-bold uppercase leading-relaxed">{opt.description}</p>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-gold transition-colors">
                        Klik untuk Memilih
                    </div>
                </div>
            ))}
        </div>
    );
}

function PointCornerForm({ option }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        service_type: option.name,
        price: option.price || 0,
        nama: '',
        whatsapp: '',
        keterangan: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sale.point-corner.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <FormGroup label="Nama Lengkap" error={errors.nama}>
                <input
                    type="text"
                    value={data.nama}
                    onChange={e => setData('nama', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold outline-none"
                />
            </FormGroup>
            <FormGroup label="Nomor WhatsApp" error={errors.whatsapp}>
                <input
                    type="text"
                    value={data.whatsapp}
                    onChange={e => setData('whatsapp', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold outline-none"
                />
            </FormGroup>
            <FormGroup label="Keterangan Tambahan" error={errors.keterangan}>
                <textarea
                    rows="2"
                    value={data.keterangan}
                    onChange={e => setData('keterangan', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold outline-none resize-none"
                ></textarea>
            </FormGroup>
            <button
                disabled={processing}
                className="w-full py-5 bg-gold text-hitam-pekat font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-gold/20"
            >
                Confirm Berlangganan
            </button>
        </form>
    );
}

function FormGroup({ label, children, error }) {
    return (
        <div className="space-y-2">
            <label className="block text-gold-muda text-[9px] uppercase tracking-[0.3em] font-black opacity-60 ml-1">{label}</label>
            {children}
            {error && <div className="text-red-500/80 text-[10px] font-bold uppercase tracking-widest animate-pulse">{error}</div>}
        </div>
    );
}
