import { useParams } from "react-router-dom";
import Construction from "../components/molecules/construction"

function PlayerDetails() {
    const { playerName } = useParams<{ playerName: string }>();
    return (
        <div>
            <Construction />
            <span className="flex justify-center text-white">{playerName}</span>
        </div>
    );
}

export default PlayerDetails
