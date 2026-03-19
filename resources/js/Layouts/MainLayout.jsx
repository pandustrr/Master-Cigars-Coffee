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
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            {/* Navbar - Modern Glassmorphism */}
            <nav className={`fixed w-full z-[100] transition-all duration-500 ${
                scrolled 
                ? 'bg-black/60 backdrop-blur-2xl border-b border-gold/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]' 
                : 'bg-transparent py-6 border-b border-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14">
                        <div className="flex items-center">
                            <Link href={route('home')} className="flex items-center space-x-3 group">
                                <div className={`relative rounded-full border-2 transition-all duration-500 overflow-hidden ${scrolled ? 'w-10 h-10 border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'w-12 h-12 border-white/20'}`}>
                                    {settings.site_logo ? (
                                        <img src={`/storage/${settings.site_logo}`} className="w-full h-full object-contain p-0.5" alt="Logo" />
                                    ) : (
                                        <div className="w-full h-full bg-hitam-pekat rounded-full flex items-center justify-center text-gold font-bold text-xl">
                                            M
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className={`font-black uppercase tracking-widest transition-all duration-500 ${scrolled ? 'text-lg text-gold' : 'text-xl text-white'}`}>Master</span>
                                    <span className={`text-[8px] uppercase tracking-[0.4em] font-black transition-all duration-500 ${scrolled ? 'text-gold/60' : 'text-white/40'}`}>Cigars & Coffee</span>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-[10px] font-black tracking-[0.3em] transition-all duration-300 uppercase relative group/link py-2 ${
                                        route().current(link.routeName) 
                                            ? 'text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' 
                                            : scrolled ? 'text-white/70 hover:text-gold' : 'text-white/40 hover:text-white'
                                        }`}
                                >
                                    <span>{link.name}</span>
                                    <span className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${route().current(link.routeName) ? 'w-full shadow-[0_0_10px_rgba(212,175,55,0.8)]' : 'w-0 group-hover/link:w-full'}`}></span>
                                </Link>
                            ))}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className={`inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 border ${
                                    scrolled 
                                    ? 'bg-gold text-hitam-pekat border-gold' 
                                    : 'bg-white/5 text-gold border-white/10'
                                }`}
                            >
                                {showingNavigationDropdown ? (
                                    <XMarkIcon className="h-5 w-5" />
                                ) : (
                                    <Bars3Icon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`${showingNavigationDropdown ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'} absolute top-full left-0 w-full md:hidden bg-hitam-pekat/95 backdrop-blur-3xl border-b border-gold/10 transition-all duration-500 ease-in-out shadow-2xl`}>
                    <div className="py-8 space-y-2 px-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`block py-4 text-xs font-black uppercase tracking-[0.4em] border-b border-white/5 last:border-0 transition-all ${
                                    route().current(link.routeName) ? 'text-gold pl-4' : 'text-white/40'
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
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-hitam-pekat border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-coklat-kopi/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div className="col-span-1 md:col-span-2 space-y-8">
                        <div className="flex items-center space-x-4">
                            {settings.site_logo ? (
                                <img src={`/storage/${settings.site_logo}`} className="w-16 h-16 object-contain grayscale brightness-125" alt="Logo" />
                            ) : (
                                <div className="w-14 h-14 bg-gold/10 border border-gold/20 flex items-center justify-center rounded-2xl text-gold font-bold text-2xl">M</div>
                            )}
                            <div>
                                <h2 className="text-white font-black text-2xl uppercase tracking-tighter italic">MASTER</h2>
                                <p className="text-gold uppercase tracking-[0.4em] text-[10px] font-black leading-none opacity-60">Cigars & Coffee</p>
                            </div>
                        </div>
                        <p className="text-white/40 max-w-md leading-relaxed text-xs font-medium uppercase tracking-widest italic">
                            "A sanctuary for aficionados seeking excellence in every puff and sip. Experience the finest blend of premium hand-rolled cigars and artisanal coffee."
                        </p>
                    </div>

                    <div>
                        <h3 className="text-gold font-black mb-8 uppercase tracking-[0.3em] text-[10px] italic">Navigation</h3>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/30 hover:text-gold transition-colors text-[10px] font-black uppercase tracking-[0.2em]">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gold font-black mb-8 uppercase tracking-[0.3em] text-[10px] italic">Contact Center</h3>
                        <ul className="space-y-6 text-[10px] font-black uppercase tracking-widest text-white/30">
                            <li className="flex items-start space-x-4 group cursor-pointer hover:text-white transition-colors">
                                <MapPinIcon className="w-5 h-5 text-gold/40 shrink-0 group-hover:text-gold transition-colors" />
                                <span className="leading-relaxed">Jl. Kemang Raya No. 123,<br/>Jakarta Selatan, Indonesia</span>
                            </li>
                            <li className="flex items-center space-x-4 group cursor-pointer hover:text-white transition-colors">
                                <PhoneIcon className="w-5 h-5 text-gold/40 shrink-0 group-hover:text-gold transition-colors" />
                                <span>+62 812 3456 7890</span>
                            </li>
                            <li className="flex items-center space-x-4 group cursor-pointer hover:text-white transition-colors">
                                <EnvelopeIcon className="w-5 h-5 text-gold/40 shrink-0 group-hover:text-gold transition-colors" />
                                <span>info@mastercigars.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/20 text-[8px] font-black uppercase tracking-[0.4em]">
                        &copy; {new Date().getFullYear()} Master Cigars & Coffee. International Aficionado Syndicate.
                    </p>
                    <div className="flex space-x-6 text-[8px] font-black uppercase tracking-widest text-white/10 hover:text-white/30 transition-colors cursor-pointer">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
