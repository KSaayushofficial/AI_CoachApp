"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

interface UpdateUserData {
  industry: string;
  experience: number;
  bio: string;
  skills: string[];
}


export async function updateUser(
  data: UpdateUserData
): Promise<{ success: boolean; updatedUser: any; industryInsight: any }> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserID: userId }, // Ensure this matches your Prisma schema
  });

  if (!user) throw new Error("User not found");

  try {
    const result = await db.$transaction(async (tx) => {
      // Check if industry insights already exist
      let industryInsight = await tx.industryInsight.findUnique({
        where: {
          industry: data.industry,
        },
      });

      // If not, create new industry insights
      if (!industryInsight) {
        industryInsight = await tx.industryInsight.create({
          data: {
            industry: data.industry,
            salaryRanges: [],
            growthRate: 0,
            topSkills: [],
            keyTrends: [],
            recommendedSkills: [],
            demandLevel: "MEDIUM", 
            marketOutlook: "NEUTRAL", 
            nextUpdated: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          },
        });
      }

      // Update the user
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          industry: data.industry,
          experience: data.experience,
          bio: data.bio,
          skills: data.skills,
        },
      });

      return { updatedUser, industryInsight };
    });

    return {success:true,...result}; // Return the updated user and industry insight
  } catch (error) {
    if (error instanceof Error) {
        console.error("Error updating user and industry:", error.message);
        throw new Error("Failed to update profile: " + error.message);
    } else {
        console.error("Error updating user and industry:", error);
        throw new Error("Failed to update profile");
    }
  }
}
 export async function getUserOnboardingStatus(){
const { userId } = await auth();
if (!userId) throw new Error("Unauthorized");

const user = await db.user.findUnique({
  where: { clerkUserID: userId }, // Ensure this matches your Prisma schema
});

if (!user) throw new Error("User not found");
try {
      const user = await db.user.findUnique({
            where: {
                  clerkUserID: userId,
            },
            select: {
                  industry: true,
            },
      });
      return {
            isOnboarded: !!user?.industry,
      };
} catch (error) {
      console.log(`Error getting user onboarding status for userId: ${userId}. Context: Fetching user industry.`, error);
      throw new Error("Failed to update profile");
}
 }