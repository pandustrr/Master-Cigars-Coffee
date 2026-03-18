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
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function Index({ retailOrders, packageOrders, pointCornerOrders, saleItems }) {
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [activeTab, setActiveTab] = useState('catalog');

    const { data, setData, post, delete: destroy, processing, reset } = useForm({
        name: '',
        price: '',
        category: 'Retail',
        description: '',
        image: null,
    });

    const submitItem = (e) => {
        e.preventDefault();
        if (editingItem) {
            post(route('admin.sales.items.update', editingItem.id), {
                onSuccess: () => { reset(); setEditingItem(null); setIsItemModalOpen(false); }
            });
        } else {
            post(route('admin.sales.items.store'), {
                onSuccess: () => { reset(); setIsItemModalOpen(false); }
            });
        }
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setData({
            name: item.name,
            price: item.price,
            category: item.category,
            description: item.description || '',
            image: null,
        });
        setIsItemModalOpen(true);
    };

    const tabs = [
        { id: 'catalog', name: 'Catalog', icon: ArchiveBoxIcon, count: saleItems.length },
        { id: 'retail', name: 'Retail', icon: ShoppingBagIcon, count: retailOrders.length },
        { id: 'package', name: 'Packages', icon: TruckIcon, count: packageOrders.length },
        { id: 'point', name: 'Point Corner', icon: CheckCircleIcon, count: pointCornerOrders.length },
    ];

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-2xl text-gold leading-tight tracking-tighter uppercase italic">Sales Management</h2>}
        >
            <Head title="Admin - Sales" />

            <div className="py-8 bg-hitam-pekat min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Enhanced Tab Navigation */}
                    <div className="bg-coklat-kopi/10 p-2 rounded-3xl shadow-2xl border border-gold/10 flex space-x-2 overflow-x-auto backdrop-blur-3xl no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center space-x-3 py-4 px-8 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 relative overflow-hidden group/tab shrink-0
                                    ${activeTab === tab.id
                                        ? 'bg-gold text-hitam-pekat shadow-[0_10px_30px_rgba(175,146,109,0.3)] scale-105 active:scale-95'
                                        : 'text-gold/30 hover:bg-gold/5 hover:text-gold'}
                                `}
                            >
                                <tab.icon className={`w-5 h-5 transition-transform duration-500 ${activeTab === tab.id ? 'text-hitam-pekat rotate-0' : 'text-gold/20 -rotate-12 group-hover/tab:rotate-0'}`} />
                                <span className="relative z-10">{tab.name}</span>
                                <span className={`
                                    text-[10px] px-2.5 py-0.5 rounded-lg border transition-colors duration-500
                                    ${activeTab === tab.id ? 'bg-hitam-pekat/10 border-hitam-pekat/20 text-hitam-pekat' : 'bg-gold/5 border-gold/10 text-gold/40'}
                                `}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="animate-fade-in">
                        {activeTab === 'catalog' && (
                            <div className="bg-coklat-kopi/5 shadow-[0_50px_100px_rgba(0,0,0,0.3)] rounded-[3rem] border border-gold/10 overflow-hidden backdrop-blur-3xl">
                                <div className="p-12">
                                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 relative overflow-hidden">
                                        <div className="relative z-10">
                                            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cream-gold via-gold to-gold-muda tracking-tighter uppercase italic">Inventory Catalog</h3>
                                            <p className="text-[10px] text-cream-gold/30 font-black uppercase tracking-[0.3em] mt-2 italic leading-none">Global Stock and Resource Repository</p>
                                        </div>
                                        <button
                                            onClick={() => { reset(); setEditingItem(null); setIsItemModalOpen(true); }}
                                            className="relative overflow-hidden bg-gold text-hitam-pekat px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-[0_15px_40px_rgba(175,146,109,0.3)] flex items-center space-x-3 group/btn"
                                        >
                                            <PlusIcon className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-500" />
                                            <span>Provision New Item</span>
                                        </button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gold/10">
                                            <thead>
                                                <tr className="bg-gold/5 backdrop-blur-md">
                                                    <th className="px-10 py-8 text-left text-[11px] font-black text-gold/60 uppercase tracking-[0.4em]">Item Descriptor</th>
                                                    <th className="px-10 py-8 text-left text-[11px] font-black text-gold/60 uppercase tracking-[0.4em]">Echelon</th>
                                                    <th className="px-10 py-8 text-left text-[11px] font-black text-gold/60 uppercase tracking-[0.4em]">Unit Valuasi</th>
                                                    <th className="px-10 py-8 text-right text-[11px] font-black text-gold/60 uppercase tracking-[0.4em]">Matrix Control</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gold/10">
                                                {saleItems.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gold/[0.03] transition-all duration-300 group">
                                                        <td className="px-10 py-8">
                                                            <div className="flex items-center space-x-6">
                                                                <div className="w-20 h-20 rounded-[1.5rem] bg-hitam-pekat overflow-hidden border border-gold/20 shadow-2xl shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                                                                    {item.image ? (
                                                                        <img src={`/storage/${item.image}`} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center text-gold/10 text-2xl font-black italic uppercase tracking-tighter">MC</div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <div className="text-lg font-black text-cream-gold group-hover:text-gold transition-colors tracking-tight uppercase">{item.name}</div>
                                                                    <div className="text-[10px] text-cream-gold/20 font-black uppercase tracking-[0.2em] mt-2 italic leading-none truncate max-w-[250px]">{item.description || 'N/A: Standard inventory briefing.'}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-10 py-8">
                                                            <span className="px-5 py-2 bg-gold/5 text-gold text-[10px] font-black uppercase tracking-widest rounded-full border border-gold/10 shadow-sm">
                                                                {item.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-10 py-8">
                                                            <div className="text-xl font-black text-gold tracking-tighter italic">Rp {parseFloat(item.price).toLocaleString()}</div>
                                                        </td>
                                                        <td className="px-10 py-8 text-right">
                                                            <div className="flex justify-end space-x-4 opacity-0 group-hover:opacity-100 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500">
                                                                <button onClick={() => handleEditItem(item)} className="p-3.5 text-cream-gold/40 hover:text-gold hover:bg-gold/10 rounded-2xl border border-transparent hover:border-gold/20 transition-all active:scale-95 shadow-2xl"><PencilIcon className="w-5 h-5" /></button>
                                                                <button onClick={() => { if (confirm('Hapus item?')) destroy(route('admin.sales.items.destroy', item.id)) }} className="p-3.5 text-cream-gold/40 hover:text-red-500 hover:bg-red-500/10 rounded-2xl border border-transparent hover:border-red-500/20 transition-all active:scale-95 shadow-2xl"><TrashIcon className="w-5 h-5" /></button>
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

                        {(activeTab === 'retail' || activeTab === 'package' || activeTab === 'point') && (
                            <div className="bg-coklat-kopi/5 shadow-[0_50px_100px_rgba(0,0,0,0.3)] rounded-[3rem] border border-gold/10 overflow-hidden backdrop-blur-3xl">
                                <div className="p-12">
                                    <div className="flex justify-between items-center mb-12">
                                        <div>
                                            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cream-gold via-gold to-gold-muda tracking-tighter uppercase italic">
                                                {activeTab === 'retail' ? 'Retail Operations' : activeTab === 'package' ? 'Subscription Flow' : 'Point Logistics'}
                                            </h3>
                                            <p className="text-[10px] text-cream-gold/30 font-black uppercase tracking-[0.3em] mt-2 italic leading-none">Real-time status tracking and verification</p>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gold/10">
                                            <thead>
                                                <tr className="bg-gold/5 backdrop-blur-md">
                                                    <th className="px-10 py-8 text-left text-[11px] font-black text-gold/60 uppercase tracking-[0.4em]">Counterparty</th>
                                                    <th className="px-10 py-8 text-left text-[11px] font-black text-gold/60 uppercase tracking-[0.4em]">Directive</th>
                                                    <th className="px-10 py-8 text-left text-[11px] font-black text-gold/60 uppercase tracking-[0.4em]">Valuasi</th>
                                                    <th className="px-10 py-8 text-left text-[11px] font-black text-gold/60 uppercase tracking-[0.4em]">Verification</th>
                                                    <th className="px-10 py-8 text-left text-[11px] font-black text-gold/60 uppercase tracking-[0.4em]">State</th>
                                                    <th className="px-10 py-8 text-left text-[11px] font-black text-gold/60 uppercase tracking-[0.4em]">Tracking</th>
                                                    <th className="px-10 py-8 text-right text-[11px] font-black text-gold/60 uppercase tracking-[0.4em]">Override</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gold/10">
                                                {(activeTab === 'retail' ? retailOrders : activeTab === 'package' ? packageOrders : pointCornerOrders).map((order) => (
                                                    <tr key={order.id} className="hover:bg-gold/[0.03] transition-all duration-300 group">
                                                        <td className="px-10 py-8">
                                                            <div className="text-lg font-black text-cream-gold group-hover:text-gold transition-colors tracking-tighter uppercase">{order.customer_name}</div>
                                                            <div className="text-[10px] text-gold/40 font-bold font-mono tracking-tighter flex items-center mt-2 group-hover:text-gold-muda transition-colors">
                                                                <ChatBubbleLeftRightIcon className="w-3.5 h-3.5 mr-2" />
                                                                {order.whatsapp}
                                                            </div>
                                                        </td>
                                                        <td className="px-10 py-8">
                                                            {activeTab === 'retail' ? (
                                                                <span className="text-[10px] font-black text-cream-gold/40 uppercase tracking-widest">{order.quantity} Units</span>
                                                            ) : (
                                                                <span className="text-[10px] font-black text-gold-muda uppercase tracking-[0.2em] bg-gold/5 px-3 py-1 rounded-lg border border-gold/10">{order.package_type || order.service_type}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-10 py-8">
                                                            <div className="text-lg font-black text-gold tracking-tighter italic">Rp {parseFloat(order.total_price || (order.price * (order.quantity || 1))).toLocaleString()}</div>
                                                        </td>
                                                        <td className="px-10 py-8">
                                                            {order.payment_proof ? (
                                                                <a href={`/storage/${order.payment_proof}`} target="_blank" className="inline-flex items-center px-5 py-2 bg-gold/10 text-gold-muda border border-gold/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold hover:text-hitam-pekat transition-all shadow-lg active:scale-95">
                                                                    Verify Proof
                                                                </a>
                                                            ) : (
                                                                <div className="flex items-center space-x-2 text-gold/20">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-gold/10 animate-pulse"></div>
                                                                    <span className="text-[10px] font-black tracking-[0.3em] uppercase italic">Awaiting</span>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="px-10 py-8">
                                                            <div className={`inline-flex items-center px-4 py-2 text-[10px] font-black rounded-xl uppercase tracking-[0.2em] border shadow-2xl ${order.status === 'Selesai' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                                order.status === 'Dikirim' ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' :
                                                                    order.status === 'Menunggu Konfirmasi' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                                                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                                }`}>
                                                                <div className={`w-1.5 h-1.5 rounded-full mr-3 animate-pulse bg-current`}></div>
                                                                {order.status}
                                                            </div>
                                                        </td>
                                                        <td className="px-10 py-8">
                                                            <div className="flex items-center space-x-3 bg-hitam-pekat p-3 rounded-2xl border border-gold/10 group-hover:border-gold/30 transition-all shadow-inner">
                                                                <span className="text-[11px] font-black font-mono text-gold/40 tracking-widest">{order.tracking_code || '---'}</span>
                                                                {order.tracking_code && (
                                                                    <button
                                                                        onClick={() => { navigator.clipboard.writeText(order.tracking_code); alert('Neural Trace IDs Copied!'); }}
                                                                        className="p-1.5 bg-gold/5 hover:bg-gold/20 rounded-lg text-gold transition-all active:scale-90"
                                                                    >
                                                                        <ClipboardDocumentIcon className="w-4 h-4" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-10 py-8 text-right">
                                                            <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
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

            {/* Catalog Item Modal - Revamped */}
            {isItemModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-hitam-pekat/95 backdrop-blur-3xl animate-fade-in transition-all duration-500">
                    <div className="bg-gradient-to-br from-coklat-kopi to-hitam-pekat rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] w-full max-w-xl overflow-hidden border border-gold/20 transform animate-in zoom-in duration-300">
                        <div className="px-12 py-10 border-b border-gold/10 flex justify-between items-center bg-gold/[0.02]">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.3em] text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-muda italic">{editingItem ? 'Refine Protocol' : 'Provision Resource'}</h4>
                                <p className="text-[10px] text-cream-gold/30 font-black uppercase tracking-[0.4em] mt-3 leading-none italic">Configure inventory parameters</p>
                            </div>
                            <button onClick={() => setIsItemModalOpen(false)} className="w-14 h-14 rounded-2xl border border-gold/10 flex items-center justify-center text-gold/30 hover:text-gold hover:bg-gold/10 hover:rotate-90 transition-all duration-500 text-2xl font-light">×</button>
                        </div>
                        <form onSubmit={submitItem} className="p-12 space-y-8">
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-gold tracking-[0.3em]">Operational Nomenklatur</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border-gold/10 bg-hitam-pekat p-5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all shadow-inner text-cream-gold placeholder-cream-gold/10" required placeholder="Ex: Espresso Matrix v4" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black uppercase text-gold tracking-[0.3em]">Operational Echelon</label>
                                    <select value={data.category} onChange={e => setData('category', e.target.value)} className="w-full border-gold/10 bg-hitam-pekat p-5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all shadow-inner text-cream-gold appearance-none">
                                        <option className="bg-hitam-pekat">Retail</option>
                                        <option className="bg-hitam-pekat">Package</option>
                                        <option className="bg-hitam-pekat">Point Corner</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black uppercase text-gold tracking-[0.3em]">Valuasi Display (IDR)</label>
                                    <input type="number" value={data.price} onChange={e => setData('price', e.target.value)} className="w-full border-gold/10 bg-hitam-pekat p-5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all shadow-inner text-cream-gold placeholder-cream-gold/10" required placeholder="50000" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] font-black uppercase text-gold tracking-[0.3em]">Asset Briefing</label>
                                <textarea rows="3" value={data.description} onChange={e => setData('description', e.target.value)} className="w-full border-gold/10 bg-hitam-pekat p-5 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all shadow-inner resize-none text-cream-gold placeholder-cream-gold/10" placeholder="Define tactical objectives..."></textarea>
                            </div>
                            <div className="space-y-4 text-center">
                                <label className="block text-[10px] font-black uppercase text-gold/40 tracking-[0.4em] mb-2 leading-none">Visual Hallmark</label>
                                <div className="relative group p-8 border border-dashed border-gold/20 rounded-3xl hover:border-gold transition-all flex flex-col items-center justify-center bg-hitam-pekat/40 shadow-inner">
                                    <input type="file" onChange={e => setData('image', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <ArchiveBoxIcon className="w-10 h-10 text-gold/20 mb-4 group-hover:scale-110 group-hover:text-gold transition-all" />
                                    <span className="text-[10px] font-black uppercase text-gold/40 tracking-[0.3em] group-hover:text-gold transition-colors">Select Data Artifact</span>
                                </div>
                            </div>
                            <div className="pt-8 flex justify-end items-center space-x-12">
                                <button type="button" onClick={() => setIsItemModalOpen(false)} className="text-gold/30 font-black uppercase text-[10px] tracking-[0.4em] hover:text-gold transition-all">Abort</button>
                                <button type="submit" disabled={processing} className="px-12 py-5 bg-gold text-hitam-pekat rounded-[1.8rem] font-black uppercase text-[10px] tracking-[0.3em] shadow-[0_20px_40px_rgba(175,146,109,0.2)] hover:scale-105 active:scale-95 transition-all">Commit Neural Entry</button>
                            </div>
                        </form>
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
        <form onSubmit={submit} className="flex items-center space-x-3 bg-hitam-pekat/50 p-2 rounded-2xl border border-gold/10 shadow-inner">
            <select
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
                className="text-[10px] font-black px-4 py-2 border-none bg-transparent rounded-lg shadow-sm focus:ring-0 transition-all uppercase tracking-widest text-gold-muda cursor-pointer appearance-none"
            >
                <option value="Pending" className="bg-hitam-pekat">Pending</option>
                <option value="Menunggu Konfirmasi" className="bg-hitam-pekat">Verifying</option>
                <option value="Diproses" className="bg-hitam-pekat">Processing</option>
                <option value="Dikirim" className="bg-hitam-pekat">Shipped</option>
                <option value="Selesai" className="bg-hitam-pekat">Completed</option>
                <option value="Dibatalkan" className="bg-hitam-pekat">Cancelled</option>
            </select>
            <button
                type="submit"
                disabled={processing}
                className="px-5 py-2.5 bg-gold text-hitam-pekat text-[9px] font-black rounded-xl uppercase tracking-widest hover:bg-gold-muda hover:scale-110 active:scale-95 transition-all shadow-lg"
            >
                Commit
            </button>
        </form>
    );
}
