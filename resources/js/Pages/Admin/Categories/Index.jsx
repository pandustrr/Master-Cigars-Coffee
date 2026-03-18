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
                    <div className="bg-gradient-to-br from-coklat-kopi/40 via-hitam-pekat/80 to-hitam-pekat p-12 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] text-gold flex flex-col md:flex-row justify-between items-center gap-10 overflow-hidden relative border border-gold/10 group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] group-hover:bg-gold/10 transition-all duration-1000"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black tracking-tighter mb-4 italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-cream-gold to-gold">Taxonomy Command</h3>
                            <p className="text-cream-gold/40 text-[10px] font-black uppercase tracking-[0.4em] max-w-xl leading-relaxed">
                                Curate the global product taxonomy. Define structural categories for the master collection.
                            </p>
                        </div>
                        <button
                            onClick={() => { reset(); setIsAddModalOpen(true); }}
                            className="bg-gold text-hitam-pekat px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold-muda transition-all shadow-[0_20px_40px_rgba(175,146,109,0.3)] flex items-center space-x-3 active:scale-90 hover:-translate-y-1 relative z-10"
                        >
                            <PlusIcon className="w-5 h-5" />
                            <span>Add Classification</span>
                        </button>
                    </div>

                    {/* Categories Table */}
                    <div className="bg-coklat-kopi/5 shadow-[0_50px_100px_rgba(0,0,0,0.3)] rounded-[3rem] border border-gold/10 overflow-hidden backdrop-blur-3xl">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gold/10">
                                <thead>
                                    <tr className="bg-gold/5">
                                        <th className="px-10 py-7 text-left text-[11px] font-black text-gold uppercase tracking-[0.3em] italic">Classification Signature</th>
                                        <th className="px-10 py-7 text-right text-[11px] font-black text-gold uppercase tracking-[0.3em] italic">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gold/5 bg-hitam-pekat/20">
                                    {categories.map((category) => (
                                        <tr key={category.id} className="hover:bg-gold/5 transition-all duration-500 group">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center space-x-6">
                                                    <div className="p-4 bg-gold/5 rounded-2xl border border-gold/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                                                        <TagIcon className="w-6 h-6 text-gold/40 group-hover:text-gold transition-colors" />
                                                    </div>
                                                    <span className="text-lg font-black text-cream-gold group-hover:text-gold transition-all tracking-tighter uppercase italic">{category.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <button onClick={() => handleDelete(category.id)} className="p-4 text-gold/30 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all hover:scale-110 active:scale-90 border border-transparent hover:border-red-500/20 shadow-2xl">
                                                    <TrashIcon className="w-6 h-6" />
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-hitam-pekat/95 backdrop-blur-3xl animate-fade-in">
                    <div className="bg-gradient-to-br from-coklat-kopi/40 via-hitam-pekat to-hitam-pekat rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] w-full max-w-md overflow-hidden border border-gold/20 relative group/modal">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/10 rounded-full blur-[100px] group-hover/modal:bg-gold/20 transition-all duration-1000"></div>
                        <div className="px-10 py-8 border-b border-gold/10 flex justify-between items-center bg-gold/5 relative z-10">
                            <h4 className="font-black uppercase tracking-[0.4em] text-gold text-sm italic">New Classification</h4>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-12 h-12 rounded-2xl border border-gold/10 flex items-center justify-center text-gold/40 hover:text-gold hover:bg-gold/10 transition-all hover:rotate-90 duration-500 font-black text-2xl relative z-10">&times;</button>
                        </div>
                        <form onSubmit={submit} className="p-10 space-y-8 bg-coklat-kopi/5 relative z-10">
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gold/40 tracking-[0.3em] italic">
                                    <TagIcon className="w-4 h-4" />
                                    <span>Classification Identifier</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gold/10 bg-hitam-pekat/80 rounded-2xl text-sm font-black p-5 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-cream-gold placeholder-cream-gold/10 shadow-inner"
                                    placeholder="e.g. Cerutu Premium..."
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-[10px] font-black uppercase mt-2 tracking-[0.2em] italic bg-red-500/10 px-4 py-2 rounded-lg inline-block border border-red-500/20">{errors.name}</div>}
                            </div>
                            <div className="pt-8 flex justify-end space-x-6">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-8 py-4 text-gold/30 font-black uppercase text-[10px] tracking-[0.4em] hover:text-gold transition-all hover:scale-105 active:scale-90">Abort</button>
                                <button type="submit" disabled={processing} className="px-12 py-5 bg-gold text-hitam-pekat rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-[0_20px_40px_rgba(175,146,109,0.3)] hover:bg-gold-muda hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(175,146,109,0.4)] active:scale-90 transition-all">Establish</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
