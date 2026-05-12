"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MapPin, Navigation, AlertTriangle, X, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Emergency() {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "Police", number: "100", icon: Shield },
    { name: "Ambulance", number: "108", icon: Phone },
    { name: "Fire", number: "101", icon: AlertTriangle },
    { name: "Women Helpline", number: "1091", icon: Shield },
    { name: "Child Helpline", number: "1098", icon: Shield },
    { name: "Senior Citizen", number: "1291", icon: Shield }
  ]);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  const callEmergency = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const findNearestToilet = () => {
    if (userLocation) {
      window.location.href = `/map?lat=${userLocation.lat}&lng=${userLocation.lng}&emergency=true`;
    } else {
      window.location.href = "/map";
    }
  };

  const shareLocation = () => {
    if (navigator.share && userLocation) {
      navigator.share({
        title: "My Emergency Location",
        text: `I need help! My location is: https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`,
        url: `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`
      });
    } else {
      // Fallback - copy to clipboard
      const locationUrl = `https://www.google.com/maps?q=${userLocation?.lat || 28.6139},${userLocation?.lng || 77.2090}`;
      navigator.clipboard.writeText(locationUrl);
      alert("Location copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-red-50">
      {/* Emergency Header */}
      <div className="bg-red-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6" />
            <h1 className="text-xl font-bold">Emergency Mode</h1>
          </div>
          <Link href="/">
            <Button variant="secondary" size="sm">
              <X className="w-4 h-4 mr-1" />
              Exit Emergency
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <Phone className="w-5 h-5 mr-2" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>
                Call emergency services immediately
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {emergencyContacts.map((contact, index) => (
                  <Button
                    key={index}
                    onClick={() => callEmergency(contact.number)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <contact.icon className="w-4 h-4 mr-2" />
                    {contact.name}
                    <span className="ml-auto font-bold">{contact.number}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <MapPin className="w-5 h-5 mr-2" />
                Find Nearest Toilet
              </CardTitle>
              <CardDescription>
                Locate the closest public toilet urgently
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                {isLoading ? (
                  <p className="text-gray-600">Getting your location...</p>
                ) : userLocation ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">Location found!</p>
                    <Button
                      onClick={findNearestToilet}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      <Navigation className="w-5 h-5 mr-2" />
                      Find Nearest Toilet Now
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-600 mb-4">Location not available</p>
                    <Button
                      onClick={() => window.location.href = "/map"}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      <MapPin className="w-5 h-5 mr-2" />
                      View All Toilets
                    </Button>
                  </div>
                )}
              </div>

              <Button
                onClick={shareLocation}
                variant="outline"
                className="w-full"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Share My Location
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-700">
              <Clock className="w-5 h-5 mr-2" />
              Emergency Toilet Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Immediate Actions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    Look for nearby malls, metro stations, or hospitals
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    Ask local shopkeepers for nearest public toilet
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    Use the map to find the closest option
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    Call emergency services if medical assistance needed
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Quick Locations</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <strong>Metro Stations:</strong> Most have clean facilities
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <strong>Shopping Malls:</strong> Usually free and accessible
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <strong>Hospitals:</strong> 24/7 availability
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <strong>Petrol Pumps:</strong> Often have public toilets
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SOS Button */}
        <div className="text-center">
          <Button
            onClick={() => callEmergency("100")}
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-lg font-bold"
            size="lg"
          >
            <AlertTriangle className="w-6 h-6 mr-3" />
            SOS - CALL POLICE
          </Button>
          <p className="text-gray-600 mt-2">For immediate emergency assistance</p>
        </div>
      </div>
    </div>
  );
}
