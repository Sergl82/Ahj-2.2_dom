import Catalog from "./Catalog";

const table = document.querySelector("tbody");

const catalog = new Catalog(table);

catalog.init();
