"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { MdSave } from "react-icons/md";

export default function BeanForm({
  id,
  flavor,
  editJellyBean,
}: {
  id: number;
  flavor: string;
  editJellyBean: (formData: FormData) => void;
}) {
  const [currentFlavor, setCurrentFlavor] = useState(flavor);

  const handleChange = (event: { target: { value: string } }) => {
    setCurrentFlavor(event.target.value);
  };

  return (
    <form action={editJellyBean}>
      <Input
        id="id"
        name="id"
        value={id}
        hidden
        type="number"
        className="hidden"
      />
      <Label htmlFor="flavor">Flavor</Label>
      <Input
        id="flavor"
        name="flavor"
        value={currentFlavor}
        onChange={handleChange}
      />
      <Button type="submit">
        <MdSave className="mr-2 h-4 w-4" />
        Save
      </Button>
    </form>
  );
}
