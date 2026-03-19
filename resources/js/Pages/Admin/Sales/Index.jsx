import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    ShoppingBagIcon,
    TruckIcon,
    CheckCircleIcon,
    ArchiveBoxIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    ClipboardDocumentIcon,
    MagnifyingGlassIcon,
    ChatBubbleLeftRightIcon,
    EyeIcon
} from '@heroicons/react/24/outline';

export default function Index({ retailOrders, packageOrders, pointCornerOrders, saleItems }) {
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [viewingItem, setViewingItem] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [activeTab, setActiveTab] = useState('catalog');
    const [catalogFilter, setCatalogFilter] = useState('Semua');

    const { data, setData, post, delete: destroy, processing, reset } = useForm({
        name: '',
        price: '',
        category: 'Retail',
        description: '',
        stock: 0,
        image: null,
    });

    const submitItem = (e) => {
        e.preventDefault();
        if (editingItem) {
            post(route('admin.sales.items.update', editingItem.id), {
                onSuccess: () => { reset(); setEditingItem(null); setIsItemModalOpen(false); setImagePreview(null); }
            });
        } else {
            post(route('admin.sales.items.store'), {
                onSuccess: () => { reset(); setIsItemModalOpen(false); setImagePreview(null); }
            });
        }
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setImagePreview(item.image ? `/storage/${item.image}` : null);
        setData({
            name: item.name,
            price: item.price,
            category: item.category,
            description: item.description || '',
            stock: item.stock !== undefined ? item.stock : 0,
            image: null,
        });
        setIsItemModalOpen(true);
    };

    const tabs = [
        { id: 'catalog', name: 'Manajemen Katalog', icon: ArchiveBoxIcon, count: saleItems.length },
        { id: 'retail', name: 'Pesanan Ritel', icon: ShoppingBagIcon, count: retailOrders.length },
        { id: 'package', name: 'Pesanan Paket', icon: TruckIcon, count: packageOrders.length },
        { id: 'point', name: 'Pesanan Point Corner', icon: CheckCircleIcon, count: pointCornerOrders.length },
    ];

    const filteredCatalogItems = catalogFilter === 'Semua'
        ? saleItems
        : saleItems.filter(item => item.category === catalogFilter);

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-2xl text-gold leading-tight tracking-tighter uppercase">Manajemen Penjualan</h2>}
        >
            <Head title="Admin - Sales" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Tab Navigation */}
                    <div className="bg-white p-2 rounded-xl border border-gray-100 flex space-x-2 overflow-x-auto no-scrollbar shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center space-x-2 py-2.5 px-5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 shrink-0
                                    ${activeTab === tab.id
                                        ? 'bg-gold text-white shadow-md'
                                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-800'}
                                `}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-gray-300'}`} />
                                <span>{tab.name}</span>
                                <span className={`text-[9px] px-2 py-0.5 rounded border ${activeTab === tab.id ? 'bg-white/20 border-white/20 text-white' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="animate-fade-in">
                        {activeTab === 'catalog' && (
                            <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                                        <div>
                                            <h3 className="text-base font-black text-gray-800 tracking-tight uppercase">Katalog Produk</h3>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Kelola produk dan layanan</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            {/* Filter Katalog */}
                                            <div className="flex items-center space-x-1 bg-gray-50 border border-gray-100 rounded-lg p-1">
                                                {['Semua', 'Retail', 'Package', 'Point Corner'].map(filter => {
                                                    const count = filter === 'Semua' ? saleItems.length : saleItems.filter(i => i.category === filter).length;
                                                    return (
                                                        <button
                                                            key={filter}
                                                            onClick={() => setCatalogFilter(filter)}
                                                            className={`px-3 py-1.5 flex items-center space-x-1.5 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${catalogFilter === filter
                                                                ? 'bg-white text-gold shadow-sm border border-gray-200'
                                                                : 'text-gray-400 hover:text-gray-600'
                                                                }`}
                                                        >
                                                            <span>{filter}</span>
                                                            <span className={`px-1.5 py-0.5 rounded-md text-[8px] ${catalogFilter === filter ? 'bg-gold/10 text-gold-muda border border-gold/20' : 'bg-gray-200/50 text-gray-500'
                                                                }`}>{count}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <button
                                                onClick={() => { reset(); setEditingItem(null); setIsItemModalOpen(true); setImagePreview(null); }}
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
                                                                        <img src={`/storage/${item.image}`} className="w-full h-full object-cover" />
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
                                                            <div className="text-[10px] font-bold text-gray-400 mt-0.5">Stok: <span className={item.stock > 0 ? 'text-gray-700' : 'text-red-500'}>{item.stock}</span></div>
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
                                                        <td colSpan="4" className="px-6 py-12 text-center text-gray-400 text-[10px] font-black uppercase tracking-widest border-t border-gray-50">
                                                            Belum ada katalog untuk kategori ini
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(activeTab === 'retail' || activeTab === 'package' || activeTab === 'point') && (
                            <div className="bg-white shadow-sm rounded-3xl border border-gray-100 overflow-hidden">
                                <div className="p-10">
                                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                                        <div>
                                            <h3 className="text-xl font-black text-gray-800 tracking-tighter uppercase">
                                                {activeTab === 'retail' ? 'Pesanan Ritel' : activeTab === 'package' ? 'Pesanan Paket' : 'Pesanan Point Corner'}
                                            </h3>
                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1 leading-none">Pemantauan status pesanan secara waktu nyata</p>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-100">
                                            <thead>
                                                <tr className="bg-gray-50/80">
                                                    <th className="px-4 py-5 text-left text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Pelanggan</th>
                                                    <th className="px-4 py-5 text-left text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Pesanan</th>
                                                    <th className="px-4 py-5 text-left text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Total Harga</th>
                                                    <th className="px-4 py-5 text-left text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Bukti Bayar</th>
                                                    <th className="px-4 py-5 text-left text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Status</th>
                                                    <th className="px-4 py-5 text-left text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">No. Resi</th>
                                                    <th className="px-4 py-5 text-right text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {(activeTab === 'retail' ? retailOrders : activeTab === 'package' ? packageOrders : pointCornerOrders).map((order) => (
                                                    <tr key={order.id} className="hover:bg-gray-50 transition-all duration-300 group">
                                                        <td className="px-4 py-6">
                                                            <div className="text-base font-black text-gray-800 transition-colors uppercase">{order.customer_name}</div>
                                                            <div className="text-[10px] text-gray-500 font-bold font-mono tracking-tighter flex items-center mt-1">
                                                                <ChatBubbleLeftRightIcon className="w-3.5 h-3.5 mr-2" />
                                                                {order.whatsapp}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-6">
                                                            {activeTab === 'retail' ? (
                                                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{order.quantity} Units</span>
                                                            ) : (
                                                                <span className="text-[10px] font-black text-gold-muda uppercase tracking-[0.2em] bg-gold/10 px-3 py-1 rounded-lg border border-gold/20">{order.package_type || order.service_type}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-6">
                                                            <div className="text-base font-black text-gold italic">Rp {parseFloat(order.total_price || (order.price * (order.quantity || 1))).toLocaleString()}</div>
                                                        </td>
                                                        <td className="px-4 py-6">
                                                            {order.payment_proof ? (
                                                                <a href={`/storage/${order.payment_proof}`} target="_blank" className="inline-flex items-center px-4 py-2 bg-gold/10 text-gold-muda border border-gold/20 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-gold hover:text-white transition-all shadow-sm active:scale-95">
                                                                    Lihat Bukti
                                                                </a>
                                                            ) : (
                                                                <div className="flex items-center space-x-2 text-gray-400">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse"></div>
                                                                    <span className="text-[10px] font-black tracking-[0.2em] uppercase">Menunggu</span>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-6">
                                                            <div className={`inline-flex items-center px-4 py-2 text-[10px] font-black rounded-xl uppercase tracking-[0.1em] shadow-sm bg-white border ${order.status === 'Selesai' ? 'text-emerald-500 border-emerald-200' :
                                                                order.status === 'Dikirim' ? 'text-sky-500 border-sky-200' :
                                                                    order.status === 'Menunggu Konfirmasi' ? 'text-indigo-500 border-indigo-200' :
                                                                        'text-amber-500 border-amber-200'
                                                                }`}>
                                                                <div className={`w-1.5 h-1.5 rounded-full mr-2 animate-pulse bg-current`}></div>
                                                                {order.status}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-6">
                                                            <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-200 group-hover:border-gold/30 transition-all shadow-inner min-w-[120px]">
                                                                <span className="text-[11px] font-black font-mono text-gray-500 tracking-widest px-1">{order.tracking_code || '---'}</span>
                                                                {order.tracking_code && (
                                                                    <button
                                                                        onClick={() => { navigator.clipboard.writeText(order.tracking_code); alert('Nomor Resi Disalin!'); }}
                                                                        className="p-1.5 bg-white hover:bg-gold hover:text-white border border-gray-100 rounded-lg text-gray-400 transition-all active:scale-90 shadow-sm"
                                                                    >
                                                                        <ClipboardDocumentIcon className="w-4 h-4" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-6 text-right min-w-[180px]">
                                                            <div className="flex justify-end">
                                                                <StatusUpdateForm order={order} type={activeTab === 'point' ? 'point-corner' : activeTab} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Catalog Item Modal */}
            {isItemModalOpen && (
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
            )}

            {/* View Item Modal */}
            {viewingItem && (
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
            )}
        </SidebarAdmin>
    );
}

function StatusUpdateForm({ order, type }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status || (type === 'retail' ? 'Diproses' : 'Pending'),
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.sales.status.update', { type, id: order.id }));
    };

    return (
        <form onSubmit={submit} className="flex items-center space-x-1.5 bg-gray-50 p-1 rounded-lg border border-gray-200 shadow-sm w-fit ml-auto">
            <select
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
                className="text-[9px] font-black px-1.5 py-1 border-gray-200 bg-white rounded-md focus:ring-gold focus:border-gold transition-all uppercase tracking-tighter text-gray-700 cursor-pointer min-w-[110px]"
            >
                <option value="Pending">Pending</option>
                <option value="Menunggu Konfirmasi">Konfirmasi</option>
                <option value="Diproses">Proses</option>
                <option value="Dikirim">Kirim</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Batal</option>
            </select>
            <button
                type="submit"
                disabled={processing}
                className="px-3 py-1.5 bg-gold text-white text-[8px] font-black rounded-md uppercase tracking-widest hover:bg-gold-muda active:scale-95 transition-all shadow-sm shrink-0"
            >
                OK
            </button>
        </form>
    );
}
