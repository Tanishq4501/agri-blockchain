import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PublicHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/landing-page" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            onClick={closeMobileMenu}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Leaf" size={24} color="white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary tracking-tight">AgriTrace</span>
              <span className="text-xs text-text-secondary -mt-1">Supply Chain Trust</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/landing-page"
              className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                isActive('/landing-page') 
                  ? 'text-primary border-b-2 border-primary pb-1' :'text-text-secondary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/consumer-verification"
              className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                isActive('/consumer-verification') 
                  ? 'text-primary border-b-2 border-primary pb-1' :'text-text-secondary'
              }`}
            >
              Verify Product
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              asChild
            >
              <Link to="/user-login">Sign In</Link>
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="UserPlus"
              iconPosition="left"
              iconSize={16}
              asChild
            >
              <Link to="/user-registration">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-muted transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <Icon 
              name={isMobileMenuOpen ? "X" : "Menu"} 
              size={24} 
              strokeWidth={2}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-md z-40 animate-fade-in">
          <div className="px-4 py-6 space-y-6">
            {/* Mobile Navigation Links */}
            <nav className="space-y-4">
              <Link
                to="/landing-page"
                onClick={closeMobileMenu}
                className={`block text-lg font-medium transition-colors duration-200 hover:text-primary ${
                  isActive('/landing-page') ? 'text-primary' : 'text-text-secondary'
                }`}
              >
                Home
              </Link>
              <Link
                to="/consumer-verification"
                onClick={closeMobileMenu}
                className={`block text-lg font-medium transition-colors duration-200 hover:text-primary ${
                  isActive('/consumer-verification') ? 'text-primary' : 'text-text-secondary'
                }`}
              >
                Verify Product
              </Link>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                fullWidth
                iconName="LogIn"
                iconPosition="left"
                iconSize={18}
                onClick={closeMobileMenu}
                asChild
              >
                <Link to="/user-login">Sign In</Link>
              </Button>
              <Button
                variant="default"
                fullWidth
                iconName="UserPlus"
                iconPosition="left"
                iconSize={18}
                onClick={closeMobileMenu}
                asChild
              >
                <Link to="/user-registration">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Contact Info */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-text-secondary text-center">
                Trusted by farmers, retailers, and consumers worldwide
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;