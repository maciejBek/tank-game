import React from 'react';
import './Rejestracja.css';
import axios from "axios";
import { Link } from 'react-router-dom';



const REGISTRATION_REST_API_URL = 'http://localhost:8080/api/registration';



class Rejestracja extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        // getting data from form and putting to json string to body array
        let account = document.getElementById('account');
        let formData = new FormData(account);
        let password1 = document.getElementById('haslo1').innerHTML

        var data = {};
        formData.forEach(function(value, key){
            data[key] = value;
        });

        console.log(password1)
        document.getElementById('pasek0').style.border = "0px solid red";
        document.getElementById('pasek1').style.border = "0px solid red";
        document.getElementById('pasek2').style.border = "0px solid red";
        document.getElementById('pasek3').style.border = "0px solid red";
        document.getElementById('blad').style.display = "none";
        document.getElementById('blad1').style.display = "none";
        document.getElementById('blad2').style.display = "none";
        document.getElementById('blad3').style.display = "none";
        document.getElementById('blad4').style.display = "none";

        let email =document.getElementById('email').value
        let login =document.getElementById('login').value
        let haslo1 =document.getElementById('haslo1').value
        let haslo2 =document.getElementById('haslo2').value


        if(email == ""){
            document.getElementById('pasek0').style.border="3px solid red";
            document.getElementById('blad4').style.display = "inline";
        }
        if(login == ""){
            document.getElementById('pasek1').style.border="3px solid red";
            document.getElementById('blad4').style.display = "inline";
        }
        if(haslo1 == ""){
            document.getElementById('pasek2').style.border="3px solid red";
            document.getElementById('blad4').style.display = "inline";
        }
        if(haslo2 == ""){
            document.getElementById('pasek3').style.border="3px solid red";
            document.getElementById('blad4').style.display = "inline";
        }


        if(email != "" && login !="" && haslo1 !="" && haslo2 != ""){
        if(haslo1 != haslo2){
            console.log("hasla sie roznia")
            document.getElementById('pasek2').style.border="3px solid red";
            document.getElementById('pasek3').style.border="3px solid red";
            document.getElementById('blad').style.display="inline";

        }else {
            console.log("hasla zgodne")
            
            

            console.log(data)

            let body = JSON.stringify(data);
            console.log(body)

            // add car to database with post method
            axios({
                method: "post",
                url: REGISTRATION_REST_API_URL,
                data: body,
                headers: {"Content-Type": "application/JSON"},
            })

                .then(function (response) {
                    console.log(response)
                    document.getElementById('dobrze').style.display = "inline";
                    document.getElementById('to').click();
                })
                .catch(function (response) {
                    console.log(response)
                    const error =(response.data.error);
                    console.log(error.error)
                    if(error.error == "email-address-and-username-exist"){
                        document.getElementById('pasek0').style.border="3px solid red";
                        document.getElementById('pasek1').style.border="3px solid red";
                        document.getElementById('blad1').style.display = "inline";
                    }else if(error.error == "email-address-exists"){
                        document.getElementById('pasek0').style.border="3px solid red";
                        document.getElementById('blad2').style.display = "inline";
                    }else if(error.error == "username-exists"){
                        document.getElementById('pasek1').style.border="3px solid red";
                        document.getElementById('blad3').style.display = "inline";
                    }

                }).catch(function (response) {
                //handle error
                console.log(response);
            });
        }
        }


        event.preventDefault();
    }



    render() {
        return (
            //<div id="strona">
            //  <div id="pole" >
            //    <div id="logo"></div>
            //</div>
            <div id="logowanie">
                <div className="text">
                    Rejestracja
                </div>
                <form id="account" onSubmit={this.handleSubmit}>
                    <div id="poz">
                        <div className="pasek" id="pasek0">
                            <div id="zdj3"></div>
                            <input className="input" id="email" type="text" name="email" placeholder="E-mail" value={this.state.value} onChange={this.handleChange}/>
                        </div>
                        <div className="pasek" id="pasek1">
                            <div id="zdj1"></div>
                            <input className="input" id="login" type="text" name="username" placeholder="Login" value={this.state.value} onChange={this.handleChange}/>
                        </div>
                        <div className="pasek" id="pasek2">
                            <div id="zdj2"></div>
                            <input className="input" id="haslo1" type="password" name="password" placeholder="Hasło" value={this.state.value} onChange={this.handleChange}/>
                        </div>
                        <div className="pasek" id="pasek3">
                            <div id="zdj4"></div>
                            <input className="input" id="haslo2" type="password" name="password" placeholder="Powtórz hasło" value={this.state.value} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="blad" id="blad">
                        podane hasła się różnią!
                    </div>
                    <div className="blad" id="blad1">
                        Podany e-mail oraz login są już wykorzystywane!
                    </div>
                    <div className="blad" id="blad2">
                        Podany e-mail jest już wykorzystany!
                    </div>
                    <div className="blad" id="blad3">
                        Podany login jest już wykorzystany!
                    </div>
                    <div className="blad" id="blad4">
                        Wypełnij zaznaczone pola!
                    </div>
                    <div id="dobrze">
                        Konto zostało utworzone!
                    </div>

                    <div id="przycisk">
                        <input id="przycisk1" type="submit" value="Zarejestruj sie" />
                        <Link id="to" to="/"/>
                    </div>

                </form>
            </div>
            //</div>
        );
    }
}
export default Rejestracja;