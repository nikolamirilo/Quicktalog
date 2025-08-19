import { Customer } from "@paddle/paddle-node-sdk";

// Define the Paddle API response type
interface PaddleCustomerResponse {
    data?: Customer
    error?: {
        type: string
        code: string;
        detail: string;
        documentation_url: string;
    };
    meta: {
        request_id: string
    }
}

export async function createPaddleCustomer(email: string, full_name: string) {

    try {
        const response = await fetch("https://api.paddle.com/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
            },
            body: JSON.stringify({
                email,
                name: full_name
            }),
        });

        const data: PaddleCustomerResponse = await response.json();

        if (!response.ok || data.error) {
            return {
                error: "Failed to create customer",
                details: data.error?.detail || "Unknown error",
            };
        }

        return {
            success: true,
            customer: data.data,
        };
    } catch (error) {
        return {
            error: "Server error",
            details: error instanceof Error ? error.message : "Unknown error",
        };
    }
}
