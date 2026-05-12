"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Phone, MapPin, Star, Clock, Shield, Settings, LogOut, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");

  const userStats = {
    totalReviews: 23,
    averageRating: 4.2,
    helpfulVotes: 45,
    points: 230,
    badge: "Trusted Reviewer"
  };

  const recentReviews = [
    {
      id: 1,
      toiletName: "Rajiv Chowk Metro Station",
      rating: 4,
      date: "2024-01-15",
      comment: "Clean and well-maintained facility."
    },
    {
      id: 2,
      toiletName: "Connaught Place Sulabh",
      rating: 5,
      date: "2024-01-12",
      comment: "Excellent service, very clean."
    },
    {
      id: 3,
      toiletName: "AIIMS Hospital Toilet",
      rating: 3,
      date: "2024-01-10",
      comment: "Could be cleaner, but functional."
    }
  ];

  const favoriteToilets = [
    {
      id: 1,
      name: "Rajiv Chowk Metro Station",
      area: "Connaught Place",
      rating: 4.1,
      distance: "0.5 km"
    },
    {
      id: 2,
      name: "Sulabh Sauchalaya CP",
      area: "Connaught Place",
      rating: 4.3,
      distance: "0.3 km"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Toilet Finder</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/map">
                <Button variant="ghost">Map</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Button variant="outline" onClick={() => window.location.href = "/"}>
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <User className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                  <p className="text-gray-600">john.doe@example.com</p>
                  <div className="mt-4 flex items-center space-x-2">
                    <Badge variant="secondary">{userStats.badge}</Badge>
                    <Badge variant="outline">{userStats.points} points</Badge>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    john.doe@example.com
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    +91 98765 43210
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    Delhi, India
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button variant="outline" className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{userStats.totalReviews}</div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{userStats.averageRating}</div>
                    <div className="text-sm text-gray-600">Avg Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{userStats.helpfulVotes}</div>
                    <div className="text-sm text-gray-600">Helpful Votes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{userStats.points}</div>
                    <div className="text-sm text-gray-600">Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {/* Tabs */}
              <div className="border-b">
                <div className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "overview"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "reviews"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Reviews
                  </button>
                  <button
                    onClick={() => setActiveTab("favorites")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "favorites"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Favorites
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "settings"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Settings
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Account Overview</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Member Since</p>
                            <p className="font-medium">January 1, 2024</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Last Active</p>
                            <p className="font-medium">Today</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Account Type</p>
                            <p className="font-medium">Verified User</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Trust Score</p>
                            <p className="font-medium">85/100</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-3" />
                            <div>
                              <p className="font-medium">Reviewed Rajiv Chowk Metro</p>
                              <p className="text-sm text-gray-600">2 days ago</p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">4 stars</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-blue-500 mr-3" />
                            <div>
                              <p className="font-medium">Added new toilet location</p>
                              <p className="text-sm text-gray-600">5 days ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Your Reviews</h3>
                    {recentReviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{review.toiletName}</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-500 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {activeTab === "favorites" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Favorite Toilets</h3>
                    {favoriteToilets.map((toilet) => (
                      <Card key={toilet.id}>
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{toilet.name}</h4>
                              <p className="text-sm text-gray-600">{toilet.area}</p>
                              <div className="flex items-center mt-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(toilet.rating)
                                        ? "text-yellow-500 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="ml-1 text-sm text-gray-600">{toilet.rating}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">{toilet.distance}</p>
                              <Button variant="outline" size="sm" className="mt-2">
                                View
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-600">Receive updates about new toilets</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">Location Services</p>
                            <p className="text-sm text-gray-600">Allow app to access your location</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">Public Profile</p>
                            <p className="text-sm text-gray-600">Make your profile visible to others</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          <Shield className="w-4 h-4 mr-2" />
                          Privacy Policy
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="w-4 h-4 mr-2" />
                          Data Management
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <LogOut className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
