import React, { useState } from 'react';
import PaymentForm from './payment-form';
import type { PaymentConfig, PaymentResponse } from './payment-api';

const PaymentDebug: React.FC = () => {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [response, setResponse] = useState<PaymentResponse | null>(null);

  const paymentConfig: PaymentConfig = {
    sessionToken: 'admin_MO687031821sdd1MAWKcwQkOSl',
    applicationKey: 'app_144s9ypK9XoDwHC9rWavGFzpprQhHvMjOEKGP',
    baseUrl: 'https://dev1.blockchanger.io'
  };

  const handlePaymentSuccess = (paymentResponse: PaymentResponse) => {
    console.log('Payment successful:', paymentResponse);
    setResponse(paymentResponse);
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment failed:', error);
    setResponse({
      success: false,
      error,
      status: 'error'
    });
  };

  const handleFormDataChange = (formData: any) => {
    console.log('Form data changed:', formData);
    setPaymentData(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Payment Debug - BlockChanger API</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Payment Form</h2>
          <PaymentForm
            config={paymentConfig}
            merchantIdentifier="mid-A144-U1697-wWxxob29NxcEgdXUFGbhQMtjwkDgPK"
            redirectUrl="https://demo.io/"
            postbackUrl="https://webhook.site/aa54561b-7dc4-4c14-8f09-ee9959f9e1a6"
            amount="5.00"
            currency="USD"
            description="Description Customer"
            descriptor="Some Payment"
            param="Pass-through-Param-test"
            paymentStatus="approved"
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onFormDataChange={handleFormDataChange}
            submit={{
              text: "Process Payment",
              loadingText: "Processing...",
              styles: "w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            }}
            className="space-y-4"
          />
        </div>

        {/* Debug Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Expected API Request:</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
{`{
  "merchant_identifier": "mid-A144-U1697-wWxxob29NxcEgdXUFGbhQMtjwkDgPK",
  "currency": "USD",
  "ccn": "4412397212080000",
  "exp_month": "03",
  "exp_year": "2027",
  "cvc_code": "003",
  "email": "demo@gmail.com",
  "phone_number": "13059995184",
  "ip": "87.228.193.251",
  "first_name": "dan",
  "last_name": "lorans",
  "amount": "5",
  "city": "Limassol",
  "state": "Cyprus",
  "country": "US",
  "region": "Cyprus",
  "zip_code": "3041",
  "address": "104 greeko st",
  "redirect_url": "https://demo.io/",
  "postback_url": "https://webhook.site/aa54561b-7dc4-4c14-8f09-ee9959f9e1a6",
  "description": "Description Customer",
  "descriptor": "Some Payment",
  "param": "Pass-through-Param-test",
  "payment_status": "approved"
}`}
              </pre>
            </div>

            {paymentData && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Current Form Data:</h3>
                <pre className="bg-blue-50 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(paymentData, null, 2)}
                </pre>
              </div>
            )}

            {response && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">API Response:</h3>
                <pre className={`p-3 rounded text-sm overflow-auto ${
                  response.success ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">Test Instructions:</h3>
        <ol className="text-yellow-700 space-y-1 text-sm">
          <li>1. Fill in the payment form with the test data</li>
          <li>2. Use test card: 4412397212080000, Exp: 03/2027, CVC: 003</li>
          <li>3. Select country from dropdown (ISO codes will be sent: US, GB, DE, etc.)</li>
          <li>4. Submit the form and check the console for the actual API request</li>
          <li>5. Verify that all required properties are included</li>
        </ol>
      </div>
    </div>
  );
};

export default PaymentDebug; 