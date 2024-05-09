import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TableHeadCell,
  Button,
} from "flowbite-react";

const mockJellyBeans = [
  {
    id: 1,
    flavor: "Blueberry",
  },
  {
    id: 2,
    flavor: "Strawberry",
  },
  {
    id: 3,
    flavor: "Lemon",
  },
];

export default function HomePage() {
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
              {mockJellyBeans.map((jellyBean) => (
                <TableRow
                  key={jellyBean.id}
                  className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                >
                  <TableCell>{jellyBean.id}</TableCell>
                  <TableCell>{jellyBean.flavor}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button color="blue" pill>
                      Edit
                    </Button>
                    <Button color="failure" pill>
                      Delete
                    </Button>
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
