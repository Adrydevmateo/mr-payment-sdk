import PaymentForm from './payment/payment-form';
import type { PaymentRequest, PaymentResponse } from './payment/payment-api';

function App() {
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

	// Payment form handlers
	const handlePaymentSuccess = (response: PaymentResponse) => {
		console.log('Payment successful:', response);
		alert('Payment processed successfully!');
	};

	const handlePaymentError = (error: string) => {
		console.error('Payment error:', error);
		alert(`Payment failed: ${error}`);
	};

	const handleFormDataChange = (formData: Partial<PaymentRequest>) => {
		console.log('Form data changed:', formData);
	};

	const handleLoading = (loading: boolean) => {
		console.log('Loading state:', loading);
	};

	// If configuration is invalid, show error message
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
				
				<div className="bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6">
						Payment Form Example
					</h2>
					
					<PaymentForm
						config={paymentConfig}
						merchantIdentifier={merchantIdentifier}
						currency="USD"
						amount="5.00"
						redirectUrl="https://example.com/success"
						postbackUrl="https://example.com/webhook"
						description="Test Payment"
						descriptor="Test Payment"
						param="orderId:12345"
						paymentStatus="approved"
						onSuccess={handlePaymentSuccess}
						onError={handlePaymentError}
						onFormDataChange={handleFormDataChange}
						onLoading={handleLoading}
						className="space-y-6"
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
