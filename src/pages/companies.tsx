
import Loading from "../components/atom/loading";
import CompanyListCard from "../components/molecules/companylistcard";
import { useCompanies } from "../hooks2/useCompaniesNew";

const Companies: React.FC = () => {
    const { loading, err, companies } = useCompanies();
    if (loading) return <div className="flex w-full justify-center text-white p-8" ><Loading /></div >;
    if (err) return <div className="text-white">Problem loading companies</div>

    const companyCards = [];
    for (const company of companies) {
        companyCards.push(
            <CompanyListCard company={company} />
        );
    }

    return (
        <div className="flex flex-col gap-2 text-white p-8 max-w-180 mx-auto">

            {companyCards}
        </div>
    );


}

export default Companies;
