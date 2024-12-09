import { ReactNode } from "react";

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