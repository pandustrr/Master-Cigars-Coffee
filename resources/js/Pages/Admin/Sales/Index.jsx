import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    ShoppingBagIcon,
    TruckIcon,
    CheckCircleIcon,
    ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import { TagIcon } from '@heroicons/react/24/outline';
import OrdersTab from './Components/OrdersTab';
import CatalogTab from './Components/CatalogTab';
import StatsCards from './Components/StatsCards';
import { ItemFormModal, ViewItemModal, CategoryManagementModal } from './Components/CatalogModals';

export default function Index({ retailOrders, packageOrders, pointCornerOrders, saleItems, categories }) {
    const [activeTab, setActiveTab] = useState('catalog');
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);
    const [viewingItem, setViewingItem] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [catalogFilter, setCatalogFilter] = useState('Semua');

    const { data, setData, post, delete: destroy, processing, reset } = useForm({
        name: '',
        price: '',
        category: categories.length > 0 ? categories[0].name : 'Retail',
        description: '',
        specifications: [],
        stock: 0,
        image: null,
    });

    const { data: catData, setData: setCatData, post: postCat, delete: destroyCat, processing: processingCat, reset: resetCat } = useForm({ name: '' });

    const submitItem = (e) => {
        e.preventDefault();
        if (editingItem) {
            post(route('admin.sales.items.update', editingItem.id), {
                onSuccess: () => {
                    reset();
                    setEditingItem(null);
                    setIsItemModalOpen(false);
                    setImagePreview(null);
                }
            });
        } else {
            post(route('admin.sales.items.store'), {
                onSuccess: () => {
                    reset();
                    setIsItemModalOpen(false);
                    setImagePreview(null);
                }
            });
        }
    };

    const submitCategory = (e) => {
        e.preventDefault();
        if (editingCategory) {
            postCat(route('admin.categories.update', editingCategory.id), {
                onSuccess: () => {
                    resetCat();
                    setEditingCategory(null);
                }
            });
        } else {
            postCat(route('admin.categories.store'), { onSuccess: () => resetCat() });
        }
    };

    const handleEditCategory = (cat) => {
        setEditingCategory(cat);
        setCatData('name', cat.name);
    };

    const handleDeleteCategory = (id) => {
        if (confirm('Hapus kategori ini?')) destroyCat(route('admin.categories.destroy', id), { preserveScroll: true });
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setImagePreview(item.image ? `/storage/${item.image}` : null);
        setData({
            name: item.name,
            price: item.price,
            category: item.category,
            description: item.description || '',
            specifications: item.specifications || [],
            stock: item.stock !== undefined ? item.stock : 0,
            image: null,
        });
        setIsItemModalOpen(true);
    };

    const tabs = [
        { id: 'catalog', name: 'Manajemen Marketplace', icon: ArchiveBoxIcon, count: saleItems.length },
        { id: 'retail', name: 'Pesanan Ritel', icon: ShoppingBagIcon, count: retailOrders.length },
        { id: 'package', name: 'Pesanan Paket', icon: TruckIcon, count: packageOrders.length },
        { id: 'point', name: 'Pesanan Point Corner', icon: CheckCircleIcon, count: pointCornerOrders.length },
    ];

    const filteredCatalogItems = catalogFilter === 'Semua'
        ? saleItems
        : saleItems.filter(item => item.category === catalogFilter);

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-2xl text-gold leading-tight tracking-tighter uppercase">Manajemen Marketplace</h2>}
        >
            <Head title="Admin - Marketplace" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Stats Summary */}
                    <div className="animate-fade-in delay-100">
                        <StatsCards
                            retailOrders={retailOrders}
                            packageOrders={packageOrders}
                            pointCornerOrders={pointCornerOrders}
                            saleItems={saleItems}
                        />
                    </div>

                    {/* Tab Navigation */}
                    <div className="bg-white p-2 rounded-xl border border-gray-100 flex space-x-2 overflow-x-auto no-scrollbar shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center space-x-2 py-2.5 px-5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 shrink-0
                                    ${activeTab === tab.id
                                        ? 'bg-gold text-white shadow-md'
                                        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-800'}
                                `}
                            >
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-gray-300'}`} />
                                <span>{tab.name}</span>

                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="animate-fade-in">
                        {activeTab === 'catalog' ? (
                            <CatalogTab
                                saleItems={saleItems}
                                categories={categories}
                                catalogFilter={catalogFilter}
                                setCatalogFilter={setCatalogFilter}
                                filteredCatalogItems={filteredCatalogItems}
                                setViewingItem={setViewingItem}
                                handleEditItem={handleEditItem}
                                reset={reset}
                                setIsItemModalOpen={setIsItemModalOpen}
                                setIsCategoryModalOpen={setIsCategoryModalOpen}
                                setImagePreview={setImagePreview}
                                destroy={destroy}
                            />
                        ) : (
                            <OrdersTab
                                activeTab={activeTab}
                                orders={activeTab === 'retail' ? retailOrders : activeTab === 'package' ? packageOrders : pointCornerOrders}
                            />
                        )}
                    </div>
                </div>
            </div>

            <ItemFormModal
                isItemModalOpen={isItemModalOpen}
                setIsItemModalOpen={setIsItemModalOpen}
                editingItem={editingItem}
                categories={categories}
                data={data}
                setData={setData}
                submitItem={submitItem}
                processing={processing}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
            />

            <ViewItemModal
                viewingItem={viewingItem}
                setViewingItem={setViewingItem}
            />

            <CategoryManagementModal
                isOpen={isCategoryModalOpen}
                setIsOpen={setIsCategoryModalOpen}
                categories={categories}
                catData={catData}
                setCatData={setCatData}
                submitCategory={submitCategory}
                processingCat={processingCat}
                editingCategory={editingCategory}
                setEditingCategory={setEditingCategory}
                handleEditCategory={handleEditCategory}
                handleDeleteCategory={handleDeleteCategory}
                resetCat={resetCat}
            />
        </SidebarAdmin>
    );
}
