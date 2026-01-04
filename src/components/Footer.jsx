import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-900 pt-8 pb-6 border-t">
            <div className="container mx-auto px-4">
                
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    
                    {/* Brand Name - Left Side */}
                    <div className="mb-4 md:mb-0">
                        <span className="text-2xl font-bold text-gray-900">MiniMart</span>
                    </div>

                    {/* Social Icons - Right Side */}
                    <div className="flex gap-4">
                        {/* Facebook SVG */}
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                            </svg>
                        </a>
                        
                        {/* Instagram SVG */}
                        <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        
                        {/* YouTube SVG */}
                        <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                        </a>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-6 border-t border-gray-200">
                    <div className="text-center text-gray-500 text-sm">
                        © {new Date().getFullYear()} MiniMart. All rights reserved.
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;