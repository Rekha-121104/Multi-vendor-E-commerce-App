import { useState } from 'react';
import api from '../services/api';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
    setMessage(null);
  };

  const handleUploadImages = async () => {
    if (!selectedFiles.length) {
      setMessage('Please choose image files first.');
      return;
    }
    setUploading(true);
    setMessage(null);
    try {
      const uploaded = [];
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        uploaded.push(data.url);
      }
      setUploadedImages((prev) => [...prev, ...uploaded]);
      setSelectedFiles([]);
      setImageInput('');
      setMessage('Images uploaded successfully.');
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const manualImages = imageInput.split(',').map((item) => item.trim()).filter(Boolean);
      const images = uploadedImages.length > 0 ? uploadedImages : manualImages;
      await api.post('/products', {
        title,
        description,
        price: Number(price),
        category,
        stock: Number(stock),
        images,
      });
      setMessage('Product created successfully');
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      setStock('');
      setImageInput('');
      setUploadedImages([]);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">Add Product</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Category</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Image URLs (optional)</label>
            <input value={imageInput} onChange={(e) => setImageInput(e.target.value)} placeholder="Comma separated URLs" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:ring-2 focus:ring-slate-200" />
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 p-5">
          <p className="mb-3 text-sm font-medium text-slate-700">Upload image files</p>
          <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full text-slate-700" />
          <button type="button" onClick={handleUploadImages} disabled={uploading || !selectedFiles.length} className="mt-4 rounded-2xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400">
            {uploading ? 'Uploading...' : 'Upload Selected Images'}
          </button>
          {selectedFiles.length > 0 && <p className="mt-3 text-sm text-slate-600">Selected: {selectedFiles.length} file(s)</p>}
          {uploadedImages.length > 0 && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {uploadedImages.map((url, index) => (
                <img key={index} src={url} alt={`Uploaded ${index + 1}`} className="h-32 w-full rounded-3xl object-cover" />
              ))}
            </div>
          )}
        </div>
        {message && <p className="rounded-xl bg-slate-100 p-3 text-slate-700">{message}</p>}
        <button disabled={loading} className="rounded-2xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-700">
          {loading ? 'Saving...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
