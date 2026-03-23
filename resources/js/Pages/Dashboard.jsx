import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import {
    ShoppingBagIcon,
    UserGroupIcon,
    BanknotesIcon,
    ArchiveBoxIcon,
    CubeIcon,
    Cog6ToothIcon,
    XMarkIcon,
    GlobeAltIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({ auth, stats: serverStats, recentOrders }) {
    const [showVisitorModal, setShowVisitorModal] = useState(false);

    const quickLinks = [
        {
            name: 'Marketplace',
            icon: ShoppingBagIcon,
            link: route('admin.sales.index'),
            desc: 'Kelola pesanan & transaksi',
        },
        {
            name: 'Kelola Produk',
            icon: CubeIcon,
            link: route('admin.main-products.index'),
            desc: 'Merek & kategori global',
        },
        {
            name: 'Partner',
            icon: UserGroupIcon,
            link: route('admin.partners.index'),
            desc: 'Kolaborator & mitra',
        },
        {
            name: 'Investment',
            icon: BanknotesIcon,
            link: route('admin.investment.index'),
            desc: 'Program investasi aktif',
        },
        {
            name: 'Pengaturan',
            icon: Cog6ToothIcon,
            link: route('admin.settings.index'),
            desc: 'Konfigurasi sistem',
        },
    ];

    const stats = [
        { label: 'Total Pesanan', value: serverStats?.totalOrders ?? '0', sub: 'Semua transaksi', icon: BanknotesIcon, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Produk Aktif', value: serverStats?.totalProducts ?? '0', sub: 'Marketplace jualan', icon: ArchiveBoxIcon, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Partner', value: serverStats?.totalPartners ?? '0', sub: 'Mitra terdaftar', icon: UserGroupIcon, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Main Product', value: serverStats?.totalBrands ?? '0', sub: 'Brand utama', icon: CubeIcon, color: 'text-purple-500', bg: 'bg-purple-50' },
        {
            label: 'Pengunjung',
            value: serverStats?.totalVisitors ?? '0',
            sub: 'Unique Visitor',
            icon: GlobeAltIcon,
            color: 'text-rose-500',
            bg: 'bg-rose-50',
            clickable: true,
            onClick: () => setShowVisitorModal(true)
        },
    ];

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-xl text-gold leading-tight tracking-tight uppercase">Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Welcome Bar */}
                    <div className="flex items-center justify-between px-8 py-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Selamat datang kembali</p>
                            <h1 className="text-lg font-black text-gray-800 uppercase tracking-tight mt-1">{auth.user.name}</h1>
                        </div>
                        <div className="flex items-center space-x-3 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Sistem Aktif</span>
                        </div>
                    </div>

                    {/* Quick Access Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {quickLinks.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.link}
                                className="group bg-white p-6 rounded-3xl border border-gray-100 hover:border-gold/30 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center gap-4 active:scale-95 shadow-sm"
                            >
                                <div className="w-12 h-12 bg-gold/5 rounded-2xl flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                                    <item.icon className="w-6 h-6 text-gold" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest leading-tight group-hover:text-gold transition-colors">{item.name}</h3>
                                    <p className="text-[10px] text-gray-400 font-bold mt-1.5 leading-tight">{item.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                onClick={stat.onClick}
                                className={`bg-white rounded-[32px] border border-gray-100 p-6 flex flex-col items-start gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden ${stat.clickable ? 'cursor-pointer' : ''}`}
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                                    <stat.icon className="w-24 h-24 -mr-8 -mt-8" />
                                </div>
                                <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center shrink-0`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-gray-800 leading-none tracking-tight">{stat.value}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Pcs</span>
                                    </div>
                                    <div className="text-[10px] font-black text-gray-800 uppercase tracking-widest mt-3">{stat.label}</div>
                                    <div className="text-[9px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{stat.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Orders Table */}
                    <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm animate-fade-in delay-300 overflow-hidden">
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
                            <div>
                                <h3 className="text-xl font-black text-gray-800 tracking-tight uppercase">Pesanan Terbaru</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Status transaksi lintas kategori</p>
                            </div>
                            <Link href={route('admin.sales.index')} className="text-[10px] font-black text-gold uppercase tracking-widest hover:underline">Lihat Semua</Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="text-left border-b border-gray-50">
                                        <th className="pb-4 text-[9px] font-black uppercase text-gray-400 tracking-widest px-2">Tanggal</th>
                                        <th className="pb-4 text-[9px] font-black uppercase text-gray-400 tracking-widest px-2">Customer</th>
                                        <th className="pb-4 text-[9px] font-black uppercase text-gray-400 tracking-widest px-2">Produk</th>
                                        <th className="pb-4 text-[9px] font-black uppercase text-gray-400 tracking-widest px-2 text-center">Tipe</th>
                                        <th className="pb-4 text-[9px] font-black uppercase text-gray-400 tracking-widest px-2 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recentOrders && recentOrders.length > 0 ? recentOrders.map((order, idx) => (
                                        <tr key={idx} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-2">
                                                <div className="text-[10px] font-bold text-gray-800">{new Date(order.created_at).toLocaleDateString('id-ID')}</div>
                                                <div className="text-[8px] text-gray-400 uppercase font-black">{new Date(order.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</div>
                                            </td>
                                            <td className="py-4 px-2">
                                                <div className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{order.customer_name}</div>
                                                <div className="text-[9px] text-gray-400 font-bold">{order.whatsapp}</div>
                                            </td>
                                            <td className="py-4 px-2">
                                                <div className="text-[11px] font-bold text-gray-800">{order.sale_item?.name || order.package_type || order.service_type || '-'}</div>
                                                {order.quantity && <div className="text-[9px] text-gray-400 font-bold">Qty: {order.quantity}</div>}
                                            </td>
                                            <td className="py-4 px-2 text-center">
                                                <span className={`inline-block px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest border ${order.type === 'Retail' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                        order.type === 'Package' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                            'bg-green-50 text-green-600 border-green-100'
                                                    }`}>
                                                    {order.type}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <div className="text-[11px] font-black text-gold">Rp {parseFloat(order.total_price || order.price || 0).toLocaleString()}</div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="py-10 text-center text-[10px] font-black uppercase text-gray-300 tracking-widest italic">Belum ada pesanan masuk.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            {/* Visitor Modal */}
            {showVisitorModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 pointer-events-none">
                    {/* Clickable Overlay without BG */}
                    <div className="absolute inset-0" onClick={() => setShowVisitorModal(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-3xl border border-gray-100 shadow-[0_30px_100px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/5 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">Detail Pengunjung</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">100 Pengunjung Terakhir (Unik)</p>
                            </div>
                            <button
                                onClick={() => setShowVisitorModal(false)}
                                className="p-3 bg-white rounded-2xl border border-gray-100 text-gray-400 hover:text-red-500 transition-all hover:rotate-90"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 max-h-[60vh] overflow-y-auto">
                            <div className="space-y-3">
                                {serverStats?.visitors?.length > 0 ? (
                                    serverStats.visitors.map((v, i) => (
                                        <div key={v.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:border-gold/20 transition-all group">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:text-gold transition-colors">
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-gray-800 uppercase tracking-tight">{v.ip_address}</p>
                                                    <p className="text-[9px] text-gray-400 font-bold mt-0.5 truncate max-w-[300px]">{v.user_agent}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] font-black text-gray-800 uppercase tracking-widest">Waktu Kunjungan</p>
                                                <p className="text-[9px] text-gray-400 font-bold mt-0.5">{new Date(v.created_at).toLocaleString('id-ID')}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <GlobeAltIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Belum ada pengunjung tercatat</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-8 border-t border-gray-50 bg-gray-50/50 text-center">
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest items-center flex justify-center space-x-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span>Data realtime sistem pelacakan unik</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
