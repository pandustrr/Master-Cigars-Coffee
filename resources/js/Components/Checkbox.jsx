export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gold/10 text-gold shadow-sm focus:ring-gold bg-hitam-pekat/50 ' +
                className
            }
        />
    );
}
