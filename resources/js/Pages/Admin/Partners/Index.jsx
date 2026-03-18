import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    UserGroupIcon,
    PhotoIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

export default function Index({ partners }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingPartner, setEditingPartner] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        type: 'Global Partner',
        description: '',
        logo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (editingPartner) {
            post(route('admin.partners.update', editingPartner.id), {
                onSuccess: () => {
                    reset();
                    setEditingPartner(null);
                    setIsAddModalOpen(false);
                },
            });
        } else {
            post(route('admin.partners.store'), {
                onSuccess: () => {
                    reset();
                    setIsAddModalOpen(false);
                },
            });
        }
    };

    const handleEdit = (partner) => {
        setEditingPartner(partner);
        setData({
            name: partner.name,
            type: partner.type,
            description: partner.description || '',
            logo: null,
        });
        setIsAddModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus partner ini?')) {
            destroy(route('admin.partners.destroy', id));
        }
    };

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-2xl text-gold leading-tight tracking-tighter uppercase italic">Partner Management</h2>}
        >
            <Head title="Admin - Partners" />

            <div className="py-8 bg-hitam-pekat min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="flex justify-between items-center bg-coklat-kopi/10 p-6 rounded-2xl shadow-sm border border-gold/10 backdrop-blur-sm">
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-gold/5 rounded-2xl flex items-center justify-center text-gold">
                                <UserGroupIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gold/30">Collaboration Ecosystem</h3>
                                <p className="text-lg font-black text-gold tracking-tight">Manage your strategic partners</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { reset(); setEditingPartner(null); setIsAddModalOpen(true); }}
                            className="bg-gold text-hitam-pekat px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.1em] hover:bg-gold-muda transition-all shadow-xl shadow-gold/5 flex items-center space-x-2 active:scale-95"
                        >
                            <PlusIcon className="w-4 h-4" />
                            <span>Add New Partner</span>
                        </button>
                    </div>

                    <div className="bg-coklat-kopi/5 shadow-sm rounded-2xl border border-gold/5 overflow-hidden backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gold/5">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gold uppercase tracking-widest">Partner Identity</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gold uppercase tracking-widest">Brand Type</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gold uppercase tracking-widest">Focus & Direction</th>
                                        <th className="px-8 py-5 text-right text-[11px] font-black text-gold uppercase tracking-widest">Management</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gold/5">
                                    {partners.map((partner) => (
                                        <tr key={partner.id} className="hover:bg-gold/5 transition-all group">
                                            <td className="px-8 py-6 flex items-center space-x-5">
                                                <div className="w-16 h-16 rounded-2xl bg-hitam-pekat overflow-hidden p-2 border border-gold/10 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    {partner.logo ? (
                                                        <img src={`/storage/${partner.logo}`} className="w-full h-full object-contain" alt="" />
                                                    ) : (
                                                        <SparklesIcon className="w-8 h-8 text-gold/20" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-base font-black text-cream-gold group-hover:text-gold transition-colors uppercase tracking-tight">{partner.name}</div>
                                                    <div className="text-[10px] text-gold/40 font-bold uppercase tracking-widest mt-0.5 italic">Verified Partner</div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="bg-gold text-hitam-pekat text-[9px] px-3 py-1.5 rounded-lg font-black uppercase tracking-[0.1em] shadow-lg shadow-gold/5 border border-gold/20">
                                                    {partner.type}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-sm font-bold text-cream-gold/60 max-w-sm">
                                                <div className="truncate group-hover:whitespace-normal group-hover:text-cream-gold transition-all duration-300">
                                                    {partner.description || 'Global collaboration and strategic growth.'}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right whitespace-nowrap">
                                                <div className="flex justify-end items-center space-x-3">
                                                    <button
                                                        onClick={() => handleEdit(partner)}
                                                        className="w-10 h-10 flex items-center justify-center bg-hitam-pekat text-gold rounded-xl hover:bg-gold hover:text-hitam-pekat transition-all shadow-sm border border-gold/10"
                                                        title="Edit Partner"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(partner.id)}
                                                        className="w-10 h-10 flex items-center justify-center bg-hitam-pekat text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm border border-gold/10"
                                                        title="Delete Partner"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {partners.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-20 h-20 bg-gold/5 rounded-full flex items-center justify-center mb-4">
                                                        <UserGroupIcon className="w-10 h-10 text-gold/20" />
                                                    </div>
                                                    <p className="text-gold/40 font-black uppercase tracking-widest text-xs">No partners identified yet</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Modal for Partners */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-hitam-pekat/90 animate-fade-in">
                    <div className="bg-hitam-pekat rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5),0_0_20px_rgba(146,110,32,0.1)] w-full max-w-xl overflow-hidden border border-gold/20">
                        <div className="px-10 py-8 border-b border-gold/10 flex justify-between items-center bg-gold/5">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.2em] text-gold text-sm">{editingPartner ? 'Update Partnership' : 'Initiate Partnership'}</h4>
                                <p className="text-[10px] text-cream-gold/40 font-bold uppercase tracking-widest mt-1">Strengthen your global ecosystem</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 rounded-full border border-gold/10 flex items-center justify-center text-gold/40 hover:text-gold hover:bg-gold/10 transition-all">&times;</button>
                        </div>
                        <form onSubmit={submit} className="p-10 space-y-6 bg-coklat-kopi/10">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-gold/40 tracking-widest">Brand / Partner Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gold/10 rounded-2xl text-sm font-black p-5 focus:ring-gold focus:border-gold transition-all bg-hitam-pekat/50 text-cream-gold placeholder-cream-gold/20 shadow-sm"
                                    required
                                    placeholder="Ex: Luxury Brews Co."
                                />
                                {errors.name && <div className="text-red-500 text-[10px] font-black uppercase italic tracking-widest mt-1 px-2">{errors.name}</div>}
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-gold/40 tracking-widest">Collaboration Type</label>
                                <input
                                    type="text"
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    placeholder="Ex: Global Logistics, Lifestyle Brand"
                                    className="w-full border-gold/10 rounded-2xl text-sm font-black p-5 focus:ring-gold focus:border-gold transition-all bg-hitam-pekat/50 text-cream-gold placeholder-cream-gold/20 shadow-sm"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-gold/40 tracking-widest">Brief Vision (Optional)</label>
                                <textarea
                                    rows="3"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full border-gold/10 rounded-2xl text-sm font-black p-5 focus:ring-gold focus:border-gold transition-all bg-hitam-pekat/50 text-cream-gold placeholder-cream-gold/20 shadow-sm resize-none"
                                    placeholder="Describe the focus of this partnership..."
                                ></textarea>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-gold/60 tracking-widest text-center mb-4">Partner Identity (Logo)</label>
                                <div className="relative group p-8 border-2 border-dashed border-gold/10 rounded-2xl hover:border-gold/30 hover:bg-gold/5 transition-all flex flex-col items-center justify-center">
                                    <input type="file" onChange={e => setData('logo', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <div className="w-14 h-14 bg-hitam-pekat rounded-xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-gold/10">
                                        <PhotoIcon className="w-6 h-6 text-gold-muda" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-gold tracking-widest group-hover:underline">Upload Logo Artifact</span>
                                    <p className="text-[8px] text-cream-gold/20 font-bold mt-2 uppercase">PNG, JPG up to 2MB</p>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end items-center space-x-6">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-gold/40 font-black uppercase text-[10px] tracking-widest hover:text-gold transition-colors">Abort</button>
                                <button type="submit" disabled={processing} className="px-10 py-4 bg-gold text-hitam-pekat rounded-xl font-black uppercase text-[9px] tracking-[0.2em] shadow-xl shadow-gold/5 hover:scale-[1.05] active:scale-95 transition-all">
                                    {editingPartner ? 'Update Entity' : 'Save Entity'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
