// app/refund-policy/page.tsx

import Footer from "@/components/navigation/Footer"
import Navbar from "@/components/navigation/Navbar"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Read about Quicktalog's 30-day money-back guarantee, eligibility, and how to request a refund for your purchase or subscription.",
}

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-36">
        <h1 className="text-3xl font-bold mb-6">Refund Policy for Quicktalog</h1>

        <p className="mb-4">
          At Quicktalog, we want you to be completely satisfied with your purchase. We offer a
          straight-forward refund policy to ensure your peace of mind.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4">Our 30-Day Money-Back Guarantee</h2>
        <p className="mb-4">
          We provide a <strong>30-day money-back guarantee</strong> or all Quicktalog software
          purchases and subscription plans. If you're not entirely happy with our service within 30
          days of your initial purchase, you are eligible for a full refund.
        </p>
        <p className="mb-4">
          Please note that this guarantee applies to your <strong>first purchase</strong> of any
          Quicktalog product or subscription. It does not apply to subsequent renewals, upgrades, or
          additional purchases made after the initial 30-day period.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4">How to Request a Refund</h2>
        <p className="mb-4">To request a refund, please follow these steps:</p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <strong>Contact Paddle Directly:</strong> As our Merchant of Record, Paddle.com handles
            all payment processing and refunds. The quickest way to request a refund is by
            contacting Paddle's buyer support directly through their portal:{" "}
            <a href="https://paddle.net" className="text-product-primary underline">
              paddle.net
            </a>
            . Please have your purchase receipt or transaction ID ready.
          </li>
          <li>
            <strong>Contact Quicktalog Support:</strong> Alternatively, you can reach out to our
            support team at{" "}
            <a href="mailto:support@quicktalog.app" className="text-product-primary underline">
              support@quicktalog.app
            </a>
            . Please include your purchase details (e.g., email used for purchase, date of purchase,
            product name) in your request. We will then assist you in initiating the refund process
            through Paddle.
          </li>
        </ul>
        <p className="mb-4">
          Refund requests must be submitted within <strong>30 days</strong> of your original
          purchase date.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4">Refund Processing</h2>
        <p className="mb-4">
          Once your refund request is received and approved, Paddle will process the refund to your
          original payment method. Please allow 5-10 business days for the refund to appear on your
          statement, depending on your bank or card issuer.
        </p>
        <p className="mb-4">
          Upon a successful refund, your access to the Quicktalog platform for the refunded product
          or subscription will be terminated.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4">Non-Refundable Circumstances</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            Refunds will not be issued for requests made after the 30-day money-back guarantee
            period has expired.
          </li>
          <li>
            Renewals of subscriptions are generally non-refundable. Please manage your subscription
            settings before the renewal date if you wish to cancel.
          </li>
          <li>Any services explicitly stated as non-refundable at the time of purchase.</li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4">Questions</h2>
        <p className="mb-4">
          If you have any questions about our Refund Policy, please don't hesitate to contact us at{" "}
          <a href="mailto:support@quicktalog.app" className="text-product-primary underline">
            support@quicktalog.app
          </a>
          .
        </p>
      </div>
      <Footer />
    </>
  )
}
