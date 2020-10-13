import React from 'react';

const Footer = () => {
    const iconsCopyright = (
        <div>
            Icons made by  
            <a href="https://www.freepik.com/" title="Freepik"> Freepik </a> 
             from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com </a> 
             is licensed by 
            <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank"> CC 3.0 BY </a>
        </div>
    );

    return (
        <div className="content-container">
            <div className="footer">
                <p>Copyright &copy; { new Date().getFullYear() }</p>
                <p>All rights reserved.</p>
                <p>Made with <i className="heart-symbol"></i> by <a href="https://marekmatejovic.com/">devmaroy</a></p> 
                { iconsCopyright }
            </div>
        </div>
    );
};

export default Footer;