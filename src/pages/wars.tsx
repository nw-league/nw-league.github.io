import { NavLink } from "react-router-dom";
import WarListCard from "../components/molecules/warlistcard";
import { useWars } from "../hooks/useWars";

const Wars: React.FC = () => {
    const { loading, err, wars } = useWars();
    if (loading) return <div className="text-white">List is loading</div>

    const warCards = []
    for (let i = wars.length - 1; i >= 0; i--) {
        warCards.push(
            <div className="text-white">
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
