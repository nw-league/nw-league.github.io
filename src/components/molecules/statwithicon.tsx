interface StatDisplayProps {
    icon: React.ReactElement;
    value: number | string;
}

const StatWithIcon: React.FC<StatDisplayProps> = ({ icon, value }) => {
    return (
        <div className="grid grid-rows-2 place-items-center">
            {icon}
            <div className="text-xl break-words truncate">{value.toLocaleString?.() ?? value}</div>
        </div>
    );
};

export default StatWithIcon;
