import { db } from "./index";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { jellyBeans } from "./schema";
import { revalidatePath } from "next/cache";

export async function editJellyBean(formData: FormData) {
  "use server";
  const id = parseInt(formData.get("id") as string);
  const flavor = formData.get("flavor") as string;

  if (flavor) {
    await db
      .update(jellyBeans)
      .set({ flavor: flavor })
      .where(eq(jellyBeans.id, id));

    redirect("/");
  }
}

export async function deleteJellyBean(id: number) {
  await db.delete(jellyBeans).where(eq(jellyBeans.id, id));
  revalidatePath("/");
}

export async function addJellyBean(formData: FormData) {
  "use server";
  const flavor = formData.get("flavor") as string;
  await db.insert(jellyBeans).values({ flavor: flavor });
  redirect("/");
}
