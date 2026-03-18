import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    HomeIcon,
    PresentationChartLineIcon,
    CubeIcon,
    UserGroupIcon,
    PhotoIcon,
    Cog6ToothIcon,
    ShoppingBagIcon,
    Bars3Icon,
    XMarkIcon,
    TagIcon,
    PowerIcon
} from '@heroicons/react/24/outline';

export default function SidebarAdmin({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingSidebar, setShowingSidebar] = useState(false);

    const navigation = [
        { name: 'Terminal Dashboard', href: route('dashboard'), active: route().current('dashboard'), icon: HomeIcon },
        { name: 'Product Catalog', href: route('admin.main-products.index'), active: route().current('admin.main-products*') || route().current('admin.categories*'), icon: CubeIcon },
        { name: 'Strategic Partners', href: route('admin.partners.index'), active: route().current('admin.partners*'), icon: UserGroupIcon },
        { name: 'Visual Assets', href: route('admin.visual.index'), active: route().current('admin.visual*'), icon: PhotoIcon },
        { name: 'Sales Operations', href: route('admin.sales.index'), active: route().current('admin.sales*'), icon: ShoppingBagIcon },
        { name: 'Global Settings', href: route('admin.settings.index'), active: route().current('admin.settings*'), icon: Cog6ToothIcon },
    ];

    return (
        <div className="min-h-screen bg-hitam-pekat flex">
            {/* Mobile Overlay */}
            {showingSidebar && (
                <div
                    className="fixed inset-0 z-40 bg-hitam-pekat/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
                    onClick={() => setShowingSidebar(false)}
                />
            )}

            {/* Sidebar Desktop/Mobile */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-coklat-kopi/60 backdrop-blur-3xl border-r border-gold/10 transition-all duration-500 shadow-[20px_0_50px_rgba(0,0,0,0.3)] transform ${showingSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex flex-col h-full">
                    {/* Brand Logo */}
                    <div className="h-28 flex items-center justify-center border-b border-gold/10 px-8 bg-gold/5 backdrop-blur-3xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms]"></div>
                        <Link href="/" className="flex flex-col items-center space-y-2 group/logo relative z-10">
                            <ApplicationLogo className="block h-10 w-auto fill-current text-gold group-hover/logo:scale-125 group-hover/logo:rotate-12 transition-all duration-700 drop-shadow-[0_0_15px_rgba(175,146,109,0.5)]" />
                            <div className="flex flex-col items-center">
                                <span className="text-gold font-black text-[11px] uppercase tracking-[0.5em] leading-none drop-shadow-md">Command Center</span>
                                <span className="text-cream-gold/20 text-[7px] font-black uppercase tracking-[0.2em] mt-2 italic">Master Cigars & Coffee</span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-5 px-8 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 group relative overflow-hidden italic ${item.active
                                    ? 'bg-gradient-to-r from-gold to-gold-muda text-hitam-pekat shadow-[0_15px_30px_rgba(175,146,109,0.3)] ring-1 ring-gold/50'
                                    : 'text-cream-gold/40 hover:bg-gold/10 hover:text-gold hover:translate-x-3 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]'
                                    }`}
                            >
                                <div className={`relative z-10 transition-all duration-500 ${item.active ? 'scale-125 rotate-6' : 'group-hover:scale-110'}`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="relative z-10 tracking-[0.1em]">{item.name}</span>
                                {item.active && (
                                    <div className="absolute right-0 top-0 h-full w-2 bg-hitam-pekat/10"></div>
                                )}
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </Link>
                        ))}
                    </nav>

                    {/* Sidebar Footer with Logout */}
                    <div className="p-4 border-t border-gold/10 space-y-2">
                        <div className="bg-hitam-pekat/40 rounded-xl p-3 border border-gold/5">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-black border border-gold/20 text-[10px]">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-cream-gold font-bold text-[10px] truncate">{user.name}</span>
                                    <span className="text-[8px] text-cream-gold/20 font-black uppercase tracking-widest">Admin</span>
                                </div>
                            </div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-red-400 hover:bg-red-400/10 transition-all group"
                        >
                            <PowerIcon className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                            <span>Logout Session</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500 md:pl-72`}>
                {/* Header Top Bar */}
                <header className="h-20 bg-hitam-pekat/80 backdrop-blur-2xl border-b border-gold/10 flex items-center justify-between px-6 md:px-12 sticky top-0 z-40 transition-all">
                    <div className="flex items-center space-x-4">
                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setShowingSidebar(!showingSidebar)}
                            className="md:hidden text-gold p-2 rounded-xl bg-gold/5 border border-gold/10 active:scale-95 transition-all"
                        >
                            {showingSidebar ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                        </button>
                        <div>
                            {header}
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center space-x-3 px-4 py-2 hover:bg-gold/5 rounded-xl transition-all">
                                    <span className="text-cream-gold text-xs font-bold">{user.name}</span>
                                    <svg className="w-4 h-4 text-gold/60" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="right" width="48" contentClasses="bg-coklat-kopi/95 backdrop-blur-xl border border-gold/10 py-1">
                                <Dropdown.Link href={route('logout')} method="post" as="button" className="text-cream-gold/60 hover:text-gold hover:bg-gold/5 text-[10px] uppercase font-black tracking-widest">
                                    Keluar Sesi
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
