import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Timestamp from "@/models/timestamp";
import ProductionModel from "@/models/production";

export const dynamic = "force-dynamic";

export async function POST(req){
    try{    
        await connect();

        const body = await req.json();

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().replace(/\.(\d{3})Z$/, ".$1+00:00");


        const {item_id , current_status} = body;


        if (current_status === 'Started') { 
            try {
                const updatedItem = await Timestamp.findOneAndUpdate(
                    { item_id: item_id },
                    {
                        current_status: current_status, 
                        draft_end_time: currentDate,
                        started_start_time: currentDate,
                    },
                    { new: true }
                );


                const updateProduction = await ProductionModel.findByIdAndUpdate(item_id, {
                    status: current_status
                })



        
                if (!updatedItem) {
                    return NextResponse.json({ status: 404, msg: 'Item not found!' });
                }


                if(!updateProduction){
                    return NextResponse.json({stats: 404 , msg: 'Production item not found on DB!'})
                }
        
                return NextResponse.json({ status: 200, msg: 'Timestamp added successfully', item: updatedItem });
            } catch (error) {
               
            
                return NextResponse.json({ status: 500, msg: 'Error adding timestamp' });
            }
        }
        else if (current_status === 'Planning') { 
            try {
                const updatedItem = await Timestamp.findOneAndUpdate(
                    { item_id: item_id },
                    {
                        current_status: current_status, 
                        started_end_time: currentDate,
                        planning_start_time: currentDate,

                    },
                    { new: true }
                );


                const updateProduction = await ProductionModel.findByIdAndUpdate(item_id, {
                    status: current_status
                })



        
                if (!updatedItem) {
                    return NextResponse.json({ status: 404, msg: 'Item not found!' });
                }


                if(!updateProduction){
                    return NextResponse.json({stats: 404 , msg: 'Production item not found on DB!'})
                }
        
                return NextResponse.json({ status: 200, msg: 'Timestamp added successfully', item: updatedItem });
            } catch (error) {
               
            
                return NextResponse.json({ status: 500, msg: 'Error adding timestamp' });
            }
        }
        else if (current_status === 'Research') { 
            try {
                const updatedItem = await Timestamp.findOneAndUpdate(
                    { item_id: item_id },
                    {
                        current_status: current_status, 
                        planning_end_time: currentDate,
                        research_start_time: currentDate,
                        
                    },
                    { new: true }
                );


                const updateProduction = await ProductionModel.findByIdAndUpdate(item_id, {
                    status: current_status
                })



        
                if (!updatedItem) {
                    return NextResponse.json({ status: 404, msg: 'Item not found!' });
                }


                if(!updateProduction){
                    return NextResponse.json({stats: 404 , msg: 'Production item not found on DB!'})
                }
        
                return NextResponse.json({ status: 200, msg: 'Timestamp added successfully', item: updatedItem });
            } catch (error) {
               
            
                return NextResponse.json({ status: 500, msg: 'Error adding timestamp' });
            }
        }
        else if (current_status === 'Development') { 
            try {
                const updatedItem = await Timestamp.findOneAndUpdate(
                    { item_id: item_id },
                    {
                        current_status: current_status, 
                        research_end_time: currentDate,
                        development_start_time: currentDate,
                        
                    },
                    { new: true }
                );


                const updateProduction = await ProductionModel.findByIdAndUpdate(item_id, {
                    status: current_status
                })



        
                if (!updatedItem) {
                    return NextResponse.json({ status: 404, msg: 'Item not found!' });
                }


                if(!updateProduction){
                    return NextResponse.json({stats: 404 , msg: 'Production item not found on DB!'})
                }
        
                return NextResponse.json({ status: 200, msg: 'Timestamp added successfully', item: updatedItem });
            } catch (error) {
               
            
                return NextResponse.json({ status: 500, msg: 'Error adding timestamp' });
            }
        }
        else if (current_status === 'Testing') { 
            try {
                const updatedItem = await Timestamp.findOneAndUpdate(
                    { item_id: item_id },
                    {
                        current_status: current_status, 
                        development_end_time: currentDate,
                        testing_start_time: currentDate,
                        
                    },
                    { new: true }
                );


                const updateProduction = await ProductionModel.findByIdAndUpdate(item_id, {
                    status: current_status
                })



        
                if (!updatedItem) {
                    return NextResponse.json({ status: 404, msg: 'Item not found!' });
                }


                if(!updateProduction){
                    return NextResponse.json({stats: 404 , msg: 'Production item not found on DB!'})
                }
        
                return NextResponse.json({ status: 200, msg: 'Timestamp added successfully', item: updatedItem });
            } catch (error) {
               
            
                return NextResponse.json({ status: 500, msg: 'Error adding timestamp' });
            }
        }
        else if (current_status === 'Review') { 
            try {
                const updatedItem = await Timestamp.findOneAndUpdate(
                    { item_id: item_id },
                    {
                        current_status: current_status, 
                        testing_end_time: currentDate,
                        review_start_time: currentDate,
                        
                    },
                    { new: true }
                );


                const updateProduction = await ProductionModel.findByIdAndUpdate(item_id, {
                    status: current_status
                })



        
                if (!updatedItem) {
                    return NextResponse.json({ status: 404, msg: 'Item not found!' });
                }


                if(!updateProduction){
                    return NextResponse.json({stats: 404 , msg: 'Production item not found on DB!'})
                }
        
                return NextResponse.json({ status: 200, msg: 'Timestamp added successfully', item: updatedItem });
            } catch (error) {
               
            
                return NextResponse.json({ status: 500, msg: 'Error adding timestamp' });
            }
        }
        else if (current_status === 'Finished') { 
            try {
                const updatedItem = await Timestamp.findOneAndUpdate(
                    { item_id: item_id },
                    {
                        current_status: current_status, 
                        review_end_time: currentDate,
                        finished_start_time: currentDate,
                        total_end_time: currentDate
                    },
                    { new: true }
                );


                const updateProduction = await ProductionModel.findByIdAndUpdate(item_id, {
                    status: current_status
                })



        
                if (!updatedItem) {
                    return NextResponse.json({ status: 404, msg: 'Item not found!' });
                }


                if(!updateProduction){
                    return NextResponse.json({stats: 404 , msg: 'Production item not found on DB!'})
                }
        
                return NextResponse.json({ status: 200, msg: 'Timestamp added successfully', item: updatedItem });
            } catch (error) {
               
            
                return NextResponse.json({ status: 500, msg: 'Error adding timestamp' });
            }
        }



        console.log('here', item_id , current_status)
        return NextResponse.json({status: 200 , smg: 'Success', data: {item_id , current_status}})


    }catch(error){
        console.log(error);
        return NextResponse.json({status: 500 , msg: error})
    }
}