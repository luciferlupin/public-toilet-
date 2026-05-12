"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Camera, Upload, X, Navigation, Star, Clock, DollarSign, Baby, Accessibility, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function AddToilet() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    area: "",
    description: "",
    latitude: "",
    longitude: "",
    isFree: true,
    price: "",
    isMale: true,
    isFemale: false,
    isUnisex: false,
    isWheelchairAccessible: false,
    hasBabyChangingStation: false,
    hasShower: false,
    isOpen24_7: false,
    openingTime: "",
    closingTime: "",
    contactNumber: "",
    locationType: "public"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          }));
        },
        (error) => {
          alert("Could not get your location. Please enter manually.");
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      alert("Toilet added successfully! Thank you for contributing to the community.");
      window.location.href = "/map";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Toilet Finder</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/map">
                <Button variant="ghost">Map</Button>
              </Link>
              <Link href="/">
                <Button variant="ghost">Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Toilet</h1>
          <p className="text-gray-600">Help the community by adding a public toilet location</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Provide details about the toilet location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Toilet Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Central Park Public Toilet"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Full address of the toilet"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area *</label>
                  <Input
                    value={formData.area}
                    onChange={(e) => handleInputChange("area", e.target.value)}
                    placeholder="e.g., Connaught Place"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location Type</label>
                  <select
                    value={formData.locationType}
                    onChange={(e) => handleInputChange("locationType", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="public">Public Toilet</option>
                    <option value="metro">Metro Station</option>
                    <option value="mall">Shopping Mall</option>
                    <option value="hospital">Hospital</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="park">Park</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Additional details about the toilet"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location Details
              </CardTitle>
              <CardDescription>Provide GPS coordinates or get current location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Latitude *</label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => handleInputChange("latitude", e.target.value)}
                    placeholder="28.6139"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Longitude *</label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => handleInputChange("longitude", e.target.value)}
                    placeholder="77.2090"
                    required
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={getCurrentLocation}
                variant="outline"
                className="w-full"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Use Current Location
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features & Accessibility</CardTitle>
              <CardDescription>Select all applicable features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Access Type</label>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isMale}
                      onChange={(e) => handleInputChange("isMale", e.target.checked)}
                      className="mr-2"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isFemale}
                      onChange={(e) => handleInputChange("isFemale", e.target.checked)}
                      className="mr-2"
                    />
                    <span>Female</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isUnisex}
                      onChange={(e) => handleInputChange("isUnisex", e.target.checked)}
                      className="mr-2"
                    />
                    <span>Unisex</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Accessibility Features</label>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isWheelchairAccessible}
                      onChange={(e) => handleInputChange("isWheelchairAccessible", e.target.checked)}
                      className="mr-2"
                    />
                    <Accessibility className="w-4 h-4 mr-1" />
                    <span>Wheelchair Accessible</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hasBabyChangingStation}
                      onChange={(e) => handleInputChange("hasBabyChangingStation", e.target.checked)}
                      className="mr-2"
                    />
                    <Baby className="w-4 h-4 mr-1" />
                    <span>Baby Changing Station</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.hasShower}
                      onChange={(e) => handleInputChange("hasShower", e.target.checked)}
                      className="mr-2"
                    />
                    <Droplets className="w-4 h-4 mr-1" />
                    <span>Shower Facility</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Pricing</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="pricing"
                      checked={formData.isFree}
                      onChange={() => handleInputChange("isFree", true)}
                      className="mr-2"
                    />
                    <span>Free</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="pricing"
                      checked={!formData.isFree}
                      onChange={() => handleInputChange("isFree", false)}
                      className="mr-2"
                    />
                    <span>Paid</span>
                  </label>
                  {!formData.isFree && (
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        placeholder="Price in ₹"
                        className="w-24"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Operating Hours</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isOpen24_7}
                      onChange={(e) => handleInputChange("isOpen24_7", e.target.checked)}
                      className="mr-2"
                    />
                    <Clock className="w-4 h-4 mr-1" />
                    <span>24/7</span>
                  </label>
                  {!formData.isOpen24_7 && (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={formData.openingTime}
                        onChange={(e) => handleInputChange("openingTime", e.target.value)}
                        placeholder="Opening"
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={formData.closingTime}
                        onChange={(e) => handleInputChange("closingTime", e.target.value)}
                        placeholder="Closing"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <Input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                  placeholder="For inquiries"
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Photos
              </CardTitle>
              <CardDescription>Add photos to help others identify the location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <Button type="button" variant="outline" asChild>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        Choose Photos
                      </label>
                    </Button>
                    <p className="text-sm text-gray-600">or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-between">
            <Link href="/">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding Toilet..." : "Add Toilet"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
