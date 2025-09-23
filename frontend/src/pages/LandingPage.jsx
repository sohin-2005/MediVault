import React from 'react';
import { 
  Heart, 
  Shield, 
  BarChart3, 
  Users, 
  FileText, 
  Pill, 
  Calendar, 
  DollarSign, 
  Settings,
  CheckCircle,
  ArrowRight,
  Activity,
  Lock,
  Cloud,
  Phone
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";


export default function LandingPage({ onGetStarted, onLogin }) {
  const features = [
    {
      icon: Users,
      title: 'User Management',
      description: 'Manage patients, doctors, and administrators with role-based access control.',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      icon: FileText,
      title: 'Health Records',
      description: 'Securely store medical history, lab results, allergies, and vaccination records.',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      icon: Pill,
      title: 'Prescriptions & Medications',
      description: 'Track prescriptions, schedules, and drug interactions with reminders.',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      icon: Calendar,
      title: 'Appointments & Scheduling',
      description: 'Book and manage appointments with calendar integration and reminders.',
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    },
    {
      icon: DollarSign,
      title: 'Finance Management',
      description: 'Track expenses, insurance claims, and spending analytics.',
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200'
    },
    {
      icon: Settings,
      title: 'Administration & Analytics',
      description: 'Admin tools, system monitoring, audit logs, and reporting dashboards.',
      color: 'bg-red-50 text-red-600 border-red-200'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'HIPAA-compliant security with end-to-end encryption and audit trails.'
    },
    {
      icon: Cloud,
      title: 'Cloud-Based Access',
      description: 'Access your medical records securely from anywhere, anytime.'
    },
    {
      icon: Activity,
      title: 'Real-Time Monitoring',
      description: 'Live health tracking and instant notifications for critical updates.'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive insights into health trends and expenses.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Heart className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-blue-200">MediVault</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Securely store, manage, and track your health information with analytics 
              and seamless collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4"
                onClick={onGetStarted}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
                onClick={onLogin}
              >
                Sign In
              </Button>
            </div>
            <p className="text-blue-200 mt-4">
              Trusted by healthcare professionals worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">
              Platform Features
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need for healthcare management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MediVault provides tools to manage patient records, appointments, 
              prescriptions, and finances—all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
                  <CardHeader>
                    <div className={`inline-flex p-3 rounded-xl border-2 ${feature.color} w-fit mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="security" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 px-4 py-2">
              Why Choose MediVault
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for healthcare professionals and patients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience modern healthcare management with advanced features 
              and uncompromising security standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to transform your healthcare management?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of healthcare professionals and patients who trust MediVault.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4"
              onClick={onGetStarted}
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </div>
          <p className="text-blue-200 mt-6">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold">MediVault</span>
              </div>
              <p className="text-gray-400 mb-4">
                Secure, comprehensive medical record management for modern healthcare.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#security" className="hover:text-white">Security</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Status</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MediVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
