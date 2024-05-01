'use client'
import react , {useState , useEffect} from 'react'
import axios from 'axios'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {toast} from 'sonner';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"




const DraftTabs = () => {


    const [sentVal, setSentVal] = useState('');
    const [seenVal , setSeenVal] = useState('');
    const [declinedVal , setDeclinedVal] = useState('');
    const [expiredVal , setExpiredVal] = useState('');
    const [acceptedVal , setAcceptedVal] = useState('');





    const [data , setData ] = useState([]);
    const [sent , setSent] = useState([]);
    const [seen , setSeen ] = useState([]);
    const [declined , setDeclined] = useState([]);
    const [expired , setExpired] = useState([]);
    const [accepted , setAccepted] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await axios.get(`http://localhost:3000/api/drafts`, {'cache': 'no-store'});
                const myData = res.data.data;
                const sentData = myData.filter((el) => el.status == 'Draft');
                const seenData = myData.filter((el) => el.status == 'Seen');
                const declinedData = myData.filter((el) => el.status == 'Declined');
                const expiredData = myData.filter((el) => el.status == 'Expired');
                const acceptedData = myData.filter((el) => el.statsu == 'Accepted');
                setSent(sentData);
                setSeen(seenData)
                setDeclined(declinedData)
                setExpired(expiredData)
                setAccepted(acceptedData)
                setData(myData)                
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
    },[])



    const updateDraft = async (id , status) => {
        try{
            if(status == 'Draft'){
                const res = await axios.post(`${process.env.DOMAIN}/api/update_draft`, {_id: id , value: sentVal}, {'cache': 'no-store'});
                console.log(res);
                toast(`${res.msg}`)
            }
            
        }catch(error){
            console.log(error)
        }
    }

    console.log(data , 'data items with tabs')
    return(
        <div className='w-full my-2'>
            <Tabs defaultValue="account" className="w-full">
            <TabsList>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="seen">Seen</TabsTrigger>
                <TabsTrigger value="declined">Declined</TabsTrigger>
                <TabsTrigger value="expired">Expired</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
            </TabsList>
            <TabsContent value="sent" className="w-full">
                <div className='grid grid-cols-4 gap-2 w-full '>
                    {sent && sent.map((el , index) => {
                        return <Card className="w-full">
                        <CardHeader>
                          <CardTitle>{el.subject}</CardTitle>
                          <CardDescription>Status: Sent</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Total: {el.total}</p>
                          <br />
                          <select onChange={(e) => setSentVal(e.target.value)} name="" className='focus:outline-none text-3xl p-3' id="">
                            <option value="">Select</option>
                            <option value="Seen">Seen</option>
                            <option value="Declined">Declined</option>
                            <option value="Accepted">Accepted</option>
                          </select>
                          <br />
                          <button  onClick={() => updateDraft(el._id , el.status )} className='px-2 py-1 mt-3 text-white bg-black rounded'>Save</button>
                        </CardContent>
                        <CardFooter>
                          <p>Open Till: {el.open_till}</p>
                        </CardFooter>
                      </Card>
                    })}
                </div>
            </TabsContent>
            <TabsContent value="seen">
            <div className='grid grid-cols-4 gap-2 w-full '>
                    {seen && seen.map((el , index) => {
                        return <Card className="w-full">
                        <CardHeader>
                          <CardTitle>{el.subject}</CardTitle>
                          <CardDescription>Status: Sent</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Total: {el.total}</p>
                          
                          <select onChange={(e) => setSentVal(e.target.value)} name="" id="">
                            <option value="">Select</option>
                            <option value="Seen">Seen</option>
                            <option value="Declined">Declined</option>
                            <option value="Accepted">Accepted</option>
                          </select>
                          <br />
                          <button  onClick={() => updateDraft(el._id , el.status )} className='px-2 py-1 mt-3 text-white bg-black rounded'>Save</button>
                        </CardContent>
                        <CardFooter>
                          <p>Open Till: {el.open_till}</p>
                        </CardFooter>
                      </Card>
                    })}
                </div>
            </TabsContent>
            <TabsContent value="declined">
           
            </TabsContent>
            <TabsContent value="expired">Expired</TabsContent>
            <TabsContent  value="accepted" >Accepted</TabsContent>
            </Tabs>
        </div>
    )
}


export default DraftTabs