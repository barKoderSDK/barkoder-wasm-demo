#Barkoder Scanner - WASM Demo build with using Vue.js (inline)

This project is a Vue.js application that integrates with the BarkoderSDK for scanning various types of barcodes. The application is designed to handle real-time barcode scanning, template selection, camera management, and result display.

Features
Barcode Scanning: Scan a wide variety of barcodes (1D, 2D) including QR codes, UPC, Code 128, and more.
Camera Selection: Select the active camera and adjust camera settings such as resolution and scanning speed.
Template Selection: Use predefined templates (like "All Barcodes" or "QR Barcodes") to simplify barcode type selection.
MultiScan: Toggle between single and multi-scan modes to scan multiple barcodes at once.
Notifications: Receive notifications of scan results and manage the display of scan history.
CSV Export: Export scan results to a CSV file for further processing.
Real-Time Feedback: Display the scanned barcode result in real-time with visual overlays.
Getting Started
Prerequisites
Vue.js 3: This project uses Vue 3 for its reactive data and components.
BarkoderSDK: This SDK handles barcode decoding and provides access to the camera and its settings.
Installation
Download or clone the repository.

Make sure to include the Vue.js library:

html
Copy code
<script src="https://unpkg.com/vue@3/dist/vue.esm-browser.js"></script>
Include the BarkoderSDK to handle barcode scanning:

javascript
Copy code
const BarkoderSDK = ... // Link to the Barkoder SDK initialization (handled in the app).
Running the Application
Set up the Vue.js instance by mounting it to a DOM element:
javascript
Copy code
createApp({...}).mount('#wasmApp');
Initialize the barcode scanner:
javascript
Copy code
async mounted () {
    await this.setBarkoderWasmScanner();
    await this.readTemplate();
}
Use the application through the mounted #wasmApp element.
Key Components
Data Properties:

selections: Stores the current settings, such as active camera, barcode type, enabled decoders, and more.
totalScannedBarcodes: Keeps track of all the scanned barcodes.
Barkoder: The Barkoder SDK instance responsible for handling scanning logic.
flags: Manages the UI state, including modes and visibility of result boxes.
Computed Properties:

templateTitle: Returns the human-readable title for the current template.
barcode_types: Filters available barcode types based on the selected type (1D or 2D).
decoderSpeedList: Provides available decoder speed options.
cameraResolutionList: Provides the available camera resolution options.
latestResult: Returns the latest scanned result.
Methods:

startScanner(): Starts the barcode scanner and handles the result processing.
stopScanner(mode): Stops the scanner and optionally restarts it.
toggleBatchMultiScan(): Toggles between single-scan and multi-scan modes.
showResult(result): Displays the scanned result with visual overlays and handles notifications.
changeCamera(cameraId): Switches the active camera and restarts the scanner.
exportToCSV(): Converts scan results into a CSV file for export.
convertToCSV(): Helper method to format scan data as CSV.
License
This project is licensed under the MIT License.

This application provides a robust interface for barcode scanning with real-time feedback and camera management. With support for both 1D and 2D barcodes and multi-scan functionality, it is ideal for various scanning applications, including inventory management, retail, and industrial use cases.