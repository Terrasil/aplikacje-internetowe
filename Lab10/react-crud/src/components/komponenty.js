import React from "react"
/*
import lg from "./images/lg_k41s.png"
import motorola from "./images/motorola_e7_plus.png"
import oppo from "./images/oppo_a31.png"
import samsung from "./images/samsung_galaxy_a20s.png"
import xiaomi from "./images/xiaomi_redmi_note_9_pro.png"
*/
export class Header extends React.Component{
    componentDidMount(){
        document.title = "Patryk Morawski 185IC B1 - Laboratorium 6"
    }
    render(){
        return(
            <header class='shadow'>
                <div class="row">
                    <div class="name">
                        <h1>SHOPPER</h1>
                        <h5>Sklep internetowy</h5> 
                    </div>
                </div>
            </header>
        );
    }
}
export class Footer extends React.Component{
    render(){
        return(
            <footer>
                Copyright © Patryk Morawski 2020
            </footer>
        );
    }
}

export class Strona extends React.Component{
    render(){
        /*const oferty = [
            {
                id:1,
                ikona:samsung,
                nazwa:"Samsung Galaxy A20s",
                opis:"Nulla facilisi. Proin venenatis lacus quis lacus faucibus, quis mollis quam egestas. Maecenas et nisl a neque laoreet feugiat. Fusce ac libero non mi pellentesque blandit. Pellentesque dignissim ultrices arcu, ac cursus sem rutrum vel. Aenean non pharetra diam, vel egestas ipsum. Proin maximus mi ex, sodales pellentesque lacus molestie eget. Donec vitae urna ornare, viverra sapien nec, consectetur orci. Morbi tempus, enim congue lobortis pulvinar, velit tortor tincidunt ipsum, id dapibus velit eros in urna. Nunc posuere a neque a tempor. Donec sed luctus augue.",
                cena: 699.99
    
            },
            {
                id:2,
                ikona:oppo,
                nazwa:"Oppo A31",
                opis:"Praesent faucibus sed dui id ornare. Donec dictum quis erat vel euismod. Phasellus lobortis neque id diam venenatis, at euismod tortor consectetur. Sed ullamcorper magna id dictum iaculis. Nulla dapibus, massa malesuada fringilla tincidunt, neque mauris tempor odio, id mollis lacus arcu at massa. Curabitur et eros in leo congue posuere ut ut enim. Nunc vitae mattis nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum mattis neque id mauris sodales, eu consequat mi laoreet. Sed imperdiet, diam vitae fringilla ornare, arcu erat eleifend sem, aliquam laoreet nibh neque ac mauris. Proin venenatis hendrerit mi, id aliquam dolor malesuada sed. Mauris eu ante erat. Aliquam porta magna a mattis fringilla.",
                cena: 749.99
            },
            {
                id:3,
                ikona:xiaomi,
                nazwa:"Xiaomi Redmi Note 9 PRO",
                opis:"Sed ac auctor dolor, id ornare lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam semper rhoncus lorem, ut posuere mauris eleifend nec. Fusce eu erat ac lacus ultrices feugiat. Mauris eget sapien cursus, lacinia turpis at, condimentum est. Sed blandit, nisi non scelerisque egestas, mauris nisl vulputate leo, nec lacinia velit ante sit amet leo. Nam sed lorem fermentum, scelerisque mauris eget, venenatis magna. Pellentesque imperdiet vel tortor quis congue. Ut eget turpis sit amet tortor tristique efficitur sed commodo lectus. Morbi dapibus lacus ut risus tristique congue. Mauris tristique metus ut est tempus, in pharetra ante egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam elementum scelerisque aliquam. Etiam id placerat velit, non tempus metus.",
                cena: 1079.99
            },
            {
                id:4,
                ikona:lg,
                nazwa:"LG K41s",
                opis:"Duis tristique justo at dolor egestas dapibus at id velit. Nullam purus urna, laoreet in sagittis vel, ullamcorper non mauris. Nulla gravida, purus ut cursus blandit, diam libero faucibus nisl, id vestibulum dolor sem vitae dui. Duis maximus felis sed mauris pharetra, vel molestie enim tempus. Morbi consectetur, arcu quis semper iaculis, ante dui fringilla ex, et laoreet sem leo ac lorem. Fusce quam lacus, aliquet at fermentum et, vulputate at ipsum. Donec vel sapien dui. Cras ut magna imperdiet, egestas justo non, elementum dolor. Quisque volutpat suscipit leo eget mollis.",
                cena: 649.99
            },
            {
                id:5,
                ikona:motorola,
                nazwa:"Motorola E7 Plus",
                opis:"Fusce sed lacus a tortor rutrum viverra vitae ac nulla. Praesent et ipsum justo. Integer eget sapien at dui vulputate semper ut eget neque. Fusce porta ut diam eu finibus. Quisque lorem risus, suscipit sed faucibus in, venenatis ac urna. Maecenas aliquam suscipit risus. Morbi eu elementum nibh, sit amet cursus erat. Pellentesque feugiat tristique orci, vel feugiat massa fringilla iaculis. Donec tincidunt sem felis, in luctus lorem imperdiet et. Duis vel dapibus lorem, pellentesque venenatis turpis. Cras sed felis id ipsum pellentesque tincidunt vitae vitae urna. Quisque tincidunt, metus eget gravida efficitur, ante metus dignissim magna, quis semper mi diam eget lectus. Praesent luctus tortor felis, quis ultrices nulla euismod eget. Quisque dapibus tincidunt lorem quis eleifend. Suspendisse varius, tortor ut porta convallis, orci quam blandit dui, vehicula dictum neque mi bibendum ex.",
                cena: 599.99
            }
                 <Oferta lista={oferty}></Oferta>
        ];*/
        return(
            <div class="w-75 mx-auto">
            </div>
        );
    }
}


export class Oferta extends React.Component{
    render(){
        return(
            <div>
                {this.props.lista.map(function(dane){
                        return(
                            <div class="element shadow mb-5">
                                <div class="row">
                                    <div class="col-md-3 text-center">
                                        <img class="show img-fluid" src={dane.upload} alt={dane.title}/>
                                    </div>
                                    <div class="col-md-9 p-5">
                                        <Opis informacje={dane}></Opis>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export function Opis(info) {  
    return (  
      <div>  
            <h6>{info.informacje.title}</h6>   
            <span>{info.informacje.description}</span><br/><br/> 
            <span><b>{info.informacje.price} zł</b></span> 
      </div>  
    );  
  }  