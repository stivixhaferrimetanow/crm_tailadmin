import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Timestamp from "@/models/timestamp";
import ProductionModel from "@/models/production";



export const dynamic = "force-dynamic";



export async function GET(){
    try{    
        const timestamps = await Timestamp.find({});
        const production = await ProductionModel.find({});




        let started_total_price = 0;
        let planning_total_price = 0;
        let research_total_price = 0;
        let development_total_price = 0;
        let testing_total_price = 0;
        let review_total_price = 0;
        let finished_total_price = 0;



        if(!timestamps || !production ){
            return NextResponse.json({msg: 'Can not calculat ebecause either timestamps or produciton items are missing'})
        }


        const productionStarted = production.filter((el) => el.status == 'Started');
        productionStarted && productionStarted.map((el) => {
            started_total_price += el.total_cost
        });


        const productionPlanning = production.filter((el) => el.status == 'Planning');
        productionPlanning && productionPlanning.map((el) => {
            planning_total_price += el.total_cost
        });



        const producitonResearch = production.filter((el) => el.status == 'Research');
        producitonResearch && producitonResearch.map((el) => {
            research_total_price += el.total_cost
        })


        const producitonDevelopment = production.filter((el) => el.status == 'Development');
        producitonDevelopment && producitonDevelopment.map((el) => {
            development_total_price += el.total_cost;
        })


        const productionTesting = production.filter((el) => el.status == 'Testing');
        productionTesting && productionTesting.map((el) => {
            testing_total_price += el.total_cost
        })


        const producitonReview = production.filter((el) => el.status == 'Review');
        producitonReview && producitonReview.map((el) => {
            review_total_price += el.total_cost;
        })

        const productionFinished = production.filter((el) => el.status == 'Finished');
        productionFinished && productionFinished.map((el) => {
            finished_total_price += el.total_cost
        })




        return NextResponse.json({data: [  JSON.parse(started_total_price)  , JSON.parse(planning_total_price)  ,  JSON.parse(research_total_price)  , JSON.parse(development_total_price)  , JSON.parse(testing_total_price)  , JSON.parse(review_total_price)  , JSON.parse(finished_total_price) ] , status: 200});




    }catch(error){
        return NextResponse.json({status: 500 , msg: 'Error calculating the data for second tremor'})
    }
}