import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { jellyBeans } from "~/server/db/schema";
import EditBeanForm from "~/components/EditBeanForm";
import { editJellyBean } from "~/server/db/actions";

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
    <div>
      <h1>{bean[0]?.flavor ?? "Loading..."}</h1>
      {bean[0] && (
        <EditBeanForm
          flavor={bean[0]?.flavor}
          id={bean[0]?.id}
          editJellyBean={editJellyBean}
        />
      )}
    </div>
  );
}
