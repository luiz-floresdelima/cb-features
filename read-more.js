const utils = {
  dataNavShow: (ds_site) =>
    ds_site
      .replace(/[^a-zA-Z ]/g, ``)
      .replace("-", "")
      .toLowerCase(),
  publishedDateFormat: (published) => {
    const date = new Date(published);

    return `${date.getDate() < 10 ? "0" : ""}${date.getDate()}/${
      date.getMonth() + 1 < 10 ? "0" : ""
    }${date.getMonth() + 1}/${date.getFullYear()}`;
  },
  publishedTimeFormat: (published) => {
    const date = new Date(published);

    return `${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${
      date.getMinutes() < 10 ? "0" : ""
    }${date.getMinutes()}`;
  },
};

const url = location.href;
const regex = RegExp("(?<=,)(?:[0-9]+)(?=/)|(?<=/)(?:[0-9]+)(?=[-])");
const result_regex = url.match(regex);
let id_news = result_regex[0];

let item_storage = localStorage.getItem("cb_historico");
if (!item_storage) {
  localStorage.setItem("cb_historico", id_news);
  item_storage = localStorage.getItem("cb_historico");
}

let array_storage = item_storage.split(",");
if (array_storage.includes(id_news)) {
} else {
  if (array_storage.length >= 200) {
    array_storage.shift();
  }
  localStorage.setItem("cb_historico", `${array_storage.join(",")},${id_news}`);
}

let readMore = document.querySelector("[data-related]");
let tags = readMore.getAttribute("data-related").replaceAll(" ", "");
let list_tags = tags.replaceAll("-", "");
item_storage = localStorage.getItem("cb_historico");
array_storage = item_storage.split(",");
let materia = "";

function renderReadMore(materia) {
  readMore.insertAdjacentHTML("beforeend",
    `<div class="info-keep-reading">
            ${
              materia.img == ""
                ? `<a style="padding: 0 1px 0 20px; flex:0;" href="${materia.url}?utm_source=readmore&&utm_medium=readmore"></a>`
                : `<a href="${materia.url}?utm_source=readmore&&utm_medium=readmore"><img src="${materia.img}" /></a >`
            }
            <div class="title-share">
                <div class="keep-reading-title"><a href="${
                  materia.url
                }?utm_source=readmore&&utm_medium=readmore">${
      materia.title
    }</a></div>
                <div class="keep-reading-share">
                    <div class="date-share"><small>${utils.publishedTimeFormat(
                      materia.publish
                    )} -
                            ${utils.publishedDateFormat(
                              materia.publish
                            )} - Compartilhe</small>
                        <a href="https://wa.me/?text=${materia.title}%20${
      materia.url
    }">
                            <svg class="whatsapp">
                                <use xlink:href="./frontend/dist/assets/svg/sprite.svg#whatsapp-negative"></use>
                            </svg>
                        </a>
                        <a href="https://www.facebook.com/sharer.php?u=${
                          materia.url
                        }&amp;text=${materia.title}">
                            <svg class="facebook">
                                <use xlink:href="./frontend/dist/assets/svg/sprite.svg#facebook-negative"></use>
                            </svg>
                        </a>
                        <a href="<a href="https://twitter.com/intent/tweet?url=${
                          materia.url
                        }&amp;text=${materia.title}">">
                            <svg class="twitter">
                                <use xlink:href="./frontend/dist/assets/svg/sprite.svg#twitter-negative"></use>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>`
  );
}

fetch(`https://www.correiobraziliense.com.br/related/${list_tags}/`, {
  method: "GET",
}).then((resp) => {
  resp.json().then((data) => {
    if (data.matia.length >= 1) {
      for (let c = 0; c < data.matia.length; c++) {
        if (array_storage.includes(data.matia[c].cod)) {
          if (c == data.matia.length - 1) materia = data.matia[0];

          console.log("Não Ler");
        } else {
          materia = data.matia[c];
          renderReadMore(materia);
          break;
        }
      }
    } else {
      document.querySelector(".keep-reading").style.display = "none";
    }
  });
});
