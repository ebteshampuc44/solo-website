import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Check if user is admin
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const user = isAuthenticated ? JSON.parse(localStorage.getItem('user') || '{}') : null;
    
    if (!isAuthenticated || user?.role !== 'admin') {
      alert('Access denied! Admin privileges required.');
      navigate('/login');
    }
  }, [navigate]);

  // Initial orders data for demo
  const initialOrders = [
    { 
      id: 1001, 
      customerName: 'John Smith', 
      customerEmail: 'john@example.com',
      date: '2024-01-15',
      total: 249.97,
      status: 'pending',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 99.99 },
        { name: 'Smart Watch', quantity: 1, price: 149.98 }
      ]
    },
    { 
      id: 1002, 
      customerName: 'Sarah Johnson', 
      customerEmail: 'sarah@example.com',
      date: '2024-01-14',
      total: 79.99,
      status: 'processing',
      items: [
        { name: 'Running Shoes', quantity: 1, price: 79.99 }
      ]
    },
    { 
      id: 1003, 
      customerName: 'Michael Brown', 
      customerEmail: 'michael@example.com',
      date: '2024-01-13',
      total: 179.97,
      status: 'shipped',
      items: [
        { name: 'Coffee Maker', quantity: 1, price: 49.99 },
        { name: 'Desk Lamp', quantity: 1, price: 34.99 },
        { name: 'Water Bottle', quantity: 2, price: 39.98 }
      ]
    },
    { 
      id: 1004, 
      customerName: 'Emily Davis', 
      customerEmail: 'emily@example.com',
      date: '2024-01-12',
      total: 199.99,
      status: 'delivered',
      items: [
        { name: 'Smart Watch', quantity: 1, price: 199.99 }
      ]
    },
    { 
      id: 1005, 
      customerName: 'Robert Wilson', 
      customerEmail: 'robert@example.com',
      date: '2024-01-11',
      total: 119.98,
      status: 'cancelled',
      items: [
        { name: 'Gaming Mouse', quantity: 2, price: 119.98 }
      ]
    },
    { 
      id: 1006, 
      customerName: 'Lisa Anderson', 
      customerEmail: 'lisa@example.com',
      date: '2024-01-10',
      total: 89.98,
      status: 'pending',
      items: [
        { name: 'Sunglasses', quantity: 1, price: 89.99 }
      ]
    },
    { 
      id: 1007, 
      customerName: 'David Miller', 
      customerEmail: 'david@example.com',
      date: '2024-01-09',
      total: 154.97,
      status: 'processing',
      items: [
        { name: 'Backpack', quantity: 1, price: 39.99 },
        { name: 'Yoga Mat', quantity: 1, price: 29.99 },
        { name: 'Water Bottle', quantity: 1, price: 19.99 },
        { name: 'Desk Lamp', quantity: 1, price: 34.99 }
      ]
    },
    { 
      id: 1008, 
      customerName: 'Jessica Taylor', 
      customerEmail: 'jessica@example.com',
      date: '2024-01-08',
      total: 329.96,
      status: 'shipped',
      items: [
        { name: 'Wireless Headphones', quantity: 2, price: 199.98 },
        { name: 'Gaming Mouse', quantity: 1, price: 59.99 },
        { name: 'Coffee Maker', quantity: 1, price: 49.99 },
        { name: 'Water Bottle', quantity: 1, price: 19.99 }
      ]
    }
  ];

  // Initial products data for demo
  const initialProducts = [
    { 
      id: 1, 
      name: "Wireless Headphones", 
      price: 99.99, 
      category: "Electronics", 
      stock: 15,
      status: 'active',
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Premium wireless headphones with noise cancellation"
    },
    { 
      id: 2, 
      name: "Smart Watch", 
      price: 199.99, 
      category: "Electronics", 
      stock: 8,
      status: 'active',
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Advanced smartwatch with health monitoring features"
    },
    { 
      id: 3, 
      name: "Running Shoes", 
      price: 79.99, 
      category: "Fashion", 
      stock: 22,
      status: 'active',
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Comfortable running shoes for all terrains"
    },
    { 
      id: 4, 
      name: "Coffee Maker", 
      price: 49.99, 
      category: "Home", 
      stock: 12,
      status: 'active',
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Automatic coffee maker with programmable timer"
    },
    { 
      id: 5, 
      name: "Backpack", 
      price: 39.99, 
      category: "Fashion", 
      stock: 30,
      status: 'active',
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Durable backpack with multiple compartments"
    },
    { 
      id: 6, 
      name: "Gaming Mouse", 
      price: 59.99, 
      category: "Electronics", 
      stock: 18,
      status: 'active',
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "High-precision gaming mouse with RGB lighting"
    },
    { 
      id: 7, 
      name: "Yoga Mat", 
      price: 29.99, 
      category: "Fitness", 
      stock: 25,
      status: 'active',
      image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Non-slip yoga mat with carrying strap"
    },
    { 
      id: 8, 
      name: "Desk Lamp", 
      price: 34.99, 
      category: "Home", 
      stock: 14,
      status: 'active',
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "LED desk lamp with adjustable brightness"
    },
    { 
      id: 9, 
      name: "Water Bottle", 
      price: 19.99, 
      category: "Fitness", 
      stock: 40,
      status: 'active',
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Insulated stainless steel water bottle"
    },
    { 
      id: 10, 
      name: "Sunglasses", 
      price: 89.99, 
      category: "Fashion", 
      stock: 0,
      status: 'out_of_stock',
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Polarized sunglasses with UV protection"
    },
    { 
      id: 11, 
      name: "Bluetooth Speaker", 
      price: 69.99, 
      category: "Electronics", 
      stock: 5,
      status: 'active',
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Portable Bluetooth speaker with 12-hour battery"
    },
    { 
      id: 12, 
      name: "Laptop Stand", 
      price: 39.99, 
      category: "Electronics", 
      stock: 3,
      status: 'active',
      image: "https://images.unsplash.com/photo-1586950012036-b957f2c7cbf3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Adjustable aluminum laptop stand"
    }
  ];

  // অর্ডার ডেটা স্টেট
  const [orders, setOrders] = useState(initialOrders);

  // প্রোডাক্ট ডেটা স্টেট
  const [products, setProducts] = useState(initialProducts);

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

  // সার্চ স্টেট
  const [searchTerm, setSearchTerm] = useState('');

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
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(newStatus.toLowerCase())) {
      alert('Invalid status. Please use: pending, processing, shipped, delivered, or cancelled');
      return;
    }

    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus.toLowerCase() } : order
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
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      status: newProduct.stock > 0 ? 'active' : 'out_of_stock',
      image: newProduct.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: newProduct.description,
      createdAt: new Date().toISOString().split('T')[0]
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

  // ফিল্টার্ড প্রোডাক্টস (সার্চ সহ)
  const filteredProducts = productFilter === 'all'
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toString().includes(searchTerm)
      )
    : products.filter(product => 
        product.status === productFilter &&
        (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.id.toString().includes(searchTerm))
      );

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

  // লগআউট ফাংশন
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  // Get user info
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Dashboard Header */}
      <div className="bg-gray-50 shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Manage orders, products, and store settings</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="badge badge-primary badge-outline">Admin</div>
                <span className="text-sm text-gray-500">
                  Logged in as: <span className="font-medium">{user?.fullName || user?.firstName || 'Admin'}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="btn btn-outline btn-sm text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Store Front
              </Link>
              <button 
                className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                onClick={handleLogout}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">${stats.totalRevenue.toFixed(2)}</h3>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>Today</span>
                  <span className="text-green-600 font-medium">+12.5%</span>
                </div>
                <progress className="progress progress-primary w-full mt-1" value="75" max="100"></progress>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
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
              <div className="mt-4">
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>This Month</span>
                  <span className="text-green-600 font-medium">+8.2%</span>
                </div>
                <progress className="progress progress-success w-full mt-1" value="60" max="100"></progress>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
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
              <div className="mt-4">
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>Awaiting Processing</span>
                  <span className="text-yellow-600 font-medium">{((stats.pendingOrders / stats.totalOrders) * 100 || 0).toFixed(1)}%</span>
                </div>
                <progress className="progress progress-warning w-full mt-1" value={((stats.pendingOrders / stats.totalOrders) * 100) || 0} max="100"></progress>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
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
              <div className="mt-4">
                <div className="text-sm text-gray-500 flex justify-between">
                  <span>Active Products</span>
                  <span className="text-purple-600 font-medium">
                    {products.filter(p => p.status === 'active').length}
                  </span>
                </div>
                <progress className="progress progress-secondary w-full mt-1" 
                  value={(products.filter(p => p.status === 'active').length / products.length) * 100} 
                  max="100">
                </progress>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button 
            className="btn btn-outline btn-sm border-gray-300 hover:bg-gray-100 text-gray-800"
            onClick={() => {
              const email = prompt('Enter email to send promotion:');
              if (email) alert(`Promotion email sent to ${email}`);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Promotion
          </button>
          <button 
            className="btn btn-outline btn-sm border-gray-300 hover:bg-gray-100 text-gray-800"
            onClick={() => setActiveTab('addProduct')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Quick Add Product
          </button>
          <button 
            className="btn btn-outline btn-sm border-gray-300 hover:bg-gray-100 text-gray-800"
            onClick={() => {
              const report = `=== Store Report ===\nTotal Revenue: $${stats.totalRevenue.toFixed(2)}\nTotal Orders: ${stats.totalOrders}\nPending Orders: ${stats.pendingOrders}\nTotal Products: ${stats.totalProducts}\nGenerated: ${new Date().toLocaleString()}`;
              alert(report);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generate Report
          </button>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap border-b border-gray-200 mb-8">
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
          <button 
            className={`px-6 py-3 font-medium border-b-2 -mb-px transition-all duration-200 flex items-center gap-2 ${activeTab === 'analytics' 
              ? 'text-purple-600 border-purple-600 bg-purple-50' 
              : 'text-gray-600 border-transparent hover:text-purple-500 hover:border-purple-300 hover:bg-purple-50/50'}`}
            onClick={() => setActiveTab('analytics')}
          >
            <span className="text-lg">📊</span>
            <span>Analytics</span>
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
                <p className="text-gray-600">Manage and track customer orders</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <select 
                  className="select select-bordered w-full sm:w-auto bg-white text-gray-800 border-gray-300"
                  value={orderFilter}
                  onChange={(e) => setOrderFilter(e.target.value)}
                >
                  <option value="all">All Orders ({orders.length})</option>
                  <option value="pending">Pending ({orders.filter(o => o.status === 'pending').length})</option>
                  <option value="processing">Processing ({orders.filter(o => o.status === 'processing').length})</option>
                  <option value="shipped">Shipped ({orders.filter(o => o.status === 'shipped').length})</option>
                  <option value="delivered">Delivered ({orders.filter(o => o.status === 'delivered').length})</option>
                  <option value="cancelled">Cancelled ({orders.filter(o => o.status === 'cancelled').length})</option>
                </select>
                <button 
                  className="btn btn-outline border-gray-300 hover:bg-gray-100 text-gray-800"
                  onClick={() => {
                    const newOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));
                    setOrders(newOrders);
                    alert('Orders sorted by latest date');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                  Sort by Date
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-gray-800 bg-gray-50">
                    <th className="text-gray-800 font-bold py-3">Order ID</th>
                    <th className="text-gray-800 font-bold py-3">Customer</th>
                    <th className="text-gray-800 font-bold py-3">Date</th>
                    <th className="text-gray-800 font-bold py-3">Amount</th>
                    <th className="text-gray-800 font-bold py-3">Status</th>
                    <th className="text-gray-800 font-bold py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-12">
                        <div className="text-6xl mb-4 text-gray-300 opacity-50">📦</div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">No orders found</h3>
                        <p className="text-gray-500 mb-6">No orders match your filter criteria.</p>
                        <button 
                          className="btn btn-outline border-gray-300 hover:bg-gray-100 text-gray-800"
                          onClick={() => setOrderFilter('all')}
                        >
                          Reset Filter
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 text-gray-800 border-b border-gray-200 transition-colors">
                        <td className="py-4">
                          <div className="flex flex-col">
                            <div className="font-bold text-gray-800">#{order.id}</div>
                            <div className="text-sm text-gray-500">{order.items?.length || 0} items</div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex flex-col">
                            <div className="font-medium text-gray-800">{order.customerName}</div>
                            <div className="text-sm text-gray-500 truncate max-w-[200px]">{order.customerEmail}</div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="text-gray-800 font-medium">{order.date}</div>
                          <div className="text-xs text-gray-500">2 days ago</div>
                        </td>
                        <td className="py-4">
                          <div className="font-bold text-green-600 text-lg">${order.total?.toFixed(2) || '0.00'}</div>
                          <div className="text-xs text-gray-500">Paid via Card</div>
                        </td>
                        <td className="py-4">{getStatusBadge(order.status)}</td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <div className="dropdown dropdown-end">
                              <div tabIndex={0} role="button" className="btn btn-sm bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400">
                                Update
                              </div>
                              <ul tabIndex={0} className="dropdown-content menu bg-white z-50 p-2 shadow rounded-box w-52 border border-gray-200">
                                <li><button onClick={() => updateOrderStatus(order.id, 'pending')}>Set as Pending</button></li>
                                <li><button onClick={() => updateOrderStatus(order.id, 'processing')}>Set as Processing</button></li>
                                <li><button onClick={() => updateOrderStatus(order.id, 'shipped')}>Set as Shipped</button></li>
                                <li><button onClick={() => updateOrderStatus(order.id, 'delivered')}>Set as Delivered</button></li>
                                <li><button onClick={() => updateOrderStatus(order.id, 'cancelled')}>Set as Cancelled</button></li>
                              </ul>
                            </div>
                            <button 
                              className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
                              onClick={() => {
                                const orderDetails = `
Order Details:
────────────────
ID: #${order.id}
Customer: ${order.customerName}
Email: ${order.customerEmail}
Date: ${order.date}
Total: $${order.total?.toFixed(2)}
Status: ${order.status}
────────────────
Items:
${order.items?.map(item => `• ${item.name} x${item.quantity}: $${item.price}`).join('\n') || 'No items'}
────────────────
Subtotal: $${order.total?.toFixed(2)}
Tax (7%): $${(order.total * 0.07).toFixed(2)}
Shipping: $5.00
────────────────
Grand Total: $${(order.total + 5 + (order.total * 0.07)).toFixed(2)}
                                `;
                                alert(orderDetails);
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

            {/* Order Summary */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white rounded border border-gray-200">
                  <div className="text-2xl font-bold text-blue-600">{orders.filter(o => o.status === 'pending').length}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="text-center p-3 bg-white rounded border border-gray-200">
                  <div className="text-2xl font-bold text-yellow-600">{orders.filter(o => o.status === 'processing').length}</div>
                  <div className="text-sm text-gray-600">Processing</div>
                </div>
                <div className="text-center p-3 bg-white rounded border border-gray-200">
                  <div className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === 'delivered').length}</div>
                  <div className="text-sm text-gray-600">Delivered</div>
                </div>
                <div className="text-center p-3 bg-white rounded border border-gray-200">
                  <div className="text-2xl font-bold text-red-600">{orders.filter(o => o.status === 'cancelled').length}</div>
                  <div className="text-sm text-gray-600">Cancelled</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
                <p className="text-gray-600">Manage your product inventory</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <div className="join">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="input input-bordered join-item bg-white text-gray-800 border-gray-300 w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button 
                    className="btn join-item bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                    onClick={() => setSearchTerm('')}
                  >
                    {searchTerm ? 'Clear' : 'Search'}
                  </button>
                </div>
                <select 
                  className="select select-bordered bg-white text-gray-800 border-gray-300"
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
                  Add Product
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-gray-800 bg-gray-50">
                    <th className="text-gray-800 font-bold py-3">Product</th>
                    <th className="text-gray-800 font-bold py-3">Name & ID</th>
                    <th className="text-gray-800 font-bold py-3">Category</th>
                    <th className="text-gray-800 font-bold py-3">Price</th>
                    <th className="text-gray-800 font-bold py-3">Stock</th>
                    <th className="text-gray-800 font-bold py-3">Status</th>
                    <th className="text-gray-800 font-bold py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-12">
                        <div className="text-6xl mb-4 text-gray-300 opacity-50">🛍️</div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">No products found</h3>
                        <p className="text-gray-500 mb-6">
                          {searchTerm ? `No products match "${searchTerm}"` : 'Add your first product using the "Add Product" tab.'}
                        </p>
                        <div className="flex gap-2 justify-center">
                          {searchTerm && (
                            <button 
                              className="btn btn-outline border-gray-300 hover:bg-gray-100 text-gray-800"
                              onClick={() => setSearchTerm('')}
                            >
                              Clear Search
                            </button>
                          )}
                          <button 
                            className="btn bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => setActiveTab('addProduct')}
                          >
                            Add New Product
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 text-gray-800 border-b border-gray-200 transition-colors">
                        <td className="py-4">
                          <div className="avatar">
                            <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex flex-col">
                            <div className="font-bold text-gray-800">{product.name}</div>
                            <div className="text-sm text-gray-500">ID: {product.id}</div>
                            {product.description && (
                              <div className="text-xs text-gray-400 truncate max-w-[200px] mt-1">
                                {product.description}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="badge badge-outline text-gray-600 border-gray-300 bg-gray-50 px-3 py-1">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="font-bold text-green-600 text-lg">${product.price?.toFixed(2) || '0.00'}</div>
                          <div className="text-xs text-gray-500">Cost: ${(product.price * 0.6).toFixed(2)}</div>
                        </td>
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className={`font-medium ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-yellow-600" : "text-red-600"}`}>
                              {product.stock || 0} units
                            </span>
                            <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className={`h-2 rounded-full ${product.stock > 20 ? 'bg-green-500' : product.stock > 5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">{getStatusBadge(product.status)}</td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <div className="dropdown dropdown-end">
                              <button 
                                className="btn btn-sm bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400"
                              >
                                Manage
                              </button>
                              <ul tabIndex={0} className="dropdown-content menu bg-white z-50 p-2 shadow rounded-box w-52 border border-gray-200">
                                <li>
                                  <button onClick={() => {
                                    const stock = prompt('Update stock quantity:', product.stock);
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
                                  }}>
                                    Update Stock
                                  </button>
                                </li>
                                <li>
                                  <button onClick={() => {
                                    const price = prompt('Update price:', product.price);
                                    if (price !== null) {
                                      const newPrice = parseFloat(price);
                                      if (!isNaN(newPrice)) {
                                        setProducts(products.map(p => 
                                          p.id === product.id ? { 
                                            ...p, 
                                            price: newPrice
                                          } : p
                                        ));
                                      }
                                    }
                                  }}>
                                    Update Price
                                  </button>
                                </li>
                                <li>
                                  <button onClick={() => {
                                    const name = prompt('Update product name:', product.name);
                                    if (name !== null && name.trim()) {
                                      setProducts(products.map(p => 
                                        p.id === product.id ? { 
                                          ...p, 
                                          name: name.trim()
                                        } : p
                                      ));
                                    }
                                  }}>
                                    Edit Details
                                  </button>
                                </li>
                              </ul>
                            </div>
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

            {/* Product Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800">Low Stock Alert</h4>
                    <p className="text-sm text-gray-600">Products with stock ≤ 5</p>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {products.filter(p => p.stock <= 5 && p.stock > 0).length}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800">Out of Stock</h4>
                    <p className="text-sm text-gray-600">Products need restocking</p>
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    {products.filter(p => p.stock === 0).length}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800">Total Value</h4>
                    <p className="text-sm text-gray-600">Inventory worth</p>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'addProduct' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
              <button 
                className="btn btn-outline btn-sm text-gray-700 border-gray-300 hover:bg-gray-100"
                onClick={() => setActiveTab('products')}
              >
                ← Back to Products
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-800">
                      Product Name <span className="text-red-500">*</span>
                    </span>
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
                  <label className="label">
                    <span className="label-text-alt text-gray-500">Enter a descriptive product name</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-800">
                      Price ($) <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                    <input
                      type="number"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      className="input input-bordered w-full bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-8"
                      placeholder="0.00"
                      step="0.01"
                      min="0.01"
                      required
                    />
                  </div>
                  <label className="label">
                    <span className="label-text-alt text-gray-500">Selling price to customers</span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium text-gray-800">
                      Category <span className="text-red-500">*</span>
                    </span>
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
                    <span className="label-text font-medium text-gray-800">
                      Stock Quantity <span className="text-red-500">*</span>
                    </span>
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
                  <label className="label">
                    <span className="label-text-alt text-gray-500">Initial stock quantity</span>
                  </label>
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium text-gray-800">Image URL</span>
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={newProduct.image}
                    onChange={handleInputChange}
                    className="input input-bordered w-full bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-500">Leave empty for default image</span>
                  </label>
                  {newProduct.image && (
                    <div className="mt-2">
                      <div className="text-sm text-gray-600 mb-2">Image Preview:</div>
                      <div className="w-32 h-32 rounded-lg border border-gray-300 overflow-hidden">
                        <img 
                          src={newProduct.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                            e.target.className = 'w-full h-full object-cover opacity-50';
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium text-gray-800">Description</span>
                  </label>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered w-full h-32 bg-white text-gray-800 border-gray-300 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter product description..."
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-500">Describe your product features and benefits</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="btn btn-outline text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-800 hover:border-gray-400"
                  onClick={() => {
                    if (window.confirm('Are you sure? All entered data will be lost.')) {
                      setActiveTab('products');
                    }
                  }}
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

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Store Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sales Chart */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Sales Overview</h3>
                <div className="space-y-4">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                    <div key={month} className="flex items-center">
                      <div className="w-16 text-gray-600">{month}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4">
                        <div 
                          className="bg-green-500 h-4 rounded-full"
                          style={{ width: `${Math.min(30 + (index * 15), 100)}%` }}
                        ></div>
                      </div>
                      <div className="w-16 text-right font-medium text-gray-800">
                        ${(1500 + (index * 300)).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">Top Selling Products</h3>
                <div className="space-y-3">
                  {products.slice(0, 5).map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <div className="text-lg font-bold text-gray-400 mr-3">{index + 1}</div>
                        <div className="w-10 h-10 rounded bg-gray-100 mr-3 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">${product.price.toFixed(2)}</div>
                        <div className="text-sm text-gray-500">Sold: {Math.floor(Math.random() * 50) + 20}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Stats */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 lg:col-span-2">
                <h3 className="font-bold text-gray-800 mb-4">Customer Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-blue-600">1,248</div>
                    <div className="text-sm text-gray-600">Total Customers</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-green-600">342</div>
                    <div className="text-sm text-gray-600">New This Month</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-purple-600">68.5%</div>
                    <div className="text-sm text-gray-600">Return Rate</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                    <div className="text-2xl font-bold text-yellow-600">4.8</div>
                    <div className="text-sm text-gray-600">Avg. Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Best Selling Category</h4>
                    <p className="text-lg text-blue-600 font-medium">Electronics</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Growth This Month</h4>
                    <p className="text-lg text-green-600 font-medium">+12.5%</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Avg. Order Time</h4>
                    <p className="text-lg text-purple-600 font-medium">2.3 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p>© {new Date().getFullYear()} MiniMart Admin Dashboard v2.0</p>
            <p className="text-sm mt-2">For administrative use only • Last updated: {new Date().toLocaleDateString()}</p>
            <div className="flex justify-center gap-4 mt-4 text-xs text-gray-500">
              <span>Orders: {orders.length}</span>
              <span>•</span>
              <span>Products: {products.length}</span>
              <span>•</span>
              <span>Revenue: ${stats.totalRevenue.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;