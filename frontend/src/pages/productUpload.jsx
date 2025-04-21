import { useState } from 'react';
import { Save, Plus, X, ImagePlus, Tag, DollarSign, ShoppingBag, Bookmark, Truck, Star, Info, Box } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductUploadForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  
  // For array fields
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [specifications, setSpecifications] = useState([{ key: '', value: '' }]);
  
  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    colors: [],
    sizes: [],
    rating: 0,
    reviews: 0,
    stock: '',
    description: '',
    features: []
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value
    });
  };
  
  const handleAddColor = () => {
    if (newColor.trim() !== '') {
      setProductForm({
        ...productForm,
        colors: [...productForm.colors, newColor.trim()]
      });
      setNewColor('');
    }
  };
  
  const handleRemoveColor = (index) => {
    const updatedColors = [...productForm.colors];
    updatedColors.splice(index, 1);
    setProductForm({
      ...productForm,
      colors: updatedColors
    });
  };
  
  const handleAddSize = () => {
    if (newSize.trim() !== '') {
      setProductForm({
        ...productForm,
        sizes: [...productForm.sizes, newSize.trim()]
      });
      setNewSize('');
    }
  };
  
  const handleRemoveSize = (index) => {
    const updatedSizes = [...productForm.sizes];
    updatedSizes.splice(index, 1);
    setProductForm({
      ...productForm,
      sizes: updatedSizes
    });
  };
  
  const handleAddFeature = () => {
    if (newFeature.trim() !== '') {
      setProductForm({
        ...productForm,
        features: [...productForm.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };
  
  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...productForm.features];
    updatedFeatures.splice(index, 1);
    setProductForm({
      ...productForm,
      features: updatedFeatures
    });
  };
  
  const handleAddSpecification = () => {
    setSpecifications([...specifications, { key: '', value: '' }]);
  };
  
  const handleRemoveSpecification = (index) => {
    const updatedSpecs = [...specifications];
    updatedSpecs.splice(index, 1);
    setSpecifications(updatedSpecs);
  };
  
  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index][field] = value;
    setSpecifications(updatedSpecs);
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);
    
    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreview([...imagePreview, ...newPreviews]);
  };
  
  const handleRemoveImage = (index) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreview];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedPreviews[index]);
    
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setImageFiles(updatedFiles);
    setImagePreview(updatedPreviews);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validation
      if (!productForm.name || !productForm.price || !productForm.category || 
          !productForm.brand || !productForm.stock || !productForm.description || 
          imageFiles.length === 0) {
        throw new Error('Please fill in all required fields and upload at least one image');
      }
      
      // Create FormData object
      const formData = new FormData();
      
      // Add regular fields
      Object.keys(productForm).forEach(key => {
        if (key !== 'colors' && key !== 'sizes' && key !== 'features') {
          formData.append(key, productForm[key]);
        }
      });
      
      // Add array fields
      productForm.colors.forEach((color, index) => {
        formData.append(`colors[${index}]`, color);
      });
      
      productForm.sizes.forEach((size, index) => {
        formData.append(`sizes[${index}]`, size);
      });
      
      productForm.features.forEach((feature, index) => {
        formData.append(`features[${index}]`, feature);
      });
      
      // Add specifications as a map
      specifications.forEach(spec => {
        if (spec.key && spec.value) {
          formData.append(`specifications[${spec.key}]`, spec.value);
        }
      });
      
      // Add image files
      imageFiles.forEach((file, index) => {
        formData.append('images', file);
      });
      
      // Send data to API
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/product/addProduct`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data.success) {
        toast.success('Product added successfully');
        
        // Reset form after successful submission
        setProductForm({
          name: '',
          price: '',
          category: '',
          brand: '',
          colors: [],
          sizes: [],
          rating: 0,
          reviews: 0,
          stock: '',
          description: '',
          features: []
        });
        setSpecifications([{ key: '', value: '' }]);
        setImageFiles([]);
        setImagePreview([]);
      } else {
        throw new Error(response.data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error(error);
      setError(error.message || 'Error adding product. Please try again.');
      toast.error(error.message || 'Error adding product');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 flex items-center">
              <ShoppingBag className="mr-2" /> Add New Product
            </h1>
            
            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 text-red-400 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  {/* Basic Information */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Info className="mr-2" /> Basic Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Product Name*</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={productForm.name}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded pl-10 pr-3 py-2 text-white focus:outline-none focus:border-rose-500"
                            placeholder="Product Name"
                            required
                          />
                          <Tag size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Price ($)*</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="price"
                            value={productForm.price}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded pl-10 pr-3 py-2 text-white focus:outline-none focus:border-rose-500"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            required
                          />
                          <DollarSign size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Category*</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="category"
                            value={productForm.category}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded pl-10 pr-3 py-2 text-white focus:outline-none focus:border-rose-500"
                            placeholder="Category"
                            required
                          />
                          <Bookmark size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Brand*</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="brand"
                            value={productForm.brand}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded pl-10 pr-3 py-2 text-white focus:outline-none focus:border-rose-500"
                            placeholder="Brand"
                            required
                          />
                          <ShoppingBag size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Stock*</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="stock"
                            value={productForm.stock}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded pl-10 pr-3 py-2 text-white focus:outline-none focus:border-rose-500"
                            placeholder="0"
                            min="0"
                            required
                          />
                          <Box size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Initial Rating (0-5)</label>
                        <div className="relative">
                          <input
                            type="number"
                            name="rating"
                            value={productForm.rating}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded pl-10 pr-3 py-2 text-white focus:outline-none focus:border-rose-500"
                            placeholder="0"
                            min="0"
                            max="5"
                            step="0.1"
                          />
                          <Star size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-1">Description*</label>
                    <textarea
                      name="description"
                      value={productForm.description}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                      placeholder="Product description..."
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  
                  {/* Colors */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Colors</h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {productForm.colors.map((color, index) => (
                        <div 
                          key={index} 
                          className="bg-gray-800 px-3 py-1 rounded-full flex items-center"
                        >
                          <span className="mr-2">{color}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveColor(index)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="flex-grow bg-gray-800 border border-gray-700 rounded-l px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                        placeholder="Add a color..."
                      />
                      <button
                        type="button"
                        onClick={handleAddColor}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-r flex items-center"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Sizes */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Sizes</h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {productForm.sizes.map((size, index) => (
                        <div 
                          key={index} 
                          className="bg-gray-800 px-3 py-1 rounded-full flex items-center"
                        >
                          <span className="mr-2">{size}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveSize(index)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={newSize}
                        onChange={(e) => setNewSize(e.target.value)}
                        className="flex-grow bg-gray-800 border border-gray-700 rounded-l px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                        placeholder="Add a size..."
                      />
                      <button
                        type="button"
                        onClick={handleAddSize}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-r flex items-center"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Product Features</h2>
                    <div className="mb-2">
                      {productForm.features.map((feature, index) => (
                        <div 
                          key={index} 
                          className="bg-gray-800 px-3 py-2 rounded mb-2 flex items-center justify-between"
                        >
                          <span>{feature}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveFeature(index)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        className="flex-grow bg-gray-800 border border-gray-700 rounded-l px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                        placeholder="Add a feature..."
                      />
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-r flex items-center"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Specifications */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Product Specifications</h2>
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex gap-4 mb-2">
                        <input
                          type="text"
                          value={spec.key}
                          onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                          className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                          placeholder="Key (e.g. Material)"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                          className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                          placeholder="Value (e.g. Cotton)"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecification(index)}
                          className="bg-gray-700 hover:bg-red-500 text-white px-3 py-2 rounded flex items-center"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddSpecification}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center mt-2"
                    >
                      <Plus size={18} className="mr-2" /> Add Specification
                    </button>
                  </div>
                  
                  {/* Images */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Product Images*</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                      {imagePreview.map((src, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={src} 
                            alt={`Preview ${index}`} 
                            className="w-full h-32 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <label className="flex flex-col items-center justify-center w-full h-32 bg-gray-800 border-2 border-dashed border-gray-600 rounded cursor-pointer hover:border-rose-500">
                        <div className="flex flex-col items-center justify-center">
                          <ImagePlus size={24} className="text-gray-400" />
                          <span className="text-sm text-gray-400 mt-2">Add Image</span>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      Upload multiple product images. First image will be used as the main product image.
                    </p>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded font-medium flex items-center justify-center"
                  >
                    {loading ? (
                      <span>Adding Product...</span>
                    ) : (
                      <>
                        <Save size={18} className="mr-2" />
                        Add Product
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-sm">
            &copy; 2025 HouseBaj Sports. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductUploadForm;