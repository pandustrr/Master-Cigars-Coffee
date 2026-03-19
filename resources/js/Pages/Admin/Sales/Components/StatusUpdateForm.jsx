import { useForm } from '@inertiajs/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function StatusUpdateForm({ order, type }) {
    const getNextStatus = (current) => {
        const flow = {
            'Menunggu Konfirmasi': 'Diproses',
            'Diproses': 'Dikirim',
            'Dikirim': 'Selesai',
            'Selesai': 'Selesai'
        };
        return flow[current] || current;
    };

    const { data, setData, patch, processing } = useForm({
        status: getNextStatus(order.status),
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.sales.status.update', { type, id: order.id }), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={submit} className="flex items-center justify-end space-x-1.5 bg-white p-1 rounded-xl border border-gray-200 shadow-sm ml-auto w-fit">
            <select
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
                className="text-[10px] font-black px-2 py-1.5 border-none bg-transparent rounded-lg focus:ring-0 transition-all uppercase tracking-widest text-gray-600 cursor-pointer w-[160px] text-left appearance-auto"
            >
                <option value="Menunggu Konfirmasi">Menunggu Verifikasi</option>
                <option value="Diproses">Diproses / Menyiapkan</option>
                <option value="Dikirim">Dalam Pengiriman</option>
                <option value="Selesai">Pesanan Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
            </select>
            <button
                type="submit"
                disabled={processing || data.status === order.status}
                className={`p-1.5 font-black rounded-lg uppercase tracking-widest active:scale-95 transition-all shadow-sm shrink-0 flex items-center justify-center ${
                    data.status !== order.status
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                title="Simpan Perubahan Status"
            >
                <CheckCircleIcon className="w-4 h-4" />
                {data.status !== order.status && (
                    <span className="ml-1 text-[8px] hidden sm:inline">Update</span>
                )}
            </button>
        </form>
    );
}
