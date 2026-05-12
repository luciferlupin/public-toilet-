"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Search, Filter, MapPin, Navigation, Star, Clock, DollarSign, Users, Baby, Accessibility, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

// Dynamically import map components to avoid SSR issues
const Map = dynamic(() => import("@/components/DelhiMap"), { 
  ssr: false,
  loading: () => <div className="h-full bg-gray-100 flex items-center justify-center">Loading Delhi map...</div>
});

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

// Comprehensive sample toilet data for Delhi - all locations should be shown
const getAllDelhiToilets = (): Toilet[] => {
  return [
    // Connaught Place Area
    {
      id: "cp_1",
      name: "Connaught Place Public Toilet",
      description: "Clean public toilet near Palika Bazaar",
      latitude: 28.6328,
      longitude: 77.2197,
      address: "Palika Bazaar, Connaught Place, New Delhi, Delhi 110001",
      area: "Connaught Place",
      city: "New Delhi",
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
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "daily",
      contactNumber: "+91-11-23456789",
      locationType: "public"
    },
    {
      id: "cp_2",
      name: "Rajiv Chowk Metro Station Toilet",
      description: "Metro station toilet facility",
      latitude: 28.6330,
      longitude: 77.2167,
      address: "Rajiv Chowk Metro Station, Connaught Place, New Delhi",
      area: "Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001",
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
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "hourly",
      contactNumber: "+91-11-23456790",
      locationType: "metro"
    },
    // Karol Bagh Area
    {
      id: "kb_1",
      name: "Karol Bagh Market Toilet",
      description: "Public toilet in Karol Bagh market",
      latitude: 28.6499,
      longitude: 77.1903,
      address: "Arya Samaj Road, Karol Bagh, New Delhi",
      area: "Karol Bagh",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110005",
      isFree: false,
      isPaid: true,
      price: 10.0,
      isMale: true,
      isFemale: true,
      isUnisex: false,
      isWheelchairAccessible: false,
      hasBabyChangingStation: false,
      hasShower: false,
      isOpen24_7: false,
      isVerified: true,
      cleanlinessRating: 3.5,
      safetyRating: 4.2,
      overallRating: 3.8,
      currentCrowdLevel: 4,
      hasWater: true,
      hasTissue: true,
      smellLevel: 3,
      openingTime: "09:00",
      closingTime: "21:00",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "daily",
      contactNumber: "+91-11-23456791",
      locationType: "market"
    },
    // Saket Area
    {
      id: "skt_1",
      name: "Select Citywalk Mall Toilet",
      description: "Premium mall toilet facility",
      latitude: 28.5706,
      longitude: 77.1979,
      address: "Select Citywalk, Saket, New Delhi",
      area: "Saket",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110017",
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
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "hourly",
      contactNumber: "+91-11-23456792",
      locationType: "mall"
    },
    // South Delhi Areas
    {
      id: "nd_1",
      name: "Nehru Place Public Toilet",
      description: "Public toilet near Nehru Place market",
      latitude: 28.5466,
      longitude: 77.2508,
      address: "Nehru Place, New Delhi",
      area: "Nehru Place",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110019",
      isFree: true,
      isPaid: false,
      isMale: true,
      isFemale: true,
      isUnisex: false,
      isWheelchairAccessible: true,
      hasBabyChangingStation: false,
      hasShower: false,
      isOpen24_7: false,
      isVerified: true,
      cleanlinessRating: 3.9,
      safetyRating: 4.3,
      overallRating: 4.0,
      currentCrowdLevel: 3,
      hasWater: true,
      hasTissue: true,
      smellLevel: 2,
      openingTime: "08:00",
      closingTime: "20:00",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "daily",
      contactNumber: "+91-11-23456793",
      locationType: "public"
    },
    {
      id: "ggn_1",
      name: "Greater Kailash Market Toilet",
      description: "Market toilet facility",
      latitude: 28.5451,
      longitude: 77.2425,
      address: "M Block Market, Greater Kailash I, New Delhi",
      area: "Greater Kailash",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110048",
      isFree: false,
      isPaid: true,
      price: 5.0,
      isMale: true,
      isFemale: true,
      isUnisex: false,
      isWheelchairAccessible: false,
      hasBabyChangingStation: false,
      hasShower: false,
      isOpen24_7: false,
      isVerified: true,
      cleanlinessRating: 4.0,
      safetyRating: 4.4,
      overallRating: 4.2,
      currentCrowdLevel: 2,
      hasWater: true,
      hasTissue: true,
      smellLevel: 1,
      openingTime: "09:00",
      closingTime: "21:00",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "daily",
      contactNumber: "+91-11-23456794",
      locationType: "market"
    },
    // East Delhi Areas
    {
      id: "lk_1",
      name: "Laxmi Nagar Public Toilet",
      description: "Public toilet in Laxmi Nagar",
      latitude: 28.6180,
      longitude: 77.2775,
      address: "Laxmi Nagar, New Delhi",
      area: "Laxmi Nagar",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110092",
      isFree: true,
      isPaid: false,
      isMale: true,
      isFemale: true,
      isUnisex: false,
      isWheelchairAccessible: false,
      hasBabyChangingStation: false,
      hasShower: false,
      isOpen24_7: false,
      isVerified: true,
      cleanlinessRating: 3.2,
      safetyRating: 3.8,
      overallRating: 3.5,
      currentCrowdLevel: 4,
      hasWater: true,
      hasTissue: false,
      smellLevel: 3,
      openingTime: "07:00",
      closingTime: "19:00",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "daily",
      contactNumber: "+91-11-23456795",
      locationType: "public"
    },
    {
      id: "pg_1",
      name: "Preet Vihar Metro Toilet",
      description: "Metro station toilet",
      latitude: 28.6470,
      longitude: 77.2936,
      address: "Preet Vihar Metro Station, New Delhi",
      area: "Preet Vihar",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110092",
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
      cleanlinessRating: 4.1,
      safetyRating: 4.6,
      overallRating: 4.3,
      currentCrowdLevel: 3,
      hasWater: true,
      hasTissue: true,
      smellLevel: 1,
      openingTime: "06:00",
      closingTime: "22:00",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "hourly",
      contactNumber: "+91-11-23456796",
      locationType: "metro"
    },
    // West Delhi Areas
    {
      id: "rk_1",
      name: "Rajouri Garden Mall Toilet",
      description: "Shopping mall toilet",
      latitude: 28.6451,
      longitude: 77.1138,
      address: "Rajouri Garden Mall, New Delhi",
      area: "Rajouri Garden",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110027",
      isFree: false,
      isPaid: true,
      price: 10.0,
      isMale: true,
      isFemale: true,
      isUnisex: true,
      isWheelchairAccessible: true,
      hasBabyChangingStation: true,
      hasShower: false,
      isOpen24_7: false,
      isVerified: true,
      cleanlinessRating: 4.5,
      safetyRating: 4.7,
      overallRating: 4.6,
      currentCrowdLevel: 3,
      hasWater: true,
      hasTissue: true,
      smellLevel: 0,
      openingTime: "10:00",
      closingTime: "22:00",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "hourly",
      contactNumber: "+91-11-23456797",
      locationType: "mall"
    },
    {
      id: "pg_2",
      name: "Punjabi Bagh Public Toilet",
      description: "Public toilet near market",
      latitude: 28.6712,
      longitude: 77.1126,
      address: "Punjabi Bagh, New Delhi",
      area: "Punjabi Bagh",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110026",
      isFree: true,
      isPaid: false,
      isMale: true,
      isFemale: true,
      isUnisex: false,
      isWheelchairAccessible: false,
      hasBabyChangingStation: false,
      hasShower: false,
      isOpen24_7: false,
      isVerified: true,
      cleanlinessRating: 3.6,
      safetyRating: 4.0,
      overallRating: 3.8,
      currentCrowdLevel: 3,
      hasWater: true,
      hasTissue: true,
      smellLevel: 2,
      openingTime: "08:00",
      closingTime: "20:00",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "daily",
      contactNumber: "+91-11-23456798",
      locationType: "public"
    },
    // North Delhi Areas
    {
      id: "cp_3",
      name: "Chandni Chowk Public Toilet",
      description: "Historic area public toilet",
      latitude: 28.6506,
      longitude: 77.2309,
      address: "Chandni Chowk, Old Delhi",
      area: "Chandni Chowk",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110006",
      isFree: true,
      isPaid: false,
      isMale: true,
      isFemale: true,
      isUnisex: false,
      isWheelchairAccessible: false,
      hasBabyChangingStation: false,
      hasShower: false,
      isOpen24_7: false,
      isVerified: true,
      cleanlinessRating: 3.0,
      safetyRating: 3.5,
      overallRating: 3.2,
      currentCrowdLevel: 5,
      hasWater: true,
      hasTissue: false,
      smellLevel: 4,
      openingTime: "07:00",
      closingTime: "19:00",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "daily",
      contactNumber: "+91-11-23456799",
      locationType: "public"
    },
    {
      id: "dl_1",
      name: "Delhi University North Campus Toilet",
      description: "University campus toilet",
      latitude: 28.6885,
      longitude: 77.2024,
      address: "Delhi University, North Campus, Delhi",
      area: "North Campus",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110007",
      isFree: true,
      isPaid: false,
      isMale: true,
      isFemale: true,
      isUnisex: false,
      isWheelchairAccessible: true,
      hasBabyChangingStation: false,
      hasShower: false,
      isOpen24_7: false,
      isVerified: true,
      cleanlinessRating: 4.0,
      safetyRating: 4.5,
      overallRating: 4.2,
      currentCrowdLevel: 2,
      hasWater: true,
      hasTissue: true,
      smellLevel: 1,
      openingTime: "08:00",
      closingTime: "18:00",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "daily",
      contactNumber: "+91-11-23456800",
      locationType: "school"
    },
    // South Extension Area
    {
      id: "se_1",
      name: "South Extension Market Toilet",
      description: "Market toilet facility",
      latitude: 28.5696,
      longitude: 77.2105,
      address: "South Extension Part I, New Delhi",
      area: "South Extension",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110049",
      isFree: false,
      isPaid: true,
      price: 5.0,
      isMale: true,
      isFemale: true,
      isUnisex: false,
      isWheelchairAccessible: false,
      hasBabyChangingStation: false,
      hasShower: false,
      isOpen24_7: false,
      isVerified: true,
      cleanlinessRating: 3.7,
      safetyRating: 4.1,
      overallRating: 3.9,
      currentCrowdLevel: 3,
      hasWater: true,
      hasTissue: true,
      smellLevel: 2,
      openingTime: "09:00",
      closingTime: "21:00",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "daily",
      contactNumber: "+91-11-23456801",
      locationType: "market"
    },
    // Hauz Khas Area
    {
      id: "hk_1",
      name: "Hauz Khas Village Toilet",
      description: "Trendy area public toilet",
      latitude: 28.5532,
      longitude: 77.1945,
      address: "Hauz Khas Village, New Delhi",
      area: "Hauz Khas",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110016",
      isFree: false,
      isPaid: true,
      price: 10.0,
      isMale: true,
      isFemale: true,
      isUnisex: false,
      isWheelchairAccessible: false,
      hasBabyChangingStation: false,
      hasShower: false,
      isOpen24_7: false,
      isVerified: true,
      cleanlinessRating: 4.3,
      safetyRating: 4.2,
      overallRating: 4.2,
      currentCrowdLevel: 3,
      hasWater: true,
      hasTissue: true,
      smellLevel: 1,
      openingTime: "10:00",
      closingTime: "23:00",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "hourly",
      contactNumber: "+91-11-23456802",
      locationType: "public"
    },
    // AIIMS Area
    {
      id: "aiims_1",
      name: "AIIMS Hospital Public Toilet",
      description: "Hospital toilet facility",
      latitude: 28.5666,
      longitude: 77.2090,
      address: "AIIMS, Ansari Nagar, New Delhi",
      area: "AIIMS",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110029",
      isFree: true,
      isPaid: false,
      isMale: true,
      isFemale: true,
      isUnisex: false,
      isWheelchairAccessible: true,
      hasBabyChangingStation: true,
      hasShower: false,
      isOpen24_7: true,
      isVerified: true,
      cleanlinessRating: 4.8,
      safetyRating: 4.9,
      overallRating: 4.7,
      currentCrowdLevel: 4,
      hasWater: true,
      hasTissue: true,
      smellLevel: 0,
      openingTime: "00:00",
      closingTime: "23:59",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "hourly",
      contactNumber: "+91-11-23456803",
      locationType: "hospital"
    },
    // India Gate Area
    {
      id: "ig_1",
      name: "India Gate Public Toilet",
      description: "Tourist area toilet",
      latitude: 28.6104,
      longitude: 77.2300,
      address: "India Gate, New Delhi",
      area: "India Gate",
      city: "New Delhi",
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
      isOpen24_7: false,
      isVerified: true,
      cleanlinessRating: 4.4,
      safetyRating: 4.6,
      overallRating: 4.5,
      currentCrowdLevel: 4,
      hasWater: true,
      hasTissue: true,
      smellLevel: 1,
      openingTime: "06:00",
      closingTime: "22:00",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "hourly",
      contactNumber: "+91-11-23456804",
      locationType: "park"
    },
    // Dilli Haat Area
    {
      id: "dh_1",
      name: "Dilli Haat Public Toilet",
      description: "Cultural complex toilet",
      latitude: 28.5905,
      longitude: 77.2095,
      address: "Dilli Haat, INA, New Delhi",
      area: "INA",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110023",
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
      cleanlinessRating: 4.1,
      safetyRating: 4.3,
      overallRating: 4.2,
      currentCrowdLevel: 2,
      hasWater: true,
      hasTissue: true,
      smellLevel: 1,
      openingTime: "11:00",
      closingTime: "21:00",
      lastCleanedAt: new Date().toISOString(),
      cleaningFrequency: "daily",
      contactNumber: "+91-11-23456805",
      locationType: "market"
    }
  ];
};

