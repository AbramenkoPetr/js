import Image from 'next/image';
import f from '../public/f.svg';
import camera from '../public/camera.svg';
import bird from '../public/bird.svg';
import in_img from '../public/in_img.svg';
function FooterComponent() {    
	return (        
		<div className="footer">
			<div className='icons'>
				<Image src={f} alt='f' />
				<Image src={camera} alt='camera' />
				<Image src={bird} alt='bird' />
				<Image src={in_img} alt='in' />
			</div>
			Copyright ©2020 All rights reserved
		</div>    
	)
}
export default FooterComponent