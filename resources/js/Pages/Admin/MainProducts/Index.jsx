import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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
        <AuthenticatedLayout
            header={<h2 className="font-black text-2xl text-gray-900 leading-tight tracking-tighter">Manage Product</h2>}
        >
            <Head title="Admin - Manage Product" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Header Section */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase italic">Brand & Offering Management</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Manage main product displays and categories</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsCategoryModalOpen(true)}
                                className="bg-white border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-50 transition-all flex items-center space-x-2 active:scale-95"
                            >
                                <TagIcon className="w-4 h-4" />
                                <span>Kategori</span>
                            </button>
                            <button
                                onClick={() => { reset(); setEditingProduct(null); setIsAddModalOpen(true); }}
                                className="bg-gray-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center space-x-2 active:scale-95"
                            >
                                <PlusIcon className="w-4 h-4" />
                                <span>Tambah Brand</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Products Table */}
                    <div className="bg-white shadow-sm rounded-[2.5rem] border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Brand / Offering Name</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Category</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Description</th>
                                        <th className="px-8 py-5 text-right text-[11px] font-black text-gray-700 uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {mainProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-6 flex items-center space-x-5 text-nowrap">
                                                <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-500">
                                                    {product.image ? (
                                                        <img src={`/storage/${product.image}`} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300 font-black italic">MB</div>
                                                    )}
                                                </div>
                                                <div className="text-sm font-black text-gray-900 group-hover:text-amber-600 transition-colors">{product.name}</div>
                                            </td>
                                            <td className="px-8 py-6 text-nowrap">
                                                <span className="px-3 py-1 bg-amber-50 text-amber-900 text-[9px] font-black uppercase rounded-lg border border-amber-200/50">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-[11px] text-gray-500 font-bold uppercase tracking-tight max-w-md line-clamp-2 whitespace-pre-wrap">{product.description}</div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <button onClick={() => handleEdit(product)} className="p-2.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"><PencilSquareIcon className="w-5 h-5" /></button>
                                                    <button onClick={() => handleDelete(product.id)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><TrashIcon className="w-5 h-5" /></button>
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
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20">
                        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.2em] text-gray-900 text-sm italic">Manage Categories</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Daftar kategori global untuk produk</p>
                            </div>
                            <button onClick={() => setIsCategoryModalOpen(false)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all">&times;</button>
                        </div>
                        <div className="p-10 space-y-8">
                            {/* Add New Category */}
                            <form onSubmit={submitCategory} className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={catData.name}
                                        onChange={e => setCatData('name', e.target.value)}
                                        className="w-full border-gray-200 rounded-2xl text-sm font-bold p-5 focus:ring-gray-900 focus:border-gray-900 transition-all shadow-sm"
                                        placeholder="Nama kategori baru..."
                                        required
                                    />
                                </div>
                                <button type="submit" disabled={processingCat} className="bg-gray-900 text-white px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest">Tambah</button>
                            </form>

                            {/* Categories List */}
                            <div className="bg-gray-50 rounded-[2rem] p-6 max-h-[300px] overflow-y-auto border border-gray-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {categories.map((cat) => (
                                        <div key={cat.id} className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center shadow-sm">
                                            <div className="flex items-center space-x-2">
                                                <TagIcon className="w-3 h-3 text-amber-600" />
                                                <span className="text-xs font-black text-gray-900">{cat.name}</span>
                                            </div>
                                            <button onClick={() => handleDeleteCategory(cat.id)} className="text-gray-400 hover:text-red-600 transition-colors">
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20">
                        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.2em] text-gray-900 text-sm italic">{editingProduct ? 'Perbarui Brand' : 'Entri Brand Baru'}</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Lengkapi spesifikasi visual brand</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all font-black">&times;</button>
                        </div>
                        <form onSubmit={submit} className="p-10 space-y-8">
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                    <ArchiveBoxIcon className="w-3 h-3" />
                                    <span>Nama Brand</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gray-200 rounded-2xl text-sm font-bold p-5 focus:ring-gray-900 focus:border-gray-900 transition-all shadow-sm"
                                    placeholder="Contoh: Brand Cerutu Eksklusif"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-[10px] font-black uppercase mt-1 tracking-widest italic">{errors.name}</div>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                    <PlusIcon className="w-3 h-3" />
                                    <span>Kategori Utama</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="w-full border-gray-200 rounded-2xl text-sm font-bold p-5 focus:ring-gray-900 focus:border-gray-900 transition-all shadow-sm"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                    <PhotoIcon className="w-3 h-3" />
                                    <span>Cover / Logo Brand</span>
                                </label>
                                <div className="relative group p-4 border border-gray-200 rounded-2xl flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer">
                                    <input type="file" onChange={e => setData('image', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-amber-600 transition-colors">Pilih File Visual</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                    <PencilSquareIcon className="w-3 h-3" />
                                    <span>Deskripsi Brand</span>
                                </label>
                                <textarea
                                    rows="4"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full border-gray-200 rounded-2xl text-sm font-bold p-5 focus:ring-gray-900 focus:border-gray-900 transition-all shadow-sm resize-none"
                                    placeholder="Ceritakan sejarah atau keunggulan brand ini..."
                                ></textarea>
                            </div>

                            <div className="pt-6 flex justify-end space-x-6">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-8 py-4 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-gray-900 transition-colors">Batal</button>
                                <button type="submit" disabled={processing} className="px-12 py-5 bg-gray-900 text-white rounded-3xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-gray-200 hover:scale-[1.05] active:scale-95 transition-all">Terbitkan Brand</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