// Use real Delhi toilet data
const getRealDelhiToilets = (): Toilet[] => {
  return getAllDelhiToilets();
};

export default function MapPage() {
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [selectedToilet, setSelectedToilet] = useState<Toilet | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    isFree: false,
    isPaid: false,
    isWheelchairAccessible: false,
    hasBabyChangingStation: false,
    hasShower: false,
    isOpen24_7: false,
    isVerified: false,
  });
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  useEffect(() => {
    // Load real Delhi toilet data
    const loadToilets = () => {
      const toiletData = getRealDelhiToilets();
      setToilets(toiletData);
    };

    loadToilets();

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
          // Default to Delhi center if location access denied
          setUserLocation({ lat: 28.6139, lng: 77.2090 });
        }
      );
    } else {
      // Default to Delhi center
      setUserLocation({ lat: 28.6139, lng: 77.2090 });
    }
  }, []);

  const filteredToilets = toilets.filter(toilet => {
    const matchesSearch = toilet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         toilet.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         toilet.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = 
      (!filters.isFree || toilet.isFree) &&
      (!filters.isPaid || toilet.isPaid) &&
      (!filters.isWheelchairAccessible || toilet.isWheelchairAccessible) &&
      (!filters.hasBabyChangingStation || toilet.hasBabyChangingStation) &&
      (!filters.hasShower || toilet.hasShower) &&
      (!filters.isOpen24_7 || toilet.isOpen24_7) &&
      (!filters.isVerified || toilet.isVerified);
    
    return matchesSearch && matchesFilters;
  });

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

  const sortedToilets = userLocation 
    ? filteredToilets.sort((a, b) => 
        calculateDistance(userLocation.lat, userLocation.lng, a.latitude, a.longitude) -
        calculateDistance(userLocation.lat, userLocation.lng, b.latitude, b.longitude)
      )
    : filteredToilets;

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
              <h1 className="text-xl font-bold text-gray-900">Toilet Finder Map</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Navigation className="w-4 h-4 mr-2" />
                My Location
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-full md:w-96 bg-white border-r overflow-hidden flex flex-col">
          {/* Search and Filters */}
          <div className="p-4 border-b">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* View Toggle */}
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "map" | "list")} className="mb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Filters */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Free Only</span>
                <Switch
                  checked={filters.isFree}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, isFree: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Wheelchair Accessible</span>
                <Switch
                  checked={filters.isWheelchairAccessible}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, isWheelchairAccessible: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Baby Changing</span>
                <Switch
                  checked={filters.hasBabyChangingStation}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasBabyChangingStation: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">24/7 Open</span>
                <Switch
                  checked={filters.isOpen24_7}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, isOpen24_7: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Verified Only</span>
                <Switch
                  checked={filters.isVerified}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, isVerified: checked }))}
                />
              </div>
            </div>
          </div>

          {/* Toilet List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                {sortedToilets.length} Toilets Found
              </h3>
              
              <div className="space-y-3">
                {sortedToilets.map((toilet) => (
                  <Card 
                    key={toilet.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedToilet(toilet)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">{toilet.name}</CardTitle>
                          <CardDescription className="text-sm">
                            {toilet.address}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <div className={`flex items-center ${getRatingColor(toilet.overallRating)}`}>
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium ml-1">{toilet.overallRating}</span>
                          </div>
                          {userLocation && (
                            <span className="text-xs text-gray-500">
                              {calculateDistance(userLocation.lat, userLocation.lng, toilet.latitude, toilet.longitude).toFixed(1)} km
                            </span>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {toilet.isFree && <Badge variant="secondary" className="text-xs">Free</Badge>}
                        {toilet.isPaid && <Badge variant="outline" className="text-xs">₹{toilet.price}</Badge>}
                        {toilet.isWheelchairAccessible && (
                          <Badge variant="outline" className="text-xs">
                            <Accessibility className="w-3 h-3 mr-1" />
                            Accessible
                          </Badge>
                        )}
                        {toilet.hasBabyChangingStation && (
                          <Badge variant="outline" className="text-xs">
                            <Baby className="w-3 h-3 mr-1" />
                            Baby
                          </Badge>
                        )}
                        {toilet.hasShower && (
                          <Badge variant="outline" className="text-xs">
                            <Droplets className="w-3 h-3 mr-1" />
                            Shower
                          </Badge>
                        )}
                        {toilet.isOpen24_7 && <Badge variant="outline" className="text-xs">24/7</Badge>}
                        {toilet.isVerified && <Badge className="text-xs bg-green-100 text-green-800">✓ Verified</Badge>}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          Crowd: 
                        </span>
                        <Badge className={`text-xs ${getCrowdLevelColor(toilet.currentCrowdLevel)}`}>
                          {toilet.currentCrowdLevel <= 2 ? "Low" : toilet.currentCrowdLevel <= 4 ? "Medium" : "High"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="hidden md:block flex-1 relative">
          {viewMode === "map" ? (
            <Map 
              toilets={filteredToilets} 
              userLocation={userLocation}
              selectedToilet={selectedToilet}
              onToiletSelect={setSelectedToilet}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Map view is not available in list mode</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
