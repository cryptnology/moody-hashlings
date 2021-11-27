import { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from './redux/blockchain/blockchainActions';
import { fetchData } from './redux/data/dataActions';
// import { create } from 'ipfs-http-client';
import Header from './components/Header';
import Page from './components/Page';
import Connect from './components/Connect';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector(state => state.blockchain);
  const data = useSelector(state => state.data);

  useEffect(() => {
    if (blockchain.account !== '' && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.smartContract, blockchain.account, dispatch]);

  return (
    <div className='font-body'>
      <Header
        account={blockchain.account}
        dispatch={dispatch}
        connect={connect}
        network={blockchain.network}
        balance={blockchain.balance}
      />
      <div>
        {blockchain.account === '' || blockchain.smartContract === null ? (
          <Connect errorMsg={blockchain.errorMsg} />
        ) : (
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
        )}
        <div className='pt-28'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
