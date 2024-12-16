import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  Alert,
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Checkbox,
  MenuItem as DropdownItem,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

const DemoMUIPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [bottomNavValue, setBottomNavValue] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [ratingValue, setRatingValue] = React.useState<null | number>(2);
  const [stepperActiveStep, setStepperActiveStep] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const autocompleteOptions = ["Option 1", "Option 2", "Option 3"];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      {/* AppBar Component */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="menu"
            color="inherit"
            edge="start"
            onClick={handleMenu}
            size="large"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
            Material UI Demo
          </Typography>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            id="menu-appbar"
            keepMounted
            onClose={handleClose}
            open={open}
            transformOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {/* Card Component */}
        <Grid>
          <Card variant="outlined">
            <CardContent>
              <Typography component="div" variant="h5">
                Test Card (Outlined)
              </Typography>
              <Typography color="text.secondary" variant="body2">
                This is a sample text for the Material UI Card component.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card>
            <CardContent>
              <Typography component="div" variant="h5">
                Test Card (Default)
              </Typography>
              <Typography color="text.secondary" variant="body2">
                This is a sample text for the Material UI Card component.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* TextField Component Variants */}
        <Grid>
          <TextField fullWidth label="Name" variant="outlined" />
          <TextField fullWidth label="Name" sx={{ mt: 2 }} variant="filled" />
          <TextField fullWidth label="Name" sx={{ mt: 2 }} variant="standard" />
        </Grid>

        {/* Button Component Variants */}
        <Grid>
          <Button color="primary" sx={{ m: 2 }} variant="contained">
            Primary Button
          </Button>
          <Button color="secondary" sx={{ m: 2 }} variant="outlined">
            Secondary Button
          </Button>
          <Button sx={{ m: 2 }} variant="text">
            Text Button
          </Button>
          <ButtonGroup color="primary" sx={{ m: 2 }} variant="contained">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Grid>

        {/* Checkbox Component Variants */}
        <Grid>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Checkbox (Checked)"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Checkbox (Unchecked)"
          />
          <FormControlLabel
            control={<Checkbox disabled />}
            label="Checkbox (Disabled)"
          />
        </Grid>

        {/* Radio Button Component Variants */}
        <Grid>
          <FormControl>
            <FormLabel>Choose an option</FormLabel>
            <RadioGroup defaultValue="option1">
              <FormControlLabel
                control={<Radio />}
                label="Option 1"
                value="option1"
              />
              <FormControlLabel
                control={<Radio />}
                label="Option 2"
                value="option2"
              />
              <FormControlLabel
                control={<Radio disabled />}
                label="Option 3 (Disabled)"
                value="option3"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/* Switch Component Variants */}
        <Grid>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Switch (Checked)"
          />
          <FormControlLabel control={<Switch />} label="Switch (Unchecked)" />
          <FormControlLabel
            control={<Switch disabled />}
            label="Switch (Disabled)"
          />
        </Grid>

        {/* Select Component Variants */}
        <Grid>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select (Default)
            </InputLabel>
            <Select
              defaultValue=""
              label="Select"
              labelId="demo-simple-select-label"
            >
              <DropdownItem value={10}>Ten</DropdownItem>
              <DropdownItem value={20}>Twenty</DropdownItem>
              <DropdownItem value={30}>Thirty</DropdownItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="demo-simple-select-label-filled">
              Select (Filled)
            </InputLabel>
            <Select
              defaultValue=""
              label="Select"
              labelId="demo-simple-select-label-filled"
              variant="filled"
            >
              <DropdownItem value={10}>Ten</DropdownItem>
              <DropdownItem value={20}>Twenty</DropdownItem>
              <DropdownItem value={30}>Thirty</DropdownItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Slider Component Variants */}
        <Grid>
          <Slider
            aria-label="Default"
            defaultValue={30}
            valueLabelDisplay="auto"
          />
          <Slider
            aria-label="Disabled"
            defaultValue={50}
            disabled
            sx={{ mt: 4 }}
            valueLabelDisplay="auto"
          />
        </Grid>

        {/* Snackbar and Alert Components */}
        <Grid>
          <Alert severity="success">This is a success message!</Alert>
          <Alert severity="error" sx={{ mt: 2 }}>
            This is an error message!
          </Alert>
          <Button
            onClick={() => alert("Snackbar Button Clicked")}
            sx={{ mt: 2 }}
            variant="outlined"
          >
            Open Snackbar
          </Button>
        </Grid>

        {/* BottomNavigation Component Variants */}
        <Grid>
          <BottomNavigation
            onChange={(event, newValue) => {
              setBottomNavValue(newValue);
            }}
            value={bottomNavValue}
          >
            <BottomNavigationAction icon={<RestoreIcon />} label="Recents" />
            <BottomNavigationAction icon={<FavoriteIcon />} label="Favorites" />
            <BottomNavigationAction icon={<LocationOnIcon />} label="Nearby" />
          </BottomNavigation>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DemoMUIPage;
