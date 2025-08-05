import PaymentForm from "./payment/payment-form";
import type { PaymentResponse } from "./payment/payment-api";

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
		applicationKey: 'app_144s9ypK9XoDwHC9rWavGFzpprQhHvMjOEKGP',
		baseUrl: 'https://dev1.blockchanger.io'
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-2xl mx-auto px-4">
				<h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
					MR Payment SDK
				</h1>
				
				<div className="bg-white p-8 rounded-lg shadow-md">
					<h2 className="text-2xl font-semibold text-gray-900 mb-4">
						BlockChanger Payment Form
					</h2>
					<p className="text-gray-600 mb-6">
						Complete payment form with BlockChanger API integration and properly sorted countries
					</p>
					<PaymentForm
						config={paymentConfig}
						merchantIdentifier="mid-A144-U1697-wWxxob29NxcEgdXUFGbhQMtjwkDgPK"
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
						submit={{
							text: "Pay $5.00",
							loadingText: "Processing...",
							styles: "w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 font-medium"
						}}
						className="space-y-6"
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
