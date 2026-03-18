import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-gold text-gold focus:border-gold-muda'
                    : 'border-transparent text-cream-gold/60 hover:border-gold/30 hover:text-cream-gold focus:border-gold/30 focus:text-cream-gold') +
                className
            }
        >
            {children}
        </Link>
    );
}
