export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-widest text-hitam-pekat transition duration-150 ease-in-out hover:bg-gold-muda focus:bg-gold-muda focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 active:bg-gold-tua ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
