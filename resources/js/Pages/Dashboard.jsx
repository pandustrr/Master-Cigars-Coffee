import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, Link } from '@inertiajs/react';
import {
    ShoppingBagIcon,
    UserGroupIcon,
    BanknotesIcon,
    ArchiveBoxIcon,
    ArrowRightIcon,
    SparklesIcon,
    ChartBarIcon,
    CubeIcon
} from '@heroicons/react/24/outline';

export default function Dashboard({ auth }) {
    const stats = [
        { name: 'Sales Overview', icon: BanknotesIcon, link: route('admin.sales.index'), color: 'bg-gold/10 text-gold', desc: 'Monitor orders & revenue' },
        { name: 'Manage Product', icon: CubeIcon, link: route('admin.main-products.index'), color: 'bg-gold/10 text-gold-muda', desc: 'Global brands & categories' },
        { name: 'Partnership', icon: UserGroupIcon, link: route('admin.partners.index'), color: 'bg-gold/10 text-gold', desc: 'Global collaborators' },
        { name: 'Web Products', icon: ShoppingBagIcon, link: route('admin.products.index'), color: 'bg-gold/10 text-gold-muda', desc: 'Static page elements' },
    ];

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-2xl text-gold leading-tight tracking-tighter uppercase italic">Pusat Kendali</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-8 bg-hitam-pekat min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* Welcome Banner */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-coklat-kopi/40 via-hitam-pekat/80 to-hitam-pekat border border-gold/20 rounded-[4rem] p-12 md:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl group">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] group-hover:bg-gold/10 transition-all duration-[2000ms]"></div>
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold-muda/5 rounded-full blur-[100px]"></div>

                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-16">
                            <div className="space-y-8">
                                <div className="inline-flex items-center space-x-4 px-6 py-2.5 bg-hitam-pekat/60 rounded-full backdrop-blur-3xl border border-gold/20 shadow-[0_0_30px_rgba(175,146,109,0.15)] group-hover:border-gold/40 transition-all duration-700">
                                    <div className="w-2.5 h-2.5 bg-gold rounded-full animate-pulse shadow-[0_0_15px_rgba(175,146,109,0.8)]"></div>
                                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-cream-gold to-gold">Strategic Command Nexus</span>
                                </div>
                                <div className="space-y-4">
                                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cream-gold via-gold to-gold-muda tracking-tighter uppercase italic leading-[0.8] drop-shadow-2xl">
                                        Welcome, <br /><span className="text-gold drop-shadow-[0_0_30px_rgba(175,146,109,0.4)] group-hover:text-cream-gold transition-colors duration-1000 uppercase">{auth.user.name}</span>
                                    </h1>
                                </div>
                                <p className="text-cream-gold/40 text-[12px] font-black uppercase tracking-[0.3em] max-w-2xl leading-relaxed italic border-l-2 border-gold/20 pl-6 group-hover:border-gold/50 transition-all duration-700">
                                    The Master Cigars & Coffee ecosystem is under your direct jurisdiction. All systems are synchronized and awaiting executive optimization.
                                </p>
                            </div>
                            <div className="flex flex-col items-center group/tier">
                                <div className="relative p-2 rounded-[3rem] bg-gradient-to-br from-gold/30 via-transparent to-gold/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] group-hover/tier:scale-110 transition-all duration-700">
                                    <div className="bg-hitam-pekat/90 backdrop-blur-3xl px-14 py-12 rounded-[2.5rem] text-center border border-gold/10 group-hover/tier:border-gold/40 transition-all">
                                        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cream-gold to-gold italic tracking-tighter">PREMIUM</div>
                                        <div className="text-[11px] text-cream-gold/20 font-black uppercase tracking-[0.4em] mt-4 italic">Enterprise Tier v.4.0</div>
                                    </div>
                                    <div className="absolute inset-0 bg-gold/5 rounded-[3rem] blur-2xl opacity-0 group-hover/tier:opacity-100 transition-opacity"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {stats.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.link}
                                className="group bg-coklat-kopi/5 p-10 rounded-[3.5rem] border border-gold/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-gold/10 hover:border-gold/40 transition-all duration-700 flex flex-col items-center text-center relative overflow-hidden active:scale-90 backdrop-blur-3xl hover:-translate-y-6"
                            >
                                <div className={`relative z-10 w-24 h-24 ${item.color} rounded-[2rem] flex items-center justify-center mb-8 border border-gold/10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-2xl group-hover:shadow-gold/20`}>
                                    <item.icon className="w-12 h-12 transition-all duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gold/30 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                </div>
                                <h3 className="relative z-10 text-xl font-black text-cream-gold uppercase tracking-tighter mb-3 group-hover:text-gold transition-all duration-500 italic leading-none">{item.name}</h3>
                                <p className="relative z-10 text-[10px] text-cream-gold/20 font-black uppercase tracking-[0.3em] leading-relaxed mb-4 italic group-hover:text-cream-gold/40 transition-colors">{item.desc}</p>

                                <div className="relative z-10 mt-auto flex items-center space-x-4 text-gold text-[10px] font-black uppercase tracking-[0.6em] opacity-0 group-hover:opacity-100 transition-all transform translate-y-6 group-hover:translate-y-0 group-hover:delay-75">
                                    <span className="italic">Initialize</span>
                                    <div className="w-8 h-px bg-gold/50 group-hover:w-12 transition-all duration-700"></div>
                                    <ArrowRightIcon className="w-5 h-5 animate-pulse" />
                                </div>

                                {/* Background Accents */}
                                <div className="absolute -right-10 -bottom-10 opacity-[0.02] group-hover:opacity-[0.1] transition-all duration-[1000ms] group-hover:scale-125 group-hover:-rotate-45">
                                    <ChartBarIcon className="w-64 h-64" />
                                </div>
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            </Link>
                        ))}
                    </div>

                    {/* System Status Section */}
                    <div className="bg-coklat-kopi/5 rounded-[4rem] border border-gold/10 p-12 shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row items-center justify-between gap-12 backdrop-blur-3xl relative overflow-hidden group/status">
                        <div className="absolute inset-0 bg-gold/[0.03] opacity-0 group-hover/status:opacity-100 transition-all duration-1000 pointer-events-none"></div>
                        <div className="flex items-center space-x-12 relative z-10">
                            <div className="relative group/orb">
                                <div className="w-28 h-28 bg-gold/5 border border-gold/20 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(175,146,109,0.1)] group-hover/orb:scale-110 transition-all duration-1000">
                                    <div className="w-8 h-8 bg-gold rounded-full animate-pulse shadow-[0_0_30px_rgba(175,146,109,0.8)]"></div>
                                </div>
                                <div className="absolute -inset-4 border border-gold/10 rounded-full animate-[spin_12s_linear_infinite] group-hover/orb:border-gold/30 transition-colors"></div>
                                <div className="absolute -inset-8 border border-gold/5 rounded-full animate-[spin_18s_linear_infinite_reverse] opacity-50"></div>
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-cream-gold tracking-tighter uppercase italic group-hover/status:text-gold transition-colors duration-700">Integritas Sistem: <span className="text-gold group-hover/status:drop-shadow-[0_0_15px_rgba(175,146,109,0.5)]">100% SECURE</span></h4>
                                <p className="text-[11px] text-cream-gold/20 font-black uppercase tracking-[0.5em] mt-3 italic group-hover/status:text-cream-gold/40 transition-colors duration-700">Global protocols active & synchronized</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-6 justify-center relative z-10">
                            {['Database Aktif', 'Cloud Sinkron', 'SSL Encrypted', 'Neural Auth'].map((label, i) => (
                                <span key={i} className="px-8 py-4 bg-hitam-pekat/60 border border-gold/10 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.4em] text-gold/40 hover:text-gold hover:border-gold/40 hover:-translate-y-2 transition-all cursor-default shadow-2xl backdrop-blur-3xl italic">
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SidebarAdmin>
    );
}
