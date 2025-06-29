
import { useParams } from "react-router-dom";
import Construction from "../components/molecules/construction";

const CompanyDetail: React.FC = () => {
    const { companyName } = useParams<{ companyName: string }>();
    return <Construction />
}

export default CompanyDetail;
