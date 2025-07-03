import Loading from "../components/atom/loading";
import WarListCard from "../components/molecules/warlistcard";
import { useWars } from "../hooks/useWars";

const Wars: React.FC = () => {
    const { loading, err, wars } = useWars([]);
    console.log(err);
    if (loading) return <div className="flex w-full justify-center text-white p-8" ><Loading /></div >;
    if (err) return <div className="text-white">Problem loading wars</div>


    const warCards = []
    for (let i = wars.length - 1; i >= 0; i--) {
        warCards.push(
            <div key={wars[i].id} className="text-white hover:scale-105">
                <WarListCard war={wars[i]} />
            </div>
        );
    }
    return (

        <div className="flex flex-col w-full mx-auto max-w-3xl gap-4">
            <h1 className="text-2xl font-semibold text-white items-end">Season 3 Wars</h1>
            <div className="text-gray-400 bg-gray-800 rounded-lg p-4">
                Preseaon
            </div>
            <h1 className="text-2xl font-semibold text-white items-end">Regular Wars</h1>
            <div className="grid grid-cols-1 gap-2 text-white m">
                {warCards}
            </div >
        </div >
    )
};

export default Wars;
