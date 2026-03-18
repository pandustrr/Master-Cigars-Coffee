import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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
        <AuthenticatedLayout
            header={<h2 className="font-black text-2xl text-gray-900 leading-tight tracking-tighter">Sales Management</h2>}
        >
            <Head title="Admin - Sales" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Enhanced Tab Navigation */}
                    <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-200 flex space-x-2 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center space-x-3 py-3 px-6 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300
                                    ${activeTab === tab.id
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-[1.02]'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                                `}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`} />
                                <span>{tab.name}</span>
                                <span className={`
                                    text-[10px] px-2 py-0.5 rounded-lg
                                    ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}
                                `}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="animate-fade-in">
                        {activeTab === 'catalog' && (
                            <div className="bg-white shadow-sm sm:rounded-3xl border border-gray-200 overflow-hidden">
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 tracking-tight">Inventory Catalog</h3>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Manage your products and services</p>
                                        </div>
                                        <button
                                            onClick={() => { reset(); setEditingItem(null); setIsItemModalOpen(true); }}
                                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center space-x-2"
                                        >
                                            <PlusIcon className="w-4 h-4" />
                                            <span>Add New Item</span>
                                        </button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="bg-gray-50/50">
                                                    <th className="px-6 py-4 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest rounded-l-xl">Item Details</th>
                                                    <th className="px-6 py-4 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Category</th>
                                                    <th className="px-6 py-4 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Price Unit</th>
                                                    <th className="px-6 py-4 text-right text-[11px] font-black text-gray-700 uppercase tracking-widest rounded-r-xl">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {saleItems.map((item) => (
                                                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
                                                        <td className="px-6 py-6 flex items-center space-x-4">
                                                            <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                                                                {item.image ? (
                                                                    <img src={`/storage/${item.image}`} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xl font-black italic uppercase tracking-tighter">MC</div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{item.name}</div>
                                                                <div className="text-[10px] text-gray-400 font-bold uppercase truncate max-w-[200px]">{item.description || 'No description'}</div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-6">
                                                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase rounded-lg border border-indigo-100">
                                                                {item.category}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-6 text-sm font-black text-gray-900">Rp {parseFloat(item.price).toLocaleString()}</td>
                                                        <td className="px-6 py-6 text-right">
                                                            <div className="flex justify-end space-x-2">
                                                                <button onClick={() => handleEditItem(item)} className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><PencilIcon className="w-4 h-4" /></button>
                                                                <button onClick={() => { if (confirm('Hapus item?')) destroy(route('admin.sales.items.destroy', item.id)) }} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><TrashIcon className="w-4 h-4" /></button>
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
                            <div className="bg-white shadow-sm sm:rounded-3xl border border-gray-200 overflow-hidden">
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 tracking-tight">
                                                {activeTab === 'retail' ? 'Retail Orders' : activeTab === 'package' ? 'Package Subscriptions' : 'Point Corner Services'}
                                            </h3>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Monitor and process incoming orders</p>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr className="bg-gray-50/50">
                                                    <th className="px-6 py-4 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest rounded-l-xl">Customer</th>
                                                    <th className="px-6 py-4 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Detail</th>
                                                    <th className="px-6 py-4 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Pricing</th>
                                                    <th className="px-6 py-4 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Payment</th>
                                                    <th className="px-6 py-4 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Status</th>
                                                    <th className="px-6 py-4 text-left text-[11px] font-black text-gray-700 uppercase tracking-widest">Tracking</th>
                                                    <th className="px-6 py-4 text-right text-[11px] font-black text-gray-700 uppercase tracking-widest rounded-r-xl">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {(activeTab === 'retail' ? retailOrders : activeTab === 'package' ? packageOrders : pointCornerOrders).map((order) => (
                                                    <tr key={order.id} className="hover:bg-gray-50/80 transition-colors group">
                                                        <td className="px-6 py-6">
                                                            <div className="text-sm font-black text-gray-900">{order.customer_name}</div>
                                                            <div className="text-[10px] text-gray-500 font-bold font-mono tracking-tighter flex items-center opacity-70 group-hover:opacity-100">
                                                                <ChatBubbleLeftRightIcon className="w-3 h-3 mr-1" />
                                                                {order.whatsapp}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-6">
                                                            {activeTab === 'retail' ? (
                                                                <span className="text-xs font-bold text-gray-600">Qty: {order.quantity} units</span>
                                                            ) : (
                                                                <span className="text-xs font-black text-indigo-600 uppercase tracking-tight">{order.package_type || order.service_type}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-6 text-sm font-black text-gray-900">
                                                            Rp {parseFloat(order.total_price || (order.price * (order.quantity || 1))).toLocaleString()}
                                                        </td>
                                                        <td className="px-6 py-6">
                                                            {order.payment_proof ? (
                                                                <a href={`/storage/${order.payment_proof}`} target="_blank" className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-green-100 transition-colors">
                                                                    Verify Proof
                                                                </a>
                                                            ) : (
                                                                <span className="text-gray-400 text-[10px] items-center flex font-bold uppercase tracking-widest italic">
                                                                    No Proof Yet
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-6">
                                                            <span className={`px-3 py-1.5 text-[10px] font-black rounded-lg uppercase tracking-widest border ${order.status === 'Selesai' ? 'bg-green-100 text-green-800 border-green-200' :
                                                                order.status === 'Dikirim' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                                                    order.status === 'Menunggu Konfirmasi' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                                                                        'bg-amber-100 text-amber-800 border-amber-200'
                                                                }`}>
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-6">
                                                            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 w-fit">
                                                                <span className="text-[10px] font-black font-mono text-gray-700 tracking-tighter">{order.tracking_code || '-'}</span>
                                                                {order.tracking_code && (
                                                                    <button
                                                                        onClick={() => {
                                                                            navigator.clipboard.writeText(order.tracking_code);
                                                                            alert('Tracking ID copied!');
                                                                        }}
                                                                        className="p-1 hover:bg-indigo-100 rounded-md transition-colors text-indigo-600"
                                                                        title="Copy Tracking ID"
                                                                    >
                                                                        <ClipboardDocumentIcon className="w-3 h-3" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-6 text-right">
                                                            <StatusUpdateForm order={order} type={activeTab === 'point' ? 'point-corner' : activeTab} />
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl overflow-hidden border border-white/20">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.2em] text-gray-900 text-sm">{editingItem ? 'Edit Catalog Item' : 'New Catalog Item'}</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Configure your product information</p>
                            </div>
                            <button onClick={() => setIsItemModalOpen(false)} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all">&times;</button>
                        </div>
                        <form onSubmit={submitItem} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest">Item Name</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full border-gray-200 rounded-2xl text-sm font-bold p-4 focus:ring-indigo-600 focus:border-indigo-600 transition-all" required placeholder="Ex: Master Coffee Robusta" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest">Category</label>
                                    <select value={data.category} onChange={e => setData('category', e.target.value)} className="w-full border-gray-200 rounded-2xl text-sm font-bold p-4 focus:ring-indigo-600 focus:border-indigo-600 transition-all">
                                        <option>Retail</option>
                                        <option>Package</option>
                                        <option>Point Corner</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest">Base Price (IDR)</label>
                                    <input type="number" value={data.price} onChange={e => setData('price', e.target.value)} className="w-full border-gray-200 rounded-2xl text-sm font-bold p-4 focus:ring-indigo-600 focus:border-indigo-600 transition-all" required placeholder="50000" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest">Short Description</label>
                                <textarea rows="3" value={data.description} onChange={e => setData('description', e.target.value)} className="w-full border-gray-200 rounded-2xl text-sm font-bold p-4 focus:ring-indigo-600 focus:border-indigo-600 transition-all resize-none" placeholder="Briefly describe the product..."></textarea>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase text-gray-500 tracking-widest text-center">Optional Image</label>
                                <div className="relative group p-6 border-2 border-dashed border-gray-100 rounded-[2rem] hover:border-indigo-200 hover:bg-indigo-50/20 transition-all flex flex-col items-center justify-center">
                                    <input type="file" onChange={e => setData('image', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    <ArchiveBoxIcon className="w-10 h-10 text-gray-300 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-black uppercase text-indigo-600">Select File</span>
                                </div>
                            </div>
                            <div className="pt-6 flex justify-end space-x-4">
                                <button type="button" onClick={() => setIsItemModalOpen(false)} className="px-8 py-4 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-gray-900 transition-colors">Discard</button>
                                <button type="submit" disabled={processing} className="px-10 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-indigo-100 hover:scale-[1.05] active:scale-95 transition-all">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
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
        <form onSubmit={submit} className="flex items-center space-x-2">
            <select
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
                className="text-[10px] font-black p-2 pr-8 border-gray-100 rounded-lg shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-100 transition-all uppercase tracking-tighter"
            >
                <option value="Pending">Pending</option>
                <option value="Menunggu Konfirmasi">Verifying</option>
                <option value="Diproses">Processing</option>
                <option value="Dikirim">Shipped</option>
                <option value="Selesai">Completed</option>
                <option value="Dibatalkan">Cancelled</option>
            </select>
            <button
                type="submit"
                disabled={processing}
                className="px-3 py-2 bg-gray-900 text-white text-[9px] font-black rounded-lg uppercase tracking-widest hover:bg-black transition-all"
            >
                OK
            </button>
        </form>
    );
}
