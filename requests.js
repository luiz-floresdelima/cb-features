let contents = {}

const utils = {
    'dataNavShow': ds_site =>
        ds_site.replace(/[^a-zA-Z ]/g, ``)
            .replace('-', '')
            .toLowerCase(),
    'publishedDateFormat': published => {
        const date = new Date(published);

        return `${date.getDate() < 10 ? '0' : ''}${date.getDate()}/${(date.getMonth() + 1) < 10 ? '0' : ''}${date.getMonth() + 1}/${date.getFullYear()}`;
    },
    'publishedTimeFormat': published => {
        const date = new Date(published);

        return `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
    }
};

const helpers = {
    'navItem': item => {

        return `        
        <li>
            <a href="${item.link}" onclick="eventoGA('clique menu', 'principal', '${item.ds_site}')" title="${item.ds_site}" target="${((item.link).split('.')[3] == 'com') && ((item.link).split('.')[4] == 'br') ? '_blank' : '_self'}">
                ${item.ds_site}
            </a>
        </li>                   
    `;
    },
    'navItemDataNavShow': item => `
        <li>
            <a href="${item.link}" onclick="eventoGA('clique menu', 'principal', '${item.ds_site}')" title="${item.ds_site}" data-nav-show="${utils.dataNavShow(item.ds_site)}" target="${((item.link).split('.')[3] == 'com') && ((item.link).split('.')[4] == 'br') ? '_blank' : '_self'}">
                ${item.ds_site}
            </a>
        </li>         
    `,
    'hardnewsShare': item => `
    <div class="share">
        <small>
            <a class="mr-10" data-share="popup" target="_blank" rel="noreferrer" href="https://www.facebook.com/sharer.php?u=${item.link}&amp;text=${item.title}">
                <svg class="facebook">
                    <use xlink:href="https://www.correiobraziliense.com.br/frontend/dist/assets/svg/sprite.svg#facebook-negative"></use>
                </svg>
            </a>
            <a class="mr-10" data-share="popup" rel="noreferrer" href="https://twitter.com/intent/tweet?url=${item.link}&amp;text=${item.title}">
                <svg class="twitter">
                    <use xlink:href="https://www.correiobraziliense.com.br/frontend/dist/assets/svg/sprite.svg#twitter-negative"></use>
                </svg>
            </a>
            <a class="mr-10" data-share="popup" rel="noreferrer" href="whatsapp://send?text=${item.title}%20${item.link}" data-action="share/whatsapp/share">
                <svg class="whatsapp">
                    <use xlink:href="https://www.correiobraziliense.com.br/frontend/dist/assets/svg/sprite.svg#whatsapp-negative"></use>
                </svg>
            </a>
        </small>
    </div>  
    `,
    'hardnewsRelation': item => `
    <div class="relation">
        <div>
            <a href="materia.html">
                <svg>
                    <use xlink:href="https://www.correiobraziliense.com.br/frontend/dist/assets/svg/sprite.svg#menu"></use>
                </svg>
            </a>
        </div>
        <div>
            <a href="materia.html">
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit facere</h3>
            </a>
        </div>
        <div>
            <a href="materia.html">
                <svg>
                    <use xlink:href="https://www.correiobraziliense.com.br/frontend/dist/assets/svg/sprite.svg#menu"></use>
                </svg>
            </a>
        </div>
        <div>
            <a href="materia.html">
                <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit facere</h3>
            </a>
        </div>
    </div>
    `,
    'blogs': item => `    
    <article ${!item.img ? `class="cb-no-image"` : ''}>
        ${item.img ? `
        <figure class="d-block mb-15" original="${item.img}">
            <a href="${item.link}" target="_blank" title="${item.title}" onclick="eventoGA('Blogs', '${item.channel}', '${item.link}')">
                <picture class="img-wrapper-img-responsive">
                    <source srcset="${item.img}" media="(max-width: 767px)">
                    <source srcset="${item.img}" media="(max-width: 1023px)">
                    <source srcset="${item.img}" media="(max-width: 1365px)">
                    <img src="${item.img}" alt="${item.title}">
                </picture>
                ${item.destaque == true ? `<figcaption>NOVO</figcaption>`:``}
            </a>
        </figure>    
    ` : ``}
        <div class="txt-blog"><a class="txt-gray" target="_blank" href="${item.link}" title="${item.channel}" onclick="eventoGA('Blogs', '${item.channel}', '${item.link}')">
            <h3>${item.channel}</h3>
            <h4>${item.title}</h4></a></div>
    </article>       
    `,
    'listnewsShare': item => `
    <small>
        ${utils.publishedTimeFormat(item.published)} - ${utils.publishedDateFormat(item.published)} - Compartilhe
        <span>
            <a data-share="popup" target="_blank" href="https://www.facebook.com/sharer.php?u=${item.link}">
                <svg class="facebook">
                    <use xlink:href="https://www.correiobraziliense.com.br/frontend/dist/assets/svg/sprite.svg#facebook-negative"></use>
                </svg>
            </a>
            <a data-share="popup" target="_blank" href=" https://twitter.com/intent/tweet?url=${item.link}&amp;text=${item.title}">
                <svg class="twitter">
                    <use xlink:href="https://www.correiobraziliense.com.br/frontend/dist/assets/svg/sprite.svg#twitter-negative"></use>
                </svg>
            </a>
            <a data-share="popup" rel="noreferrer" href="https://api.whatsapp.com/send?text=${item.title}%20${item.link}" target="_blank" title="Compartilhar pelo WhatsApp">
                <svg class="whatsapp">
                    <use xlink:href="https://www.correiobraziliense.com.br/frontend/dist/assets/svg/sprite.svg#whatsapp-negative"></use>
                </svg>
            </a>
        </span>
    </small>    
    `
};


const filter_size = {
    'hardnews bloco 2': {
        'qtd': 1000, 'elemento': (item) => {
            let imagem = `<figure class="d-block mb-15 img-with-accessory img-wrapper-img-responsive">
            <img class="img-wrapper-img-responsive initial loaded" alt="${item.title}" data-midia-publi="450" data-midia-id="50" data-default-height="214" data-default-width="322" data-midia="50;1000;666;330;220;45" data-was-processed="true" src="${item.img}">
        </figure>`;
            let result = `<div class="mt-15 col-md-12 esquerdameio-item" data-tb-region-item="">
            <div class="news-box free mb-15 pb-25 mb-xs-10">
                <a href="#" class="${item.tema}" title="${item.title}">
                    <span class="h6 d-block mt-0 mb-10">
                        <strong>
                            ${item.subject}
                        </strong>
                    </span>
                    ${imagem}
                </a>
                <h4 class="txt-serif mt-10 mb-0">
                    <a href="#" class="${item.tema}" title="${item.title}">
                        ${item.title}
                    </a>
                </h4>
                <small class="d-block txt-gray mt-10"> Compartilhe
                    <span class="pull-xs-right">
                        <a class="d-inline-block" data-share="popup" target="_blank" href="https://www.facebook.com/sharer.php?u=${item.link}">
                            <i class="sprite-facebook-box-small ml-5"></i>
                        </a>
                        <a class="d-inline-block" data-share="popup" href="https://twitter.com/intent/tweet?url=${item.link}&amp;text=${item.title}" target="_blank">
                            <i class="sprite-twitter-box-small ml-5"></i>
                        </a>
                    </span>
                </small>
            </div>
        </div>`;
            return result;
        }
    },
    'hardnews destaque': {
        'qtd': 2, 'elemento': (item) => {
            let data = new Date(Date.parse(item.published));
            let imagem = `<span class="jumbotron-default-photo" style="background-image:url('${item.img}')" role="img"></span>`;
            let result = `<div class="col-md-6 mb-16">
            <div class="jumbotron jumbotron-inverse jumbotron-default mb-0 jumbotron-clickable js-jumbxxotron-clickable">
                <p class="jumbotron-categorie">
                    <span class="label label-theme bg-theme-3 pull-xs-none pull-left d-inline-block pt-6 pb-6 pl-30 pr-30">MAIS LIDAS</span>
                </p>
                <h2 class="mb-10 mt-0 txt-serif">${item.title}</h2>
                <div class="d-block mt-20">
                    <span class="pull-right">
                        <a class="mr-10" data-share="popup" target="_blank" href=http://www.facebook.com/sharer.php?u=${item.link}">
                            <i class="sprite-facebook-box"></i>
                        </a>
                        <a class="mr-10" data-share="popup" href="http://twitter.com/intent/tweet?url=${item.link}">
                            <i class="sprite-twitter-box"></i>
                        </a>
                    </span>
                    <h6 class="pull-left m-0">${data.getDate()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}</h6>
                </div>
                ${imagem ? `${imagem}` : ``}
                <a class="jumbotron-default-link" href="${item.link}" title="${item.title}">
                </a>
            </div>
        </div>`;
            return result;
        }
    },
    'widget maislidas geral': {
        'qtd': 5, 'elemento': (item, i) => {
            let result = `<li class="">
                <div class="list-borded__count h3 txt-serif">${i}</div>
                <div class="list-borded__desc">
                    <small class="d-block txt-gray">${item.published} - Compartilhe
                        <span class="pull-xs-right">
                            <a class="d-inline-block" data-share="popup" target="_blank" href=" http://www.facebook.com/sharer.php?u=${item.link}">
                                <i class="sprite-facebook-box-small ml-5"></i>
                            </a>
                            <a class="d-inline-block" data-share="popup" target="_blank" href=" http://twitter.com/intent/tweet?url=${item.link}">
                                <i class="sprite-twitter-box-small ml-5"></i>
                            </a>
                        </span>
                    </small>
                    <a class="txt-gray txt-undecoration txt-no-serif d-block" href="${item.link}" onclick="eventoGA('veja mais', 'mais lidas', '${i}')" title="${item.title}">
                        <span class="txt-underline h6 m-0">${item.title}</span>
                    </a>
                </div>
            </li>`;
            return result;
        }
    },
    'date header': {
        'qtd': 1, 'elemento': (item) => {
            let result = `Brasília, Distrito Federal, ${item.diaSemanaExtenso}, ${item.dia} de ${item.mesExtenso} de ${item.ano}`;
            return result;
        }
    },
    'capa blogs especiais': {
        'qtd': 1000, 'elemento': (item) => {
            let result = `
                <article ${item.img !== '' ? `` : `class="cb-no-image"`}>
                    <a href="${item.link}" rel="noopener noreferrer" target="_blank">
                        ${item.img !== '' ?
                        `
                        <picture>
                            <source srcset="${item.img}" media="(max-width: 767px)">
                            <source srcset="${item.img}" media="(max-width: 1023px)">
                            <source srcset="${item.img}" media="(max-width: 1365px)">
                            <img src="${item.img}" alt="${item.title}" title="${item.title}" />
                        </picture>` : ``}
                        <h2>${item.title}</h2>
                    </a>
                </article>`
            return result;
    }
    },
    'blogs': {
        'qtd': 3, 'elemento': (item) => {
            let imagem = item.img ? `<div class="col-sm-4 hidden-xs">
                            <a href="${item.link}" target="_blank" title="${item.titulo}" onclick="eventoGA('Blogs', '${(item.link)}', '${item.link}')">
                                <figure class="d-block mb-15" original="${item.img}">
                                    <picture class="img-wrapper-img-responsive">
                                        <source media="(max-width: 767px)" sizes="(max-width: 767px) 100vw" srcset="${item.img} 100w">
                                        <source srcset="${item.img}">
                                        <img src="${item.img}" alt="${item.title}" title="${item.title}" class="loading" data-was-processed="true">
                                    </picture>
                                </figure>
                            </a>
                        </div>`: ``;
            let result = `<div class="news-box free pb-5 mb-15">
                <div class="row">
                    ${imagem}
                    <div class="col-sm-${imagem ? 8 : 12}">
                        <h4 class="m-0">
                            <a class="txt-gray" target="_blank" href="${item.link}" title="${item.channel}" onclick="eventoGA('Blogs', '${item.channel}', '${item.link}')">${item.channel}</a>
                        </h4>
                        <a target="_blank" class="txt-gray txt-undecoration txt-no-serif d-block" href="${item.link}" title="${item.title}">
                            <span class="txt-underline h6 m-0">${item.title}</span>
                        </a>
                    </div>
                </div>
            </div>` ;
            return result;
        }
    },
    'ultimas capa': {
        'qtd': 4, 'elemento': (item, i) => {
            let result = `
            <div class="row">
                <h4 class="txt-serif mt-0 mb-10">
                    <a href="${item.link}" title="${item.title}" onclick="eventoGA('veja mais', 'ultimas_capa', '${i}')">${item.title}</a>
                </h4>
            </div>`;
            return result;
        }
    },
    'Superesportes': {
        'qtd': 3, 'elemento': (item, i) => {
            let data = new Date(Date.parse(item.published));
            let result = ``
            if (i == 1) {
                let image = item.img ? `<figure>
                    ${item.subject ? `<div class="label">${item.subject}</div>` : ``}
                    <picture class="img-wrapper-img-responsive">
                        <source srcset="${item.img}" media="(max-width: 767px)">
                        <source srcset="${item.img}" media="(max-width: 1023px)">
                        <source srcset="${item.img}" media="(max-width: 1365px)">
                            <img src="${item.img}" alt="${item.title}">
                    </picture>
                </figure>`: ``;
                result = `<div data-tb-region-item="">
                            <a href="https://www.df.superesportes.com.br/app/${item.id_site},${item.id_treeapp}/${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}${(item.link).split(`${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}`)[1]}" title="${item.title}" target="_blank">
                                ${image}
                            </a>
                            <h4>
                                <a href="https://www.df.superesportes.com.br/app/${item.id_site},${item.id_treeapp}/${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}${(item.link).split(`${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}`)[1]}" title="${item.title}" target="_blank">${item.title}</a>
                            </h4>
                        </div>`;
            } else {
                result = `<strong>${item.subject ? `${item.subject}` : ``}</strong>
                        <a href="https://www.df.superesportes.com.br/app/${item.id_site},${item.id_treeapp}/${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}${(item.link).split(`${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}`)[1]}" title="${item.title}" target="_blank" data-tb-region-item="">
                            <span>${item.title}</span>
                        </a>`;
            }
            return result;
        }
    },
    'TV Brasilia': {
        'qtd': 1, 'elemento': (item, i) => {
            let result = ``
            if (i == 1) {
                result = `
                    <div data-tb-region-item="">
                        <a href="${item.link}" target="_blank" title="${item.title}">
                        </a>
                        <h4>
                            <a href="${item.link}" target="_blank" title="${item.title}">${item.title}</a>
                        </h4>
                    </div>`;
            } else {
                result = `<a class="news-box free d-block pb-15 mb-15 txt-gray txt-undecoration txt-no-serif" href="${item.link}" target="_blank" title="${item.title}" data-tb-region-item="">
                <span class="txt-underline h6 m-0">${item.title}</span>
            </a>`;
            }
            return result;
        }
    },
    'Veiculos': {
        'qtd': 1, 'elemento': (item, i) => {
            let data = new Date(Date.parse(item.published));
            let result = ``
            if (i == 1) {
                let image = item.img ? `<figure>
                    ${item.subject ? `<div class="label">${item.subject}</div>` : ``}
                    <picture class="img-wrapper-img-responsive">
                        <source srcset="${item.img}" media="(max-width: 767px)">
                        <source srcset="${item.img}" media="(max-width: 1023px)">
                        <source srcset="${item.img}" media="(max-width: 1365px)">
                            <img src="${item.img}" alt="${item.title}">
                    </picture>
                </figure>`: ``;
                result = `<div data-tb-region-item="">
                            <a href="https://correiobraziliense.vrum.com.br/app/${item.id_site},${item.id_treeapp}/${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}${(item.link).split(`${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}`)[1]}" title="${item.title}" target="_blank">
                                ${image}
                            </a>
                            <h4>
                                <a href="https://correiobraziliense.vrum.com.br/app/${item.id_site},${item.id_treeapp}/${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}${(item.link).split(`${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}`)[1]}" title="${item.title}" target="_blank">${item.title}</a>
                            </h4>
                        </div>`;
            } else {
                result = `<strong>${item.subject ? `${item.subject}` : ``}</strong>
                        <a href="https://correiobraziliense.vrum.com.br/app/${item.id_site},${item.id_treeapp}/${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}${(item.link).split(`${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}`)[1]}" title="${item.title}" target="_blank" data-tb-region-item="">
                            <span>${item.title}</span>
                        </a>`;
            }
            return result;
        }
    },
    'Imoveis': {
        'qtd': 1, 'elemento': (item, i) => {
            let data = new Date(Date.parse(item.published));
            let result = ``
            if (i == 1) {
                let image = item.img ? `<figure>
                    ${item.subject ? `<div class="label">${item.subject}</div>` : ``}
                    <picture class="img-wrapper-img-responsive">
                        <source srcset="${item.img}" media="(max-width: 767px)">
                        <source srcset="${item.img}" media="(max-width: 1023px)">
                        <source srcset="${item.img}" media="(max-width: 1365px)">
                            <img src="${item.img}" alt="${item.title}">
                    </picture>
                </figure>`: ``;
                result = `<div data-tb-region-item="">
                            <a href="https://correiobraziliense.lugarcerto.com.br/app/${item.id_site},${item.id_treeapp}/${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}${(item.link).split(`${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}`)[1]}" title="${item.title}" target="_blank">
                                ${image}
                            </a>
                            <h4>
                                <a href="https://correiobraziliense.lugarcerto.com.br/app/${item.id_site},${item.id_treeapp}/${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}${(item.link).split(`${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}`)[1]}" title="${item.title}" target="_blank">${item.title}</a>
                            </h4>
                        </div>`;
            } else {
                result = `<strong>${item.subject ? `${item.subject}` : ``}</strong>
                        <a href="https://correiobraziliense.lugarcerto.com.br/app/${item.id_site},${item.id_treeapp}/${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}${(item.link).split(`${data.getFullYear()}/${("0" + (data.getMonth() + 1)).slice(-2)}/${("0" + data.getDate()).slice(-2)}`)[1]}" title="${item.title}" target="_blank" data-tb-region-item="">
                            <span>${item.title}</span>
                        </a>`;
            }
            return result;
        }
    },
    'Mais Noticias': {
        'qtd': 100, 'elemento': (item, i) => {
            let data = new Date(Date.parse(item.published));
            let result = ``
            imagem = item.img ? `
                <a href="${item.link}"
                    title="${item.title}"
                    alt="${item.title}">
                    <img class="mb-15 img-responsive"
                        src="${item.img}"
                        alt="${item.title}">
                </a>
                ` : ``;
            result = `<li>
                ${imagem}
                <div>
                    <small>${data.getHours()}:${data.getMinutes()} - ${data.getDate()}/${data.getMonth()}/${data.getFullYear()}</span> - Compartilhe</small>
                    <a href="https://www.facebook.com/sharer.php?u=${item.link}" title="Compartilhe no twitter: ${item.title}" alt="${item.title}">
                        <svg>
                            <use xlink:href="https://www.correiobraziliense.com.br/frontend/dist/assets/svg/sprite.svg#facebook"></use>
                        </svg>
                    </a>
                    <a href="https://twitter.com/intent/tweet?url=${item.link}&amp;text=${item.title}" title="Compartilhe no twitter: ${item.title}" alt="${item.title}">
                        <svg>
                            <use xlink:href="https://www.correiobraziliense.com.br/frontend/dist/assets/svg/sprite.svg#twitter"></use>
                        </svg>
                    </a>
                </div>
                <a href="${item.link}">${item.title}</a>
            </li>`;
            return result;
        }
    },
    'busca': {
        'qtd': 10, 'elemento': (item, i) => {
            let data = new Date(Date.parse(item.publish.replace(/-/g,"/")));
            let image = item.img ? `<picture>
                <source srcset="${item.img}" media="(max-width: 767px)">
                <source srcset="${item.img}" media="(max-width: 1023px)">
                <source srcset="${item.img}" media="(max-width: 1365px)">
                <img src="${item.img}" alt="${item.title}">
            </picture>` : ``;
            let result = `<li>
                <a href="${item.url}" rel="noopener noreferrer">
                    <article>
                        ${image}
                        <div class="box-text">
                            <h2>${item.title}</h2>
                            <p>${item.description}</p>
                            <small>postado em ${data.getHours()}:${data.getMinutes()} - ${data.getDate()}/${data.getMonth()}/${data.getFullYear()}</small>
                        </div>
                    </article>
                </a>
            </li>`;
            return result;
        }
    },
    'menu topo': {
        'qtd': 8, 'elemento': item => helpers.navItem(item)
    },
    'menu topo nav': {
        'qtd': 8, 'elemento': item => helpers.navItemDataNavShow(item)
    },
    'menu topo nav-sup': {
        'qtd': 8, 'elemento': item => helpers.navItem(item)
    },
    'menu topo 2': {
        'qtd': 10, 'elemento': item => helpers.navItem(item)
    },
    'menu topo 2 nav': {
        'qtd': 10, 'elemento': item => helpers.navItem(item)
    },
    'menu topo 2 nav-sup': {
        'qtd': 10, 'elemento': item => helpers.navItemDataNavShow(item)
    },
    'menu sidebar nav': {
        'qtde': 11, 'elemento': item => helpers.navItemDataNavShow(item)
    },
    'menu sidebar nav-sup': {
        'qtd': 11, 'elemento': item => helpers.navItem(item)
    },
    'menu sidebar 2 nav': {
        'qtd': 3, 'elemento': item => helpers.navItemDataNavShow(item)
    },
    'menu sidebar 2 nav-sup': {
        'qtd': 3, 'elemento': item => helpers.navItem(item)
    },
    'mais lidas aside editoria': {
        'qtd': 5, 'elemento': item => `
        <li>
            <a href="${item.link}" target="_blank" rel="noopener noreferrer">
                <h3> ${item.title}</h3>
            </a>
        </li>      
        `
    },
    'ultimas aside editoria': {
        'qtd': 5, 'elemento': item => `
            <a href="${item.link}" target="_blank" rel="noopener noreferrer">
                <h3>${item.title}</h3>
            </a>        
        `
    },
    'blogs sidebar': {
        'qtd': 3, 'elemento': item => helpers.blogs(item)
    },
    'comunidadeei sidebar': {
        'qtd': 3, 'elemento': (item) => {
            let result = `<article ${!item.img ? `class="cb-no-image"` : ''}>
                ${item.img ? `
                <figure class="d-block mb-15" original="${item.img}">
                    <a href="${item.link}" title="${item.title}" onclick="eventoGA('Blogs', '${item.channel}', '${item.link}')">
                        <picture class="img-wrapper-img-responsive">
                            <source srcset="${item.img}" media="(max-width: 767px)">
                            <source srcset="${item.img}" media="(max-width: 1023px)">
                            <source srcset="${item.img}" media="(max-width: 1365px)">
                            <img src="${item.img}" alt="${item.title}">
                        </picture>
                    </a>
                </figure>
            ` : ``}
                <div class="txt-blog">
                    <a class="txt-gray" href="${item.link}" title="${item.channel}" onclick="eventoGA('Informativo', '${item.channel}', '${item.link}')">
                        <h3>${item.title}</h3>
                    </a>
                </div>
            </article>`

            return result;
        }
    },
    'comercioempauta sidebar': {
        'qtd': 4, 'elemento': (item, index) =>
            `${index === 1 ? `
            <a href="${item.link}">
                <h3>${item.titulo}</h3>
            </a>
            ` : `
            <article ${!item.img ? `class="cb-no-image"` : ''}>
            ${item.img ? `
            <figure class="d-block mb-15" original="${item.img}">
                <a href="${item.link}" title="${item.title}" onclick="eventoGA('Blogs', '${item.channel}', '${item.link}')">
                    <picture class="img-wrapper-img-responsive">
                        <source srcset="${item.img}" media="(max-width: 767px)">
                        <source srcset="${item.img}" media="(max-width: 1023px)">
                        <source srcset="${item.img}" media="(max-width: 1365px)">
                        <img src="${item.img}" alt="${item.title}">
                    </picture>
                </a>
            </figure>    
        ` : ``}
            <div class="txt-blog">
                <a class="txt-gray" href="${item.link}" title="${item.channel}" onclick="eventoGA('Informativo', '${item.channel}', '${item.link}')">
                    <h3>${item.title}</h3>
                </a>
            </div>
        </article>             
            `}`
    },
    'ultimas sidebar': {
        'qtd': 5, 'elemento': item => `
            <li>
                <a href="${item.link}" onclick="eventoGA('veja mais', 'mais lidas', '1')" title="${item.title}">
                    <h4>${item.title}</h4>
                </a>
                ${helpers.listnewsShare(item)}
            </li>        
        `
    },
    'maislidas sidebar': {
        'qtd': 5, 'elemento': item => `
        <li>
            <a href="${item.link}" onclick="eventoGA('veja mais', 'mais lidas', '1')" title="${item.title}">
                <h4>${item.title}</h4>
            </a>
            ${helpers.listnewsShare(item)}
        </li>        
        `
    },
    'mainhighlights': {
        'qtd': 1000, 'elemento': item => `
        <article>
            <a href="${item.link}" rel="noopener noreferrer">
                <small>${item.subject}</small>      
                    ${item.media ? `
                    <picture>
                    <source srcset="${item.img1}" media="(max-width: 767px)">
                    <source srcset="${item.img2}" media="(max-width: 1023px)">
                    <source srcset="${item.img3}" media="(max-width: 1365px)">
                    <img src="${item.img}" alt="${item.title}">` : ``}
                <h2>${item.title}</h2>
            </a>
        </article>        
        `
    },
    'conteudo especial capa cb': {
        'qtd': 4, 'elemento': item => `
            <div class="item">
                    ${item.img_patro ? `
                    <div class="description">
                        <small>OFERECIDO POR:</small>
                        <a class="d-inline-block img-wrapper-img-responsive special-logo ml-10" href="${item.link_patro ? item.link_patro : `javascript:void(0)`}">
                            <img class="initial loading" src="${item.img_patro}" alt="${item.nome_patro}" height="33" width="100">
                        </a>
            </div>            
            ` : ``}
            <div>
                <a href="${item.link}">
                    <picture>
                        <source srcset="${item.img1}" media="(max-width: 767px)">
                        <source srcset="${item.img2}" media="(max-width: 1023px)">
                        <source srcset="${item.img3}" media="(max-width: 1365px)">
                        <img src="${item.img}" alt="${item.title}">
                    </picture>                    
                </a>
            </div>
        </div>       
       `
    },
    'capadodia cb': {
        'qtd': 1, 'elemento': item => `
        <div class="cover-day-box-wrap">
            <div class="cover-day-box-share">
                <small>Compartilhe</small>
                <div class="cover-day-box">
                    <a data-share="popup" target="_blank" href="https://www.facebook.com/sharer.php?u=${item.link}">
                        <svg class="facebook">
                            <use xlink:href="https://www.correiobraziliense.com.br/frontend/dist/assets/svg/sprite.svg#facebook-negative"></use>
                        </svg>
                    </a>
                    <a data-share="popup" target="_blank" href="https://twitter.com/intent/tweet?url=${item.url}&amp;text=Confira a Capa do Jornal Correio Braziliense do dia ${item.dt}">
                        <svg class="twitter">
                            <use xlink:href="https://www.correiobraziliense.com.br/frontend/dist/assets/svg/sprite.svg#twitter-negative"></use>
                        </svg>
                    </a>
                    <a data-share="popup" rel="noreferrer" href="https://api.whatsapp.com/send?text=${item.title}%20${item.link}" target="_blank" title="Compartilhar pelo WhatsApp">
                        <svg class="whatsapp">
                            <use xlink:href="https://www.correiobraziliense.com.br/frontend/dist/assets/svg/sprite.svg#whatsapp-negative"></use>
                        </svg>
                    </a>
                </div>
                <a class="btn" target="_blank" title="Assine" href="https://assine.correiobraziliense.net.br/">Assine</a>
            </div>
            <a class="cover-day-box-content" href="${item.url}" onclick="eventoGA('Edicao do Dia', 'imagem#EdicaodoDia', '${item.url}')" title="Confira a Capa do Jornal Correio Braziliense do dia ${item.dt}">            
            ${item.pg ? `
            <picture class="img-wrapper-img-responsive">
                <source srcset="${item.pg}" media="(max-width: 767px)">
                <source srcset="${item.pg}" media="(max-width: 1023px)">
                <source srcset="${item.pg}" media="(max-width: 1365px)">                
                <img src="${item.pg}" alt="Confira a Capa do Jornal Correio Braziliense do dia ${item.dt}">
            </picture>
            ` : ``}            
            </a>
        </div>        
        `
    }
};

const filter_theme = {
    'Superesportes': { 'theme': 'theme-9', 'site': 'https://www.df.superesportes.com.br/', 'titulo': 'SUPERESPORTES' },
    'TV Brasilia': { 'theme': 'theme-7', 'site': 'https://www.tvbrasilia.com.br/', 'titulo': 'TV BRASÍLIA' },
    'Veiculos': { 'theme': 'theme-10', 'site': 'https://correiobraziliense.vrum.com.br/', 'titulo': 'VEÍCULOS' },
    'Imoveis': { 'theme': 'theme-11', 'site': 'https://correiobraziliense.lugarcerto.com.br/', 'titulo': 'IMÓVEIS' }
};

const url_end = { 'jsons': '.json', 'tags': '/' };

function appendNews(pai, element, materia) {
    let i = 0;
    let fatherRegion = pai.getAttribute('data-tb-region');
    materia.slice(0, filter_size[fatherRegion].qtd).map((item) => (
        element.insertAdjacentHTML('beforeend', (function () {
            i++;
            return filter_size[fatherRegion].elemento(item, i);
        })()
        )
    ));
}

function filterGetJson(element) {
    return (element.getAttribute('data-tb-region') != 'Entretenimento' && element.getAttribute('data-tb-region') != 'Eu, Estudante' && element.getAttribute('data-tb-region') != 'Concursos' && element.getAttribute('data-tb-region') != 'Superesportes')
}

function x(element) {
    let pai = element.getAttribute('data-tb-region') ? element : element.parentNode;
    let filhos = element.querySelectorAll("[data-tb-region]");
    let caminho = element.getAttribute('data-type') ? element.getAttribute('data-type') : "jsons";
    if (caminho != 'jsons' && caminho != 'inner') {
        let search_a = document.querySelector('#search-h1')
        let params = new URLSearchParams(window.location.search)
        element.setAttribute('data-content', `${params.get('termo')}`)
        search_a.setAttribute('title', `Busca por ${params.get('termo')}`)
        search_a.textContent = `Resultados para "${params.get('termo')}"`
        let route = {
            'tag': () => {
                document.querySelector('input#txt-search-simple').value = params.get('termo')
            },
            'search': () => {
                document.querySelector('input#txt-search-simple').value = params.get('termo')
            },
            'autor': () => {
                document.querySelector('input#txt-search-simple').value = params.get('termo')
            }
        }
        console.log(window.location.pathname.split('/')[1])
        // route[`${window.location.pathname.split('/')[1]}`]()
    }
    const url_request = { 'tags': `https://www.correiobraziliense.com.br/tags/${element.getAttribute('data-content')}/`, 'search': `https://www.correiobraziliense.com.br/search/${element.getAttribute('data-content')}/`, 'autor': `https://www.correiobraziliense.com.br/autor/${element.getAttribute('data-content')}/`, 'jsons': `https://www.correiobraziliense.com.br/_conteudo/${caminho}/${element.getAttribute('data-content')}${url_end[caminho]}`, 'inner': (item) => { return JSON.parse(JSON.stringify(JSON.parse(item))) } }
    // const url_request = { 'tags': `http://172.16.220.5/correiobraziliense/index.php?router=/tags/&termo=${element.getAttribute('data-content')}`, 'search': `http://172.16.220.10/correiobraziliense/index.php?router=/search/&termo=${element.getAttribute('data-content')}`, 'autor': `http://172.16.220.10/correiobraziliense/index.php?router=/autor/&termo=${element.getAttribute('data-content')}`, 'jsons': `http://correio.cbnet.net.br/_conteudo/${caminho}/${element.getAttribute('data-content')}${url_end[caminho]}`, 'inner': (item) => { return JSON.parse(JSON.stringify(JSON.parse(item))) } }
    filhos = Array.prototype.slice.call(filhos).filter(filterGetJson);
    let materia = [];
    if (caminho == 'inner') {
        let aux = element.lastChild.textContent;
        element.removeChild(element.lastChild);
        appendNews(pai, element, url_request[caminho](aux));
    } else {
        if (url_request[caminho] in contents) {
            materia = contents[url_request[caminho]].matia;
            if (element.getAttribute('data-content') == 'parceiros') {
                filhos.forEach(filho => {
                    appendNews(filho, filho.firstElementChild, materia[filho.getAttribute('data-tb-region')]);
                })
            } else {
                appendNews(pai, element, materia);
            }
        } else {
            //console.log(url_request[caminho]);
            fetch(url_request[caminho], { method: 'GET' })
                .then(function (response) {
                    if (response.status === 200) {
                        response.json().then(function (data) {
                            contents[url_request[caminho]] = data;
                            try {
                                materia = data.matia;
                                if (element.getAttribute('data-content') == 'parceiros') {
                                    filhos.forEach(filho => {
                                        appendNews(filho, filho.firstElementChild, materia[filho.getAttribute('data-tb-region')]);
                                    })
                                } else {
                                    appendNews(pai, element, materia);
                                }
                            } catch (error) {
                                console.log(`Renderização do ${element.getAttribute('data-content')} em ${pai.getAttribute('data-tb-region')} falha! (${error})`)
                            }
                        });
                    }
                })
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
        }
    }
}

const non_intersection_content = ['menu-topo', 'menu-topo-2', 'menu-sidebar', 'menu-sidebar-2'];


let observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting || non_intersection_content.includes(entry.target.dataset.content)) {
                x(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
document.querySelectorAll('[data-content]').forEach(p => { observer.observe(p) });

// let observer_img = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.src = entry.target.dataset.src;
//                 observer.unobserve(entry.target);
//             }
//         });
//     },
//     {rootMargin: "0px 0px -200px 0px"}
// );

// document.querySelectorAll('[data-src]').forEach(img => { observer_img.observe(img) });
// document.querySelectorAll('iframe[data-src]').forEach(img => { observer_img.observe(img) });