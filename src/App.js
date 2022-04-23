import { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { connect } from './redux/blockchain/blockchainActions';
import { fetchData } from './redux/data/dataActions';
// import { create } from 'ipfs-http-client';
import Page from './components/Page';
import Content from './components/Content';
import { HeaderLanding, HeaderMain, Footer, LandingContent } from 'components';
import Modal from './components/Modal';

function App() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const blockchain = useSelector(state => state.blockchain);
  const data = useSelector(state => state.data);

  useEffect(() => {
    if (blockchain.account !== '' && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.smartContract, blockchain.account, dispatch]);

  return (
    <div className='font-body text-themeLightBlue'>
      <div>
        {blockchain.account === '' || blockchain.smartContract === null ? (
          <>
            <HeaderLanding />
            {blockchain.errorMsg && (
              <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                errorMsg={blockchain.errorMsg}
              />
            )}
            <LandingContent />
          </>
        ) : (
          <>
            <HeaderMain
              account={blockchain.account}
              network={blockchain.network}
              balance={blockchain.balance}
            />
            <Switch>
              <Route path='/page'>
                <Page />
              </Route>
              <Route path='/home'>
                <Content
                  account={blockchain.account}
                  smartContract={blockchain.smartContract}
                  errorMessage={blockchain.errorMsg}
                  data={data}
                />
              </Route>
              <Redirect from='/' exact to='/home' />
            </Switch>
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default App;
