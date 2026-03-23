import React from 'react';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon, TagIcon } from '@heroicons/react/24/outline';

export default function CatalogTab({ saleItems, categories, catalogFilter, setCatalogFilter, filteredCatalogItems, setViewingItem, handleEditItem, reset, setIsItemModalOpen, setIsCategoryModalOpen, setImagePreview, destroy }) {
    return (
        <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                    <div>
                        <h3 className="text-base font-black text-gray-800 tracking-tight uppercase">Marketplace Produk</h3>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Kelola produk dan layanan</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 bg-gray-50 border border-gray-100 rounded-lg p-1">
                            {['Semua', ...categories.map(c => c.name)].map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setCatalogFilter(filter)}
                                    className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${catalogFilter === filter
                                        ? 'bg-white text-gold shadow-sm border border-gray-200'
                                        : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsCategoryModalOpen(true)}
                            className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gray-50 hover:text-gray-800 transition-all flex items-center space-x-2 shadow-sm"
                        >
                            <TagIcon className="w-4 h-4" />
                            <span>Kategori</span>
                        </button>
                        <button
                            onClick={() => { reset(); setIsItemModalOpen(true); setImagePreview(null); }}
                            className="bg-gold text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold-muda transition-all shadow-md flex items-center space-x-2"
                        >
                            <PlusIcon className="w-4 h-4" />
                            <span>Tambah Item</span>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-100">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3.5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Item</th>
                                <th className="px-6 py-3.5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Kategori</th>
                                <th className="px-6 py-3.5 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Harga & Stok</th>
                                <th className="px-6 py-3.5 text-right text-[10px] font-black text-gray-500 uppercase tracking-widest">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCatalogItems.length > 0 ? filteredCatalogItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-all group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                                                {item.image ? (
                                                    <img src={`/storage/${item.image}`} className="w-full h-full object-cover" alt={item.name} />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-black italic">MC</div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-gray-800 transition-colors">{item.name}</div>
                                                <div className="text-[10px] text-gray-400 font-bold uppercase truncate max-w-[200px] mt-0.5">{item.description || '-'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-block px-3 py-1 bg-white text-gold font-black text-[9px] uppercase tracking-widest rounded-md border border-gray-100 shadow-md">{item.category}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-black text-gold">Rp {parseFloat(item.price).toLocaleString()}</div>
                                        <div className="text-[10px] font-bold text-gray-400 mt-0.5">Stok: <span className={item.stock > 0 ? 'text-gray-700' : 'text-red-500'}>{Math.max(0, item.stock)}</span></div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end space-x-1.5">
                                            <button onClick={() => setViewingItem(item)} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><EyeIcon className="w-4 h-4" /></button>
                                            <button onClick={() => handleEditItem(item)} className="p-2 text-gray-400 hover:text-gold hover:bg-gold/5 rounded-lg transition-all"><PencilIcon className="w-4 h-4" /></button>
                                            <button onClick={() => { if (confirm('Hapus item?')) destroy(route('admin.sales.items.destroy', item.id)) }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><TrashIcon className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-10 text-center text-gray-400 text-[10px] font-black uppercase tracking-widest border-t border-gray-50">
                                        Belum ada produk Marketplace untuk kategori ini
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
