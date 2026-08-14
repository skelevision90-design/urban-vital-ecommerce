"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CURRENCY } from "@/data/products";
import {
  LeafIcon,
  ShieldLockIcon,
  CheckIcon,
  ChevronRightIcon,
  TruckIcon,
  SparklesIcon,
  CartIcon,
} from "@/components/Icons";

interface FormData {
  // Step 1: Info
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pincode: string;
  // Step 2: Delivery
  deliveryMethod: "standard" | "express";
  // Step 3: Payment
  paymentMethod: "card" | "cod" | "upi";
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  upiId: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const { items, itemCount, subtotal, discountAmount, promoCode, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Karnataka",
    pincode: "",
    deliveryMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    upiId: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [placedOrderSummary, setPlacedOrderSummary] = useState<{
    total: number;
    items: typeof items;
    address: string;
    email: string;
  } | null>(null);

  // Field refs for auto-focusing on validation failure
  const fieldRefs = {
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    address: useRef<HTMLInputElement>(null),
    city: useRef<HTMLInputElement>(null),
    pincode: useRef<HTMLInputElement>(null),
    cardNumber: useRef<HTMLInputElement>(null),
    cardExpiry: useRef<HTMLInputElement>(null),
    cardCvc: useRef<HTMLInputElement>(null),
    upiId: useRef<HTMLInputElement>(null),
  };

  // Shipping cost calculation based on step selection & free shipping threshold
  const isFreeShipping = subtotal >= CURRENCY.freeShippingThreshold;
  const shippingFee =
    formData.deliveryMethod === "express"
      ? CURRENCY.expressShippingRate
      : isFreeShipping
      ? 0
      : 79;

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        return "";
      case "phone":
        if (!value.trim()) return "10-digit mobile number is required";
        if (!/^\d{10}$/.test(value.replace(/\D/g, ""))) return "Please enter a valid 10-digit phone number";
        return "";
      case "firstName":
        if (!value.trim()) return "First name is required";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required";
        return "";
      case "address":
        if (!value.trim()) return "Street delivery address is required";
        return "";
      case "city":
        if (!value.trim()) return "City is required";
        return "";
      case "pincode":
        if (!value.trim()) return "PIN Code is required";
        if (!/^\d{6}$/.test(value.trim())) return "Enter a valid 6-digit postal PIN code";
        return "";
      case "cardNumber":
        if (formData.paymentMethod === "card") {
          const clean = value.replace(/\s/g, "");
          if (!clean) return "Card number is required";
          if (clean.length < 15 || clean.length > 19) return "Enter a valid card number (16 digits)";
        }
        return "";
      case "cardExpiry":
        if (formData.paymentMethod === "card") {
          if (!value.trim()) return "Expiry (MM/YY) is required";
          if (!/^\d{2}\/\d{2}$/.test(value.trim())) return "Format must be MM/YY";
        }
        return "";
      case "cardCvc":
        if (formData.paymentMethod === "card") {
          if (!value.trim()) return "CVC is required";
          if (!/^\d{3,4}$/.test(value.trim())) return "3 or 4 digit security code";
        }
        return "";
      case "upiId":
        if (formData.paymentMethod === "upi") {
          if (!value.trim()) return "UPI ID is required (e.g. name@okhdfcbank)";
          if (!value.includes("@")) return "Enter a valid UPI ID (e.g. mobile@upi)";
        }
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, (formData as any)[field] || "");
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field: keyof FormData, value: any) => {
    let formattedValue = value;

    // Card formatting helpers
    if (field === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .substring(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();
    } else if (field === "cardExpiry") {
      const clean = value.replace(/\D/g, "").substring(0, 4);
      if (clean.length >= 3) {
        formattedValue = `${clean.substring(0, 2)}/${clean.substring(2, 4)}`;
      } else {
        formattedValue = clean;
      }
    } else if (field === "cardCvc") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4);
    } else if (field === "phone") {
      formattedValue = value.replace(/\D/g, "").substring(0, 10);
    } else if (field === "pincode") {
      formattedValue = value.replace(/\D/g, "").substring(0, 6);
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));

    if (touched[field]) {
      const errorMsg = validateField(field, formattedValue);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const validateStep1 = (): boolean => {
    const requiredFields = ["email", "phone", "firstName", "lastName", "address", "city", "pincode"];
    const newErrors: FormErrors = {};
    let firstInvalid: string | null = null;

    requiredFields.forEach((f) => {
      const err = validateField(f, (formData as any)[f]);
      if (err) {
        newErrors[f] = err;
        if (!firstInvalid) firstInvalid = f;
      }
    });

    setErrors(newErrors);
    setTouched(requiredFields.reduce((acc, curr) => ({ ...acc, [curr]: true }), {}));

    if (firstInvalid && (fieldRefs as any)[firstInvalid]?.current) {
      (fieldRefs as any)[firstInvalid].current.focus();
      return false;
    }

    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {};
    let firstInvalid: string | null = null;

    if (formData.paymentMethod === "card") {
      ["cardNumber", "cardExpiry", "cardCvc"].forEach((f) => {
        const err = validateField(f, (formData as any)[f]);
        if (err) {
          newErrors[f] = err;
          if (!firstInvalid) firstInvalid = f;
        }
      });
    } else if (formData.paymentMethod === "upi") {
      const err = validateField("upiId", formData.upiId);
      if (err) {
        newErrors["upiId"] = err;
        firstInvalid = "upiId";
      }
    }

    setErrors(newErrors);
    if (firstInvalid && (fieldRefs as any)[firstInvalid]?.current) {
      (fieldRefs as any)[firstInvalid].current.focus();
      return false;
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) {
        handleSubmitOrder();
      }
    }
  };

  const handleSubmitOrder = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const randomOrder = `UV-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(randomOrder);
      setPlacedOrderSummary({
        total: finalTotal,
        items: [...items],
        address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
        email: formData.email,
      });
      setIsSuccess(true);
      setIsSubmitting(false);
      clearCart();
    }, 1200);
  };

  // If cart was empty when arriving directly (and not in success view)
  if (items.length === 0 && !isSuccess) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 px-4 bg-[#F8F3E9] min-h-[60vh]">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full border border-[#2A2521]/10 shadow-soft text-center">
          <span className="w-16 h-16 rounded-full bg-[#E2606B]/15 text-[#E2606B] flex items-center justify-center mx-auto mb-4">
            <CartIcon size={28} />
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#2A2521]">
            Your Cart is Empty
          </h2>
          <p className="mt-2 text-sm text-[#2A2521]/78">
            Add your child's favorite multivitamin powder before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block w-full py-3.5 rounded-xl bg-[#E2606B] text-white font-bold text-sm uppercase tracking-wider"
          >
            Explore The Range
          </Link>
        </div>
      </div>
    );
  }

  // =========================================================================
  // SUCCESS ORDER CONFIRMATION VIEW (Order Placed Receipt)
  // =========================================================================
  if (isSuccess && placedOrderSummary) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 px-4 bg-[#F8F3E9] min-h-[80vh]">
        <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-2xl w-full border border-[#2A2521]/10 shadow-lifted text-center animate-in zoom-in-95 duration-300">
          {/* Celebratory Icon */}
          <div className="w-20 h-20 rounded-full bg-[#8CC79B]/25 text-[#2A2521] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckIcon size={36} className="text-[#8CC79B]" />
          </div>

          <span className="label-smallcaps text-[#8CC79B] tracking-[0.16em]">
            Order Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A2521] mt-1">
            Thank You for Your Order!
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#2A2521]/78">
            Your 100% natural nutrition pouch is being prepared in our clean room facility.
          </p>

          <div className="mt-6 p-4 rounded-2xl bg-[#F8F3E9] border border-[#2A2521]/10 inline-block text-left w-full">
            <div className="flex justify-between items-center text-sm font-bold pb-3 border-b border-[#2A2521]/10">
              <span className="text-[#2A2521]/60 uppercase text-xs">Order ID:</span>
              <span className="text-[#2A2521] font-mono text-base">{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-3">
              <span className="text-[#2A2521]/60">Receipt sent to:</span>
              <span className="font-semibold text-[#2A2521]">{placedOrderSummary.email}</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-2">
              <span className="text-[#2A2521]/60">Delivery Address:</span>
              <span className="font-semibold text-[#2A2521] text-right truncate max-w-[260px]">
                {placedOrderSummary.address}
              </span>
            </div>
            <div className="flex justify-between items-center text-base font-extrabold pt-3 mt-3 border-t border-[#2A2521]/10 text-[#2A2521]">
              <span>Total Paid:</span>
              <span>
                {CURRENCY.symbol}
                {placedOrderSummary.total}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3.5 rounded-2xl bg-[#2A2521] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#2A2521]/90 transition-colors"
            >
              Return to Home
            </Link>
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-2xl bg-[#E2606B] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#d44d58] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN 3-STEP CHECKOUT FORM
  // =========================================================================
  return (
    <div className="w-full bg-[#F8F3E9] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-[#2A2521]/60 mb-2">
              <Link href="/cart" className="hover:text-[#E2606B] transition-colors flex items-center gap-1">
                ← Back to Cart
              </Link>
            </nav>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A2521]">
              Secure Checkout
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#2A2521]/60">
            <ShieldLockIcon size={18} className="text-[#8CC79B]" />
            <span className="hidden sm:inline">256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* 3-Step Progress Indicator (Accessible & Clickable) */}
        <div className="mb-10 bg-white rounded-2xl p-4 border border-[#2A2521]/10 shadow-soft">
          <div className="grid grid-cols-3 gap-2 text-center" role="tablist" aria-label="Checkout Progress">
            {/* Step 1 */}
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              aria-current={currentStep === 1 ? "step" : undefined}
              className={`p-2 sm:p-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
                currentStep === 1
                  ? "bg-[#2A2521] text-white shadow-sm"
                  : currentStep > 1
                  ? "bg-[#8CC79B]/20 text-[#2A2521] hover:bg-[#8CC79B]/30"
                  : "text-[#2A2521]/40"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                {currentStep > 1 ? "✓" : "1"}
              </span>
              <span>1. Information</span>
            </button>

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => {
                if (validateStep1()) setCurrentStep(2);
              }}
              aria-current={currentStep === 2 ? "step" : undefined}
              className={`p-2 sm:p-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
                currentStep === 2
                  ? "bg-[#2A2521] text-white shadow-sm"
                  : currentStep > 2
                  ? "bg-[#8CC79B]/20 text-[#2A2521] hover:bg-[#8CC79B]/30"
                  : "text-[#2A2521]/40"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                {currentStep > 2 ? "✓" : "2"}
              </span>
              <span>2. Delivery</span>
            </button>

            {/* Step 3 */}
            <button
              type="button"
              onClick={() => {
                if (validateStep1()) setCurrentStep(3);
              }}
              aria-current={currentStep === 3 ? "step" : undefined}
              className={`p-2 sm:p-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
                currentStep === 3
                  ? "bg-[#2A2521] text-white shadow-sm"
                  : "text-[#2A2521]/40"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                3
              </span>
              <span>3. Payment</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Multi-Step Forms */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#2A2521]/10 shadow-soft">
            <form onSubmit={handleNextStep} noValidate>
              {/* STEP 1: CONTACT & SHIPPING ADDRESS */}
              {currentStep === 1 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <h2 className="font-serif text-2xl font-bold text-[#2A2521]">
                    Contact & Delivery Address
                  </h2>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/78 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        ref={fieldRefs.email}
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        placeholder="parent@example.com"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#F8F3E9] text-sm text-[#2A2521] min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                          errors.email ? "border-red-500 bg-red-50/20" : "border-[#2A2521]/15"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 font-semibold mt-1" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/78 mb-1.5">
                        Mobile Phone *
                      </label>
                      <input
                        ref={fieldRefs.phone}
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        placeholder="9876543210"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#F8F3E9] text-sm text-[#2A2521] min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                          errors.phone ? "border-red-500 bg-red-50/20" : "border-[#2A2521]/15"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 font-semibold mt-1" role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* First & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/78 mb-1.5">
                        First Name *
                      </label>
                      <input
                        ref={fieldRefs.firstName}
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        onBlur={() => handleBlur("firstName")}
                        placeholder="e.g. Aarav"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#F8F3E9] text-sm text-[#2A2521] min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                          errors.firstName ? "border-red-500 bg-red-50/20" : "border-[#2A2521]/15"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-xs text-red-600 font-semibold mt-1" role="alert">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/78 mb-1.5">
                        Last Name *
                      </label>
                      <input
                        ref={fieldRefs.lastName}
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        onBlur={() => handleBlur("lastName")}
                        placeholder="e.g. Sharma"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#F8F3E9] text-sm text-[#2A2521] min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                          errors.lastName ? "border-red-500 bg-red-50/20" : "border-[#2A2521]/15"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-xs text-red-600 font-semibold mt-1" role="alert">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/78 mb-1.5">
                      House / Flat / Street Address *
                    </label>
                    <input
                      ref={fieldRefs.address}
                      id="address"
                      type="text"
                      autoComplete="street-address"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      onBlur={() => handleBlur("address")}
                      placeholder="e.g. #402, Green Meadows Apt, Indiranagar"
                      className={`w-full px-4 py-3 rounded-xl border bg-[#F8F3E9] text-sm text-[#2A2521] min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                        errors.address ? "border-red-500 bg-red-50/20" : "border-[#2A2521]/15"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-600 font-semibold mt-1" role="alert">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City, State, Pincode */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/78 mb-1.5">
                        City *
                      </label>
                      <input
                        ref={fieldRefs.city}
                        id="city"
                        type="text"
                        autoComplete="address-level2"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        onBlur={() => handleBlur("city")}
                        placeholder="Bengaluru"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#F8F3E9] text-sm text-[#2A2521] min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                          errors.city ? "border-red-500 bg-red-50/20" : "border-[#2A2521]/15"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-xs text-red-600 font-semibold mt-1" role="alert">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="state" className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/78 mb-1.5">
                        State
                      </label>
                      <select
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#2A2521]/15 bg-[#F8F3E9] text-sm text-[#2A2521] min-h-[44px] cursor-pointer"
                      >
                        <option value="Karnataka">Karnataka</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi NCR</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Kerala">Kerala</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Other">Other States</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="pincode" className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/78 mb-1.5">
                        PIN Code *
                      </label>
                      <input
                        ref={fieldRefs.pincode}
                        id="pincode"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        value={formData.pincode}
                        onChange={(e) => handleChange("pincode", e.target.value)}
                        onBlur={() => handleBlur("pincode")}
                        placeholder="560038"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#F8F3E9] text-sm text-[#2A2521] min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                          errors.pincode ? "border-red-500 bg-red-50/20" : "border-[#2A2521]/15"
                        }`}
                      />
                      {errors.pincode && (
                        <p className="text-xs text-red-600 font-semibold mt-1" role="alert">
                          {errors.pincode}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 w-full py-4 rounded-2xl bg-[#E2606B] hover:bg-[#d44d58] text-white font-bold text-base uppercase tracking-wider shadow-lifted min-h-[48px] transition-all"
                  >
                    Continue to Delivery →
                  </button>
                </div>
              )}

              {/* STEP 2: DELIVERY METHOD */}
              {currentStep === 2 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl font-bold text-[#2A2521]">
                      Choose Delivery Speed
                    </h2>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-bold text-[#E2606B] underline"
                    >
                      Edit Address
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8F3E9] text-xs text-[#2A2521]/78">
                    <strong>Delivering to:</strong> {formData.firstName} {formData.lastName}, {formData.address}, {formData.city} - {formData.pincode}
                  </div>

                  {/* Delivery Radio Options */}
                  <div className="flex flex-col gap-3">
                    {/* Standard Delivery */}
                    <label
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        formData.deliveryMethod === "standard"
                          ? "border-[#2A2521] bg-[#F8F3E9] ring-2 ring-[#2A2521]/10"
                          : "border-[#2A2521]/10 bg-white hover:border-[#2A2521]/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="standard"
                          checked={formData.deliveryMethod === "standard"}
                          onChange={() => handleChange("deliveryMethod", "standard")}
                          className="w-4 h-4 text-[#E2606B] focus:ring-[#E2606B]"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#2A2521]">
                            Standard Express Courier (3-5 Business Days)
                          </span>
                          <span className="text-xs text-[#2A2521]/60">
                            Carbon-neutral eco packaging
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-[#2A2521]">
                        {isFreeShipping ? (
                          <strong className="text-[#8CC79B]">FREE</strong>
                        ) : (
                          `${CURRENCY.symbol}79`
                        )}
                      </span>
                    </label>

                    {/* Express Priority Delivery */}
                    <label
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        formData.deliveryMethod === "express"
                          ? "border-[#2A2521] bg-[#F8F3E9] ring-2 ring-[#2A2521]/10"
                          : "border-[#2A2521]/10 bg-white hover:border-[#2A2521]/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="express"
                          checked={formData.deliveryMethod === "express"}
                          onChange={() => handleChange("deliveryMethod", "express")}
                          className="w-4 h-4 text-[#E2606B] focus:ring-[#E2606B]"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#2A2521]">
                            Priority Air Dispatch (1-2 Business Days)
                          </span>
                          <span className="text-xs text-[#2A2521]/60">
                            Guaranteed next flight dispatch
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-[#2A2521]">
                        {CURRENCY.symbol}99
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="w-1/3 py-4 rounded-2xl bg-[#F8F3E9] text-[#2A2521] font-bold text-sm uppercase tracking-wider hover:bg-[#2A2521]/10 min-h-[48px]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-4 rounded-2xl bg-[#E2606B] hover:bg-[#d44d58] text-white font-bold text-base uppercase tracking-wider shadow-lifted min-h-[48px] transition-all"
                    >
                      Continue to Payment →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PAYMENT METHOD */}
              {currentStep === 3 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl font-bold text-[#2A2521]">
                      Select Payment Method
                    </h2>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs font-bold text-[#E2606B] underline"
                    >
                      Edit Delivery
                    </button>
                  </div>

                  {/* Payment Type Switcher */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleChange("paymentMethod", "card")}
                      className={`p-3 rounded-2xl border text-center font-bold text-xs uppercase min-h-[44px] transition-all ${
                        formData.paymentMethod === "card"
                          ? "bg-[#2A2521] text-white border-[#2A2521] shadow-sm"
                          : "bg-[#F8F3E9] text-[#2A2521]/78 border-[#2A2521]/10"
                      }`}
                    >
                      Credit/Debit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange("paymentMethod", "upi")}
                      className={`p-3 rounded-2xl border text-center font-bold text-xs uppercase min-h-[44px] transition-all ${
                        formData.paymentMethod === "upi"
                          ? "bg-[#2A2521] text-white border-[#2A2521] shadow-sm"
                          : "bg-[#F8F3E9] text-[#2A2521]/78 border-[#2A2521]/10"
                      }`}
                    >
                      UPI / QR
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange("paymentMethod", "cod")}
                      className={`p-3 rounded-2xl border text-center font-bold text-xs uppercase min-h-[44px] transition-all ${
                        formData.paymentMethod === "cod"
                          ? "bg-[#2A2521] text-white border-[#2A2521] shadow-sm"
                          : "bg-[#F8F3E9] text-[#2A2521]/78 border-[#2A2521]/10"
                      }`}
                    >
                      Cash on Delivery
                    </button>
                  </div>

                  {/* Card Form */}
                  {formData.paymentMethod === "card" && (
                    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-[#F8F3E9]/50 border border-[#2A2521]/10">
                      <div>
                        <label htmlFor="cardNumber" className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/78 mb-1.5">
                          Card Number *
                        </label>
                        <input
                          ref={fieldRefs.cardNumber}
                          id="cardNumber"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          value={formData.cardNumber}
                          onChange={(e) => handleChange("cardNumber", e.target.value)}
                          onBlur={() => handleBlur("cardNumber")}
                          placeholder="4532 0000 0000 0000"
                          className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#2A2521] font-mono min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                            errors.cardNumber ? "border-red-500" : "border-[#2A2521]/15"
                          }`}
                        />
                        {errors.cardNumber && (
                          <p className="text-xs text-red-600 font-semibold mt-1" role="alert">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/78 mb-1.5">
                            Expiry Date *
                          </label>
                          <input
                            ref={fieldRefs.cardExpiry}
                            id="cardExpiry"
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            value={formData.cardExpiry}
                            onChange={(e) => handleChange("cardExpiry", e.target.value)}
                            onBlur={() => handleBlur("cardExpiry")}
                            placeholder="MM/YY"
                            className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#2A2521] font-mono min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                              errors.cardExpiry ? "border-red-500" : "border-[#2A2521]/15"
                            }`}
                          />
                          {errors.cardExpiry && (
                            <p className="text-xs text-red-600 font-semibold mt-1" role="alert">
                              {errors.cardExpiry}
                            </p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="cardCvc" className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/78 mb-1.5">
                            CVC / CVV *
                          </label>
                          <input
                            ref={fieldRefs.cardCvc}
                            id="cardCvc"
                            type="password"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            maxLength={4}
                            value={formData.cardCvc}
                            onChange={(e) => handleChange("cardCvc", e.target.value)}
                            onBlur={() => handleBlur("cardCvc")}
                            placeholder="123"
                            className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#2A2521] font-mono min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#E2606B] ${
                              errors.cardCvc ? "border-red-500" : "border-[#2A2521]/15"
                            }`}
                          />
                          {errors.cardCvc && (
                            <p className="text-xs text-red-600 font-semibold mt-1" role="alert">
                              {errors.cardCvc}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UPI Form */}
                  {formData.paymentMethod === "upi" && (
                    <div className="p-5 rounded-2xl bg-[#F8F3E9]/50 border border-[#2A2521]/10 flex flex-col gap-3">
                      <label htmlFor="upiId" className="block text-xs font-bold uppercase tracking-wider text-[#2A2521]/78">
                        Enter UPI VPA ID *
                      </label>
                      <input
                        ref={fieldRefs.upiId}
                        id="upiId"
                        type="text"
                        value={formData.upiId}
                        onChange={(e) => handleChange("upiId", e.target.value)}
                        onBlur={() => handleBlur("upiId")}
                        placeholder="e.g. mobile@okhdfcbank"
                        className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-[#2A2521] min-h-[44px] ${
                          errors.upiId ? "border-red-500" : "border-[#2A2521]/15"
                        }`}
                      />
                      {errors.upiId && (
                        <p className="text-xs text-red-600 font-semibold" role="alert">
                          {errors.upiId}
                        </p>
                      )}
                    </div>
                  )}

                  {/* COD info */}
                  {formData.paymentMethod === "cod" && (
                    <div className="p-5 rounded-2xl bg-[#F8F3E9]/50 border border-[#2A2521]/10 text-xs text-[#2A2521]/80 leading-relaxed">
                      💵 Pay with cash or UPI QR directly to the courier executive upon parcel delivery.
                    </div>
                  )}

                  {/* Encryption Trust Banner */}
                  <div className="flex items-center gap-2 text-xs text-[#2A2521]/60 py-2">
                    <ShieldLockIcon size={16} className="text-[#8CC79B]" />
                    <span>Payments are encrypted — card details never touch our servers.</span>
                  </div>

                  {/* Submit Order Button */}
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-1/3 py-4 rounded-2xl bg-[#F8F3E9] text-[#2A2521] font-bold text-sm uppercase tracking-wider hover:bg-[#2A2521]/10 min-h-[48px]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 py-4 rounded-2xl bg-[#E2606B] hover:bg-[#d44d58] disabled:opacity-50 text-white font-bold text-base uppercase tracking-wider shadow-lifted min-h-[48px] transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Securing Order...</span>
                      ) : (
                        <span>
                          Place Order • {CURRENCY.symbol}
                          {finalTotal}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Sticky Order Summary */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#2A2521]/10 shadow-lifted sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-[#2A2521]/10">
              <h2 className="font-serif text-2xl font-bold text-[#2A2521]">
                Order Items ({itemCount})
              </h2>
              <Link href="/cart" className="text-xs font-bold text-[#E2606B] underline">
                Edit Cart
              </Link>
            </div>

            {/* Thumbnail items */}
            <div className="flex flex-col gap-3 py-4 max-h-[260px] overflow-y-auto divide-y divide-[#2A2521]/5">
              {items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#F8F3E9] p-1 flex items-center justify-center flex-shrink-0">
                      <Image
                        src={item.variant.packImage}
                        alt={item.variant.name}
                        width={44}
                        height={44}
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#2A2521]">
                        {item.variant.name} • {item.variant.flavour}
                      </span>
                      <span className="text-[11px] text-[#2A2521]/60">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-serif text-sm font-bold text-[#2A2521]">
                    {CURRENCY.symbol}
                    {item.variant.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="flex flex-col gap-2.5 py-4 border-t border-[#2A2521]/10 text-sm">
              <div className="flex justify-between text-[#2A2521]/78">
                <span>Subtotal</span>
                <span>
                  {CURRENCY.symbol}
                  {subtotal}
                </span>
              </div>
              <div className="flex justify-between text-[#2A2521]/78">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-[#8CC79B]">FREE</strong>
                  ) : (
                    `${CURRENCY.symbol}${shippingFee}`
                  )}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#8CC79B] font-bold">
                  <span>Coupon ({promoCode})</span>
                  <span>
                    − {CURRENCY.symbol}
                    {discountAmount}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-[#2A2521] pt-3 border-t border-[#2A2521]/10">
                <span>Total Amount</span>
                <span className="font-serif text-xl">
                  {CURRENCY.symbol}
                  {finalTotal}
                </span>
              </div>
            </div>

            {/* Trust Bullet */}
            <div className="mt-4 pt-4 border-t border-[#2A2521]/5 text-center text-xs text-[#2A2521]/60">
              🌿 100% Natural Guarantee • Direct Clean Room Dispatch
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
