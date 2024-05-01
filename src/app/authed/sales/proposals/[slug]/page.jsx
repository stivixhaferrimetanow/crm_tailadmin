import React from 'react'
import PdfForm from '@/components/ui/PdfFrom'


const page = async ({params}) => {

    const slug = params.slug
    
    const getProposals = async () => {
        try{
          const res = await fetch(`http://localhost:3000/api/getproposals` ,{'cache': 'no-store'});
          const data = await res.json();
          return data.data;
        }catch(error){
          console.log(error)
        }
      }


      const proposals = await getProposals()


      const thisProposal = proposals.filter((el) => el._id == slug);

      console.log(thisProposal)
   

    return(
        <div className='w-full  flex items-center'>

            
            <div className='w-full'>
              <PdfForm  data={thisProposal} />
            </div>
            
        </div>
    )
}


export default page