"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, MapPin, Star, Navigation, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface Toilet {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  area: string;
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
  locationType: string;
}

// Sample data
const sampleToilets: Toilet[] = [
  {
    id: "1",
    name: "Connaught Place Public Toilet",
    description: "Clean public toilet near Palika Bazaar",
    latitude: 28.6328,
    longitude: 77.2197,
    address: "Palika Bazaar, Connaught Place, New Delhi",
    area: "Connaught Place",
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
    locationType: "public",
  },
  {
    id: "2",
    name: "Rajiv Chowk Metro Station Toilet",
    description: "Metro station toilet facility",
    latitude: 28.6330,
    longitude: 77.2167,
    address: "Rajiv Chowk Metro Station, New Delhi",
    area: "Connaught Place",
    isFree: false,
    isPaid: true,
    price: 5.0,
    isMale: true,
    isFemale: true,
    isUnisex: false,
    isWheelchairAccessible: true,
    hasBabyChangingStation: false,
    hasShower: false,
    isOpen24_7: false,
    isVerified: true,
    cleanlinessRating: 3.8,
    safetyRating: 4.7,
    overallRating: 4.1,
    currentCrowdLevel: 3,
    hasWater: true,
    hasTissue: true,
    smellLevel: 2,
    openingTime: "06:00",
    closingTime: "23:00",
    locationType: "metro",
  },
  {
    id: "3",
    name: "Select Citywalk Mall Toilet",
    description: "Premium mall toilet facility",
    latitude: 28.5706,
    longitude: 77.1979,
    address: "Select Citywalk, Saket, New Delhi",
    area: "Saket",
    isFree: true,
    isPaid: false,
    isMale: true,
    isFemale: true,
    isUnisex: true,
    isWheelchairAccessible: true,
    hasBabyChangingStation: true,
    hasShower: false,
    isOpen24_7: false,
    isVerified: true,
    cleanlinessRating: 4.7,
    safetyRating: 4.8,
    overallRating: 4.6,
    currentCrowdLevel: 2,
    hasWater: true,
    hasTissue: true,
    smellLevel: 0,
    openingTime: "10:00",
    closingTime: "22:00",
    locationType: "mall",
  },
  {
    id: "4",
    name: "AIIMS Hospital Public Toilet",
    description: "Hospital toilet facility",
    latitude: 28.5665,
    longitude: 77.2090,
    address: "AIIMS, Ansari Nagar, New Delhi",
    area: "AIIMS",
    isFree: true,
    isPaid: false,
    isMale: true,
    isFemale: true,
    isUnisex: true,
    isWheelchairAccessible: true,
    hasBabyChangingStation: true,
    hasShower: false,
    isOpen24_7: true,
    isVerified: true,
    cleanlinessRating: 3.5,
    safetyRating: 4.2,
    overallRating: 3.8,
    currentCrowdLevel: 4,
    hasWater: true,
    hasTissue: false,
    smellLevel: 3,
    openingTime: "00:00",
    closingTime: "23:59",
    locationType: "hospital",
  },
  {
    id: "5",
    name: "India Gate Public Toilet",
    description: "Public toilet near India Gate",
    latitude: 28.6107,
    longitude: 77.2295,
    address: "India Gate, New Delhi",
    area: "India Gate",
    isFree: true,
    isPaid: false,
    isMale: true,
    isFemale: true,
    isUnisex: false,
    isWheelchairAccessible: false,
    hasBabyChangingStation: false,
    hasShower: false,
    isOpen24_7: true,
    isVerified: true,
    cleanlinessRating: 3.2,
    safetyRating: 3.8,
    overallRating: 3.4,
    currentCrowdLevel: 3,
    hasWater: true,
    hasTissue: false,
    smellLevel: 3,
    openingTime: "06:00",
    closingTime: "22:00",
    locationType: "public",
  }
];

