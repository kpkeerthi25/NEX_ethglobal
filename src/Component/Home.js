import React from 'react'
import { useMoralis } from 'react-moralis'
import Moralis from 'moralis'
import CustomNavbar from './Navbar'
import CreateNFT from './create-nft'
import NFTBalances from './nftBalances'
import { Route, BrowserRouter as Router, Link, Routes } from 'react-router-dom'
import MyTrades from './myTrades'
import MyNfts from './MyNfts'
import TradeItem from './TradeItem'
import TradeScreen from './trade/TradeScreen'

const Home = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis()

  const login = async () => {
    await Moralis.enableWeb3()
    await authenticate()
  }
  return (
    <div>
      <div>
        <CustomNavbar
          isAuthenticated={isAuthenticated}
          login={login}
          logout={logout}
          key={isAuthenticated}
          user = {user}
        />
      </div>

      
      <div>
        <Router>
          <div>
            <nav className="px-3 " style={{ marginBottom: '30px' }}>
              <div className="flex mt-4 ">
                <Link to={{ pathname: '/' }}>
                  <a className="mx-4 text-info ">Home</a>
                </Link>
                <Link to={{ pathname: '/create' }}>
                  <a className="mx-4 text-info">CreateNFT</a>
                </Link>
                <Link to={{ pathname: '/trades' }}>
                  <a className="mx-4 text-info">Trade</a>
                </Link>
                <Link to={{ pathname: '/search' }}>
                  <a className="mx-4 text-info">search Trade</a>
                </Link>
              </div>
            </nav>
            <hr></hr>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <MyNfts add={user.get('ethAddress')} />
                ) : (
                  <div>
                    <h1>not logged in</h1>{' '}
                  </div>
                )
              }
            />
            <Route
              path="/create"
              element={
                isAuthenticated ? (
                  <CreateNFT />
                ) : (
                  <div>
                    <h1>not logged in</h1>{' '}
                  </div>
                )
              }
            />
            <Route
              path="/trades"
              element={
                isAuthenticated ? (
                  <TradeScreen/>
                ) : (
                  <div>
                    <h1>not logged in</h1>{' '}
                  </div>
                )
              }
            />
            <Route
              path="/search"
              element={
                isAuthenticated ? (
                  <TradeItem add={user.get('ethAddress')}/>
                ) : (
                  <div>
                    <h1>not logged in</h1>{' '}
                  </div>
                )
              }
            />
          </Routes>
          
        </Router>
      </div>
    </div>
  )
}

export default Home
