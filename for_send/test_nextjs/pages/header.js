
import Image from 'next/image';
import menu_icon from '../public/menu_icon.svg';


function HeaderComponent() {    
    return (    
            
        <div className = 'header'>
            
            <div className="menu_left">
                <a href='/registr' className="registr">Registration</a>
                <a href='/login' className="authoriz">Authorization</a>
                <a className="works">Works</a>
                <a className="blog">Blog</a>
                <a>Contact</a>
                
            </div>
            <div className="menu_right"><Image src={menu_icon} alt='menu' /></div>
        
        </div> 
    
    )
    
}

export default HeaderComponent;


