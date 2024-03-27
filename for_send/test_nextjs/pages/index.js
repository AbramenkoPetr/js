import Image from 'next/image'
import HeaderComponent from "../pages/header";
import FooterComponent from "../pages/footer";
import photo from '../public/photo.png';
import DesigningDashboards from '../public/DesigningDashboards.png';
import VibrantPortraits from '../public/VibrantPortraits.png';
import Malayalam from '../public/Malayalam.png';
function helloPage(){    
    return(   
        <div className = 'container'>
            <div> <HeaderComponent></HeaderComponent> </div>  
                <div className='top'>
                    <Image className='top_img_top' src={photo} alt='photo' />
                    <div className="john_left">
                        <div className="john">
                            Hi, I am John,
                            Creative Technologist
                        </div>
                        <div className="john_description">
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
                        Velit officia consequat duis enim velit mollit. 
                        Exercitation veniam consequat sunt nostrud amet.
                        </div>
                        <button className="john_button">Download Resume</button>
                    </div>
                    <div className='john_img'>
                        {/* <Image
                        src="/photo.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                        /> */}
                        {/* <Image src="/photo.png" layout="fill"/> */}
                        <Image src={photo} alt='photo' />
                    </div>
                </div> 
                <div className='recent'>
                    <div className='recent_view'>
                        <div className='recent_posts'>Recent posts</div>
                        <div className='view_all'>View all</div>
                    </div>
                    <div className='making_creating'>
                        <div className='mak_creat_left'>
                            <div className='mak_creat1'>
                                Making a design system from scratch
                            </div>
                            <div className='mak_creat2'>
                                <div className='mak_creat2_dat'>12 Feb 2020</div>
                                <div className='mak_creat2_bord'></div>
                                <div className='mak_creat2_name'>Design, Pattern</div>
                            </div>
                            <div className='mak_creat3'>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
                            Velit officia consequat duis enim velit mollit. 
                            Exercitation veniam consequat sunt nostrud amet.
                            </div>
                        </div>
                        <div className='mak_creat_right'>
                            <div className='mak_creat1'>
                            Creating pixel perfect icons in Figma
                            </div>
                            <div className='mak_creat2'>
                                <div className='mak_creat2_dat'>12 Feb 2020</div>
                                <div className='mak_creat2_bord'></div>
                                <div className='mak_creat2_name'>Figma, Icon Design</div>
                            </div>
                            <div className='mak_creat3'>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
                            Velit officia consequat duis enim velit mollit. 
                            Exercitation veniam consequat sunt nostrud amet.
                            </div>
                        </div>
                        {/* <div className='creating'>View all</div> */}
                    </div>
                </div>
                <div className='featured_works'>Featured works</div>
                <div className='featured_works_cont01'>
                    {/* <div className='Featured_works_img'> */}
                        <Image className='featured_works_img' src={DesigningDashboards} alt='img' />
                        
                    {/* </div> */}
                    <div className='featured_works_right'>
                        <div className='featured_works_title'>
                            Designing Dashboards
                        </div>
                        <div className='featured_works_cont1'>
                            <div className='featured_works_cont1_l_fon'>
                                <div className='featured_works_cont1_l_cont'>
                                    2020
                                </div>
                            </div>
                            <div className='featured_works_cont1_r'>
                                Dashboard
                            </div>
                            
                        </div>
                        <div className='featured_works_cont2'>
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
                        Velit officia consequat duis enim velit mollit. 
                        Exercitation veniam consequat sunt nostrud amet.
                        </div>
                    </div>
                </div>
                <div className='long_line1'></div>
                <div className='featured_works_cont'>
                    {/* <div className='Featured_works_img'> */}
                        <Image className='featured_works_img' src={VibrantPortraits} alt='img' />
                        
                    {/* </div> */}
                    <div className='featured_works_right'>
                        <div className='featured_works_title'>
                            Vibrant Portraits of 2020
                        </div>
                        <div className='featured_works_cont1'>
                            <div className='featured_works_cont1_l_fon'>
                                <div className='featured_works_cont1_l_cont'>
                                2018
                                </div>
                            </div>
                            <div className='featured_works_cont1_r'>
                                Illustration
                            </div>
                            
                        </div>
                        <div className='featured_works_cont2'>
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
                        Velit officia consequat duis enim velit mollit. 
                        Exercitation veniam consequat sunt nostrud amet.
                        </div>
                    </div>
                </div>
                <div className='long_line2'></div>
                <div className='featured_works_cont'>
                    {/* <div className='Featured_works_img'> */}
                        <Image className='featured_works_img' src={Malayalam} alt='img' />
                        
                    {/* </div> */}
                    <div className='featured_works_right'>
                        <div className='featured_works_title'>
                            36 Days of Malayalam type
                        </div>
                        <div className='featured_works_cont1'>
                            <div className='featured_works_cont1_l_fon'>
                                <div className='featured_works_cont1_l_cont'>
                                    2018
                                </div>
                            </div>
                            <div className='featured_works_cont1_r'>
                                Typography
                            </div>
                            
                        </div>
                        <div className='featured_works_cont2_last'>
                        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
                        Velit officia consequat duis enim velit mollit. 
                        Exercitation veniam consequat sunt nostrud amet.
                        </div>
                    </div>
                </div>
                <div className='long_line3'></div>
            <div><FooterComponent></FooterComponent></div>
        </div>  
    )
}
export default helloPage