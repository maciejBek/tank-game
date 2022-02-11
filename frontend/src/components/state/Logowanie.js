import React from 'react';
import './Logowanie.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import './test'


const LOGIN_REST_API_URL = 'http://localhost:8080/api/login';

 
const Linkk = () =>{
    return(
        <Link id="rejel" to="Rejestracja">Dołacz do nas</Link>
    )
}

class Logowanie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        //this.funkcja = this.funkcja.bind(this);

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // funkcja() {
    //     const observer = new Observer();
    //     observer.pokaz()
    //   }
   


    handleSubmit(event) {
        let account = document.getElementById('accountl');
        let formData = new FormData(account);


        var data = {};
        formData.forEach(function(value, key){
            data[key] = value;
        });
            console.log(data)
        document.getElementById('pasek0').style.border = "0px solid red";
        document.getElementById('pasek1').style.border = "0px solid red";
        document.getElementById('bladl').style.display = "none";
        document.getElementById('dobrzel').style.display = "none";

        let body = JSON.stringify(data);

                // add car to database with post method
                axios({
                    method: "post",
                    url: LOGIN_REST_API_URL,
                    data: body,
                    headers: {"Content-Type": "application/JSON"},
                })

                    .then(function (response) {
                        console.log(response)
                        document.getElementById("gra").click()
                        
                    })
                    .catch(function (response) {
                        
                        console.log(response)
                        document.getElementById('pasek0').style.border="3px solid red";
                        document.getElementById('pasek1').style.border="3px solid red";
                        document.getElementById('bladl').style.display = "inline";
                    }).catch(function (response) {
                    //handle error
                    console.log(response);
                    });

        event.preventDefault();
    }


    render() {
        return (
            //<div id="strona">
              //  <div id="pole" >
                //    <div id="logo"></div>
                //</div>
            <div id="logowaniel">
                <div className="textl">
                Logowanie
                </div>
                <form id="accountl" onSubmit={this.handleSubmit}>
                <div id="pozl">
                <div className="pasekl" id="pasek0">
                    <div id="zdj1l"></div>
                    <input className="inputl" type="text" name="username" placeholder="Login"/>
                </div>
                <div className="pasekl" id="pasek1">
                    <div id="zdj2l"></div>
                    <input className="inputl" type="password" name="password" placeholder="Hasło"/>
                </div>
                </div>
                    <div id="dobrzel">
                        zalogowano!
                    </div>
                    <div id="bladl">
                        Wprowadzono zle dane!
                    </div>
                <div id="przyciskl">
                    <input id="przycisk1l" type="submit" value="Zaloguj" />
                    
                </div>
                </form>
                <div id="rejl">Nie masz jeszcze konta?

                <Linkk></Linkk>
                <Link id="gra" to="game"></Link>

                </div>
                
            </div>
            //</div>
        );
    }
}
export default Logowanie;