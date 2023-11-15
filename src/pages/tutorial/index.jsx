import { Box, Paper } from '@mui/material';
import Header from '../../components/Header'
import ListTutorial from '../../components/TutorialComponent/ListTutorial';
import PerkenalanContent from '../../components/TutorialComponent/Perkenalan';
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