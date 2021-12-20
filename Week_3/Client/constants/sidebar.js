import { v4 as uuidv4 } from "uuid";

export const SIDEBAR_MODEL = [
  {
    id: uuidv4(),
    icon: "images/dashboard.png",
    title: "Dashboard",
    href: "Dashboard",
  },
  {
    id: uuidv4(),
    icon: "images/logs.png",
    title: "Logs",
    href: "Logs",
  },
  {
    id: uuidv4(),
    icon: "images/setting.jpg",
    title: "Settings",
    href: "Settings",
  },
];
