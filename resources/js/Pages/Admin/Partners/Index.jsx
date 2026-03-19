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
        category: 'Petani',
        description: '',
        logo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (editingPartner) {
            post(route('admin.partners.update', editingPartner.id), {
                onSuccess: () => { reset(); setEditingPartner(null); setIsAddModalOpen(false); },
            });
        } else {
            post(route('admin.partners.store'), {
                onSuccess: () => { reset(); setIsAddModalOpen(false); },
            });
        }
    };

    const handleEdit = (partner) => {
        setEditingPartner(partner);
        setData({
            name: partner.name,
            type: partner.type,
            category: partner.category || 'Petani',
            description: partner.description || '',
            logo: null
        });
        setIsAddModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Hapus partner ini?')) destroy(route('admin.partners.destroy', id));
    };

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-xl text-gold leading-tight tracking-tight uppercase">Partner</h2>}
        >
            <Head title="Admin - Partners" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">

                    {/* Header */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gold/5 rounded-xl flex items-center justify-center">
                                <UserGroupIcon className="w-5 h-5 text-gold" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight">Mitra Kolaborasi</h3>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Kelola partner & kolaborator</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { reset(); setEditingPartner(null); setIsAddModalOpen(true); }}
                            className="bg-gold text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold-muda transition-all shadow-md flex items-center space-x-2 active:scale-95"
                        >
                            <PlusIcon className="w-4 h-4" />
                            <span>Tambah Partner</span>
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3.5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Nama Partner</th>
                                        <th className="px-6 py-3.5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Tipe</th>
                                        <th className="px-6 py-3.5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Kategori</th>
                                        <th className="px-6 py-3.5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Deskripsi</th>
                                        <th className="px-6 py-3.5 text-right text-[10px] font-black text-gray-500 uppercase tracking-widest">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {partners.map((partner) => (
                                        <tr key={partner.id} className="hover:bg-gray-50/80 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gray-50 overflow-hidden p-1.5 border border-gray-200 flex items-center justify-center shrink-0">
                                                        {partner.logo ? (
                                                            <img src={`/storage/${partner.logo}`} className="w-full h-full object-contain" alt="" />
                                                        ) : (
                                                            <SparklesIcon className="w-5 h-5 text-gray-300" />
                                                        )}
                                                    </div>
                                                    <div className="text-sm font-black text-gray-800 transition-colors">{partner.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 bg-gold/10 text-gold-muda text-[9px] font-black uppercase rounded-lg border border-gold/20">{partner.type}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[9px] font-black uppercase rounded-lg border border-gray-200">{partner.category}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs text-gray-500 max-w-xs truncate">{partner.description || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end space-x-1.5">
                                                    <button onClick={() => handleEdit(partner)} className="p-2 text-gray-400 hover:text-gold hover:bg-gold/5 rounded-lg transition-all">
                                                        <PencilSquareIcon className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDelete(partner.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {partners.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center">
                                                <UserGroupIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                                <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Belum ada partner</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h4 className="font-black uppercase tracking-widest text-gray-800 text-xs">{editingPartner ? 'Edit Partner' : 'Tambah Partner'}</h4>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Isi data mitra</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-800 transition-all">&times;</button>
                        </div>
                        <form onSubmit={submit} className="p-5 space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[9px] font-black uppercase text-gray-500 tracking-widest">Nama Partner</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gray-200 bg-gray-50 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400"
                                    required placeholder="Contoh: Royal Tobacco Alliance" />
                                {errors.name && <div className="text-red-500 text-[9px] italic mt-0.5">{errors.name}</div>}
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[9px] font-black uppercase text-gray-500 tracking-widest">Tipe Kolaborasi</label>
                                <input type="text" value={data.type} onChange={e => setData('type', e.target.value)}
                                    placeholder="Contoh: Distributor, Supplier"
                                    className="w-full border-gray-200 bg-gray-50 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[9px] font-black uppercase text-gray-500 tracking-widest">Kategori</label>
                                <select
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="w-full border-gray-200 bg-gray-50 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all text-gray-800"
                                >
                                    <option value="Petani">Petani</option>
                                    <option value="Marketing Agency">Marketing Agency</option>
                                    <option value="Tour Travel">Tour Travel</option>
                                    <option value="Horeka">Horeka</option>
                                    <option value="UMKM">UMKM</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[9px] font-black uppercase text-gray-500 tracking-widest">Deskripsi</label>
                                <textarea rows="2" value={data.description} onChange={e => setData('description', e.target.value)}
                                    className="w-full border-gray-200 bg-gray-50 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400 resize-none"
                                    placeholder="Deskripsi singkat..."></textarea>
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[9px] font-black uppercase text-gray-500 tracking-widest text-center">Logo (Opsional)</label>
                                <div className="relative group p-4 border border-dashed border-gray-300 rounded-xl hover:border-gold/50 bg-gray-50 transition-all flex flex-col items-center justify-center cursor-pointer">
                                    <input type="file" onChange={e => setData('logo', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <PhotoIcon className="w-6 h-6 text-gray-300 mb-1 group-hover:text-gold transition-colors" />
                                    <span className="text-[9px] font-black uppercase text-gray-400 group-hover:text-gold transition-colors">Pilih File</span>
                                </div>
                            </div>
                            <div className="pt-2 flex justify-end space-x-3">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-500 font-black uppercase text-[9px] tracking-widest hover:text-gray-800 transition-colors">Batal</button>
                                <button type="submit" disabled={processing} className="px-6 py-2.5 bg-gold text-white rounded-xl font-black uppercase text-[9px] tracking-widest shadow-md hover:bg-gold-muda transition-all disabled:opacity-50">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
