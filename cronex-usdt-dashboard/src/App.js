// import from './components/D';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import GoogleFinancePrice from './components/GoogleFinancePrice';
import BinanceP2PData from './components/BinanceP2PData';
import BitkubInfo from './components/BitkubInfo';
import usdtLogo from './assets/tether-usdt-logo.png';

const ax = axios.create({
    baseURL: 'http://192.168.1.152:8080',
})

const AppContent = () => {
    const [googleFinancePrice, setGoogleFinancePrice] = useState('0');
    const [binanceBuyData, setBinanceBuyData] = useState([]);
    const [binanceSellData, setBinanceSellData] = useState([]);
    const [bitkubBidData, setBitkubBidData] = useState([]);
    const [bitkubAskData, setBitkubAskData] = useState([]);
    const [bitkubSpotPrice, setBitkubSpotPrice] = useState('');
    const [bitkubChange, setBitkubChange] = useState('');

    useEffect(() => {
        const fetchGoogleFinancePrice = async () => {
            try {
                const response = await ax.get('/google-price'); // Replace with your actual endpoint
                setGoogleFinancePrice(response.data.data);
            } catch (error) {
                console.error('There was an error fetching the Google Finance price:', error);
            }
        };

        const fetchBinanceData = async () => {
            try {
                const response = await ax.get('/binance-price'); // Use axios to fetch, replace '/binance-data' with your actual endpoint
                const { buy, sell } = response.data.data; // Destructure buy and sell arrays from your response
                setBinanceBuyData(buy.map(({ nickname, price, minAmount, maxAmount }) => ({
                    name: nickname,
                    price: price,
                    available: `${minAmount} - ${maxAmount}`
                })));
                setBinanceSellData(sell.map(({ nickname, price, minAmount, maxAmount }) => ({
                    name: nickname,
                    price: price,
                    available: `${minAmount} - ${maxAmount}`
                })));
            } catch (error) {
                console.error('There was an error fetching the Binance data:', error);
            }
        };

        const fetchBitkubData = async () => {
            try {
                const response = await ax.get('/bitkub-price');
                const { ticker, bids, asks } = response.data.data;

                // Process and update spot price and change
                setBitkubSpotPrice(ticker.price.toFixed(2));
                setBitkubChange(`${ticker.change >= 0 ? '+' : ''}${ticker.change.toFixed(2)}`);

                // Process and update bid data
                const formattedBids = bids.map(bid => ({
                    price: bid.rate.toFixed(2),
                    thbVolume: bid.volTHB.toFixed(2),
                    usdtVolume: bid.volUSDT.toFixed(2),
                }));
                setBitkubBidData(formattedBids);

                // Process and update ask data
                const formattedAsks = asks.map(ask => ({
                    price: ask.rate.toFixed(2),
                    thbVolume: ask.volTHB.toFixed(2),
                    usdtVolume: ask.volUSDT.toFixed(2),
                }));
                setBitkubAskData(formattedAsks);

            } catch (error) {
                console.error('There was an error fetching the Bitkub market data:', error);
            }
        };

        const fetchData = async () => {
            await fetchGoogleFinancePrice();
            await fetchBinanceData();
            await fetchBitkubData();
        }
        fetchData();
        const intervalId = setInterval(fetchData, 2000);
        return () => clearInterval(intervalId);
      
    }, []);

    return (
        <Container>
            <AppBar position='static'>
                <Toolbar>
                    <img src={usdtLogo} alt="USDT Logo" style={{ height: '24px', marginRight: '10px' }} />
                    <Typography variant="h6">USDT Dashboard</Typography>
                </Toolbar>
            </AppBar>
            <GoogleFinancePrice price={googleFinancePrice}/>
            <BinanceP2PData buyData={binanceBuyData} sellData={binanceSellData} />
            <BitkubInfo 
            spotPrice={bitkubSpotPrice}
            change={bitkubChange}
            bidData={bitkubBidData} 
            askData={bitkubAskData} 
      />
        </Container>
      );
}

function App() {
    return (
        <ThemeProvider theme={theme}>
          <AppContent />
        </ThemeProvider>
      );
}

export default App;
