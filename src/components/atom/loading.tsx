import { CircleNotch } from "phosphor-react";
import type { JSX } from "react";

function Loading(): JSX.Element {
    return <CircleNotch className={"animate-spin"} size={32} weight={"fill"} />
}
export default Loading;
