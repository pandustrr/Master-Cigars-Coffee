import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    UserGroupIcon,
    PhotoIcon,
    SparklesIcon,
    TagIcon,
    XMarkIcon,
    FunnelIcon,
    CheckIcon
} from '@heroicons/react/24/outline';

export default function Index({ partners, partnerCategories }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingPartner, setEditingPartner] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [logoPreview, setLogoPreview] = useState(null);

    const { data: catData, setData: setCatData, post: postCat, delete: destroyCat, processing: processingCat, reset: resetCat } = useForm({ name: '' });

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        type: 'Global Partner',
        category: partnerCategories.length > 0 ? partnerCategories[0].name : '',
        description: '',
        link: '',
        logo: null,
    });

    // Clear preview when modal closes
    useEffect(() => {
        if (!isAddModalOpen) {
            setLogoPreview(null);
            setEditingPartner(null);
            reset();
        }
    }, [isAddModalOpen]);

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

    const submitCategory = (e) => {
        e.preventDefault();
        if (editingCategory) {
            postCat(route('admin.partner-categories.update', editingCategory.id), {
                onSuccess: () => {
                    resetCat();
                    setEditingCategory(null);
                }
            });
        } else {
            postCat(route('admin.partner-categories.store'), { onSuccess: () => resetCat() });
        }
    };

    const handleEditCategory = (cat) => {
        setEditingCategory(cat);
        setCatData('name', cat.name);
    };

    const handleDeleteCategory = (id) => {
        if (confirm('Hapus kategori ini?')) destroyCat(route('admin.partner-categories.destroy', id), { preserveScroll: true });
    };

    const handleEdit = (partner) => {
        setEditingPartner(partner);
        setLogoPreview(partner.logo ? `/storage/${partner.logo}` : null);
        setData({
            name: partner.name,
            type: partner.type,
            category: partner.category || (partnerCategories.length > 0 ? partnerCategories[0].name : ''),
            description: partner.description || '',
            link: partner.link || '',
            logo: null
        });
        setIsAddModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Hapus partner ini?')) destroy(route('admin.partners.destroy', id));
    };

    const filteredPartners = selectedCategory === 'Semua'
        ? partners
        : partners.filter(p => p.category === selectedCategory);

    return (
        <>
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
                            <div className="flex items-center space-x-2">
                                <button onClick={() => setIsCategoryModalOpen(true)}
                                    className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gray-50 hover:text-gray-800 transition-all flex items-center space-x-2 shadow-sm">
                                    <TagIcon className="w-4 h-4" />
                                    <span>Kategori</span>
                                </button>
                                <button
                                    onClick={() => { reset(); setEditingPartner(null); setIsAddModalOpen(true); }}
                                    className="bg-gold text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold-muda transition-all shadow-md flex items-center space-x-2 active:scale-95"
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    <span>Tambah Partner</span>
                                </button>
                            </div>
                        </div>

                        {/* Table Filter */}
                        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
                            <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                                <div className="px-3 flex items-center space-x-2 border-r border-gray-100 mr-1">
                                    <FunnelIcon className="w-3.5 h-3.5 text-gray-500" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-600">Filter:</span>
                                </div>
                                <button
                                    onClick={() => setSelectedCategory('Semua')}
                                    className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${selectedCategory === 'Semua' ? 'bg-hitam-pekat text-white shadow-lg shadow-black/20' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                                    SEMUA
                                </button>
                                {partnerCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.name)}
                                        className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${selectedCategory === cat.name ? 'bg-gold text-hitam-pekat shadow-lg shadow-gold/20' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
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
                                        {filteredPartners.map((partner) => (
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
                                                        <div className="text-sm font-black text-gray-800 transition-colors uppercase italic tracking-tighter">{partner.name}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2.5 py-1 bg-gold/5 text-gold-muda text-[9px] font-black uppercase rounded-lg border border-gold/10 tracking-widest">{partner.type}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[9px] font-black uppercase rounded-lg border border-gray-100 tracking-widest">{partner.category}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs text-gray-500 max-w-xs truncate font-medium group-hover:text-gray-800 transition-colors italic">"{partner.description || '-'}"</div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end space-x-1.5">
                                                        <button onClick={() => handleEdit(partner)} className="p-3 text-gold bg-gold/5 hover:bg-gold/10 rounded-xl transition-all shadow-sm border border-gold/10">
                                                            <PencilSquareIcon className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => handleDelete(partner.id)} className="p-3 text-red-500 bg-red-50/50 hover:bg-red-50 rounded-xl transition-all shadow-sm border border-red-100">
                                                            <TrashIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredPartners.length === 0 && (
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

                {/* Modal Partner */}
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-transparent" onClick={() => setIsAddModalOpen(false)}></div>
                        <div className="relative bg-white rounded-3xl shadow-[0_30px_100px_-10px_rgba(0,0,0,0.35)] w-full max-w-4xl overflow-hidden border border-gray-100/50 flex flex-col">
                            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
                                <div className="flex items-center space-x-3">
                                    <div className="w-9 h-9 bg-gold/5 rounded-xl flex items-center justify-center">
                                        <PlusIcon className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase tracking-widest text-gray-800 text-sm">{editingPartner ? 'Edit Partner' : 'Tambah Partner Baru'}</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Lengkapi informasi mitra kolaborasi Anda</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsAddModalOpen(false)} 
                                    className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-red-500 transition-all duration-300">
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <form onSubmit={submit} className="flex-1 overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                                    {/* Left Side: Logo Upload */}
                                    <div className="md:col-span-5 bg-gray-50/50 p-8 flex flex-col items-center justify-center border-r border-gray-100 space-y-4">
                                        <label className="block text-[10px] font-black uppercase text-gray-600 tracking-widest text-center mb-2">Logo/Identitas Partner</label>
                                        
                                        <div className="relative group w-full aspect-square max-w-[280px] p-2 bg-white border-2 border-dashed border-gray-200 rounded-[2.5rem] hover:border-gold/50 transition-all duration-500 flex flex-col items-center justify-center cursor-pointer overflow-hidden shadow-sm group">
                                            <input type="file"
                                                onChange={e => {
                                                    const file = e.target.files[0];
                                                    setData('logo', file);
                                                    if (file) setLogoPreview(URL.createObjectURL(file));
                                                }}
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            />
                                            {logoPreview ? (
                                                <div className="w-full h-full relative p-6">
                                                    <img src={logoPreview} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" alt="Preview" />
                                                    <div className="absolute inset-0 bg-gold/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                                        <div className="bg-white/90 p-3 rounded-2xl shadow-xl">
                                                            <PhotoIcon className="w-6 h-6 text-gold" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center space-y-4 p-8 text-center uppercase tracking-widest">
                                                    <div className="w-16 h-16 bg-gold/5 rounded-3xl flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                                                        <PhotoIcon className="w-8 h-8 text-gold/40 group-hover:text-gold transition-colors" />
                                                    </div>
                                                    <div>
                                                        <span className="block text-[10px] font-black text-gray-400 group-hover:text-gold transition-colors">Klik atau Tarik File</span>
                                                        <span className="block text-[8px] font-bold text-gray-300 mt-1">PNG, JPG up to 2MB</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tight text-center italic max-w-[200px]">Disarankan menggunakan logo dengan latar belakang transparan</p>
                                    </div>

                                    {/* Right Side: Form Content */}
                                    <div className="md:col-span-7 p-8 space-y-5">
                                        <div className="grid grid-cols-1 gap-5">
                                            {/* Nama Partner */}
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Nama Partner</label>
                                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                                                    className="w-full border-gray-100 bg-gray-50/50 rounded-2xl text-[11px] font-black p-3.5 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400 border shadow-inner uppercase tracking-wider"
                                                    required placeholder="CONTOH: ROYAL TOBACCO ALLIANCE" />
                                                {errors.name && <div className="text-red-500 text-[9px] font-bold uppercase mt-1 italic pl-1">{errors.name}</div>}
                                            </div>

                                            {/* Tipe & Kategori */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Tipe Kolaborasi</label>
                                                    <input type="text" value={data.type} onChange={e => setData('type', e.target.value)}
                                                        placeholder="MISAL: DISTRIBUTOR"
                                                        className="w-full border-gray-100 bg-gray-50/50 rounded-2xl text-[11px] font-black p-3.5 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400 border shadow-inner uppercase tracking-wider" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Kategori</label>
                                                    <select
                                                        value={data.category}
                                                        onChange={e => setData('category', e.target.value)}
                                                        className="w-full border-gray-100 bg-gray-50/50 rounded-2xl text-[11px] font-black p-3.5 focus:ring-gold focus:border-gold transition-all text-gray-800 border shadow-inner uppercase tracking-wider"
                                                    >
                                                        {partnerCategories.map((cat) => (
                                                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Deskripsi */}
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Deskripsi Singkat</label>
                                                <textarea rows="3" value={data.description} onChange={e => setData('description', e.target.value)}
                                                    className="w-full border-gray-100 bg-gray-50/50 rounded-2xl text-[11px] font-black p-3.5 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400 border shadow-inner uppercase tracking-wider resize-none"
                                                    placeholder="CERITAKAN SEDIKIT TENTANG MITRA INI..."></textarea>
                                            </div>

                                            {/* Link */}
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1 flex justify-between">
                                                    <span>Link Partner (URL)</span>
                                                    <span className="text-[8px] opacity-60">OPSIONAL</span>
                                                </label>
                                                <input type="url" value={data.link} onChange={e => setData('link', e.target.value)}
                                                    className="w-full border-gray-100 bg-gray-50/50 rounded-2xl text-[11px] font-black p-3.5 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400 border shadow-inner lowercase italic font-medium"
                                                    placeholder="https://example.com" />
                                                {errors.link && <div className="text-red-500 text-[9px] font-bold uppercase mt-1 italic pl-1">{errors.link}</div>}
                                            </div>
                                        </div>

                                        <div className="pt-6 flex justify-end items-center space-x-4 border-t border-gray-100 mt-4">
                                            <button type="button" onClick={() => setIsAddModalOpen(false)} 
                                                className="px-6 py-3 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-gray-800 transition-all">
                                                Batal
                                            </button>
                                            <button type="submit" disabled={processing} 
                                                className="px-8 py-3.5 bg-gold text-hitam-pekat rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-gold/20 hover:bg-gold-muda hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-50 flex items-center space-x-2">
                                                {processing ? (
                                                    <div className="w-4 h-4 border-2 border-hitam-pekat/20 border-t-hitam-pekat rounded-full animate-spin"></div>
                                                ) : (
                                                    <CheckIcon className="w-4 h-4" />
                                                )}
                                                <span>Simpan Partner</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </SidebarAdmin>

            {/* Category Modal */}
            {isCategoryModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-transparent" onClick={() => { setIsCategoryModalOpen(false); setEditingCategory(null); resetCat(); }}></div>
                    <div className="relative bg-white rounded-3xl shadow-[0_30px_90px_-15px_rgba(0,0,0,0.4)] w-full max-w-md overflow-hidden border border-gray-100/50">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h4 className="font-black uppercase tracking-widest text-gray-800 text-xs">Kelola Kategori</h4>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Tambah & perbarui kategori Partner</p>
                            </div>
                            <button onClick={() => { setIsCategoryModalOpen(false); setEditingCategory(null); resetCat(); }} className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-5 space-y-5">
                            <form onSubmit={submitCategory} className="flex gap-2">
                                <input type="text" value={catData.name} onChange={e => setCatData('name', e.target.value)}
                                    className="flex-1 border-gray-200 rounded-xl text-[10px] font-black p-3 focus:ring-gold focus:border-gold transition-all bg-gray-50 text-gray-800 placeholder-gray-400 uppercase tracking-wider shadow-inner"
                                    placeholder="Masukkan nama kategori..." required />
                                <button type="submit" disabled={processingCat} className={`px-5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-md ${editingCategory ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-gold text-white hover:bg-gold-muda'}`}>
                                    {editingCategory ? 'Update' : 'Tambah'}
                                </button>
                            </form>

                            {editingCategory && (
                                <div className="bg-amber-50 p-2 rounded-lg flex items-center justify-between border border-amber-100">
                                    <span className="text-[8px] font-black uppercase text-amber-600 tracking-widest pl-2 italic">Mode Edit: {editingCategory.name}</span>
                                    <button onClick={() => { setEditingCategory(null); resetCat(); }} className="text-[7px] font-black uppercase bg-white px-2 py-1 rounded-md text-amber-600 border border-amber-200">Batal</button>
                                </div>
                            )}

                            <div className="bg-gray-50/50 rounded-xl p-3.5 max-h-[280px] overflow-y-auto border border-gray-100 space-y-2 no-scrollbar">
                                {partnerCategories.map((cat) => (
                                    <div key={cat.id} className={`group bg-white p-3 rounded-xl border flex justify-between items-center transition-all shadow-sm ${editingCategory?.id === cat.id ? 'border-amber-400 bg-amber-50/30' : 'border-gray-50 hover:border-gold/30 hover:shadow-md'}`}>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-gold transition-colors">
                                                <TagIcon className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest leading-none">{cat.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-1.5 transition-opacity">
                                            <button onClick={() => handleEditCategory(cat)} className="p-1.5 text-amber-500 bg-amber-50/50 hover:bg-amber-50 rounded-lg transition-all border border-amber-100">
                                                <PencilSquareIcon className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => handleDeleteCategory(cat.id)} className="p-1.5 text-red-500 bg-red-50/50 hover:bg-red-50 rounded-lg transition-all border border-red-100">
                                                <TrashIcon className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
