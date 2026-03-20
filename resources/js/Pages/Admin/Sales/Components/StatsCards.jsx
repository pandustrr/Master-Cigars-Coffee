import React from 'react';
import { BanknotesIcon, CircleStackIcon, ShoppingBagIcon, TruckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

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

    const salesRef = {
        retail: calculateSales(retailOrders),
        package: calculateSales(packageOrders),
        point: calculateSales(pointCornerOrders)
    };
    const totalSales = salesRef.retail + salesRef.package + salesRef.point;

    const stockRef = {
        retail: calculateStock('Retail'),
        package: calculateStock('Package'),
        point: calculateStock('Point Corner')
    };
    const totalStock = stockRef.retail + stockRef.package + stockRef.point;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Sales Stats */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4 shrink-0">
                    <div className="p-3 bg-gold/5 rounded-2xl text-gold border border-gold/10">
                        <BanknotesIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Total Omzet Selesai</span>
                        <span className="text-lg font-black text-gray-800 tracking-tighter">Rp {totalSales.toLocaleString()}</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
                    {[
                        { label: 'Retail', val: `Rp ${salesRef.retail.toLocaleString()}`, color: 'bg-gold/5 text-gold border-gold/20' },
                        { label: 'Package', val: `Rp ${salesRef.package.toLocaleString()}`, color: 'bg-gray-50 text-gray-600 border-gray-100' },
                        { label: 'Point', val: `Rp ${salesRef.point.toLocaleString()}`, color: 'bg-gray-50 text-gray-600 border-gray-100' },
                    ].map((s, i) => (
                        <div key={i} className={`p-2 rounded-xl border text-center ${s.color}`}>
                            <div className="text-[7px] font-black uppercase tracking-tighter mb-1 opacity-60 leading-none">{s.label}</div>
                            <div className="text-[9px] font-black tracking-tight truncate leading-none">{s.val}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stock Stats */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4 shrink-0">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 border border-emerald-100">
                        <CircleStackIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Total Stok Marketplace</span>
                        <span className="text-lg font-black text-gray-800 tracking-tighter">{totalStock} <span className="text-[10px] uppercase opacity-50">Unit</span></span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 w-full md:w-auto">
                    {[
                        { label: 'Retail', val: stockRef.retail, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                        { label: 'Package', val: stockRef.package, color: 'bg-gray-50 text-gray-600 border-gray-100' },
                        { label: 'Point', val: stockRef.point, color: 'bg-gray-50 text-gray-600 border-gray-100' },
                    ].map((s, i) => (
                        <div key={i} className={`p-2 rounded-xl border text-center ${s.color}`}>
                            <div className="text-[7px] font-black uppercase tracking-tighter mb-1 opacity-60 leading-none">{s.label}</div>
                            <div className="text-[9px] font-black tracking-tight leading-none">{s.val}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
