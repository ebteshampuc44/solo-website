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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Dashboard Header */}
      <div className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-300">Manage orders and products</p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="btn btn-outline btn-sm text-white border-gray-600 hover:bg-gray-700 hover:text-white hover:border-gray-700">
                Back to Store
              </Link>
              {/* <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full bg-gray-700 text-white flex items-center justify-center">
                    <span className="font-bold">A</span>
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 text-white border border-gray-700">
                  <li><a className="text-white hover:bg-gray-700">Profile</a></li>
                  <li><a className="text-white hover:bg-gray-700">Settings</a></li>
                  <li><a className="text-white hover:bg-gray-700">Logout</a></li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gray-800 shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="bg-blue-900/30 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">${stats.totalRevenue.toFixed(2)}</h3>
                  <p className="text-gray-300">Total Revenue</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-gray-800 shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="bg-green-900/30 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{stats.totalOrders}</h3>
                  <p className="text-gray-300">Total Orders</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-gray-800 shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-900/30 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{stats.pendingOrders}</h3>
                  <p className="text-gray-300">Pending Orders</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-gray-800 shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="bg-purple-900/30 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{stats.totalProducts}</h3>
                  <p className="text-gray-300">Total Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="tabs tabs-boxed bg-gray-800 p-1 rounded-lg mb-8 border border-gray-700">
          <button 
            className={`tab tab-lg ${activeTab === 'orders' ? 'tab-active bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button 
            className={`tab tab-lg ${activeTab === 'products' ? 'tab-active bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button 
            className={`tab tab-lg ${activeTab === 'addProduct' ? 'tab-active bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            onClick={() => setActiveTab('addProduct')}
          >
            Add Product
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-white">Order Management</h2>
              <div className="flex gap-2">
                <select 
                  className="select select-bordered w-full md:w-auto bg-gray-700 text-white border-gray-600"
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
                  <tr className="text-white">
                    <th className="text-white bg-gray-700">Order ID</th>
                    <th className="text-white bg-gray-700">Customer</th>
                    <th className="text-white bg-gray-700">Date</th>
                    <th className="text-white bg-gray-700">Amount</th>
                    <th className="text-white bg-gray-700">Status</th>
                    <th className="text-white bg-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8">
                        <div className="text-6xl mb-4 text-gray-600">📦</div>
                        <h3 className="text-xl font-medium text-white mb-2">No orders found</h3>
                        <p className="text-gray-400">No orders have been placed yet.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-700/50 text-white border-b border-gray-700">
                        <td>
                          <div className="font-bold text-white">{order.id}</div>
                          <div className="text-sm text-gray-400">{order.items?.length || 0} items</div>
                        </td>
                        <td>
                          <div className="font-medium text-white">{order.customerName}</div>
                          <div className="text-sm text-gray-400">{order.customerEmail}</div>
                        </td>
                        <td className="text-white">{order.date}</td>
                        <td className="font-bold text-green-400">${order.total?.toFixed(2) || '0.00'}</td>
                        <td>{getStatusBadge(order.status)}</td>
                        <td>
                          <div className="flex gap-2">
                            <button 
                              className="btn btn-sm bg-gray-700 text-white border-gray-600 hover:bg-gray-600 hover:border-gray-500"
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
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-white">Product Management</h2>
              <div className="flex gap-2">
                <select 
                  className="select select-bordered w-full md:w-auto bg-gray-700 text-white border-gray-600"
                  value={productFilter}
                  onChange={(e) => setProductFilter(e.target.value)}
                >
                  <option value="all">All Products</option>
                  <option value="active">Active</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
                <button 
                  className="btn bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
                  onClick={() => setActiveTab('addProduct')}
                >
                  Add New Product
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-white">
                    <th className="text-white bg-gray-700">Product</th>
                    <th className="text-white bg-gray-700">Name</th>
                    <th className="text-white bg-gray-700">Category</th>
                    <th className="text-white bg-gray-700">Price</th>
                    <th className="text-white bg-gray-700">Stock</th>
                    <th className="text-white bg-gray-700">Status</th>
                    <th className="text-white bg-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8">
                        <div className="text-6xl mb-4 text-gray-600">🛍️</div>
                        <h3 className="text-xl font-medium text-white mb-2">No products found</h3>
                        <p className="text-gray-400">Add your first product using the "Add Product" tab.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-700/50 text-white border-b border-gray-700">
                        <td>
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-lg bg-gray-700">
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-bold text-white">{product.name}</div>
                          <div className="text-sm text-gray-400">ID: {product.id}</div>
                        </td>
                        <td>
                          <span className="badge badge-outline text-gray-300 border-gray-600 bg-gray-700">{product.category}</span>
                        </td>
                        <td className="font-bold text-green-400">${product.price?.toFixed(2) || '0.00'}</td>
                        <td>
                          <span className={product.stock > 10 ? "text-green-400" : product.stock > 0 ? "text-yellow-400" : "text-red-400"}>
                            {product.stock || 0} units
                          </span>
                        </td>
                        <td>{getStatusBadge(product.status)}</td>
                        <td>
                          <div className="flex gap-2">
                            <button 
                              className="btn btn-sm bg-gray-700 text-white border-gray-600 hover:bg-gray-600 hover:border-gray-500"
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
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Product</h2>
            
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-white">Product Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="input input-bordered w-full bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-white">Price ($) *</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="input input-bordered w-full bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-white">Category *</span>
                  </label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className="select select-bordered w-full bg-gray-700 text-white border-gray-600"
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
                    <span className="label-text font-medium text-white">Stock Quantity *</span>
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    className="input input-bordered w-full bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    placeholder="Enter quantity"
                    min="0"
                    required
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium text-white">Image URL (Optional)</span>
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={newProduct.image}
                    onChange={handleInputChange}
                    className="input input-bordered w-full bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium text-white">Description (Optional)</span>
                  </label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full h-32 bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    placeholder="Enter product description..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
                <button
                  type="button"
                  className="btn btn-outline text-white border-gray-600 hover:bg-gray-700 hover:text-white hover:border-gray-500"
                  onClick={() => setActiveTab('products')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
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
      <div className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p>© {new Date().getFullYear()} MiniMart Admin Dashboard</p>
            <p className="text-sm mt-2">For administrative use only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;