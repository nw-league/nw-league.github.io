import { Link } from "react-router-dom";
import type { Company } from "../../types/company";

export interface CompanyListCardProps {
    company: Company,
}
const CompanyListCard: React.FC<CompanyListCardProps> = ({ company }) => {
    let color = "bg-gray-700";
    if (company.faction === "Marauder") {
        color = 'bg-green-700';
    } else if (company.faction === "Covenant") {
        color = 'bg-yellow-700';
    } else if (company.faction === "Syndicate") {
        color = 'bg-purple-700';
    }
    return (
        <Link to={`/companies/${company.name}`}>
            <div className="flex bg-gray-800 gap-0.5">
                <div className={`${color} rounded-l-lg p-4`}>

                </div>
                <div className={`rounded-lg p-4`}>
                    {company.name}
                </div>
            </div>
        </Link >
    );
};

export default CompanyListCard;
