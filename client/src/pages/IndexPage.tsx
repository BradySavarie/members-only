import MessageBoard from '../components/MessageBoard';

export default function IndexPage() {
    return (
        <div className="flex flex-col justify-center items-center grow py-10 px-40 gap-6">
            <div className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-4xl font-semibold">
                    Welcome to the Clubhouse
                </h1>
                <p className="text-md">
                    Members can see who the author of a post is, but outside
                    they can only see the story and wonder who wrote it.
                </p>
            </div>
            <MessageBoard />
        </div>
    );
}
