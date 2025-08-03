import { NextRequest } from 'next/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);

    if (event.type === 'user.created') {
      const { id, email_addresses, first_name, last_name, image_url } = event.data;
      const email = email_addresses?.[0]?.email_address || null;
      const cookiesStore = await cookies()
      const supabase = createClient(cookiesStore);
      await supabase.from('users').upsert([
        {
          id: id,
          email,
          image: image_url,
          name: `${first_name} ${last_name}`,
          plandId: "798b23bf-69e5-4372-ba02-6b90b7d90da1"
        }
      ]);
    }

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
