import connect from '../lib/db.js'
import UserModel from '../models/user.js'


export async function getAccount(req , res){
    try {
        await connect();
        const authHeader = req.headers.get('Authorization')
        const body = await req.body;
        
        const user = body.user
        if (!authHeader) {  
          return res.json({ msg: 'No authHeader' });
        }
        const myAccount = await UserModel.findOne({email: user});
        if(!myAccount){
           
            return res.json({ msg: 'No Account' });
        }
        
        return res.json({ data: myAccount } , {status: 200});
      } catch (error) {
        return res.json({ error: 'Internal Server Error' });
      }
}

