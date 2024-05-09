import { asc, eq } from "drizzle-orm";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableHeadCell,
  Button,
} from "flowbite-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { jellyBeans } from "~/server/db/schema";

export default async function HomePage() {
  const beans = await db.query.jellyBeans.findMany({
    orderBy: [asc(jellyBeans.id)],
  });

  return (
    <main className="p-12">
      <h1 className="m-12 text-5xl font-extrabold dark:text-white">
        Jelly Beans Admin Panel
      </h1>

      <div className="p-8">
        <div className="pb-4">
          <Table>
            <TableHead>
              <TableHeadCell>#</TableHeadCell>
              <TableHeadCell>Flavor</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableHead>
            <TableBody>
              {beans.map((jellyBean) => (
                <TableRow key={jellyBean.id}>
                  <TableCell>{jellyBean.id}</TableCell>
                  <TableCell>{jellyBean.flavor}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button color="blue" pill>
                      Edit
                    </Button>
                    <form
                      action={async () => {
                        "use server";

                        await deleteJellyBean(jellyBean.id);
                      }}
                    >
                      <Button type="submit" color="failure" pill>
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Button color="success" pill>
          Add New Flavor
        </Button>
      </div>
    </main>
  );
}

async function deleteJellyBean(id: number) {
  await db.delete(jellyBeans).where(eq(jellyBeans.id, id));
  revalidatePath("/");
}
