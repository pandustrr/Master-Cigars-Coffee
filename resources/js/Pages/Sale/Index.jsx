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

export default function Index({ saleItems, settings }) {
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
        setSelectedProduct(null);
        setSelectedPointOption(null);
    };

    const handleCloseModal = () => {
        closeModal();
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
                                SALE CENTER
                            </h1>
                        </div>
                        <a
                            href={route('sale.tracking')}
                            className="flex items-center space-x-3 px-8 py-4 border border-gold bg-gold/10 backdrop-blur-md text-gold font-bold uppercase text-[10px] tracking-widest hover:bg-gold hover:text-hitam-pekat transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                        >
                            <ClipboardDocumentCheckIcon className="w-4 h-4" />
                            <span>Lacak Pesanan</span>
                        </a>
                    </div>
                </div>
            </section>

            <div className="py-24 bg-hitam-pekat min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Retail Section */}
                    {retailProducts.length > 0 && (
                        <div className="mb-24">
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-4">Retail / Eceran</h2>
                                <p className="text-gold-muda/60 md:text-lg">Beli produk eceran dengan harga terjangkau dan premium.</p>
                                <div className="w-24 h-1 bg-gold mt-6"></div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 lg:gap-8 animate-fade-in-up w-full">
                                {retailProducts.map((p) => (
                                    <div key={p.id} className="w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(25%-1.5rem)] flex-none bg-[#16120e] border border-white/10 p-3 md:p-4 rounded-xl group hover:border-gold hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between">
                                        <div>
                                            <div className="aspect-[4/5] bg-coklat-tua rounded-lg overflow-hidden mb-4 md:mb-6 relative">
                                                <img src={p.image ? `/storage/${p.image}` : '/images/hero.png'} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500" alt={p.name} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-hitam-pekat via-transparent to-transparent opacity-60"></div>
                                            </div>
                                            <h4 className="text-white font-bold text-sm md:text-lg mb-1 leading-tight">{p.name}</h4>
                                            <p className="text-gold font-bold mb-4 md:mb-6 text-[10px] md:text-sm">Rp {parseFloat(p.price).toLocaleString()}</p>
                                        </div>
                                        <button
                                            onClick={() => openRetailForm(p)}
                                            className="w-full py-2.5 md:py-3 bg-transparent border border-gold text-gold text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:bg-gold hover:text-hitam-pekat transition-all rounded-lg"
                                        >
                                            Beli
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Package Section */}
                    <div className="mb-24">
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-4">Paket Change</h2>
                            <p className="text-gold-muda/60 md:text-lg">Pilih paket eksklusif unggulan kami.</p>
                            <div className="w-24 h-1 bg-gold mt-6"></div>
                        </div>
                        <PackageSelection items={packageItems} onSelect={(item) => { setSelectedProduct(item); setIsModalOpen(true); }} />
                    </div>

                    {/* Point Corner Section */}
                    <div className="mb-12">
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-4">Point Corner</h2>
                            <p className="text-gold-muda/60 md:text-lg">Layanan Semi Bold & Full Facility eksklusif.</p>
                            <div className="w-24 h-1 bg-gold mt-6"></div>
                        </div>
                        <PointCornerSelection items={pointCornerOptions} onSelect={openPointForm} />
                    </div>

                </div>
            </div>

            {/* Modal Overlay - SUGOI Layout */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
                    {/* Left Column - Poster */}
                    <div className="lg:w-2/5 relative overflow-hidden">
                        <img
                            src={selectedProduct?.image ? `/storage/${selectedProduct.image}` : (selectedPointOption?.image ? `/storage/${selectedPointOption.image}` : '/images/hero.png')}
                            className="w-full h-full object-cover brightness-[0.6] grayscale-[0.3]"
                            alt="Order Preview"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-hitam-pekat/20 to-hitam-pekat"></div>
                        <div className="absolute bottom-12 left-12 right-12 z-10">
                            <h2 className="text-gold text-4xl font-black italic tracking-tighter leading-none mb-4 uppercase">
                                {selectedProduct?.name || selectedPointOption?.name || 'SPECIAL PACKAGE'}
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
                                {selectedProduct?.desc || selectedPointOption?.desc || "Deskripsi layanan/produk belum tersedia."}
                            </p>
                        </div>

                        {/* Info Grids - SUGOI Style */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                                <span className="text-gold text-[9px] font-black uppercase tracking-widest block mb-2 opacity-50">Kategori</span>
                                <p className="text-white text-xs font-bold uppercase tracking-tight">
                                    {selectedPointOption ? selectedPointOption?.name : (selectedProduct?.category === 'Retail' ? 'Produk Eceran' : 'Paket Eksklusif')}
                                </p>
                            </div>
                            <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                                <span className="text-gold text-[9px] font-black uppercase tracking-widest block mb-2 opacity-50">Sisa Stok</span>
                                <p className="text-white text-xs font-bold uppercase tracking-tight">
                                    {(() => {
                                        const stock = selectedProduct ? selectedProduct.stock : (selectedPointOption ? selectedPointOption.stock : null);
                                        if (stock !== null && stock !== undefined) {
                                            return stock > 0 ? (
                                                <span className="text-[#00b37e] tracking-widest">{stock} Tersedia</span>
                                            ) : (
                                                <span className="text-red-500 tracking-widest">Habis</span>
                                            );
                                        }
                                        return <span className="text-white/50 tracking-widest">-</span>;
                                    })()}
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
                            {selectedProduct?.category === 'Retail' && <RetailForm product={selectedProduct} onClose={handleCloseModal} settings={settings} />}
                            {selectedPointOption && <PointCornerForm opt={selectedPointOption} onClose={handleCloseModal} settings={settings} />}
                            {!selectedPointOption && selectedProduct?.category === 'Package' && <PackageForm item={selectedProduct} onClose={handleCloseModal} settings={settings} />}
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
        <div className="fixed inset-0 z-100 flex items-center justify-center p-0 lg:p-10">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-transparent animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="relative bg-[#111111] border border-white/10 w-full lg:max-w-5xl h-full lg:h-[80vh] overflow-hidden lg:rounded-3xl shadow-[0_0_150px_rgba(0,0,0,0.95)] shadow-black animate-modal-in flex flex-col">
                {/* Close Button UI - SUGOI Style */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-[110] bg-hitam-pekat/50 backdrop-blur-sm p-3 rounded-full text-white/40 hover:text-gold hover:bg-white/20 transition-all border border-white/10"
                >
                    <XMarkIcon className="w-8 h-8" />
                </button>
                {children}
            </div>
        </div>
    );
}

function RetailForm({ product, onClose, settings }) {
    const { data, setData, post, processing, errors } = useForm({
        foto_produk: null,
        harga: product.price,
        jumlah_beli: 1,
        nama_lengkap: '',
        alamat_lengkap: '',
        nomor_whatsapp: '',
        pilihan_pengiriman: 'JNE',
        metode_pembayaran: 'TRANSFER',
        payment_proof: null,
        sale_item_id: product?.id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sale.retail.store'));
    };

    return (
        <form onSubmit={submit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup label="Jumlah Beli" error={errors.jumlah_beli}>
                    <input
                        type="number"
                        value={data.jumlah_beli}
                        onChange={e => setData('jumlah_beli', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none rounded-xl transition-all"
                    />
                </FormGroup>
                <FormGroup label="Nama Lengkap" error={errors.nama_lengkap}>
                    <input
                        type="text"
                        value={data.nama_lengkap}
                        onChange={e => setData('nama_lengkap', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none rounded-xl transition-all"
                    />
                </FormGroup>
            </div>

            <FormGroup label="Nomor WhatsApp" error={errors.nomor_whatsapp}>
                <input
                    type="text"
                    value={data.nomor_whatsapp}
                    onChange={e => setData('nomor_whatsapp', e.target.value)}
                    placeholder="628xxx"
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none rounded-xl transition-all"
                />
            </FormGroup>

            <FormGroup label="Alamat Lengkap" error={errors.alamat_lengkap}>
                <textarea
                    rows="2"
                    value={data.alamat_lengkap}
                    onChange={e => setData('alamat_lengkap', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none rounded-xl transition-all"
                ></textarea>
            </FormGroup>

            <PaymentInfoBase settings={settings} onFileChange={f => setData('payment_proof', f)} error={errors.payment_proof} />

            <div className="p-5 bg-gold/10 border border-gold/20 rounded-xl flex justify-between items-center shadow-[0_0_20px_rgba(212,175,55,0.05)]">
                <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Total Bayar</span>
                <span className="text-gold text-lg font-black tracking-tight">Rp {(data.harga * data.jumlah_beli).toLocaleString()}</span>
            </div>

            <button
                disabled={processing || !data.payment_proof || product?.stock < 1}
                className="w-full py-5 disabled:opacity-50 border disabled:border-white/10 border-transparent bg-gold disabled:bg-hitam-pekat disabled:text-white/30 shadow-[0_10px_30px_rgba(212,175,55,0.2)] disabled:shadow-none hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)] hover:bg-gold-muda rounded-xl text-hitam-pekat font-black uppercase tracking-[0.4em] text-[10px] transform hover:-translate-y-1 transition-all duration-300"
            >
                {product?.stock < 1 ? 'Stok Habis' : 'Konfirmasi Pembelian'}
            </button>
        </form>
    );
}

function PackageSelection({ items, onSelect }) {
    if (items.length === 0) {
        const options = [
            {
                name: 'Sultan',
                subtitle: 'PROFESSIONAL CHOICE',
                features: ['UNLIMETED FILE', '30 MENIT', '10 EDITS PHOTO', 'DRIVE LINK'],
            },
            {
                name: 'Bamsroed',
                subtitle: 'PREMIUM EXPERIENCE',
                features: ['UNLIMETED FILE', '60 MENIT', 'SKIN SMOOTH', 'DRIVE LINK'],
            }
        ];

        return (
            <div className="flex flex-wrap justify-center gap-4 lg:gap-8 w-full">
                {options.map((type) => (
                    <div
                        key={type.name}
                        onClick={() => onSelect({ name: type.name, price: 0, category: 'Package' })}
                        className="w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(25%-1.5rem)] flex-none group relative border border-white/10 bg-[#16120e] p-5 md:p-8 lg:p-10 rounded-2xl cursor-pointer hover:border-gold hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
                    >
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gold tracking-tighter uppercase mb-1 md:mb-2">{type.name}</h3>
                        <p className="text-gold-muda/50 text-[8px] md:text-[10px] uppercase tracking-widest font-black mb-6 md:mb-10">Premium Choice</p>
                        <div className="space-y-3 md:space-y-4 mb-8 md:mb-16">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center space-x-2 md:space-x-3">
                                    <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-gold rounded-full shrink-0"></span>
                                    <span className="text-white/60 text-[8px] md:text-[10px] font-bold uppercase tracking-widest leading-tight">Master Quality</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto pt-4 w-full">
                            <button className="w-full py-2.5 md:py-3 bg-transparent border border-gold text-gold text-[8px] md:text-[10px] font-black uppercase tracking-widest group-hover:bg-gold group-hover:text-hitam-pekat transition-all rounded-lg">
                                Pilih Paket
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8 w-full">
            {items.map((item) => (
                <div
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className="w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(25%-1.5rem)] flex-none group relative border border-white/10 bg-[#16120e] p-5 md:p-8 lg:p-10 rounded-2xl cursor-pointer hover:border-gold hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
                >
                    <div>
                        <h3 className="text-[16px] md:text-2xl lg:text-3xl font-bold text-gold tracking-tighter uppercase mb-1 md:mb-2 leading-none">{item.name}</h3>
                        <p className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-black mb-4 md:mb-8 font-mono bg-gold/10 inline-block px-2 py-1 rounded">Rp {parseFloat(item.price).toLocaleString()}</p>
                        <div className="space-y-3 md:space-y-4 mb-12 md:mb-16">
                            <p className="text-white/60 text-[8px] md:text-[10px] font-bold uppercase leading-relaxed line-clamp-4">{item.desc}</p>
                        </div>
                    </div>
                    <div className="mt-auto pt-4 w-full">
                        <button className="w-full py-2.5 md:py-3 bg-transparent border border-gold text-gold text-[8px] md:text-[10px] font-black uppercase tracking-widest group-hover:bg-gold group-hover:text-hitam-pekat transition-all rounded-lg">
                            Pilih Paket
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function PackageForm({ item, onClose, settings }) {
    const { data, setData, post, processing, errors } = useForm({
        package_type: item?.name || 'Sultan',
        price: item?.price || 0,
        nama: '',
        whatsapp: '',
        alamat: '',
        metode_pembayaran: 'TRANSFER',
        payment_proof: null,
        sale_item_id: item?.id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sale.package.store'));
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup label="Nama Lengkap" error={errors.nama}>
                    <input
                        type="text"
                        value={data.nama}
                        onChange={e => setData('nama', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none rounded-xl transition-all"
                    />
                </FormGroup>
                <FormGroup label="Nomor WhatsApp" error={errors.whatsapp}>
                    <input
                        type="text"
                        value={data.whatsapp}
                        onChange={e => setData('whatsapp', e.target.value)}
                        placeholder="628xxx"
                        className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none rounded-xl transition-all"
                    />
                </FormGroup>
            </div>
            <FormGroup label="Alamat Lengkap" error={errors.alamat}>
                <textarea
                    rows="2"
                    value={data.alamat}
                    onChange={e => setData('alamat', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none rounded-xl transition-all"
                ></textarea>
            </FormGroup>

            <PaymentInfoBase settings={settings} onFileChange={f => setData('payment_proof', f)} error={errors.payment_proof} />

            <div className="p-5 bg-gold/10 border border-gold/20 rounded-xl flex justify-between items-center shadow-[0_0_20px_rgba(212,175,55,0.05)]">
                <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Biaya Paket</span>
                <span className="text-gold text-lg font-black tracking-tight">Rp {parseFloat(data.price).toLocaleString()}</span>
            </div>

            <button
                disabled={processing || !data.payment_proof || item?.stock < 1}
                className="w-full py-5 disabled:opacity-50 border disabled:border-white/10 border-transparent bg-gold disabled:bg-hitam-pekat disabled:text-white/30 shadow-[0_10px_30px_rgba(212,175,55,0.2)] disabled:shadow-none hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)] hover:bg-gold-muda rounded-xl text-hitam-pekat font-black uppercase tracking-[0.4em] text-[10px] transform hover:-translate-y-1 transition-all duration-300"
            >
                {item?.stock < 1 ? 'Stok Habis' : 'Konfirmasi Pembelian'}
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
                features: ['UNLIMETED FILE', '30 MENIT', '10 EDITS PHOTO', 'DRIVE LINK'],
            },
            {
                name: 'FULL FACILITY',
                subtitle: 'PREMIUM EXPERIENCE',
                features: ['UNLIMETED FILE', '60 MENIT', 'SKIN SMOOTH', 'DRIVE LINK'],
            }
        ];

        return (
            <div className="flex flex-wrap justify-center gap-4 lg:gap-8 w-full">
                {options.map((opt) => (
                    <div
                        key={opt.name}
                        onClick={() => onSelect(opt)}
                        className="w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(25%-1.5rem)] flex-none group relative border border-white/10 bg-[#16120e] p-5 md:p-8 lg:p-10 rounded-2xl cursor-pointer hover:border-gold hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gold tracking-tighter uppercase mb-1 md:mb-2 leading-none">{opt.name}</h3>
                            <p className="text-gold-muda/50 text-[8px] md:text-[10px] uppercase tracking-widest font-black mb-6 md:mb-10">{opt.subtitle}</p>
                            <div className="space-y-3 md:space-y-4 mb-12 md:mb-16">
                                {opt.features.map(f => (
                                    <div key={f} className="flex items-start space-x-2 md:space-x-3">
                                        <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-gold rounded-full shrink-0 mt-1 md:mt-1.5"></span>
                                        <span className="text-white/60 text-[8px] md:text-[10px] font-bold uppercase tracking-widest leading-tight">{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-auto pt-4 w-full">
                            <button className="w-full py-2.5 md:py-3 bg-transparent border border-gold text-gold text-[8px] md:text-[10px] font-black uppercase tracking-widest group-hover:bg-gold group-hover:text-hitam-pekat transition-all rounded-lg">
                                Pilih Layanan
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8 w-full">
            {items.map((opt) => (
                <div
                    key={opt.id}
                    onClick={() => onSelect(opt)}
                    className="w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(25%-1.5rem)] flex-none group relative border border-white/10 bg-[#16120e] p-5 md:p-8 lg:p-10 rounded-2xl cursor-pointer hover:border-gold hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
                >
                    <div>
                        <h3 className="text-[16px] md:text-2xl lg:text-3xl font-bold text-gold tracking-tighter uppercase mb-1 md:mb-2 leading-none">{opt.name}</h3>
                        <p className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-black mb-4 md:mb-8 font-mono bg-gold/10 inline-block px-2 py-1 rounded">Rp {parseFloat(opt.price).toLocaleString()}</p>
                        <div className="space-y-3 md:space-y-4 mb-12 md:mb-16">
                            <p className="text-white/60 text-[8px] md:text-[10px] font-bold uppercase leading-relaxed line-clamp-4">{opt.desc}</p>
                        </div>
                    </div>
                    <div className="mt-auto pt-4 w-full">
                        <button className="w-full py-2.5 md:py-3 bg-transparent border border-gold text-gold text-[8px] md:text-[10px] font-black uppercase tracking-widest group-hover:bg-gold group-hover:text-hitam-pekat transition-all rounded-lg">
                            Pilih Layanan
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function PointCornerForm({ opt, onClose, settings }) {
    const { data, setData, post, processing, errors } = useForm({
        service_type: opt.name,
        price: opt.price || 0,
        nama: '',
        whatsapp: '',
        keterangan: '',
        payment_proof: null,
        sale_item_id: opt?.id,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sale.point-corner.store'));
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormGroup label="Nama Lengkap" error={errors.nama}>
                    <input
                        type="text"
                        value={data.nama}
                        onChange={e => setData('nama', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none rounded-xl transition-all"
                    />
                </FormGroup>
                <FormGroup label="Nomor WhatsApp" error={errors.whatsapp}>
                    <input
                        type="text"
                        value={data.whatsapp}
                        onChange={e => setData('whatsapp', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none rounded-xl transition-all"
                    />
                </FormGroup>
            </div>
            <FormGroup label="Keterangan Tambahan" error={errors.keterangan}>
                <textarea
                    rows="2"
                    value={data.keterangan}
                    onChange={e => setData('keterangan', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-4 text-white text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none rounded-xl transition-all"
                ></textarea>
            </FormGroup>

            <PaymentInfoBase settings={settings} onFileChange={f => setData('payment_proof', f)} error={errors.payment_proof} />

            <div className="p-5 bg-gold/10 border border-gold/20 rounded-xl flex justify-between items-center shadow-[0_0_20px_rgba(212,175,55,0.05)]">
                <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Total Bayar</span>
                <span className="text-gold text-lg font-black tracking-tight">Rp {parseFloat(data.price).toLocaleString()}</span>
            </div>

            <button
                disabled={processing || !data.payment_proof || opt?.stock < 1}
                className="w-full py-5 disabled:opacity-50 border disabled:border-white/10 border-transparent bg-gold disabled:bg-hitam-pekat disabled:text-white/30 shadow-[0_10px_30px_rgba(212,175,55,0.2)] disabled:shadow-none hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)] hover:bg-gold-muda rounded-xl text-hitam-pekat font-black uppercase tracking-[0.4em] text-[10px] transform hover:-translate-y-1 transition-all duration-300"
            >
                {opt?.stock < 1 ? 'Stok Habis' : 'Konfirmasi Pembelian'}
            </button>
        </form>
    );
}

function PaymentInfoBase({ settings, onFileChange, error }) {
    return (
        <div className="mt-8 mb-4 border border-white/5 rounded-2xl p-5 bg-[#171410]">
            <h4 className="text-gold text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mr-2"></span>
                Instruksi Pembayaran
            </h4>
            
            <div className="space-y-4">
                {/* Bank Accounts */}
                {settings?.bank_accounts && settings.bank_accounts.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {settings.bank_accounts.map((bank, index) => (
                            <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col hover:border-gold/30 transition-colors">
                                <span className="text-[10px] font-bold text-gray-400 mb-1">{bank.bank}</span>
                                <span className="text-sm md:text-base font-black text-white font-mono tracking-wider">{bank.norek}</span>
                                <span className="text-[9px] uppercase tracking-widest text-gold mt-1">A.N {bank.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* QRIS */}
                {settings?.qris_image && (
                    <div className="mt-4 border border-white/10 bg-white/5 p-4 rounded-xl flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Pindai QRIS</span>
                        <div className="bg-white p-2 rounded-xl">
                            <img src={`/storage/${settings.qris_image}`} alt="QRIS" className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg" />
                        </div>
                    </div>
                )}

                {/* File Upload Component */}
                <div className="pt-2">
                    <FormGroup label="Unggah Bukti Transfer (Wajib)" error={error}>
                        <div className="relative">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={e => {
                                    const file = e.target.files[0];
                                    if(file) onFileChange(file);
                                }}
                                className="w-full bg-black/40 border border-white/10 p-2 pl-3 pb-2 text-white/80 text-[10px] rounded-xl cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[9px] file:font-black file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all outline-none focus:border-gold"
                            />
                        </div>
                    </FormGroup>
                </div>
            </div>
        </div>
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
