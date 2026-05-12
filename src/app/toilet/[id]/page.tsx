"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  Share2, 
  Heart, 
  Camera, 
  Flag, 
  Users, 
  Baby, 
  Accessibility, 
  Droplets,
  Shield,
  AlertCircle,
  CheckCircle,
  ThumbsUp,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Toilet {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  isFree: boolean;
  isPaid: boolean;
  price?: number;
  isMale: boolean;
  isFemale: boolean;
  isUnisex: boolean;
  isWheelchairAccessible: boolean;
  hasBabyChangingStation: boolean;
  hasShower: boolean;
  isOpen24_7: boolean;
  isVerified: boolean;
  cleanlinessRating: number;
  safetyRating: number;
  overallRating: number;
  currentCrowdLevel: number;
  hasWater: boolean;
  hasTissue: boolean;
  smellLevel: number;
  openingTime: string;
  closingTime: string;
  lastCleanedAt: string;
  cleaningFrequency: string;
  contactNumber: string;
  locationType: string;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  cleanlinessRating: number;
  safetyRating: number;
  overallRating: number;
  comment: string;
  crowdLevel?: number;
  waterAvailable?: boolean;
  tissueAvailable?: boolean;
  smellLevel?: number;
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
}

// Sample toilet data
const sampleToilet: Toilet = {
  id: "1",
  name: "Connaught Place Public Toilet",
  description: "Clean public toilet near Palika Bazaar with modern facilities",
  latitude: 28.6328,
  longitude: 77.2197,
  address: "Palika Bazaar, Connaught Place, New Delhi",
  area: "Connaught Place",
  city: "Delhi",
  state: "Delhi",
  pincode: "110001",
  isFree: true,
  isPaid: false,
  isMale: true,
  isFemale: true,
  isUnisex: false,
  isWheelchairAccessible: true,
  hasBabyChangingStation: false,
  hasShower: false,
  isOpen24_7: true,
  isVerified: true,
  cleanlinessRating: 4.2,
  safetyRating: 4.5,
  overallRating: 4.3,
  currentCrowdLevel: 2,
  hasWater: true,
  hasTissue: true,
  smellLevel: 1,
  openingTime: "06:00",
  closingTime: "22:00",
  lastCleanedAt: "2024-05-11T08:00:00Z",
  cleaningFrequency: "daily",
  contactNumber: "+91-11-23456789",
  locationType: "public",
};

// Sample reviews
const sampleReviews: Review[] = [
  {
    id: "1",
    userId: "1",
    userName: "Priya Sharma",
    userAvatar: "/avatars/priya.jpg",
    cleanlinessRating: 5,
    safetyRating: 5,
    overallRating: 5,
    comment: "Very clean and well-maintained toilet. The staff is helpful and it's always stocked with supplies.",
    crowdLevel: 2,
    waterAvailable: true,
    tissueAvailable: true,
    smellLevel: 1,
    isVerified: true,
    helpfulCount: 12,
    createdAt: "2024-05-10T14:30:00Z",
  },
  {
    id: "2",
    userId: "2",
    userName: "Rahul Kumar",
    userAvatar: "/avatars/rahul.jpg",
    cleanlinessRating: 4,
    safetyRating: 4,
    overallRating: 4,
    comment: "Good facilities, but can get crowded during peak hours. Overall a clean place.",
    crowdLevel: 4,
    waterAvailable: true,
    tissueAvailable: true,
    smellLevel: 2,
    isVerified: false,
    helpfulCount: 8,
    createdAt: "2024-05-09T10:15:00Z",
  },
  {
    id: "3",
    userId: "3",
    userName: "Anita Patel",
    userAvatar: "/avatars/anita.jpg",
    cleanlinessRating: 3,
    safetyRating: 4,
    overallRating: 3.5,
    comment: "Decent facilities but could be cleaner. The water pressure is good though.",
    crowdLevel: 3,
    waterAvailable: true,
    tissueAvailable: false,
    smellLevel: 3,
    isVerified: false,
    helpfulCount: 5,
    createdAt: "2024-05-08T16:45:00Z",
  },
];

