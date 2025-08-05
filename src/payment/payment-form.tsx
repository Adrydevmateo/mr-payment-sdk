import React, { useId, useState, useCallback } from "react";
import { createPayment, validatePaymentData, getClientIP } from "./payment-api";
import type { PaymentRequest, PaymentConfig, PaymentResponse } from "./payment-api";

export interface PaymentFormProps extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onError'> {
  container?: string;
  config: PaymentConfig;
  onSuccess?: (response: PaymentResponse) => void;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
  onFormDataChange?: (formData: Partial<PaymentRequest>) => void;
  fields?: {
    // Personal Information
    firstName?: FieldConfig;
    lastName?: FieldConfig;
    email?: FieldConfig;
    phoneNumber?: FieldConfig;
    
    // Payment Information
    cardNumber?: FieldConfig;
    expiryMonth?: FieldConfig;
    expiryYear?: FieldConfig;
    cvc?: FieldConfig;
    
    // Billing Address
    address?: FieldConfig;
    city?: FieldConfig;
    state?: FieldConfig;
    country?: FieldConfig;
    region?: FieldConfig;
    zipCode?: FieldConfig;
    
    // Payment Details
    amount?: FieldConfig;
    currency?: FieldConfig;
    description?: FieldConfig;
    descriptor?: FieldConfig;
    param?: FieldConfig;
  };
  submit?: {
    text?: string;
    styles?: string;
    loadingText?: string;
  };
  // Pre-filled data
  merchantIdentifier: string;
  redirectUrl: string;
  postbackUrl: string;
  amount?: string;
  currency?: string;
  description?: string;
  descriptor?: string;
  param?: string;
  paymentStatus?: string;
}

interface FieldConfig {
  container?: string;
  label?: {
    text?: string;
    styles?: string;
  };
  input?: {
    styles?: string;
    placeholder?: string;
  };
}

