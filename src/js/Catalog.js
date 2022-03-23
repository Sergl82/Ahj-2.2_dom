import data from "./data";

export default class Catalog {
  constructor(table) {
    this.table = table;
    this.data = data;
    this.sort = [];
  }

  init() {
    this.redrawTable();
    this.attrs = [...document.querySelector(".movie").getAttributeNames()];
    this.displayValue(this.attrs, 1);
  }

  redrawTable() {
    this.data.forEach((elem) => {
      const template = `
<tr class="movie" data-id="${elem.id}" data-title="${elem.title}" data-year="${
        elem.year
      }" data-imdb="${elem.imdb.toFixed(2)}">
				<td>${elem.id}</td>
				<td>${elem.title}</td>
				<td>(${elem.year})</td>
				<td>imdb: ${elem.imdb.toFixed(2)}</td>
			</tr>`;
      this.table.insertAdjacentHTML("beforeend", template);
    });
  }

  sortValues(value) {
    this.movie = document.querySelectorAll(".movie");

    value = value.substr(5);

    if (value === "title") {
      this.sort = [...this.movie].sort((prev, next) => {
        if (next.dataset.title > prev.dataset.title) return 1;
        if (next.dataset.title < prev.dataset.title) return -1;
      });
    } else {
      this.sort = [...this.movie].sort((prev, next) => {
        return Number(next.dataset[value]) - Number(prev.dataset[value]);
      });
    }

    return this.sort;
  }

  refresh() {
    // перерисовка с учетом задержки 2 сек

    this.redrawList(this.movie, this.sort);

    this.sort = this.sort.reverse();
    setTimeout(() => {
      this.redrawList(this.movie, this.sort);
    }, 2000);
  }

  redrawList(movie, sort) {
    // Перерисовка таблицы в соответствии с сортировкой

    const rotateTriangle = [...document.querySelectorAll("th")].find((elem) =>
      elem.firstElementChild.classList.contains("triangle-up")
    );
    if (rotateTriangle) {
      rotateTriangle.firstElementChild.style.transform = "rotate(180deg)"; // добавить условие ротации, тк норм проходит только один раз
    }

    movie.forEach((elem) => {
      document.querySelector("tbody").removeChild(elem);
    });
    sort.forEach((elem) => {
      document.querySelector("tbody").append(elem);
    });
  }

  triangle(itemName) {
    // добавляет треугольник

    const tHeader = document.querySelectorAll("th");

    [...tHeader].forEach((elem) => {
      elem.firstElementChild.classList.remove("triangle-up");
      elem.firstElementChild.style.transform = "";
    });

    const findItem = [...tHeader].find((elem) => elem.textContent === itemName);

    findItem.firstElementChild.classList.add("triangle-up");
  }

  displayValue(arr, i) {
    // i = 1, потому что в атрибутах еще и 'class', а он не нужен при сортировке

    if (i < arr.length) {
      const timerId = setTimeout(() => {
        if (i < arr.length) {
          this.sortValues(arr[i]);
          this.refresh();
          this.triangle(arr[i].substr(5));
          this.displayValue(arr, [++i]);
          if (i === arr.length) {
            clearTimeout(timerId);
            i = 1;
            this.displayValue(arr, i);
          }
        }
      }, 4000);
    }
  }
}
