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
        <div className="grid grid-cols-1 gap-2 text-white p-8 max-w-180 mx-auto">
            {warCards}
        </div>
    )
};

export default Wars;
