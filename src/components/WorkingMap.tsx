"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Navigation, Star, ExternalLink } from "lucide-react";

// This is a simpler working map component that doesn't require external libraries
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

interface WorkingMapProps {
  toilets: Toilet[];
  userLocation: { lat: number; lng: number } | null;
  selectedToilet: Toilet | null;
  onToiletSelect: (toilet: Toilet | null) => void;
}

export default function WorkingMap({ toilets, userLocation, selectedToilet, onToiletSelect }: WorkingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi center
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (userLocation) {
      setMapCenter({ lat: userLocation.lat, lng: userLocation.lng });
      setZoom(14);
    }
  }, [userLocation]);

  const getMarkerPosition = (toilet: Toilet) => {
    // Simple positioning logic for demonstration
    const baseLat = mapCenter.lat;
    const baseLng = mapCenter.lng;
    
    // Add some offset based on toilet ID for visual separation
    const latOffset = (parseFloat(toilet.id) * 0.01) - 0.02;
    const lngOffset = (parseFloat(toilet.id) * 0.01) - 0.02;
    
    return {
      top: `${50 + latOffset * 100}%`,
      left: `${50 + lngOffset * 100}%`,
    };
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-500";
    if (rating >= 3.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  const openInGoogleMaps = (toilet: Toilet) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${toilet.latitude},${toilet.longitude}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-blue-50 to-green-50">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 opacity-50"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* User Location Marker */}
      {userLocation && (
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ top: "50%", left: "50%" }}
        >
          <div className="relative">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
          </div>
        </div>
      )}

      {/* Toilet Markers */}
      {toilets.map((toilet) => {
        const position = getMarkerPosition(toilet);
        const isSelected = selectedToilet?.id === toilet.id;
        
        return (
          <div
            key={toilet.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 z-10 ${
              isSelected ? 'scale-125 z-30' : ''
            }`}
            style={position}
            onClick={() => onToiletSelect(toilet)}
          >
            <div className="relative group">
              {/* Marker Pin */}
              <div className={`w-8 h-8 ${getRatingColor(toilet.overallRating)} rounded-full flex items-center justify-center text-white shadow-lg ${
                isSelected ? 'ring-4 ring-blue-400 ring-offset-2' : ''
              }`}>
                <MapPin className="w-4 h-4" />
              </div>
              
              {/* Rating Badge */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-1 py-0.5 rounded text-xs font-medium shadow whitespace-nowrap">
                {toilet.overallRating}★
              </div>
              
              {/* Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-40">
                <div className="bg-white rounded-lg shadow-xl p-3 min-w-max">
                  <h4 className="font-semibold text-sm mb-1">{toilet.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{toilet.address}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="ml-1 text-xs">{toilet.overallRating}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openInGoogleMaps(toilet);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-50 space-y-2">
        <button
          onClick={() => setZoom(Math.min(zoom + 1, 18))}
          className="bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={() => setZoom(Math.max(zoom - 1, 10))}
          className="bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        {userLocation && (
          <button
            onClick={() => {
              setMapCenter({ lat: userLocation.lat, lng: userLocation.lng });
              setZoom(14);
            }}
            className="bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50"
          >
            <Navigation className="w-4 h-4 text-blue-600" />
          </button>
        )}
      </div>

      {/* Selected Toilet Details */}
      {selectedToilet && (
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 max-w-sm z-40">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{selectedToilet.name}</h3>
            <button 
              onClick={() => onToiletSelect(null)}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">{selectedToilet.address}</p>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="ml-1 font-medium">{selectedToilet.overallRating}</span>
              <span className="ml-1 text-sm text-gray-500">({Math.floor(Math.random() * 50) + 10} reviews)</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedToilet.isFree && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Free</span>}
            {selectedToilet.isPaid && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">₹{selectedToilet.price}</span>}
            {selectedToilet.isWheelchairAccessible && <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Accessible</span>}
            {selectedToilet.hasBabyChangingStation && <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded">Baby</span>}
            {selectedToilet.isOpen24_7 && <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">24/7</span>}
            {selectedToilet.isVerified && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">✓ Verified</span>}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => window.location.href = `/toilet/${selectedToilet.id}`}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
            >
              View Details
            </button>
            <button 
              onClick={() => openInGoogleMaps(selectedToilet)}
              className="flex-1 border border-gray-300 px-3 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
            >
              Navigate
            </button>
          </div>
        </div>
      )}

      {/* Map Info */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs z-30">
        <h3 className="font-semibold text-sm mb-1">Interactive Map</h3>
        <p className="text-xs text-gray-600 mb-2">
          Showing {toilets.length} toilets in Delhi
        </p>
        <div className="text-xs text-gray-500">
          <p>• Click markers for details</p>
          <p>• Use +/- to zoom</p>
          <p>• Click navigate for Google Maps</p>
        </div>
      </div>
    </div>
  );
}
