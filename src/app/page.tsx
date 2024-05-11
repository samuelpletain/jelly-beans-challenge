import { asc } from "drizzle-orm";
import Link from "next/link";
import { MdDelete, MdModeEdit, MdOutlineAdd } from "react-icons/md";
import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { db } from "~/server/db";
import { addJellyBean, deleteJellyBean } from "~/server/db/actions";
import { jellyBeans } from "~/server/db/schema";

export default async function HomePage() {
  const beans = await db.query.jellyBeans.findMany({
    orderBy: [asc(jellyBeans.id)],
  });

  return (
    <main className="p-12">
      <div className="flex flex-wrap justify-between gap-4">
        <h1 className="text-5xl font-extrabold dark:text-white">
          Jelly Beans Flavors
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-2xl">
              <MdOutlineAdd className="mr-2 h-4 w-4" />
              Add Flavor
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Flavor</DialogTitle>
              <DialogDescription>
                Add a new flavor to the Jelly Beans selection.
              </DialogDescription>
            </DialogHeader>
            <form action={addJellyBean}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="flavor" className="text-right">
                    Flavor
                  </Label>
                  <Input
                    id="flavor"
                    name="flavor"
                    placeholder="Strawberry"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">
                    <MdOutlineAdd className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-8">
        <div className="flex flex-wrap gap-4 pb-4">
          {beans.map((jellyBean) => (
            <Card key={jellyBean.id}>
              <CardHeader className="flex">
                <CardTitle>{jellyBean.flavor}</CardTitle>
              </CardHeader>
              <CardFooter className="flex justify-end gap-2">
                <Link href={`/bean/${jellyBean.id}`}>
                  <Button variant="outline">
                    <MdModeEdit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <form
                  action={async () => {
                    "use server";

                    await deleteJellyBean(jellyBean.id);
                  }}
                >
                  <Button type="submit" variant="destructive">
                    <MdDelete className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </form>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
