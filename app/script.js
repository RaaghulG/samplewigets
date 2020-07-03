var processedJSON = {};
invoiceId=[];
async function updateInvoice(invoiceId){
  lineItem= [];
  var newlineItem;
for(let i=0;i<invoiceId.length;i++){
  console.log(invoiceId[i]);
  let selectedInvoices =  {
    url: 'https://books.zoho.com/api/v3/invoices/',
    method: 'GET',
    url_query: [{
      key: "authtoken",
      value: "fa00e98373d2be124d2abddc28ab33bc"
    },
    {
      key: "organization_id",
      value: "708364208"
    },
  {
    key:"accept",
    value: "json"
  }]
  };
  selectedInvoices.url = selectedInvoices.url.concat(invoiceId[i]);
  //console.log(selectedInvoices);
  let selectedInvoice  =  await ZFAPPS.request(selectedInvoices).then(function(json) {
    return JSON.parse(json.data.body);
  });
  //console.log(selectedInvoice.invoice.line_items);
  newlineItem = selectedInvoice.invoice.line_items[0];
  lineItem.push(newlineItem);
}
  console.log(newlineItem);
  //lineItem.push(newlineItem);
  console.log(lineItem);
  ZFAPPS.set('invoice.line_items',lineItem).then(async function(responseJson) {
    responseJson = responseJson['invoice'];
    console.log(responseJson.line_items);
  });
}


