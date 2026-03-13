import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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

export default function Index({ products }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        category: 'Cerutu',
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
        <AuthenticatedLayout
            header={<h2 className="font-black text-2xl text-gray-900 leading-tight tracking-tighter">Product Collection</h2>}
        >
            <Head title="Admin - Products" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Header Section */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase italic">Static Product Gallery</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Manage items displayed on the public product page</p>
                        </div>
                        <button
                            onClick={() => { reset(); setEditingProduct(null); setIsAddModalOpen(true); }}
                            className="bg-gray-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center space-x-2 active:scale-95"
                        >
                            <PlusIcon className="w-4 h-4" />
                            <span>Create New Product</span>
                        </button>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white shadow-sm rounded-[2.5rem] border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Product Details</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Category</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Pricing</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Labels</th>
                                        <th className="px-8 py-5 text-right text-[11px] font-black text-gray-700 uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-6 flex items-center space-x-5">
                                                <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-500">
                                                    {product.image ? (
                                                        <img src={`/storage/${product.image}`} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300 font-black italic">MC</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{product.name}</div>
                                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight truncate max-w-[200px] mt-1">{product.description || 'Tidak ada deskripsi'}</div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-[10px] font-black uppercase rounded-lg border border-gray-200">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-sm font-black text-gray-900 tracking-tight">{product.price}</td>
                                            <td className="px-8 py-6">
                                                {product.tag ? (
                                                    <span className="bg-amber-100 text-amber-800 text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-amber-200">
                                                        {product.tag}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-300 italic text-[10px] font-bold">Tanpa Tag</span>
                                                )}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end space-x-2">
                                                    <button onClick={() => handleEdit(product)} className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><PencilSquareIcon className="w-5 h-5" /></button>
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

            {/* Premium Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20">
                        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.2em] text-gray-900 text-sm italic">{editingProduct ? 'Update Produk' : 'Entri Produk Baru'}</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Lengkapi spesifikasi formal produk</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all font-black">&times;</button>
                        </div>
                        <form onSubmit={submit} className="p-10 space-y-8">
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                    <ArchiveBoxIcon className="w-3 h-3" />
                                    <span>Nama Produk</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gray-200 rounded-2xl text-sm font-bold p-5 focus:ring-gray-900 focus:border-gray-900 transition-all shadow-sm"
                                    placeholder="Contoh: Montecristo No. 4"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-[10px] font-black uppercase mt-1 tracking-widest italic">{errors.name}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                        <TagIcon className="w-3 h-3" />
                                        <span>Kategori</span>
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={e => setData('category', e.target.value)}
                                        className="w-full border-gray-200 rounded-2xl text-sm font-bold p-5 focus:ring-gray-900 focus:border-gray-900 transition-all shadow-sm"
                                    >
                                        <option>Cerutu</option>
                                        <option>Kopi</option>
                                        <option>Aksesoris</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                        <CurrencyDollarIcon className="w-3 h-3" />
                                        <span>Harga Display</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="w-full border-gray-200 rounded-2xl text-sm font-bold p-5 focus:ring-gray-900 focus:border-gray-900 transition-all shadow-sm"
                                        placeholder="Contoh: Rp 150rb"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                        <TagIcon className="w-3 h-3" />
                                        <span>Tag Highlight</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.tag}
                                        onChange={e => setData('tag', e.target.value)}
                                        className="w-full border-gray-200 rounded-2xl text-sm font-bold p-5 focus:ring-gray-900 focus:border-gray-900 transition-all shadow-sm"
                                        placeholder="Contoh: Best Seller"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                        <PhotoIcon className="w-3 h-3" />
                                        <span>Visual Produk</span>
                                    </label>
                                    <div className="relative group p-4 border border-gray-200 rounded-2xl flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer">
                                        <input type="file" onChange={e => setData('image', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-gray-900 transition-colors">Pilih File Visual</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                    <ArchiveBoxIcon className="w-3 h-3" />
                                    <span>Deskripsi Singkat</span>
                                </label>
                                <textarea
                                    rows="3"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full border-gray-200 rounded-2xl text-sm font-bold p-5 focus:ring-gray-900 focus:border-gray-900 transition-all shadow-sm resize-none"
                                    placeholder="Tulis deskripsi menarik..."
                                ></textarea>
                            </div>

                            <div className="pt-6 flex justify-end space-x-6">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-8 py-4 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-gray-900 transition-colors">Batal</button>
                                <button type="submit" disabled={processing} className="px-12 py-5 bg-gray-900 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-gray-200 hover:scale-[1.05] active:scale-95 transition-all">Terbitkan Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
