import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    ArchiveBoxIcon,
    PhotoIcon,
    TagIcon,
    CloudArrowUpIcon
} from '@heroicons/react/24/outline';

export default function Index({ mainProducts, categories }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { data: catData, setData: setCatData, post: postCat, delete: destroyCat, processing: processingCat, reset: resetCat } = useForm({ name: '' });

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        category: categories.length > 0 ? categories[0].name : '',
        description: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            post(route('admin.main-products.update', editingProduct.id), {
                onSuccess: () => { reset(); setEditingProduct(null); setIsAddModalOpen(false); },
            });
        } else {
            post(route('admin.main-products.store'), {
                onSuccess: () => { reset(); setIsAddModalOpen(false); },
            });
        }
    };

    const submitCategory = (e) => {
        e.preventDefault();
        postCat(route('admin.categories.store'), { onSuccess: () => resetCat() });
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setData({ name: product.name, category: product.category || (categories.length > 0 ? categories[0].name : ''), description: product.description || '', image: null });
        setIsAddModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Hapus item ini?')) destroy(route('admin.main-products.destroy', id), { preserveScroll: true });
    };

    const handleDeleteCategory = (id) => {
        if (confirm('Hapus kategori ini?')) destroyCat(route('admin.categories.destroy', id), { preserveScroll: true });
    };

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-xl text-gold leading-tight tracking-tight uppercase">Kelola Produk</h2>}
        >
            <Head title="Admin - Kelola Produk" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">

                    {/* Header */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
                        <div>
                            <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight">Produk Utama</h3>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Arsitektur produk & kategori global</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setIsCategoryModalOpen(true)}
                                className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gray-50 hover:text-gray-800 transition-all flex items-center space-x-2 shadow-sm">
                                <TagIcon className="w-4 h-4" />
                                <span>Kategori</span>
                            </button>
                            <button onClick={() => { reset(); setEditingProduct(null); setIsAddModalOpen(true); }}
                                className="bg-gold text-white px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold-muda transition-all shadow-md flex items-center space-x-2">
                                <PlusIcon className="w-4 h-4" />
                                <span>Tambah Produk</span>
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3.5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Nama Produk</th>
                                        <th className="px-6 py-3.5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Kategori</th>
                                        <th className="px-6 py-3.5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Deskripsi</th>
                                        <th className="px-6 py-3.5 text-right text-[10px] font-black text-gray-500 uppercase tracking-widest">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {mainProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50/80 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                                                        {product.image ? (
                                                            <img src={`/storage/${product.image}`} className="w-full h-full object-cover" alt="" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-black">MB</div>
                                                        )}
                                                    </div>
                                                    <div className="text-sm font-black text-gray-800 transition-colors">{product.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 bg-gold/10 text-gold-muda font-black text-[9px] uppercase rounded-lg border border-gold/20">{product.category}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs text-gray-500 max-w-sm truncate">{product.description}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end space-x-1.5">
                                                    <button onClick={() => handleEdit(product)} className="p-2 text-gray-400 hover:text-gold hover:bg-gold/5 rounded-lg transition-all">
                                                        <PencilSquareIcon className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
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

            {/* Category Modal */}
            {isCategoryModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsCategoryModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h4 className="font-black uppercase tracking-widest text-gray-800 text-xs">Kelola Kategori</h4>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Tambah & hapus kategori</p>
                            </div>
                            <button onClick={() => setIsCategoryModalOpen(false)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-50 transition-all">&times;</button>
                        </div>
                        <div className="p-5 space-y-4">
                            <form onSubmit={submitCategory} className="flex gap-2">
                                <input type="text" value={catData.name} onChange={e => setCatData('name', e.target.value)}
                                    className="flex-1 border-gray-200 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all bg-gray-50 text-gray-800 placeholder-gray-400"
                                    placeholder="Nama kategori baru..." required />
                                <button type="submit" disabled={processingCat} className="bg-gold text-white px-5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold-muda transition-all shadow-sm">Tambah</button>
                            </form>
                            <div className="bg-gray-50 rounded-xl p-3 max-h-60 overflow-y-auto border border-gray-100 space-y-2">
                                {categories.map((cat) => (
                                    <div key={cat.id} className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center hover:border-gray-300 hover:shadow-sm transition-all shadow-sm">
                                        <div className="flex items-center space-x-2">
                                            <TagIcon className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="text-xs font-bold text-gray-700">{cat.name}</span>
                                        </div>
                                        <button onClick={() => handleDeleteCategory(cat.id)} className="text-gray-300 hover:text-red-500 transition-all">
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h4 className="font-black uppercase tracking-widest text-gray-800 text-xs">{editingProduct ? 'Edit Produk' : 'Tambah Produk'}</h4>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Lengkapi informasi produk</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-50 transition-all">&times;</button>
                        </div>
                        <form onSubmit={submit} className="p-5 space-y-4">
                            <div className="space-y-1.5">
                                <label className="flex items-center space-x-2 text-[9px] font-black uppercase text-gray-500 tracking-widest">
                                    <ArchiveBoxIcon className="w-3 h-3" /><span>Nama Produk</span>
                                </label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gray-200 bg-gray-50 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400"
                                    placeholder="Nama produk..." required />
                                {errors.name && <div className="text-red-500 text-[9px] italic mt-0.5">{errors.name}</div>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="flex items-center space-x-2 text-[9px] font-black uppercase text-gray-500 tracking-widest">
                                    <TagIcon className="w-3 h-3" /><span>Kategori</span>
                                </label>
                                <select value={data.category} onChange={e => setData('category', e.target.value)}
                                    className="w-full border-gray-200 bg-gray-50 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all text-gray-800">
                                    {categories.map((cat) => (
                                        <option key={cat.id} className="bg-white text-gray-800" value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="flex items-center space-x-2 text-[9px] font-black uppercase text-gray-500 tracking-widest">
                                    <PhotoIcon className="w-3 h-3" /><span>Gambar (Opsional)</span>
                                </label>
                                <div className="relative group/asset p-4 border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-gold/50 bg-gray-50 transition-all cursor-pointer">
                                    <input type="file" onChange={e => setData('image', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <CloudArrowUpIcon className="w-6 h-6 text-gray-300 mb-1 group-hover/asset:text-gold transition-colors" />
                                    <span className="text-[9px] font-black uppercase text-gray-400 group-hover/asset:text-gold transition-colors">Pilih Gambar</span>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="flex items-center space-x-2 text-[9px] font-black uppercase text-gray-500 tracking-widest">
                                    <PencilSquareIcon className="w-3 h-3" /><span>Deskripsi</span>
                                </label>
                                <textarea rows="3" value={data.description} onChange={e => setData('description', e.target.value)}
                                    className="w-full border-gray-200 bg-gray-50 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400 resize-none"
                                    placeholder="Deskripsi produk..."></textarea>
                            </div>
                            <div className="pt-2 flex justify-end space-x-3">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-500 font-black uppercase text-[9px] tracking-widest hover:text-gray-800 transition-colors">Batal</button>
                                <button type="submit" disabled={processing} className="px-6 py-2.5 bg-gold text-white rounded-xl font-black uppercase text-[9px] tracking-widest shadow-md hover:bg-gold-muda transition-all disabled:opacity-50">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
