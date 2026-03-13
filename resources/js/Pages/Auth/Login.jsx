import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Admin Login" />

            <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-gold uppercase tracking-[0.3em]">Master Login</h2>
                <p className="text-cream-gold/40 text-[10px] uppercase font-bold tracking-widest mt-2 px-6">Akses Terbatas untuk Aficionado Autentik</p>
            </div>

            {status && (
                <div className="mb-6 bg-gold/10 border border-gold/30 p-3 text-xs text-gold text-center uppercase tracking-widest">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="space-y-6">
                    <div className="relative group">
                        <InputLabel htmlFor="username" value="USERNAME" className="text-gold/60 text-[10px] tracking-[0.2em] font-black" />
                        <div className="flex items-center border-b border-gold-tua/20 group-focus-within:border-gold transition-colors pb-1">
                            <UserIcon className="w-5 h-5 text-gold-tua/30 group-focus-within:text-gold transition-colors" />
                            <TextInput
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                className="mt-1 block w-full bg-transparent! border-0! focus:ring-0! text-cream-gold shadow-none! placeholder:text-gold-tua/20"
                                autoComplete="username"
                                isFocused={true}
                                placeholder="ADMIN_MASTER"
                                onChange={(e) => setData('username', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.username} className="mt-2 text-[10px] uppercase tracking-widest" />
                    </div>

                    <div className="relative group">
                        <InputLabel htmlFor="password" value="PASSWORD" className="text-gold/60 text-[10px] tracking-[0.2em] font-black" />
                        <div className="flex items-center border-b border-gold-tua/20 group-focus-within:border-gold transition-colors pb-1">
                            <LockClosedIcon className="w-5 h-5 text-gold-tua/30 group-focus-within:text-gold transition-colors" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-transparent! border-0! focus:ring-0! text-cream-gold shadow-none!"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                        </div>
                        <InputError message={errors.password} className="mt-2 text-[10px] uppercase tracking-widest" />
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="bg-hitam-pekat! border-gold-tua/30! text-gold focus:ring-gold!"
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-3 text-[10px] font-bold text-cream-gold/40 uppercase tracking-widest">
                            Ingat Sesi
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-[10px] font-bold text-gold/60 uppercase tracking-widest hover:text-gold transition-colors underline-offset-4 decoration-gold/20"
                        >
                            Lupa Kata Sandi?
                        </Link>
                    )}
                </div>

                <div className="mt-10">
                    <PrimaryButton className="w-full bg-gold! text-hitam-pekat! justify-center py-4 font-black! text-xs! tracking-[0.4em]! hover:bg-gold-muda! group transition-all" disabled={processing}>
                        AUTHENTIKASI
                    </PrimaryButton>
                    <Link href="/" className="block text-center mt-6 text-[9px] text-cream-gold/30 hover:text-gold transition-colors uppercase font-bold tracking-[0.2em] italic">
                        &larr; Kembali ke Situs Utama
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
