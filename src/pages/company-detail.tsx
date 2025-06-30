
import { useParams } from "react-router-dom";
import Construction from "../components/molecules/construction";

const CompanyDetail: React.FC = () => {
    const { companyName } = useParams<{ companyName: string }>();

    return (
        <div>
            <Construction />
            <div className="flex justify-center text-white text-2xl">
                {companyName}
            </div>
        </div>
    );
}

export default CompanyDetail;
