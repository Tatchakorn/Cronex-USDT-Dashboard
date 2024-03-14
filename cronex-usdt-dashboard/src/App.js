// import from './components/D';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import GoogleFinancePrice from './components/GoogleFinancePrice';
import BinanceP2PData from './components/BinanceP2PData';
import BitkubInfo from './components/BitkubInfo';
import usdtLogo from './assets/tether-usdt-logo.png';

const AppContent = () => {
    // const [googleFinancePrice, setGoogleFinancePrice] = useState('100.23');
    // const [binanceData, setBinanceData] = useState({ buyData: [], sellData: [] });
    // const [bitkubData, setBitkubData] = useState({ bidData: [], askData: [], spotPrice: '33.37', change: '+0.12' });
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     setGoogleFinancePrice(await fetchGoogleFinancePrice());
    //     setBinanceData(await fetchBinanceData());
    //     setBitkubData(await fetchBitkubData());
    //   };
  
    //   fetchData(); // Fetch data immediately on component mount
  
    //   const interval = setInterval(fetchData, 60000); // Refresh data every 60 seconds
  
    //   return () => clearInterval(interval); // Cleanup interval on component unmount
    // }, []);

    const googleFinancePrice = '100.23';

    const binanceBuyData = [
    {
        name: 'Alice123',
        price: 35.81,
        available: '5,000.00 - 10,000.00'
        },
        {
        name: 'BobTheBuilder',
        price: 35.80,
        available: '1,000.00 - 2,000.00'
        },
        // ... more buy data
    ];
    const binanceSellData = [
    {
        name: 'Charlie789',
        price: 36.00,
        available: '500.00 - 5,000.00'
        },
        {
        name: 'DeltaForce',
        price: 36.05,
        available: '2,500.00 - 7,500.00'
        },
        // ... more sell data
    ];

    const bitkubBidData = [
    { 
        thbVolume: '1,000,000.00', 
        usdtVolume: '30,000.00', 
        price: '33.33' 
    },
    { 
        thbVolume: '500,000.00', 
        usdtVolume: '15,000.00', 
        price: '33.30' },
    // ...more data
    ];
    const bitkubAskData = [
    { 
        thbVolume: '1,200,000.00', 
        usdtVolume: '36,000.00', 
        price: '33.40' },
    { 
        thbVolume: '600,000.00', 
        usdtVolume: '18,000.00', 
        price: '33.45' 
    },
    // ...more data
    ];
    const bitkubSpotPrice = '36.37';
    const bitkubChange = '+0.12';

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
