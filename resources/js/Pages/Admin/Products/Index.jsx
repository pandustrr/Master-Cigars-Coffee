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
    PhotoIcon,
    SparklesIcon,
    DocumentTextIcon
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

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Header Section */}
                    <div className="bg-white p-10 rounded-4xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full blur-[80px] group-hover:bg-gray-100 transition-all duration-1000"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black text-gray-800 tracking-tight uppercase italic">Static Product Gallery</h3>
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-2 leading-none">Manage items displayed on the public product page</p>
                        </div>
                        <button
                            onClick={() => { reset(); setEditingProduct(null); setIsAddModalOpen(true); }}
                            className="relative overflow-hidden bg-gold text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-md flex items-center space-x-3 group/btn"
                        >
                            <PlusIcon className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-500" />
                            <span>Create New Product</span>
                        </button>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white shadow-sm rounded-4xl border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead>
                                    <tr className="bg-gray-50/80">
                                        <th className="px-10 py-6 text-left text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Product Details</th>
                                        <th className="px-10 py-6 text-left text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Category</th>
                                        <th className="px-10 py-6 text-left text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Pricing</th>
                                        <th className="px-10 py-6 text-left text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Labels</th>
                                        <th className="px-10 py-6 text-right text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition-all duration-300 group">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center space-x-6">
                                                    <div className="w-20 h-20 rounded-3xl bg-gray-50 overflow-hidden border border-gray-200 shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                                                        {product.image ? (
                                                            <img src={`/storage/${product.image}`} className="w-full h-full object-cover" alt="" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-300 font-black text-2xl italic">MC</div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-black text-gray-800 transition-colors tracking-tight uppercase">{product.name}</div>
                                                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest truncate max-w-[250px] mt-2 leading-none">{product.description || 'No detailed briefing'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <span className="px-4 py-1.5 bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-200">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="text-xl font-black text-gold tracking-tighter italic">{product.price}</div>
                                            </td>
                                            <td className="px-10 py-6">
                                                {product.tag ? (
                                                    <div className="inline-flex items-center space-x-2 bg-gold/10 text-gold-muda text-[9px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] border border-gold/20">
                                                        <div className="w-1.5 h-1.5 bg-gold-muda rounded-full animate-pulse"></div>
                                                        <span>{product.tag}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-300 italic text-[10px] font-bold tracking-widest uppercase">Unlabeled</span>
                                                )}
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                                    <button onClick={() => handleEdit(product)} className="p-3 text-gray-400 hover:text-gold hover:bg-gold/5 rounded-2xl transition-all active:scale-95"><PencilSquareIcon className="w-5 h-5" /></button>
                                                    <button onClick={() => handleDelete(product.id)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-95"><TrashIcon className="w-5 h-5" /></button>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-gray-900/40 backdrop-blur-sm animate-fade-in transition-all duration-500">
                    <div className="absolute inset-0" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 transform scale-100 animate-in zoom-in duration-300">
                        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.2em] text-xl text-gray-800 italic">{editingProduct ? 'Modifikasi Protokol' : 'Entri Data Baru'}</h4>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1.5 leading-none italic">Lengkapi spesifikasi teknis item di bawah ini</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-all text-xl font-light">&times;</button>
                        </div>
                        <form onSubmit={submit} className="p-8 md:p-10 space-y-6">
                            <div className="space-y-2">
                                <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">
                                    <ArchiveBoxIcon className="w-4 h-4 text-gray-400" />
                                    <span>Nomenklatur Produk</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gray-200 bg-gray-50 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-gray-800 placeholder-gray-400"
                                    placeholder="Contoh: Cohiba Behike 56"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-[10px] font-black uppercase mt-1 tracking-[0.1em] italic">{errors.name}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">
                                        <TagIcon className="w-4 h-4 text-gray-400" />
                                        <span>Klasifikasi</span>
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                        className="w-full border-gray-200 bg-gray-50 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-gray-800"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} className="bg-white text-gray-800" value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">
                                        <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                                        <span>Valuasi Display</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="w-full border-gray-200 bg-gray-50 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-gray-800 placeholder-gray-400"
                                        placeholder="Contoh: Rp 750rb"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">
                                        <SparklesIcon className="w-4 h-4 text-gray-400" />
                                        <span>Token Identitas</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.tag}
                                        onChange={e => setData('tag', e.target.value)}
                                        className="w-full border-gray-200 bg-gray-50 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-gray-800 placeholder-gray-400"
                                        placeholder="Contoh: Limited Edition"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">
                                        <PhotoIcon className="w-4 h-4 text-gray-400" />
                                        <span>Aset Visual</span>
                                    </label>
                                    <div className="relative group p-4 border border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-gray-50 hover:bg-gold/5 hover:border-gold/50 transition-all cursor-pointer overflow-hidden">
                                        <input type="file" onChange={e => setData('image', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                                        <div className="text-[10px] font-black uppercase text-gray-400 group-hover:text-gold transition-colors flex items-center space-x-3">
                                            <div className="w-6 h-6 border border-gray-200 group-hover:border-gold/30 rounded-lg flex items-center justify-center text-xs">+</div>
                                            <span>Unggah Representasi Visual</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">
                                    <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                                    <span>Briefing Singkat</span>
                                </label>
                                <textarea
                                    rows="4"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full border-gray-200 bg-gray-50 p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all resize-none text-gray-800 placeholder-gray-400"
                                    placeholder="Tulis deskripsi teknis atau narasi produk di sini..."
                                ></textarea>
                            </div>

                            <div className="pt-6 flex justify-end items-center space-x-6">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] hover:text-gray-800 transition-all duration-300">Batalkan Operasi</button>
                                <button type="submit" disabled={processing} className="px-10 py-4 bg-gold text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-md hover:scale-105 active:scale-95 transition-all">Submit Protokol</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
