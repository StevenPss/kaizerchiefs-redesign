import * as bootstrap from "bootstrap";
import '@fortawesome/fontawesome-free/css/all.css';

import helloWorld from "./scripts/helloWorld";
import loadDataTables from "./scripts/loadDataTables";

import animations from "./scripts/animations";

// expose bootstrap to the window
window.bootstrap = bootstrap;

helloWorld();
loadDataTables();

animations();

