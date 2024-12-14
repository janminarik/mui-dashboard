import { ReactNode } from "react";

export enum Language {
    English = "en",
    Slovak = "sk"
}

export enum ThemeName {
    Light = "light",
    Dark = "dark"
}

export type SubHeaderItem = {
    kind: "subheader";
    label: string;
};

export type MenuItem = {
    kind: "menuitem";
    label: string;
    icon?: ReactNode;
    subMenu?: MenuItem[];
    to?: string;
};

export type NavigationMenuItem = SubHeaderItem | MenuItem;
