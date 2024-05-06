import React from 'react';
import './style.css';

interface NavbarProps {
    favorites: string[];
    toggleFavorites: () => void; 
    searchQuery: string;
    handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    clearSearch: () => void;
  }
const Navbar: React.FC<NavbarProps> = ({ toggleFavorites, searchQuery, handleSearchInputChange}) => {
  return (
    <>
    <div className="nav_wrapper ">
        <div className="main_wrapper">
            <div className="logo_wraper">
                D&D
            </div>
            <div className="search_wrapper">
                <div className="searchQuery">
                    <input type="text" value={searchQuery} placeholder='Search' onChange={handleSearchInputChange} />
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 32 32" version="1.1">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" >
                            <g id="Icon-Set"  transform="translate(-256.000000, -1139.000000)" fill="#fff">
                                <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z" id="search" >

                    </path>
                            </g>
                        </g>
                    </svg>
                </div>
                <span className='favourate' onClick={toggleFavorites}>
                    Favorite
                    <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none">
                    <path d="M12.89 5.87988H5.10999C3.39999 5.87988 2 7.27987 2 8.98987V20.3499C2 21.7999 3.04 22.4199 4.31 21.7099L8.23999 19.5199C8.65999 19.2899 9.34 19.2899 9.75 19.5199L13.68 21.7099C14.95 22.4199 15.99 21.7999 15.99 20.3499V8.98987C16 7.27987 14.6 5.87988 12.89 5.87988Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 8.98987V20.3499C16 21.7999 14.96 22.4099 13.69 21.7099L9.76001 19.5199C9.34001 19.2899 8.65999 19.2899 8.23999 19.5199L4.31 21.7099C3.04 22.4099 2 21.7999 2 20.3499V8.98987C2 7.27987 3.39999 5.87988 5.10999 5.87988H12.89C14.6 5.87988 16 7.27987 16 8.98987Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 5.10999V16.47C22 17.92 20.96 18.53 19.69 17.83L16 15.77V8.98999C16 7.27999 14.6 5.88 12.89 5.88H8V5.10999C8 3.39999 9.39999 2 11.11 2H18.89C20.6 2 22 3.39999 22 5.10999Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </span>
            </div>
        </div>
    </div> 
    </>
  )
}

export default Navbar
