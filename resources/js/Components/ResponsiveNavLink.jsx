import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${active
                    ? 'border-gold bg-gold/5 text-gold focus:border-gold-muda focus:bg-gold/10 focus:text-gold-muda'
                    : 'border-transparent text-cream-gold/60 hover:border-gold/20 hover:bg-gold/5 hover:text-gold focus:border-gold/20 focus:bg-gold/5 focus:text-gold'
                } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
