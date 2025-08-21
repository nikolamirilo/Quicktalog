import { getTransactions } from '@/utils/paddle/get-transactions'
import { createClient } from '@/utils/supabase/server'
import { currentUser } from '@clerk/nextjs/server'

const page = async () => {
    const supabase = await createClient()
    const clerkUser = await currentUser()
    const { data: user } = await supabase.from("users").select("*").eq("id", clerkUser.id).single()
    const { data: subscriptions } = await supabase.from("subscriptions").select("*").eq("customer_id", user.customer_id)
    const res = await getTransactions(subscriptions[0].subscription_id, '')
    console.log(res)
    return (
        <div>page</div>
    )
}

export default page