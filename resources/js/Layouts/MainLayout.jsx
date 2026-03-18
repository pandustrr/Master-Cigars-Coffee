import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    HomeIcon,
    InformationCircleIcon,
    ShoppingBagIcon,
    UserGroupIcon,
    CurrencyDollarIcon,
    Bars3Icon,
    XMarkIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

export default function MainLayout({ children }) {
    const { settings } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    useEffect(() => {
        if (settings.site_favicon) {
            let link = document.querySelector("link[rel~='icon']");
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
            }
            link.href = `/storage/${settings.site_favicon}`;
        }
    }, [settings.site_favicon]);

    const navLinks = [
        { name: 'Home', href: route('home'), routeName: 'home', icon: HomeIcon },
        { name: 'About', href: route('about'), routeName: 'about', icon: InformationCircleIcon },
        { name: 'Product', href: route('product'), routeName: 'product', icon: ShoppingBagIcon },
        { name: 'Partners', href: route('partners'), routeName: 'partners', icon: UserGroupIcon },
        { name: 'Investment', href: route('investment'), routeName: 'investment', icon: CurrencyDollarIcon },
        { name: 'SALE', href: route('sale.index'), routeName: 'sale.*', icon: ShoppingBagIcon },
    ];

    return (
        <div className="min-h-screen bg-hitam-pekat font-sans selection:bg-gold/30 selection:text-gold-muda">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-hitam-pekat/80 backdrop-blur-md border-b border-coklat-kopi/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center">
                            <Link href={route('home')} className="flex items-center space-x-2 group">
                                <div className="w-12 h-12 rounded-full border-2 border-gold p-1 group-hover:border-gold-muda transition-all duration-300 overflow-hidden">
                                    {settings.site_logo ? (
                                        <img src={`/storage/${settings.site_logo}`} className="w-full h-full object-contain" alt="Logo" />
                                    ) : (
                                        <div className="w-full h-full bg-coklat-kopi rounded-full flex items-center justify-center text-gold font-bold text-xl">
                                            M
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gold font-bold text-xl leading-none uppercase tracking-wider">Master</span>
                                    <span className="text-gold-muda text-[10px] leading-tight uppercase tracking-widest">Cigars & Coffee</span>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-[11px] font-bold tracking-[0.2em] transition-all duration-300 uppercase relative group/link ${
                                        route().current(link.routeName) 
                                            ? 'text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' 
                                            : 'text-cream-gold/60 hover:text-gold-muda'
                                        }`}
                                >
                                    <span>{link.name}</span>
                                    <span className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-300 ${route().current(link.routeName) ? 'w-full shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'w-0 group-hover/link:w-full'}`}></span>
                                </Link>
                            ))}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gold hover:text-gold-muda focus:outline-none transition duration-150 ease-in-out bg-coklat-kopi/30"
                            >
                                {showingNavigationDropdown ? (
                                    <XMarkIcon className="h-6 w-6" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`${showingNavigationDropdown ? 'block' : 'hidden'} md:hidden bg-coklat-kopi border-t border-gold-tua/30`}>
                    <div className="pt-2 pb-3 space-y-1 px-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`block py-3 text-base font-medium transition-all ${
                                    route().current(link.routeName) ? 'text-gold' : 'text-cream-gold'
                                }`}
                                onClick={() => setShowingNavigationDropdown(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-20">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-coklat-kopi border-t border-gold-tua/30 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            {settings.site_logo ? (
                                <img src={`/storage/${settings.site_logo}`} className="w-16 h-16 object-contain" alt="Logo" />
                            ) : (
                                <div className="w-12 h-12 bg-gold flex items-center justify-center rounded-full text-hitam-pekat font-bold text-2xl">M</div>
                            )}
                            <div>
                                <h2 className="text-gold font-bold text-2xl uppercase tracking-tighter">Master</h2>
                                <p className="text-gold-muda text-xs uppercase tracking-widest leading-none">Cigars & Coffee</p>
                            </div>
                        </div>
                        <p className="text-cream-gold/60 max-w-md leading-relaxed">
                            Experience the finest blend of premium hand-rolled cigars and artisanal coffee. A sanctuary for aficionados seeking excellence in every puff and sip.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-gold font-bold mb-6 uppercase tracking-wider text-sm">Navigation</h3>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}><Link href={link.href} className="text-cream-gold/60 hover:text-gold transition-colors text-sm uppercase tracking-wide">{link.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gold font-bold mb-6 uppercase tracking-wider text-sm">Contact</h3>
                        <ul className="space-y-4 text-sm text-cream-gold/60">
                            <li className="flex items-start space-x-3">
                                <MapPinIcon className="w-5 h-5 text-gold shrink-0" />
                                <span>Jl. Kemang Raya No. 123, Jakarta Selatan, Indonesia</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <PhoneIcon className="w-5 h-5 text-gold shrink-0" />
                                <span>+62 812 3456 7890</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <EnvelopeIcon className="w-5 h-5 text-gold shrink-0" />
                                <span>info@mastercigars.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gold-tua/10 text-center">
                    <p className="text-cream-gold/40 text-xs uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} Master Cigars & Coffee. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
