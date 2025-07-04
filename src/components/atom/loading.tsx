import { CircleNotchIcon } from "@phosphor-icons/react";
import type { JSX } from "react";

function Loading(): JSX.Element {
    return <CircleNotchIcon className={"animate-spin"} size={32} weight={"fill"} />
}
export default Loading;
