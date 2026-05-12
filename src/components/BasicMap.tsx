"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Navigation, Star, X } from "lucide-react";

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
  lastCleanedAt: string;
  locationType: string;
}

interface BasicMapProps {
  toilets: Toilet[];
  userLocation: { lat: number; lng: number } | null;
  selectedToilet: Toilet | null;
  onToiletSelect: (toilet: Toilet | null) => void;
}

export default function BasicMap({ toilets, userLocation, selectedToilet, onToiletSelect }: BasicMapProps) {
  const [zoom, setZoom] = useState(12);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 });

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
    
    // Calculate relative position based on actual coordinates
    const latOffset = (toilet.latitude - baseLat) * 1000 * zoom;
    const lngOffset = (toilet.longitude - baseLng) * 1000 * zoom;
    
    // Convert to percentage position
    const top = 50 + latOffset;
    const left = 50 + lngOffset;
    
    return { top: `${top}%`, left: `${left}%` };
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-500";
    if (rating >= 3.5) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
          setZoom(15);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 1, 10));
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
      {/* Map Background Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: `${20 * (zoom / 12)}px ${20 * (zoom / 12)}px`,
        backgroundPosition: 'center center'
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
              <div className={`w-6 h-6 ${getRatingColor(toilet.overallRating)} rounded-full flex items-center justify-center text-white shadow-lg ${
                isSelected ? 'ring-4 ring-blue-400 ring-offset-2' : ''
              }`}>
                <MapPin className="w-3 h-3" />
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
                        const url = `https://www.google.com/maps/dir/?api=1&destination=${toilet.latitude},${toilet.longitude}`;
                        window.open(url, "_blank");
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Navigation className="w-3 h-3" />
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
          onClick={handleZoomIn}
          className="bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        {userLocation && (
          <button
            onClick={handleMyLocation}
            className="bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50"
          >
            <Navigation className="w-4 h-4 text-blue-600" />
          </button>
        )}
      </div>

      {/* Selected Toilet Details */}
      {selectedToilet && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-lg shadow-xl p-4 z-40">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg">{selectedToilet.name}</h3>
            <button 
              onClick={() => onToiletSelect(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
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
              onClick={() => {
                const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedToilet.latitude},${selectedToilet.longitude}`;
                window.open(url, "_blank");
              }}
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
