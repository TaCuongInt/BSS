var crudApp = new function() {
    this.col = [];
    this.category = ['TV', 'Washer', 'Refrigerator', 'Selling Fan'];
    this.myProducts = [
        { ID: 1, Devices: 'TV', MAC_Address: '00:18:44:11:3A:B7', IP: '127.0.0.2', Created_Date: '2021-05-31', Power_Consumption: 50 },
        { ID: 2, Devices: 'Washer', MAC_Address: '00:18:44:11:3A:B8', IP: '127.0.0.3', Created_Date: '2021-05-31', Power_Consumption: 60 },
        { ID: 3, Devices: 'Refrigerator', MAC_Address: '00:18:44:11:3A:B9', IP: '127.0.0.4', Created_Date: '2021-05-31', Power_Consumption: 80 },
        { ID: 4, Devices: 'Selling Fan', MAC_Address: '00:18:44:11:3A:B2', IP: '127.0.0.5', Created_Date: '2021-05-31', Power_Consumption: 100 }
    ];

    this.createTable = function() {
        // Extract value for table header.
        for (var i = 0; i < this.myProducts.length; i++) {
            for (var key in this.myProducts[i]) {
                if (this.col.indexOf(key) === -1) {
                    this.col.push(key);
                }
            }
        }

        // CREATE A TABLE.
        var table = document.createElement('table');

        // Seet table id.
        table.setAttribute('id', 'productsTable');

        // Create a row (for header).
        var tr = table.insertRow(-1);

        // Add table header.
        for (var h = 0; h < this.col.length; h++) {
            var th = document.createElement('th');
            th.innerHTML = this.col[h].replace('_', ' ');
            tr.appendChild(th);
        }
        var th = document.createElement('th');
        th.setAttribute('colspan', '2');
        th.innerHTML = 'Action';
        tr.appendChild(th);

        // Add rows using JSON data.
        for (var i = 0; i < this.myProducts.length; i++) {
            // Create a new row.
            tr = table.insertRow(-1);

            // Add data from JSON
            for (var j = 0; j < this.col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = this.myProducts[i][this.col[j]];
            }

            // Dynamically create and add elements to table cells with events.
            this.td = document.createElement('td');

            // *** CANCEL.
            tr.appendChild(this.td);
            var lblCancel = document.createElement('label');
            lblCancel.innerHTML = '✖';
            lblCancel.setAttribute('onclick', 'crudApp.Cancel(this)');
            lblCancel.setAttribute('style', 'display:none;');
            lblCancel.setAttribute('title', 'Cancel');
            lblCancel.setAttribute('id', 'lbl' + i);
            this.td.appendChild(lblCancel);

            // *** SAVE.
            tr.appendChild(this.td);
            var btSave = document.createElement('input');
            btSave.setAttribute('type', 'button'); // SET ATTRIBUTES.
            btSave.setAttribute('value', 'Save');
            btSave.setAttribute('id', 'Save' + i);
            btSave.setAttribute('style', 'display:none;');
            btSave.setAttribute('onclick', 'crudApp.Save(this)'); // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btSave);

            // *** UPDATE.
            tr.appendChild(this.td);
            var btUpdate = document.createElement('input');
            btUpdate.setAttribute('type', 'button'); // SET ATTRIBUTES.
            btUpdate.setAttribute('value', 'Update');
            btUpdate.setAttribute('id', 'Edit' + i);
            btUpdate.setAttribute('style', 'background-color:#44CCEB;');
            btUpdate.setAttribute('onclick', 'crudApp.Update(this)'); // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btUpdate);

            // *** DELETE.
            this.td = document.createElement('th');
            tr.appendChild(this.td);
            var btDelete = document.createElement('input');
            btDelete.setAttribute('type', 'button'); // SET INPUT ATTRIBUTE.
            btDelete.setAttribute('value', 'Delete');
            btDelete.setAttribute('style', 'background-color:#ED5650;');
            btDelete.setAttribute('onclick', 'crudApp.Delete(this)'); // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btDelete);
        }

        // SUM POWER CONSUMPTION
        let totalPower = (myProducts) => {
            let sum = 0;
            for (let i = 0; i < myProducts.length; i++) {
                sum += parseInt(myProducts[i].Power_Consumption);
            }
            return sum;
        };
        tr = table.insertRow(-1);
        var cells = [];
        for (let j = 0; j < 7; j++) {
            cells.push(tr.insertCell(-1));
        }
        cells[6].setAttribute('colspan', '2');
        cells[1].innerHTML = 'Total';
        cells[5].innerHTML = totalPower(this.myProducts);

        // CREATE THE LAST ROW.
        tr = table.insertRow(-1);

        for (var j = 0; j < this.col.length; j++) {
            var newCell = tr.insertCell(-1);
            if (j >= 1) {
                // ADD A DROPDOWN LIST AT THE SECOND COLUMN (FOR Category).
                if (j == 1) {
                    // CREATE AND ADD A DROPDOWN LIST.
                    var select = document.createElement('select');
                    select.innerHTML = '<option value=""></option>';
                    for (k = 0; k < this.category.length; k++) {
                        select.innerHTML = select.innerHTML +
                            '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                    }
                    newCell.appendChild(select);
                } else {
                    // CREATE AND ADD A TEXTBOX.
                    var tBox = document.createElement('input');
                    tBox.setAttribute('type', 'text');
                    tBox.setAttribute('value', '');
                    newCell.appendChild(tBox);
                }
            }
        }

        // *** CREATE.
        this.td = document.createElement('td');
        this.td.setAttribute('colspan', '2');
        tr.appendChild(this.td);
        var btNew = document.createElement('input');
        btNew.setAttribute('type', 'button'); // SET ATTRIBUTES.
        btNew.setAttribute('value', 'Create');
        btNew.setAttribute('id', 'New' + i);
        btNew.setAttribute('style', 'background-color:#207DD1;');
        btNew.setAttribute('onclick', 'crudApp.CreateNew(this)'); // ADD THE BUTTON's 'onclick' EVENT.
        this.td.appendChild(btNew);

        // ADD THE TABLE TO THE WEB PAGE.
        var div = document.getElementById('overview-boxes');
        div.innerHTML = '';
        div.appendChild(table);

        // CREATE CHART
        let dataLatest = (myProducts) => {
            let dataNew = [];
            for (let i = 0; i < this.myProducts.length; i++) {
                dataNew.push({ x: this.myProducts[i].Devices, value: parseInt(this.myProducts[i].Power_Consumption) });
            }
            return dataNew;
        };

        // Remove previous chart
        const myNode = document.getElementById("container");
        myNode.innerHTML = '';

        // Add new chart
        anychart.onDocumentReady(function() {
            var chart = anychart.pie(dataLatest(this.myProducts));
            var palette = anychart.palettes.distinctColors();
            palette.items([
                { color: '#ff5f81' },
                { color: '#ff9f40' },
                { color: '#ffcd56' },
                { color: '#4bc0c0' },
                { color: '#44eb59' },
                { color: '#e718d7' },
                { color: '#1b18e7' },
                { color: '#d9eb44' },
                { color: '#44eba6' },
                { color: '#eb4463' }
            ]);
            chart.title('Power Consumption')
            chart.innerRadius('50%')
            chart.palette(palette);
            chart.container('container');
            chart.draw();
        });
    };

    // ****** OPERATIONS START.
    // CANCEL.
    this.Cancel = function(oButton) {
        // HIDE THIS BUTTON.
        oButton.setAttribute('style', 'display:none; float:none;');

        var activeRow = oButton.parentNode.parentNode.rowIndex;

        // HIDE THE SAVE BUTTON.
        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:none;');

        // SHOW THE UPDATE BUTTON AGAIN.
        var btUpdate = document.getElementById('Edit' + (activeRow - 1));
        btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        var tab = document.getElementById('productsTable').rows[activeRow];

        for (i = 0; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            td.innerHTML = this.myProducts[(activeRow - 1)][this.col[i]];
        }
    }

    // EDIT DATA.
    this.Update = function(oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('productsTable').rows[activeRow];

        // SHOW A DROPDOWN LIST WITH A LIST OF CATEGORIES.
        for (i = 1; i < 6; i++) {
            if (i == 1) {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select'); // DROPDOWN LIST.
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < this.category.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + this.category[k] + '">' + this.category[k] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            } else {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('input'); // TEXTBOX.
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }
        }

        var lblCancel = document.getElementById('lbl' + (activeRow - 1));
        lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

        var btSave = document.getElementById('Save' + (activeRow - 1));
        btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

        // HIDE THIS BUTTON.
        oButton.setAttribute('style', 'display:none;');
    };

    // DELETE DATA.
    this.Delete = function(oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        this.myProducts.splice((activeRow - 1), 1); // DELETE THE ACTIVE ROW.
        this.createTable(); // REFRESH THE TABLE.
    };

    // SAVE DATA.
    this.Save = function(oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('productsTable').rows[activeRow];

        // UPDATE myProducts ARRAY WITH VALUES.
        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') { // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
                this.myProducts[(activeRow - 1)][this.col[i]] = td.childNodes[0].value; // SAVE THE VALUE.
            }
        }
        this.createTable(); // REFRESH THE TABLE.
    }

    // CREATE NEW.
    this.CreateNew = function(oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('productsTable').rows[activeRow];
        var obj = { ID: this.myProducts.length + 1 };

        // ADD NEW VALUE TO myProducts ARRAY.
        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') { // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
                var txtVal = td.childNodes[0].value;
                if (txtVal != '') {
                    obj[this.col[i]] = txtVal.trim();
                } else {
                    obj = '';
                    alert('All fields are compulsory');
                    break;
                }
            }
        }
        obj[this.col[0]] = this.myProducts.length + 1; // NEW ID.
        if (Object.keys(obj).length > 0) { // CHECK IF OBJECT IS NOT EMPTY.
            this.myProducts.push(obj); // PUSH (ADD) DATA TO THE JSON ARRAY.
            this.createTable(); // REFRESH THE TABLE.
        }
    }

    // RANDOM CREATE NEW.
    this.RandomCreateNew = function() {
            var day = Math.floor(Math.random() * 31) + 1;
            var deviceName = document.getElementById('device_name').value;
            var ipAddress = document.getElementById('ip_address').value;

            if (deviceName != '' && ipAddress != '') {
                var obj = {
                    ID: this.myProducts.length + 1,
                    Devices: deviceName,
                    MAC_Address: "00:18:44:11:3A:B" + Math.floor(Math.random() * 10),
                    IP: ipAddress,
                    Created_Date: "2021-05-" + (day < 10 ? ("0" + day) : day),
                    Power_Consumption: Math.floor(Math.random() * 100)
                };
                this.category.push(deviceName);
                this.myProducts.push(obj);
                document.getElementById('device_name').value = '';
                document.getElementById('ip_address').value = '';
                this.createTable();
            } else {
                obj = '';
                alert('All fields are compulsory');
            }
        }
        // ****** OPERATIONS END.
}

crudApp.createTable();