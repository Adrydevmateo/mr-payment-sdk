import PaymentForm from "./payment/payment-form";
import type { PaymentResponse, PaymentRequest } from "./payment/payment-api";
import { useState } from "react";

function App() {
	const handlePaymentSuccess = (response: PaymentResponse) => {
		console.log("Payment successful:", response);
		alert(`Payment successful! Transaction ID: ${response.transaction_id}`);
	};

	const handlePaymentError = (error: string) => {
		console.error("Payment failed:", error);
		alert(`Payment failed: ${error}`);
	};

	// Example configuration - replace with your actual credentials
	const paymentConfig = {
		sessionToken: 'admin_MO687031821sdd1MAWKcwQkOSl',
		applicationKey: 'app_144s9ypK9XoDwHC9rWavGFzpprQhHvMjOEKGP', // Required
		baseUrl: 'https://dev1.blockchanger.io'
	};

	// Merchant ID - Required for payment processing
	const merchantIdentifier = "mid-A144-U1697-wWxxob29NxcEgdXUFGbhQMtjwkDgPK";

	// Validate required configuration
	const isConfigValid = paymentConfig.applicationKey && 
		paymentConfig.sessionToken && 
		merchantIdentifier && 
		merchantIdentifier.trim() !== '';

	// Example controlled form data (optional)
	const [controlledFormData, setControlledFormData] = useState<Partial<PaymentRequest>>({
		first_name: 'John',
		last_name: 'Doe',
		email: 'john.doe@example.com',
    amount: '5.00',
    currency: 'USD',
	});

	const handleControlledChange = (field: keyof PaymentRequest, value: string) => {
		setControlledFormData(prev => ({ ...prev, [field]: value }));
		console.log(`Controlled field changed: ${field} = ${value}`);
	};

	if (!isConfigValid) {
		return (
			<div className="min-h-screen bg-gray-50 py-8">
				<div className="max-w-4xl mx-auto px-4">
					<h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
						MR Payment SDK
					</h1>
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
						<strong className="font-bold">Configuration Error:</strong>
						<span className="block sm:inline"> Application Key, Session Token, and Merchant ID are required for payment processing.</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4">
				<h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
					MR Payment SDK
				</h1>
				
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-semibold text-gray-900 mb-4">
							Controlled Form
						</h2>
						<p className="text-gray-600 mb-4">
							Form values managed externally
						</p>
						<PaymentForm
							config={paymentConfig}
							merchantIdentifier={merchantIdentifier}
							redirectUrl="https://demo.io/"
							postbackUrl="https://webhook.site/aa54561b-7dc4-4c14-8f09-ee9959f9e1a6"
							amount="5.00"
							currency="USD"
							description="Demo Payment"
							descriptor="Test Payment"
							param="Pass-through-Param-test"
							paymentStatus="approved"
							onSuccess={handlePaymentSuccess}
							onError={handlePaymentError}
							controlled={{
								values: controlledFormData,
								onChange: handleControlledChange,
								onFormDataChange: (formData) => console.log('Controlled form data:', formData)
							}}
							submit={{
								text: `Pay ${controlledFormData.currency} ${controlledFormData.amount}`,
								loadingText: "Processing...",
								styles: "w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 font-medium"
							}}
							className="space-y-4"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
