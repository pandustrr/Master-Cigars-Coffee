import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, Link } from '@inertiajs/react';
import {
    ShoppingBagIcon,
    UserGroupIcon,
    BanknotesIcon,
    ArchiveBoxIcon,
    ArrowRightIcon,
    CubeIcon,
    PhotoIcon,
    Cog6ToothIcon,
    ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({ auth, stats: serverStats }) {
    const quickLinks = [
        {
            name: 'Sales',
            icon: BanknotesIcon,
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
            name: 'Produk Web',
            icon: ShoppingBagIcon,
            link: route('admin.products.index'),
            desc: 'Elemen halaman statis',
        },
        {
            name: 'Visual',
            icon: PhotoIcon,
            link: route('admin.visual.index'),
            desc: 'Aset visual & media',
        },
        {
            name: 'Pengaturan',
            icon: Cog6ToothIcon,
            link: route('admin.settings.index'),
            desc: 'Konfigurasi sistem',
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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Pesanan', value: serverStats?.totalOrders ?? '—', sub: 'Semua transaksi', icon: BanknotesIcon },
                            { label: 'Produk Aktif', value: serverStats?.totalProducts ?? '—', sub: 'Di katalog', icon: ArchiveBoxIcon },
                            { label: 'Partner', value: serverStats?.totalPartners ?? '—', sub: 'Mitra aktif', icon: UserGroupIcon },
                            { label: 'Merek', value: serverStats?.totalBrands ?? '—', sub: 'Brand terdaftar', icon: CubeIcon },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white rounded-3xl border border-gray-100 p-6 flex items-center space-x-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-gold/5 rounded-2xl flex items-center justify-center shrink-0">
                                    <stat.icon className="w-6 h-6 text-gold" />
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-gray-800 leading-none">{stat.value}</div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{stat.label}</div>
                                    <div className="text-[10px] text-gray-300 mt-0.5 italic">{stat.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </SidebarAdmin>
    );
}

