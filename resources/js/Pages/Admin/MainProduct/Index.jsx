import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    ArchiveBoxIcon,
    PhotoIcon,
    TagIcon
} from '@heroicons/react/24/outline';

export default function Index({ mainProducts, categories }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { data: catData, setData: setCatData, post: postCat, delete: destroyCat, processing: processingCat, reset: resetCat } = useForm({
        name: '',
    });

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
                onSuccess: () => {
                    reset();
                    setEditingProduct(null);
                    setIsAddModalOpen(false);
                },
            });
        } else {
            post(route('admin.main-products.store'), {
                onSuccess: () => {
                    reset();
                    setIsAddModalOpen(false);
                },
            });
        }
    };

    const submitCategory = (e) => {
        e.preventDefault();
        postCat(route('admin.categories.store'), {
            onSuccess: () => {
                resetCat();
            },
        });
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setData({
            name: product.name,
            category: product.category || (categories.length > 0 ? categories[0].name : ''),
            description: product.description || '',
            image: null,
        });
        setIsAddModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Hapus item ini?')) {
            destroy(route('admin.main-products.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const handleDeleteCategory = (id) => {
        if (confirm('Hapus kategori ini? Semua produk dengan kategori ini mungkin perlu diupdate.')) {
            destroyCat(route('admin.categories.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-2xl text-gold leading-tight tracking-tighter uppercase italic">Kelola Brand Utama</h2>}
        >
            <Head title="Admin - Manage Product" />

            <div className="py-8 bg-hitam-pekat min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Header Section */}
                    <div className="bg-coklat-kopi/10 p-6 rounded-2xl shadow-sm border border-gold/10 flex flex-col md:flex-row justify-between items-center gap-4 backdrop-blur-sm">
                        <div>
                            <h3 className="text-lg font-black text-gold tracking-tight uppercase italic">Manajemen Brand & Produk</h3>
                            <p className="text-[10px] text-cream-gold/40 font-bold uppercase tracking-[0.2em] mt-1">Kelola tampilan brand utama dan kategori produk</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setIsCategoryModalOpen(true)}
                                className="bg-hitam-pekat border-2 border-gold text-gold px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] hover:bg-gold hover:text-hitam-pekat transition-all flex items-center space-x-2 active:scale-95"
                            >
                                <TagIcon className="w-4 h-4" />
                                <span>Kategori</span>
                            </button>
                            <button
                                onClick={() => { reset(); setEditingProduct(null); setIsAddModalOpen(true); }}
                                className="bg-gold text-hitam-pekat px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] hover:bg-gold-muda transition-all shadow-xl shadow-gold/5 flex items-center space-x-2 active:scale-95"
                            >
                                <PlusIcon className="w-4 h-4" />
                                <span>Tambah Brand</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Products Table */}
                    <div className="bg-coklat-kopi/5 shadow-sm rounded-2xl border border-gold/5 overflow-hidden backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gold/5">
                                <thead>
                                    <tr className="bg-gold/5">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gold uppercase tracking-widest">Brand / Offering Name</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gold uppercase tracking-widest">Category</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gold uppercase tracking-widest">Description</th>
                                        <th className="px-8 py-5 text-right text-[11px] font-black text-gold uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gold/5">
                                    {mainProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gold/5 transition-colors group">
                                            <td className="px-8 py-6 flex items-center space-x-5 text-nowrap">
                                                <div className="w-16 h-16 rounded-2xl bg-hitam-pekat overflow-hidden border-2 border-gold/10 shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-500">
                                                    {product.image ? (
                                                        <img src={`/storage/${product.image}`} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gold/20 font-black italic">MB</div>
                                                    )}
                                                </div>
                                                <div className="text-sm font-black text-cream-gold group-hover:text-gold transition-colors">{product.name}</div>
                                            </td>
                                            <td className="px-8 py-6 text-nowrap">
                                                <span className="px-3 py-1 bg-gold/5 text-gold text-[9px] font-black uppercase rounded-lg border border-gold/10">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-[11px] text-cream-gold/40 font-bold uppercase tracking-tight max-w-md line-clamp-2 whitespace-pre-wrap">{product.description}</div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <button onClick={() => handleEdit(product)} className="p-2.5 text-gold/40 hover:text-gold hover:bg-gold/5 rounded-xl transition-all"><PencilSquareIcon className="w-5 h-5" /></button>
                                                    <button onClick={() => handleDelete(product.id)} className="p-2.5 text-gold/40 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all"><TrashIcon className="w-5 h-5" /></button>
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

            {/* Category Management Modal */}
            {isCategoryModalOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-hitam-pekat/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-hitam-pekat rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gold/20 shadow-gold/5">
                        <div className="px-8 py-6 border-b border-gold/10 flex justify-between items-center bg-gold/5">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.2em] text-gold text-sm italic">Kelola Kategori</h4>
                                <p className="text-[10px] text-cream-gold/40 font-bold uppercase tracking-widest mt-1">Daftar kategori global untuk produk</p>
                            </div>
                            <button onClick={() => setIsCategoryModalOpen(false)} className="w-10 h-10 rounded-full border border-gold/10 flex items-center justify-center text-gold/40 hover:text-gold hover:bg-gold/10 transition-all">&times;</button>
                        </div>
                        <div className="p-8 space-y-6 bg-coklat-kopi/10">
                            {/* Add New Category */}
                            <form onSubmit={submitCategory} className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={catData.name}
                                        onChange={e => setCatData('name', e.target.value)}
                                        className="w-full border-gold/10 rounded-xl text-sm font-bold p-4 focus:ring-gold focus:border-gold transition-all bg-hitam-pekat/50 text-cream-gold placeholder-cream-gold/20 shadow-sm"
                                        placeholder="Nama kategori baru..."
                                        required
                                    />
                                </div>
                                <button type="submit" disabled={processingCat} className="bg-gold text-hitam-pekat px-6 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold-muda transition-all">Tambah</button>
                            </form>

                            {/* Categories List */}
                            <div className="bg-hitam-pekat/50 rounded-xl p-4 max-h-[300px] overflow-y-auto border border-gold/10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {categories.map((cat) => (
                                        <div key={cat.id} className="bg-coklat-kopi/20 p-4 rounded-xl border border-gold/10 flex justify-between items-center shadow-sm hover:border-gold/30 transition-all">
                                            <div className="flex items-center space-x-2">
                                                <TagIcon className="w-3 h-3 text-gold" />
                                                <span className="text-xs font-black text-cream-gold">{cat.name}</span>
                                            </div>
                                            <button onClick={() => handleDeleteCategory(cat.id)} className="text-gold/40 hover:text-red-500 transition-colors">
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hitam-pekat/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-hitam-pekat rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gold/20 shadow-gold/5">
                        <div className="px-8 py-6 border-b border-gold/10 flex justify-between items-center bg-gold/5">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.2em] text-gold text-sm italic">{editingProduct ? 'Perbarui Brand' : 'Entri Brand Baru'}</h4>
                                <p className="text-[10px] text-cream-gold/40 font-bold uppercase tracking-widest mt-1">Lengkapi spesifikasi visual brand</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 rounded-full border border-gold/10 flex items-center justify-center text-gold/40 hover:text-gold hover:bg-gold/10 transition-all font-black">&times;</button>
                        </div>
                        <form onSubmit={submit} className="p-8 space-y-6 bg-coklat-kopi/10">
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gold/40 tracking-widest">
                                    <ArchiveBoxIcon className="w-3 h-3" />
                                    <span>Nama Brand</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gold/10 bg-hitam-pekat/50 rounded-xl text-sm font-bold p-4 focus:ring-gold focus:border-gold transition-all text-cream-gold placeholder-cream-gold/20 shadow-sm"
                                    placeholder="Contoh: Brand Cerutu Eksklusif"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-[10px] font-black uppercase mt-1 tracking-widest italic">{errors.name}</div>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gold/40 tracking-widest">
                                    <PlusIcon className="w-3 h-3" />
                                    <span>Kategori Utama</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="w-full border-gold/10 bg-hitam-pekat/50 rounded-2xl text-sm font-bold p-5 focus:ring-gold focus:border-gold transition-all text-cream-gold shadow-sm"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} className="bg-hitam-pekat text-cream-gold" value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gold/40 tracking-widest">
                                    <PhotoIcon className="w-3 h-3" />
                                    <span>Cover / Logo Brand</span>
                                </label>
                                <div className="relative group p-3 border border-gold/10 rounded-xl flex items-center justify-center bg-hitam-pekat/50 hover:bg-gold/5 transition-all cursor-pointer">
                                    <input type="file" onChange={e => setData('image', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    <span className="text-[10px] font-black uppercase text-gold/40 group-hover:text-gold transition-colors">Pilih File Visual</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gold/40 tracking-widest">
                                    <PencilSquareIcon className="w-3 h-3" />
                                    <span>Deskripsi Brand</span>
                                </label>
                                <textarea
                                    rows="4"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full border-gold/10 bg-hitam-pekat/50 rounded-xl text-sm font-bold p-4 focus:ring-gold focus:border-gold transition-all text-cream-gold placeholder-cream-gold/20 shadow-sm resize-none"
                                    placeholder="Ceritakan sejarah atau keunggulan brand ini..."
                                ></textarea>
                            </div>

                            <div className="pt-6 flex justify-end space-x-6">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-3 text-gold/40 font-black uppercase text-[10px] tracking-widest hover:text-gold transition-colors">Batal</button>
                                <button type="submit" disabled={processing} className="px-10 py-4 bg-gold text-hitam-pekat rounded-xl font-black uppercase text-[10px] tracking-[0.1em] shadow-2xl shadow-gold/5 hover:scale-[1.05] active:scale-95 transition-all">Simpan Brand</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
