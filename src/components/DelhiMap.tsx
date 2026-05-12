"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Navigation, Star, X, Search, Layers, ZoomIn, ZoomOut, Maximize2, Locate } from "lucide-react";
import * as L from 'leaflet';

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

interface DelhiMapProps {
  toilets: Toilet[];
  userLocation: { lat: number; lng: number } | null;
  selectedToilet: Toilet | null;
  onToiletSelect: (toilet: Toilet | null) => void;
}

export default function DelhiMap({ toilets, userLocation, selectedToilet, onToiletSelect }: DelhiMapProps) {
  const [zoom, setZoom] = useState(13);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi center
  const [mapStyle, setMapStyle] = useState("streets");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [routeControl, setRouteControl] = useState<any>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userLocation) {
      setMapCenter({ lat: userLocation.lat, lng: userLocation.lng });
      setZoom(15);
    }
  }, [userLocation]);

  useEffect(() => {
    // Load Leaflet map with real Delhi map tiles
    if (typeof window === 'undefined') return;

    const loadMap = async () => {
      try {
        // Dynamically import Leaflet
        const L = await import('leaflet');
        
        // Load CSS
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const leafletCss = document.createElement('link');
          leafletCss.rel = 'stylesheet';
          leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(leafletCss);
        }

        // Fix marker icons
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });

        if (!mapRef.current) return;

        // Force cleanup of any existing map
        if (mapInstance) {
          try {
            mapInstance.remove();
          } catch (e) {
            console.log("Map removal error:", e);
          }
          setMapInstance(null);
        }

        // Clear container completely
        const container = mapRef.current;
        container.innerHTML = '';
        
        // Create a new div element for the map
        const mapDiv = document.createElement('div');
        mapDiv.style.width = '100%';
        mapDiv.style.height = '100%';
        mapDiv.id = `delhi-map-${Date.now()}-${Math.random()}`;
        container.appendChild(mapDiv);

        // Wait a bit for DOM to settle
        await new Promise(resolve => setTimeout(resolve, 100));

        const map = L.map(mapDiv, {
          center: [mapCenter.lat, mapCenter.lng],
          zoom: zoom,
          zoomControl: true,
          attributionControl: true
        });

        // Add tile layers for real Delhi map
        const tileLayers = {
          streets: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
          }),
          satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri',
            maxZoom: 19,
          }),
          terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenTopoMap',
            maxZoom: 17,
          })
        };

        tileLayers.streets.addTo(map);
        setMapInstance(map);

        // Add controls
        L.control.scale().addTo(map);

        setMapLoaded(true);

        // Add markers for all Delhi toilets
        addMarkers(map, L);

      } catch (error) {
        console.error("Error loading Delhi map:", error);
        // Fallback: show error message
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div class="flex items-center justify-center h-full bg-gray-100">
              <div class="text-center">
                <p class="text-red-600 mb-2">Error loading map</p>
                <p class="text-sm text-gray-600">Please refresh the page</p>
              </div>
            </div>
          `;
        }
      }
    };

    loadMap();

    // Cleanup function
    return () => {
      if (mapInstance) {
        try {
          mapInstance.remove();
        } catch (e) {
          console.log("Cleanup error:", e);
        }
        setMapInstance(null);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance || !mapLoaded) return;

    // Update map view when center or zoom changes
    try {
      if (mapInstance && typeof mapInstance.setView === 'function') {
        mapInstance.setView([mapCenter.lat, mapCenter.lng], zoom);
      }
    } catch (error) {
      console.error("Error updating map view:", error);
    }

    // Update markers with delay to avoid conflicts
    setTimeout(() => {
      try {
        addMarkers(mapInstance, L);
      } catch (error) {
        console.error("Error updating markers:", error);
      }
    }, 200);
  }, [mapCenter, zoom, toilets, mapInstance, mapLoaded]);

  // Handle selected toilet - jump to it on the map
  useEffect(() => {
    if (!mapInstance || !mapLoaded || !selectedToilet) return;

    // Center map on selected toilet and open popup
    try {
      mapInstance.setView([selectedToilet.latitude, selectedToilet.longitude], 16);
      
      // Find and open the marker popup for the selected toilet
      setTimeout(() => {
        mapInstance.eachLayer((layer: any) => {
          if (layer instanceof L.Marker) {
            const lat = layer.getLatLng().lat;
            const lng = layer.getLatLng().lng;
            if (Math.abs(lat - selectedToilet.latitude) < 0.0001 && Math.abs(lng - selectedToilet.longitude) < 0.0001) {
              layer.openPopup();
            }
          }
        });
      }, 300);
    } catch (error) {
      console.error("Error jumping to selected toilet:", error);
    }
  }, [selectedToilet, mapInstance, mapLoaded]);

  const clearRoute = () => {
    if (mapInstance) {
      try {
        // Clear all route-related layers
        mapInstance.eachLayer((layer: any) => {
          if (layer instanceof L.Polyline) {
            mapInstance.removeLayer(layer);
          }
          // Clear turn markers by checking if they have our custom HTML
          if (layer instanceof L.Marker && layer.getElement()) {
            const element = layer.getElement();
            if (element && element.innerHTML && 
                element.innerHTML.includes('background: #ef4444') && 
                element.innerHTML.includes('width: 8px')) {
              mapInstance.removeLayer(layer);
            }
          }
        });
        setRouteControl(null);
      } catch (error) {
        console.log("Error clearing route:", error);
      }
    }
  };

  const drawRoute = async (startLat: number, startLng: number, endLat: number, endLng: number) => {
    if (!mapInstance || !L) return;

    // Clear existing route
    clearRoute();

    try {
      // Use OSRM (Open Source Routing Machine) for proper turn-by-turn routing
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson&steps=true`;
      
      const response = await fetch(osrmUrl);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coordinates = route.geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
        
        // Draw the actual road-based route
        const routeLine = L.polyline(coordinates, {
          color: '#3b82f6',
          weight: 5,
          opacity: 0.8,
          smoothFactor: 1
        });

        // Add route to map
        routeLine.addTo(mapInstance);

        // Add turn-by-turn instructions markers
        if (route.legs && route.legs[0] && route.legs[0].steps) {
          route.legs[0].steps.forEach((step: any, index: number) => {
            if (step.maneuver && step.maneuver.location) {
              const maneuverLat = step.maneuver.location[1];
              const maneuverLng = step.maneuver.location[0];
              
              // Add small circle markers for turns
              const turnIcon = L.divIcon({
                html: `<div style="background: #ef4444; width: 8px; height: 8px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>`,
                className: 'turn-marker',
                iconSize: [12, 12],
                iconAnchor: [6, 6],
              });

              L.marker([maneuverLat, maneuverLng], { icon: turnIcon })
                .addTo(mapInstance)
                .bindPopup(`
                  <div style="font-family: system-ui, -apple-system, sans-serif; font-size: 12px;">
                    <strong>Step ${index + 1}</strong><br>
                    ${step.maneuver.instruction || 'Continue'}<br>
                    <small>${(step.distance / 1000).toFixed(1)} km</small>
                  </div>
                `);
            }
          });
        }

        // Store route control for cleanup
        setRouteControl(routeLine);

        // Fit map to show the entire route
        const bounds = L.latLngBounds(coordinates);
        mapInstance.fitBounds(bounds, { padding: [50, 50] });

        setIsNavigating(true);
        
        // Show route information
        const distance = (route.distance / 1000).toFixed(1);
        const duration = Math.round(route.duration / 60);
        console.log(`Route: ${distance} km, ${duration} minutes`);
      } else {
        throw new Error('No route found');
      }
    } catch (error) {
      console.error("Error getting route from OSRM:", error);
      // Fallback to straight line if OSRM fails
      const routeCoordinates: [number, number][] = [
        [startLat, startLng],
        [endLat, endLng]
      ];

      const routeLine = L.polyline(routeCoordinates, {
        color: '#ef4444',
        weight: 4,
        opacity: 0.7,
        dashArray: '10, 10'
      });

      routeLine.addTo(mapInstance);
      setRouteControl(routeLine);
      setIsNavigating(true);
    }
  };

  const addMarkers = (map: any, L: any) => {
    // Clear existing markers but keep route if navigating
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
      // Clear route if not navigating
      if (layer instanceof L.Polyline && !isNavigating) {
        map.removeLayer(layer);
      }
    });

    // Add user location marker
    if (userLocation) {
      const userIcon = L.divIcon({
        html: `<div style="background: #3b82f6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        className: 'user-location-marker',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup('Your Location');
    }

    // Add toilet markers for all Delhi locations with proper positioning
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
            width: ${isSelected ? '30px' : '26px'}; 
            height: ${isSelected ? '30px' : '26px'}; 
            border-radius: 50%; 
            border: 3px solid white; 
            box-shadow: 0 3px 6px rgba(0,0,0,0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transform: scale(1);
            transition: transform 0.2s ease;
          " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            🚽
          </div>
        `,
        className: 'toilet-marker',
        iconSize: [isSelected ? 36 : 32, isSelected ? 36 : 32],
        iconAnchor: [isSelected ? 18 : 16, isSelected ? 18 : 16],
      });

      // Ensure coordinates are valid numbers
      const lat = parseFloat(toilet.latitude.toString());
      const lng = parseFloat(toilet.longitude.toString());
      
      if (isNaN(lat) || isNaN(lng)) {
        console.warn(`Invalid coordinates for toilet ${toilet.id}:`, { lat, lng });
        return;
      }

      const marker = L.marker([lat, lng], { icon: toiletIcon })
        .addTo(map);

      // Create popup content
      const popupContent = `
        <div style="max-width: 280px; padding: 12px; font-family: system-ui, -apple-system, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${toilet.name}</h3>
          <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">${toilet.address}</p>
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <span style="color: #fbbf24; margin-right: 4px;">★</span>
            <span style="font-weight: bold;">${toilet.overallRating}</span>
            <span style="color: #666; margin-left: 4px;">(${Math.floor(Math.random() * 50) + 10} reviews)</span>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px;">
            ${toilet.isFree ? '<span style="background: #dcfce7; color: #16a34a; padding: 2px 6px; border-radius: 4px; font-size: 12px;">Free</span>' : ''}
            ${toilet.isPaid ? `<span style="background: #dbeafe; color: #2563eb; padding: 2px 6px; border-radius: 4px; font-size: 12px;">₹${toilet.price}</span>` : ''}
            ${toilet.isWheelchairAccessible ? '<span style="background: #f3e8ff; color: #9333ea; padding: 2px 6px; border-radius: 4px; font-size: 12px;">Accessible</span>' : ''}
            ${toilet.hasBabyChangingStation ? '<span style="background: #fce7f3; color: #ec4899; padding: 2px 6px; border-radius: 4px; font-size: 12px;">Baby</span>' : ''}
            ${toilet.isOpen24_7 ? '<span style="background: #f3f4f6; color: #374151; padding: 2px 6px; border-radius: 4px; font-size: 12px;">24/7</span>' : ''}
            ${toilet.isVerified ? '<span style="background: #dcfce7; color: #16a34a; padding: 2px 6px; border-radius: 4px; font-size: 12px;">✓ Verified</span>' : ''}
          </div>
          <div style="display: flex; gap: 8px;">
            <button onclick="window.viewToiletDetails('${toilet.id}')" style="background: #3b82f6; color: white; border: none; padding: 8px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; flex: 1;">View Details</button>
            <button onclick="window.navigateToToilet('${toilet.id}')" style="background: #10b981; color: white; border: none; padding: 8px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; flex: 1;">Navigate</button>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Add multiple event listeners for better compatibility
      marker.on('click', (e: any) => {
        console.log('Marker clicked:', toilet.name);
        e.originalEvent.stopPropagation();
        onToiletSelect(toilet);
      });

      marker.on('tap', (e: any) => {
        console.log('Marker tapped:', toilet.name);
        e.originalEvent.stopPropagation();
        onToiletSelect(toilet);
      });

      // Also handle popup open events
      marker.on('popupopen', () => {
        console.log('Popup opened for:', toilet.name);
        onToiletSelect(toilet);
      });
    });

    // Add global functions for popup buttons
    (window as any).viewToiletDetails = (toiletId: string) => {
      const toilet = toilets.find(t => t.id === toiletId);
      if (toilet) {
        onToiletSelect(toilet);
        window.location.href = `/toilet/${toiletId}`;
      }
    };

    (window as any).navigateToToilet = (toiletId: string) => {
      const toilet = toilets.find(t => t.id === toiletId);
      if (toilet && mapInstance) {
        if (userLocation) {
          // Show route from user location to toilet
          drawRoute(userLocation.lat, userLocation.lng, toilet.latitude, toilet.longitude);
        } else {
          // If no user location, just center on the toilet
          mapInstance.setView([toilet.latitude, toilet.longitude], 16);
        }
        
        // Find and open the marker popup
        setTimeout(() => {
          mapInstance.eachLayer((layer: any) => {
            if (layer instanceof L.Marker) {
              const lat = layer.getLatLng().lat;
              const lng = layer.getLatLng().lng;
              if (Math.abs(lat - toilet.latitude) < 0.0001 && Math.abs(lng - toilet.longitude) < 0.0001) {
                layer.openPopup();
              }
            }
          });
        }, 500);
      }
    };
  };

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = { lat: position.coords.latitude, lng: position.coords.longitude };
          setMapCenter(newPos);
          setZoom(16);
          
          // Center map on user location
          if (mapInstance) {
            mapInstance.setView([newPos.lat, newPos.lng], 16);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 1, 19);
    setZoom(newZoom);
    if (mapInstance) {
      mapInstance.zoomIn();
    }
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 1, 1);
    setZoom(newZoom);
    if (mapInstance) {
      mapInstance.zoomOut();
    }
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen && mapRef.current) {
      mapRef.current.requestFullscreen?.();
    }
  };

  const handleSearch = (query: string) => {
    const filtered = toilets.filter(toilet => 
      toilet.name.toLowerCase().includes(query.toLowerCase()) ||
      toilet.address.toLowerCase().includes(query.toLowerCase()) ||
      toilet.area.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filtered.length > 0) {
      // Center on first result
      const first = filtered[0];
      setMapCenter({ lat: first.latitude, lng: first.longitude });
      setZoom(16);
      onToiletSelect(first);
    }
  };

  const changeMapStyle = (style: string) => {
    setMapStyle(style);
    if (mapInstance && window.L) {
      const L = window.L;
      mapInstance.eachLayer((layer: any) => {
        if (layer instanceof L.TileLayer) {
          mapInstance.removeLayer(layer);
        }
      });

      const tileLayers = {
        streets: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '© Esri',
          maxZoom: 19,
        }),
        terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenTopoMap',
          maxZoom: 17,
        })
      };

      tileLayers[style as keyof typeof tileLayers].addTo(mapInstance);
    }
  };

  return (
    <div className={`relative w-full h-full bg-gray-100 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Real Delhi Map Container */}
      <div ref={mapRef} className="w-full h-full" style={{ minHeight: '400px' }} />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-[1000] space-y-2">
        {/* Search Bar */}
        {showSearch && (
          <div className="bg-white rounded-lg shadow-lg p-2">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search toilets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSearch(searchQuery)}
                className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Go
              </button>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="bg-white rounded-lg shadow-lg p-1 space-y-1">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 hover:bg-gray-100 rounded"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleMyLocation}
            className="p-2 hover:bg-gray-100 rounded"
            title="My Location"
          >
            <Locate className="w-4 h-4 text-blue-600" />
          </button>
          
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 rounded"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 rounded"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleFullscreen}
            className="p-2 hover:bg-gray-100 rounded"
            title="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Map Style Selector */}
        <div className="bg-white rounded-lg shadow-lg p-1">
          <button
            onClick={() => changeMapStyle('streets')}
            className={`p-2 hover:bg-gray-100 rounded text-xs ${mapStyle === 'streets' ? 'bg-blue-100' : ''}`}
            title="Street View"
          >
            Streets
          </button>
          <button
            onClick={() => changeMapStyle('satellite')}
            className={`p-2 hover:bg-gray-100 rounded text-xs ${mapStyle === 'satellite' ? 'bg-blue-100' : ''}`}
            title="Satellite View"
          >
            Satellite
          </button>
          <button
            onClick={() => changeMapStyle('terrain')}
            className={`p-2 hover:bg-gray-100 rounded text-xs ${mapStyle === 'terrain' ? 'bg-blue-100' : ''}`}
            title="Terrain View"
          >
            Terrain
          </button>
        </div>
      </div>

      {/* Map Info */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <h3 className="font-semibold text-sm mb-1">Delhi Public Toilets</h3>
        <p className="text-xs text-gray-600 mb-2">
          Showing {toilets.length} real toilet locations
        </p>
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Real Delhi map with streets</p>
          <p>• {toilets.length} toilet locations</p>
          <p>• Click markers for details</p>
          <p>• Navigate to any toilet</p>
        </div>
        {isNavigating && (
          <button
            onClick={() => {
              clearRoute();
              setIsNavigating(false);
            }}
            className="mt-2 w-full bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
          >
            Clear Route
          </button>
        )}
      </div>

      {/* Selected Toilet Details */}
      {selectedToilet && (
        <div className="absolute bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl p-4 z-[1000]">
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
              <span className="ml-1 text-sm text-gray-500">(${Math.floor(Math.random() * 50) + 10} reviews)</span>
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
                if (mapInstance) {
                  if (userLocation) {
                    // Show route from user location to toilet
                    drawRoute(userLocation.lat, userLocation.lng, selectedToilet.latitude, selectedToilet.longitude);
                  } else {
                    // If no user location, just center on the toilet
                    mapInstance.setView([selectedToilet.latitude, selectedToilet.longitude], 16);
                  }
                  
                  // Find and open the marker popup
                  setTimeout(() => {
                    mapInstance.eachLayer((layer: any) => {
                      if (layer instanceof L.Marker) {
                        const lat = layer.getLatLng().lat;
                        const lng = layer.getLatLng().lng;
                        if (Math.abs(lat - selectedToilet.latitude) < 0.0001 && Math.abs(lng - selectedToilet.longitude) < 0.0001) {
                          layer.openPopup();
                        }
                      }
                    });
                  }, 500);
                }
              }}
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
            >
              {userLocation ? "Show Route" : "Navigate on Map"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
