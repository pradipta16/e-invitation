"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function approveWish(wishId: string) {
  await prisma.wish.update({ where: { id: wishId }, data: { isApproved: true } });
  revalidatePath("/dashboard");
}

export async function rejectWish(wishId: string) {
  await prisma.wish.delete({ where: { id: wishId } });
  revalidatePath("/dashboard");
}
