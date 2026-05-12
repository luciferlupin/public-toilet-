"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Star } from "lucide-react";

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

interface MapProps {
  toilets: Toilet[];
  userLocation: { lat: number; lng: number } | null;
  selectedToilet: Toilet | null;
  onToiletSelect: (toilet: Toilet | null) => void;
}

export default function Map({ toilets, userLocation, selectedToilet, onToiletSelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    // This is a placeholder map implementation
    // In a real app, you would integrate with a mapping library like Leaflet or Google Maps
    if (mapRef.current && !map) {
      // Create a simple placeholder map
      const mapElement = mapRef.current;
      mapElement.innerHTML = `
        <div class="w-full h-full bg-gray-200 flex items-center justify-center relative">
          <div class="text-center">
            <div class="text-6xl mb-4">🗺️</div>
            <p class="text-gray-600">Interactive Map View</p>
            <p class="text-sm text-gray-500 mt-2">Showing ${toilets.length} toilets in Delhi</p>
          </div>
        </div>
      `;
      setMap(mapElement);
    }
  }, [toilets.length]);

  useEffect(() => {
    if (map && toilets.length > 0) {
      // Add toilet markers to the map
      const markersHtml = toilets.map((toilet, index) => {
        const isSelected = selectedToilet?.id === toilet.id;
        const ratingColor = toilet.overallRating >= 4 ? "green" : toilet.overallRating >= 3 ? "yellow" : "red";
        
        return `
          <div 
            class="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110"
            style="left: ${30 + (index * 60) % 80}%; top: ${20 + (index * 40) % 60}%;"
            onclick="window.selectToilet('${toilet.id}')"
          >
            <div class="relative">
              <div class="w-8 h-8 bg-${ratingColor}-500 rounded-full flex items-center justify-center text-white shadow-lg ${isSelected ? 'ring-4 ring-blue-400' : ''}">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium shadow whitespace-nowrap">
                ${toilet.overallRating}★
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Add user location marker
      const userMarker = userLocation ? `
        <div class="absolute transform -translate-x-1/2 -translate-y-1/2" style="left: 50%; top: 50%;">
          <div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        </div>
      ` : '';

      if (map) {
        map.innerHTML = `
          <div class="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 relative">
            <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
            ${markersHtml}
            ${userMarker}
            <div class="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
              <h3 class="font-semibold text-sm mb-1">Map View</h3>
              <p class="text-xs text-gray-600">Click on markers to view toilet details</p>
            </div>
          </div>
        `;
      }
    }
  }, [map, toilets, selectedToilet, userLocation]);

  // Add global function for marker clicks
  useEffect(() => {
    (window as any).selectToilet = (toiletId: string) => {
      const toilet = toilets.find(t => t.id === toiletId);
      if (toilet) {
        onToiletSelect(toilet);
      }
    };

    return () => {
      delete (window as any).selectToilet;
    };
  }, [toilets, onToiletSelect]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Selected Toilet Details Popup */}
      {selectedToilet && (
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 max-w-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{selectedToilet.name}</h3>
            <button 
              onClick={() => onToiletSelect(null)}
              className="text-gray-400 hover:text-gray-600"
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
            <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
              View Details
            </button>
            <button className="flex-1 border border-gray-300 px-3 py-2 rounded text-sm hover:bg-gray-50 transition-colors">
              Navigate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
