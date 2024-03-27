import HeaderComponent from "../pages/header";
import FooterComponent from "../pages/footer";

import Script from 'next/script'
function loginPage(){    
    return(   
        <div className = 'container'>
            <div> <HeaderComponent></HeaderComponent> </div>  
                <div className="registration">
                    <div  className="registration_title">Authorization</div>
                    <div id="message_registr" ></div>
                    <form method="post" action="localhost:3001/registr" encType="multipart/form-data">
                        <label  >Enter email</label>
                        <input type='text' name = "username" />
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

                            fetch(`http://localhost:3001/login`, {
                            method: "POST",
                            headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            },
                            body: dataSend,
                            })
                            .then((response) => {
                                if (!response.ok) {
                                    console.log(response.status);
                                    const $elem = document.querySelector('#message_registr');
                                    // эта строчка удалит все элементы в #message и добавит в него текстовый узел с текстом "Новый текст..."
                                    $elem.textContent = 
                                    `The username and password your provided are invalid, status ${response.status}`;
                                    throw new Error('Error occurred!')
                                  }
                                  response.json().then((data) => {
                                    const tokenUser = {user: data.user, token: data.tokenUser};
                                    localStorage.setItem('tokenUser', JSON.stringify(tokenUser))
                                    console.log(response.status);
                                    console.log('data.message ',data.message);
                                    console.log('data ',data);
                                    const $elem = document.querySelector('#message_registr');
                                    // эта строчка удалит все элементы в #message и добавит в него текстовый узел с текстом "Новый текст..."
                                    $elem.textContent = `${data.message}`;
                                    //return data;
                                })
                               
                            })
                            .catch((error) => console.error("Error:", error));
                            
                             }}>sign in</button><br /><br />
                                    <form action={'/'}>
                                        <button >To home page</button>
                                    </form>
                                            
                </div>
            <div><FooterComponent></FooterComponent></div>
            <Script>
                const getitm = localStorage.getItem('tokenUser');
                const getitmObj = JSON.parse(getitm);
                {/* console.log('getitm ',getitm.user); */}
                if(getitm !== null) var cont = "You are logged in as " + getitmObj.user + ".";
                console.log('cont ', cont);
                
                if(getitm !== null) document.querySelector('#message_registr')
                .textContent = cont;
                
            </Script>
            
            
        </div>  
    )
    
}
export default loginPage  