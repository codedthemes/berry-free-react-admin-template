
// project imports
import { Outlet } from '@remix-run/react';
import Customization from '../Customization';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
    <>
        <Outlet />
        <Customization />
    </>
);

export default MinimalLayout;
