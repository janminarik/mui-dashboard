import React from "react";
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
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  Menu,
  MenuItem as DropdownItem,
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

const DemoMUIPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [bottomNavValue, setBottomNavValue] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [ratingValue, setRatingValue] = React.useState<number | null>(2);
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
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Material UI Demo
          </Typography>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
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
              <Typography variant="h5" component="div">
                Test Card (Outlined)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is a sample text for the Material UI Card component.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Test Card (Default)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is a sample text for the Material UI Card component.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* TextField Component Variants */}
        <Grid>
          <TextField label="Name" variant="outlined" fullWidth />
          <TextField label="Name" variant="filled" fullWidth sx={{ mt: 2 }} />
          <TextField label="Name" variant="standard" fullWidth sx={{ mt: 2 }} />
        </Grid>

        {/* Button Component Variants */}
        <Grid>
          <Button variant="contained" color="primary" sx={{ m: 2 }}>
            Primary Button
          </Button>
          <Button variant="outlined" color="secondary" sx={{ m: 2 }}>
            Secondary Button
          </Button>
          <Button variant="text" sx={{ m: 2 }}>
            Text Button
          </Button>
          <ButtonGroup variant="contained" color="primary" sx={{ m: 2 }}>
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
                value="option1"
                control={<Radio />}
                label="Option 1"
              />
              <FormControlLabel
                value="option2"
                control={<Radio />}
                label="Option 2"
              />
              <FormControlLabel
                value="option3"
                control={<Radio disabled />}
                label="Option 3 (Disabled)"
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
              labelId="demo-simple-select-label"
              label="Select"
              defaultValue=""
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
              labelId="demo-simple-select-label-filled"
              variant="filled"
              label="Select"
              defaultValue=""
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
            defaultValue={30}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
          <Slider
            defaultValue={50}
            disabled
            aria-label="Disabled"
            valueLabelDisplay="auto"
            sx={{ mt: 4 }}
          />
        </Grid>

        {/* Snackbar and Alert Components */}
        <Grid>
          <Alert severity="success">This is a success message!</Alert>
          <Alert severity="error" sx={{ mt: 2 }}>
            This is an error message!
          </Alert>
          <Button
            variant="outlined"
            onClick={() => alert("Snackbar Button Clicked")}
            sx={{ mt: 2 }}
          >
            Open Snackbar
          </Button>
        </Grid>

        {/* BottomNavigation Component Variants */}
        <Grid>
          <BottomNavigation
            value={bottomNavValue}
            onChange={(event, newValue) => {
              setBottomNavValue(newValue);
            }}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DemoMUIPage;
