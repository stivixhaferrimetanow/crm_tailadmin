import UserModel from "@/models/user";
import connect from "@/lib/db";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function POST(req, res) {
  connect();
  

  try {
    const authHeader = req.headers.get('Authorization')
    const body = await req.json();
    
    const user = body.user
    if (!authHeader) {  
      return NextResponse.json({ msg: 'No authHeader' });
    }
    const myAccount = await UserModel.findOne({email: user});
    if(!myAccount){
       
        return NextResponse.json({ msg: 'No Account' });
    }
    
    return NextResponse.json({ data: myAccount } , {status: 200});
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