const areas = ["All Areas", "Connaught Place", "Saket", "AIIMS", "India Gate", "Khan Market", "Lajpat Nagar"];
const locationTypes = ["All Types", "public", "metro", "mall", "hospital", "market", "petrol_pump"];

export default function SearchPage() {
  const router = useRouter();
  const [toilets, setToilets] = useState<Toilet[]>(sampleToilets);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Filters
  const [filters, setFilters] = useState({
    area: "",
    type: "",
    rating: 0,
    priceRange: [0, 50],
    freeOnly: false,
    accessibleOnly: false,
    babyChangeOnly: false,
    open24_7Only: false,
    hasBabyChangingStation: false,
    hasShower: false,
    isVerified: false,
    minRating: 0,
    maxPrice: 50,
    locationType: "",
    isFree: false,
    isPaid: false,
    isWheelchairAccessible: false,
    isOpen24_7: false,
  });

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    // Handle URL search parameter
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const filteredToilets = toilets.filter(toilet => {
    // Search functionality
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      toilet.name.toLowerCase().includes(searchLower) ||
      toilet.area.toLowerCase().includes(searchLower) ||
      toilet.address.toLowerCase().includes(searchLower) ||
      (toilet.description && toilet.description.toLowerCase().includes(searchLower));
    
    // Area filter
    const matchesArea = !filters.area || filters.area === "" || toilet.area.toLowerCase().includes(filters.area.toLowerCase());
    
    // Location type filter
    const matchesLocationType = !filters.locationType || filters.locationType === "" || 
                             (toilet.locationType && toilet.locationType.toLowerCase().includes(filters.locationType.toLowerCase()));
    
    // Boolean filters
    const matchesFilters = 
      (!filters.freeOnly || toilet.isFree) &&
      (!filters.isWheelchairAccessible || toilet.isWheelchairAccessible) &&
      (!filters.hasBabyChangingStation || toilet.hasBabyChangingStation) &&
      (!filters.hasShower || toilet.hasShower) &&
      (!filters.isOpen24_7 || toilet.isOpen24_7) &&
      (!filters.isVerified || toilet.isVerified) &&
      (toilet.overallRating >= filters.minRating) &&
      (!filters.isPaid || (toilet.price && toilet.price <= filters.maxPrice));
    
    return matchesSearch && matchesArea && matchesLocationType && matchesFilters;
  });

  const sortedToilets = [...filteredToilets].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.overallRating - a.overallRating;
      case "distance":
        if (!userLocation) return 0;
        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.latitude, a.longitude);
        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.latitude, b.longitude);
        return distA - distB;
      case "price":
        const priceA = a.isPaid ? (a.price || 0) : 0;
        const priceB = b.isPaid ? (b.price || 0) : 0;
        return priceA - priceB;
      case "cleanliness":
        return b.cleanlinessRating - a.cleanlinessRating;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setFilters({
      area: "",
      type: "",
      rating: 0,
      priceRange: [0, 50],
      freeOnly: false,
      accessibleOnly: false,
      babyChangeOnly: false,
      open24_7Only: false,
      hasBabyChangingStation: false,
      hasShower: false,
      isVerified: false,
      minRating: 0,
      maxPrice: 50,
      locationType: "",
      isFree: false,
      isPaid: false,
      isWheelchairAccessible: false,
      isOpen24_7: false,
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.area !== "All Areas") count++;
    if (filters.locationType !== "All Types") count++;
    if (filters.isFree) count++;
    if (filters.isPaid) count++;
    if (filters.isWheelchairAccessible) count++;
    if (filters.hasBabyChangingStation) count++;
    if (filters.hasShower) count++;
    if (filters.isOpen24_7) count++;
    if (filters.isVerified) count++;
    if (filters.minRating > 0) count++;
    if (filters.maxPrice < 50) count++;
    return count;
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => window.location.href = "/"}>
                ← Back
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Search Toilets</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {getActiveFilterCount() > 0 && (
                  <Badge className="ml-2 bg-blue-100 text-blue-800">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
              <Button onClick={() => window.location.href = "/map"}>
                Map View
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="searchInput"
              placeholder="Search by location, area, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  // Search is already handled by the onChange event
                  console.log('Searching for:', (e.target as HTMLInputElement).value);
                }
              }}
              className="pl-12 pr-20 py-3 text-lg"
            />
            <Button 
              onClick={() => {
                console.log('Search button clicked, query:', searchQuery);
                // The search is already handled by the state change
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              Search
            </Button>
          </div>
          {searchQuery && (
            <div className="text-center mt-2 text-sm text-gray-600">
              Searching for: "{searchQuery}" - Found {sortedToilets.length} results
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Area Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                    <Select value={filters.area} onValueChange={(value) => setFilters(prev => ({ ...prev, area: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {areas.map((area) => (
                          <SelectItem key={area} value={area}>{area}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location Type</label>
                    <Select value={filters.locationType} onValueChange={(value) => setFilters(prev => ({ ...prev, locationType: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locationTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Rating: {filters.minRating}★
                    </label>
                    <Slider
                      value={[filters.minRating]}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, minRating: value[0] }))}
                      max={5}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  {/* Price Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Price: ₹{filters.maxPrice}
                    </label>
                    <Slider
                      value={[filters.maxPrice]}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, maxPrice: value[0] }))}
                      max={50}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Feature Filters */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Features</label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Free Only</span>
                        <Switch
                          checked={filters.isFree}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, isFree: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Paid Only</span>
                        <Switch
                          checked={filters.isPaid}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, isPaid: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Wheelchair Accessible</span>
                        <Switch
                          checked={filters.isWheelchairAccessible}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, isWheelchairAccessible: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Baby Changing</span>
                        <Switch
                          checked={filters.hasBabyChangingStation}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasBabyChangingStation: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">24/7 Open</span>
                        <Switch
                          checked={filters.isOpen24_7}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, isOpen24_7: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Verified Only</span>
                        <Switch
                          checked={filters.isVerified}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, isVerified: checked }))}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {sortedToilets.length} Results
                </h2>
                <p className="text-gray-600">
                  {searchQuery && `for "${searchQuery}"`}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="cleanliness">Cleanliness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {sortedToilets.map((toilet) => (
                <Card key={toilet.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{toilet.name}</CardTitle>
                        <CardDescription className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {toilet.address}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center ${getRatingColor(toilet.overallRating)}`}>
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1 font-medium">{toilet.overallRating}</span>
                        </div>
                        {userLocation && (
                          <span className="text-xs text-gray-500">
                            {calculateDistance(userLocation.lat, userLocation.lng, toilet.latitude, toilet.longitude).toFixed(1)} km
                          </span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{toilet.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {toilet.isFree && <Badge variant="secondary">Free</Badge>}
                      {toilet.isPaid && <Badge variant="outline">₹{toilet.price}</Badge>}
                      {toilet.isWheelchairAccessible && <Badge variant="outline">Accessible</Badge>}
                      {toilet.hasBabyChangingStation && <Badge variant="outline">Baby</Badge>}
                      {toilet.hasShower && <Badge variant="outline">Shower</Badge>}
                      {toilet.isOpen24_7 && <Badge variant="outline">24/7</Badge>}
                      {toilet.isVerified && <Badge className="bg-green-100 text-green-800">✓ Verified</Badge>}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Cleanliness: {toilet.cleanlinessRating}★</span>
                        <span>Safety: {toilet.safetyRating}★</span>
                        <Badge className={`text-xs ${getCrowdLevelColor(toilet.currentCrowdLevel)}`}>
                          Crowd: {toilet.currentCrowdLevel <= 2 ? "Low" : toilet.currentCrowdLevel <= 4 ? "Medium" : "High"}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => router.push(`/toilet/${toilet.id}`)}>
                          View Details
                        </Button>
                        <Button size="sm">
                          <Navigation className="w-4 h-4 mr-1" />
                          Navigate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedToilets.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No toilets found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
