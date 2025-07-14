import Loading from "../components/atom/loading";
import WarListCard from "../components/molecules/warlistcard";
import { useWars } from "../hooks2/hookes/useWars";
// import Carousel from "../components/molecules/carousel";

const Home: React.FC = () => {
    const { loading, error, wars } = useWars([]);

    //if (loading) return <div className="flex w-full justify-center text-white p-8" ><Loading /></div >;
    if (error) return <div className="flex w-full justify-center text-red-500">Error loading wars </div>;


    return (
        <div className="flex flex-col w-full max-w-5xl mx-auto px-4 mt-4 relative">
            {/* <div className="text-white text-xl font-semibold">
                Upcoming Wars
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-6xl mx-auto mt-4 mb-4">
                {loading ?
                    <div className="flex items-center justify-center text-white bg-gray-800 rounded-lg w-full h-full min-h-[104px]">
                        <Loading />
                    </div> :
                    wars.length === 0 ?
                        <PlaceholderTile /> :
                        (wars.map((v, i) => (
                            <WarTile war={v} key={i} />
                        )))}

            </div> */}

            <div className="text-white text-xl font-semibold">Past Wars</div>
            <div className="grid gap-4 grid-cols-1 w-full max-w-180 mx-auto mt-4">
                {loading ?
                    <span className="text-white"><Loading /> </span> :
                    wars.map((v, i) => (
                        <div key={i} className="hover:scale-105">
                            <WarListCard war={v} />
                        </div>
                    ))
                }
            </div>

        </div >
    );
};
export default Home;
