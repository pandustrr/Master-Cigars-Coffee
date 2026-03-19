import React from 'react';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';

export function ItemFormModal({ isItemModalOpen, setIsItemModalOpen, editingItem, data, setData, submitItem, processing, imagePreview, setImagePreview }) {
    if (!isItemModalOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in pointer-events-none">
            <div className="absolute inset-0 bg-transparent pointer-events-auto" onClick={() => setIsItemModalOpen(false)}></div>
            <div className="relative pointer-events-auto bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-gray-900/5 w-full max-w-md overflow-hidden border border-gray-100 scale-100 transition-all">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h4 className="font-black uppercase tracking-widest text-gray-800 text-xs">{editingItem ? 'Edit Item' : 'Tambah Item'}</h4>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Isi detail produk</p>
                    </div>
                    <button onClick={() => { setIsItemModalOpen(false); setImagePreview(null); }} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-800 transition-all">&times;</button>
                </div>
                <form onSubmit={submitItem} className="p-5 space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-[9px] font-black uppercase text-gray-500 tracking-widest">Nama Item</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border-gray-200 bg-gray-50 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400" required placeholder="Contoh: Master Coffee Robusta" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5 md:col-span-1">
                            <label className="block text-[9px] font-black uppercase text-gray-500 tracking-widest">Kategori</label>
                            <select value={data.category} onChange={e => setData('category', e.target.value)} className="w-full border-gray-200 bg-gray-50 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all text-gray-800">
                                <option className="bg-white">Retail</option>
                                <option className="bg-white">Package</option>
                                <option className="bg-white">Point Corner</option>
                            </select>
                        </div>
                        <div className="space-y-1.5 md:col-span-1">
                            <label className="block text-[9px] font-black uppercase text-gray-500 tracking-widest">Harga (IDR)</label>
                            <input type="number" value={data.price} onChange={e => setData('price', e.target.value)} className="w-full border-gray-200 bg-gray-50 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400" required placeholder="50000" />
                        </div>
                        <div className="space-y-1.5 md:col-span-1">
                            <label className="block text-[9px] font-black uppercase text-gray-500 tracking-widest">Stok (Sisa)</label>
                            <input type="number" value={data.stock} onChange={e => setData('stock', e.target.value)} className="w-full border-gray-200 bg-gray-50 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400" required min="0" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[9px] font-black uppercase text-gray-500 tracking-widest">Deskripsi</label>
                        <textarea rows="2" value={data.description} onChange={e => setData('description', e.target.value)} className="w-full border-gray-200 bg-gray-50 rounded-xl text-xs font-bold p-3 focus:ring-gold focus:border-gold transition-all resize-none text-gray-800 placeholder-gray-400" placeholder="Deskripsi singkat produk..."></textarea>
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[9px] font-black uppercase text-gray-500 tracking-widest text-center">Gambar (Opsional)</label>
                        <div className="relative group border border-dashed border-gray-300 rounded-xl hover:border-gold/50 bg-gray-50 transition-all flex flex-col items-center justify-center overflow-hidden h-32">
                            <input type="file" onChange={(e) => {
                                const file = e.target.files[0];
                                setData('image', file);
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setImagePreview(reader.result);
                                    reader.readAsDataURL(file);
                                } else {
                                    setImagePreview(editingItem?.image ? `/storage/${editingItem.image}` : null);
                                }
                            }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            
                            {imagePreview ? (
                                <div className="absolute inset-0 w-full h-full z-0 p-1">
                                    <img src={imagePreview} className="w-full h-full object-cover rounded-lg" alt="Preview" />
                                    <div className="absolute inset-0 m-1 rounded-lg bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-[9px] font-black uppercase tracking-widest">Ganti Gambar</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <ArchiveBoxIcon className="w-7 h-7 text-gray-300 mb-1.5 group-hover:text-gold group-hover:scale-110 transition-all" />
                                    <span className="text-[9px] font-black uppercase text-gray-400 group-hover:text-gold transition-colors">Pilih File</span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="pt-2 flex justify-end space-x-3">
                        <button type="button" onClick={() => { setIsItemModalOpen(false); setImagePreview(null); }} className="px-4 py-2 text-gray-500 font-black uppercase text-[9px] tracking-widest hover:text-gray-800 transition-colors">Batalkan</button>
                        <button type="submit" disabled={processing} className="px-6 py-2.5 bg-gold text-white rounded-xl font-black uppercase text-[9px] tracking-widest shadow-md hover:bg-gold-muda transition-all">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function ViewItemModal({ viewingItem, setViewingItem }) {
    if (!viewingItem) return null;
    
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in pointer-events-none">
            <div className="absolute inset-0 bg-transparent pointer-events-auto" onClick={() => setViewingItem(null)}></div>
            <div className="relative pointer-events-auto bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] ring-1 ring-gray-900/5 w-full max-w-sm overflow-hidden border border-gray-100 scale-100 transition-all flex flex-col items-center p-8">
                <button onClick={() => setViewingItem(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-800 transition-all">&times;</button>
                
                <div className="w-32 h-32 rounded-3xl bg-gray-50 overflow-hidden shadow-inner mb-6 border border-gray-100 p-2">
                     {viewingItem.image ? (
                         <img src={`/storage/${viewingItem.image}`} className="w-full h-full object-cover rounded-2xl shadow-sm" alt={viewingItem.name} />
                     ) : (
                         <div className="w-full h-full flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 text-gray-400 text-2xl font-black italic">MC</div>
                     )}
                </div>

                <div className="text-center w-full">
                    <h3 className="text-xl font-black text-gray-800 tracking-tighter uppercase mb-2">{viewingItem.name}</h3>
                    <div className="flex justify-center space-x-2 mb-6">
                        <span className="px-3 py-1 bg-gold/10 text-gold-muda font-black text-[9px] uppercase rounded-lg border border-gold/20">{viewingItem.category}</span>
                        <span className="px-3 py-1 bg-green-50 text-green-600 font-black text-[9px] uppercase rounded-lg border border-green-100/50">Rp {parseFloat(viewingItem.price).toLocaleString()}</span>
                    </div>

                    <div className="w-full h-px bg-gray-100 mb-6"></div>

                    <div className="text-left w-full space-y-2">
                        <label className="block text-[9px] font-black uppercase text-gray-400 tracking-widest">Deskripsi Produk</label>
                        <p className="text-sm font-bold text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                            {viewingItem.description || 'Tidak ada deskripsi.'}
                        </p>
                    </div>
                </div>

                <div className="mt-8 relative z-20">
                    <button onClick={() => setViewingItem(null)} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-gray-800 hover:-translate-y-1 shadow-lg shadow-gray-900/20 active:scale-95 transition-all">Tutup Detail</button>
                </div>
            </div>
        </div>
    );
}
