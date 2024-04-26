const Loading = () => {
    return (
        <div className='fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );
};

export default Loading;
