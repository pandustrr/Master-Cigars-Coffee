import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-hitam-pekat relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/images/hero.png" 
                    className="w-full h-full object-cover brightness-[0.2] grayscale"
                    alt="Background"
                />
                <div className="absolute inset-0 bg-linear-to-b from-hitam-pekat/60 via-hitam-pekat to-hitam-pekat"></div>
            </div>

            <div className="relative z-10">
                <Link href="/">
                    <div className="w-20 h-20 rounded-full border-2 border-gold p-1 bg-coklat-kopi/50 backdrop-blur-sm flex items-center justify-center text-gold font-bold text-3xl shadow-2xl">
                        M
                    </div>
                </Link>
            </div>

            <div className="relative z-10 mt-10 w-full sm:max-w-md px-10 py-12 bg-hitam-pekat/40 backdrop-blur-xl border border-gold-tua/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
                {children}
            </div>
        </div>
    );
}
