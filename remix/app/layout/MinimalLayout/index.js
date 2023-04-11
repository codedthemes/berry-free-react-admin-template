// project imports
import { Outlet } from '@remix-run/react';
import Customization from 'layout/Customization';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
    <>
        <Outlet />
        <Customization />
    </>
);

export default MinimalLayout;
