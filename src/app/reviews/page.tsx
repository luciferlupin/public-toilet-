"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Filter, Search, MapPin, Clock, User, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Reviews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: "Rahul Sharma",
      userAvatar: "RS",
      toiletName: "Rajiv Chowk Metro Station",
      toiletArea: "Connaught Place",
      rating: 4,
      date: "2024-01-15",
      helpful: 23,
      notHelpful: 2,
      comment: "Clean and well-maintained facility. Always has toilet paper and soap. Can get crowded during peak hours.",
      photos: 2,
      verified: true
    },
    {
      id: 2,
      userName: "Priya Patel",
      userAvatar: "PP",
      toiletName: "Sulabh Sauchalaya CP",
      toiletArea: "Connaught Place",
      rating: 5,
      date: "2024-01-14",
      helpful: 45,
      notHelpful: 1,
      comment: "Excellent facility! Very clean, well-lit, and the staff is helpful. Highly recommended for women.",
      photos: 3,
      verified: true
    },
    {
      id: 3,
      userName: "Amit Kumar",
      userAvatar: "AK",
      toiletName: "AIIMS Hospital Toilet",
      toiletArea: "AIIMS Campus",
      rating: 3,
      date: "2024-01-13",
      helpful: 12,
      notHelpful: 8,
      comment: "Functional but could be cleaner. Long queues during visiting hours. Staff is helpful though.",
      photos: 1,
      verified: false
    },
    {
      id: 4,
      userName: "Sneha Reddy",
      userAvatar: "SR",
      toiletName: "Select Citywalk Mall",
      toiletArea: "Saket",
      rating: 4,
      date: "2024-01-12",
      helpful: 18,
      notHelpful: 3,
      comment: "Clean mall toilets with baby changing facilities. Located on every floor. Free for customers.",
      photos: 4,
      verified: true
    },
    {
      id: 5,
      userName: "Vikram Singh",
      userAvatar: "VS",
      toiletName: "Kashmere Gate Metro",
      toiletArea: "Kashmere Gate",
      rating: 2,
      date: "2024-01-11",
      helpful: 8,
      notHelpful: 15,
      comment: "Poorly maintained. Often out of supplies. Staff not responsive to complaints.",
      photos: 2,
      verified: false
    }
  ]);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.toiletName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.toiletArea.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "5star") return matchesSearch && review.rating === 5;
    if (selectedFilter === "4star") return matchesSearch && review.rating === 4;
    if (selectedFilter === "3star") return matchesSearch && review.rating === 3;
    if (selectedFilter === "2star") return matchesSearch && review.rating === 2;
    if (selectedFilter === "1star") return matchesSearch && review.rating === 1;
    if (selectedFilter === "verified") return matchesSearch && review.verified;
    
    return matchesSearch;
  });

  const handleHelpful = (reviewId: number, helpful: boolean) => {
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          helpful: helpful ? review.helpful + 1 : review.helpful,
          notHelpful: !helpful ? review.notHelpful + 1 : review.notHelpful
        };
      }
      return review;
    }));
  };

  const stats = {
    total: reviews.length,
    average: (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1),
    fiveStar: reviews.filter(r => r.rating === 5).length,
    fourStar: reviews.filter(r => r.rating === 4).length,
    threeStar: reviews.filter(r => r.rating === 3).length,
    twoStar: reviews.filter(r => r.rating === 2).length,
    oneStar: reviews.filter(r => r.rating === 1).length
  };

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
              <Link href="/reviews">
                <Button variant="ghost">Reviews</Button>
              </Link>
              <Link href="/">
                <Button variant="ghost">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Reviews</h1>
          <p className="text-gray-600">Read and share experiences with public toilets in Delhi</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.average}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">{stats.fiveStar}</div>
              <div className="text-sm text-gray-600">5 Stars</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{stats.fourStar}</div>
              <div className="text-sm text-gray-600">4 Stars</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-purple-500">{stats.threeStar}</div>
              <div className="text-sm text-gray-600">3 Stars</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <div className="text-2xl font-bold text-red-500">{stats.twoStar + stats.oneStar}</div>
              <div className="text-sm text-gray-600">≤2 Stars</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search reviews by toilet name, area, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Reviews</option>
                <option value="5star">5 Stars</option>
                <option value="4star">4 Stars</option>
                <option value="3star">3 Stars</option>
                <option value="2star">2 Stars</option>
                <option value="1star">1 Star</option>
                <option value="verified">Verified Only</option>
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{review.userAvatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{review.userName}</h3>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
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
                    <span className="text-sm text-gray-600">{review.rating}.0</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-1">{review.toiletName}</h4>
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-3 h-3 mr-1" />
                    {review.toiletArea}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>

                {review.photos > 0 && (
                  <div className="mb-4">
                    <div className="flex space-x-2">
                      {[...Array(review.photos)].map((_, i) => (
                        <div
                          key={i}
                          className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center"
                        >
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleHelpful(review.id, true)}
                      className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    <button
                      onClick={() => handleHelpful(review.id, false)}
                      className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>Not Helpful ({review.notHelpful})</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600">
                      <MessageSquare className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                  <Button variant="outline" size="sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    View on Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
            <Button onClick={() => {
              setSearchQuery("");
              setSelectedFilter("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
