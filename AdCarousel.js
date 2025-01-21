import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './AdCarousel.css';

const AdCarousel = () => {
    const ads = [
        { id: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRipcLJ19PBU1vHiAlaBqCP9gva2CQYW9_wXLczywZRlSzJ0O_jLF_WM4NGtuPSGdNCA&usqp=CAU' },
        { id: 2, image: 'https://www.shutterstock.com/image-vector/paper-art-shopping-online-on-260nw-2074005938.jpg' },
        { id: 3, image: 'https://static.vecteezy.com/system/resources/previews/004/299/835/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg'}
        
       ];

    return (
        <div className="ad-carousel-container">
            <Carousel 
                autoPlay 
                interval={5000} 
                infiniteLoop 
                showThumbs={false} 
                showStatus={false}
                centerMode
                centerSlidePercentage={50}
                dynamicHeight
            >
                {ads.map(ad => (
                    <div key={ad.id} className="ad-item">
                        <img src={ad.image} alt={`Ad ${ad.id}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default AdCarousel;
