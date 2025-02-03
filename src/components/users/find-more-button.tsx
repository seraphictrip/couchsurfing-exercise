"use client";

import { redirect } from "next/navigation";

interface FindMoreButtonProps {
  max: number;
}

export default function FindMoreButton({ max }: FindMoreButtonProps) {
  const handleFindMoreClick = () => {
    const offset = Math.floor(Math.random() * max);
    redirect(`/?offset=${offset}`);
  };
  return (
    <button
      type="button"
      className="text-white py-1 px-4 bg-blue-500 hover:bg-blue-400 "
      onClick={handleFindMoreClick}
    >
      Find more
    </button>
  );
}
