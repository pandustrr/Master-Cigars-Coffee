import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Toast from '@/Components/Toast';
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
    PowerIcon,
    BanknotesIcon,
    UserIcon
} from '@heroicons/react/24/outline';

export default function SidebarAdmin({ header, children }) {
    const user = usePage().props.auth.user;
    const flash = usePage().props.flash;
    const [showingSidebar, setShowingSidebar] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState('success');
    const [toastKey, setToastKey] = useState(0);

    useEffect(() => {
        const success = flash?.success;
        const error = flash?.error;
        
        if (success || error) {
            setToastMessage(success || error);
            setToastType(success ? 'success' : 'error');
            setToastKey(Date.now());
        }
    }, [flash]);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), active: route().current('dashboard'), icon: HomeIcon },
        { name: 'Kelola Gambar', href: route('admin.visual.index'), active: route().current('admin.visual*'), icon: PhotoIcon },
        { name: 'Produk', href: route('admin.main-products.index'), active: route().current('admin.main-products*') || route().current('admin.categories*'), icon: CubeIcon },
        { name: 'Partner', href: route('admin.partners.index'), active: route().current('admin.partners*'), icon: UserGroupIcon },
        { name: 'Investment', href: route('admin.investment.index'), active: route().current('admin.investment*'), icon: BanknotesIcon },
        { name: 'Sale', href: route('admin.sales.index'), active: route().current('admin.sales*'), icon: ShoppingBagIcon },
        { name: 'Pengaturan', href: route('admin.settings.index'), active: route().current('admin.settings*'), icon: Cog6ToothIcon },
        { name: 'Profil Akun', href: route('admin.profile.edit'), active: route().current('admin.profile*'), icon: UserIcon },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Overlay */}
            {showingSidebar && (
                <div
                    className="fixed inset-0 z-40 bg-hitam-pekat/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
                    onClick={() => setShowingSidebar(false)}
                />
            )}

            {/* Sidebar Desktop/Mobile */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-coklat-kopi/60 backdrop-blur-xl border-r border-gold/10 transition-all duration-300 shadow-[10px_0_30px_rgba(0,0,0,0.2)] transform ${showingSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex flex-col h-full">
                    {/* Brand Logo */}
                    <div className="h-16 flex items-center justify-center border-b border-gold/10 px-6">
                        <Link href="/" className="flex flex-col items-center">
                            <span className="text-gold font-black text-[10px] uppercase tracking-[0.2em] leading-none">Master Cigars</span>
                            <span className="text-cream-gold/30 text-[8px] font-bold uppercase tracking-widest mt-0.5">& Coffee</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 group ${
                                    item.active
                                        ? 'bg-gold text-hitam-pekat shadow-lg shadow-gold/20'
                                        : 'text-gray-200 hover:bg-white/5 hover:text-white'
                                }`}
                            >
                                <item.icon className={`w-4 h-4 shrink-0 transition-colors ${item.active ? 'text-hitam-pekat' : 'text-gray-300 group-hover:text-white'}`} />
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
                                    <span className="text-white font-bold text-[10px] truncate">{user.name}</span>
                                    <span className="text-[8px] text-gray-300 font-black uppercase tracking-widest">Admin</span>
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
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 md:pl-64`}>
                {/* Header Top Bar */}
                <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:px-8 sticky top-0 z-40 shadow-sm">
                    <div className="flex items-center space-x-4">
                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setShowingSidebar(!showingSidebar)}
                            className="md:hidden text-gold p-2 rounded-xl bg-gold/5 border border-gold/10 active:scale-95 transition-all"
                        >
                            {showingSidebar ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                        </button>
                        <div className="[&_h2]:text-gray-800 [&_h2]:text-base [&_h2]:not-italic">
                            {header}
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center space-x-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-all">
                                    <span className="text-gray-700 text-xs font-bold">{user.name}</span>
                                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="right" width="48" contentClasses="bg-coklat-kopi/95 backdrop-blur-xl border border-gold/10 py-1">
                                <Dropdown.Link href={route('admin.profile.edit')} className="text-cream-gold/60 hover:text-gold hover:bg-gold/5 text-[10px] uppercase font-black tracking-widest border-b border-gold/10">
                                    Profil Saya
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button" className="text-cream-gold/60 hover:text-gold hover:bg-gold/5 text-[10px] uppercase font-black tracking-widest">
                                    Keluar Sesi
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
            
            <Toast 
                key={toastKey}
                message={toastMessage} 
                type={toastType}
                onClose={() => setToastMessage(null)} 
            />
        </div>
    );
}
