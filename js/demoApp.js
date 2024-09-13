import { createApp, ref , isProxy, toRaw} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            totalScannedBarcodes: [],
            isExpanded: false,
            logs: null,
            Barkoder: null,
            cameras: [],
            result: ref({}),
            selections: {
                check_all : ref(false),
                active_camera : ref(''),
                barcode_type : ref('1d'),
                enabledDecoders : ref(0),
                syms : ref([]),
                template : ref('all'),
                speed : ref(1),
                camera_res : ref(0),
                dps : ref(2),
                isMultiscanEnabled: false,
            },
            flags: ref({
                mode : '',
                showBox : '',
                showResultBox : false,
            }),
            notifications: [],
            template_data : ref({}),
            barcodes_data : {
                0 : {
                    title: 'Aztec',
                    type : '2d'
                },
                1 : {
                    title: 'Aztec Compact',
                    type : '2d'
                },
                2 : {
                    title: 'QR Code',
                    type : '2d'
                },
                3 : {
                    title: 'Micro QR Code',
                    type : '2d'
                },
                4 : {
                    title: 'Code 128',
                    type : '1d'
                },
                5 : {
                    title: 'Code 93',
                    type : '1d'
                },
                6 : {
                    title: 'Code 39',
                    type : '1d'
                },
                7 : {
                    title: 'Codabar',
                    type : '1d'
                },
                8 : {
                    title: 'Code 11',
                    type : '1d'
                },
                9 : {
                    title: 'MSI Plessey',
                    type : '1d'
                },
                10 : {
                    title: 'UPC A',
                    type : '1d'
                },
                11 : {
                    title: 'UPC E',
                    type : '1d'
                },
                12 : {
                    title: 'UPC E1',
                    type : '1d'
                },
                13 : {
                    title: 'EAN 13',
                    type : '1d'
                },
                14 : {
                    title: 'EAN 8',
                    type : '1d'
                },
                15 : {
                    title: 'PDF417',
                    type : '2d'
                },
                16 : {
                    title: 'Micro PDF417',
                    type : '2d'
                },
                17 : {
                    title: 'Data Matrix',
                    type : '2d'
                },
                18 : {
                    title: 'Code 25',
                    type : '1d'
                },
                19 : {
                    title: 'Interleaved 2 of 5',
                    type : '1d'
                },
                20 : {
                    title: 'ITF-14',
                    type : '1d'
                },
                21 : {
                    title: 'Code 2 of 5 IATA',
                    type : '1d'
                },
                22 : {
                    title: 'Code 2 of 5 Matrix',
                    type : '1d'
                },
                23 : {
                    title: 'Code 2 of 5 Datalogic',
                    type : '1d'
                },
                24 : {
                    title: 'Code 2 of 5 Standard',
                    type : '1d'
                },
                25 : {
                    title: 'Code 32',
                    type : '1d'
                },
                26 : {
                    title: 'Telepen',
                    type : '1d'
                },
                27 : {
                    title: 'DotCode',
                    type : '2d'
                },
            },
            template_titles : {
                "custom"			: "Custom",
                "multiscan"			: "MultiScan",
                "all"				: "All Barcodes",
                "pdf_optimized"		: "PDF417 Optimized Barcodes",
                "qr"				: "QR Barcodes",
                "retail_1d"			: "Retail 1D Barcodes",
                "industrial_1d"		: "Industrial 1D Barcodes",
                "all_2d"			: "All 2D Barcodes",
                "dpm"				: "DPM Barcodes",
                "vin"				: "VIN Barcodes",
                "dotcode"			: "DotCode",
            }
        }
    },
    computed: {
        templateTitle : function (){

            return this.template_titles[this.selections.template];
        },
        barcode_types : function (){
            
            let self = this,
                res = {}

            if(this.selections.barcode_type){

                Object.keys(self.barcodes_data).forEach(key => {
                    
                    let o = self.barcodes_data[key];

                    if(o.type == this.selections.barcode_type){
                        res[o.title] = key
                    }
                });
            }

            return res
        },
        decoderSpeedList: function (){
            
            let res = [];

            let speedModes = [
                Object.keys(this.Barkoder.constants.DecodingSpeed)[0]
                ,Object.keys(this.Barkoder.constants.DecodingSpeed)[1]
                ,Object.keys(this.Barkoder.constants.DecodingSpeed)[2]
            ];
            
            let speedsCount = speedModes.length;
            for(let i = 0; i < speedsCount; i++)
            {
                res.push({
                    value : this.Barkoder.constants.DecodingSpeed[speedModes[i]],
                    text : speedModes[i],

                })
            }

            return res
        },
        cameraResolutionList: function(){
            
            let res = [];
            
            let resolutionModes = [
                Object.keys(this.Barkoder.constants.CameraResolution)[0]
                ,Object.keys(this.Barkoder.constants.CameraResolution)[1]
            ];

            let resolutionsCount = resolutionModes.length;
            for(let i = 0; i < resolutionsCount; i++)
            {
                res.push({
                    value : this.Barkoder.constants.CameraResolution[resolutionModes[i]],
                    text : resolutionModes[i],
                })
            }
            
            return res
        },
        latestResult: function(){
            
            let res = {};
            
            if(this.totalScannedBarcodes.length > 0){
                res = this.totalScannedBarcodes[this.totalScannedBarcodes.length - 1];
            }
            else if(Object.keys(this.result).length > 0){
                res = {...this.result}
            }

            return res
        },
    },
    watch: {
        'result.textualData': async function (textualData){
            this.swipeHideResultSection()
        },
        'totalScannedBarcodes': async function (totalScannedBarcodes){
            this.swipeHideResultSection()
        },
        'selections.barcode_type': async function (newVal,oldVal){
            if(!this.selections.barcode_type){
                this.selections.barcode_type = '1d'
            }

        },
        'selections.template': async function (newVal, oldVal) {
                this.selections.syms = await this.Barkoder.applyTemplate('./js/templates.json', newVal);            
        },
        'selections.speed': function (newVal){
            let ret = this.Barkoder.setDecodingSpeed(Number(newVal));
            let was = (ret == 0) ? "was" : "was NOT";
        },
        'selections.camera_res': function (newVal){

            let ret = this.Barkoder.setCameraResolution(Number(newVal));
            let was = (ret == 0) ? "was" : "was NOT";
        },
        'selections.dps': function (newVal){

            let ret = this.Barkoder.setDpsLimit(Number(newVal));
            let was = (ret == 0) ? "was" : "was NOT";
        },
        'selections.syms': function (newVal){

            if(this.selections.syms){

                this.selections.check_all = (Object.keys(this.barcodes_data).length == this.selections.syms.length)?true:false;
            }

        },
    },
    methods: {
        symChange: function (){
            
            // if we mannyaly trigger a sym change, then set the custom template
            this.selections.template = 'custom';

            let symsArr = this.selections.syms;

            if (isProxy(this.selections.syms)){
                symsArr = toRaw(this.selections.syms)
            }

            // convert the array values into numbers (requred by the setEnabledDecoders())
            const symsArrNumbers = symsArr.map(item => Number(item));

            this.Barkoder.setEnabledDecoders.apply(null,symsArrNumbers)
            
            
        },
        checkAll: function(e) {
            this.selections.template    = 'custom';
            this.selections.syms    = (e.target.checked)?Object.keys(this.barcodes_data):[]
        },

        updateBarkoderSettings() {
                if (!this.selections.isMultiscanEnabled) {
                    this.Barkoder.setContinuous(false);
                    this.Barkoder.setMulticodeCachingDuration(0);
                    this.Barkoder.setMulticodeCachingEnabled(this.Barkoder.constants.MulticodeCachingEnabled.Disable);
                    this.Barkoder.setMaximumResultsCount(1);   
                    this.Barkoder.setDpsLimit(30);
                } else {
                    this.Barkoder.setContinuous(true);
                    this.Barkoder.setMulticodeCachingDuration(3000);
                    this.Barkoder.setMulticodeCachingEnabled(this.Barkoder.constants.MulticodeCachingEnabled.Enable);
                    this.Barkoder.setMaximumResultsCount(20);
                    this.Barkoder.setDpsLimit(30);                    
                }
        },
       
        toggleBatchMultiScan() {
            this.selections.isMultiscanEnabled = !this.selections.isMultiscanEnabled;
            this.updateBarkoderSettings();
        },
        handleCheckboxChange() {
            this.toggleBatchMultiScan();
          },
      
        showBox: function(activeBox) {

            let self = this;

            if(self.flags.showBox){

                if(self.flags.showBox == activeBox){

                    self.flags.showBox = ''
                }
                else{
                    self.flags.showBox = ''

                    setTimeout(() => {
                        
                        self.flags.showBox = activeBox

                    }, 350);
                }
            }
            else{
                self.flags.showBox = activeBox
            }


        },

        toggleExpand() {
            this.isExpanded = !this.isExpanded;
        },
        showSingleNotification(message) {
            
            this.notifications = [{textualData:message}]
        },
        addNotifications(result) {
            
            const messages = Array.isArray(result.results) ? result.results : [result];
            
            this.totalScannedBarcodes.push(...messages)
            this.notifications.push(...messages);
            
            const notificationsToRemove = [...this.notifications];
            
            notificationsToRemove.forEach((_, index) => {
                setTimeout(() => {
                    const notificationIndex = this.notifications.indexOf(notificationsToRemove[index]);
                    if (notificationIndex !== -1) {
                        this.notifications.splice(notificationIndex, 1);
                    }
                }, 3000);
            });
        },
        showResult: function(result) {

            this.result = result;

            if (!this.selections.isMultiscanEnabled) {
                this.showBox('');
            }
            else {
                this.addNotifications(result)
            }
            
            this.flags.mode = 'showResult';
            this.flags.showResultBox = true;

            let imageData = result.capturedFrame;

            function fitToContainer(canvas) {

                if (canvas && imageData) {
                    canvas.style.visibility = 'visible';
                    canvas.style.display = 'block';
                    canvas.width = imageData.width;
                    canvas.height = imageData.height;
                }
            }	

            setTimeout(() => {

                var canvas = document.getElementById("barkoder-result-image");
                var imageFullScreen = document.getElementById("barkoder-result-image-full");
                
                let imageData = result.capturedFrame;
                
                if (canvas) {

                    var ctx = canvas.getContext('2d');
                    
                    // Initialize a new ImageData object
                    createImageBitmap(imageData).then((image) => {
                                        
                        result.location.p1.x -= 20
                        result.location.p1.y -= 20
                        result.location.p2.x += 20
                        result.location.p2.y += 20
                        result.location.p3.x += 20
                        result.location.p3.y += 20
                        result.location.p4.x -= 20
                        result.location.p4.y -= 20

                        // Calculate the bounding box of the cutout area
                        const xs = [result.location.p1.x, result.location.p2.x, result.location.p3.x, result.location.p4.x];
                        const ys = [result.location.p1.y, result.location.p2.y, result.location.p3.y, result.location.p4.y];
                        const minX = Math.min(...xs);
                        const minY = Math.min(...ys);
                        const maxX = Math.max(...xs);
                        const maxY = Math.max(...ys);
                        let cutoutWidth = maxX - minX;
                        let cutoutHeight = maxY - minY;

                        // Apply 10% offset to the cutout dimensions
                        const offset = 0;
                        cutoutWidth *= (1 + offset);
                        cutoutHeight *= (1 + offset);

                        // Adjust the source rectangle to include the offset
                        const offsetX = -cutoutWidth * offset / 2;
                        const offsetY = -cutoutHeight * offset / 2;

                        // Calculate the scaling factor
                        const canvasWidth = 800; // Desired width of the canvas
                        const canvasHeight = 600; // Desired height of the canvas
                        const scaleX = canvasWidth / cutoutWidth;
                        const scaleY = canvasHeight / cutoutHeight;
                        const scale = Math.max(scaleX, scaleY);

                        // Update canvas size by applying the scaling factor
                        canvas.width = cutoutWidth * scale;
                        canvas.height = cutoutHeight * scale;

                        // Create a temporary canvas to draw the cutout portion
                        const tempCanvas = document.createElement('canvas');
                        const tempCtx = tempCanvas.getContext('2d');
                        tempCanvas.width = cutoutWidth;
                        tempCanvas.height = cutoutHeight;

                        // Draw the adjusted cutout portion onto the temporary canvas
                        tempCtx.drawImage(
                        image,
                        minX + offsetX, minY + offsetY, cutoutWidth / (1 + offset), cutoutHeight / (1 + offset), // Source rectangle
                        0, 0, cutoutWidth, cutoutHeight // Destination rectangle on temporary canvas
                        );

                        // Clear the main canvas before drawing
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                        // Draw the cutout portion scaled to the full canvas size
                        ctx.drawImage(
                        tempCanvas,
                        0, 0, cutoutWidth, cutoutHeight,
                        0, 0, canvas.width, canvas.height
                        );
                    });



                }

                if (imageFullScreen) {

                    fitToContainer(imageFullScreen, imageData);
                    
                    var ctx_full = imageFullScreen.getContext("2d");
            
                    // Initialize a new ImageData object
                    createImageBitmap(imageData).then((img) => {

                        ctx_full.drawImage(img, 0, 0, imageData.width, imageData.height);
            
                        // ctx_full.moveTo(parseInt(result?.location?.p1.x), parseInt(result?.location?.p1.y));
                        // ctx_full.lineTo(parseInt(result?.location?.p2.x), parseInt(result?.location?.p2.y));
                        // ctx_full.lineTo(parseInt(result?.location?.p3.x), parseInt(result?.location?.p3.y));
                        // ctx_full.lineTo(parseInt(result?.location?.p4.x), parseInt(result?.location?.p4.y));
                        // ctx_full.lineTo(parseInt(result?.location?.p1.x), parseInt(result?.location?.p1.y));
                        // ctx_full.stroke();
                        // ctx_full.fillStyle = "rgba(0,255,57,.5)";
                        // ctx_full.fill();

                        // Draw the green overlay
                        ctx_full.fillStyle = 'rgba(0, 255, 0, 0.5)'; // Semi-transparent green

                        // Calculate bounding box of the overlay from the points
                        const xs = [result.location.p1.x, result.location.p2.x, result.location.p3.x, result.location.p4.x];
                        const ys = [result.location.p1.y, result.location.p2.y, result.location.p3.y, result.location.p4.y];
                        
                        const minX = Math.min(...xs);
                        const minY = Math.min(...ys);
                        const maxX = Math.max(...xs);
                        const maxY = Math.max(...ys);
                        
                        // Draw the rectangle overlay using the bounding box
                        const width = maxX - minX;
                        const height = maxY - minY;
                        
                        ctx_full.fillRect(minX, minY, width, height);
                    });
                }
            
                this.Barkoder.setPauseDecoding(false);
                   
            }, 350);
            
        },
        startScanner: function() {

            let self = this;

            this.flags.mode = 'scanning';

            this.Barkoder.startScanner(function(result){

                self.showResult(result);
            })

        },
        stopScanner: function(mode) {
            
            let self = this

            this.Barkoder.stopScanner()
            
            if(mode == 'restart'){

                setTimeout(() => {
                    
                    self.startScanner();

                }, 400);						
            }
            else{
                this.flags.mode = 'initial'
                this.flags.showBox = ''
            }

        },
        copyResult() {
            
            let self = this;

            let textToCopy = this.latestResult.textualData

            navigator.clipboard.writeText(textToCopy).then(() => {
                self.showSingleNotification('Scan Result copied to clipboard')
            }).catch(err => {
                self.showSingleNotification('Failed to copy')
            });
        },
        searchResult: function() {

            let res = this.latestResult

            function validateURL(url) {
                const pattern = new RegExp('^(http(s)?:\\/\\/)?(www\\.)?[a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$', 'i');
                return pattern.test(url);
            }

            // if(validateURL(res.textualData)){
            //     window.open(res.textualData, '_blank');
            // }
            // else{
                window.open('https://www.google.com/search?q='+encodeURIComponent(res.textualData), '_blank');
            // }
        },
        exportToCSV: function() {

            // Convert data array to CSV format
            const csvData = this.convertToCSV();

            if(csvData.length > 0){

                // Create a Blob from the CSV data
                const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
              
                // Create a link element for download
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                
                link.setAttribute('href', url);
                link.setAttribute('download', 'scanResults.csv');
                link.style.visibility = 'hidden';
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            else{
                this.notifications = [{textualData:'There is no available data to export!'}]
            }
        },
        convertToCSV:function() {

            let data = []

            if(this.totalScannedBarcodes.length > 0){
                data = this.totalScannedBarcodes.map(barcode => {
                    return {
                        barcodeTypeName: barcode.barcodeTypeName,
                        textualData: barcode.textualData
                    };
                });
            }
            else if(Object.keys(this.result).length > 0){
                data.push({
                    barcodeTypeName: this.result.barcodeTypeName,
                    textualData: this.result.textualData
                })
            }

            if(data.length){
                // Extract column headers from the keys of the first object in the array
                const headings = ['Barcode Type','Scan Result']

                const headers = Object.keys(data[0]);
                
                // Create the CSV rows (first row as headers, then data)
                const rows = data.map(row => 
                  headers.map(header => JSON.stringify(row[header] || '')).join(',')
                );
              
                // Combine headers and rows into a single string
                return [headings.join(','), ...rows].join('\n');
            }

            return []
        },
        changeCamera: function(cameraId) {

            this.showBox('');
            
            if(this.selections.active_camera != cameraId){
                
                this.selections.active_camera = cameraId;

                this.Barkoder.setCameraId(cameraId);

                this.stopScanner('restart');
            }
        },
        setBackCamera: async function() {

            let cameraLabels = this.cameras.map(({ label }) => label);
            
            let desiredCamera = cameraLabels.filter(function(e){

                let cameraname = e.toLowerCase()

                return cameraname.includes("back triple camera") ||cameraname.includes("back camera") || cameraname.includes("A4") || cameraname.includes("back") || cameraname.includes('0, facing back')
            });

            let desiredCamera_i = (desiredCamera.length)?cameraLabels.indexOf(desiredCamera[0]):0;


            this.selections.active_camera = this.cameras[desiredCamera_i].id;
            this.Barkoder.setCameraId(this.cameras[desiredCamera_i].id);

        },
        readTemplate: async function() {

            let self = this

            return new Promise(function(resolve, reject) {

                let rawFile = new XMLHttpRequest();

                rawFile.overrideMimeType("application/json");
                rawFile.open("GET", './js/templates.json', true);
                rawFile.onreadystatechange = function() {
                    if (rawFile.readyState === 4 && rawFile.status == "200") {

                        let template_data = rawFile.responseText

                            template_data = JSON.parse(template_data);

                            self.template_data = template_data
                    }
                }
                rawFile.send(null);

                resolve('');
            })

        },
        swipeHideResultSection: function() {
            
            let self = this;

            setTimeout(() => {
                
                let swipeArea = document.querySelector('.resultContainer');
                
                if (swipeArea) {
                    
                    let touchStartY = 0;
                    let touchEndY = 0;
                    
                    // Threshold to consider it a valid swipe
                    let swipeThreshold = 50;
                    
                    swipeArea.addEventListener('touchstart', (event) => {
                        touchStartY = event.changedTouches[0].screenY;
                    });
                    
                    swipeArea.addEventListener('touchend', (event) => {
                        touchEndY = event.changedTouches[0].screenY;
                        handleSwipe();
                    });
                    
                    function handleSwipe() {
                        let swipeDistance = touchEndY - touchStartY;
                        
                        // Check if it's a downward swipe
                        if (swipeDistance > swipeThreshold) {

                            if(self.isExpanded){
                                self.isExpanded = false;
                            }
                            else{
                                self.flags.showResultBox = false
                            }
                        }
                        
                        // Check if it's an upward swipe
                        if (swipeDistance < -swipeThreshold) {
                            self.isExpanded = true;
                        }
                    }
                }

            }, 300);

            
        },
        setBarkoderWasmScanner: async function() {

            let self = this;

            let license_key = ""; //this is where you input your license key generated on the barkoder portal

            this.Barkoder = await BarkoderSDK.initialize(license_key);

            this.cameras = await this.Barkoder.getCameras();
            
            if(this.cameras.length <= 0){

                self.flags.mode = 'noActiveCamera'
            }
            else{
                self.flags.mode = 'initial'
                // self.flags.mode = 'showResult'

                this.Barkoder.setFlashEnabled(false);
                this.Barkoder.setZoomEnabled(false);
                this.Barkoder.setCloseEnabled(false);
                this.Barkoder.setCameraPickerEnabled(false);
                this.logs = BarkoderSDK.logs;
                // this.setBackCamera();
            }
        }
    },
    async mounted () {
        
        await this.setBarkoderWasmScanner()
        
        await this.readTemplate();

        this.selections.syms = await this.Barkoder.applyTemplate('./js/templates.json', 'all');

    },
    created () {

        let self = this;

        document.addEventListener("startScanner", function(e) {

            let active_camera = self.Barkoder.getActiveCamera();

            if(active_camera)
                self.selections.active_camera = active_camera.id
        });
        
        document.addEventListener("stopScanner", function(e) {
            self.flags.mode = 'initial';
            self.flags.showResultBox = false;
        });
        
    },
}).mount('#wasmApp')