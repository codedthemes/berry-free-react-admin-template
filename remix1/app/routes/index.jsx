import Dashboard from "./dashboard/Default";
export const meta = () => ({
  title: "Dashboard | Berry - React Material Admin Dashboard Template",
  description:
    "Start your next React project with Berry admin template. It build with Reactjs, Material-UI, Redux, and Hook for faster web development.",
});
export default function Index() {
  return (
    <>
      <Dashboard />
    </>
  );
}
