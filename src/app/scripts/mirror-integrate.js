var dui = null;

let Service = {

    GetPrices: function(response) {
        let txt = "TOTALS: <br>" + JSON.stringify(response.breakdown.totals) + "<br><br>" + "DETAILS: <br>" + JSON.stringify(response.breakdown.Glass.AB) + "<br>";
        $('#response').html(txt);
    },

    DuiFailed: function(response) {
        alert("DUI FAILED!");
        console.log(response);
    }

}

function SpecifyContainers() {

    /*
        "containers" is an object which is used to turn on/off features of the DUI.
        For each element, you can use these values:
            - false: It turns it off.
            - true: It turns it on and it creates a new div for it inside the <div> containers.globalDiv, using a prespecified prefix.
            - "someDivId": It turns it on, and it creates it inside your div. Make sure it exists.
    */

    let containers = {
        globalDiv: "dui", //This will be rather useless at this point
        prefs: false,
        library: false,
        appActions: false,
        objectActions: false,
        actionInputs: true,
        mainDrwg: "mainDrwg", //This is the existing div in the html page which will host the dui.
        detDrwg: false,
        propTable: false,
        dumper: false,
    };

    return containers;

}

function SpecifyConsumers() {

    /*
        "Consumer" is an object that handles the result/response of each DUI execution circle.
        For each consumer you will need the following
    */

    let consumer = {

        object: Service, // The consumer object

        /*
            All of the following properties are methods of the object that are called by DUI in various cases.
            DUI passes to them related responses.
            In particular each property is used if you want to do things as follows:
        */

        onLoad: null, //After the DUI is loaded
        onRun: null, //During DUI's calculation
        onSuccess: "GetPrices", //Handle a succesful request
        onFail: "DuiFailed", //Handle a failed request
        onSave: null //After saving the project

    };

    /*
        DUI accepts an array of consumers.
    */

    let consumers = [consumer];

    return consumers;

}

function InitiateDrawingUI() {

    let settings = {
        prefix: "dgm-", //Always use a prefix that is nowhere else used in your website. It will be used to name html elements automatically built by DrawingUi.js
        container: SpecifyContainers(),
        consumers: SpecifyConsumers() //Optional, but needed
    }

    // let mode = "singleMirror"; // Use this mode for now
    let user = { mode: "singleMirror" };
    /*
        For faster performance, use only ONE DUI in your project. If you don't need it, you can hide the div.
        The purpose is to handle the DUI by calling its methods.
    */
    dui = new DrawingUI(user, settings);

}

function SetShape(shapeId) {

    /*
        Use this for now.
        shapeId values:
        0- rectangle
        1- square
        2- Ellipse
        3- Circle
        
    */

    dui.Do("shape", shapeId, "mirrorShape");

}