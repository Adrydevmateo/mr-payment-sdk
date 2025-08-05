import { useState } from 'react';
import Payment from './payment/payment';
import type { PaymentConfig } from './payment/payment-api';

function App() {
	// Payment configuration - replace with your actual credentials
	const paymentConfig: PaymentConfig = {
		sessionToken: 'admin_MO687031821sdd1MAWKcwQkOSl',
		applicationKey: 'app_144s9ypK9XoDwHC9rWavGFzpprQhHvMjOEKGP',
		baseUrl: 'https://dev1.blockchanger.io'
	};

	// Merchant ID - Required for payment processing
	const merchantIdentifier = "mid-A144-U1697-wWxxob29NxcEgdXUFGbhQMtjwkDgPK";

	// State for form data and processing
	const [formData] = useState({
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [isProcessing, setIsProcessing] = useState(false);
	const [configErrors, setConfigErrors] = useState<string[]>([]);

	// Handle configuration errors
	const handleConfigError = (errors: string[]) => {
		setConfigErrors(errors);
	};

	// Handle form submission
	const handleSubmit = async () => {
		setIsProcessing(true);
		
		try {
			// Simulate payment processing
			console.log('Processing payment with data:', formData);
			
			// Here you would typically call your payment API
			// const response = await createPayment(paymentData, paymentConfig);
			
			// Simulate API delay
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			console.log('Payment processed successfully');
			alert('Payment processed successfully!');
			
		} catch (error) {
			console.error('Payment processing failed:', error);
			alert('Payment processing failed. Please try again.');
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-4xl mx-auto px-4">
				<h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
					MR Payment SDK
				</h1>
				
				{/* Configuration Error Display */}
				{configErrors.length > 0 && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
						<strong className="font-bold">Configuration Error:</strong>
						<ul className="mt-2 ml-4">
							{configErrors.map((error, index) => (
								<li key={`config-error-${error.substring(0, 10)}-${index}`}>{error}</li>
							))}
						</ul>
					</div>
				)}

				{/* Payment Form */}
				<div className="bg-white rounded-lg shadow-lg p-8">
					<h2 className="text-2xl font-semibold text-gray-900 mb-6">
						Payment Form
					</h2>
					
					<Payment
						config={paymentConfig}
						merchantIdentifier={merchantIdentifier}
						onConfigError={handleConfigError}
						container="space-y-6"
						fields={{
							email: {
								container: "space-y-2",
								label: {
									text: "Email Address",
									styles: "block text-sm font-medium text-gray-700"
								},
								input: {
									styles: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								}
							},
							password: {
								container: "space-y-2",
								label: {
									text: "Password",
									styles: "block text-sm font-medium text-gray-700"
								},
								input: {
									styles: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								}
							},
							confirmPassword: {
								container: "space-y-2",
								label: {
									text: "Confirm Password",
									styles: "block text-sm font-medium text-gray-700"
								},
								input: {
									styles: "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								}
							}
						}}
						submit={{
							action: handleSubmit,
							text: isProcessing ? "Processing..." : "Submit Payment",
							styles: "w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
						}}
					/>
				</div>

				{/* Form Data Display (for debugging) */}
				<div className="mt-8 bg-gray-100 rounded-lg p-4">
					<h3 className="text-lg font-semibold text-gray-900 mb-2">
						Form Data (Debug)
					</h3>
					<pre className="text-sm text-gray-700">
						{JSON.stringify(formData, null, 2)}
					</pre>
				</div>
			</div>
		</div>
	);
}

export default App;
