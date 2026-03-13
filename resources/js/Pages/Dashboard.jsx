import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ShoppingBagIcon,
    UserGroupIcon,
    BanknotesIcon,
    ArchiveBoxIcon,
    ArrowRightIcon,
    SparklesIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

export default function Dashboard({ auth }) {
    const stats = [
        { name: 'Sales Overview', icon: BanknotesIcon, link: route('admin.sales.index'), color: 'bg-green-50 text-green-600', desc: 'Monitor orders & revenue' },
        { name: 'Catalog Base', icon: ArchiveBoxIcon, link: route('admin.sales.index'), color: 'bg-indigo-50 text-indigo-600', desc: 'Manage sale items' },
        { name: 'Partnership', icon: UserGroupIcon, link: route('admin.partners.index'), color: 'bg-blue-50 text-blue-600', desc: 'Global collaborators' },
        { name: 'Web Products', icon: ShoppingBagIcon, link: route('admin.products.index'), color: 'bg-amber-50 text-amber-600', desc: 'Static page products' },
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="font-black text-2xl text-gray-900 leading-tight tracking-tighter">Command Center</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12 bg-gray-50/50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-10">

                    {/* Welcome Banner */}
                    <div className="relative overflow-hidden bg-gray-900 rounded-[3rem] p-10 md:p-16 shadow-2xl">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-500/20 to-transparent"></div>
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                            <div className="space-y-4">
                                <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white/10 rounded-full backdrop-blur-md">
                                    <SparklesIcon className="w-4 h-4 text-indigo-400" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Administrative Access</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                                    Welcome Back, <span className="text-indigo-400">{auth.user.name}</span>
                                </h1>
                                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest max-w-lg leading-relaxed">
                                    You are in control of the Master Cigars & Coffee ecosystem. Everything is synced and ready.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center min-w-[120px]">
                                    <div className="text-3xl font-black text-white italic">PRO</div>
                                    <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest mt-1">System Tier</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.link}
                                className="group bg-white p-8 rounded-[2.5rem] border border-gray-200 shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden active:scale-95"
                            >
                                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-base font-black text-gray-900 uppercase tracking-tight mb-2">{item.name}</h3>
                                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-6">{item.desc}</p>
                                <div className="mt-auto flex items-center space-x-2 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span>Open Module</span>
                                    <ArrowRightIcon className="w-3 h-3" />
                                </div>
                                {/* Decorative BG */}
                                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <ChartBarIcon className="w-32 h-32" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* System Status Section */}
                    <div className="bg-white rounded-[3rem] border border-gray-200 p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex items-center space-x-6">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center animate-pulse shadow-xl shadow-blue-100">
                                <div className="w-4 h-4 bg-white rounded-full"></div>
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-gray-900 tracking-tight uppercase">System Integrity: 100%</h4>
                                <p className="text-xs text-gray-400 font-black uppercase tracking-[0.1em]">All services are currently operational</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <span className="px-5 py-2 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">Database Active</span>
                            <span className="px-5 py-2 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">Storage Synced</span>
                            <span className="px-5 py-2 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">SSL Encrypted</span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
