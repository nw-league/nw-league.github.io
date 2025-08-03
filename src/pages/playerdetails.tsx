import { useParams } from "react-router-dom";
import NotFound from "./notfound";

import Loading from "../components/atom/loading";
import Dropdown from "../components/atom/dropdown";
import { useState } from "react";
import CharacterDetailsDisplay from "../components/organisms/characterdetails";
import { usePlayerDetails } from "../hooks/usePlayerFull";
import { usePlayerNameFromAlt } from "../hooks/usePlayerNameFromAlt";
import ErrorPage from "./errorpage";

function PlayerDetails() {
    const { characterName } = useParams<{ characterName: string }>();
    if (!characterName) return <NotFound></NotFound>
    const [selectedAlt, setSelectedAlt] = useState(characterName);

    if (!characterName) return <ErrorPage error={characterName} />;
    const { loading: loadingPlayerName, error: errorPlayerName, playerName } = usePlayerNameFromAlt(characterName);
    console.log('Player name:', playerName);
    const { loading, error, details } = usePlayerDetails(playerName);

    if (loading || loadingPlayerName) return <Loading />;
    if (error || errorPlayerName || !playerName || !details) return <NotFound />;

    let options = [...(details.keys() || [])];
    options = options.sort((a, b) => {
        if (a === 'All') return -1; // 'All' goes first
        if (b === 'All') return 1;  // 'All' goes first
        return a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()); // alphabetical order
    });

    let charDetails = null;
    if (details.has(selectedAlt)) {
        charDetails = details.get(selectedAlt)!;
    } else {
        console.log('Details', details);
    }

    return (
        <div>
            <div className="mx-auto max-w-6xl pt-6">
                <Dropdown options={options} value={selectedAlt} onChange={setSelectedAlt} />
            </div>
            {charDetails ?
                <CharacterDetailsDisplay details={charDetails} /> :
                <div className="text-gray-400">No Data</div>
            }
        </div>
    );
}

export default PlayerDetails;
