import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    ArchiveBoxIcon,
    TagIcon,
    CurrencyDollarIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';

export default function Index({ products, categories }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        category: categories.length > 0 ? categories[0].name : '',
        price: '',
        description: '',
        tag: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            post(route('admin.products.update', editingProduct.id), {
                onSuccess: () => {
                    reset();
                    setEditingProduct(null);
                    setIsAddModalOpen(false);
                },
            });
        } else {
            post(route('admin.products.store'), {
                onSuccess: () => {
                    reset();
                    setIsAddModalOpen(false);
                },
            });
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setData({
            name: product.name,
            category: product.category,
            price: product.price,
            description: product.description || '',
            tag: product.tag || '',
            image: null,
        });
        setIsAddModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Hapus produk ini dari katalog?')) {
            destroy(route('admin.products.destroy', id));
        }
    };

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-2xl text-gold leading-tight tracking-tighter uppercase italic">Product Collection</h2>}
        >
            <Head title="Admin - Products" />

            <div className="py-8 bg-hitam-pekat min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-coklat-kopi/40 to-coklat-tua/40 p-10 rounded-[2.5rem] shadow-2xl border border-gold/10 flex flex-col md:flex-row justify-between items-center gap-6 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] group-hover:bg-gold/10 transition-all duration-1000"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cream-gold to-gold tracking-tight uppercase italic">Static Product Gallery</h3>
                            <p className="text-[10px] text-cream-gold/30 font-black uppercase tracking-[0.3em] mt-2 leading-none">Manage items displayed on the public product page</p>
                        </div>
                        <button
                            onClick={() => { reset(); setEditingProduct(null); setIsAddModalOpen(true); }}
                            className="relative overflow-hidden bg-gold text-hitam-pekat px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(175,146,109,0.3)] flex items-center space-x-3 group/btn"
                        >
                            <PlusIcon className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-500" />
                            <span>Create New Product</span>
                        </button>
                    </div>

                    {/* Products Table */}
                    <div className="bg-coklat-kopi/5 shadow-2xl rounded-[2.5rem] border border-gold/10 overflow-hidden backdrop-blur-xl">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gold/10">
                                <thead>
                                    <tr className="bg-gold/5 backdrop-blur-md">
                                        <th className="px-10 py-8 text-left text-[11px] font-black text-gold/60 uppercase tracking-[0.3em]">Product Details</th>
                                        <th className="px-10 py-8 text-left text-[11px] font-black text-gold/60 uppercase tracking-[0.3em]">Category</th>
                                        <th className="px-10 py-8 text-left text-[11px] font-black text-gold/60 uppercase tracking-[0.3em]">Pricing</th>
                                        <th className="px-10 py-8 text-left text-[11px] font-black text-gold/60 uppercase tracking-[0.3em]">Labels</th>
                                        <th className="px-10 py-8 text-right text-[11px] font-black text-gold/60 uppercase tracking-[0.3em]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gold/10">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gold/[0.03] transition-all duration-300 group">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center space-x-6">
                                                    <div className="w-20 h-20 rounded-[1.5rem] bg-hitam-pekat overflow-hidden border border-gold/20 shadow-2xl shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                                                        {product.image ? (
                                                            <img src={`/storage/${product.image}`} className="w-full h-full object-cover" alt="" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gold/10 font-black text-2xl italic">MC</div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-black text-cream-gold group-hover:text-gold transition-colors tracking-tight">{product.name}</div>
                                                        <div className="text-[10px] text-cream-gold/30 font-black uppercase tracking-widest truncate max-w-[250px] mt-2 leading-none">{product.description || 'No detailed briefing'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <span className="px-4 py-1.5 bg-gold/5 text-gold text-[10px] font-black uppercase tracking-widest rounded-full border border-gold/10 shadow-sm">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="text-xl font-black text-gold tracking-tighter italic">{product.price}</div>
                                            </td>
                                            <td className="px-10 py-8">
                                                {product.tag ? (
                                                    <div className="inline-flex items-center space-x-2 bg-gold/10 text-gold-muda text-[9px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] border border-gold/20 shadow-inner">
                                                        <div className="w-1.5 h-1.5 bg-gold-muda rounded-full animate-pulse"></div>
                                                        <span>{product.tag}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-cream-gold/10 italic text-[10px] font-bold tracking-widest uppercase">Unlabeled</span>
                                                )}
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                                    <button onClick={() => handleEdit(product)} className="p-3 text-cream-gold/40 hover:text-gold hover:bg-gold/10 rounded-2xl border border-transparent hover:border-gold/20 transition-all active:scale-95 shadow-xl"><PencilSquareIcon className="w-5 h-5" /></button>
                                                    <button onClick={() => handleDelete(product.id)} className="p-3 text-cream-gold/40 hover:text-red-500 hover:bg-red-500/10 rounded-2xl border border-transparent hover:border-red-500/20 transition-all active:scale-95 shadow-xl"><TrashIcon className="w-5 h-5" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-hitam-pekat/95 backdrop-blur-3xl animate-fade-in transition-all duration-500">
                    <div className="bg-gradient-to-br from-coklat-kopi to-hitam-pekat rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8),0_0_50px_rgba(175,146,109,0.1)] w-full max-w-2xl overflow-hidden border border-gold/20 transform scale-100 animate-in zoom-in duration-300">
                        <div className="px-10 py-10 border-b border-gold/10 flex justify-between items-center bg-gold/[0.02]">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.3em] text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-muda italic">{editingProduct ? 'Modifikasi Protokol' : 'Entri Data Baru'}</h4>
                                <p className="text-[10px] text-cream-gold/30 font-black uppercase tracking-[0.4em] mt-3 leading-none italic">Lengkapi spesifikasi teknis item di bawah ini</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-14 h-14 rounded-2xl border border-gold/10 flex items-center justify-center text-gold/30 hover:text-gold hover:bg-gold/10 hover:rotate-90 transition-all duration-500 text-2xl font-light">×</button>
                        </div>
                        <form onSubmit={submit} className="p-10 space-y-8">
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gold tracking-[0.3em]">
                                    <ArchiveBoxIcon className="w-4 h-4 text-gold/30" />
                                    <span>Nomenklatur Produk</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gold/10 bg-hitam-pekat p-5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all shadow-inner text-cream-gold placeholder-cream-gold/10"
                                    placeholder="Contoh: Cohiba Behike 56"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-[10px] font-black uppercase mt-1 tracking-[0.2em] italic">{errors.name}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gold tracking-[0.3em]">
                                        <TagIcon className="w-4 h-4 text-gold/30" />
                                        <span>Klasifikasi</span>
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                        className="w-full border-gold/10 bg-hitam-pekat p-5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all shadow-inner text-cream-gold appearance-none"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} className="bg-hitam-pekat text-cream-gold" value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gold tracking-[0.3em]">
                                        <CurrencyDollarIcon className="w-4 h-4 text-gold/30" />
                                        <span>Valuasi Display</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="w-full border-gold/10 bg-hitam-pekat p-5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all shadow-inner text-cream-gold placeholder-cream-gold/10"
                                        placeholder="Contoh: Rp 750rb"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gold tracking-[0.3em]">
                                        <SparklesIcon className="w-4 h-4 text-gold/30" />
                                        <span>Token Identitas</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.tag}
                                        onChange={e => setData('tag', e.target.value)}
                                        className="w-full border-gold/10 bg-hitam-pekat p-5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all shadow-inner text-cream-gold placeholder-cream-gold/10"
                                        placeholder="Contoh: Limited Edition"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gold tracking-[0.3em]">
                                        <PhotoIcon className="w-4 h-4 text-gold/30" />
                                        <span>Aset Visual</span>
                                    </label>
                                    <div className="relative group p-5 border border-dashed border-gold/30 rounded-2xl flex items-center justify-center bg-hitam-pekat/40 hover:bg-gold/5 hover:border-gold/60 transition-all cursor-pointer overflow-hidden shadow-inner">
                                        <input type="file" onChange={e => setData('image', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                                        <div className="text-[10px] font-black uppercase text-gold/40 group-hover:text-gold transition-colors flex items-center space-x-3">
                                            <div className="w-6 h-6 border border-gold/20 rounded-lg flex items-center justify-center text-xs">+</div>
                                            <span>Unggah Representasi Visual</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gold tracking-[0.3em]">
                                    <DocumentTextIcon className="w-4 h-4 text-gold/30" />
                                    <span>Briefing Singkat</span>
                                </label>
                                <textarea
                                    rows="4"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full border-gold/10 bg-hitam-pekat p-5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all shadow-inner resize-none text-cream-gold placeholder-cream-gold/10"
                                    placeholder="Tulis deskripsi teknis atau narasi produk di sini..."
                                ></textarea>
                            </div>

                            <div className="pt-8 flex justify-end items-center space-x-10">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-gold/40 font-black uppercase text-[10px] tracking-[0.4em] hover:text-gold hover:tracking-[0.5em] transition-all duration-300">Batalkan Operasi</button>
                                <button type="submit" disabled={processing} className="px-12 py-5 bg-gold text-hitam-pekat rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.3em] shadow-[0_20px_40px_rgba(175,146,109,0.2)] hover:scale-105 hover:shadow-[0_25px_50px_rgba(175,146,109,0.3)] active:scale-95 transition-all">Submit Protokol</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
