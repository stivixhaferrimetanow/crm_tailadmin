import connect from "@/lib/db";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { Resend } from "resend";
import DraftModel from "@/models/draft";


export const dynamic = "force-dynamic";


export async function POST(req){
    connect();
    try{
        const data = await req.formData();
        const subject = data.get('subject');
        const _id = data.get('_id');
        const total = data.get('total');
        const user = data.get('user');
        const status = data.get('status');
        const open_till = data.get('open_till');

        const pdfFile = data.get('file');
        const fileBuffer = await pdfFile.arrayBuffer();



        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;



        const resend = new Resend(process.env.RESEND_KEY || 're_8AMHUQgN_NoqUddL8RazJJfM7AqYNpMma');

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'stivixhaferri01@gmail.com',
            subject: subject,
            text: 'Hello!',
            html: 'Message Here',
            attachments: [
                {
                  filename: 'invoice.pdf',
                  content: Buffer.from(fileBuffer),
                },
              ],
          });



          const draft = new DraftModel({
            subject: subject,
            user_id: _id,
            status: status,
            total: total,
            open_till: open_till,
            user: user,
            sent: formattedDate
          })


          await draft.save();


        return NextResponse.json({ msg: 'Success', status: 200 });
        
    } catch(error) {
        return NextResponse.json({ msg: error.message, status: 500 });
    }
}
