import React, { useId } from "react";

export interface PaymentProps extends React.HTMLAttributes<HTMLFormElement> {
	container?: string;
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
