import React, { useId } from "react";
import type { PaymentConfig } from "./payment-api";

export interface PaymentProps extends React.HTMLAttributes<HTMLFormElement> {
	container?: string;
	// Payment configuration
	config?: PaymentConfig;
	merchantIdentifier?: string;
	// Validation callbacks
	onConfigError?: (errors: string[]) => void;
	fields?: {
		email?: {
			container?: string;
			label?: {
				text?: string;
				styles?: string;
			};
			input?: {
				styles?: string;
			};
		};
		password?: {
			container?: string;
			label?: {
				text?: string;
				styles?: string;
			};
			input?: {
				styles?: string;
			};
		};
		confirmPassword?: {
			container?: string;
			label?: {
				text?: string;
				styles?: string;
			};
			input?: {
				styles?: string;
			};
		};
	};
	submit?: {
		action?: () => void;
		text?: string;
		styles?: string;
	};
}

const Payment = React.forwardRef<HTMLFormElement, PaymentProps>(
	(props, ref) => {
		const formId = useId();
		
		// Validate payment configuration only if config is provided
		const validateConfig = () => {
			const errors: string[] = [];
			
			// Only validate if config is provided (optional validation)
			if (props.config) {
				if (!props.config.applicationKey) {
					errors.push('Application Key is required');
				}
				
				if (!props.config.sessionToken) {
					errors.push('Session Token is required');
				}
			}
			
			// Only validate merchantIdentifier if config is provided
			if (props.config && (!props.merchantIdentifier || props.merchantIdentifier.trim() === '')) {
				errors.push('Merchant ID is required');
			}
			
			return errors;
		};
		
		// Check for configuration errors
		const configErrors = validateConfig();
		
		// If there are configuration errors, show them
		if (configErrors.length > 0) {
			// Call the error callback if provided
			props.onConfigError?.(configErrors);
			
			// Return error display
			return (
				<div className="payment-config-error" style={{ color: 'red', padding: '1rem', border: '1px solid red', borderRadius: '4px', backgroundColor: '#fef2f2' }}>
					<strong>Configuration Error:</strong>
					<ul style={{ margin: '0.5rem 0 0 1.5rem', padding: 0 }}>
						{configErrors.map((error, index) => (
							<li key={`config-error-${error.substring(0, 10)}-${index}`}>{error}</li>
						))}
					</ul>
				</div>
			);
		}
		
		const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			console.log("@@ Running from the Payment");
			props.submit?.action?.();
		};
		
		return (
			<form
				ref={ref}
				{...props}
        className={props.container}
				onSubmit={handleSubmit}
			>
				<div className={props.fields?.email?.container}>
					<label className={props.fields?.email?.label?.styles} htmlFor={`${formId}-email`}>
						{props.fields?.email?.label?.text || "Email"}
					</label>
					<input 
						className={props.fields?.email?.input?.styles} 
						type="email" 
						id={`${formId}-email`} 
					/>
				</div>
				<div className={props.fields?.password?.container}>
					<label className={props.fields?.password?.label?.styles} htmlFor={`${formId}-password`}>
						{props.fields?.password?.label?.text || "Password"}
					</label>
					<input
						className={props.fields?.password?.input?.styles}
						type="password"
						id={`${formId}-password`}
					/>
				</div>
				<div className={props.fields?.confirmPassword?.container}>
					<label
						className={props.fields?.confirmPassword?.label?.styles}
						htmlFor={`${formId}-confirmPassword`}
					>
						{props.fields?.confirmPassword?.label?.text || "Confirm Password"}
					</label>
					<input
						className={props.fields?.confirmPassword?.input?.styles}
						type="password"
						id={`${formId}-confirmPassword`}
					/>
				</div>
				<button className={props.submit?.styles} type="submit">
					{props.submit?.text || "Submit"}
				</button>
			</form>
		);
	},
);

export default Payment;
