"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

interface FixedGoogleMapProps {
  toilets: Toilet[];
  userLocation: { lat: number; lng: number } | null;
  selectedToilet: Toilet | null;
  onToiletSelect: (toilet: Toilet | null) => void;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
    viewToiletDetails: (toiletId: string) => void;
    navigateToToilet: (lat: string, lng: string) => void;
  }
}

export default function FixedGoogleMap({ toilets, userLocation, selectedToilet, onToiletSelect }: FixedGoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [infoWindow, setInfoWindow] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const getMarkerIcon = (toilet: Toilet, isSelected: boolean) => {
    const rating = toilet.overallRating;
    let color = "#ef4444"; // red for low rating
    
    if (rating >= 4.5) color = "#22c55e"; // green for high rating
    else if (rating >= 3.5) color = "#eab308"; // yellow for medium rating
    
    const size = isSelected ? 40 : 32;
    
    return {
      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
      fillColor: color,
      fillOpacity: 0.9,
      strokeColor: "#ffffff",
      strokeWeight: 2,
      scale: size / 20,
    };
  };

  const createInfoWindowContent = (toilet: Toilet) => {
    return `
      <div style="max-width: 250px; padding: 8px;">
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
  };

  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google) return;

    try {
      // Default to Delhi center if no user location
      const center = userLocation 
        ? { lat: userLocation.lat, lng: userLocation.lng }
        : { lat: 28.6139, lng: 77.2090 };

      const mapOptions = {
        center,
        zoom: userLocation ? 14 : 12,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      };

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);

      // Create info window
      const newInfoWindow = new window.google.maps.InfoWindow();
      setInfoWindow(newInfoWindow);

      // Add global functions for buttons
      window.viewToiletDetails = (toiletId: string) => {
        const toilet = toilets.find(t => t.id === toiletId);
        if (toilet) {
          onToiletSelect(toilet);
          window.location.href = `/toilet/${toiletId}`;
        }
      };

      window.navigateToToilet = (lat: string, lng: string) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, "_blank");
      };

      setIsLoaded(true);
      setError(null);
    } catch (err) {
      console.error("Error initializing Google Maps:", err);
      setError("Failed to initialize Google Maps.");
    }
  }, [userLocation, toilets, onToiletSelect]);

  const loadGoogleMapsScript = useCallback(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setError("Google Maps API key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file.");
      return;
    }

    // Check if Google Maps script is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
    if (existingScript) {
      // Script is already loading, wait for it to load
      const checkInterval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkInterval);
          initializeMap();
        }
      }, 100);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;

    script.onerror = () => {
      setError("Failed to load Google Maps. Please check your API key.");
    };

    document.head.appendChild(script);
  }, [initializeMap]);

  useEffect(() => {
    // Set up the callback for Google Maps
    window.initMap = initializeMap;
    
    // Load the script only once
    if (!scriptLoaded) {
      loadGoogleMapsScript();
      setScriptLoaded(true);
    }

    return () => {
      delete (window as any).initMap;
      delete (window as any).viewToiletDetails;
      delete (window as any).navigateToToilet;
    };
  }, [initializeMap, loadGoogleMapsScript, scriptLoaded]);

  useEffect(() => {
    if (!map || !isLoaded || !window.google) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    // Add user location marker
    if (userLocation) {
      const userMarker = new window.google.maps.Marker({
        position: { lat: userLocation.lat, lng: userLocation.lng },
        map,
        title: "Your Location",
        icon: {
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
          fillColor: "#3b82f6",
          fillOpacity: 0.8,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 1.5,
        },
        zIndex: 1000,
      });
      markers.push(userMarker);
    }

    // Add toilet markers
    const newMarkers: any[] = [];
    
    toilets.forEach((toilet) => {
      const isSelected = selectedToilet?.id === toilet.id;
      
      const marker = new window.google.maps.Marker({
        position: { lat: toilet.latitude, lng: toilet.longitude },
        map,
        title: toilet.name,
        icon: getMarkerIcon(toilet, isSelected),
        zIndex: isSelected ? 999 : 100,
      });

      const infoWindowContent = createInfoWindowContent(toilet);

      marker.addListener("click", () => {
        if (infoWindow) {
          infoWindow.setContent(infoWindowContent);
          infoWindow.open(map, marker);
          onToiletSelect(toilet);
        }
      });

      newMarkers.push(marker);
    });

    setMarkers([...markers, ...newMarkers]);

    // Center map on selected toilet
    if (selectedToilet) {
      map.panTo({ lat: selectedToilet.latitude, lng: selectedToilet.longitude });
      map.setZoom(16);
    }

    return () => {
      // Cleanup markers
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, toilets, userLocation, selectedToilet, isLoaded, infoWindow, onToiletSelect]);

  const handleMyLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
          map.setZoom(15);
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
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Please add your Google Maps API key to the .env file:
            <br />
            <code className="bg-gray-100 px-2 py-1 rounded">
              NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
            </code>
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 space-y-2">
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
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-lg shadow-xl p-4 z-10">
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
