import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    PlusIcon,
    TrashIcon,
    TagIcon
} from '@heroicons/react/24/outline';

export default function Index({ categories }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.categories.store'), {
            onSuccess: () => {
                reset();
                setIsAddModalOpen(false);
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Hapus kategori ini?')) {
            destroy(route('admin.categories.destroy', id));
        }
    };

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-2xl text-gold leading-tight tracking-tighter uppercase italic">Categories</h2>}
        >
            <Head title="Admin - Categories" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Header Section */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h3 className="text-base font-black text-gray-800 tracking-tight uppercase italic">Kategori Produk</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Kelola kategori global produk</p>
                        </div>
                        <button
                            onClick={() => { reset(); setIsAddModalOpen(true); }}
                            className="bg-gold text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold-muda transition-all shadow-md flex items-center space-x-2 active:scale-95"
                        >
                            <PlusIcon className="w-4 h-4" />
                            <span>Tambah Kategori</span>
                        </button>
                    </div>

                    {/* Categories Table */}
                    <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3.5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Nama Kategori</th>
                                        <th className="px-6 py-3.5 text-right text-[10px] font-black text-gray-500 uppercase tracking-widest">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {categories.map((category) => (
                                        <tr key={category.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-gold/10 rounded-lg border border-gold/20">
                                                        <TagIcon className="w-4 h-4 text-gold" />
                                                    </div>
                                                    <span className="text-sm font-black text-gray-800 transition-colors">{category.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleDelete(category.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-100">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <h4 className="font-black uppercase tracking-widest text-gray-800 text-xs">Tambah Kategori</h4>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-800 transition-all">&times;</button>
                        </div>
                        <form onSubmit={submit} className="p-5 space-y-4">
                            <div className="space-y-1.5">
                                <label className="flex items-center space-x-2 text-[9px] font-black uppercase text-gray-500 tracking-widest">
                                    <TagIcon className="w-3 h-3" />
                                    <span>Nama Kategori</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gray-200 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all bg-gray-50 text-gray-800 placeholder-gray-400 shadow-sm"
                                    placeholder="e.g. Cerutu Premium"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-[9px] font-black uppercase mt-1 italic">{errors.name}</div>}
                            </div>
                            <div className="pt-2 flex justify-end space-x-3">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-500 font-black uppercase text-[9px] tracking-widest hover:text-gray-800 transition-colors">Batal</button>
                                <button type="submit" disabled={processing} className="px-6 py-2.5 bg-gold text-white rounded-xl font-black uppercase text-[9px] tracking-widest shadow-md hover:bg-gold-muda transition-all">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
