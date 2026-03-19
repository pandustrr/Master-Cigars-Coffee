import React, { useState } from 'react';
import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, useForm } from '@inertiajs/react';
import { 
    PlusIcon, 
    PencilIcon, 
    TrashIcon, 
    DocumentArrowDownIcon, 
    XMarkIcon, 
    EyeIcon 
} from '@heroicons/react/24/outline';

export default function Index({ investments }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [viewingData, setViewingData] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        description: '',
        pdf_file: null,
    });

    const openModal = (item = null) => {
        if (item) {
            setEditData(item);
            setData({
                title: item.title,
                description: item.description || '',
                pdf_file: null,
            });
        } else {
            setEditData(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const openDetail = (item) => {
        setViewingData(item);
        setIsDetailOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editData) {
            post(route('admin.investment.update', editData.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.investment.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    return (
        <SidebarAdmin header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Investasi</h2>}>
            <Head title="Admin Investasi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter">Daftar PDF Investasi</h3>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Kelola dokumen proposal investasi</p>
                        </div>
                        <button
                            onClick={() => openModal()}
                            className="bg-gold text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gold-muda transition-all shadow-lg flex items-center space-x-2"
                        >
                            <PlusIcon className="w-4 h-4" />
                            <span>Tambah PDF Baru</span>
                        </button>
                    </div>

                    {/* Table View */}
                    <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead>
                                <tr className="bg-gray-50/80">
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Judul & Deskripsi</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Tanggal Unggah</th>
                                    <th className="px-6 py-4 text-right text-[10px] font-black text-gray-500 uppercase tracking-widest">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {investments.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-all group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-start space-x-3">
                                                <div className="p-3 bg-red-50 rounded-xl text-red-500 shrink-0">
                                                    <DocumentArrowDownIcon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-gray-800 uppercase leading-none">{item.title}</div>
                                                    {item.description && (
                                                        <div className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-tight max-w-md line-clamp-2 italic">{item.description}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button onClick={() => openDetail(item)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="Detail Info">
                                                    <EyeIcon className="w-4 h-4" />
                                                </button>
                                                <a href={`/storage/${item.pdf_path}`} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all" title="Unduh/Lihat PDF">
                                                    <DocumentArrowDownIcon className="w-4 h-4" />
                                                </a>
                                                <button onClick={() => openModal(item)} className="p-2 text-gray-400 hover:text-gold hover:bg-gold/5 rounded-lg transition-all" title="Edit">
                                                    <PencilIcon className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => { if(confirm('Apakah Anda yakin ingin menghapus PDF ini?')) destroy(route('admin.investment.destroy', item.id)) }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Hapus">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {investments.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-12 text-center text-gray-400 text-xs font-black uppercase tracking-[0.2em]">Tidak ada PDF investasi ditemukan</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal for Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-transparent animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.35)] border border-gray-100 animate-modal-in">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-base font-black text-gray-800 uppercase tracking-widest">{editData ? 'Perbarui Investasi' : 'Tambah Investasi Baru'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <form onSubmit={submit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Judul</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl text-xs font-bold text-gray-800 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                                    placeholder="Masukkan judul dokumen..."
                                />
                                {errors.title && <div className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.title}</div>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Deskripsi Singkat</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl text-xs font-bold text-gray-800 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all resize-none"
                                    placeholder="Masukkan deskripsi singkat mengenai isi PDF..."
                                    rows="3"
                                />
                                {errors.description && <div className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.description}</div>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">File PDF {editData && '(Kosongkan jika tidak ingin mengubah)'}</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={e => setData('pdf_file', e.target.files[0])}
                                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl text-xs font-bold text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[9px] file:font-black file:uppercase file:tracking-widest file:bg-gold file:text-white transition-all shadow-sm cursor-pointer"
                                />
                                {errors.pdf_file && <div className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-1">{errors.pdf_file}</div>}
                            </div>

                            <button
                                disabled={processing}
                                className="w-full bg-gold text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold-muda shadow-lg shadow-gold/20 transition-all flex items-center justify-center space-x-2"
                            >
                                {processing ? 'Memproses...' : (editData ? 'Perbarui Dokumen' : 'Unggah Dokumen')}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for View Detail */}
            {isDetailOpen && viewingData && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-transparent animate-fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.35)] border border-gray-100 animate-modal-in">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-base font-black text-gray-800 uppercase tracking-widest">Detail Investasi</h3>
                            <button onClick={() => setIsDetailOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Judul Dokumen</label>
                                <div className="p-4 bg-gray-50 rounded-xl text-sm font-black text-gray-800 uppercase tracking-tight">{viewingData.title}</div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Deskripsi Singkat</label>
                                <div className="p-4 bg-gray-50 rounded-xl text-xs font-bold text-gray-500 leading-relaxed italic">{viewingData.description || 'Tidak ada deskripsi'}</div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tanggal Diunggah</label>
                                <div className="p-4 bg-gray-50 rounded-xl text-xs font-bold text-gray-500 uppercase">
                                    {new Date(viewingData.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>

                            <div className="pt-4 flex space-x-3">
                                <a 
                                    href={`/storage/${viewingData.pdf_path}`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex-1 bg-emerald-500 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
                                >
                                    <DocumentArrowDownIcon className="w-4 h-4" />
                                    <span>Lihat File PDF</span>
                                </a>
                                <button
                                    onClick={() => { setIsDetailOpen(false); openModal(viewingData); }}
                                    className="flex-1 bg-gold text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold-muda shadow-lg shadow-gold/20 transition-all flex items-center justify-center space-x-2"
                                >
                                    <PencilIcon className="w-4 h-4" />
                                    <span>Edit</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
