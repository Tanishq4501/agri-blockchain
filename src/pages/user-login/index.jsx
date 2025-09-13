import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import PublicHeader from '../../components/ui/PublicHeader';
import LoginForm from './components/LoginForm';
import SecurityIndicators from './components/SecurityIndicators';
import MockCredentialsInfo from './components/MockCredentialsInfo';

const UserLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <PublicHeader />
      
      {/* Main Content */}
      <main className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center shadow-elevated">
                <Icon name="LogIn" size={32} color="white" strokeWidth={2} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Welcome Back
            </h1>
            <p className="text-text-secondary">
              Sign in to your AgriTrace account to continue
            </p>
          </div>

          {/* Login Form Card */}
          <div className="glass-card p-8 shadow-floating">
            <LoginForm />
            <MockCredentialsInfo />
            <SecurityIndicators />
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <Link 
                to="/landing-page" 
                className="text-text-secondary hover:text-primary transition-colors duration-200 flex items-center space-x-1"
              >
                <Icon name="ArrowLeft" size={16} />
                <span>Back to Home</span>
              </Link>
              <Link 
                to="/help" 
                className="text-text-secondary hover:text-primary transition-colors duration-200 flex items-center space-x-1"
              >
                <Icon name="HelpCircle" size={16} />
                <span>Need Help?</span>
              </Link>
            </div>
            
            <div className="text-xs text-text-secondary">
              <p>
                By signing in, you agree to our{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default UserLogin;