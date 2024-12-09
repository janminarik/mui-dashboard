import { ReactNode } from "react";
import { Drawer, drawerClasses } from "@mui/material";
import Grid from "@mui/material/Grid2";

export interface SidebarProps {
  width?: number;
  mode?: "permanent" | "persistent" | "temporary";
  anchor?: "left" | "right";
  open?: boolean;
  content?: ReactNode;
  onClose?(): void;
}

export function Sidebar({
  mode,
  open,
  onClose,
  anchor,
  content,
  width,
}: SidebarProps) {
  return (
    <Grid>
      <Drawer
        open={open}
        variant={mode}
        onClose={onClose}
        anchor={anchor}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            width: `${width}px`,
          },
        }}
      >
        {content}
      </Drawer>
    </Grid>
  );
}

export default Sidebar;
