import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { jellyBeans } from "~/server/db/schema";
import EditBeanForm from "~/components/EditBeanForm";
import { editJellyBean } from "~/server/db/actions";

export const metadata = {
  title: "Edit Jelly Bean Flavor",
  description: "A place to edit a Jelly Beans flavor.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function BeanPage({ params }: { params: { id: string } }) {
  const bean: {
    id: number;
    flavor: string;
    createdAt: Date;
    updatedAt: Date | null;
  }[] = await db.query.jellyBeans.findMany({
    where: eq(jellyBeans.id, parseInt(params.id)),
  });

  return (
    <main>
      <h1 className="mb-8 text-5xl font-extrabold dark:text-white">
        {"Edit Jelly Bean Flavor" ?? "This Jelly Bean does not exists yet..."}
      </h1>
      {bean[0] && (
        <EditBeanForm
          flavor={bean[0]?.flavor}
          id={bean[0]?.id}
          editJellyBean={editJellyBean}
        />
      )}
    </main>
  );
}