export default function ToiletDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [toilet, setToilet] = useState<Toilet | null>(sampleToilet);
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [newReview, setNewReview] = useState({
    cleanlinessRating: 5,
    safetyRating: 5,
    overallRating: 5,
    comment: "",
  });
  const [isFavorite, setIsFavorite] = useState(false);

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getCrowdLevelColor = (level: number) => {
    if (level <= 2) return "bg-green-100 text-green-800";
    if (level <= 4) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getSmellLevelColor = (level: number) => {
    if (level <= 1) return "bg-green-100 text-green-800";
    if (level <= 3) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const renderStars = (rating: number, size = "w-4 h-4") => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating
                ? "text-yellow-500 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleSubmitReview = () => {
    // In a real app, this would submit to an API
    const review: Review = {
      id: Date.now().toString(),
      userId: "current-user",
      userName: "You",
      cleanlinessRating: newReview.cleanlinessRating,
      safetyRating: newReview.safetyRating,
      overallRating: newReview.overallRating,
      comment: newReview.comment,
      isVerified: false,
      helpfulCount: 0,
      createdAt: new Date().toISOString(),
    };
    setReviews([review, ...reviews]);
    setNewReview({
      cleanlinessRating: 5,
      safetyRating: 5,
      overallRating: 5,
      comment: "",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: toilet?.name,
          text: `Check out this toilet: ${toilet?.name} - ${toilet?.address}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    }
  };

  const handleNavigate = () => {
    // Open in Google Maps
    if (toilet) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${toilet.latitude},${toilet.longitude}`;
      window.open(url, "_blank");
    }
  };

  if (!toilet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Toilet not found</h2>
          <p className="text-gray-600 mb-4">The toilet you're looking for doesn't exist.</p>
          <Button onClick={() => window.location.href = "/map"}>Back to Map</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => window.location.href = "/map"}>
                ← Back
              </Button>
              <h1 className="text-xl font-bold text-gray-900">{toilet.name}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? "text-red-600 border-red-600" : ""}
              >
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                {isFavorite ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{toilet.name}</CardTitle>
                    <CardDescription className="text-base flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {toilet.address}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center ${getRatingColor(toilet.overallRating)}`}>
                      <Star className="w-5 h-5 fill-current" />
                      <span className="ml-1 text-lg font-semibold">{toilet.overallRating}</span>
                    </div>
                    <p className="text-sm text-gray-500">{reviews.length} reviews</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{toilet.description}</p>
                
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button onClick={handleNavigate} className="flex-1 sm:flex-none">
                    <Navigation className="w-4 h-4 mr-2" />
                    Navigate
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    <Phone className="w-4 h-4 mr-2" />
                    {toilet.contactNumber}
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    <Camera className="w-4 h-4 mr-2" />
                    Add Photo
                  </Button>
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    <Flag className="w-4 h-4 mr-2" />
                    Report
                  </Button>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {toilet.isFree && <Badge variant="secondary">Free</Badge>}
                  {toilet.isPaid && <Badge variant="outline">₹{toilet.price}</Badge>}
                  {toilet.isWheelchairAccessible && (
                    <Badge variant="outline">
                      <Accessibility className="w-3 h-3 mr-1" />
                      Accessible
                    </Badge>
                  )}
                  {toilet.hasBabyChangingStation && (
                    <Badge variant="outline">
                      <Baby className="w-3 h-3 mr-1" />
                      Baby Changing
                    </Badge>
                  )}
                  {toilet.hasShower && (
                    <Badge variant="outline">
                      <Droplets className="w-3 h-3 mr-1" />
                      Shower
                    </Badge>
                  )}
                  {toilet.isOpen24_7 && <Badge variant="outline">24/7</Badge>}
                  {toilet.isVerified && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="hours">Hours</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Facility Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Ratings</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Cleanliness</span>
                            <div className="flex items-center">
                              {renderStars(toilet.cleanlinessRating, "w-3 h-3")}
                              <span className="ml-2 text-sm font-medium">{toilet.cleanlinessRating}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Safety</span>
                            <div className="flex items-center">
                              {renderStars(toilet.safetyRating, "w-3 h-3")}
                              <span className="ml-2 text-sm font-medium">{toilet.safetyRating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Current Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Crowd Level</span>
                            <Badge className={`text-xs ${getCrowdLevelColor(toilet.currentCrowdLevel)}`}>
                              {toilet.currentCrowdLevel <= 2 ? "Low" : toilet.currentCrowdLevel <= 4 ? "Medium" : "High"}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Smell Level</span>
                            <Badge className={`text-xs ${getSmellLevelColor(toilet.smellLevel)}`}>
                              {toilet.smellLevel <= 1 ? "Fresh" : toilet.smellLevel <= 3 ? "Moderate" : "Strong"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Amenities</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${toilet.hasWater ? "bg-green-500" : "bg-red-500"}`}></div>
                          Water Available
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${toilet.hasTissue ? "bg-green-500" : "bg-red-500"}`}></div>
                          Tissue Available
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${toilet.isMale ? "bg-green-500" : "bg-red-500"}`}></div>
                          Male Access
                        </div>
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${toilet.isFemale ? "bg-green-500" : "bg-red-500"}`}></div>
                          Female Access
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Maintenance</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Last Cleaned: {new Date(toilet.lastCleanedAt).toLocaleDateString()}</p>
                        <p>Cleaning Frequency: {toilet.cleaningFrequency}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                {/* Write Review */}
                <Card>
                  <CardHeader>
                    <CardTitle>Write a Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cleanliness</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setNewReview(prev => ({ ...prev, cleanlinessRating: star }))}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= newReview.cleanlinessRating
                                    ? "text-yellow-500 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Safety</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setNewReview(prev => ({ ...prev, safetyRating: star }))}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= newReview.safetyRating
                                    ? "text-yellow-500 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Overall</label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setNewReview(prev => ({ ...prev, overallRating: star }))}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= newReview.overallRating
                                    ? "text-yellow-500 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Share your experience..."
                      value={newReview.comment}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                      rows={3}
                    />
                    <Button onClick={handleSubmitReview} disabled={!newReview.comment.trim()}>
                      Submit Review
                    </Button>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={review.userAvatar} />
                            <AvatarFallback>{review.userName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{review.userName}</h4>
                              {review.isVerified && (
                                <CheckCircle className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {renderStars(review.overallRating)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">Cleanliness:</span>
                          {renderStars(review.cleanlinessRating, "w-3 h-3")}
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">Safety:</span>
                          {renderStars(review.safetyRating, "w-3 h-3")}
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">Crowd:</span>
                          <Badge className={`text-xs ${getCrowdLevelColor(review.crowdLevel || 0)}`}>
                            {review.crowdLevel && review.crowdLevel <= 2 ? "Low" : 
                             review.crowdLevel && review.crowdLevel <= 4 ? "Medium" : "High"}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button className="flex items-center hover:text-blue-600">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            Helpful ({review.helpfulCount})
                          </button>
                          <button className="flex items-center hover:text-blue-600">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Reply
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="photos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Photos</CardTitle>
                    <CardDescription>Community photos of this facility</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hours" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Opening Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {toilet.isOpen24_7 ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span className="font-medium">Open 24/7</span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between py-2">
                            <span className="font-medium">Daily</span>
                            <span>{toilet.openingTime} - {toilet.closingTime}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {toilet.contactNumber}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          {toilet.address}, {toilet.pincode}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Type</span>
                  <Badge variant="outline" className="capitalize">{toilet.locationType}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cost</span>
                  <span className="font-medium">{toilet.isFree ? "Free" : `₹${toilet.price}`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Area</span>
                  <span className="font-medium">{toilet.area}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verification</span>
                  {toilet.isVerified ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-500">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Not Verified</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Safety Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Visit during well-lit hours
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Bring your own sanitizer
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Check reviews before visiting
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Tell someone your location
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Nearby Toilets */}
            <Card>
              <CardHeader>
                <CardTitle>Nearby Toilets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Rajiv Chowk Metro", distance: "0.2 km", rating: 4.1 },
                    { name: "Palika Bazaar", distance: "0.3 km", rating: 3.8 },
                    { name: "Janpath Market", distance: "0.5 km", rating: 3.5 },
                  ].map((nearby, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div>
                        <p className="font-medium text-sm">{nearby.name}</p>
                        <p className="text-xs text-gray-500">{nearby.distance}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs ml-1">{nearby.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
