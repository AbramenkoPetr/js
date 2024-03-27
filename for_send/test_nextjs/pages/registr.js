import HeaderComponent from "../pages/header";
import FooterComponent from "../pages/footer";


function registrPage(){    
    return(   
        <div className = 'container'>
            <div> <HeaderComponent></HeaderComponent> </div>  
                <div className="registration">
                    <div  className="registration_title">Registration</div>
                    <div id="message_registr" ></div>
                    <form method="post" action="localhost:3001/registr" encType="multipart/form-data">
                        <label  >Enter email</label>
                        <input type='text' name = "username"  />
                        <br /><br />
                        <label >Enter password</label>
                        <input type='text' name = "password"  />
                        <br /><br />
                    
                        
                        </form>
                        <button className="button_registr" onClick={() => {
                           
                            const data = new FormData(document.querySelector('form'));
                            const formDataObj = {};
                            data.forEach((value, key) => (formDataObj[key] = value));
                            var dataSend = JSON.stringify(formDataObj);
                            //  console.log('dataSend ', dataSend);

                            fetch(`http://localhost:3001/registr`, {
                            method: "POST",
                            headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            },
                            body: dataSend,
                            })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error('Error occurred!')
                                  }
                                  response.json().then((data) => {
                                    console.log('data.message ',data.message);
                                    const $elem = document.querySelector('#message_registr');
                                    
                                    $elem.textContent = `${data.message}`;
                                    
                                })
                               
                            })
                            .catch((error) => console.error("Error:", error));
                            
                             }}>sign in</button><br /><br />
                            <form action={'/'}>
                                <button >To home page</button>
                            </form>
                                            
                </div>
            <div><FooterComponent></FooterComponent></div>
            
        
        
        </div>  
    )
    
}
export default registrPage  