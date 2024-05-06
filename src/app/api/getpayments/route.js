import connect from "@/lib/db";
import { NextResponse } from "next/server";
import PaymentModel from "@/models/payment";


export const dynamic = 'force-dynamic'


export async function GET(){
    try{
        await connect();

        const payments = await PaymentModel.find({});

        if(!payments){
            return NextResponse.json({msg: 'No payments in database', status: 201})
        }


        var total_balance = 0;
        var tax_reserve = 0;

        var credit_debit_count = 0;
        var apple_pay_count = 0;
        var stripe_count = 0;
        var paypal_count = 0;
        var google_pay_count = 0;
        var samsung_pay_count = 0;
        var cryptocurrency_count = 0;
        var westernunion_count = 0;
        var other_count = 0;


        payments.map((el) => {
            total_balance += el.value;
            tax_reserve += el.tax;

            if(el.payment_method == 'credit_debit'){
                credit_debit_count += 1
            }else if(el.payment_method == 'apple_pay'){
                apple_pay_count += 1
            }else if(el.payment_method == 'strpie'){
                stripe_count += 1;
            }else if(el.payment_method == 'google_pay'){
                google_pay_count += 1;

            }else if(el.payment_method == 'paypal'){
                paypal_count += 1
            }else if(el.payment_method == 'samsung_pay'){
                samsung_pay_count += 1
            }else if(el.payment_method == 'cryptocurrency'){
                cryptocurrency_count += 1
            }else if(el.payment_method == 'westerunion'){
                westernunion_count += 1
            }else if(el.payment_method == 'other'){
                other_count += 1
            }
        });


        var totalCount = credit_debit_count + apple_pay_count + stripe_count + google_pay_count + paypal_count + samsung_pay_count + cryptocurrency_count + westernunion_count + other_count;

    
        var creditDebitPercentage = (credit_debit_count / totalCount) * 100;
        var applePayPercentage = (apple_pay_count / totalCount) * 100;
        var stripePercentage = (stripe_count / totalCount) * 100;
        var googlePayPercentage = (google_pay_count / totalCount) * 100;
        var paypalPercentage = (paypal_count / totalCount) * 100;
        var samsungPayPercentage = (samsung_pay_count / totalCount) * 100;
        var cryptocurrencyPercentage = (cryptocurrency_count / totalCount) * 100;
        var westernUnionPercentage = (westernunion_count / totalCount) * 100;
        var otherPercentage = (other_count / totalCount) * 100;


        

        var responseData = {
            payments: payments,
            total_balance: total_balance,
            tax_reserve: tax_reserve,
            credit_debit_count: credit_debit_count,
            apple_pay_count: apple_pay_count,
            stripe_count: stripe_count,
            google_pay_count: google_pay_count,
            paypal_count: paypal_count,
            samsung_pay_count: samsung_pay_count,
            cryptocurrency_count: cryptocurrency_count,
            westernunion_count: westernunion_count,
            other_count: other_count,
            credit_debit_percentage: creditDebitPercentage.toFixed(2) ,
            apple_pay_percentage: applePayPercentage.toFixed(2) ,
            stripe_percentage: stripePercentage.toFixed(2) ,
            google_pay_percentage: googlePayPercentage.toFixed(2) ,
            paypal_percentage: paypalPercentage.toFixed(2) ,
            samsung_pay_percentage: samsungPayPercentage.toFixed(2) ,
            cryptocurrency_percentage: cryptocurrencyPercentage.toFixed(2) ,
            westernunion_percentage: westernUnionPercentage.toFixed(2) ,
            other_percentage: otherPercentage.toFixed(2) 
        };

        return NextResponse.json({data: responseData})

    }catch(error){
        return NextResponse.json({msg: error , status: 500})
    }
}