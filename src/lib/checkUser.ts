"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
import type { User } from "@prisma/client";

export const checkUser = async (): Promise<User | null> => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserID: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();
    const email = user.emailAddresses?.[0]?.emailAddress || "";

    const newUser = await db.user.create({
      data: {
        clerkUserID: user.id,
        name,
        imageUrl: user.imageUrl || "",
        email,
      },
    });

    return newUser;
  } catch (error: any) {
    console.error("Error in checkUser:", error);
    return null;
  }
};
