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

            <div className="py-8 bg-hitam-pekat min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Header Section */}
                    <div className="bg-coklat-kopi/10 p-6 rounded-2xl shadow-sm border border-gold/10 flex flex-col md:flex-row justify-between items-center gap-4 backdrop-blur-sm">
                        <div>
                            <h3 className="text-lg font-black text-gold tracking-tight uppercase italic">Product Categories</h3>
                            <p className="text-[10px] text-cream-gold/40 font-bold uppercase tracking-[0.2em] mt-1">Manage global categories for products and brands</p>
                        </div>
                        <button
                            onClick={() => { reset(); setIsAddModalOpen(true); }}
                            className="bg-gold text-hitam-pekat px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] hover:bg-gold-muda transition-all shadow-xl shadow-gold/5 flex items-center space-x-2 active:scale-95"
                        >
                            <PlusIcon className="w-4 h-4" />
                            <span>Add Category</span>
                        </button>
                    </div>

                    {/* Categories Table */}
                    <div className="bg-coklat-kopi/5 shadow-sm rounded-2xl border border-gold/5 overflow-hidden backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gold/5">
                                <thead>
                                    <tr className="bg-gold/5">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gold uppercase tracking-widest">Category Name</th>
                                        <th className="px-8 py-5 text-right text-[11px] font-black text-gold uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gold/5">
                                    {categories.map((category) => (
                                        <tr key={category.id} className="hover:bg-gold/5 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-gold/5 rounded-lg border border-gold/10">
                                                        <TagIcon className="w-4 h-4 text-gold" />
                                                    </div>
                                                    <span className="text-sm font-black text-cream-gold group-hover:text-gold transition-colors">{category.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button onClick={() => handleDelete(category.id)} className="p-2.5 text-gold/40 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all"><TrashIcon className="w-5 h-5" /></button>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hitam-pekat/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-hitam-pekat rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gold/20 shadow-gold/5">
                        <div className="px-8 py-6 border-b border-gold/10 flex justify-between items-center bg-gold/5">
                            <h4 className="font-black uppercase tracking-[0.2em] text-gold text-sm italic">New Category</h4>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gold/40 hover:text-gold font-black">&times;</button>
                        </div>
                        <form onSubmit={submit} className="p-8 space-y-6 bg-coklat-kopi/10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gold/40 tracking-widest">Category Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gold/10 rounded-xl text-sm font-bold p-4 focus:ring-gold focus:border-gold transition-all bg-hitam-pekat/50 text-cream-gold placeholder-cream-gold/20 shadow-sm"
                                    placeholder="e.g. Cerutu Premium"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-[10px] font-black uppercase mt-1 italic">{errors.name}</div>}
                            </div>
                            <div className="pt-4 flex justify-end space-x-4">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-3 text-gold/40 font-black uppercase text-[10px] tracking-widest hover:text-gold transition-colors">Cancel</button>
                                <button type="submit" disabled={processing} className="px-10 py-4 bg-gold text-hitam-pekat rounded-xl font-black uppercase text-[10px] tracking-[0.1em] shadow-xl shadow-gold/5 hover:scale-105 active:scale-95 transition-all">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
