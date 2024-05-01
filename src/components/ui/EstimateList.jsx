'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

const EstimateList = () => {
  return (
    <div className='w-full px-2'>
        <Tabs defaultValue="account" className="w-[100%]">
        <TabsList>
        <TabsTrigger value="draft" >Draft</TabsTrigger>
        <TabsTrigger value="sent">Sent</TabsTrigger>
        <TabsTrigger value="expired">Expired</TabsTrigger>
        <TabsTrigger value="declined">Declined</TabsTrigger>
        </TabsList>
        <TabsContent value="draft" className="w-ful p-1">
          <div className='grid p-2 gap-5 grid-cols-4'>

          <Card className="shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle>First Estimate</CardTitle>
              <CardDescription>Joe Doe</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Total: 50000$</p>
            </CardContent>
            <CardFooter>
              <Link  href={`/authed/sales/estimates/first_estiamte`}>View</Link>
            </CardFooter>
          </Card>


          

          </div>
        </TabsContent>
        <TabsContent value="sent" className="w-ful p-1">

          <div className='grid p-2 gap-5 grid-cols-4'>
          <Card className="shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle>First Estimate</CardTitle>
              <CardDescription>Joe Doe</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Total: 50000$</p>
            </CardContent>
            <CardFooter>
              <Link  href={`/authed/sales/estimates/first_estiamte`}>View</Link>
            </CardFooter>
          </Card>


          <Card className="shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle>Second Estimate</CardTitle>
              <CardDescription>Joe Doe</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Total: 25000$</p>
            </CardContent>
            <CardFooter>
              <Link  href={`/authed/sales/estimates/first_estiamte`}>View</Link>
            </CardFooter>
          </Card>


          <Card className="shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle>Second Estimate</CardTitle>
              <CardDescription>Joe Doe</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Total: 25000$</p>
            </CardContent>
            <CardFooter>
              <Link  href={`/authed/sales/estimates/first_estiamte`}>View</Link>
            </CardFooter>
          </Card>


          <Card className="shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle>Second Estimate</CardTitle>
              <CardDescription>Joe Doe</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Total: 25000$</p>
            </CardContent>
            <CardFooter>
              <Link  href={`/authed/sales/estimates/first_estiamte`}>View</Link>
            </CardFooter>
          </Card>

          <Card className="shadow-lg cursor-pointer">
            <CardHeader>
              <CardTitle>Second Estimate</CardTitle>
              <CardDescription>Joe Doe</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Total: 25000$</p>
            </CardContent>
            <CardFooter>
              <Link  href={`/authed/sales/estimates/first_estiamte`}>View</Link>
            </CardFooter>
          </Card>
          </div>
        </TabsContent>
        <TabsContent value="expired" className="w-ful p-1">
          No Expired Estimates
        </TabsContent>
        <TabsContent value="declined" className="w-ful p-1">
          No Declined Estimates
        </TabsContent>
        </Tabs>
  </div>
  )
}

export default EstimateList