import { ReactNode } from "react";

export enum Language {
    English = "en",
    Slovak = "sk"
}

export enum ThemeName {
    Dark = "dark",
    Light = "light"
}

export type MenuItem = {
    icon?: ReactNode;
    kind: "menuitem";
    label: string;
    subMenu?: MenuItem[];
    to?: string;
};

export type NavigationMenuItem = MenuItem | SubHeaderItem;

export type SubHeaderItem = {
    kind: "subheader";
    label: string;
};
