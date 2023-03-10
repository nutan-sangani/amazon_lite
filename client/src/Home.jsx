import { Title } from '@mui/icons-material';
import React from 'react'
import amazon_bg from './amazon_bg.jpg';
import './Home.css';
import Product from './Product.jsx';


function Home() {
  return (
        <div className='container'>
            <img className='bg' src={amazon_bg} alt='amazon background'/>
        
        <div className='product_content'>
           
                <Product
                    img='https://m.media-amazon.com/images/I/41ezRvTwcaL._AC_SY200_.jpg'
                    title='iQOO 5G by vivo (6GB RAM, 128GB Storage) | Snapdragon 778G 5G | 66W FlashCharge | 1300 nits Peak Brightness | HDR10+ | Made in India | Super power '  
                    rating={5}
                    price={12200}

                />
                <Product
                    img='https://m.media-amazon.com/images/I/41Wd9J6nfpL._SX300_SY300_QL70_FMwebp_.jpg'
                    title='Redmi A1 (Light Blue, 2GB RAM, 32GB Storage) | Segment Best AI Dual Cam | 5000mAh Battery | Leather Texture Design | Android 12' 
                    rating={5}
                    price={12200}/>
                <Product
                    img='https://m.media-amazon.com/images/I/61u1V6HoqiL._SX569_.jpg'
                    title='Tecno POVA 4 (Cryolite Blue,8GB RAM,128GB Storage)| Helio G99 Processor | 6000mAh Battery 18W Charger Included | 50MP Rear Camera'
                    rating={5}
                    price={12200}/>
                <Product
                    img='https://m.media-amazon.com/images/I/81QqVNKWtML._SX679_.jpg'
                    title='Realme narzo 50i (Mint Green, 2GB RAM+32GB Storage) Octa Core Processor | 6.5" inch Large Display | Made in China | 2 yr gaurantee'   
                    rating={5}
                    price={12200}/>
                
            
           
            <Product
                    img='https://m.media-amazon.com/images/I/41ezRvTwcaL._AC_SY200_.jpg'
                    title='iQOO 5G (6GB RAM, 128GB Storage) | Snapdragon 778G 5G | 66W FlashCharge | 1300 nits Peak Brightness | HDR10+'    
                    rating={5}
                    price={12200}/>
                <Product
                    img='https://m.media-amazon.com/images/I/41Wd9J6nfpL._SX300_SY300_QL70_FMwebp_.jpg'
                    title='Redmi A1 (Light Blue, 2GB RAM, 32GB Storage) | Segment Best AI Dual Cam | 5000mAh Battery | Leather Texture Design | Android 12'                      
                    rating={5}
                    price={12200}/>
                <Product
                    img='https://m.media-amazon.com/images/I/61u1V6HoqiL._SX569_.jpg'
                    title='Tecno POVA 4 (Cryolite Blue,8GB RAM,128GB Storage)| Helio G99 Processor | 6000mAh Battery 18W Charger Included | 50MP Rear Camera'
                    rating={5}
                    price={12200}/>
              
           
            <Product
                    img='https://m.media-amazon.com/images/I/41ezRvTwcaL._AC_SY200_.jpg'
                    title='iQOO 5G (6GB RAM, 128GB Storage) | Snapdragon 778G 5G | 66W FlashCharge | 1300 nits Peak Brightness | HDR10+'    
                    rating={5}
                    price={12200}/>
                <Product
                    img='https://m.media-amazon.com/images/I/41Wd9J6nfpL._SX300_SY300_QL70_FMwebp_.jpg'
                    title='Redmi A1 (Light Blue, 2GB RAM, 32GB Storage) | Segment Best AI Dual Cam | 5000mAh Battery | Leather Texture Design | Android 12'   
                    rating={5}
                    price={12200}/>
                <Product
                    img='https://m.media-amazon.com/images/I/61u1V6HoqiL._SX569_.jpg'
                    title='Tecno POVA 4 (Cryolite Blue,8GB RAM,128GB Storage)| Helio G99 Processor | 6000mAh Battery 18W Charger Included | 50MP Rear Camera'
                    rating={5}
                    price={12200}/>
                <Product
                    img='https://m.media-amazon.com/images/I/81QqVNKWtML._SX679_.jpg'
                    title='Realme narzo 50i (Mint Green, 2GB RAM+32GB Storage) Octa Core Processor | 6.5" inch Large Display | Made in China | 2 yr gaurantee'  
                    rating={5}
                    price={12200}/>
            
        </div>
        </div>
  )
}

export default Home
