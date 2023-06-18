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
    
    showActionButton(action) {
        
        if(action == "update"){
            this.qS("#updateButtonDiv").style.display = "block";
            this.qS("#saveButtonDiv").style.display = "none";
        }
        else {
            this.qS("#updateButtonDiv").style.display = "none";
            this.qS("#saveButtonDiv").style.display = "block";
        }
    }
}

export const helper = new Helper();