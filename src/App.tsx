import Payment from "./payment/payment";

function App() {
	return (
		<>
			<h1>MR Payment SDK</h1>
			<Payment
				container="flex flex-col gap-4"
				fields={{
					email: {
						container: "flex flex-col gap-2",
						label: {
							styles: "text-sm font-medium",
							text: "Custom Email",
						},
					},
				}}
				submit={{
					action: () => console.log("Payment form submitted"),
					text: "Process Payment",
					styles: "bg-blue-500 text-white px-4 py-2 rounded"
				}}
			/>
		</>
	);
}

export default App;
