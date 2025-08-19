import { getCustomerId } from '@/utils/paddle/get-customer-id'

const page = async () => {
    const res = await getCustomerId()
    console.log(res)
    return (
        <div>page</div>
    )
}

export default page