"use client";

import Link from "next/link";
import { Search, MapPin, Star, Shield, Users, Navigation, Droplets, Sparkles, Zap, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-pulse delay-1500"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                <Navigation className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Toilet Finder</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => window.location.href = '/map'} className="hover:bg-blue-50 transition-colors">
                Map
              </Button>
              <Button variant="ghost" onClick={() => window.location.href = '/login'} className="hover:bg-blue-50 transition-colors">
                Login
              </Button>
              <Button onClick={() => window.location.href = '/map'} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transform hover:scale-105 transition-all">
                Find Toilet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Illustrations */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Toilet Illustration */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform animate-bounce">
              <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                {/* Toilet tank */}
                <rect x="6" y="2" width="12" height="8" rx="1"/>
                <rect x="7" y="3" width="10" height="6" rx="0.5" fill="white" opacity="0.3"/>
                
                {/* Tank lid */}
                <rect x="5" y="1" width="14" height="2" rx="1"/>
                <circle cx="12" cy="2" r="0.5" fill="white" opacity="0.5"/>
                
                {/* Flush handle */}
                <rect x="16" y="4" width="2" height="4" rx="0.5"/>
                <circle cx="17" cy="6" r="0.8" fill="white" opacity="0.4"/>
                
                {/* Toilet bowl base */}
                <ellipse cx="12" cy="20" rx="7" ry="2"/>
                <path d="M5 20 Q5 16 12 16 Q19 16 19 20" fill="white" opacity="0.2"/>
                
                {/* Toilet bowl */}
                <ellipse cx="12" cy="18" rx="6" ry="4"/>
                <ellipse cx="12" cy="18" rx="5" ry="3" fill="white" opacity="0.3"/>
                
                {/* Toilet seat */}
                <ellipse cx="12" cy="17" rx="6.5" ry="2.5" fill="white" opacity="0.6"/>
                <ellipse cx="12" cy="17" rx="5.5" ry="1.8" fill="currentColor"/>
                
                {/* Connecting pipe */}
                <rect x="11" y="10" width="2" height="6" rx="0.5"/>
                <rect x="11.5" y="10" width="1" height="6" fill="white" opacity="0.3"/>
              </svg>
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Find Clean Public Toilets
            </span>
            <br />
            <span className="text-3xl sm:text-5xl text-gray-800">Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Locate nearby clean public toilets in Delhi with real-time ratings, 
            accessibility information, and community reviews. Never search for a toilet again!
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
              <div className="relative bg-white rounded-lg shadow-xl">
                <div className="flex items-center">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-6 h-6" />
                  <input
                    type="text"
                    id="homeSearch"
                    placeholder="Search by area, mall, metro station..."
                    className="w-full pl-14 pr-32 py-4 rounded-lg border-0 focus:outline-none focus:ring-0 text-lg bg-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const searchValue = (e.target as HTMLInputElement).value;
                        if (searchValue.trim()) {
                          window.location.href = `/search?q=${encodeURIComponent(searchValue.trim())}`;
                        }
                      }
                    }}
                  />
                  <Button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-md shadow-lg transform hover:scale-105 transition-all"
                    onClick={() => {
                      const searchInput = document.getElementById('homeSearch') as HTMLInputElement;
                      const searchValue = searchInput?.value || '';
                      if (searchValue.trim()) {
                        window.location.href = `/search?q=${encodeURIComponent(searchValue.trim())}`;
                      }
                    }}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                <span>500+ Locations</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                <span>4.5★ Rating</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1 text-green-500" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 group"
              onClick={() => window.location.href = '/map'}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-white/30 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-semibold">Find Nearby Toilets</span>
              </div>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-red-500 text-red-600 hover:bg-red-50 px-8 py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 group"
              onClick={() => window.location.href = '/emergency'}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-semibold">Emergency Mode</span>
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-20 -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full opacity-20 translate-x-48 translate-y-48"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why Choose Toilet Finder?
              </span>
            </h2>
            <p className="text-xl text-gray-600">Everything you need to find the perfect toilet spot</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Live Map View</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Real-time GPS tracking shows nearby toilets with distance, ratings, and availability status.
                </CardDescription>
                <div className="mt-4 flex justify-center">
                  <div className="flex items-center text-sm text-blue-600 font-medium">
                    <Zap className="w-4 h-4 mr-1" />
                    <span>Instant Updates</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Community Reviews</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Real user reviews, photos, and ratings help you find the cleanest and safest options.
                </CardDescription>
                <div className="mt-4 flex justify-center">
                  <div className="flex items-center text-sm text-green-600 font-medium">
                    <Heart className="w-4 h-4 mr-1" />
                    <span>Trusted Reviews</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Accessibility Focus</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  Filter by wheelchair access, baby changing stations, and other accessibility features.
                </CardDescription>
                <div className="mt-4 flex justify-center">
                  <div className="flex items-center text-sm text-purple-600 font-medium">
                    <Droplets className="w-4 h-4 mr-1" />
                    <span>Inclusive Design</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-200 rounded-full opacity-10 animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trusted by Delhi Residents
              </span>
            </h2>
            <p className="text-lg text-gray-600">Join thousands of users finding clean toilets every day</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 2v11h3v9l7-12v-2h-3V2H7z"/>
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Public Toilets</div>
              <div className="text-sm text-gray-500 mt-1">Across Delhi</div>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce delay-500">
                  <Heart className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600 font-medium">User Reviews</div>
              <div className="text-sm text-gray-500 mt-1">Real Experiences</div>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <div className="text-2xl font-bold text-white">★</div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce delay-1000">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">4.5★</div>
              <div className="text-gray-600 font-medium">Average Rating</div>
              <div className="text-sm text-gray-500 mt-1">High Quality</div>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce delay-1500">
                  <Droplets className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Available</div>
              <div className="text-sm text-gray-500 mt-1">Any Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Toilet illustration */}
          <div className="mb-8 relative">
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2v11h3v9l7-12v-2h-3V2H7z"/>
                <circle cx="9" cy="18" r="2"/>
                <circle cx="15" cy="18" r="2"/>
              </svg>
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Never Be Caught Unprepared Again
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of Delhi residents using Toilet Finder for clean, safe, and accessible public toilets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={() => window.location.href = '/map'}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-semibold">Start Exploring</span>
              </div>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => window.location.href = '/add-toilet'}
            >
              <div className="flex items-center">
                <Navigation className="w-5 h-5 mr-2" />
                <span className="font-semibold">Add New Toilet</span>
              </div>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full -translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Navigation className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Toilet Finder</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted companion for finding clean public toilets in Delhi.
              </p>
              <div className="flex space-x-4 mt-6">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Star className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <Heart className="w-5 h-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Features</h3>
              <ul className="space-y-3 text-gray-400">
                <li><button onClick={() => window.location.href = '/map'} className="hover:text-white transition-colors flex items-center"><MapPin className="w-4 h-4 mr-2" />Live Map</button></li>
                <li><button onClick={() => window.location.href = '/search'} className="hover:text-white transition-colors flex items-center"><Search className="w-4 h-4 mr-2" />Search</button></li>
                <li><button onClick={() => window.location.href = '/reviews'} className="hover:text-white transition-colors flex items-center"><Star className="w-4 h-4 mr-2" />Reviews</button></li>
                <li><button onClick={() => window.location.href = '/emergency'} className="hover:text-white transition-colors flex items-center"><Shield className="w-4 h-4 mr-2" />Emergency</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Community</h3>
              <ul className="space-y-3 text-gray-400">
                <li><button onClick={() => window.location.href = '/add-toilet'} className="hover:text-white transition-colors flex items-center"><Navigation className="w-4 h-4 mr-2" />Add Toilet</button></li>
                <li><button onClick={() => window.location.href = '/report'} className="hover:text-white transition-colors flex items-center"><Shield className="w-4 h-4 mr-2" />Report Issue</button></li>
                <li><button onClick={() => window.location.href = '/badges'} className="hover:text-white transition-colors flex items-center"><Star className="w-4 h-4 mr-2" />Earn Badges</button></li>
                <li><button onClick={() => window.location.href = '/leaderboard'} className="hover:text-white transition-colors flex items-center"><Users className="w-4 h-4 mr-2" />Leaderboard</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><button onClick={() => window.location.href = '/help'} className="hover:text-white transition-colors flex items-center"><Heart className="w-4 h-4 mr-2" />Help Center</button></li>
                <li><button onClick={() => window.location.href = '/contact'} className="hover:text-white transition-colors flex items-center"><MapPin className="w-4 h-4 mr-2" />Contact Us</button></li>
                <li><button onClick={() => window.location.href = '/privacy'} className="hover:text-white transition-colors flex items-center"><Shield className="w-4 h-4 mr-2" />Privacy Policy</button></li>
                <li><button onClick={() => window.location.href = '/terms'} className="hover:text-white transition-colors flex items-center"><Star className="w-4 h-4 mr-2" />Terms of Service</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <div className="mb-4">
              <p className="text-gray-400 mb-2">&copy; 2024 Toilet Finder. All rights reserved.</p>
              <p className="text-gray-500 text-sm">Made with <Heart className="w-4 h-4 inline text-red-500 mx-1" /> for Delhi residents</p>
            </div>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>Delhi, India</span>
              <span>•</span>
              <span>Available 24/7</span>
              <span>•</span>
              <span>Always Clean</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
