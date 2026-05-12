"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
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

interface LeafletMapProps {
  toilets: Toilet[];
  userLocation: { lat: number; lng: number } | null;
  selectedToilet: Toilet | null;
  onToiletSelect: (toilet: Toilet | null) => void;
}

export default function LeafletMap({ toilets, userLocation, selectedToilet, onToiletSelect }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadLeaflet = async () => {
      try {
        const L = await import('leaflet');
        
        // Fix for default markers in webpack/Next.js
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        if (!mapRef.current) return;

        // Default to Delhi center if no user location
        const center = userLocation 
          ? [userLocation.lat, userLocation.lng] as [number, number]
          : [28.6139, 77.2090] as [number, number];

        const leafletMap = L.map(mapRef.current).setView(center, userLocation ? 14 : 12);

        // Add OpenStreetMap tiles (free)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(leafletMap);

        setMap(leafletMap);
        setIsLoaded(true);
        setError(null);

      } catch (err) {
        console.error("Error loading Leaflet:", err);
        setError("Failed to load map. Please try again.");
        setIsLoaded(false);
      }
    };

    loadLeaflet();
  }, [userLocation]);

  useEffect(() => {
    if (!map || !isLoaded) return;

    const loadMarkers = async () => {
      try {
        const L = await import('leaflet');

        // Clear existing markers
        markers.forEach(marker => map.removeLayer(marker));
        setMarkers([]);

        // Add user location marker
        if (userLocation) {
          const userIcon = L.divIcon({
            html: `<div style="background: #3b82f6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
            className: 'user-location-marker',
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });

          const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
            .addTo(map)
            .bindPopup('Your Location');
          
          markers.push(userMarker);
        }

        // Add toilet markers
        const newMarkers: any[] = [];
        
        toilets.forEach((toilet) => {
          const isSelected = selectedToilet?.id === toilet.id;
          const rating = toilet.overallRating;
          
          let color = '#ef4444'; // red for low rating
          if (rating >= 4.5) color = '#22c55e'; // green for high rating
          else if (rating >= 3.5) color = '#eab308'; // yellow for medium rating

          const toiletIcon = L.divIcon({
            html: `
              <div style="
                background: ${color}; 
                width: ${isSelected ? '20px' : '16px'}; 
                height: ${isSelected ? '20px' : '16px'}; 
                border-radius: 50%; 
                border: 2px solid white; 
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 8px;
                color: white;
                font-weight: bold;
              ">
                🚽
              </div>
            `,
            className: 'toilet-marker',
            iconSize: [isSelected ? 24 : 20, isSelected ? 24 : 20],
            iconAnchor: [isSelected ? 12 : 10, isSelected ? 12 : 10],
          });

          const marker = L.marker([toilet.latitude, toilet.longitude], { icon: toiletIcon })
            .addTo(map);

          // Create popup content
          const popupContent = `
            <div style="max-width: 250px; padding: 8px; font-family: system-ui, -apple-system, sans-serif;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${toilet.name}</h3>
              <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${toilet.address}</p>
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="color: #fbbf24; margin-right: 4px;">★</span>
                <span style="font-weight: bold;">${toilet.overallRating}</span>
                <span style="color: #666; margin-left: 4px;">(${Math.floor(Math.random() * 50) + 10} reviews)</span>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px;">
                ${toilet.isFree ? '<span style="background: #dcfce7; color: #16a34a; padding: 2px 6px; border-radius: 4px; font-size: 12px;">Free</span>' : ''}
                ${toilet.isPaid ? `<span style="background: #dbeafe; color: #2563eb; padding: 2px 6px; border-radius: 4px; font-size: 12px;">₹${toilet.price}</span>` : ''}
                ${toilet.isWheelchairAccessible ? '<span style="background: #f3e8ff; color: #9333ea; padding: 2px 6px; border-radius: 4px; font-size: 12px;">Accessible</span>' : ''}
                ${toilet.hasBabyChangingStation ? '<span style="background: #fce7f3; color: #ec4899; padding: 2px 6px; border-radius: 4px; font-size: 12px;">Baby</span>' : ''}
                ${toilet.isOpen24_7 ? '<span style="background: #f3f4f6; color: #374151; padding: 2px 6px; border-radius: 4px; font-size: 12px;">24/7</span>' : ''}
                ${toilet.isVerified ? '<span style="background: #dcfce7; color: #16a34a; padding: 2px 6px; border-radius: 4px; font-size: 12px;">✓ Verified</span>' : ''}
              </div>
              <div style="display: flex; gap: 8px;">
                <button onclick="window.viewToiletDetails('${toilet.id}')" style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">View Details</button>
                <button onclick="window.navigateToToilet('${toilet.latitude}', '${toilet.longitude}')" style="background: #f3f4f6; color: #374151; border: none; padding: 6px 12px; border-radius: 4px; font-size: 12px; cursor: pointer;">Navigate</button>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent);

          marker.on('click', () => {
            onToiletSelect(toilet);
          });

          newMarkers.push(marker);
        });

        setMarkers([...markers, ...newMarkers]);

        // Center map on selected toilet
        if (selectedToilet) {
          map.setView([selectedToilet.latitude, selectedToilet.longitude], 16);
        }

        // Add global functions for popup buttons
        (window as any).viewToiletDetails = (toiletId: string) => {
          const toilet = toilets.find(t => t.id === toiletId);
          if (toilet) {
            onToiletSelect(toilet);
            window.location.href = `/toilet/${toiletId}`;
          }
        };

        (window as any).navigateToToilet = (lat: string, lng: string) => {
          const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
          window.open(url, "_blank");
        };

      } catch (err) {
        console.error("Error loading markers:", err);
      }
    };

    loadMarkers();

    return () => {
      // Cleanup global functions
      delete (window as any).viewToiletDetails;
      delete (window as any).navigateToToilet;
    };
  }, [map, toilets, userLocation, selectedToilet, isLoaded, markers, onToiletSelect]);

  const handleMyLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = [position.coords.latitude, position.coords.longitude] as [number, number];
          map.setView(pos, 15);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Unable to get your location");
        }
      );
    }
  };

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <div className="text-red-500 mb-4">
            <MapPin className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Map Error</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-[1000] space-y-2">
        <button
          onClick={handleMyLocation}
          className="bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
          title="My Location"
        >
          <Navigation className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      {/* Selected Toilet Details */}
      {selectedToilet && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-lg shadow-xl p-4 z-[1000]">
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
    </div>
  );
}
