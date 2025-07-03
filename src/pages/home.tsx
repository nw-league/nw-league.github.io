import { useUpcomingAndPast } from "../hooks/useUpcomingAndPast";
import Loading from "../components/atom/loading";
import WarTile from "../components/molecules/wartile";
import PlaceholderTile from "../components/molecules/placeholdertile";
import WarListCard from "../components/molecules/warlistcard";
// import Carousel from "../components/molecules/carousel";

const Home: React.FC = () => {
    const { loading, err, upcomingWars, pastWars } = useUpcomingAndPast();

    //if (loading) return <div className="flex w-full justify-center text-white p-8" ><Loading /></div >;
    if (err) return <div className="flex w-full justify-center text-red-500">Error loading wars </div>;


    return (
        <div className="flex flex-col w-full max-w-5xl mx-auto px-4 mt-4 relative">
            {/* <Carousel items={[
                <div className="bg-red-500 w-full h-64">Slide 1</div>,
                <div className="bg-blue-500 w-full h-64">Slide 2</div>,
                <div className="bg-green-500 w-full h-64">Slide 3</div>,
            ]} delay={3000} /> */}
            <div className="text-white text-xl font-semibold">
                Upcoming Wars
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-6xl mx-auto mt-4 mb-4">
                {loading ?
                    <div className="flex items-center justify-center text-white bg-gray-800 rounded-lg w-full h-full min-h-[104px]">
                        <Loading />
                    </div> :
                    upcomingWars.length === 0 ?
                        <PlaceholderTile /> :
                        (upcomingWars.map((v, i) => (
                            <WarTile war={v} key={i} />
                        )))}

            </div>

            <div className="text-white text-xl font-semibold">Past Wars</div>
            <div className="grid gap-4 grid-cols-1 w-full max-w-180 mx-auto mt-4">
                {loading ?
                    <Loading /> :
                    pastWars.map((v, i) => (
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
