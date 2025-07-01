import { type JSX } from "react";


function PlaceholderTile(): JSX.Element {
    return (
        <div className="bg-gray-800 text-gray-200 w-full h-full flex items-center justify-center rounded-lg relative">
            Nothing is scheduled.
        </div>
    );
}

export default PlaceholderTile;
