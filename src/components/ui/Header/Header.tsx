"use client";

import { Tabs } from "@/components/tabs/Tabs";
import { Session } from "next-auth";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const { data: session, status } = useSession();
  return (
    <header className="flex h-24 w-full items-center justify-between gap-4 rounded-xl px-10 py-4 shadow-xl ">
      <h1 className="text-2xl font-bold text-text">
        <Link href={"/"}>Nayata</Link>
      </h1>
      {status == "authenticated" && (
        <>
          <Tabs />
          <Profile session={session} status={status} />
        </>
      )}
    </header>
  );
};

export const Profile = ({
  session,
  status,
}: {
  session: Session;
  status: string;
}) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  return (
    <div
      onClick={toggleDropdown}
      className="relative flex cursor-pointer items-center justify-center gap-4 rounded-lg bg-primary px-8 py-2"
    >
      <Image
        className="h-12 w-12 rounded-full"
        src={session.user?.image as string}
        width={24}
        height={24}
        alt="Profile image"
      />
      <p className="text-xl font-bold text-text">{session.user?.name}</p>
      {dropdownIsOpen && <Dropdown />}
    </div>
  );
};

export const Dropdown = () => {
  const handleSignout = () => {
    signOut();
  };

  return (
    <div className="absolute left-0 top-20 flex w-full flex-col rounded-xl bg-primary py-2 ">
      <button
        onClick={handleSignout}
        className="z-10 h-full w-full cursor-pointer rounded-xl hover:bg-primary/70"
      >
        Sign out
      </button>
    </div>
  );
};
