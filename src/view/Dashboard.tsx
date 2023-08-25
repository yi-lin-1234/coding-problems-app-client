import { useState } from "react";

import {
  ChartBarIcon,
  HomeIcon,
  PlusCircleIcon,
  TagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { Link, Outlet } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Dashboard() {
  const [currentTab, setCurrentTab] = useState("Mentors");
  const navigation = [
    {
      name: "home",
      href: "home",
      icon: HomeIcon,
      current: currentTab === "home",
    },
    {
      name: "create",
      href: "create",
      icon: PlusCircleIcon,
      current: currentTab === "create",
    },
    {
      name: "search",
      href: "search",
      icon: MagnifyingGlassIcon,
      current: currentTab === "search",
    },
    {
      name: "topic",
      href: "topic",
      icon: TagIcon,
      current: currentTab === "topic",
    },
    {
      name: "difficulty",
      href: "difficulty",
      icon: TagIcon,
      current: currentTab === "difficulty",
    },
    {
      name: "chart",
      href: "chart",
      icon: ChartBarIcon,
      current: currentTab === "chart",
    },
  ];

  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
          <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-12 w-auto"
              src="https://res.cloudinary.com/yilin1234/image/upload/v1692839731/logo-ds_yshkji.png"
              alt="logo"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li
                      key={item.name}
                      onClick={() => setCurrentTab(item.name)}
                    >
                      <Link
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <main className="lg:pl-72">
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
