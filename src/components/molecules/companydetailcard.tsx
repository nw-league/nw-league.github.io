import type { JSX } from "react";
import type { Company } from "../../types/company";
import { factionToColor } from "../../utils/factions";
import ProfilePicture from "../atom/profilepicture";

interface CompanyDetailCardProps {
    company: Company;
}
function CompanyDetailCard({ company }: CompanyDetailCardProps): JSX.Element {

    const color = factionToColor(company.faction);
    const primary = `bg-${color}-700`;
    const accent = `bg-${color}-800`;
    return (
        <div className={`flex w-full items-center ${primary} rounded-lg p-2 gap-2 text-white`}>
            <ProfilePicture pictureUrl="https://dqzvgunkova5o.cloudfront.net/statics/2025-06-20/images/NW-bug.svg" size={32} />
            <div className="flex flex-col">
                <div className="flex items-end gap-2">
                    <div className="text-3xl font-semibold ">{company.name}</div>
                    {/* <div>{player.role}</div>s */}
                </div>
                <div className="flex flex-row w-full">
                    <div className="min-w-[100px]">{company.faction}</div>
                    <div className="pr-2">|</div>
                    <div className="">Tier {company.tier}</div>
                </div>
                <div className="flex flex-row text-xl">
                    <div className="min-w-[100px]">Captains</div>
                    <div className="pr-2">|</div>
                    <div>{company.captains.join(', ')}</div>
                </div>
                <div className="flex flex-row text-xl">
                    <div className="min-w-[100px]">Shotcaller</div>
                    <div className="pr-2">|</div>
                    <div>{company.shotcaller}</div>
                </div>
            </div>
        </div>
    );
}

export default CompanyDetailCard
