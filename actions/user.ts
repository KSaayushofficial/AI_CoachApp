"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { DemandLevel } from "@prisma/client";

export async function updateUser(data){
const {userId} = await auth();
if(!userId) throw new Error("Unauthorized");
const user = await db.user.findUnique({where:{id:userId}});
where : {
      clerkUserId : userId
},
});
if(!user) throw new Error("User not found");
try {
//  yedi industry xw vane
//  yedi industry xainw vane paxi chaye AI le industry insights dinxw
const result = await db.$transaction(
      async (tx)=>{
      //  yedi industry xw vane
      let industryInsight = await tx.industryInsights.findUnique({
            where: {
                  industry: data.industry,
            }
      });
//  yedi industry xainw vane paxi chaye AI le industry insights dinxw
if(!industryInsight){
      industryInsight = await tx.industryInsights.create({
            data: {
                  industry: data.industry,
                  salaryRanges: [],
                  growthRate:0,
                  demandLevel: "Medium",
                  topSkills : [],
                  marketOutlook: "Neutral",
                  keyTrends: [],
                  recommendedSkills: [],
                  nextUpdate: new Date(Date.now()+7*24*60*1000),

            },
      });
},
{
      timeout: 10000,
}
);
return result.user;
} catch(error){
console.log("Error updating user and industry:", error.message);
throw new Error ("Failed to update profile");
}
}