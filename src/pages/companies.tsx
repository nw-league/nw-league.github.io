
import Loading from "../components/atom/loading";
import CompanyListCard from "../components/molecules/companylistcard";
import { useCompanies } from "../hooks/useCompanies";

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
        <div className="grid grid-cols-1 gap-2 text-white p-8 max-w-180 mx-auto">

            {companyCards}
        </div>
    );

    // return (
    //     <div className="flex flex-col text-center">
    //         <img src="https://lh3.googleusercontent.com/d/1H2qRFnXiSrEY5HZ1H5AylCUR8RCJkwQ1" className="w-full m-8 mx-auto max-w-sm"></img>
    //         <h1 className="font-bold text-3xl text-white">Under contruction.</h1>
    //     </div>
    // );
}

export default Companies;
