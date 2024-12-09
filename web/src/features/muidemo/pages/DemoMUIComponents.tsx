import React, { useState } from "react";
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
  SelectChangeEvent,
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
import Grid from "@mui/material/Grid2"; // Použitie Grid2 z Material-UI

const COMPONENTS = {
  Button: (
    <>
      <Button variant="text">Text Button</Button>
      <Button variant="contained">Contained Button</Button>
      <Button variant="outlined">Outlined Button</Button>
    </>
  ),
  Checkbox: <Checkbox defaultChecked />,
  Fab: (
    <>
      <Fab color="primary" aria-label="add">
        +
      </Fab>
      <Fab color="secondary" aria-label="edit">
        Edit
      </Fab>
      <Fab variant="extended">Extended</Fab>
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
  Switch: <Switch defaultChecked />,
  TextField: (
    <>
      <TextField label="Standard" variant="standard" />
      <TextField label="Filled" variant="filled" />
      <TextField label="Outlined" variant="outlined" />
    </>
  ),
  Avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
  Badge: (
    <Badge badgeContent={4} color="primary">
      <EmailIcon />
    </Badge>
  ),
  Chip: (
    <>
      <Chip label="Basic Chip" />
      <Chip label="Outlined Chip" variant="outlined" />
    </>
  ),
  Divider: <Divider />,
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
  Alert: (
    <>
      <Alert severity="error">This is an error alert!</Alert>
      <Alert severity="warning">This is a warning alert!</Alert>
      <Alert severity="info">This is an info alert!</Alert>
      <Alert severity="success">This is a success alert!</Alert>
    </>
  ),
  CircularProgress: <CircularProgress />,
  Dialog: (
    <Dialog open>
      <Typography variant="body1" p={2}>
        Dialog Content
      </Typography>
    </Dialog>
  ),
  LinearProgress: (
    <>
      <LinearProgress />
      <LinearProgress variant="determinate" value={50} />
    </>
  ),
  Snackbar: <Snackbar open message="Snackbar message" />,
  Accordion: (
    <Accordion>
      <AccordionSummary>Title</AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">Content</Typography>
      </AccordionDetails>
    </Accordion>
  ),
  Card: (
    <>
      <Card>Default Card Content</Card>
      <Card variant="outlined">Outlined Card Content</Card>
    </>
  ),
  Paper: (
    <>
      <Paper>Default Paper Content</Paper>
      <Paper variant="outlined">Outlined Paper Content</Paper>
      <Paper variant="elevation" elevation={3}>
        Elevated Paper Content
      </Paper>
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
  Container: <Container>Container Content</Container>,
  Grid: (
    <Grid container spacing={2}>
      <Grid>Item 1</Grid>
      <Grid>Item 2</Grid>
    </Grid>
  ),
  Stack: (
    <Stack spacing={2}>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </Stack>
  ),
};

const DemoMUIComponents: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<
    keyof typeof COMPONENTS | ""
  >("");

  const handleChange = (event: SelectChangeEvent<"Select">) => {
    setSelectedComponent(event.target.value as keyof typeof COMPONENTS);
  };

  return (
    <Stack p={2}>
      <Typography variant="h5" pb={2}>
        Material UI Component Viewer
      </Typography>
      <Select value={selectedComponent} fullWidth size="small">
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
