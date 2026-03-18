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

                    <div className="bg-gradient-to-r from-coklat-kopi/40 to-coklat-tua/40 p-10 rounded-[2.5rem] shadow-2xl border border-gold/10 flex flex-col md:flex-row justify-between items-center gap-6 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] group-hover:bg-gold/10 transition-all duration-1000"></div>
                        <div className="flex items-center space-x-6 relative z-10">
                            <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center text-gold shadow-2xl shadow-gold/5 transition-transform group-hover:scale-110 group-hover:rotate-6">
                                <UserGroupIcon className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold/30">Collaboration Ecosystem</h3>
                                <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cream-gold to-gold tracking-tight uppercase italic mt-1">Strategic Partners</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { reset(); setEditingPartner(null); setIsAddModalOpen(true); }}
                            className="relative overflow-hidden bg-gold text-hitam-pekat px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(175,146,109,0.3)] flex items-center space-x-3 group/btn"
                        >
                            <PlusIcon className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-500" />
                            <span>Initiate Partner</span>
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
                                        <tr key={partner.id} className="hover:bg-gold/[0.03] transition-all duration-300 group">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center space-x-6">
                                                    <div className="w-20 h-20 rounded-[1.5rem] bg-hitam-pekat overflow-hidden p-3 border border-gold/20 shadow-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                                                        {partner.logo ? (
                                                            <img src={`/storage/${partner.logo}`} className="w-full h-full object-contain" alt="" />
                                                        ) : (
                                                            <SparklesIcon className="w-10 h-10 text-gold/10" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-black text-cream-gold group-hover:text-gold transition-colors tracking-tight uppercase">{partner.name}</div>
                                                        <div className="text-[10px] text-gold/30 font-black uppercase tracking-[0.3em] mt-2 leading-none italic">Verified Strategic Asset</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <span className="px-4 py-1.5 bg-gold/5 text-gold text-[10px] font-black uppercase tracking-widest rounded-full border border-gold/10 shadow-sm">
                                                    {partner.type}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="text-xs font-bold text-cream-gold/40 leading-relaxed max-w-xs group-hover:text-cream-gold transition-colors">
                                                    {partner.description || 'N/A: Standard collaboration protocol enabled.'}
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                                    <button onClick={() => handleEdit(partner)} className="p-3 text-cream-gold/40 hover:text-gold hover:bg-gold/10 rounded-2xl border border-transparent hover:border-gold/20 transition-all active:scale-95 shadow-xl"><PencilSquareIcon className="w-5 h-5" /></button>
                                                    <button onClick={() => handleDelete(partner.id)} className="p-3 text-cream-gold/40 hover:text-red-500 hover:bg-red-500/10 rounded-2xl border border-transparent hover:border-red-500/20 transition-all active:scale-95 shadow-xl"><TrashIcon className="w-5 h-5" /></button>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-hitam-pekat/95 backdrop-blur-3xl animate-fade-in transition-all duration-500">
                    <div className="bg-gradient-to-br from-coklat-kopi to-hitam-pekat rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.8),0_0_50px_rgba(175,146,109,0.15)] w-full max-w-xl overflow-hidden border border-gold/20 transform animate-in zoom-in duration-300">
                        <div className="px-12 py-10 border-b border-gold/10 flex justify-between items-center bg-gold/[0.02]">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.3em] text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-muda italic">{editingPartner ? 'Update Entity' : 'New Strategic Entry'}</h4>
                                <p className="text-[10px] text-cream-gold/30 font-black uppercase tracking-[0.4em] mt-3 leading-none italic">Configure ecosystem parameters</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-14 h-14 rounded-2xl border border-gold/10 flex items-center justify-center text-gold/30 hover:text-gold hover:bg-gold/10 hover:rotate-90 transition-all duration-500 text-2xl font-light">×</button>
                        </div>
                        <form onSubmit={submit} className="p-12 space-y-8">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-gold tracking-[0.3em]">Brand Identity Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gold/10 bg-hitam-pekat p-5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all shadow-inner text-cream-gold placeholder-cream-gold/10"
                                    required
                                    placeholder="Ex: Royal Tobacco Alliance"
                                />
                                {errors.name && <div className="text-red-500 text-[10px] font-black uppercase italic tracking-widest mt-1 px-2">{errors.name}</div>}
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-gold tracking-[0.3em]">Collaboration Niche</label>
                                <input
                                    type="text"
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    placeholder="Ex: Global Supply Chain, Lifestyle Estate"
                                    className="w-full border-gold/10 bg-hitam-pekat p-5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all shadow-inner text-cream-gold placeholder-cream-gold/10"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-gold tracking-[0.3em]">Operational Vision</label>
                                <textarea
                                    rows="3"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full border-gold/10 bg-hitam-pekat p-5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all shadow-inner text-cream-gold placeholder-cream-gold/10 resize-none"
                                    placeholder="Define strategic objectives..."
                                ></textarea>
                            </div>

                            <div className="space-y-4 text-center">
                                <label className="block text-[10px] font-black uppercase text-gold/40 tracking-[0.4em] mb-2 leading-none">Visual Hallmark (Logo)</label>
                                <div className="relative group p-8 border border-dashed border-gold/20 rounded-3xl hover:border-gold transition-all flex flex-col items-center justify-center bg-hitam-pekat/40 shadow-inner">
                                    <input type="file" onChange={e => setData('logo', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <div className="w-16 h-16 bg-hitam-pekat rounded-2xl shadow-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-gold/10">
                                        <PhotoIcon className="w-8 h-8 text-gold/30 group-hover:text-gold transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-gold/40 tracking-[0.3em] group-hover:text-gold transition-colors">Select Brand Asset</span>
                                </div>
                            </div>

                            <div className="pt-8 flex justify-end items-center space-x-12">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-gold/30 font-black uppercase text-[10px] tracking-[0.4em] hover:text-gold transition-all">Abort</button>
                                <button type="submit" disabled={processing} className="px-12 py-5 bg-gold text-hitam-pekat rounded-[1.8rem] font-black uppercase text-[10px] tracking-[0.3em] shadow-[0_20px_40px_rgba(175,146,109,0.2)] hover:scale-105 active:scale-95 transition-all">
                                    Commit Entry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
