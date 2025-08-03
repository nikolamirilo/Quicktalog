import { currentUser } from "@clerk/nextjs/server";

export async function subsribeToNewsletter(email: string) {
    try {
        const res = await fetch("/api/newsletter/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (data.error) {
            console.error("Error subscribing to newsletter:", data.error);
            return false;
        } else {
            return true
        }
    }
    catch (error: any) {
        console.error("Error subscribing to newsletter:", error);
        return false
    }
}
export async function subscribeToPlan(email: string) {
    try {
        const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (data.error) {
            console.error("Error subscribing to pricing plan:", data.error);
            return false;
        } else {
            return true
        }
    }
    catch (error: any) {
        console.error("Error subscribing to newsletter:", error);
        return false
    }
}

export async function getUserData() {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      throw new Error('User not authenticated');
    }

    const res = await fetch(`${process.env.BASE_URL}/api/users/${user.id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch user data: ${res.status} ${res.statusText}`);
    }

    const userData = await res.json();
    return userData;
  } catch (error) {
    console.error('Error in getUserData:', error);
    return null; // or throw error if you want the caller to handle it
  }
}
