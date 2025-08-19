import { Button } from "@/components/ui/button"
import Link from "next/link"

const page = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div
                className="w-full max-w-2xl py-12 px-6 mx-4 text-center transition-all transform bg-white shadow-lg rounded-xl hover:shadow-xl">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-orange-50 rounded-full">
                    <svg className="w-12 h-12 text-product-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>

                <h1 className="mb-6 text-4xl font-extrabold text-product-primary">
                    Payment Successful!
                </h1>

                <p className="mb-8 text-xl text-gray-700">
                    Thank you for your purchase.
                </p>

                {/* <div className="p-6 mb-8 rounded-lg bg-blue-50">
                    <p className="text-lg font-medium text-blue-700">
                        Your tool <span className="font-bold">"http://example.com"</span> will be listed shortly.
                    </p>
                </div> */}

                <div className="pt-8 mt-8 border-t border-gray-100">
                    <p className="text-lg text-gray-700">
                        Have questions? Contact us at:
                    </p>
                    <a href="mailto:quicktalog@outlook.com"
                        className="inline-block mt-2 text-xl font-medium text-product-secondary transition-colors duration-200">
                        quicktalog@outlook.com
                    </a>
                </div>

                <Button className="mt-12" size="lg" variant="cta">
                    <Link href="/admin/dasboard">
                        Return to Dashboard
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default page