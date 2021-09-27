import * as bootstrap from "bootstrap";
import '@fortawesome/fontawesome-free/css/all.css';

import helloWorld from "./scripts/helloWorld";
import navbar from "./scripts/navbar";
import loadDataTables from "./scripts/loadDataTables";

// expose bootstrap to the window
window.bootstrap = bootstrap;

helloWorld();
navbar();
loadDataTables();

