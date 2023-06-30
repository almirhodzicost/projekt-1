export class Helper {
    qS(selector) {
        return document.querySelector(selector);
    }
    
    qSA(selector) {
       return document.querySelectorAll(selector);
    }
    
    gE(element) {
        return document.getElementById(element);
    }
    
    gECN(element) {
        return document.getElementsByClassName(element);
    }
    
    cBChecked(checkbox) {
        return checkbox.checked;
    }
}

export const helper = new Helper();