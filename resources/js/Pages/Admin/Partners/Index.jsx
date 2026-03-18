import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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
        <AuthenticatedLayout
            header={<h2 className="font-black text-2xl text-gray-900 leading-tight tracking-tighter">Partner Management</h2>}
        >
            <Head title="Admin - Partners" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    <div className="flex justify-between items-center bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                <UserGroupIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">Collaboration Ecosystem</h3>
                                <p className="text-lg font-black text-gray-900 tracking-tight">Manage your strategic partners</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { reset(); setEditingPartner(null); setIsAddModalOpen(true); }}
                            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center space-x-2 active:scale-95"
                        >
                            <PlusIcon className="w-4 h-4" />
                            <span>Add New Partner</span>
                        </button>
                    </div>

                    <div className="bg-white shadow-sm sm:rounded-[2.5rem] border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Partner Identity</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Brand Type</th>
                                        <th className="px-8 py-5 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Focus & Direction</th>
                                        <th className="px-8 py-5 text-right text-[11px] font-black text-gray-700 uppercase tracking-widest">Management</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {partners.map((partner) => (
                                        <tr key={partner.id} className="hover:bg-gray-50/80 transition-all group">
                                            <td className="px-8 py-6 flex items-center space-x-5">
                                                <div className="w-16 h-16 rounded-2xl bg-white overflow-hidden p-2 border border-gray-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    {partner.logo ? (
                                                        <img src={`/storage/${partner.logo}`} className="w-full h-full object-contain" alt="" />
                                                    ) : (
                                                        <SparklesIcon className="w-8 h-8 text-gray-200" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-base font-black text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{partner.name}</div>
                                                    <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-0.5 italic">Verified Partner</div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="bg-indigo-600 text-white text-[9px] px-3 py-1.5 rounded-lg font-black uppercase tracking-[0.1em] shadow-lg shadow-indigo-100 border border-indigo-400">
                                                    {partner.type}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-sm font-bold text-gray-600 max-w-sm">
                                                <div className="truncate group-hover:whitespace-normal group-hover:text-gray-900 transition-all duration-300">
                                                    {partner.description || 'Global collaboration and strategic growth.'}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right whitespace-nowrap">
                                                <div className="flex justify-end items-center space-x-3">
                                                    <button
                                                        onClick={() => handleEdit(partner)}
                                                        className="w-10 h-10 flex items-center justify-center bg-gray-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm border border-gray-100"
                                                        title="Edit Partner"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(partner.id)}
                                                        className="w-10 h-10 flex items-center justify-center bg-gray-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm border border-gray-100"
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
                                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                        <UserGroupIcon className="w-10 h-10 text-gray-200" />
                                                    </div>
                                                    <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No partners identified yet</p>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden border border-white/20">
                        <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.2em] text-gray-900 text-sm">{editingPartner ? 'Update Partnership' : 'Initiate Partnership'}</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Strengthen your global ecosystem</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all">&times;</button>
                        </div>
                        <form onSubmit={submit} className="p-10 space-y-8">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest">Brand / Partner Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gray-200 rounded-2xl text-sm font-black p-5 focus:ring-indigo-600 focus:border-indigo-600 transition-all bg-gray-50/50"
                                    required
                                    placeholder="Ex: Luxury Brews Co."
                                />
                                {errors.name && <div className="text-red-500 text-[10px] font-black uppercase italic tracking-widest mt-1 px-2">{errors.name}</div>}
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest">Collaboration Type</label>
                                <input
                                    type="text"
                                    value={data.type}
                                    onChange={e => setData('type', e.target.value)}
                                    placeholder="Ex: Global Logistics, Lifestyle Brand"
                                    className="w-full border-gray-200 rounded-2xl text-sm font-black p-5 focus:ring-indigo-600 focus:border-indigo-600 transition-all bg-gray-50/50"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest">Brief Vision (Optional)</label>
                                <textarea
                                    rows="3"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full border-gray-200 rounded-2xl text-sm font-black p-5 focus:ring-indigo-600 focus:border-indigo-600 transition-all bg-gray-50/50 resize-none"
                                    placeholder="Describe the focus of this partnership..."
                                ></textarea>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest text-center mb-4">Partner Identity (Logo)</label>
                                <div className="relative group p-10 border-2 border-dashed border-gray-100 rounded-[2.5rem] hover:border-indigo-200 hover:bg-indigo-50/30 transition-all flex flex-col items-center justify-center">
                                    <input type="file" onChange={e => setData('logo', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-gray-50">
                                        <PhotoIcon className="w-8 h-8 text-indigo-400" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest group-hover:underline">Upload Logo Artifact</span>
                                    <p className="text-[9px] text-gray-400 font-bold mt-2 uppercase">PNG, JPG up to 2MB</p>
                                </div>
                            </div>

                            <div className="pt-8 flex justify-end items-center space-x-6">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-gray-900 transition-colors">Abort</button>
                                <button type="submit" disabled={processing} className="px-12 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl shadow-indigo-100 hover:scale-[1.05] active:scale-95 transition-all">
                                    {editingPartner ? 'Update Entity' : 'Save Entity'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
