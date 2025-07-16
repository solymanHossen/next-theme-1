"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Palette,
  LogOut,
  X,
  Store,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    children: [
      {
        name: "General",
        href: "/admin/settings/general",
      },
      {
        name: "Theme Customizer",
        href: "/admin/settings/theme",
        icon: Palette,
      },
    ],
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-slate-900 dark:text-slate-100">
              Admin Panel
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavItem item={item} pathname={pathname} />
                    </li>
                  ))}
                </ul>
              </li>

              {/* Logout */}
              <li className="mt-auto">
                <button className="group -mx-2 flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400">
                  <LogOut className="h-6 w-6 shrink-0" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`relative z-50 lg:hidden ${isOpen ? "" : "hidden"}`}>
        <div className="fixed inset-0 flex">
          <div className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button onClick={onClose} className="-m-2.5 p-2.5">
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-slate-800 px-6 pb-4">
              {/* Logo */}
              <div className="flex h-16 shrink-0 items-center">
                <Store className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                  Admin Panel
                </span>
              </div>

              {/* Navigation */}
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <NavItem item={item} pathname={pathname} />
                        </li>
                      ))}
                    </ul>
                  </li>

                  {/* Logout */}
                  <li className="mt-auto">
                    <button className="group -mx-2 flex w-full gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400">
                      <LogOut className="h-6 w-6 shrink-0" />
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface NavItemProps {
  item: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    children?: {
      name: string;
      href: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  };
  pathname: string;
}

function NavItem({ item, pathname }: NavItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(
    item.children?.some((child) => pathname.startsWith(child.href)) || false
  );

  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");
  const Icon = item.icon;

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 ${
            isActive
              ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
        >
          <Icon className="h-6 w-6 shrink-0" />
          {item.name}
          <svg
            className={`ml-auto h-5 w-5 shrink-0 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isExpanded && (
          <ul className="mt-1 px-2">
            {item.children.map((child) => {
              const childIsActive = pathname === child.href;
              const ChildIcon = child.icon;

              return (
                <li key={child.name}>
                  <Link
                    href={child.href}
                    className={`group flex w-full items-center gap-x-3 rounded-md py-2 pl-6 pr-2 text-sm leading-6 ${
                      childIsActive
                        ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    {ChildIcon && <ChildIcon className="h-4 w-4 shrink-0" />}
                    {child.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
        isActive
          ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400"
      }`}
    >
      <Icon className="h-6 w-6 shrink-0" />
      {item.name}
    </Link>
  );
}
