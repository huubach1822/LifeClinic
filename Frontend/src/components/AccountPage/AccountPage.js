import "./AccountPage.scss"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import LockIcon from '@mui/icons-material/Lock';
import { useDispatch } from "react-redux"
import { logoutAccount } from "../../redux/slices/userSlice"
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword/ChangePassword";
import PatientRecord from "./PatientRecord/PatientRecord";

// tab mui
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            style={{ width: "80%" }}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const AccountPage = () => {

    // handle tab change
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //logout btn
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logoutBtn = () => {
        dispatch(logoutAccount())
        navigate("/")
    }

    return (
        <div className="ap-container">
            <div className="ap-s1 mt-3">
                <Link to="/" className="ap-s1-hp me-2">Home Page</Link>
                <FontAwesomeIcon icon={faAngleRight} />
                <span className="ap-s1-mf ms-2">Account Infomation</span>
            </div>
            <div className="ap-s2 mt-4">
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', margin: '0 10%' }}
                >
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab icon={<CalendarMonthRoundedIcon />} iconPosition="start" label="Appointment schedule" {...a11yProps(0)} />
                        <Tab icon={<HistoryRoundedIcon />} iconPosition="start" label="Booking history"  {...a11yProps(1)} />
                        <Tab icon={<AccountBoxRoundedIcon />} iconPosition="start" label="Patient record"  {...a11yProps(2)} />
                        <Tab icon={<LockIcon />} iconPosition="start" label="Change password" {...a11yProps(3)} />
                        <div className="logout-btn" onClick={() => logoutBtn()}>
                            <LogoutRoundedIcon className="me-2" />Logout
                        </div>
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <PatientRecord />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ChangePassword />
                    </TabPanel>
                </Box>
            </div>
        </div>
    )

}

export default AccountPage