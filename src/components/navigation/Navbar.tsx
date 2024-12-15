"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CheckSquare,
  Gift,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Users,
  Menu,
} from "lucide-react";

interface SidebarProps {
  role?: "user" | "admin";
  userName?: string;
}

export default function Sidebar({
  role = "admin",
  userName = "Jean-Baptiste",
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (path: string) => pathname === path;

  const adminMenuItems = [
    { label: "Tableau de bord", path: "/", icon: Home },
    { label: "Gestion des tâches", path: "/tasks", icon: CheckSquare },
    { label: "Récompenses", path: "/rewards", icon: Gift },
    { label: "Utilisateurs", path: "/users", icon: Users },
    { label: "Paramètres", path: "/settings", icon: Settings },
  ];

  const userMenuItems = [
    { label: "Mes tâches", path: "/my-tasks", icon: CheckSquare },
    { label: "Mes récompenses", path: "/my-rewards", icon: Trophy },
  ];

  const menuItems = role === "admin" ? adminMenuItems : userMenuItems;

  const NavLink = ({ item }: { item: (typeof menuItems)[0] }) => {
    const Icon = item.icon;
    return (
      <Link
        href={item.path}
        className={`
          flex items-center p-3 mb-2 rounded-lg transition-colors
          hover:bg-blue-50 hover:text-blue-600
          ${
            isLinkActive(item.path)
              ? "bg-blue-100 text-blue-600"
              : "text-gray-700"
          }
        `}
      >
        <Icon className="w-5 h-5" />
        {(isExpanded || isMobileOpen) && (
          <span className="ml-3">{item.label}</span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Overlay mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Bouton menu mobile */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-20 p-2 rounded-lg bg-white shadow-lg lg:hidden"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg z-30
          transition-all duration-300 ease-in-out
          ${isExpanded ? "w-64" : "w-20"} 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
        `}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between p-4 border-b">
          {isExpanded || isMobileOpen ? (
            <div className="text-lg font-semibold text-gray-800">
              {userName}
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              {userName.charAt(0)}
            </div>
          )}

          {/* Bouton expand/collapse (desktop seulement) */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden lg:block p-1 rounded-lg hover:bg-gray-100"
          >
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        {/* Menu principal */}
        <nav className="p-4 flex-1">
          {menuItems.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </nav>

        {/* Bouton déconnexion */}
        <div className="border-t p-4">
          <button
            onClick={() => {
              /* Logique de déconnexion */
            }}
            className="flex items-center p-3 w-full rounded-lg text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            {(isExpanded || isMobileOpen) && (
              <span className="ml-3">Se déconnecter</span>
            )}
          </button>
        </div>
      </aside>

      {/* Marge pour le contenu principal */}
      <div className={`lg:${isExpanded ? "ml-64" : "ml-20"}`}>
        {/* Votre contenu principal ici */}
      </div>
    </>
  );
}
