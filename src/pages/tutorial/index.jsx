import { Box, Paper } from '@mui/material';
import ListTutorial from '../../components/TutorialComponent/ListTutorial';
import { Outlet } from 'react-router-dom';

const Tutorial = () => {
    return (
        <Box>
            <Paper width={"100%"}>
                <ListTutorial />

                <Outlet />
            </Paper>
        </Box>

    );
}

export default Tutorial;