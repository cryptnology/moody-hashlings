const Connect = ({ errorMsg }) => {
  return (
    <div className='flex justify-center items-center mt-96'>
      {errorMsg !== '' ? (
        <div className='text-center'>
          <h1 className='text-2xl text-themeOrange'>
            Connect to the Blockchain
          </h1>
          <h3 className='text-xl text-red-500'>{errorMsg}</h3>
        </div>
      ) : (
        <h1 className='text-2xl text-themeOrange'>Connect to the Blockchain</h1>
      )}
    </div>
  );
};

export default Connect;
