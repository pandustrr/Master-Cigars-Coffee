import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    ArchiveBoxIcon,
    PhotoIcon,
    TagIcon,
    CloudArrowUpIcon,
    XMarkIcon,
    FunnelIcon,
    CheckIcon,
    SquaresPlusIcon
} from '@heroicons/react/24/outline';

export default function Index({ mainProducts, categories }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]); // List of {url, file, existingPath}
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    const { data: catData, setData: setCatData, post: postCat, delete: destroyCat, processing: processingCat, reset: resetCat } = useForm({ name: '' });

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        category: categories.length > 0 ? categories[0].name : '',
        description: '',
        image: null,
        gallery: [], // Files to upload
        deleted_gallery: [], // Paths to delete
    });

    // Filtered Products Memoization
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'Semua') return mainProducts;
        return mainProducts.filter(p => p.category === selectedCategory);
    }, [mainProducts, selectedCategory]);

    // Clear preview when modal closes
    useEffect(() => {
        if (!isAddModalOpen) {
            setImagePreview(null);
            setGalleryPreviews([]);
            setEditingProduct(null);
            reset();
        }
    }, [isAddModalOpen]);

    const submit = (e) => {
        e.preventDefault();
        
        // Finalize gallery files for upload
        const filesToUpload = galleryPreviews.filter(p => p.file).map(p => p.file);
        
        // I need to use inertia's setData to ensure the latest state is captured if I don't use direct post data.
        // Actually, inertia's useForm hook works best when we use its own functions, so we need to set gallery before calling post.
        // But since file objects are dynamic, let's just use manual post data.
        
        if (editingProduct) {
            post(route('admin.main-products.update', editingProduct.id), {
                onSuccess: () => { setIsAddModalOpen(false); },
                forceFormData: true,
            });
        } else {
            post(route('admin.main-products.store'), {
                onSuccess: () => { setIsAddModalOpen(false); },
                forceFormData: true,
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

    const handleEdit = (product) => {
        setEditingProduct(product);
        setImagePreview(product.image ? `/storage/${product.image}` : null);
        
        // Format gallery for local previews
        const existingGallery = (product.gallery || []).map(path => ({
            url: `/storage/${path}`,
            file: null,
            existingPath: path
        }));
        setGalleryPreviews(existingGallery);
        
        setData({ 
            name: product.name, 
            category: product.category || (categories.length > 0 ? categories[0].name : ''), 
            description: product.description || '', 
            image: null,
            gallery: [],
            deleted_gallery: []
        });
        setIsAddModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Hapus item ini?')) destroy(route('admin.main-products.destroy', id), { preserveScroll: true });
    };

    const handleDeleteCategory = (id) => {
        if (confirm('Hapus kategori ini?')) destroyCat(route('admin.categories.destroy', id), { preserveScroll: true });
    };

    const handleAddGalleryFile = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = files.map(f => ({
            url: URL.createObjectURL(f),
            file: f,
            existingPath: null
        }));
        
        const updatedPreviews = [...galleryPreviews, ...newPreviews];
        setGalleryPreviews(updatedPreviews);
        
        // Update useForm
        setData('gallery', updatedPreviews.filter(p => p.file).map(p => p.file));
    };

    const removeGalleryItem = (index) => {
        const item = galleryPreviews[index];
        if (item.existingPath) {
            setData('deleted_gallery', [...data.deleted_gallery, item.existingPath]);
        }
        
        const updatedPreviews = galleryPreviews.filter((_, i) => i !== index);
        setGalleryPreviews(updatedPreviews);
        setData('gallery', updatedPreviews.filter(p => f => f.file).map(p => p.file));
    };

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-xl text-gold leading-tight tracking-tight uppercase">Produk</h2>}
        >
            <Head title="Admin - Produk" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">

                    {/* Header */}
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
                        <div>
                            <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight leading-none">Produk Utama</h3>
                            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1.5 leading-none">Arsitektur produk & kategori global</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setIsCategoryModalOpen(true)}
                                className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gray-50 hover:text-gray-800 transition-all flex items-center space-x-2 shadow-sm">
                                <TagIcon className="w-4 h-4" />
                                <span>Kategori</span>
                            </button>
                            <button onClick={() => { setIsAddModalOpen(true); }}
                                className="bg-gold text-white px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gold-muda transition-all shadow-md flex items-center space-x-2">
                                <PlusIcon className="w-4 h-4" />
                                <span>Tambah Produk</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Filter */}
                    <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1">
                        <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                            <div className="px-3 flex items-center space-x-2 border-r border-gray-100 mr-1">
                                <FunnelIcon className="w-3.5 h-3.5 text-gray-500" />
                                <span className="text-[8px] font-black uppercase tracking-widest text-gray-600">Filter Aktif:</span>
                            </div>
                            <button
                                onClick={() => setSelectedCategory('Semua')}
                                className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${selectedCategory === 'Semua' ? 'bg-hitam-pekat text-white shadow-lg shadow-black/20' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                                SEMUA
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${selectedCategory === cat.name ? 'bg-gold text-hitam-pekat shadow-lg shadow-gold/20' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Nama Produk</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Kategori</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest">Deskripsi</th>
                                        <th className="px-6 py-4 text-right text-[10px] font-black text-gray-500 uppercase tracking-widest">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 rounded-xl bg-gray-50 overflow-hidden border border-gray-100 shrink-0 shadow-inner">
                                                        {product.image ? (
                                                            <img src={`/storage/${product.image}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-black">MC</div>
                                                        )}
                                                    </div>
                                                    <div className="text-sm font-black text-gray-800 transition-colors uppercase italic tracking-tighter">{product.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-gold/5 text-gold-muda font-black text-[9px] uppercase rounded-lg border border-gold/10 tracking-widest">{product.category}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xs text-gray-500 max-w-sm font-medium leading-relaxed truncate group-hover:text-gray-800 transition-colors">"{product.description}"</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end space-x-1.5">
                                                    <button onClick={() => handleEdit(product)} className="p-3 text-gold bg-gold/5 hover:bg-gold/10 rounded-xl transition-all shadow-sm border border-gold/10">
                                                        <PencilSquareIcon className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDelete(product.id)} className="p-3 text-red-500 bg-red-50/50 hover:bg-red-50 rounded-xl transition-all shadow-sm border border-red-100">
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {filteredProducts.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-20 text-center">
                                                <div className="flex flex-col items-center space-y-3 opacity-30">
                                                    <ArchiveBoxIcon className="w-12 h-12 text-gray-300" />
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tidak ada produk dalam kategori ini</p>
                                                    <button onClick={() => setSelectedCategory('Semua')} className="text-gold text-[9px] font-black uppercase tracking-widest border-b border-gold/30">Kembali ke Semua</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>

            {/* Category Modal */}
            {isCategoryModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-transparent pointer-events-auto overflow-hidden">
                    <div className="absolute inset-0" onClick={() => { setIsCategoryModalOpen(false); setEditingCategory(null); resetCat(); }}></div>
                    <div className="relative bg-white rounded-2xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.3)] w-full max-w-md overflow-hidden border border-gray-100">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h4 className="font-black uppercase tracking-widest text-gray-800 text-xs">Kelola Kategori</h4>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Tambah & perbarui kategori Utama</p>
                            </div>
                            <button onClick={() => { setIsCategoryModalOpen(false); setEditingCategory(null); resetCat(); }} className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-5 space-y-5">
                            <form onSubmit={submitCategory} className="flex gap-2">
                                <input type="text" value={catData.name} onChange={e => setCatData('name', e.target.value)}
                                    className="flex-1 border-gray-200 rounded-xl text-[10px] font-black p-3 focus:ring-gold focus:border-gold transition-all bg-gray-50 text-gray-800 placeholder-gray-400 uppercase tracking-wider shadow-inner"
                                    placeholder="Masukkan nama kategori..." required />
                                <button type="submit" disabled={processingCat} className={`px-5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-md ${editingCategory ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-gold text-white hover:bg-gold-muda'}`}>
                                    {editingCategory ? 'Update' : 'Tambah'}
                                </button>
                            </form>
                            
                            {editingCategory && (
                                <div className="bg-amber-50 p-2 rounded-lg flex items-center justify-between border border-amber-100">
                                    <span className="text-[8px] font-black uppercase text-amber-600 tracking-widest pl-2 italic">Mode Edit: {editingCategory.name}</span>
                                    <button onClick={() => { setEditingCategory(null); resetCat(); }} className="text-[7px] font-black uppercase bg-white px-2 py-1 rounded-md text-amber-600 border border-amber-200">Batal</button>
                                </div>
                            )}

                            <div className="bg-gray-50/50 rounded-xl p-3.5 max-h-[280px] overflow-y-auto border border-gray-100 space-y-2 no-scrollbar">
                                {categories.map((cat) => (
                                    <div key={cat.id} className={`group bg-white p-3 rounded-xl border flex justify-between items-center transition-all shadow-sm ${editingCategory?.id === cat.id ? 'border-amber-400 bg-amber-50/30' : 'border-gray-50 hover:border-gold/30 hover:shadow-md'}`}>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-gold transition-colors">
                                                <TagIcon className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest leading-none">{cat.name}</span>
                                        </div>
                                        <div className="flex items-center space-x-1.5 transition-opacity">
                                            <button onClick={() => handleEditCategory(cat)} className="p-1.5 text-amber-500 bg-amber-50/50 hover:bg-amber-50 rounded-lg transition-all border border-amber-100">
                                                <PencilSquareIcon className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => handleDeleteCategory(cat.id)} className="p-1.5 text-red-500 bg-red-50/50 hover:bg-red-50 rounded-lg transition-all border border-red-100">
                                                <TrashIcon className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Modal - Horizontal Layout With Gallery */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-transparent pointer-events-auto overflow-hidden">
                    <div className="absolute inset-0" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.3)] w-full max-w-4xl overflow-hidden border border-gray-100 max-h-[95vh] flex flex-col">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center shrink-0">
                            <div>
                                <h4 className="font-black uppercase tracking-widest text-gray-800 text-xs italic">{editingProduct ? 'Modifikasi Produk' : 'Registrasi Produk'}</h4>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Integrasi arsitektur Marketplace produk</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <form onSubmit={submit} className="p-6 overflow-y-auto no-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Left Column: Visual Assets */}
                                <div className="space-y-6">
                                    <div className="space-y-1.5">
                                        <label className="flex items-center space-x-2 text-[9px] font-black uppercase text-gray-500 tracking-widest">
                                            <PhotoIcon className="w-3.5 h-3.5" /><span>Asset Visual Utama (Main)</span>
                                        </label>
                                        
                                        <div className="relative group/asset aspect-video rounded-2xl overflow-hidden border border-dashed border-gray-300 bg-gray-50/50 hover:border-gold transition-all cursor-pointer shadow-inner">
                                            {imagePreview ? (
                                                <div className="w-full h-full relative">
                                                    <img src={imagePreview} className="w-full h-full object-cover group-hover/asset:scale-105 transition-transform duration-1000" alt="Preview" />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/asset:opacity-100 transition-all flex flex-col items-center justify-center backdrop-blur-[2px]">
                                                        <CloudArrowUpIcon className="w-6 h-6 text-white mb-2" />
                                                        <span className="text-white text-[8px] font-black uppercase tracking-widest text-center px-4">Ganti Asset Gambar Utama</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center space-y-3 opacity-30 group-hover/asset:opacity-100">
                                                    <CloudArrowUpIcon className="w-10 h-10 text-gray-400 group-hover/asset:text-gold transition-colors" />
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-[9px] font-black uppercase text-gray-400 group-hover/asset:text-gold transition-colors italic tracking-widest">Pilih Gambar Utama</span>
                                                    </div>
                                                </div>
                                            )}
                                            <input type="file" 
                                                onChange={e => {
                                                    const file = e.target.files[0];
                                                    setData('image', file);
                                                    if (file) setImagePreview(URL.createObjectURL(file));
                                                }} 
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>

                                    {/* Gallery Section */}
                                    <div className="space-y-2.5">
                                        <label className="flex items-center space-x-2 text-[9px] font-black uppercase text-gray-500 tracking-widest">
                                            <SquaresPlusIcon className="w-3.5 h-3.5" /><span>Sub Gambar / Galeri Detail</span>
                                        </label>
                                        
                                        <div className="grid grid-cols-4 gap-2">
                                            {galleryPreviews.map((p, index) => (
                                                <div key={index} className="aspect-square rounded-xl overflow-hidden border border-gray-100 relative group shadow-sm bg-gray-50">
                                                    <img src={p.url} className="w-full h-full object-cover" alt="" />
                                                    <button 
                                                        type="button"
                                                        onClick={() => removeGalleryItem(index)}
                                                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <XMarkIcon className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                            <label className="aspect-square rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-gold hover:bg-gold/5 transition-all group">
                                                <PlusIcon className="w-5 h-5 text-gray-400 group-hover:text-gold" />
                                                <input type="file" multiple onChange={handleAddGalleryFile} className="hidden" accept="image/*" />
                                            </label>
                                        </div>
                                        <p className="text-[7px] text-gray-400 italic">Tambahkan hingga 8 gambar pendukung untuk galeri produk.</p>
                                    </div>
                                </div>

                                {/* Right Column: Product Information */}
                                <div className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="flex items-center space-x-2 text-[9px] font-black uppercase text-gray-500 tracking-widest">
                                            <ArchiveBoxIcon className="w-3.5 h-3.5" /><span>Identitas Produk</span>
                                        </label>
                                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}
                                            className="w-full border-gray-100 bg-gray-50 rounded-xl text-[10px] font-black p-3.5 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400 uppercase tracking-wider shadow-inner"
                                            placeholder="Nama produk..." required />
                                        {errors.name && <div className="text-red-500 text-[8px] italic mt-0.5">{errors.name}</div>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="flex items-center space-x-2 text-[9px] font-black uppercase text-gray-500 tracking-widest">
                                            <TagIcon className="w-3.5 h-3.5" /><span>Klasifikasi Kategori</span>
                                        </label>
                                        <select value={data.category} onChange={e => setData('category', e.target.value)}
                                            className="w-full border-gray-100 bg-gray-50 rounded-xl text-[10px] font-black p-3.5 focus:ring-gold focus:border-gold transition-all text-gray-800 shadow-inner uppercase tracking-wider">
                                            {categories.map((cat) => (
                                                <option key={cat.id} className="bg-white text-gray-800" value={cat.name}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="flex items-center space-x-2 text-[9px] font-black uppercase text-gray-500 tracking-widest">
                                            <PencilSquareIcon className="w-3.5 h-3.5" /><span>Deskripsi Detail</span>
                                        </label>
                                        <textarea rows="8" value={data.description} onChange={e => setData('description', e.target.value)}
                                            className="w-full border-gray-100 bg-gray-50 rounded-xl text-[10px] font-black p-3.5 focus:ring-gold focus:border-gold transition-all text-gray-800 placeholder-gray-400 resize-none shadow-inner leading-relaxed"
                                            placeholder="Gambarkan keunikan produk ini secara mendalam..."></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 flex justify-end items-center space-x-4">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 text-gray-400 font-black uppercase text-[9px] tracking-widest hover:text-gray-800 transition-colors">Batal</button>
                                <button type="submit" disabled={processing} className={`px-10 py-3.5 rounded-xl font-black uppercase text-[9px] tracking-widest shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center space-x-2 ${editingProduct ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-gold text-white hover:bg-gold-muda'}`}>
                                    {editingProduct ? (
                                        <><span>Simpan Perubahan</span><CheckIcon className="w-3.5 h-3.5" /></>
                                    ) : (
                                        <><span>Daftarkan Produk</span><PlusIcon className="w-3.5 h-3.5" /></>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
