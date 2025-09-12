//@ts-nocheck
"use server"
import { NewCatalogueEmail } from "@/components/emails"
import InformationEmail from "@/components/emails/InformationEmail"
import { resend } from "@/constants/server"
import { ContactData } from "@/types"

export async function sendContactEmail(contactData: ContactData) {
  const { message, email, name, subject } = contactData
  try {
    const res = await resend.emails.send({
      from: "Quicktalog<office@quicktalog.app>",
      to: "quicktalog@outlook.com",
      subject: subject,
      reply_to: email,
      react: InformationEmail({
        email,
        name,
        message,
        subject,
      }) as React.ReactElement,
    })
    console.log(res)
    if (res.error == null) {
      return true
    }
  } catch (error: any) {
    console.log(error)
    return false
  }
}
export async function sendNewCatalogueEmail(
  contactData: Omit<ContactData, "message" | "subject">,
  catalogueName: string,
  catalogueSlug: string
) {
  const { email, name } = contactData
  try {
    const res = await resend.emails.send({
      from: "Quicktalog<office@quicktalog.app>",
      to: email,
      subject: `[Quicktalog] Your Catalogue ${catalogueName} is Live! 🚀`,
      react: NewCatalogueEmail({
        name,
        catalogueName,
        catalogueSlug,
      }) as React.ReactElement,
    })
    console.log(res)
    if (res.error == null) {
      return true
    }
  } catch (error: any) {
    console.log(error)
    return false
  }
}
