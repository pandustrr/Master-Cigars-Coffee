import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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
        <AuthenticatedLayout
            header={<h2 className="font-black text-2xl text-gray-900 leading-tight tracking-tighter">Categories</h2>}
        >
            <Head title="Admin - Categories" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Header Section */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase italic">Product Categories</h3>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Manage global categories for products and brands</p>
                        </div>
                        <button
                            onClick={() => { reset(); setIsAddModalOpen(true); }}
                            className="bg-gray-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center space-x-2 active:scale-95"
                        >
                            <PlusIcon className="w-4 h-4" />
                            <span>Add Category</span>
                        </button>
                    </div>

                    {/* Categories Table */}
                    <div className="bg-white shadow-sm rounded-[2.5rem] border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Category Name</th>
                                        <th className="px-8 py-5 text-right text-[11px] font-black text-gray-700 uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {categories.map((category) => (
                                        <tr key={category.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center space-x-3">
                                                    <div className="p-2 bg-amber-50 rounded-lg">
                                                        <TagIcon className="w-4 h-4 text-amber-600" />
                                                    </div>
                                                    <span className="text-sm font-black text-gray-900">{category.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button onClick={() => handleDelete(category.id)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><TrashIcon className="w-5 h-5" /></button>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden border border-white/20">
                        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h4 className="font-black uppercase tracking-[0.2em] text-gray-900 text-sm italic">New Category</h4>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-900 font-black">&times;</button>
                        </div>
                        <form onSubmit={submit} className="p-10 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Category Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gray-200 rounded-2xl text-sm font-bold p-5 focus:ring-gray-900 focus:border-gray-900 transition-all shadow-sm"
                                    placeholder="e.g. Cerutu Premium"
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-[10px] font-black uppercase mt-1 italic">{errors.name}</div>}
                            </div>
                            <div className="pt-4 flex justify-end space-x-4">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-3 text-gray-400 font-black uppercase text-[10px] tracking-widest">Cancel</button>
                                <button type="submit" disabled={processing} className="px-8 py-4 bg-gray-900 text-white rounded-xl font-black uppercase text-[10px] tracking-[0.2em]">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
