'use server'

import { revalidatePath } from 'next/cache'

export async function updateBusinessAccount(formData) {
  try {
    // Here you would typically update the business account in your database
    console.log('Updating business account:', formData)

    revalidatePath('/admin/account')
    return { success: true }
  } catch (error) {
    console.error('Error updating business account:', error)
    return { success: false, error: error.message }
  }
}
