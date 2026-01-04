import React, { useState, useEffect } from 'react';

const Home = () => {
  // ক্যারোসেলের জন্য স্টেট
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // ক্যারোসেল ইমেজ
  const carouselImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  ];
  
  // ডেমো প্রোডাক্ট ডেটা
  const demoProducts = [
    { id: 1, name: "Wireless Headphones", price: 99.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Electronics", rating: 4.5, stock: 15 },
    { id: 2, name: "Smart Watch", price: 199.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Electronics", rating: 4.8, stock: 8 },
    { id: 3, name: "Running Shoes", price: 79.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Fashion", rating: 4.3, stock: 22 },
    { id: 4, name: "Coffee Maker", price: 49.99, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Home", rating: 4.7, stock: 12 },
    { id: 5, name: "Backpack", price: 39.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Fashion", rating: 4.2, stock: 30 },
    { id: 6, name: "Gaming Mouse", price: 59.99, image: "https://images.unsplash.com/photo-1527814050087-3793815479db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Electronics", rating: 4.6, stock: 18 },
    { id: 7, name: "Yoga Mat", price: 29.99, image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Fitness", rating: 4.4, stock: 25 },
    { id: 8, name: "Desk Lamp", price: 34.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Home", rating: 4.1, stock: 14 },
    { id: 9, name: "Water Bottle", price: 19.99, image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Fitness", rating: 4.0, stock: 40 },
    { id: 10, name: "Sunglasses", price: 89.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", category: "Fashion", rating: 4.9, stock: 10 }
  ];
  
  // কার্টের জন্য স্টেট - এখন প্রতিটি আইটেমে পরিমাণ থাকবে
  const [cart, setCart] = useState([]);
  
  // অর্ডার ফর্মের জন্য স্টেট
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderFormData, setOrderFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cash'
  });

  // নতুন: সার্চ টার্ম
  const [searchTerm, setSearchTerm] = useState('');
  
  // নতুন: প্রোডাক্ট স্টক আপডেট
  const updateProductStock = (productId, quantity) => {
    // এই ফাংশনটি বাস্তব অ্যাপ্লিকেশনে API কল করবে
    console.log(`Updating stock for product ${productId} by ${quantity} units`);
  };
  
  // ফিল্টার্ড প্রোডাক্টস
  const filteredProducts = demoProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // ক্যারোসেল অটো স্লাইড
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // নতুন: প্রোডাক্ট রেটিং রেন্ডার
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        <div className="rating rating-sm">
          {[...Array(5)].map((_, i) => (
            <input
              key={i}
              type="radio"
              name={`rating-${rating}`}
              className="mask mask-star-2 bg-orange-400"
              checked={i < Math.floor(rating)}
              readOnly
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  // নতুন: স্টক স্ট্যাটাস
  const renderStockStatus = (stock) => {
    if (stock > 20) return <span className="text-green-600 font-medium">In Stock</span>;
    if (stock > 5) return <span className="text-yellow-600 font-medium">Low Stock</span>;
    return <span className="text-red-600 font-medium">Only {stock} left</span>;
  };

  // কার্টে প্রোডাক্ট অ্যাড - এখন পরিমাণ ১ দিয়ে শুরু হবে
  const addToCart = (product) => {
    if (product.stock < 1) {
      alert(`${product.name} is out of stock!`);
      return;
    }

    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex >= 0) {
      // যদি প্রোডাক্ট ইতিমধ্যে কার্টে থাকে, পরিমাণ বাড়াও
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
      alert(`${product.name} quantity increased!`);
    } else {
      // নতুন প্রোডাক্ট অ্যাড করো
      setCart([...cart, { ...product, quantity: 1 }]);
      alert(`${product.name} added to cart!`);
    }
  };
  
  // পরিমাণ বাড়ানো
  const increaseQuantity = (productId) => {
    const product = demoProducts.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem && product && cartItem.quantity >= product.stock) {
      alert(`Cannot add more. Only ${product.stock} items available in stock.`);
      return;
    }
    
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };
  
  // পরিমাণ কমানো
  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };
  
  // মোট মূল্য গণনা
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };
  
  // মোট আইটেম সংখ্যা
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  // ফর্ম ইনপুট হ্যান্ডলার
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderFormData({
      ...orderFormData,
      [name]: value
    });
  };
  
  // অর্ডার সাবমিট হ্যান্ডলার
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    
    // ফর্ম ভ্যালিডেশন
    if (!orderFormData.name || !orderFormData.email || !orderFormData.phone || !orderFormData.address || !orderFormData.city) {
      alert('Please fill in all required fields!');
      return;
    }
    
    if (cart.length === 0) {
      alert('Your cart is empty! Please add some products before placing an order.');
      return;
    }
    
    // অর্ডার ডেটা প্রস্তুত করা
    const orderData = {
      customer: orderFormData,
      products: cart,
      subtotal: calculateTotal(),
      shipping: 5.00,
      tax: (calculateTotal() * 0.07).toFixed(2),
      total: (parseFloat(calculateTotal()) + 5 + (parseFloat(calculateTotal()) * 0.07)).toFixed(2),
      orderDate: new Date().toLocaleDateString(),
      orderId: 'ORD' + Date.now()
    };
    
    // এখানে সাধারণত API কল করা হবে
    console.log('Order placed:', orderData);
    
    // স্টক আপডেট
    cart.forEach(item => {
      updateProductStock(item.id, -item.quantity);
    });
    
    // সাকসেস মেসেজ
    alert(`Order placed successfully! Your order ID is: ${orderData.orderId}\nTotal: $${orderData.total}`);
    
    // রিসেট ফর্ম এবং কার্ট
    setOrderFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      paymentMethod: 'cash'
    });
    setCart([]);
    setShowOrderForm(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* হিরো সেকশন - ক্যারোসেল */}
      <section className="hero py-12 bg-gradient-to-r from-blue-50 to-white">
        <div className="hero-content text-center">
          <div className="max-w-6xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Welcome to MiniMart</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700">Discover amazing products at unbeatable prices</p>
            
            {/* সার্চ বার */}
            {/* <div className="max-w-2xl mx-auto mb-8">
              <div className="join w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input input-bordered join-item w-full bg-white text-gray-900"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary join-item">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div> */}
            
            {/* ক্যারোসেল */}
            <div className="carousel w-full rounded-2xl shadow-2xl overflow-hidden">
              {carouselImages.map((image, index) => (
                <div 
                  key={index} 
                  id={`slide${index}`} 
                  className={`carousel-item relative w-full ${index === currentSlide ? 'block' : 'hidden'}`}
                >
                  <img 
                    src={image} 
                    className="w-full h-[500px] object-cover" 
                    alt={`Slide ${index + 1}`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-10 left-10 text-left">
                    <h2 className="text-4xl font-bold text-white mb-2">Special Offer</h2>
                    <p className="text-xl text-white">Up to 50% off on selected items</p>
                    <button className="btn btn-primary mt-4">Shop Now</button>
                  </div>
                  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <button 
                      className="btn btn-circle bg-white/90 hover:bg-white text-gray-900"
                      onClick={() => setCurrentSlide(index === 0 ? carouselImages.length - 1 : index - 1)}
                    >
                      ❮
                    </button> 
                    <button 
                      className="btn btn-circle bg-white/90 hover:bg-white text-gray-900"
                      onClick={() => setCurrentSlide(index === carouselImages.length - 1 ? 0 : index + 1)}
                    >
                      ❯
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* ক্যারোসেল ডটস */}
            <div className="flex justify-center mt-6">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`btn btn-xs mx-1 ${index === currentSlide ? 'btn-primary' : 'btn-ghost text-gray-900'}`}
                  onClick={() => setCurrentSlide(index)}
                >
                  •
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* প্রোডাক্ট সেকশন */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Featured Products</h2>
            <p className="text-lg text-gray-700">Check out our top-selling items</p>
            <div className="mt-4 text-gray-600">
              Showing {filteredProducts.length} of {demoProducts.length} products
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {demoProducts.map((product) => (
              <div key={product.id} className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <figure className="px-4 pt-4 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="rounded-lg h-48 w-full object-cover"
                  />
                  {product.stock < 10 && product.stock > 0 && (
                    <div className="absolute top-6 right-6">
                      <span className="badge badge-error text-white">Almost Gone</span>
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xl">Out of Stock</span>
                    </div>
                  )}
                </figure>
                <div className="card-body p-4">
                  <div className="flex justify-between items-start">
                    <div className="badge badge-primary badge-outline">{product.category}</div>
                    {renderRating(product.rating)}
                  </div>
                  <h3 className="card-title text-lg text-gray-900">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{renderStockStatus(product.stock)}</p>
                    </div>
                    <div className="card-actions">
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* কার্ড সেকশন */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Your Shopping Cart</h2>
            <div className="flex justify-center items-center gap-4">
              <div className="stat">
                <div className="stat-value text-primary">${calculateTotal()}</div>
                <div className="stat-title text-gray-900">Total Amount</div>
              </div>
              <div className="stat">
                <div className="stat-value text-secondary">{totalItems}</div>
                <div className="stat-title text-gray-900">Items</div>
              </div>
            </div>
          </div>
          
          {cart.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-200">
              <div className="text-8xl mb-6 text-gray-300 opacity-50">🛒</div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Your cart is empty</h3>
              <p className="text-gray-700 mb-8 max-w-md mx-auto">
                Looks like you haven't added any products to your cart yet. 
                Start shopping to discover amazing products!
              </p>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => document.querySelector('#products-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-gray-900 font-bold">Product</th>
                        <th className="text-gray-900 font-bold">Name</th>
                        <th className="text-gray-900 font-bold">Price</th>
                        <th className="text-gray-900 font-bold">Quantity</th>
                        <th className="text-gray-900 font-bold">Subtotal</th>
                        <th className="text-gray-900 font-bold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-16 h-16">
                                  <img src={item.image} alt={item.name} className="object-cover" />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <div className="font-bold text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-600">{item.category}</div>
                            </div>
                          </td>
                          <td className="text-blue-600 font-bold text-lg">${item.price.toFixed(2)}</td>
                          <td>
                            <div className="flex items-center space-x-4">
                              <button 
                                className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
                                onClick={() => decreaseQuantity(item.id)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="font-bold text-gray-900 text-xl min-w-[3rem] text-center">{item.quantity}</span>
                              <button 
                                className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
                                onClick={() => increaseQuantity(item.id)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="font-bold text-green-600 text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td>
                            <button 
                              className="btn btn-error btn-sm text-white"
                              onClick={() => {
                                const newCart = [...cart];
                                newCart.splice(index, 1);
                                setCart(newCart);
                              }}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-center p-8 bg-gray-50 border-t border-gray-200">
                  <div className="mb-6 md:mb-0">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Total: ${calculateTotal()}</h3>
                    <p className="text-gray-700">({totalItems} items in cart)</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      className="btn btn-outline btn-lg border-gray-300 text-gray-900 hover:bg-white"
                      onClick={() => setCart([])}
                    >
                      Clear Cart
                    </button>
                    <button 
                      className="btn btn-primary btn-lg shadow-lg"
                      onClick={() => setShowOrderForm(true)}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
              
              {/* অর্ডার ফর্ম */}
              {showOrderForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">Place Your Order</h2>
                        <button 
                          className="btn btn-ghost btn-circle text-gray-900 hover:bg-gray-100"
                          onClick={() => setShowOrderForm(false)}
                        >
                          ✕
                        </button>
                      </div>
                      
                      <form onSubmit={handleOrderSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Personal Information */}
                          <div className="space-y-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
                              <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Personal Information
                              </span>
                            </h3>
                            
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium text-gray-900">Full Name *</span>
                              </label>
                              <input 
                                type="text" 
                                name="name"
                                value={orderFormData.name}
                                onChange={handleInputChange}
                                className="input input-bordered w-full bg-white text-gray-900"
                                placeholder="Enter your full name"
                                required
                              />
                            </div>
                            
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium text-gray-900">Email Address *</span>
                              </label>
                              <input 
                                type="email" 
                                name="email"
                                value={orderFormData.email}
                                onChange={handleInputChange}
                                className="input input-bordered w-full bg-white text-gray-900"
                                placeholder="Enter your email"
                                required
                              />
                            </div>
                            
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium text-gray-900">Phone Number *</span>
                              </label>
                              <input 
                                type="tel" 
                                name="phone"
                                value={orderFormData.phone}
                                onChange={handleInputChange}
                                className="input input-bordered w-full bg-white text-gray-900"
                                placeholder="Enter your phone number"
                                required
                              />
                            </div>
                          </div>
                          
                          {/* Shipping Address */}
                          <div className="space-y-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-900 border-b pb-2">
                              <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Shipping Address
                              </span>
                            </h3>
                            
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium text-gray-900">Address *</span>
                              </label>
                              <textarea 
                                name="address"
                                value={orderFormData.address}
                                onChange={handleInputChange}
                                className="textarea textarea-bordered w-full h-32 bg-white text-gray-900"
                                placeholder="Enter your full address"
                                required
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4">
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text font-medium text-gray-900">City *</span>
                                </label>
                                <input 
                                  type="text" 
                                  name="city"
                                  value={orderFormData.city}
                                  onChange={handleInputChange}
                                  className="input input-bordered w-full bg-white text-gray-900"
                                  placeholder="City"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Order Summary */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                          <h3 className="text-xl font-semibold mb-6 text-gray-900">Order Summary</h3>
                          <div className="space-y-4">
                            {cart.map((item, index) => (
                              <div key={index} className="flex justify-between items-center">
                                <div>
                                  <span className="font-medium text-gray-900">{item.name}</span>
                                  <span className="text-gray-600 ml-2">x{item.quantity}</span>
                                </div>
                                <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                            <div className="border-t pt-4 mt-4 space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-900">Subtotal</span>
                                <span className="font-medium text-gray-900">${calculateTotal()}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-900">Shipping</span>
                                <span className="font-medium text-gray-900">$5.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-900">Tax (7%)</span>
                                <span className="font-medium text-gray-900">${(calculateTotal() * 0.07).toFixed(2)}</span>
                              </div>
                              <div className="border-t pt-3 mt-3">
                                <div className="flex justify-between text-xl font-bold">
                                  <span className="text-gray-900">Total Amount</span>
                                  <span className="text-green-600">
                                    ${(parseFloat(calculateTotal()) + 5 + (parseFloat(calculateTotal()) * 0.07)).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Terms and Submit Button */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                          <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="checkbox checkbox-primary mr-3" required />
                            <span className="text-sm text-gray-900">
                              I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a>
                            </span>
                          </label>
                          
                          <button type="submit" className="btn btn-primary btn-lg shadow-lg w-full sm:w-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Confirm Order
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;