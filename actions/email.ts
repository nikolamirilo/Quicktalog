//@ts-nocheck
"use server";
import InformationEmail from "@/components/emails/InformationEmail";
import { resend } from "@/constants/server";
import { ContactData } from "@/types";

export async function 
sendEmail(contactData:ContactData) {
    const {message, email, name, subject} = contactData
    try{
       const res = await resend.emails.send({
            from: 'Quicktalog<office@quicktalog.app>',
            to: "quicktalog@outlook.com",
            subject: subject,
            reply_to: email,
            react: InformationEmail({
              email, name, message, subject
            }) as React.ReactElement,
          });
          console.log(res)
          if(res.error == null){
          return true
          }
    }catch(error:any){
        console.log(error)
        return false
    }
  }