"use client";

import { Table, Button } from "flowbite-react";

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
            <Table.Head>
              <Table.HeadCell>#</Table.HeadCell>
              <Table.HeadCell>Flavor</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {mockJellyBeans.map((jellyBean) => (
                <Table.Row
                  key={jellyBean.id}
                  className="border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                >
                  <Table.Cell>{jellyBean.id}</Table.Cell>
                  <Table.Cell>{jellyBean.flavor}</Table.Cell>
                  <Table.Cell className="flex gap-2">
                    <Button color="blue" pill>
                      Edit
                    </Button>
                    <Button color="failure" pill>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <Button color="success" pill>
          Add New Flavor
        </Button>
      </div>
    </main>
  );
}
