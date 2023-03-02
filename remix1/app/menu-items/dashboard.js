// assets
// import { IconDashboard } from "../../node_modules/@tabler/icons";

// constant
// const icons = { IconDashboard };
// {/*svg-issue*/}

// ==============================|| DASHBOARD MENU ITEMS ||============================== //
export const IconDashboard = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-dashboard"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M13.45 11.55l2.05 -2.05" />
      <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
    </svg>
  );
};

const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/dashboard/default",
    //   icon: icons.IconDashboard,
      icon: IconDashboard,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
