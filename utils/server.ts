"use server"
import { revalidatePath, revalidateTag } from "next/cache"
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function revalidateData() {
  revalidatePath("/", "layout")
}
export async function revalidateTagCustom(tag: string) {
  revalidateTag(tag)
}

export async function deleteServiceCatalogue(id: string): Promise<boolean> {
  const supabase = createClient(await cookies());
  const { error } = await supabase.from('service_catalogues').delete().eq('id', id);
  return !error;
}

export async function duplicateServiceCatalogue(id: string) {
  const supabase = createClient(await cookies());
  // Fetch the original record
  const { data, error } = await supabase.from('service_catalogues').select('*').eq('id', id).single();
  if (error || !data) return null;
  // Remove id and update name
  const { id: _oldId, name, ...rest } = data;
  let newName = name;
  // Ensure the new name is unique by appending '-copy' or incrementing if needed
  let suffix = '-copy';
  let tryName = newName + suffix;
  let count = 1;
  while (true) {
    const { data: exists } = await supabase.from('service_catalogues').select('id').eq('name', tryName);
    if (!exists || exists.length === 0) break;
    tryName = `${newName}${suffix}${count}`;
    count++;
  }
  // Insert the duplicate
  const { data: newData, error: insertError } = await supabase.from('service_catalogues').insert({ ...rest, name: tryName }).select().single();
  if (insertError) return null;
  return newData;
}
