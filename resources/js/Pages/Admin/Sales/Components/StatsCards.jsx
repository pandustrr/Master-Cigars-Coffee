import React from 'react';
import { BanknotesIcon, CircleStackIcon } from '@heroicons/react/24/outline';

export default function StatsCards({ retailOrders, packageOrders, pointCornerOrders, saleItems }) {
    const calculateSales = (orders) => {
        return orders
            .filter(o => o.status === 'Selesai')
            .reduce((acc, curr) => acc + (parseFloat(curr.total_price) || 0), 0);
    };

    const calculateStock = (category) => {
        const total = saleItems
            .filter(i => i.category === category)
            .reduce((acc, curr) => acc + (parseInt(curr.stock) || 0), 0);
        return Math.max(0, total);
    };

    const totalSales = calculateSales(retailOrders) + calculateSales(packageOrders) + calculateSales(pointCornerOrders);
    const totalStock = saleItems.reduce((acc, curr) => acc + (parseInt(curr.stock) || 0), 0);

    return (
        <div className="flex flex-col md:flex-row gap-2">
            {/* Minimal Sales Stat */}
            <div className="flex-1 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center text-gold">
                        <BanknotesIcon className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 block leading-none">Total Omzet Selesai</span>
                        <span className="text-xs font-black text-gray-800 tracking-tight">Rp {totalSales.toLocaleString()}</span>
                    </div>
                </div>
                {/* Minimal breakdown (No numbers for names, just colors) */}
                <div className="flex space-x-1.5 opacity-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" title="Retail"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-muda" title="Package"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-200" title="Point"></div>
                </div>
            </div>

            {/* Minimal Stock Stat */}
            <div className="flex-1 bg-white px-4 py-2.5 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/5 flex items-center justify-center text-emerald-500">
                        <CircleStackIcon className="w-4 h-4" />
                    </div>
                    <div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 block leading-none">Stok Tersedia</span>
                        <span className="text-xs font-black text-gray-800 tracking-tight">{totalStock} Unit</span>
                    </div>
                </div>
                <div className="flex space-x-1.5 opacity-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Retail"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" title="Package"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-100" title="Point"></div>
                </div>
            </div>
        </div>
    );
}