window.onload = function () {
  ZFAPPS.extension.init().then(function(App){
      ZFAPPS.get('invoice').then(async function(responseJson) {
        //responseJson = responseJson['invoice'];
          processedJSON = responseJson;
            console.log(responseJson);
          if(responseJson.invoice.customer_id){
            let contacts =  {
            url: 'https://books.zoho.com/api/v3/contacts',
            method: 'GET',
            url_query: [{
              key: "authtoken",
              value: "fa00e98373d2be124d2abddc28ab33bc"
            },
            {
              key: "organization_id",
              value: "708364208"
            }]
          };
          contacts.url = contacts.url.concat(`/${responseJson.invoice.customer_id}`);
          console.log(contacts);
          let { contact } = await ZFAPPS.request(contacts).then(function(json) {
            return JSON.parse(json.data.body);
            
          });
          console.log(contact);
        contactsName = document.getElementById('contact');
        contactsName.innerText = `${contact.contact_name}`;
        processedJSON = responseJson;
        console.log(processedJSON);

        let invoices =  {
          url: 'https://books.zoho.com/api/v3/invoices',
          method: 'GET',
          url_query: [{
            key: "authtoken",
            value: "fa00e98373d2be124d2abddc28ab33bc"
          },
          {
            key: "organization_id",
            value: "708364208"
          },
          {
            key: "customer_id",
            value: responseJson.invoice.customer_id
          }]
        };
        console.log(responseJson.invoice.customer_id);
          console.log(invoices);
          
          let invoice  = await ZFAPPS.request(invoices).then(function(json) {
            console.log(json);
            return JSON.parse(json.data.body);
          });
          console.log(invoice);
          console.log(invoice.invoices);
          contactsName = document.getElementById('contact');
        contactsName.innerText = `${contact.contact_name}`;

        
        invoiceList=[]
        for (let element of invoice.invoices) {
         
             invoicesList= {
              "Date" : element.date,
              "Invoice#" :element.invoice_number,
              "Status" : element.current_sub_status
             
            }
          invoiceList.push(invoicesList);
        }
        console.log(invoiceList);
        
        function generateTableHead(table, data) {
          let thead = table.createTHead();
          let row = thead.insertRow();
          for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
          }
        }
        
        function generateTable(table, data) {
          for (let element of data) {
            let row = table.insertRow();
            for (key in element) {
              
              let cell = row.insertCell();
              let text = document.createTextNode(element[key]);
              cell.appendChild(text);
            }
          }
        }
        
        let table = document.querySelector("table");
        let data = Object.keys(invoiceList[0]);
        generateTableHead(table, data);
        generateTable(table, invoiceList);
        let row = document.getElementsByTagName("tr");
       
        for (let i = 0; i < row.length; i++) {
          var cell = row[i];
          cell.onclick = function () {
            var rowId = this.rowIndex;
            console.log(rowId-1);
            invoiceId.push(invoice.invoices[rowId-1].invoice_id)
            console.log(invoiceId);
            //updateInvoice(invoiceId);
          }
        }
        //console.log(invoiceId);
        //updateInvoice(invoiceId);
        let update = document.getElementById('updateInvoice');
        update.onclick = function(){
          updateInvoice(invoiceId);
        }
        
      }
        else{
          contactsName = document.getElementById('contact');
        contactsName.innerText = "Select the Customer";
        }
      }).catch(function(error) {
          console.log(error);
      });
    
      /*ZFAPPS.set('invoice.discount','20%').then(async function(responseJson) {
        responseJson = responseJson['invoice'];
        console.log(responseJson.discount);*/
     App.instance.on('ON_CHANGE', async function(response) {
           if(responseJson.invoice.customer_id){
            let contacts =  {
            url: 'https://books.zoho.com/api/v3/contacts',
            method: 'GET',
            url_query: [{
              key: "authtoken",
              value: "fa00e98373d2be124d2abddc28ab33bc"
            },
            {
              key: "organization_id",
              value: "708364208"
            }]
          };
          contacts.url = contacts.url.concat(`/${responseJson.invoice.customer_id}`);
          console.log(contacts);
          let { contact } = await ZFAPPS.request(contacts).then(function(json) {
            return JSON.parse(json.data.body);
            
          });
          console.log(contact);
        contactsName = document.getElementById('contact');
        contactsName.innerText = `${contact.contact_name}`;
        processedJSON = responseJson;
        console.log(processedJSON);

        let invoices =  {
          url: 'https://books.zoho.com/api/v3/invoices',
          method: 'GET',
          url_query: [{
            key: "authtoken",
            value: "fa00e98373d2be124d2abddc28ab33bc"
          },
          {
            key: "organization_id",
            value: "708364208"
          },
          {
            key: "customer_id",
            value: responseJson.invoice.customer_id
          }]
        };
        console.log(responseJson.invoice.customer_id);
          console.log(invoices);
          
          let invoice  = await ZFAPPS.request(invoices).then(function(json) {
            console.log(json);
            return JSON.parse(json.data.body);
          });
          console.log(invoice);
          console.log(invoice.invoices);
          contactsName = document.getElementById('contact');
        contactsName.innerText = `${contact.contact_name}`;

        
        invoiceList=[]
        for (let element of invoice.invoices) {
         
             invoicesList= {
              "Date" : element.date,
              "Invoice#" :element.invoice_number,
              "Status" : element.current_sub_status
             
            }
          invoiceList.push(invoicesList);
        }
        console.log(invoiceList);
        
        function generateTableHead(table, data) {
          let thead = table.createTHead();
          let row = thead.insertRow();
          for (let key of data) {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
          }
        }
        
        function generateTable(table, data) {
          for (let element of data) {
            let row = table.insertRow();
            for (key in element) {
              
              let cell = row.insertCell();
              let text = document.createTextNode(element[key]);
              cell.appendChild(text);
            }
          }
        }
        
        let table = document.querySelector("table");
        let data = Object.keys(invoiceList[0]);
        generateTableHead(table, data);
        generateTable(table, invoiceList);
        let row = document.getElementsByTagName("tr");
       
        for (let i = 0; i < row.length; i++) {
          var cell = row[i];
          cell.onclick = function () {
            var rowId = this.rowIndex;
            console.log(rowId-1);
            invoiceId.push(invoice.invoices[rowId-1].invoice_id)
            console.log(invoiceId);
            //updateInvoice(invoiceId);
          }
        }
        //console.log(invoiceId);
        //updateInvoice(invoiceId);
        let update = document.getElementById('updateInvoice');
        update.onclick = function(){
          updateInvoice(invoiceId);
        }
        
      }
        else{
          contactsName = document.getElementById('contact');
        contactsName.innerText = "Select the Customer";
        }
      }).catch(function(error) {
          console.log(error);
      });
      });

}