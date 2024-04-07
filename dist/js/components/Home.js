import {templates, select} from "../settings.js";
import utils from "../utils.js";

class Home{
  constructor(element){
    const thisHome = this;

    thisHome.render(element);
  }

  render(){
    const thisHome = this;

    const generatedHTML = templates.homeWidget();
    thisHome.element = utils.createDOMFromHTML(generatedHTML);
    const homeContainer = document.querySelector(select.containerOf.home);
    homeContainer.appendChild(thisHome.element).innerHTML;
  }
}

export default Home;