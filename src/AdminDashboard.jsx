import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // অর্ডার ডেটা স্টেট - এখন ফাঁকা
  const [orders, setOrders] = useState([]);

  // প্রোডাক্ট ডেটা স্টেট - এখন ফাঁকা
  const [products, setProducts] = useState([]);

  // নতুন প্রোডাক্ট ফর্ম স্টেট
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Electronics',
    stock: '',
    image: '',
    description: ''
  });

  // স্ট্যাটিসটিকস
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    totalProducts: 0
  });

  // অ্যাক্টিভ ট্যাব
  const [activeTab, setActiveTab] = useState('orders');

  // ফিল্টার স্টেট
  const [orderFilter, setOrderFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');

  // ইনিশিয়াল স্ট্যাটিসটিকস ক্যালকুলেট
  useEffect(() => {
    calculateStats();
  }, [orders, products]);

  const calculateStats = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const totalProducts = products.length;

    setStats({
      totalOrders,
      totalRevenue,
      pendingOrders,
      totalProducts
    });
  };

  // অর্ডার স্ট্যাটাস আপডেট
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };

  // অর্ডার ডিলিট
  const deleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Order deleted successfully');
    }
  };

  // প্রোডাক্ট স্ট্যাটাস আপডেট
  const updateProductStatus = (productId, newStatus) => {
    setProducts(products.map(product =>
      product.id === productId ? { ...product, status: newStatus } : product
    ));
    alert('Product status updated');
  };

  // প্রোডাক্ট ডিলিট
  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
      alert('Product deleted successfully');
    }
  };

  // নতুন প্রোডাক্ট ফর্ম হ্যান্ডলার
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  // নতুন প্রোডাক্ট অ্যাড
  const handleAddProduct = (e) => {
    e.preventDefault();
    
    // Validation
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert('Please fill in all required fields');
      return;
    }

    const newProductObj = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      status: newProduct.stock > 0 ? 'active' : 'out_of_stock',
      image: newProduct.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: newProduct.description
    };

    setProducts([...products, newProductObj]);
    
    // Reset form
    setNewProduct({
      name: '',
      price: '',
      category: 'Electronics',
      stock: '',
      image: '',
      description: ''
    });

    alert('New product added successfully!');
    setActiveTab('products');
  };

  // ফিল্টার্ড অর্ডারস
  const filteredOrders = orderFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === orderFilter);

  // ফিল্টার্ড প্রোডাক্টস
  const filteredProducts = productFilter === 'all'
    ? products
    : products.filter(product => product.status === productFilter);

  // স্ট্যাটাস ব্যাজ
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'badge-warning', text: 'Pending' },
      processing: { color: 'badge-info', text: 'Processing' },
      shipped: { color: 'badge-primary', text: 'Shipped' },
      delivered: { color: 'badge-success', text: 'Delivered' },
      cancelled: { color: 'badge-error', text: 'Cancelled' },
      active: { color: 'badge-success', text: 'Active' },
      out_of_stock: { color: 'badge-error', text: 'Out of Stock' },
      inactive: { color: 'badge-warning', text: 'Inactive' }
    };
    
    const config = statusConfig[status] || { color: 'badge-ghost', text: status };
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Dashboard Header */}
      <div className="bg-gray-50 shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Manage orders and products</p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="btn btn-outline btn-sm text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400">
                Back to Store
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-white shadow-lg border border-gray-200">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">${stats.totalRevenue.toFixed(2)}</h3>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg border border-gray-200">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalOrders}</h3>
                  <p className="text-gray-600">Total Orders</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg border border-gray-200">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.pendingOrders}</h3>
                  <p className="text-gray-600">Pending Orders</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg border border-gray-200">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalProducts}</h3>
                  <p className="text-gray-600">Total Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation - Improved Design */}
        <div className="flex border-b border-gray-200 mb-8">
          <button 
            className={`px-6 py-3 font-medium border-b-2 -mb-px transition-all duration-200 flex items-center gap-2 ${activeTab === 'orders' 
              ? 'text-blue-600 border-blue-600 bg-blue-50' 
              : 'text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50/50'}`}
            onClick={() => setActiveTab('orders')}
          >
            <span className="text-lg">📦</span>
            <span>Orders</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {orders.length}
            </span>
          </button>
          <button 
            className={`px-6 py-3 font-medium border-b-2 -mb-px transition-all duration-200 flex items-center gap-2 ${activeTab === 'products' 
              ? 'text-blue-600 border-blue-600 bg-blue-50' 
              : 'text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-300 hover:bg-blue-50/50'}`}
            onClick={() => setActiveTab('products')}
          >
            <span className="text-lg">🛍️</span>
            <span>Products</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {products.length}
            </span>
          </button>
          <button 
            className={`px-6 py-3 font-medium border-b-2 -mb-px transition-all duration-200 flex items-center gap-2 ${activeTab === 'addProduct' 
              ? 'text-green-600 border-green-600 bg-green-50' 
              : 'text-gray-600 border-transparent hover:text-green-500 hover:border-green-300 hover:bg-green-50/50'}`}
            onClick={() => setActiveTab('addProduct')}
          >
            <span className="text-lg">➕</span>
            <span>Add Product</span>
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
              <div className="flex gap-2">
                <select 
                  className="select select-bordered w-full md:w-auto bg-white text-gray-800 border-gray-300"
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-gray-800">
                    <th className="text-gray-800 bg-gray-100">Order ID</th>
                    <th className="text-gray-800 bg-gray-100">Customer</th>
                    <th className="text-gray-800 bg-gray-100">Date</th>
                    <th className="text-gray-800 bg-gray-100">Amount</th>
                    <th className="text-gray-800 bg-gray-100">Status</th>
                    <th className="text-gray-800 bg-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8">
                        <div className="text-6xl mb-4 text-gray-300">📦</div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">No orders found</h3>
                        <p className="text-gray-500">No orders have been placed yet.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 text-gray-800 border-b border-gray-200">
                        <td>
                          <div className="font-bold text-gray-800">#{order.id}</div>
                          <div className="text-sm text-gray-500">{order.items?.length || 0} items</div>
                        </td>
                        <td>
                          <div className="font-medium text-gray-800">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        </td>
                        <td className="text-gray-800">{order.date}</td>
                        <td className="font-bold text-green-600">${order.total?.toFixed(2) || '0.00'}</td>
                        <td>{getStatusBadge(order.status)}</td>
                        <td>
                          <div className="flex gap-2">
                            <button 
                              className="btn btn-sm bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                              onClick={() => {
                                const status = prompt('Change status to (pending/processing/shipped/delivered/cancelled):');
                                if (status) updateOrderStatus(order.id, status);
                              }}
                            >
                              Update
                            </button>
                            <button 
                              className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
                              onClick={() => {
                                alert(`Order Details:\nID: ${order.id}\nCustomer: ${order.customerName}\nEmail: ${order.customerEmail}\nTotal: $${order.total}\nStatus: ${order.status}\n\nItems:\n${order.items?.map(item => `- ${item.name} x${item.quantity}: $${item.price}`).join('\n') || 'No items'}`);
                              }}
                            >
                              View
                            </button>
                            <button 
                              className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                              onClick={() => deleteOrder(order.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
              <div className="flex gap-2">
                <select 
                  className="select select-bordered w-full md:w-auto bg-white text-gray-800 border-gray-300"
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                >
                  <option value="all">All Products</option>
                  <option value="active">Active</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
                <button 
                  className="btn bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                  onClick={() => setActiveTab('addProduct')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Add New Product
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-gray-800">
                    <th className="text-gray-800 bg-gray-100">Product</th>
                    <th className="text-gray-800 bg-gray-100">Name</th>
                    <th className="text-gray-800 bg-gray-100">Category</th>
                    <th className="text-gray-800 bg-gray-100">Price</th>
                    <th className="text-gray-800 bg-gray-100">Stock</th>
                    <th className="text-gray-800 bg-gray-100">Status</th>
                    <th className="text-gray-800 bg-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8">
                        <div className="text-6xl mb-4 text-gray-300">🛍️</div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">No products found</h3>
                        <p className="text-gray-500">Add your first product using the "Add Product" tab.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 text-gray-800 border-b border-gray-200">
                        <td>
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-lg bg-gray-100">
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-bold text-gray-800">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: {product.id}</div>
                        </td>
                        <td>
                          <span className="badge badge-outline text-gray-600 border-gray-300 bg-gray-50">{product.category}</span>
                        </td>
                        <td className="font-bold text-green-600">${product.price?.toFixed(2) || '0.00'}</td>
                        <td>
                          <span className={product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-yellow-600" : "text-red-600"}>
                            {product.stock || 0} units
                          </span>
                        </td>
                        <td>{getStatusBadge(product.status)}</td>
                        <td>
                          <div className="flex gap-2">
                            <button 
                              className="btn btn-sm bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                              onClick={() => {
                                const stock = prompt('Update stock quantity:');
                                if (stock !== null) {
                                  const newStock = parseInt(stock);
                                  if (!isNaN(newStock)) {
                                    setProducts(products.map(p => 
                                      p.id === product.id ? { 
                                        ...p, 
                                        stock: newStock,
                                        status: newStock > 0 ? 'active' : 'out_of_stock'
                                      } : p
                                    ));
                                  }
                                }
                              }}
                            >
                              Update Stock
                            </button>
                            <button 
                              className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                              onClick={() => deleteProduct(product.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'addProduct' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
            
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-800">Product Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="input input-bordered w-full bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-800">Price ($) *</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="input input-bordered w-full bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-800">Category *</span>
                  </label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className="select select-bordered w-full bg-white text-gray-800 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-800">Stock Quantity *</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    className="input input-bordered w-full bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter quantity"
                    min="0"
                    required
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium text-gray-800">Image URL (Optional)</span>
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={newProduct.image}
                    onChange={handleInputChange}
                    className="input input-bordered w-full bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium text-gray-800">Description (Optional)</span>
                  </label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full h-32 bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter product description..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="btn btn-outline text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400"
                  onClick={() => setActiveTab('products')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-green-600 text-white hover:bg-green-700 border-green-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Add Product
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p>© {new Date().getFullYear()} MiniMart Admin Dashboard</p>
            <p className="text-sm mt-2">For administrative use only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;