const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = {
    data: [],
    nameDevice: ["TV", "Washer", "Refrigerator", "Selling Fan"],
    action: ["Turn On", "Turn Off", "Sleep"],
    page: 1,
    gap: 5,

    createData: () => {
        for (let i = 0; i < 46; i++) {
            app.data.push({
                ID: (i < 9) ? ("10" + (i + 1)) : ("1" + (i + 1)),
                Name: app.nameDevice[Math.floor(Math.random() * app.nameDevice.length)],
                Action: app.action[Math.floor(Math.random() * app.action.length)],
                Date: new Date(),
            });
        }
    },

    searchDevice: () => {
        const name = document.getElementById('name').value;
        const device = app.data.filter(e => e.Name === name);
        const htmls = device.map((item) => {
            return `
                        <tr class="devicesItem">
                            <td>${item.ID}</td>
                            <td>${item.Name}</td>
                            <td>${item.Action}</td>
                            <td>${item.Date.toDateString()}</td>
                        </tr>
                    `;
        }).join("");

        let sum = 0;
        device.forEach(element => {
            sum += parseInt(element.ID);
        });

        const bodyTableEle = $(".table tbody");
        bodyTableEle.innerHTML = htmls.concat('', ` <tr class="devicesItem">
                                                        <td>Total</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>${sum}</td>
                                                    </tr>`);
        const myNode = document.getElementById("paginationTable");
        myNode.innerHTML = '';
        let deleteHeading = document.querySelector('#headingTable');
        deleteHeading.removeChild(deleteHeading.lastElementChild);
    },

    deleteDevice: (index) => {
        app.data.splice(index, 1);
    },

    render: () => {
        const displayData = app.data.slice((app.page - 1) * app.gap, app.page * app.gap);
        const htmls = displayData.map((item, index) => {
            return `
                        <tr class="devicesItem">
                            <td>${item.ID}</td>
                            <td>${item.Name}</td>
                            <td>${item.Action}</td>
                            <td>${item.Date.toDateString()}</td>
                            <td><button class="deleteBtn" data-index="${index}">&times;</button></td>
                        </tr>
                    `;
        }).join("");

        let sum = 0;
        app.data.forEach(element => {
            sum += parseInt(element.ID);
        });

        const bodyTableEle = $(".table tbody");
        bodyTableEle.innerHTML = htmls.concat('', ` <tr class="devicesItem">
                                                        <td>Total</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td>${sum}</td>
                                                        <td></td>
                                                    </tr>`);

        // Render pagination
        const paginationWrapper = $("#paginationTable");

        const totalPages = Math.ceil(app.data.length / app.gap);
        let listNodeHtmls = "";

        for (let i = 1; i <= totalPages; i++) {
            if (app.page === i) {
                listNodeHtmls += `<li class="page-item"><a class="page-link page-link-number active" href="#" data-page-number="${i}">${i}</a></li>`;
            } else {
                listNodeHtmls += `<li class="page-item"><a class="page-link page-link-number" href="#" data-page-number="${i}">${i}</a></li>`;
            }
        }

        const _htmls = `<li class="page-item">
                            <a class="page-link first-page" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        ${listNodeHtmls}
                        <li class="page-item">
                            <a class="page-link last-page" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>`;
        paginationWrapper.innerHTML = _htmls;

        const firstPage = $(".page-link.first-page");
        const lastPage = $(".page-link.last-page");
        firstPage.onclick = () => {
            app.goToPage(1);
        };

        lastPage.onclick = () => {
            app.goToPage(totalPages);
        };
    },

    goToPage: (pageNumber) => {
        app.page = pageNumber;
        app.render();
    },

    handlerEvent: () => {
        // deleteBtn
        const tableEle = $(".table");
        tableEle.onclick = (event) => {
            if (event.target.matches(".deleteBtn")) {
                const index = event.target.dataset.index;
                const indexEachPage = (parseInt(app.page) - 1) * parseInt(app.gap) + parseInt(index);
                app.deleteDevice(Number(indexEachPage));
                app.render();
            }

        };

        //searchBtn
        const search = document.querySelector("#searchBtn");
        search.onclick = (event) => {
            const name = document.querySelector("#name").value;
            if (name == "") {
                alert('Search input is not empty');
            } else {
                app.searchDevice();
            }
        };

        // Pagination
        const paginationWrapper = $("#paginationTable");
        paginationWrapper.onclick = (event) => {
            if (event.target.matches(".page-link-number")) {
                app.goToPage(Number(event.target.dataset.pageNumber));
            }
        };
    },

    run: () => {
        app.createData();
        app.render();
        app.handlerEvent();
    }
};

app.run();