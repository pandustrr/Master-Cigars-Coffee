import SidebarAdmin from '@/Layouts/SidebarAdmin';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    ArchiveBoxIcon,
    PhotoIcon,
    TagIcon
} from '@heroicons/react/24/outline';

export default function Index({ mainProducts, categories }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const { data: catData, setData: setCatData, post: postCat, delete: destroyCat, processing: processingCat, reset: resetCat } = useForm({
        name: '',
    });

    const { data, setData, post, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        category: categories.length > 0 ? categories[0].name : '',
        description: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            post(route('admin.main-products.update', editingProduct.id), {
                onSuccess: () => {
                    reset();
                    setEditingProduct(null);
                    setIsAddModalOpen(false);
                },
            });
        } else {
            post(route('admin.main-products.store'), {
                onSuccess: () => {
                    reset();
                    setIsAddModalOpen(false);
                },
            });
        }
    };

    const submitCategory = (e) => {
        e.preventDefault();
        postCat(route('admin.categories.store'), {
            onSuccess: () => {
                resetCat();
            },
        });
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setData({
            name: product.name,
            category: product.category || (categories.length > 0 ? categories[0].name : ''),
            description: product.description || '',
            image: null,
        });
        setIsAddModalOpen(true);
    };

    const handleDelete = (id) => {
        if (confirm('Hapus item ini?')) {
            destroy(route('admin.main-products.destroy', id), {
                preserveScroll: true
            });
        }
    };

    const handleDeleteCategory = (id) => {
        if (confirm('Hapus kategori ini? Semua produk dengan kategori ini mungkin perlu diupdate.')) {
            destroyCat(route('admin.categories.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <SidebarAdmin
            header={<h2 className="font-black text-2xl text-gold leading-tight tracking-tighter uppercase italic">Kelola Brand Utama</h2>}
        >
            <Head title="Admin - Manage Product" />

            <div className="py-8 bg-hitam-pekat min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    {/* Header Section */}
                    <div className="bg-gradient-to-br from-coklat-kopi/40 via-hitam-pekat/80 to-hitam-pekat p-12 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] text-gold flex flex-col md:flex-row justify-between items-center gap-10 overflow-hidden relative border border-gold/10 group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 rounded-full blur-[100px] group-hover:bg-gold/10 transition-all duration-1000"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black tracking-tighter mb-4 italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-cream-gold to-gold">Brand Identity Nexus</h3>
                            <p className="text-cream-gold/40 text-[10px] font-black uppercase tracking-[0.4em] max-w-xl leading-relaxed">
                                Curate the master brand architecture. Define global offering categories and visual identities for the collection.
                            </p>
                        </div>
                        <div className="flex items-center space-x-6 relative z-10">
                            <button
                                onClick={() => setIsCategoryModalOpen(true)}
                                className="bg-hitam-pekat/40 border border-gold/30 text-gold px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold/10 hover:border-gold transition-all flex items-center space-x-3 active:scale-95 shadow-2xl backdrop-blur-xl"
                            >
                                <TagIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                <span>Kategori</span>
                            </button>
                            <button
                                onClick={() => { reset(); setEditingProduct(null); setIsAddModalOpen(true); }}
                                className="bg-gold text-hitam-pekat px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold-muda transition-all shadow-[0_20px_40px_rgba(175,146,109,0.3)] flex items-center space-x-3 active:scale-90 hover:-translate-y-1"
                            >
                                <PlusIcon className="w-5 h-5" />
                                <span>Provision Brand</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Products Table */}
                    <div className="bg-coklat-kopi/5 shadow-[0_50px_100px_rgba(0,0,0,0.3)] rounded-[3rem] border border-gold/10 overflow-hidden backdrop-blur-3xl">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gold/10">
                                <thead>
                                    <tr className="bg-gold/5">
                                        <th className="px-10 py-7 text-left text-[11px] font-black text-gold uppercase tracking-[0.3em] italic">Brand Signature</th>
                                        <th className="px-10 py-7 text-left text-[11px] font-black text-gold uppercase tracking-[0.3em] italic">Classification</th>
                                        <th className="px-10 py-7 text-left text-[11px] font-black text-gold uppercase tracking-[0.3em] italic">Architectural Intel</th>
                                        <th className="px-10 py-7 text-right text-[11px] font-black text-gold uppercase tracking-[0.3em] italic">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gold/5 bg-hitam-pekat/20">
                                    {mainProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gold/5 transition-all duration-500 group">
                                            <td className="px-10 py-8 flex items-center space-x-8 text-nowrap">
                                                <div className="w-24 h-24 rounded-[2.5rem] bg-hitam-pekat overflow-hidden border border-gold/10 shadow-2xl shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 relative group/img">
                                                    <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover/img:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                                                    {product.image ? (
                                                        <img src={`/storage/${product.image}`} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" alt="" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gold/10 font-black italic text-xl">MB</div>
                                                    )}
                                                </div>
                                                <div className="text-lg font-black text-cream-gold group-hover:text-gold transition-all tracking-tighter uppercase italic">{product.name}</div>
                                            </td>
                                            <td className="px-10 py-8 text-nowrap">
                                                <span className="px-5 py-2 bg-gold/5 text-gold text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl border border-gold/20 shadow-inner">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="text-[11px] text-cream-gold/30 font-black uppercase tracking-widest max-w-sm line-clamp-2 whitespace-pre-wrap italic leading-relaxed group-hover:text-cream-gold/60 transition-colors uppercase">{product.description}</div>
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <div className="flex justify-end space-x-4">
                                                    <button onClick={() => handleEdit(product)} className="p-4 text-gold/30 hover:text-gold hover:bg-gold/10 rounded-2xl transition-all hover:scale-110 active:scale-90 border border-transparent hover:border-gold/20 shadow-2xl">
                                                        <PencilSquareIcon className="w-6 h-6" />
                                                    </button>
                                                    <button onClick={() => handleDelete(product.id)} className="p-4 text-gold/30 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all hover:scale-110 active:scale-90 border border-transparent hover:border-red-500/20 shadow-2xl">
                                                        <TrashIcon className="w-6 h-6" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Management Modal */}
            {isCategoryModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-hitam-pekat/95 backdrop-blur-3xl animate-fade-in">
                    <div className="bg-gradient-to-br from-coklat-kopi/40 via-hitam-pekat to-hitam-pekat rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] w-full max-w-2xl overflow-hidden border border-gold/20 relative group/modal">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/10 rounded-full blur-[100px] group-hover/modal:bg-gold/20 transition-all duration-1000"></div>
                        <div className="px-10 py-8 border-b border-gold/10 flex justify-between items-center bg-gold/5 relative z-10">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.4em] text-gold text-sm italic">Categorical Codex</h4>
                                <p className="text-[10px] text-cream-gold/20 font-black uppercase tracking-[0.3em] mt-2 italic leading-none">Global Classification Management</p>
                            </div>
                            <button onClick={() => setIsCategoryModalOpen(false)} className="w-12 h-12 rounded-2xl border border-gold/10 flex items-center justify-center text-gold/40 hover:text-gold hover:bg-gold/10 transition-all hover:rotate-90 duration-500 font-black text-2xl">&times;</button>
                        </div>
                        <div className="p-10 space-y-8 bg-coklat-kopi/5 relative z-10">
                            {/* Add New Category */}
                            <form onSubmit={submitCategory} className="flex gap-6">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={catData.name}
                                        onChange={e => setCatData('name', e.target.value)}
                                        className="w-full border-gold/10 rounded-2xl text-sm font-black p-5 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all bg-hitam-pekat/80 text-cream-gold placeholder-cream-gold/10 shadow-inner"
                                        placeholder="Enter new classification..."
                                        required
                                    />
                                </div>
                                <button type="submit" disabled={processingCat} className="bg-gold text-hitam-pekat px-10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold-muda transition-all shadow-xl active:scale-95">Verify & Deploy</button>
                            </form>

                            {/* Categories List */}
                            <div className="bg-hitam-pekat/60 rounded-[2rem] p-6 max-h-[400px] overflow-y-auto border border-gold/10 shadow-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {categories.map((cat) => (
                                        <div key={cat.id} className="bg-hitam-pekat/80 p-5 rounded-2xl border border-gold/5 flex justify-between items-center shadow-lg hover:border-gold/40 hover:bg-hitam-pekat transition-all group/cat">
                                            <div className="flex items-center space-x-3">
                                                <TagIcon className="w-4 h-4 text-gold/40 group-hover/cat:text-gold transition-colors" />
                                                <span className="text-xs font-black text-cream-gold uppercase tracking-wider">{cat.name}</span>
                                            </div>
                                            <button onClick={() => handleDeleteCategory(cat.id)} className="text-gold/20 hover:text-red-500 transition-all hover:scale-125">
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-hitam-pekat/95 backdrop-blur-3xl animate-fade-in">
                    <div className="bg-gradient-to-br from-coklat-kopi/40 via-hitam-pekat to-hitam-pekat rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] w-full max-w-2xl overflow-hidden border border-gold/20 relative group/modal">
                        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/10 rounded-full blur-[100px] group-hover/modal:bg-gold/20 transition-all duration-1000"></div>
                        <div className="px-10 py-8 border-b border-gold/10 flex justify-between items-center bg-gold/5 relative z-10">
                            <div>
                                <h4 className="font-black uppercase tracking-[0.4em] text-gold text-sm italic">{editingProduct ? 'Update Brand Authentication' : 'Establish Brand Presence'}</h4>
                                <p className="text-[10px] text-cream-gold/20 font-black uppercase tracking-[0.3em] mt-2 italic leading-none">Full Visual Identity Specification</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="w-12 h-12 rounded-2xl border border-gold/10 flex items-center justify-center text-gold/40 hover:text-gold hover:bg-gold/10 transition-all hover:rotate-90 duration-500 font-black text-2xl relative z-10">&times;</button>
                        </div>
                        <form onSubmit={submit} className="p-10 space-y-8 bg-coklat-kopi/5 relative z-10">
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gold/40 tracking-[0.3em] italic">
                                    <ArchiveBoxIcon className="w-4 h-4" />
                                    <span>Brand Signature Designation</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border-gold/10 bg-hitam-pekat/80 rounded-2xl text-sm font-black p-5 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-cream-gold placeholder-cream-gold/10 shadow-inner"
                                    placeholder="Enter premium brand identifier..."
                                    required
                                />
                                {errors.name && <div className="text-red-500 text-[10px] font-black uppercase mt-2 tracking-[0.2em] italic bg-red-500/10 px-4 py-2 rounded-lg inline-block border border-red-500/20">{errors.name}</div>}
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gold/40 tracking-[0.3em] italic">
                                    <PlusIcon className="w-4 h-4" />
                                    <span>Hierarchical Classification</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="w-full border-gold/10 bg-hitam-pekat/80 rounded-[1.5rem] text-sm font-black p-5 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-cream-gold shadow-inner appearance-none cursor-pointer"
                                    style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #af926d 50%), linear-gradient(135deg, #af926d 50%, transparent 50%)', backgroundPosition: 'calc(100% - 25px) calc(1.5em + 5px), calc(100% - 20px) calc(1.5em + 5px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} className="bg-hitam-pekat text-cream-gold p-4" value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gold/40 tracking-[0.3em] italic">
                                    <PhotoIcon className="w-4 h-4" />
                                    <span>Visual Asset (Cover / Logo)</span>
                                </label>
                                <div className="relative group/asset p-8 border border-dashed border-gold/20 rounded-2xl flex flex-col items-center justify-center bg-hitam-pekat/80 hover:bg-gold/5 transition-all cursor-pointer shadow-inner">
                                    <input type="file" onChange={e => setData('image', e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <div className="w-16 h-16 bg-gold/5 rounded-2xl flex items-center justify-center text-gold/20 group-hover/asset:text-gold group-hover/asset:scale-110 transition-all border border-gold/10 mb-4">
                                        <CloudArrowUpIcon className="w-8 h-8" />
                                    </div>
                                    <span className="text-[11px] font-black uppercase text-gold/20 tracking-[0.4em] group-hover/asset:text-gold transition-colors">Authorize Visual Payload</span>
                                    <p className="text-[9px] text-cream-gold/10 uppercase tracking-widest mt-2">Optimal 1:1 or High-Res Ratio</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 text-[10px] font-black uppercase text-gold/40 tracking-[0.3em] italic">
                                    <PencilSquareIcon className="w-4 h-4" />
                                    <span>Narrative & Specification</span>
                                </label>
                                <textarea
                                    rows="4"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full border-gold/10 bg-hitam-pekat/80 rounded-2xl text-sm font-black p-6 focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all text-cream-gold placeholder-cream-gold/10 shadow-inner resize-none leading-relaxed"
                                    placeholder="Establish the heritage and specifications of this brand..."
                                ></textarea>
                            </div>

                            <div className="pt-8 flex justify-end space-x-8">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-8 py-4 text-gold/30 font-black uppercase text-[10px] tracking-[0.4em] hover:text-gold transition-all hover:scale-105 active:scale-90">Abort</button>
                                <button type="submit" disabled={processing} className="px-12 py-5 bg-gold text-hitam-pekat rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-[0_20px_40px_rgba(175,146,109,0.3)] hover:bg-gold-muda hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(175,146,109,0.4)] active:scale-90 transition-all">Synchronize Presence</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SidebarAdmin>
    );
}
