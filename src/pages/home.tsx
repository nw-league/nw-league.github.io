import { Navigate } from "react-router-dom";

const Home: React.FC = () => {
    return <Navigate to="/wars" replace />;
};
export default Home;
