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
        { name: 'Dashboard', href: route('dashboard'), active: route().current('dashboard'), icon: HomeIcon },
        { name: 'Kelola Produk', href: route('admin.main-products.index'), active: route().current('admin.main-products*') || route().current('admin.categories*'), icon: CubeIcon },
        { name: 'Partner', href: route('admin.partners.index'), active: route().current('admin.partners*'), icon: UserGroupIcon },
        { name: 'Manajemen Visual', href: route('admin.visual.index'), active: route().current('admin.visual*'), icon: PhotoIcon },
        { name: 'Penjualan', href: route('admin.sales.index'), active: route().current('admin.sales*'), icon: ShoppingBagIcon },
        { name: 'Pengaturan', href: route('admin.settings.index'), active: route().current('admin.settings*'), icon: Cog6ToothIcon },
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
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-coklat-kopi/40 backdrop-blur-xl border-r border-gold/10 transition-transform duration-300 transform ${showingSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex flex-col h-full">
                    {/* Brand Logo */}
                    <div className="h-20 flex items-center justify-center border-b border-gold/10 px-8">
                        <Link href="/" className="flex items-center space-x-4 group text-nowrap">
                            <ApplicationLogo className="block h-8 w-auto fill-current text-gold group-hover:scale-110 transition-transform" />
                            <div className="flex flex-col">
                                <span className="text-gold font-black text-[10px] uppercase tracking-[0.2em] leading-none">Master Cigars</span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-4 px-5 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all group ${
                                    item.active 
                                    ? 'bg-gold text-hitam-pekat shadow-lg shadow-gold/10' 
                                    : 'text-cream-gold/40 hover:bg-gold/5 hover:text-gold'
                                }`}
                            >
                                <item.icon className={`w-4 h-4 ${item.active ? 'text-hitam-pekat' : 'text-gold/60 group-hover:text-gold'} transition-colors`} />
                                <span>{item.name}</span>
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
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 md:pl-72`}>
                {/* Header Top Bar */}
                <header className="h-20 bg-hitam-pekat/95 backdrop-blur-md border-b border-gold/10 flex items-center justify-between px-4 md:px-10 sticky top-0 z-40">
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
