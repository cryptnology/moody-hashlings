const Content = ({ account, smartContract, errorMessage, data }) => {
  return (
    <div className='flex justify-center items-center mt-96'>
      <div>
        <h1 className='text-2xl text-themeOrange'>
          Contract Name: {data.name}
        </h1>
        <h1 className='text-2xl text-themeOrange mt-3'>
          Contract Address: {smartContract._address}
        </h1>
      </div>
    </div>
  );
};

export default Content;
