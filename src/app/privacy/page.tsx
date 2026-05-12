import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Account Information:</strong> Name, email, phone number when you create an account</li>
                <li><strong>Location Data:</strong> Your current location to find nearby toilets</li>
                <li><strong>Usage Data:</strong> How you interact with our app and features</li>
                <li><strong>Reviews and Ratings:</strong> Your contributions to toilet reviews</li>
                <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>To provide and improve our toilet finder service</li>
                <li>To personalize your experience and show relevant toilets</li>
                <li>To process your reviews and contributions</li>
                <li>To communicate with you about service updates</li>
                <li>To analyze usage patterns to improve our app</li>
                <li>To ensure security and prevent fraud</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">We do not sell your personal information. We may share your information only in the following circumstances:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Public Reviews:</strong> Your reviews and ratings are visible to other users</li>
                <li><strong>Service Providers:</strong> With trusted third parties who help operate our service</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Update or correct your information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to processing of your information</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We use your location data to find nearby public toilets and provide turn-by-turn directions. Location data is only used while you're actively using the app and is not stored permanently unless you choose to save favorite locations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We use cookies and similar technologies to enhance your experience, remember your preferences, and analyze app usage. You can control cookies through your browser settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 text-gray-700">
                <p>Email: privacy@toiletfinder.com</p>
                <p>Address: Delhi, India</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