const PaymentForm = React.forwardRef<HTMLFormElement, PaymentFormProps>(
  (props, ref) => {
    const formId = useId();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [formData, setFormData] = useState<Partial<PaymentRequest>>({
      merchant_identifier: props.merchantIdentifier,
      currency: props.currency || 'USD',
      redirect_url: props.redirectUrl,
      postback_url: props.postbackUrl,
      description: props.description || 'Payment',
      descriptor: props.descriptor || 'Payment',
      param: props.param,
      payment_status: props.paymentStatus || 'approved',
    });

    const handleInputChange = useCallback((field: keyof PaymentRequest, value: string) => {
      const newFormData = { ...formData, [field]: value };
      setFormData(newFormData);
      props.onFormDataChange?.(newFormData);
      // Clear errors when user starts typing
      if (errors.length > 0) {
        setErrors([]);
      }
    }, [errors, formData, props.onFormDataChange]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setErrors([]);
      props.onLoading?.(true);

      try {
        // Get client IP
        const clientIP = await getClientIP();
        const paymentData: PaymentRequest = {
          ...formData,
          ip: clientIP,
        } as PaymentRequest;

        // Validate payment data
        const validation = validatePaymentData(paymentData);
        if (!validation.isValid) {
          setErrors(validation.errors);
          props.onError?.(validation.errors.join(', '));
          return;
        }

        // Process payment
        const response = await createPayment(paymentData, props.config);
        
        if (response.success) {
          props.onSuccess?.(response);
          if (response.redirect_url) {
            window.location.href = response.redirect_url;
          }
        } else {
          setErrors([response.error || 'Payment failed']);
          props.onError?.(response.error || 'Payment failed');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        setErrors([errorMessage]);
        props.onError?.(errorMessage);
      } finally {
        setLoading(false);
        props.onLoading?.(false);
      }
    };

    const { config, onSuccess, onError, onLoading, onFormDataChange, fields, submit, merchantIdentifier, redirectUrl, postbackUrl, amount, currency, description, descriptor, param, paymentStatus, container, ...formProps } = props;

    return (
      <form
        ref={ref}
        {...formProps}
        className={container}
        onSubmit={handleSubmit}
      >
        {/* Error Display */}
        {errors.length > 0 && (
          <div className="payment-errors" style={{ color: 'red', marginBottom: '1rem' }}>
            {errors.map((error, index) => (
              <div key={`error-${index}-${error.substring(0, 10)}`}>{error}</div>
            ))}
          </div>
        )}

        {/* Personal Information */}
        <div className="payment-section">
          <h3>Personal Information</h3>
          
          <div className={props.fields?.firstName?.container}>
            <label className={props.fields?.firstName?.label?.styles} htmlFor={`${formId}-firstName`}>
              {props.fields?.firstName?.label?.text || "First Name"}
            </label>
            <input
              className={props.fields?.firstName?.input?.styles}
              type="text"
              id={`${formId}-firstName`}
              placeholder={props.fields?.firstName?.input?.placeholder || "Enter first name"}
              value={formData.first_name || ''}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
              required
            />
          </div>

          <div className={props.fields?.lastName?.container}>
            <label className={props.fields?.lastName?.label?.styles} htmlFor={`${formId}-lastName`}>
              {props.fields?.lastName?.label?.text || "Last Name"}
            </label>
            <input
              className={props.fields?.lastName?.input?.styles}
              type="text"
              id={`${formId}-lastName`}
              placeholder={props.fields?.lastName?.input?.placeholder || "Enter last name"}
              value={formData.last_name || ''}
              onChange={(e) => handleInputChange('last_name', e.target.value)}
              required
            />
          </div>

          <div className={props.fields?.email?.container}>
            <label className={props.fields?.email?.label?.styles} htmlFor={`${formId}-email`}>
              {props.fields?.email?.label?.text || "Email"}
            </label>
            <input
              className={props.fields?.email?.input?.styles}
              type="email"
              id={`${formId}-email`}
              placeholder={props.fields?.email?.input?.placeholder || "Enter email address"}
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div className={props.fields?.phoneNumber?.container}>
            <label className={props.fields?.phoneNumber?.label?.styles} htmlFor={`${formId}-phoneNumber`}>
              {props.fields?.phoneNumber?.label?.text || "Phone Number"}
            </label>
            <input
              className={props.fields?.phoneNumber?.input?.styles}
              type="tel"
              id={`${formId}-phoneNumber`}
              placeholder={props.fields?.phoneNumber?.input?.placeholder || "Enter phone number"}
              value={formData.phone_number || ''}
              onChange={(e) => handleInputChange('phone_number', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Payment Information */}
        <div className="payment-section">
          <h3>Payment Information</h3>
          
          <div className={props.fields?.cardNumber?.container}>
            <label className={props.fields?.cardNumber?.label?.styles} htmlFor={`${formId}-cardNumber`}>
              {props.fields?.cardNumber?.label?.text || "Card Number"}
            </label>
            <input
              className={props.fields?.cardNumber?.input?.styles}
              type="text"
              id={`${formId}-cardNumber`}
              placeholder={props.fields?.cardNumber?.input?.placeholder || "1234 5678 9012 3456"}
              value={formData.ccn || ''}
              onChange={(e) => handleInputChange('ccn', e.target.value.replace(/\s/g, ''))}
              maxLength={19}
              required
            />
          </div>

          <div className="card-details-row">
            <div className={props.fields?.expiryMonth?.container}>
              <label className={props.fields?.expiryMonth?.label?.styles} htmlFor={`${formId}-expiryMonth`}>
                {props.fields?.expiryMonth?.label?.text || "Month"}
              </label>
              <select
                className={props.fields?.expiryMonth?.input?.styles}
                id={`${formId}-expiryMonth`}
                value={formData.exp_month || ''}
                onChange={(e) => handleInputChange('exp_month', e.target.value)}
                required
              >
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={`month-${month}`} value={month.toString().padStart(2, '0')}>
                    {month.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <div className={props.fields?.expiryYear?.container}>
              <label className={props.fields?.expiryYear?.label?.styles} htmlFor={`${formId}-expiryYear`}>
                {props.fields?.expiryYear?.label?.text || "Year"}
              </label>
              <select
                className={props.fields?.expiryYear?.input?.styles}
                id={`${formId}-expiryYear`}
                value={formData.exp_year || ''}
                onChange={(e) => handleInputChange('exp_year', e.target.value)}
                required
              >
                <option value="">YYYY</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                  <option key={`year-${year}`} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className={props.fields?.cvc?.container}>
              <label className={props.fields?.cvc?.label?.styles} htmlFor={`${formId}-cvc`}>
                {props.fields?.cvc?.label?.text || "CVC"}
              </label>
              <input
                className={props.fields?.cvc?.input?.styles}
                type="text"
                id={`${formId}-cvc`}
                placeholder={props.fields?.cvc?.input?.placeholder || "123"}
                value={formData.cvc_code || ''}
                onChange={(e) => handleInputChange('cvc_code', e.target.value)}
                maxLength={4}
                required
              />
            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="payment-section">
          <h3>Billing Address</h3>
          
          <div className={props.fields?.address?.container}>
            <label className={props.fields?.address?.label?.styles} htmlFor={`${formId}-address`}>
              {props.fields?.address?.label?.text || "Address"}
            </label>
            <input
              className={props.fields?.address?.input?.styles}
              type="text"
              id={`${formId}-address`}
              placeholder={props.fields?.address?.input?.placeholder || "Enter address"}
              value={formData.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              required
            />
          </div>

          <div className="address-row">
            <div className={props.fields?.city?.container}>
              <label className={props.fields?.city?.label?.styles} htmlFor={`${formId}-city`}>
                {props.fields?.city?.label?.text || "City"}
              </label>
              <input
                className={props.fields?.city?.input?.styles}
                type="text"
                id={`${formId}-city`}
                placeholder={props.fields?.city?.input?.placeholder || "Enter city"}
                value={formData.city || ''}
                onChange={(e) => handleInputChange('city', e.target.value)}
                required
              />
            </div>

            <div className={props.fields?.state?.container}>
              <label className={props.fields?.state?.label?.styles} htmlFor={`${formId}-state`}>
                {props.fields?.state?.label?.text || "State"}
              </label>
              <input
                className={props.fields?.state?.input?.styles}
                type="text"
                id={`${formId}-state`}
                placeholder={props.fields?.state?.input?.placeholder || "Enter state"}
                value={formData.state || ''}
                onChange={(e) => handleInputChange('state', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="address-row">
            <div className={props.fields?.country?.container}>
              <label className={props.fields?.country?.label?.styles} htmlFor={`${formId}-country`}>
                {props.fields?.country?.label?.text || "Country"}
              </label>
              <input
                className={props.fields?.country?.input?.styles}
                type="text"
                id={`${formId}-country`}
                placeholder={props.fields?.country?.input?.placeholder || "Enter country"}
                value={formData.country || ''}
                onChange={(e) => handleInputChange('country', e.target.value)}
                required
              />
            </div>

            <div className={props.fields?.region?.container}>
              <label className={props.fields?.region?.label?.styles} htmlFor={`${formId}-region`}>
                {props.fields?.region?.label?.text || "Region"}
              </label>
              <input
                className={props.fields?.region?.input?.styles}
                type="text"
                id={`${formId}-region`}
                placeholder={props.fields?.region?.input?.placeholder || "Enter region"}
                value={formData.region || ''}
                onChange={(e) => handleInputChange('region', e.target.value)}
                required
              />
            </div>

            <div className={props.fields?.zipCode?.container}>
              <label className={props.fields?.zipCode?.label?.styles} htmlFor={`${formId}-zipCode`}>
                {props.fields?.zipCode?.label?.text || "ZIP Code"}
              </label>
              <input
                className={props.fields?.zipCode?.input?.styles}
                type="text"
                id={`${formId}-zipCode`}
                placeholder={props.fields?.zipCode?.input?.placeholder || "Enter ZIP code"}
                value={formData.zip_code || ''}
                onChange={(e) => handleInputChange('zip_code', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="payment-section">
          <h3>Payment Details</h3>
          
          <div className={props.fields?.amount?.container}>
            <label className={props.fields?.amount?.label?.styles} htmlFor={`${formId}-amount`}>
              {props.fields?.amount?.label?.text || "Amount"}
            </label>
            <input
              className={props.fields?.amount?.input?.styles}
              type="number"
              id={`${formId}-amount`}
              placeholder={props.fields?.amount?.input?.placeholder || "0.00"}
              value={formData.amount || ''}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className={props.fields?.currency?.container}>
            <label className={props.fields?.currency?.label?.styles} htmlFor={`${formId}-currency`}>
              {props.fields?.currency?.label?.text || "Currency"}
            </label>
            <select
              className={props.fields?.currency?.input?.styles}
              id={`${formId}-currency`}
              value={formData.currency || 'USD'}
              onChange={(e) => handleInputChange('currency', e.target.value)}
              required
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
            </select>
          </div>

          <div className={props.fields?.description?.container}>
            <label className={props.fields?.description?.label?.styles} htmlFor={`${formId}-description`}>
              {props.fields?.description?.label?.text || "Description"}
            </label>
            <input
              className={props.fields?.description?.input?.styles}
              type="text"
              id={`${formId}-description`}
              placeholder={props.fields?.description?.input?.placeholder || "Payment description"}
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              required
            />
          </div>

          <div className={props.fields?.descriptor?.container}>
            <label className={props.fields?.descriptor?.label?.styles} htmlFor={`${formId}-descriptor`}>
              {props.fields?.descriptor?.label?.text || "Descriptor"}
            </label>
            <input
              className={props.fields?.descriptor?.input?.styles}
              type="text"
              id={`${formId}-descriptor`}
              placeholder={props.fields?.descriptor?.input?.placeholder || "Payment descriptor"}
              value={formData.descriptor || ''}
              onChange={(e) => handleInputChange('descriptor', e.target.value)}
              required
            />
          </div>

          <div className={props.fields?.param?.container}>
            <label className={props.fields?.param?.label?.styles} htmlFor={`${formId}-param`}>
              {props.fields?.param?.label?.text || "Parameter"}
            </label>
            <input
              className={props.fields?.param?.input?.styles}
              type="text"
              id={`${formId}-param`}
              placeholder={props.fields?.param?.input?.placeholder || "Pass-through parameter"}
              value={formData.param || ''}
              onChange={(e) => handleInputChange('param', e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button 
          className={props.submit?.styles} 
          type="submit"
          disabled={loading}
        >
          {loading ? (props.submit?.loadingText || "Processing...") : (props.submit?.text || "Pay Now")}
        </button>
      </form>
    );
  }
);

export default PaymentForm; 