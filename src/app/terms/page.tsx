import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
          <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                By accessing and using Toilet Finder, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Toilet Finder is a platform that helps users locate clean public toilets in Delhi. We provide information about toilet locations, ratings, and user reviews.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. User Account</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You must provide accurate information when creating an account</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You must notify us immediately of any unauthorized use</li>
                <li>You may not create multiple accounts for the same person</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. User Conduct</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Post false or misleading information</li>
                <li>Harass or abuse other users</li>
                <li>Post inappropriate content</li>
                <li>Violate any applicable laws</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Content and Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Users may post reviews and ratings for public toilets</li>
                <li>We reserve the right to remove inappropriate content</li>
                <li>You retain ownership of your content but grant us license to use it</li>
                <li>Reviews must be based on actual experiences</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Service Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We strive to keep the service available, but we do not guarantee uninterrupted access. The service may be temporarily unavailable for maintenance or other reasons.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Toilet Finder is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                If you have questions about these Terms and Conditions, please contact us at support@toiletfinder.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
