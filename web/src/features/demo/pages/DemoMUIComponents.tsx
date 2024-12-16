import EmailIcon from "@mui/icons-material/Email";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  Divider,
  Fab,
  LinearProgress,
  MenuItem,
  Paper,
  Radio,
  Rating,
  Select,
  Slider,
  Snackbar,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";

const COMPONENTS = {
  Accordion: (
    <Accordion>
      <AccordionSummary>Title</AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">Content</Typography>
      </AccordionDetails>
    </Accordion>
  ),
  Alert: (
    <>
      <Alert severity="error">This is an error alert!</Alert>
      <Alert severity="warning">This is a warning alert!</Alert>
      <Alert severity="info">This is an info alert!</Alert>
      <Alert severity="success">This is a success alert!</Alert>
    </>
  ),
  AppBar: (
    <AppBar position="static">
      <Tabs value={0}>
        <Tab label="Item One" />
        <Tab label="Item Two" />
      </Tabs>
    </AppBar>
  ),
  Avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
  Badge: (
    <Badge badgeContent={4} color="primary">
      <EmailIcon />
    </Badge>
  ),
  Button: (
    <>
      <Button variant="text">Text Button</Button>
      <Button variant="contained">Contained Button</Button>
      <Button variant="outlined">Outlined Button</Button>
    </>
  ),
  Card: (
    <>
      <Card>Default Card Content</Card>
      <Card variant="outlined">Outlined Card Content</Card>
    </>
  ),
  Checkbox: <Checkbox defaultChecked />,
  Chip: (
    <>
      <Chip label="Basic Chip" />
      <Chip label="Outlined Chip" variant="outlined" />
    </>
  ),
  CircularProgress: <CircularProgress />,
  Container: <Container>Container Content</Container>,
  Dialog: <Dialog open={true}>Dialog Content</Dialog>,
  Divider: <Divider />,
  Fab: (
    <>
      <Fab aria-label="add" color="primary">
        +
      </Fab>
      <Fab aria-label="edit" color="secondary">
        Edit
      </Fab>
      <Fab variant="extended">Extended</Fab>
    </>
  ),
  Grid: (
    <Grid container spacing={2}>
      <Grid>Item 1</Grid>
      <Grid>Item 2</Grid>
    </Grid>
  ),
  LinearProgress: (
    <>
      <LinearProgress />
      <LinearProgress value={50} variant="determinate" />
    </>
  ),
  Paper: (
    <>
      <Paper>Default Paper Content</Paper>
      <Paper variant="outlined">Outlined Paper Content</Paper>
      <Paper elevation={3} variant="elevation">
        Elevated Paper Content
      </Paper>
    </>
  ),
  Radio: <Radio />,
  Rating: <Rating name="simple-controlled" value={2} />,
  Select: (
    <Select defaultValue={10}>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  ),
  Slider: <Slider defaultValue={30} />,
  Snackbar: <Snackbar message="Snackbar message" open={true} />,
  Stack: (
    <Stack spacing={2}>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </Stack>
  ),
  Switch: <Switch defaultChecked />,
  TextField: (
    <>
      <TextField label="Standard" variant="standard" />
      <TextField label="Filled" variant="filled" />
      <TextField label="Outlined" variant="outlined" />
    </>
  ),
  Tooltip: (
    <Tooltip title="Delete">
      <Button>Delete</Button>
    </Tooltip>
  ),
  Typography: (
    <>
      <Typography variant="h1">h1 Heading</Typography>
      <Typography variant="h2">h2 Heading</Typography>
      <Typography variant="h3">h3 Heading</Typography>
      <Typography variant="h4">h4 Heading</Typography>
      <Typography variant="h5">h5 Heading</Typography>
      <Typography variant="h6">h6 Heading</Typography>
      <Typography variant="subtitle1">Subtitle 1</Typography>
      <Typography variant="subtitle2">Subtitle 2</Typography>
      <Typography variant="body1">Body 1</Typography>
      <Typography variant="body2">Body 2</Typography>
    </>
  ),
};

const DemoMUIComponents: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<"" | keyof typeof COMPONENTS>("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedComponent(event.target.value as keyof typeof COMPONENTS);
  };

  return (
    <Stack p={2}>
      <Typography pb={2} variant="h5">
        Material UI Component Viewer
      </Typography>
      <Select fullWidth size="small" value={selectedComponent}>
        {Object.keys(COMPONENTS).map((componentName) => (
          <MenuItem key={componentName} value={componentName}>
            {componentName}
          </MenuItem>
        ))}
      </Select>
      <Box pt={4}>{selectedComponent && COMPONENTS[selectedComponent]}</Box>
    </Stack>
  );
};

export default DemoMUIComponents;
