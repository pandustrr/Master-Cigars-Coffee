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
    MapPinIcon,
    PaperAirplaneIcon,
    ChatBubbleOvalLeftEllipsisIcon
} from '@heroicons/react/24/outline';

export default function MainLayout({ children }) {
    const { settings, locale, translations } = usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Helper function for translations
    const __ = (key) => {
        const keys = key.split('.');
        let result = translations;
        for (const k of keys) {
            if (result && result[k]) {
                result = result[k];
            } else {
                return key; // Fallback to key if not found
            }
        }
        return result;
    };

    // Contact Form State
    const [contactData, setContactData] = useState({
        name: '',
        message: ''
    });

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

    const handleWhatsAppSubmit = (e) => {
        e.preventDefault();
        const waNumber = settings.site_whatsapp || '6281234567890';
        const text = `Halo Master Cigars & Coffee,\n\nNama: ${contactData.name}\n\nPesan:\n${contactData.message}`;
        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
    };

    const navLinks = [
        { name: __('nav.home'), href: route('home'), routeName: 'home', icon: HomeIcon },
        { name: __('nav.about'), href: route('about'), routeName: 'about', icon: InformationCircleIcon },
        { name: __('nav.product'), href: route('product'), routeName: 'product', icon: ShoppingBagIcon },
        { name: __('nav.partners'), href: route('partners'), routeName: 'partners', icon: UserGroupIcon },
        { name: __('nav.investment'), href: route('investment'), routeName: 'investment', icon: CurrencyDollarIcon },
        { name: __('nav.sale'), href: route('sale.index'), routeName: 'sale.*', icon: ShoppingBagIcon },
    ];

    const languages = [
        { code: 'id', name: 'ID', flag: '🇮🇩' },
        { code: 'en', name: 'EN', flag: '🇺🇸' },
        { code: 'zh', name: 'ZH', flag: '🇨🇳' },
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

                            {/* Language Switcher Desktop */}
                            <div className="flex items-center space-x-2 border-l border-white/10 pl-6 ml-2">
                                {languages.map((lang) => (
                                    <a
                                        key={lang.code}
                                        href={route('lang.switch', lang.code)}
                                        className={`text-[9px] font-black px-2 py-1 rounded transition-all ${
                                            locale === lang.code 
                                            ? 'bg-gold text-hitam-pekat shadow-[0_0_10px_rgba(212,175,55,0.4)]' 
                                            : 'text-white/40 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {lang.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className={`inline-flex items-center justify-center p-2 rounded-md transition-all duration-300 border ${
                                    scrolled 
                                    ? 'bg-gold text-hitam-pekat border-gold shadow-lg shadow-gold/20' 
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

                        {/* Language Switcher Mobile */}
                        <div className="flex items-center space-x-4 pt-6 mt-4 border-t border-white/5">
                            {languages.map((lang) => (
                                <a
                                    key={lang.code}
                                    href={route('lang.switch', lang.code)}
                                    className={`flex-1 text-center py-4 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                                        locale === lang.code 
                                        ? 'bg-gold text-hitam-pekat shadow-lg shadow-gold/20' 
                                        : 'bg-white/5 text-white/40 border border-white/10'
                                    }`}
                                >
                                    <span className="mr-2 text-base">{lang.flag}</span> {lang.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Global Contact Form Section - Premium Unified Design */}
            <section className="py-24 bg-coklat-kopi/5 border-t border-gold/5 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-gold/3 via-transparent to-transparent pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Title Side */}
                        <div className="w-full lg:w-1/2 space-y-8">
                            <div className="flex items-center space-x-4 mb-2">
                                <div className="w-12 h-px bg-gold/50"></div>
                                <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-black italic">{__('layout.inquiry_center')}</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-gold uppercase tracking-tighter italic leading-tight">{__('hero.title')}</h2>
                            <p className="text-white/40 text-lg leading-relaxed font-light font-sans max-w-lg italic">
                                {__('hero.description')}
                            </p>
                            <div className="flex flex-col space-y-4 pt-4">
                                <div className="flex items-center space-x-4 text-gold/60">
                                    <div className="w-10 h-10 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center">
                                        <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest font-black">{__('layout.fast_response')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="w-full lg:w-1/2 bg-hitam-pekat/40 border border-gold/10 p-8 lg:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl -mr-16 -mt-16 group-hover:bg-gold/10 transition-colors"></div>
                           <form onSubmit={handleWhatsAppSubmit} className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gold/40 uppercase tracking-[0.3em] ml-1">{__('layout.full_name')}</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder={__('layout.name_placeholder')}
                                        value={contactData.name}
                                        onChange={(e) => setContactData({...contactData, name: e.target.value})}
                                        className="w-full bg-hitam-pekat border-0 border-b border-white/10 text-white placeholder:text-white/10 px-4 py-4 focus:ring-0 focus:border-gold transition-all font-sans italic"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gold/40 uppercase tracking-[0.3em] ml-1">{__('layout.your_inquiry')}</label>
                                    <textarea 
                                        required
                                        rows="4"
                                        placeholder={__('layout.msg_placeholder')}
                                        value={contactData.message}
                                        onChange={(e) => setContactData({...contactData, message: e.target.value})}
                                        className="w-full bg-hitam-pekat border-0 border-b border-white/10 text-white placeholder:text-white/10 px-4 py-4 focus:ring-0 focus:border-gold transition-all font-sans resize-none"
                                    ></textarea>
                                </div>
                                <div className="pt-4">
                                    <button 
                                        type="submit"
                                        className="w-full bg-gold text-hitam-pekat font-black uppercase text-[10px] tracking-[0.4em] py-5 flex items-center justify-center space-x-4 hover:bg-gold-muda transition-all active:scale-95 shadow-xl shadow-gold/20"
                                    >
                                        <span>{__('layout.send_wa')}</span>
                                        <PaperAirplaneIcon className="w-4 h-4" />
                                    </button>
                                </div>
                           </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer - Clear & Always Readable */}
            <footer className="bg-transparent pt-12 pb-8 relative overflow-hidden">
                {/* Decorative Elements - Subtle */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[100px] -mr-32 -mt-32 opacity-20"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Brand Column */}
                        <div className="col-span-1 md:col-span-1 space-y-5">
                            <div className="flex items-center space-x-3">
                                {settings.site_logo ? (
                                    <img src={`/storage/${settings.site_logo}`} className="w-10 h-10 object-contain grayscale-0 brightness-100" alt="Logo" />
                                ) : (
                                    <div className="w-8 h-8 bg-gold border border-gold flex items-center justify-center rounded-lg text-hitam-pekat font-bold text-lg">M</div>
                                )}
                                <div>
                                    <h2 className="text-white font-black text-lg uppercase tracking-tighter italic leading-none">MASTER</h2>
                                    <p className="text-gold uppercase tracking-[0.3em] text-[8px] font-black leading-none mt-1">Cigars & Coffee</p>
                                </div>
                            </div>
                            <p className="text-white/60 max-w-xs leading-relaxed text-[10px] font-medium uppercase tracking-widest italic">
                                "A sanctuary for aficionados seeking excellence in every puff and sip."
                            </p>
                        </div>

                        {/* Navigation links - High Contrast */}
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 col-span-1 md:col-span-2">
                            <div>
                                <h3 className="text-gold font-black mb-5 uppercase tracking-[0.2em] text-[10px] italic underline underline-offset-8 decoration-gold/30">{__('layout.quick_menu')}</h3>
                                <ul className="space-y-3">
                                    {navLinks.slice(0, 3).map((link) => (
                                        <li key={link.name}>
                                            <Link href={link.href} className="text-white/60 hover:text-gold transition-colors text-[9px] font-black uppercase tracking-[0.2em] flex items-center group">
                                                <div className="w-1.5 h-1.5 bg-gold/0 group-hover:bg-gold transition-colors rounded-full mr-2"></div>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-gold font-black mb-5 uppercase tracking-[0.2em] text-[10px] italic opacity-0 md:opacity-100">&nbsp;</h3>
                                <ul className="space-y-3">
                                    {navLinks.slice(3).map((link) => (
                                        <li key={link.name}>
                                            <Link href={link.href} className="text-white/60 hover:text-gold transition-colors text-[9px] font-black uppercase tracking-[0.2em] flex items-center group">
                                                <div className="w-1.5 h-1.5 bg-gold/0 group-hover:bg-gold transition-colors rounded-full mr-2"></div>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Contact details - High Contrast */}
                        <div>
                            <h3 className="text-gold font-black mb-5 uppercase tracking-[0.2em] text-[10px] italic underline underline-offset-8 decoration-gold/30">{__('layout.connect')}</h3>
                            <ul className="space-y-4 text-[9px] font-black uppercase tracking-widest text-white/60">
                                <li className="flex items-center space-x-3 group">
                                    <MapPinIcon className="w-4 h-4 text-gold shrink-0" />
                                    <span>{settings.site_address || "Kemang Raya No. 123, Jakarta"}</span>
                                </li>
                                <li className="flex items-center space-x-3 group mt-3">
                                    <PhoneIcon className="w-4 h-4 text-gold shrink-0" />
                                    <span>{settings.site_whatsapp || "+62 812 3456 7890"}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom copyright statement */}
                    <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-white/40 text-[7px] font-black uppercase tracking-[0.4em]">
                            &copy; {new Date().getFullYear()} Master Cigars & Coffee. {__('footer.rights')}
                        </p>
                        <div className="flex space-x-6 text-[7px] font-black uppercase tracking-widest text-white/40">
                            <span className="cursor-pointer hover:text-gold transition-colors">{__('layout.privacy')}</span>
                            <span className="cursor-pointer hover:text-gold transition-colors">{__('layout.terms')}</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
